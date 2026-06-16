"use client";

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialData: FormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  message: "",
};

export function ContactForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (next: FormData): FormErrors => {
    const e: FormErrors = {};
    if (!next.name.trim()) e.name = "Name cannot be empty";
    if (!next.email.trim() || !EMAIL_RE.test(next.email.trim())) {
      e.email = "Please enter a valid email";
    }
    if (!next.company.trim()) e.company = "Company cannot be empty";
    if (!next.role.trim()) e.role = "Role cannot be empty";
    return e;
  };

  const update =
    <K extends keyof FormData>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...data, [key]: e.target.value };
      setData(next);
      // Live re-validation, but only update fields that were already in error
      // (avoids showing errors for fields the user hasn't touched yet).
      setErrors((prev) => {
        const fresh = validate(next);
        const merged: FormErrors = {};
        (Object.keys(prev) as (keyof FormData)[]).forEach((k) => {
          if (fresh[k]) merged[k] = fresh[k];
        });
        return merged;
      });
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate(data);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { fieldErrors?: FormErrors }
          | null;
        if (payload?.fieldErrors) setErrors(payload.fieldErrors);
        throw new Error("Request failed");
      }
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="success">
        <div className="icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3>Request received</h3>
        <p>We&rsquo;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={update("name")}
            required
          />
          <span className="error">{errors.name ?? ""}</span>
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={update("email")}
            required
          />
          <span className="error">{errors.email ?? ""}</span>
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={data.company}
            onChange={update("company")}
            required
          />
          <span className="error">{errors.company ?? ""}</span>
        </div>
        <div className="field">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={data.role}
            onChange={update("role")}
            required
          />
          <span className="error">{errors.role ?? ""}</span>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Message (optional)</label>
        <textarea
          id="message"
          name="message"
          value={data.message}
          onChange={update("message")}
        />
      </div>

      <button
        type="submit"
        className="btn btn-default btn-xl btn-block"
        disabled={submitting}
      >
        {submitting ? "Submitting\u2026" : "Request Demo"}
      </button>

      {submitError && (
        <span className="error" role="alert">
          {submitError}
        </span>
      )}
    </form>
  );
}
