import type { EmailPayload, EmailService } from '../EmailService';

export class ResendProvider implements EmailService {
    private apiKey: string;
    private from: string;

    constructor(apiKey: string, from: string = 'WiseAdvisor <onboarding@resend.dev>') {
        this.apiKey = apiKey;
        this.from = from;
    }

    async send(payload: EmailPayload): Promise<void> {
        if (!this.apiKey) {
            console.warn('Resend API key is missing. Email skipped.');
            return;
        }

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                from: this.from,
                to: payload.to,
                subject: payload.subject,
                html: payload.html,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Failed to send email via Resend: ${JSON.stringify(errorData)}`);
        }
    }
}
