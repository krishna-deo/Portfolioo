/**
 * Krishna Deo — Portfolio Contact API
 * Node.js + Express + Nodemailer
 *
 * ─── HOW TO RUN ───────────────────────────────────────────
 *  1. cd server
 *  2. npm install
 *  3. cp .env.example .env   ← fill in your credentials
 *  4. npm run dev            ← starts with nodemon (auto-restart)
 *     OR: npm start          ← production start
 *
 * ─── GMAIL APP PASSWORD ───────────────────────────────────
 *  1. myaccount.google.com → Security → 2-Step Verification
 *  2. App passwords → Mail → Other → type "Portfolio"
 *  3. Copy 16-char password → paste as SMTP_PASS in .env
 *  ⚠️  Never commit .env to GitHub
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ── */
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  }),
);

/* ── Nodemailer transporter ── */
const transporter = nodemailer.createTransport({
  service: "gmail",
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ── Helpers ── */
const isValidEmail = (e) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e).toLowerCase());
const sanitize = (s) =>
  String(s || "")
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/* ── POST /api/contact ── */
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Server-side validation
  if (!name || !email || !subject || !message)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  if (!isValidEmail(email))
    return res
      .status(400)
      .json({ success: false, message: "Invalid email address." });
  if (String(name).trim().length < 2)
    return res
      .status(400)
      .json({ success: false, message: "Name is too short." });
  if (String(message).trim().length < 8)
    return res
      .status(400)
      .json({ success: false, message: "Message is too short." });

  const sName = sanitize(name);
  const sSubject = sanitize(subject);
  const sMessage = sanitize(message);
  console.log(sName + sSubject + sMessage);
  const mailOptions = {
    from: `"Portfolio – ${sName}" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `[Portfolio] ${sSubject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#07090a;font-family:'DM Sans',system-ui,sans-serif;">
        <div style="max-width:560px;margin:32px auto;border-radius:16px;overflow:hidden;border:1px solid rgba(16,185,129,0.2);background:#0d1a14;">
          <!-- Header -->
          <div style="padding:28px 32px;background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(16,185,129,0.04));border-bottom:1px solid rgba(16,185,129,0.15);">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#10b981,#34d399);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;color:#07090a;">K</div>
              <span style="color:#34d399;font-weight:700;font-size:15px;">Portfolio Message</span>
            </div>
          </div>
          <!-- Body -->
          <div style="padding:28px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:80px;">From</td><td style="padding:8px 0;color:#fff;font-size:14px;font-weight:600;">${sName}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#34d399;text-decoration:none;font-size:14px;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Subject</td><td style="padding:8px 0;color:#fff;font-size:14px;">${sSubject}</td></tr>
            </table>

            <div style="margin-top:20px;padding:20px;background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.15);border-radius:12px;">
              <p style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px 0;">Message</p>
              <p style="color:rgba(255,255,255,0.78);font-size:14px;line-height:1.7;margin:0;white-space:pre-line;">${sMessage}</p>
            </div>

            <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);">
              <a href="mailto:${email}" style="display:inline-block;padding:10px 20px;border-radius:10px;background:linear-gradient(135deg,#ea580c,#f97316);color:#fff;font-weight:700;font-size:13px;text-decoration:none;">
                Reply to ${sName}
              </a>
            </div>
          </div>
          <!-- Footer -->
          <div style="padding:16px 32px;border-top:1px solid rgba(16,185,129,0.1);background:rgba(0,0,0,0.2);">
            <p style="color:rgba(255,255,255,0.18);font-size:11px;margin:0;">Sent from krishnadeo.dev portfolio contact form</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✉️  Message from ${sName} <${email}> — ${sSubject}`);
    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Nodemailer error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
});

/* ── Health check ── */
app.get("/", (_, res) =>
  res.json({ status: "✅ Portfolio contact API running." }),
);

app.listen(PORT, () => {
  console.log(`\n✅ Contact API → http://localhost:${PORT}`);
  console.log(
    `   Accepting mail from: ${process.env.SMTP_USER || "not configured"}\n`,
  );
});
