import { STEPS } from "../lib/data";
import SectionHeader from "./SectionHeader";

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="px-6 md:px-14 py-16 border-t border-[#e8e0d4]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Cómo funciona"
          subtitle="Eliminamos la complejidad de encontrar ofertas de vuelos. Simple. Rápido. Sin vueltas."
        />

        <div className="grid md:grid-cols-3">
          {STEPS.map((step, i) => (
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
                style={{ marginTop: i === 1 ? "1.5rem" : i === 2 ? "-0.5rem" : "0" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#e07842] shrink-0">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#3d2b1f]">{step.title}</h3>
                </div>
                <p className="text-[#8c6a58] leading-relaxed text-[15px]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
