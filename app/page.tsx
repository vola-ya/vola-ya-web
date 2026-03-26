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
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${dark ? "justify-center" : ""}`}>
      <div className={`relative ${dark ? "w-56" : "flex-1"}`}>
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: dark ? "rgba(255,255,255,0.5)" : "#b09080" }}>
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
        style={dark
          ? { background: "white", color: "#9c4411" }
          : { background: "linear-gradient(135deg, #e07842 0%, #9c4411 100%)", color: "white" }
        }
      >
        Empezar a ahorrar
      </button>
    </form>
  );
}

function HeroVisual() {
  return (
    <img
      src="/hero-visual.png"
      alt="Vola Ya app preview"
      className="select-none w-full max-w-none"
      style={{
        filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.15))",
        animation: "heroFloat 5s ease-in-out infinite",
      }}
    />
  );
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen font-sans">
      {/* NAV */}
      <nav className="relative px-6 md:px-14 py-4 flex items-center justify-between border-b border-[#e8e0d4]">
        <span className="text-xl font-extrabold tracking-tight">
          vola<span className="text-[#e07842]">ya!</span>
        </span>
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <a href="#" className="text-sm font-semibold text-[#e07842] border-b-2 border-[#e07842] pb-0.5">Ofertas</a>
          <a href="#como-funciona" className="text-sm text-[#8c6a58] hover:text-[#3d2b1f] font-medium transition-colors">Cómo funciona</a>
          <a href="#por-que" className="text-sm text-[#8c6a58] hover:text-[#3d2b1f] font-medium transition-colors">Nosotros</a>
          <a href="#faq" className="text-sm text-[#8c6a58] hover:text-[#3d2b1f] font-medium transition-colors">Preguntas frecuentes</a>
        </div>
        <a
          href="#empezar"
          className="hidden md:block text-xs font-bold text-white uppercase tracking-widest px-5 py-3 rounded-xl transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg, #e07842 0%, #9c4411 100%)" }}
        >
          Regístrate ahora
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative px-6 md:px-14 pt-14 pb-24 overflow-clip">
        {/* Background visual */}
        <div
          className="absolute top-0 right-0 h-full w-[65%] hidden lg:flex items-center justify-end pointer-events-none z-0"
          style={{ animation: "fadeIn 0.8s 0.35s ease-out both" }}
        >
          <HeroVisual />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Mobile: visual */}
          <div
            className="flex justify-center mb-14 lg:hidden"
            style={{ animation: "fadeIn 0.6s ease-out both" }}
          >
            <HeroVisual />
          </div>

          {/* Left: copy + form */}
          <div className="max-w-xl">
            <div
              className="mb-6"
              style={{ animation: "fadeInUp 0.6s ease-out both" }}
            >
              <span className="inline-flex items-center gap-2.5 text-white text-xs font-bold tracking-[0.12em] uppercase px-4 py-2 rounded-full" style={{ background: "linear-gradient(135deg, #e07842 0%, #c45a20 100%)" }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                  <path d="M1 12L12 1M12 1H5M12 1v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Ofertas que vuelan
              </span>
            </div>

            <h1
              className="text-[2.8rem] sm:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#3d2b1f] mb-3"
              style={{ animation: "fadeInUp 0.6s 0.05s ease-out both" }}
            >
              Vuelos baratos,
              <br />
              a una <span className="italic" style={{ background: "linear-gradient(135deg, #e07842 0%, #c45a20 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingRight: "0.12em" }}>alerta</span>
              <br />
              de distancia.
            </h1>
            <p
              className="text-[2rem] sm:text-4xl xl:text-5xl font-bold tracking-[-0.01em] text-[#7d5a48] leading-tight mb-6"
              style={{ animation: "fadeInUp 0.6s 0.05s ease-out both" }}
            >
              Viajá más.
              <br /> Gastá menos.
            </p>

            <p
              className="text-lg text-[#8c6a58] leading-relaxed mb-8 max-w-lg"
              style={{ animation: "fadeInUp 0.6s 0.12s ease-out both" }}
            >
              <span className="block">Encontramos los mejores precios.</span>
              <span className="block">Enterate primero.</span>
            </p>

            <div style={{ animation: "fadeInUp 0.6s 0.2s ease-out both" }}>
              <EmailForm />
              <p className="mt-4 text-xs text-[#b09080]">
                Solo te escribimos cuando vale la pena.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section id="como-funciona" className="px-6 md:px-14 py-16 border-t border-[#e8e0d4]">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-extrabold tracking-[0.15em] uppercase text-[#b09080] mb-3">
            Cómo funciona
          </p>
          <p className="text-[#8c6a58] text-sm mb-8">
            Eliminamos la complejidad de encontrar ofertas de vuelos. Simple. Rápido. Sin vueltas.
          </p>

          <div className="grid md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Rastreo Inteligente",
                desc: "Solo necesitás un email. Sin tarjeta, sin datos de más. En 10 segundos estás dentro.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="12" cy="12" r="7" />
                    <circle cx="12" cy="12" r="11" />
                  </svg>
                ),
              },
              {
                num: "02",
                title: "Alertas Inmediatas",
                desc: "Monitoreamos cientos de rutas todos los días buscando caídas de precios reales.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                ),
              },
              {
                num: "03",
                title: "Vuela y Ahorra",
                desc: "Recibís un email claro con el precio, la ruta y el link. Comprás directo con la aerolínea.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22l-4-9-9-4 19-7z" />
                  </svg>
                ),
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
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#e07842] shrink-0">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#3d2b1f]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#8c6a58] leading-relaxed text-[15px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPORTUNIDADES ── */}
      <section className="px-6 md:px-14 py-20 border-t border-[#e8e0d4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3d2b1f] mb-3">Oportunidades de hoy</h2>
              <p className="text-[#8c6a58] max-w-sm leading-relaxed">Estas son alertas reales que nuestros usuarios recibieron. El próximo podrías ser vos.</p>
            </div>
            <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e07842] hover:opacity-70 transition-opacity whitespace-nowrap">
              Ver historial completo
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            {[
              {
                discount: "-51% DESCUENTO",
                location: "Cusco, Perú",
                city: "Cusco",
                price: "$220",
                original: "$450",
                offset: false,
                img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80",
              },
              {
                discount: "-47% DESCUENTO",
                location: "Argentina",
                city: "Buenos Aires",
                price: "$310",
                original: "$580",
                offset: true,
                img: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&q=80",
              },
              {
                discount: "-47% DESCUENTO",
                location: "Brasil",
                city: "Río de Janeiro",
                price: "$275",
                original: "$520",
                offset: false,
                img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80",
              },
            ].map((card) => (
              <div
                key={card.city}
                className={`cursor-pointer group ${card.offset ? "md:mt-10" : ""}`}
              >
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden mb-4" style={{ height: 340 }}>
                  <img
                    src={card.img}
                    alt={card.city}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full text-white" style={{ background: "linear-gradient(135deg, #e07842 0%, #9c4411 100%)" }}>
                      {card.discount}
                    </span>
                  </div>
                </div>

                {/* Info below image */}
                <div className="flex items-start justify-between px-1">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#e07842] mb-1">{card.location}</p>
                    <h3 className="text-xl font-extrabold text-[#3d2b1f]">{card.city}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#b09080] line-through mb-0.5">{card.original}</p>
                    <p className="text-xl font-black text-[#e07842]">{card.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ VOLA YA ── */}
      <section id="por-que" className="px-6 md:px-14 py-16 bg-[#f0ebe3]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#b09080] mb-8">
            Por qué Vola Ya<span className="text-[#e07842]">!</span>
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
                title: "Mientras hacés tu valija",
                desc: "Rastreamos precios todo el día. Cuando demos con lo que buscás, sos el primero en enterarte.",
              },
              {
                title: "Gastá menos",
                desc: "Accedés a precios que buscando por tu cuenta son casi imposibles de encontrar.",
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

      {/* ── FAQ ── */}
      <section id="faq" className="px-6 md:px-14 py-20 bg-[#faf6f1] border-t border-[#e8e0d4]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3d2b1f] text-center mb-12">Preguntas frecuentes</h2>
          <div className="flex flex-col gap-6">
            {[
              {
                q: "¿Cuánto cuesta?",
                a: "Es gratis. Ofrecemos un servicio principal que te alerta sobre ofertas increíbles sin cobrar una tarifa de suscripción. Queremos que más personas experimenten la belleza de Sudamérica.",
              },
              {
                q: "¿Con qué frecuencia recibiré alertas?",
                a: "Solo cuando se encuentran ofertas reales. Valoramos tu espacio y no te bombardearemos con tarifas promedio. Solo sabrás de nosotros cuando encontremos una verdadera ganga o un error de tarifa.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-8">
                <h3 className="text-base font-bold text-[#3d2b1f] mb-3">{item.q}</h3>
                <p className="text-[#8c6a58] leading-relaxed text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="empezar" className="px-6 md:px-14 py-6">
        <div
          className="max-w-7xl mx-auto rounded-3xl px-8 md:px-20 py-16 text-center"
          style={{ background: "linear-gradient(135deg, #e07842 0%, #7a2e0a 100%)" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-[-0.02em] mb-4">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">
            No pagues de más nunca más. Unite hoy a la comunidad de viajeros inteligentes más grande{"\u00A0"}de{"\u00A0"}la{"\u00A0"}región.
          </p>
          <EmailForm dark />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-14 py-7 border-t border-[#e8e0d4]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-base font-extrabold tracking-tight">
            vola<span className="text-[#e07842]">ya!</span>
          </span>
          <p className="text-xs text-[#c0a890]">
            © 2026 Vola Ya! Todos los derechos reservados.
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
