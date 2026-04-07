# lenkasilnaWeb

Personal portfolio built with Next.js (Pages Router), React, and TypeScript.

## Features

- Hero section, portfolio placeholder, and contact form
- Language switching (`cs`, `en`, `de`, `esp`)
- Light/dark theme toggle
- SEO metadata + JSON-LD
- Contact form for user inquiries

## Tech stack

- Next.js 16
- React 19
- TypeScript
- styled-components
- Form validation

## Requirements

- Node.js 20+
- pnpm

## Local development

1. Install dependencies:

	```bash
	pnpm install
	```
2. Start the development server:

	```bash
	pnpm dev
	```

3. Open `http://localhost:3000`.

## Scripts

- `pnpm dev` – development server
- `pnpm build` – production build
- `pnpm start` – run production build
- `pnpm lint` – ESLint

## Project structure

- `src/pages` – pages and app routes
- `src/components` – UI components (`Layout`, `NavBar`, `ContactForm`, `SEO`)
- `src/context` – `LanguageContext`, `ThemeContext`
- `src/localization` + `messages/` – translations
- `src/data/seo.json` – language-specific SEO content

## Notes

- The app version shown in the badge is taken automatically from `package.json` (`NEXT_PUBLIC_APP_VERSION` is set in `next.config.mjs`).
- The default language is `en` (after hydration, the saved value is loaded from `localStorage`).
- Configuration details for production integrations are intentionally omitted from this public README.
