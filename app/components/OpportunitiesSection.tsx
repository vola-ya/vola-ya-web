"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DEALS } from "../lib/data";
import { GRADIENTS } from "../lib/constants";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Destination names for the marquee strip
const DESTINATIONS =
  "Cusco · Buenos Aires · Río de Janeiro · Santiago · Bogotá · Lima · Cartagena · Medellín · Montevideo · São Paulo · Quito · Asunción ·\u00A0";

export default function OpportunitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".opp-header", {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".opp-header", start: "top 88%" },
        });

        // Each card enters from a distinct direction
        const cards = gsap.utils.toArray<HTMLElement>(".deal-card");
        const from = [
          { x: -60, y: 30, rotation: -2 },
          { x: 0,   y: 80, rotation: 0 },
          { x: 60,  y: 30, rotation: 2 },
        ];

        cards.forEach((card, i) => {
          const dir = from[i] ?? { x: 0, y: 40, rotation: 0 };
          gsap.fromTo(
            card,
            { autoAlpha: 0, x: dir.x, y: dir.y, rotation: dir.rotation, scale: 0.94 },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              delay: i * 0.13,
              scrollTrigger: { trigger: ".opp-cards", start: "top 85%" },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-14 py-20 border-t border-[#e8e0d4] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="opp-header flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionHeader
            label="Alertas recientes"
            title="Oportunidades de hoy"
            subtitle="¡No te pierdas el próximo! Estas ofertas se las enviamos a los usuarios en las últimas 48hs."
          />
          <a
            href="#"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e07842] hover:opacity-70 transition-opacity whitespace-nowrap mb-8"
          >
            Ver historial completo
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path
                d="M4 10h12M10 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Destination marquee */}
        <div className="relative mb-10 overflow-hidden" aria-hidden>
          <div className="marquee-track flex whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] text-[#e07842]/50">
            <span className="marquee-content">{DESTINATIONS}</span>
            <span className="marquee-content" aria-hidden>{DESTINATIONS}</span>
          </div>
        </div>

        <div className="opp-cards grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          {DEALS.map((card) => (
            <div
              key={card.city}
              className={`deal-card cursor-pointer group ${card.offset ? "md:mt-10" : ""}`}
            >
              <div
                className="relative rounded-2xl overflow-hidden mb-4"
                style={{ height: 340 }}
              >
                <img
                  src={card.img}
                  alt={card.city}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full text-white"
                    style={{ background: GRADIENTS.primary }}
                  >
                    {card.discount}
                  </span>
                  {card.tag && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white text-[#9c4411]">
                      {card.tag}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start justify-between px-1">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#e07842] mb-1">
                    {card.location}
                  </p>
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
  );
}
