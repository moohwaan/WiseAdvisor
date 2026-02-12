import type { APIRoute } from 'astro';
import { getEmailService } from '../../lib/email/factory';

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const data = await request.formData();
        const name = data.get('name') as string;
        const email = data.get('email') as string;
        const phone = data.get('phone') as string;
        const interest = data.get('interest') as string;
        const message = data.get('message') as string;

        // 1. Basic Validation
        if (!name || !email || !interest) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 2. Insert into D1 Database
        // @ts-ignore - locals.runtime.env.DB is typed by Cloudflare adapter
        const db = locals.runtime.env.DB;

        try {
            await db.prepare(
                'INSERT INTO leads (name, email, phone, interest, message) VALUES (?, ?, ?, ?, ?)'
            ).bind(name, email, phone, interest, message).run();
        } catch (dbError) {
            console.error('Database Error:', dbError);
            return new Response(JSON.stringify({ error: 'Database operation failed' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 3. Send Email Notification
        const emailService = getEmailService(locals.runtime.env);
        const subject = `New Lead: ${name} - ${interest}`;
        const html = `
      <h1>New Lead Received</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Interest:</strong> ${interest}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

        // Send to Admin (To be configured via env var or hardcoded for now)
        // In production, you might want to send this to your own business email
        await emailService.send({
            to: 'moohwaan@gmail.com', // Replace with real admin email or env var
            subject,
            html,
        });

        return new Response(JSON.stringify({ success: true, message: 'Lead captured successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
