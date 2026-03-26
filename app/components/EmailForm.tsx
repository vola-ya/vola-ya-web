"use client";

import { useState } from "react";
import { GRADIENTS } from "../lib/constants";

export default function EmailForm({ dark = false, buttonLabel = "Empezar a ahorrar" }: { dark?: boolean; buttonLabel?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vola Ya waitlist email:", email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`flex items-center gap-3 py-5 ${dark ? "text-white" : "text-[#3d2b1f]"}`}>
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm"
          style={{ background: dark ? "rgba(255,255,255,0.2)" : "#3d2b1f", color: "#fff" }}
        >
          ✓
        </span>
        <p className="text-base font-semibold">¡Listo! Te avisamos cuando tengamos ofertas para vos.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${dark ? "justify-center" : ""}`}>
      <div className={`relative ${dark ? "w-56" : "flex-1"}`}>
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: dark ? "rgba(255,255,255,0.5)" : "#b09080" }}
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 7l10 7 10-7" />
        </svg>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className={`w-full pl-11 pr-5 py-4 text-base rounded-xl border-2 outline-none transition-colors ${
            dark
              ? "bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:border-white/70"
              : "bg-white border-[#c8b09a] text-[#3d2b1f] placeholder:text-[#b09080] focus:border-[#e07842]"
          }`}
        />
      </div>
      <button
        type="submit"
        className="px-7 py-4 font-bold text-base rounded-xl active:scale-[0.97] transition-all duration-150 whitespace-nowrap cursor-pointer"
        style={dark ? { background: "white", color: "#9c4411" } : { background: GRADIENTS.primary, color: "white" }}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
