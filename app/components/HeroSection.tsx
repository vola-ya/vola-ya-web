import EmailForm from "./EmailForm";
import { GRADIENTS } from "../lib/constants";

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

export default function HeroSection() {
  return (
    <section className="relative px-6 md:px-14 pt-14 pb-24 overflow-clip">
      {/* Background visual — desktop only */}
      <div
        className="absolute top-0 right-0 h-full w-[65%] hidden lg:flex items-center justify-end pointer-events-none z-0"
        style={{ animation: "fadeIn 0.8s 0.35s ease-out both" }}
      >
        <HeroVisual />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mobile visual */}
        <div
          className="flex justify-center mb-14 lg:hidden"
          style={{ animation: "fadeIn 0.6s ease-out both" }}
        >
          <HeroVisual />
        </div>

        <div className="max-w-xl">
          <div className="mb-6" style={{ animation: "fadeInUp 0.6s ease-out both" }}>
            <span
              className="inline-flex items-center gap-2.5 text-white text-xs font-bold tracking-[0.12em] uppercase px-4 py-2 rounded-full"
              style={{ background: GRADIENTS.subtle }}
            >
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
            a una{" "}
            <span
              className="italic"
              style={{
                background: GRADIENTS.subtle,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingRight: "0.12em",
              }}
            >
              alerta
            </span>
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
            <p className="mt-4 text-xs text-[#b09080]">Solo te escribimos cuando vale la pena.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
