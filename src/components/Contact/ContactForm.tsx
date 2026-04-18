"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/utils/validation";
import { sendEmailAction, sendOTPAction } from "@/actions/emailActions";
import "./ContactForm.css";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [serverHash, setServerHash] = useState<string | null>(null);
  const [userOtp, setUserOtp] = useState("");
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleSendOTP = async () => {
    const email = getValues("email");
    if (!email || errors.email) return;

    setIsSubmitting(true);
    try {
      const response = await sendOTPAction(email);
      if (response.success && response.hash) {
        setServerHash(response.hash);
        setOtpSent(true);
        setResult(null);
      } else {
        setResult({ error: response.error || "Failed to send code." });
      }
    } catch (error) {
      setResult({ error: "Something went wrong." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    if (!otpSent) {
      await handleSendOTP();
      return;
    }

    if (!userOtp || userOtp.length !== 6) {
      setResult({ error: "Please enter a valid 6-digit code." });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await sendEmailAction(data, userOtp, serverHash!);
      setResult(response);
      if (response.success) {
        reset();
        setOtpSent(false);
        setUserOtp("");
        setServerHash(null);
        setTimeout(() => setResult(null), 8000);
      }
    } catch (error) {
      setResult({ error: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contactContainer">
      <div className="contactCard">
        <div className="contactHeader">
          <h2>Get in Touch</h2>
          <p>Verified contact system. Please fill the details below.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="contactForm">
          <div className="inputGrid">
            <div className="inputField">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your Name"
                disabled={otpSent}
                {...register("name")}
              />
              {errors.name && <span className="errorMsg">{errors.name.message}</span>}
            </div>

            <div className="inputField">
              <label>Email</label>
              <input
                type="email"
                placeholder="Your Email"
                disabled={otpSent}
                {...register("email")}
              />
              {errors.email && <span className="errorMsg">{errors.email.message}</span>}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!otpSent ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="inputField" style={{ marginBottom: "2rem" }}>
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="What is this about?"
                    {...register("subject")}
                  />
                  {errors.subject && <span className="errorMsg">{errors.subject.message}</span>}
                </div>

                <div className="inputField">
                  <label>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us more about your inquiry..."
                    {...register("message")}
                  ></textarea>
                  {errors.message && <span className="errorMsg">{errors.message.message}</span>}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="otpBox"
                style={{
                  padding: "1.5rem",
                  background: "#f8fafc",
                  borderRadius: "16px",
                  textAlign: "center",
                  border: "2px dashed #6366f1",
                  margin: "0.5rem 0"
                }}
              >
                <KeyRound size={40} color="#6366f1" style={{ margin: "0 auto 1rem" }} />
                <h3>Verify your Email</h3>
                <p>We&apos;ve sent a 6-digit code to <strong>{getValues("email")}</strong></p>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={userOtp}
                  onChange={(e) => setUserOtp(e.target.value.replace(/\D/g, ""))}
                  style={{
                    fontSize: "2rem",
                    letterSpacing: "8px",
                    textAlign: "center",
                    marginTop: "1.5rem",
                    border: "none",
                    background: "white",
                    borderRadius: "12px",
                    width: "100%",
                    maxWidth: "240px"
                  }}
                />
                <button 
                  type="button" 
                  onClick={() => setOtpSent(false)}
                  style={{ display: "block", margin: "1rem auto", color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: "600" }}
                >
                  Change Email
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            className="submitBtn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>{otpSent ? "Verifying..." : "Sending Code..."}</span>
              </>
            ) : (
              <>
                <span>{otpSent ? "Verify & Submit" : "Send Verification Code"}</span>
                <Send size={18} />
              </>
            )}
          </button>

          <AnimatePresence>
            {result?.success && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="feedback success"
              >
                <CheckCircle size={20} />
                <span>Message verified and sent! Check your inbox for confirmation.</span>
              </motion.div>
            )}

            {result?.error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="feedback error"
              >
                <AlertCircle size={20} />
                <span>{result.error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
