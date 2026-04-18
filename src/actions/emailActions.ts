"use server";

import nodemailer from "nodemailer";
import crypto from "crypto";
import { contactSchema, ContactFormData } from "@/utils/validation";

// In-memory storage is not persistent across serverless restarts, 
// so we use a stateless approach with a secret.
const OTP_SECRET = process.env.OTP_SECRET || "your-default-secret-change-this";

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || "587";
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !user || !pass) {
    console.warn("SMTP credentials missing! Check your .env file.");
  }

  // Optimized for Gmail (using Port 587/465 or Service)
  if (host?.includes("gmail.com") || user?.includes("gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  // Fallback for Hostinger or other providers
  return nodemailer.createTransport({
    host: host || "smtp.hostinger.com",
    port: parseInt(port),
    secure: port === "465",
    auth: {
      user: user,
      pass: pass,
    },
  });
};

/**
 * Generates and sends a 6-digit OTP to the user.
 * Returns a hash of the OTP so the client can verify it later.
 */
export async function sendOTPAction(email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = crypto.createHmac("sha256", OTP_SECRET).update(otp).digest("hex");

  try {
    await getTransporter().sendMail({
      from: `"Security" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${otp}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; text-align: center;">
          <h2 style="color: #6366f1;">Verification Code</h2>
          <p style="font-size: 1.1rem; color: #64748b;">Please use the following code to verify your email address:</p>
          <div style="background: #f1f5f9; padding: 20px; border-radius: 10px; margin: 20px auto; width: fit-content;">
            <span style="font-size: 2.5rem; font-weight: 800; letter-spacing: 10px; color: #1e293b;">${otp}</span>
          </div>
          <p style="color: #94a3b8; font-size: 0.875rem;">This code will expire shortly.</p>
        </div>
      `,
    });

    return { success: true, hash };
  } catch (error) {
    console.error("OTP send error:", error);
    return { error: "Failed to send verification code." };
  }
}

export async function sendEmailAction(data: ContactFormData, userOtp: string, serverHash: string) {
  // 1. Double check OTP on server
  const computedHash = crypto.createHmac("sha256", OTP_SECRET).update(userOtp).digest("hex");
  if (computedHash !== serverHash) {
    return { error: "Invalid verification code." };
  }

  // 1. Validate the data on the server side
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid form data. Please check your inputs." };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    // 2. Send email to Admin
    await getTransporter().sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    // 3. Send acknowledgement to User
    await getTransporter().sendMail({
      from: `"Support Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We received your message: ${subject}`,
      text: `Hi ${name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nYour message:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: auto;">
          <h2 style="color: #0070f3;">Thank you for reaching out, ${name}!</h2>
          <p>We've received your inquiry regarding <strong>"${subject}"</strong>.</p>
          <p>Our team is reviewing your message and will get back to you as soon as possible (usually within 24 hours).</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0070f3; margin-top: 20px;">
            <p style="margin: 0; font-style: italic;">"${message}"</p>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">Best regards,<br/>The Team</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { error: "Failed to send email. Please try again later." };
  }
}
