# 🚀 Hosting Next.js on Hostinger (Shared Hosting)

This guide explains how to deploy this project to Hostinger using the **Node.js Selector** and **Standalone Mode**.

## 1. Local Preparation
Before uploading, you must build the project locally to generate the optimized server files.

1. Open your terminal in VS Code.
2. Run the build command:
   ```bash
   npm run build
   ```
3. A `.next/standalone` folder will be created. This contains everything needed to run the app.

---

## 2. Prepare the Deployment Package
Shared hosting requires a specific file structure. Follow these manual steps:

1. Go into the `.next/standalone` folder.
2. Copy the **entire** `public` folder from your project root into `.next/standalone/`.
3. Copy the **entire** `.next/static` folder from your project root into `.next/standalone/.next/`.
4. Your `standalone` folder should now look like this:
   ```text
   standalone/
   ├── .next/
   │   └── static/    <-- (Moved here)
   ├── public/        <-- (Moved here)
   ├── server.js
   └── package.json
   ```
5. Zip the **contents** of this `standalone` folder (e.g., `deploy.zip`).

---

## 3. Upload to Hostinger
1. Log in to your **Hostinger HPanel**.
2. Open **File Manager**.
3. Create a folder (e.g., `public_html/web-app`).
4. Upload `deploy.zip` to that folder and **Extract** it.

---

## 4. Configure Node.js in HPanel
1. Go to **Advanced** > **Node.js**.
2. Click **Create Application**:
   - **App Directory:** `public_html/web-app`
   - **App Entry Point:** `server.js`
   - **Environment:** `Production`
3. Click **Create**.

---

## 5. Environment Variables (Required for Email)
For the contact form and email system to work, you **must** add these variables in the Hostinger Node.js dashboard (not in a `.env` file):

| Variable | Value |
| :--- | :--- |
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `hi@saanvi.site` |
| `SMTP_PASS` | `Your_Email_Password` |
| `ADMIN_EMAIL` | `hi@saanvi.site` |
| `OTP_SECRET` | `A-random-secret-string` |
| `NODE_ENV` | `production` |

---

## 6. Final Steps
1. Click **Restart** on the Node.js application in HPanel.
2. Check your domain. If you are using a subdirectory, you may need a `.htaccess` file in `public_html` to proxy traffic to the Node.js port.

---

## 💡 Troubleshooting
* **Scripts not loading?** Ensure the `static` folder was correctly copied into `.next/static` inside the standalone directory.
* **Email failing?** Double-check the port (465) and the SMTP password in the Hostinger Environment Variables.
