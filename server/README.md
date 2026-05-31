# Krishna Deo — Portfolio Setup Guide

---

## Project Structure

```
portfolio/          ← React + TypeScript frontend
portfolio-server/   ← Node.js + Express backend (contact API)
```

---

## 1. Frontend Setup

```bash
cd portfolio
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 2. Backend Setup

```bash
cd portfolio-server
npm install

# Copy .env.example to .env and fill in your credentials
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
CONTACT_EMAIL=your-real-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-real-email@gmail.com
SMTP_PASS=your-16-char-app-password
```

Run the backend:
```bash
npm run dev     # development (auto-restart with nodemon)
# or
npm start       # production
```

Backend runs at: **http://localhost:5000**

---

## 3. Gmail App Password (for SMTP)

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Security → **2-Step Verification** (must be enabled)
3. Scroll down → **App passwords**
4. Select App: **Mail**, Device: **Other** → type "Portfolio"
5. Click **Generate** — copy the 16-character password
6. Paste it as `SMTP_PASS` in your `.env` file

> ⚠️ Never commit `.env` to GitHub. It's already in `.gitignore`.

---

## 4. Where to Add Your Links

### GitHub & Live Demo (Projects)
**File:** `portfolio/src/data/portfolioData.ts`

```ts
github: "https://github.com/YOUR_USERNAME/the-setu",
liveDemo: "https://the-setu.vercel.app",
```

### Social links in Hero & Footer
- **Hero:** `portfolio/src/components/Hero.tsx` — replace `href="#"` on GitHub/LinkedIn anchors
- **Footer:** `portfolio/src/components/Footer.tsx` — same

### Your email / LinkedIn / GitHub in Contact section
**File:** `portfolio/src/data/portfolioData.ts`
```ts
export const contact = {
  email: "your@email.com",
  linkedin: "https://linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  location: "Vadodara, Gujarat, India",
};
```

---

## 5. Project Preview Image

1. Take a screenshot of your project's landing page
2. Name it `project-preview.png`
3. Place it in: `portfolio/public/project-preview.png`
4. The image will auto-load. No code changes needed.

---

## 6. Build for Production

### Frontend
```bash
cd portfolio
npm run build
# Output: portfolio/dist/ — deploy to Vercel / Netlify
```

### Backend
```bash
cd portfolio-server
npm start
# Deploy to Render / Railway / Fly.io / VPS
```

Update `CONTACT_EMAIL` and `CLIENT_URL` in `.env` with your production URLs before deploying.
