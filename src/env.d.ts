/// <reference types="astro/client" />
/// <reference types="@astrojs/cloudflare" />

type D1Database = import('@cloudflare/workers-types').D1Database;

declare namespace App {
    interface Locals extends Runtime { }
}

interface Runtime {
    runtime: {
        env: {
            DB: D1Database;
            RESEND_API_KEY: string;
        }
    }
}
