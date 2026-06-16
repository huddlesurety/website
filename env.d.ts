// Environment bindings/secrets available via getCloudflareContext().env
// and process.env. Set these in `.env` (local dev) and as Worker secrets
// in production (`wrangler secret put <NAME>`).
//
// Augments the global CloudflareEnv interface declared by
// @opennextjs/cloudflare so these read type-safely off getCloudflareContext().
export {};

declare global {
  interface CloudflareEnv {
    RESEND_API_KEY?: string;
    CONTACT_EMAIL?: string;
    /** Optional override for the verified Resend "from" address. */
    CONTACT_FROM_EMAIL?: string;
  }

  namespace NodeJS {
    interface ProcessEnv {
      RESEND_API_KEY?: string;
      CONTACT_EMAIL?: string;
      CONTACT_FROM_EMAIL?: string;
    }
  }
}
