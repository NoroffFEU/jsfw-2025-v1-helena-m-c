"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (values: ContactValues) => {
    setSent(false);
    await new Promise((r) => setTimeout(r, 500));
    console.log("Contact message:", values);
    setSent(true);
    reset();
  };

  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-sm text-black/60">
        Send a message. Fields are validated before submission.
      </p>

      {sent && (
        <div className="mt-8 max-w-xl rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
          Your message has been sent successfully.
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-xl space-y-4 rounded-2xl border border-black/10 bg-white p-6"
        noValidate
      >
        <div>
          <label className="text-sm font-semibold" htmlFor="fullName">
            Full name
          </label>
          <input
            id="fullName"
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            {...register("subject")}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-600">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </main>
  );
}
