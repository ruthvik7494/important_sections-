# 📧 Email System Setup & Instructions

This project includes a premium, secure, and automated email contact system. It is designed to work perfectly with **Next.js Server Actions**, **Hostinger**, and **Company Mails**.

## 🚀 1. Overview
The system performs two main tasks upon form submission:
- **Admin Notification**: Sends the form details to your inbox.
- **User Acknowledgement**: Sends an automated "Thank You" email to the user.

---

## 🛠️ 2. Environment Configuration
To connect your mail server, you must create a `.env` file in the root directory (copy from `.env.example`).

```bash
# SMTP Settings
SMTP_HOST=smtp.hostinger.com       # Hostinger default
SMTP_PORT=465                      # Use 465 for SSL or 587 for TLS
SMTP_USER=info@yourdomain.com      # Your professional email
SMTP_PASS=your-secure-password     # Your email password
ADMIN_EMAIL=admin@yourdomain.com   # Where YOU receive notifications
```

> [!IMPORTANT]
> If you are using **Gmail**, you must use an **App Password**, not your regular password.

---

## 🔒 3. OTP Email Verification
This system includes a **stateless OTP (One-Time Password)** verification system to ensure 100% email validity.

### How it Works:
1.  **Request**: When the user enters their email and clicks "Send Code", the server generates a random 6-digit number.
2.  **Stateless Hashing**: The server sends the code via email and returns a **secure hash** of the code to the browser (no database required).
3.  **Verification**: The user enters the code.
4.  **Final Submit**: The server re-calculates the hash of the user's input. If it matches the original hash, the contact message is officially sent.

> [!TIP]
> This prevents bots and "fake emails" from ever reaching your inbox. Only verified users can submit the form.

---

## 🏢 4. Hostinger & Company Mails
This system is optimized for **Hostinger Shared Hosting** and **VPS**.

### Hostinger Specific Settings:
- **Host**: `smtp.hostinger.com`
- **Port**: `465` (Recommended)
- **Encryption**: The code automatically handles SSL encryption for Port 465.

### Company Emails (Google Workspace / Outlook):
- **Google Workspace**: Host: `smtp.gmail.com` | Port: `465`
- **Outlook/O365**: Host: `smtp.office365.com` | Port: `587`

---

## 🧪 5. How to Test
1.  **Local Testing**: Use a tool like [Mailtrap.io](https://mailtrap.io). It provides a virtual inbox so you can see your emails without sending real ones during development.
2.  **Production Testing**: 
    - Fill the form with a real personal email (like your personal Gmail).
    - Check if you received the inquiry in your `ADMIN_EMAIL`.
    - Check if the personal Gmail received the "Thank You" acknowledgement.

---

## 📁 6. File Structure
- `src/actions/emailActions.ts`: Contains the logic for sending emails.
- `src/components/Contact/`: Contains the UI and CSS.
- `src/utils/validation.ts`: Contains the Zod schema for input safety.

---

## ☁️ 7. Hosting Deployment
When you deploy to **Hostinger**:
1. Go to your **Hostinger Dashboard** -> **Advanced** -> **Environment Variables**.
2. Add all the keys from your `.env` file there.
3. Restart your application.

---
*Created by Antigravity AI for Ruthvik.*
