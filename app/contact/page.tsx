"use client";

import { useState } from "react";

type Errors = {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
};

const isEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};

    if (fullName.trim().length < 3) {
      next.fullName = "Full name must be at least 3 characters.";
    }

    if (subject.trim().length < 3) {
      next.subject = "Subject must be at least 3 characters.";
    }

    if (!isEmail(email)) {
      next.email = "Please enter a valid email address.";
    }

    if (message.trim().length < 10) {
      next.message = "Message must be at least 10 characters.";
    }

    return next;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(false);

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);

    setFullName("");
    setSubject("");
    setEmail("");
    setMessage("");

    setErrors({});
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-black/60">
        Send us a message and we’ll get back to you.
      </p>

      {submitted && (
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4">
          <p className="text-sm font-medium">Message sent</p>
          <p className="mt-1 text-sm text-black/60">
            Thanks for reaching out. We’ll reply as soon as possible.
          </p>
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-semibold" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            placeholder="Your full name"
          />
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            placeholder="What is this about?"
          />
          {errors.subject && (
            <p className="mt-2 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            placeholder="name@example.com"
            inputMode="email"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 min-h-[140px] w-full resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            placeholder="Write your message..."
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-black/90 transition"
        >
          Send message
        </button>
      </form>
    </main>
  );
}
