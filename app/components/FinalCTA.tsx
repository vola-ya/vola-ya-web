"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmailForm from "./EmailForm";
import { GRADIENTS } from "../lib/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function CTABlobs() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      <div
        className="cta-orb-1 absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: "-30%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />
      <div
        className="cta-orb-2 absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          bottom: "-20%",
          left: "5%",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(35px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Blob loops inside CTA card
        gsap.to(".cta-orb-1", {
          x: 40,
          y: -30,
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(".cta-orb-2", {
          x: -25,
          y: 40,
          duration: 12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 3,
        });

        // Card entrance
        gsap.from(".cta-card", {
          autoAlpha: 0,
          y: 48,
          scale: 0.97,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta-card", start: "top 88%" },
        });

        // Content stagger
        gsap.from([".cta-title", ".cta-sub", ".cta-form"], {
          autoAlpha: 0,
          y: 26,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.13,
          scrollTrigger: { trigger: ".cta-card", start: "top 82%" },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="empezar" className="px-6 md:px-14 py-6">
      <div
        className="cta-card relative max-w-7xl mx-auto rounded-3xl px-8 md:px-20 py-16 text-center overflow-hidden"
        style={{ background: GRADIENTS.dark }}
      >
        <CTABlobs />

        <div className="relative z-10">
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
      </div>
    </section>
  );
}
