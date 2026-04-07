"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STEPS } from "../lib/data";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hiw-header", {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".hiw-header", start: "top 88%" },
        });

        // Connector line scales in from left → right
        gsap.from(".hiw-connector", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".steps-grid", start: "top 82%" },
        });

        // Cards enter with stagger — each from a distinct direction
        const cards = gsap.utils.toArray<HTMLElement>(".step-card");
        const directions = [
          { x: -50, y: 30 },
          { x: 0, y: 60 },
          { x: 50, y: 30 },
        ];
        cards.forEach((card, i) => {
          gsap.from(card, {
            autoAlpha: 0,
            x: directions[i]?.x ?? 0,
            y: directions[i]?.y ?? 40,
            scale: 0.96,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".steps-grid",
              start: "top 82%",
            },
            delay: i * 0.13,
          });
        });

        // Ghost numbers pop
        gsap.from(".step-num", {
          scale: 0.5,
          autoAlpha: 0,
          duration: 1,
          ease: "back.out(1.5)",
          stagger: 0.14,
          scrollTrigger: { trigger: ".steps-grid", start: "top 82%" },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="px-6 md:px-14 py-16 border-t border-[#e8e0d4]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="hiw-header">
          <SectionHeader
            label="Cómo funciona"
            subtitle="Eliminamos la complejidad de encontrar ofertas de vuelos. Simple. Rápido. Sin vueltas."
          />
        </div>

        {/* Connector line — desktop only */}
        <div className="hidden md:block mb-0 -mt-2 px-10" aria-hidden>
          <div
            className="hiw-connector h-px bg-gradient-to-r from-transparent via-[#e07842]/30 to-transparent"
          />
        </div>

        <div className="steps-grid grid md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="step-card relative px-0 py-12 md:px-10 md:py-12 md:border-l border-[#e8e0d4] md:first:border-l-0"
            >
              <span
                className="step-num absolute -top-2 left-0 md:left-8 text-[8rem] font-extrabold text-[#e07842] leading-none select-none pointer-events-none"
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
