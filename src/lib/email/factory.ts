import type { EmailService } from './EmailService';
import { ResendProvider } from './providers/ResendProvider';

export function getEmailService(env: any): EmailService {
    // We can easily switch providers here based on env vars or logic
    return new ResendProvider(env.RESEND_API_KEY);
}
