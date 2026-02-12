export interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}

export interface EmailService {
    send(payload: EmailPayload): Promise<void>;
}
