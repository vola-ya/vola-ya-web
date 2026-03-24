"use client";

import { useState } from "react";

function EmailForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vola Ya waitlist email:", email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={`flex items-center gap-3 py-5 ${dark ? "text-white" : "text-[#3d2b1f]"}`}
      >
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm"
          style={{
            background: dark ? "rgba(255,255,255,0.2)" : "#3d2b1f",
            color: "#fff",
          }}
        >
          ✓
        </span>
        <p className="text-base font-semibold">
          ¡Listo! Te avisamos cuando tengamos ofertas para vos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className={`flex-1 px-5 py-4 text-base rounded-xl border-2 outline-none transition-colors ${
          dark
            ? "bg-white/10 border-white/25 text-white placeholder:text-white/40 focus:border-white/70"
            : "bg-white border-[#c8b09a] text-[#3d2b1f] placeholder:text-[#b09080] focus:border-[#e07842]"
        }`}
      />
      <button
        type="submit"
        className="px-7 py-4 bg-[#e07842] text-white font-bold text-base rounded-xl hover:bg-[#c4956a] active:scale-[0.97] transition-all duration-150 whitespace-nowrap cursor-pointer"
      >
        Quiero recibir alertas gratis
      </button>
    </form>
  );
}

function DealCard() {
  return (
    <div
      className="relative bg-white rounded-2xl w-72 select-none"
      style={{
        boxShadow:
          "0 30px 70px rgba(0,0,0,0.14), 0 6px 20px rgba(0,0,0,0.07)",
        animation: "floatCard 5s ease-in-out infinite",
      }}
    >
      <div className="h-1.5 bg-[#e07842] rounded-t-2xl" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-extrabold tracking-widest text-[#e07842] uppercase">
            Vola Ya
          </span>
          <span className="text-[10px] bg-[#e07842] text-white px-2.5 py-1 rounded-full font-bold tracking-wide uppercase">
            Nueva oferta
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-3xl font-extrabold tracking-tight leading-none">
              BUE
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-[#e07842] flex-shrink-0"
            >
              <path
                d="M2 10h16M12 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-3xl font-extrabold tracking-tight leading-none">
              MAD
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9e8070]">
            <span>Buenos Aires</span>
            <span>·</span>
            <span>Madrid</span>
            <span>·</span>
            <span>Ida y vuelta</span>
          </div>
        </div>

        <div className="border-t border-dashed border-[#e5ddd0] my-4" />

        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-xs text-[#b09080] line-through mb-0.5">
              $1,385 USD
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-[#3d2b1f] leading-none">
                $385
              </span>
              <span className="text-sm text-[#9e8070] font-medium">USD</span>
            </div>
          </div>
          <div className="bg-[#e07842] text-white font-extrabold text-lg px-3 py-2 rounded-xl leading-none">
            −72%
          </div>
        </div>

        <div className="bg-[#f5f0ea] rounded-xl px-4 py-2.5 flex items-center justify-between">
          <span className="text-[11px] text-[#9e8070] whitespace-nowrap">Válido hasta 15 abril</span>
          <span className="text-[11px] font-semibold text-[#e07842] flex flex-col items-end">
            <span>3 asientos ·</span>
            <span className="text-[#3d2b1f]">Ver oferta →</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen font-sans">
      {/* NAV */}
      <nav className="px-6 md:px-14 py-5 flex items-center justify-between border-b border-[#e8e0d4]">
        <span className="text-xl font-extrabold tracking-tight">
          vola<span className="text-[#e07842]">ya</span>
        </span>
        <span className="text-xs text-[#b09080] font-medium tracking-wide uppercase">
          Sudamérica · 2026
        </span>
      </nav>

      {/* ── HERO ── */}
      <section className="px-6 md:px-14 pt-14 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Mobile: deal card on top */}
          <div
            className="flex justify-center mb-14 lg:hidden"
            style={{ animation: "fadeIn 0.6s ease-out both" }}
          >
            <DealCard />
          </div>

          <div className="grid lg:grid-cols-[58fr_42fr] gap-16 xl:gap-24 items-center">
            {/* Left: copy + form */}
            <div>
              {/* Badge — "Ofertas que vuelan" */}
              <div
                className="mb-6"
                style={{ animation: "fadeInUp 0.6s ease-out both" }}
              >
                <span className="inline-flex items-center gap-2.5 bg-[#e07842] text-white text-xs font-bold tracking-[0.12em] uppercase px-4 py-2 rounded-full">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 12L12 1M12 1H5M12 1v7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Ofertas que vuelan
                </span>
              </div>

              <h1
                className="text-[2.8rem] sm:text-6xl xl:text-7xl font-extrabold leading-[0.92] tracking-[-0.02em] text-[#3d2b1f] mb-6"
                style={{ animation: "fadeInUp 0.6s 0.05s ease-out both" }}
              >
                Los mejores
                <br />
                vuelos de
                <br />
                <span className="text-[#e07842]">Sudamérica.</span>
                <br />
                <span className="text-[#7d5a48] text-[2rem] sm:text-4xl xl:text-5xl font-bold tracking-[-0.01em]">
                  Te avisamos.
                  <br /> Vos decidís.
                </span>
              </h1>

              <p
                className="text-lg text-[#8c6a58] leading-relaxed mb-8 max-w-lg"
                style={{ animation: "fadeInUp 0.6s 0.12s ease-out both" }}
              >
                <span className="block">Escaneamos miles de rutas todo el día.</span>
                <span className="block">Vos te enterás primero.</span>
              </p>

              <div style={{ animation: "fadeInUp 0.6s 0.2s ease-out both" }}>
                <EmailForm />
                <p className="mt-4 text-xs text-[#b09080]">
                  Gratis para siempre · Sin spam · Podés darte de baja cuando
                  quieras
                </p>
              </div>
            </div>

            {/* Right: Deal card (desktop only) */}
            <div
              className="hidden lg:flex items-center justify-center"
              style={{ animation: "fadeIn 0.8s 0.35s ease-out both" }}
            >
              <div className="relative py-8">
                <div
                  className="absolute top-6 left-4 w-72 h-[22rem] rounded-2xl"
                  style={{
                    background: "#e8e0d4",
                    transform: "rotate(-4deg)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                  }}
                />
                <div
                  className="absolute top-3 left-2 w-72 h-[22rem] rounded-2xl"
                  style={{
                    background: "#f5f0ea",
                    transform: "rotate(-1.5deg)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
                  }}
                />
                <div className="relative" style={{ transform: "rotate(3deg)" }}>
                  <DealCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="px-6 md:px-14 py-16 border-t border-[#e8e0d4]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#b09080] mb-8">
            Cómo funciona
          </p>

          <div className="grid md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Te registrás",
                desc: "Solo necesitás un email. Sin tarjeta, sin datos de más. En 10 segundos estás dentro.",
              },
              {
                num: "02",
                title: "Escaneamos por vos",
                desc: "Monitoreamos cientos de rutas todos los días buscando caídas de precios reales.",
              },
              {
                num: "03",
                title: "Vos volás",
                desc: "Recibís un email claro con el precio, la ruta y el link. Comprás directo con la aerolínea.",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="relative px-0 py-10 md:px-10 md:py-8 border-t md:border-t-0 md:border-l border-[#e8e0d4] first:border-t-0 first:border-l-0"
              >
                <span
                  className="absolute -top-2 left-0 md:left-8 text-[8rem] font-extrabold text-[#e07842] leading-none select-none pointer-events-none"
                  style={{ opacity: 0.06 }}
                >
                  {step.num}
                </span>

                <div
                  className="relative"
                  style={{
                    marginTop: i === 1 ? "1.5rem" : i === 2 ? "-0.5rem" : "0",
                  }}
                >
                  <span className="block text-2xl font-extrabold text-[#e07842] mb-4 tabular-nums">
                    {step.num}
                  </span>
                  <h3 className="text-xl font-bold text-[#3d2b1f] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#8c6a58] leading-relaxed text-[15px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ VOLA YA ── */}
      <section className="px-6 md:px-14 py-16 bg-[#f0ebe3]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#b09080] mb-8">
            Por qué Vola Ya
          </p>

          <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24">
            {[
              {
                title: "Foco sudamericano",
                desc: "Rutas desde y hacia Argentina, Brasil, Chile, Colombia y más. Ofertas pensadas para viajeros de la región.",
              },
              {
                title: "En español, para vos",
                desc: "Todo lo que necesitás saber, en tu idioma, con el contexto que importa. Precios en dólares y pesos, fechas, condiciones.",
              },
              {
                title: "Siempre encendido",
                desc: "El sistema escanea precios las 24 horas. Cuando aparece una oferta real, te llega de inmediato — por email o Telegram.",
              },
              {
                title: "Gratis para empezar",
                desc: "Te sumás, recibís alertas, listo. Sin períodos de prueba, sin datos de tarjeta.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-5 py-9 border-b border-[#e0d8ce] last:border-0 md:[&:nth-last-child(2)]:border-0"
              >
                <div className="w-1 flex-shrink-0 rounded-full bg-[#e07842] self-stretch min-h-[2rem]" />
                <div>
                  <h3 className="text-xl font-bold text-[#3d2b1f] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#8c6a58] leading-relaxed text-[15px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="px-6 md:px-14 py-20 bg-[#faf6f1] border-t border-[#e8e0d4]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold text-[#e07842] leading-[0.88] tracking-[-0.02em] mb-5">
            Ofertas que
            <br />
            vuelan.
          </h2>
          <p className="text-[#7d5a48] text-lg mb-10 leading-relaxed">
            Anotate gratis y empezamos a mandarte alertas de vuelos desde
            Sudamérica.
          </p>
          <EmailForm />
          <p className="mt-5 text-[#b09080] text-xs">
            Gratis para siempre · Sin spam · Podés darte de baja cuando quieras
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-14 py-7 border-t border-[#e8e0d4]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-base font-extrabold tracking-tight">
            vola<span className="text-[#e07842]">ya</span>
          </span>
          <p className="text-xs text-[#c0a890]">
            © 2026 Vola Ya. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-[#b09080] hover:text-[#3d2b1f] transition-colors"
            >
              Términos
            </a>
            <a
              href="#"
              className="text-xs text-[#b09080] hover:text-[#3d2b1f] transition-colors"
            >
              Privacidad
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
