"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import EmailForm from "./EmailForm";
import { GRADIENTS } from "../lib/constants";

gsap.registerPlugin(useGSAP);

function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <img
      src="/hero-visual.png"
      alt="Vola Ya app preview"
      className={`select-none w-full max-w-none ${className}`}
      style={{ filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.15))" }}
    />
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".hero-badge", ".hero-title", ".hero-sub", ".hero-form", ".hero-img"], {
          autoAlpha: 1,
          x: 0,
          y: 0,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-badge", { autoAlpha: 0, y: 20 });
        gsap.set([".hero-title", ".hero-sub", ".hero-form"], { autoAlpha: 0, y: 32 });
        gsap.set(".hero-img", { autoAlpha: 0, x: 60 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(".hero-badge", { autoAlpha: 1, y: 0, duration: 0.55, ease: "back.out(1.6)" })
          .to(".hero-title", { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.25")
          .to(".hero-sub", { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.45")
          .to(".hero-form", { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.4")
          .to(".hero-img", { autoAlpha: 1, x: 0, duration: 0.9, ease: "power2.out" }, 0.05);

        // Subtle float loop after entrance
        gsap.to(".hero-img", {
          y: -8,
          rotationZ: 0.4,
          duration: 4.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative px-6 md:px-14 pt-14 pb-24 overflow-clip"
    >
      {/* Background visual — desktop only */}
      <div className="absolute top-0 right-0 h-full w-[65%] hidden lg:flex items-start justify-end pointer-events-none z-0">
        <HeroVisual className="hero-img" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mobile visual */}
        <div className="flex justify-center mb-14 lg:hidden">
          <HeroVisual className="hero-img" />
        </div>

        <div className="max-w-xl">
          <div className="mb-6 hero-badge">
            <span
              className="inline-flex items-center gap-2.5 text-white text-xs font-bold tracking-[0.12em] uppercase px-4 py-2 rounded-full"
              style={{ background: GRADIENTS.subtle }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
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
            className="hero-title text-[2.8rem] sm:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#3d2b1f] mb-3"
          >
            Visita destinos increíbles por
            <br />
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
              mucho menos
            </span>
            <br />
          </h1>

          <p className="hero-sub text-lg text-[#8c6a58] leading-relaxed mb-8 max-w-lg">
            <span className="block">Encontramos los mejores precios.</span>
            <span className="block">Enterate primero.</span>
          </p>

          <div className="hero-form">
            <EmailForm />
            <p className="mt-4 text-xs text-[#b09080]">
              Solo te escribimos cuando vale la pena.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
