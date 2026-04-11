# bookmark-server

Express + MongoDB API for the bookmark app.

## Setup

1. Install dependencies: `npm i`
2. Create `.env` (copy from `.env.example`)
3. Start:
   - Dev: `npm run dev`
   - Prod: `npm start`

## CORS / Mobile (LAN) testing

Phones do not share your computer's `localhost`. Use your PC's LAN IP instead.

- Frontend on phone: `http://<your-pc-lan-ip>:3000`
- API on phone: `http://<your-pc-lan-ip>:5000`

Allow that origin on the server using either:

- `CLIENT_URLS=http://<your-pc-lan-ip>:3000` (recommended), or
- `ALLOW_LAN_ORIGINS=true` (dev helper; allows private IP + `.local` origins)

If you want the API to behave like a permissive dev server (similar to `Access-Control-Allow-Origin: *`), set:

- `CORS_MODE=wildcard` (dev-only; disables credentials/cookies at the CORS layer)

## Cookies (login)

If you rely on the `access_token` cookie:

- Cross-site cookies require HTTPS + `SameSite=None` + `Secure=true`.
- For local HTTP dev, set `COOKIE_SECURE=false` so the cookie can be set over HTTP.
