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

Copy `.env.example` to `.env.local` and set credentials supplied by the mailbox or transactional email provider:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=website@alvirotech.com
SMTP_PASS=your-app-password
CONTACT_FROM_EMAIL=website@alvirotech.com
```

Use port `465` for an SMTP provider that requires implicit TLS; otherwise use `587`. Add the same variables to the production hosting environment before deploying. Never expose them with a `NEXT_PUBLIC_` prefix.

The green success confirmation appears only after the SMTP server accepts the message. If delivery is unavailable, the form keeps the visitor's input and displays a direct-email fallback.
