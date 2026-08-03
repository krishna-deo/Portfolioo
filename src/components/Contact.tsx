import React, { useState } from "react";
import { contact } from "../data/portfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
type Status = "idle" | "loading" | "success" | "error";

const Contact: React.FC = () => {
  const ref = useScrollReveal();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = ev.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormErrors])
      setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      /*
        BACKEND: calls http://localhost:5000/api/contact || https://portfolioo-7kuv.onrender.com/api/contact (Production)
        Make sure your Express server is running (see server/index.js)
        For production, replace with your deployed API URL
      */
      const API_URL = import.meta.env.VITE_API_URL || "https://portfolioo-7kuv.onrender.com";
      const res = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 7000);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Failed to send. Please try again.",
      );
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/krishna-deo-292771319",
      href: contact.linkedin,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/krishna-deo",
      href: contact.github,
    },
    { icon: MapPin, label: "Location", value: contact.location, href: null },
  ];

  const inputBase =
    "w-full px-4 py-3 rounded-xl text-white/80 text-sm placeholder:text-white/18 outline-none resize-none transition-all duration-300";

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(16,185,129,0.15), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-400 text-xs uppercase tracking-[0.22em] font-semibold">
              Contact
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-white leading-tight mb-12"
            style={{ letterSpacing: "-0.02em" }}
          >
            Let's build something{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #10b981, #34d399)",
              }}
            >
              together.
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left */}
            <div>
              <p className="text-white/50  leading-relaxed mb-10 text-base">
                Open to full-stack internships, freelance projects, and
                interesting collaborations. I reply to every message — don't
                hesitate to reach out.
              </p>
              <div className="space-y-5">
                {contactLinks.map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 group cursor-default"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: "rgba(16,185,129,0.07)",
                        border: "1px solid rgba(16,185,129,0.14)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(16,185,129,0.14)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(16,185,129,0.07)";
                      }}
                    >
                      <Icon
                        size={15}
                        className="text-white/35 group-hover:text-emerald-400 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-white/20 text-xs mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-white/55 text-sm hover:text-emerald-400 transition-colors duration-300 flex items-center gap-6"
                        >
                          {value}
                          <ArrowRight
                            size={10}
                            className="opacity-0 group-hover:opacity-60 transition-opacity"
                          />
                        </a>
                      ) : (
                        <span className="text-white/55 text-sm">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div
              className="relative p-8 rounded-3xl"
              style={{
                border: "1px solid rgba(16,185,129,0.12)",
                background: "rgba(16,185,129,0.025)",
              }}
            >
              {/* Top shimmer */}
              <div
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)",
                }}
              />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center gap-4 py-16 text-center"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(16,185,129,0.12)",
                        border: "1px solid rgba(16,185,129,0.25)",
                      }}
                    >
                      <CheckCircle2 size={26} className="text-emerald-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg">
                      Message sent!
                    </h3>
                    <p className="text-white/35 text-sm">
                      Thanks for reaching out. I'll reply soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    {[
                      {
                        label: "Name",
                        name: "name",
                        type: "text",
                        placeholder: "Your name",
                      },
                      {
                        label: "Email",
                        name: "email",
                        type: "email",
                        placeholder: "your@email.com",
                      },
                      {
                        label: "Subject",
                        name: "subject",
                        type: "text",
                        placeholder: "What's this about?",
                      },
                    ].map(({ label, name, type, placeholder }) => (
                      <div key={name}>
                        <label className="block text-white/35 text-xs mb-1.5 font-semibold">
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          value={
                            (form as unknown as Record<string, string>)[name]
                          }
                          onChange={handleChange}
                          placeholder={placeholder}
                          className={inputBase}
                          style={{
                            background: errors[name as keyof FormErrors]
                              ? "rgba(239,68,68,0.05)"
                              : "rgba(255,255,255,0.04)",
                            border: errors[name as keyof FormErrors]
                              ? "1px solid rgba(239,68,68,0.35)"
                              : "1px solid rgba(16,185,129,0.12)",
                          }}
                          onFocus={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor =
                              "rgba(16,185,129,0.4)";
                            (e.currentTarget as HTMLElement).style.background =
                              "rgba(16,185,129,0.05)";
                          }}
                          onBlur={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor =
                              errors[name as keyof FormErrors]
                                ? "rgba(239,68,68,0.35)"
                                : "rgba(16,185,129,0.12)";
                            (e.currentTarget as HTMLElement).style.background =
                              "rgba(255,255,255,0.04)";
                          }}
                        />
                        {errors[name as keyof FormErrors] && (
                          <p className="text-red-400/75 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={10} />
                            {errors[name as keyof FormErrors]}
                          </p>
                        )}
                      </div>
                    ))}

                    <div>
                      <label className="block text-white/35 text-xs mb-1.5 font-semibold">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="What's on your mind?"
                        className={inputBase}
                        style={{
                          background: errors.message
                            ? "rgba(239,68,68,0.05)"
                            : "rgba(255,255,255,0.04)",
                          border: errors.message
                            ? "1px solid rgba(239,68,68,0.35)"
                            : "1px solid rgba(16,185,129,0.12)",
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(16,185,129,0.4)";
                          (e.currentTarget as HTMLElement).style.background =
                            "rgba(16,185,129,0.05)";
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor =
                            errors.message
                              ? "rgba(239,68,68,0.35)"
                              : "rgba(16,185,129,0.12)";
                          (e.currentTarget as HTMLElement).style.background =
                            "rgba(255,255,255,0.04)";
                        }}
                      />
                      {errors.message && (
                        <p className="text-red-400/75 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={10} />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {status === "error" && (
                      <div
                        className="flex items-center gap-2 p-3 rounded-xl text-red-400 text-xs"
                        style={{
                          background: "rgba(239,68,68,0.08)",
                          border: "1px solid rgba(239,68,68,0.2)",
                        }}
                      >
                        <AlertCircle size={12} />
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-emerald-glow w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-black disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #34d399, #34d399)",
                        transition:
                          "transform 0.25s ease, box-shadow 0.35s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (status !== "loading")
                          (e.currentTarget as HTMLElement).style.transform =
                            "scale(1.01)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform =
                          "scale(1)";
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
