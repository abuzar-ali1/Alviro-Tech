# Alviro Tech

Animated, responsive Next.js website for Alviro Tech.

## Getting Started

Install dependencies and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Contact email API

The contact form posts to `POST /api/contact`. The server validates and rate-limits submissions, then sends them to `scale@alvirotech.com` through SMTP.

Create `.env.local` and set credentials supplied by the mailbox or transactional email provider:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=website@alvirotech.com
SMTP_PASS=your-app-password
CONTACT_FROM_EMAIL=website@alvirotech.com
```

Use port `465` for an SMTP provider that requires implicit TLS; otherwise use `587`. Add the same variables to the production hosting environment before deploying. Never expose them with a `NEXT_PUBLIC_` prefix.

The green success confirmation appears only after the SMTP server accepts the message. If delivery is unavailable, the form keeps the visitor's input and displays a direct-email fallback.

### Troubleshooting Vercel delivery

1. Set the five variables above in Vercel's **Project Settings → Environment Variables**, with **Production** selected for the live domain (and **Preview** for preview deployments). Enter the values only, without surrounding quotes or the `KEY=` prefix. Preserve the SMTP password exactly.
2. Redeploy after adding or changing variables; existing deployments retain their previous values.
3. Use the provider's **outgoing SMTP server**, which can differ from its webmail login address. For Dreamscape/Vodien mailboxes, `rc.ds.network` is a webmail address. Open **Email Accounts → Connect Devices → Mail Client Manual Settings**, or **Webmail Home → Configure Mail Client**, to find the mailbox's actual SMTP host and port. See the [provider's server-settings guide](https://www.vodien.com/help/article/email-server-information).
4. Submit the form and inspect **Vercel → Logs → POST /api/contact**. The `Contact email delivery failed` log includes the host, port, elapsed time, error code, SMTP command, and server response code, without logging the password or form contents.

An `ETIMEDOUT` error with `command: CONN` means the connection failed before login; check the SMTP host, port, and whether the provider permits connections from Vercel. `EAUTH` or SMTP response `535` means authentication failed; check the deployed credentials and the provider's authentication requirements. `ETLS` or certificate errors indicate a TLS or server-name problem; use the provider's documented settings. Do not disable certificate validation.

The route allows 60 seconds of execution and uses shorter SMTP timeouts so an unavailable mail server can return the form's error message. These limits do not make an unreachable server accessible. [Vercel supports SMTP on ports other than 25](https://vercel.com/kb/guide/serverless-functions-and-smtp); if the mailbox provider blocks cloud connections, use its supported relay or a transactional email service.
