"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmailForm from "./EmailForm";
import { GRADIENTS } from "../lib/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-card", {
          autoAlpha: 0,
          y: 40,
          scale: 0.97,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-card",
            start: "top 88%",
          },
        });

        gsap.from([".cta-title", ".cta-sub", ".cta-form"], {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".cta-card",
            start: "top 82%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="empezar" className="px-6 md:px-14 py-6">
      <div
        className="cta-card max-w-7xl mx-auto rounded-3xl px-8 md:px-20 py-16 text-center"
        style={{ background: GRADIENTS.dark }}
      >
        <h2 className="cta-title text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-[-0.02em] mb-4">
          ¿Listo para tu próxima aventura?
        </h2>
        <p className="cta-sub text-white/80 text-lg mb-10 max-w-md mx-auto">
          No pagues de más nunca más. Unite hoy a la comunidad de viajeros inteligentes más
          grande{"\u00A0"}de{"\u00A0"}la{"\u00A0"}región.
        </p>
        <div className="cta-form">
          <EmailForm dark buttonLabel="¡Quiero viajar!" />
        </div>
      </div>
    </section>
  );
}
