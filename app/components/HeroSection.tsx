"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EmailForm from "./EmailForm";
import { GRADIENTS } from "../lib/constants";
import HeroVisual from "./HeroVisual";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── Blob orbs background ─────────────────────────────────────────────────────
function Blobs() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="hero-orb-1 absolute rounded-full"
        style={{
          width: 650,
          height: 650,
          top: "-15%",
          right: "-5%",
          background: "radial-gradient(circle, #e07842 0%, #f5d0b8 50%, transparent 75%)",
          opacity: 0.32,
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      <div
        className="hero-orb-2 absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          top: "10%",
          left: "-8%",
          background: "radial-gradient(circle, #c45a20 0%, transparent 70%)",
          opacity: 0.14,
          filter: "blur(65px)",
          willChange: "transform",
        }}
      />
      <div
        className="hero-orb-3 absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          bottom: "8%",
          right: "28%",
          background: "radial-gradient(circle, #e07842 0%, transparent 70%)",
          opacity: 0.18,
          filter: "blur(55px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

// ─── Stat counter ─────────────────────────────────────────────────────────────
interface StatProps {
  prefix?: string;
  target: number;
  suffix: string;
  label: string;
  format?: (v: number) => string;
}

function Stat({ prefix = "", target, suffix, label, format }: StatProps) {
  const valRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = valRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const v = format ? format(target) : String(target);
      el.textContent = prefix + v + suffix;
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate() {
          const v = format ? format(obj.val) : String(Math.round(obj.val));
          el.textContent = prefix + v + suffix;
        },
      });
    });
  });

  return (
    <div className="hero-stat flex flex-col items-center gap-1.5">
      <span
        ref={valRef}
        className="text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums pb-1 whitespace-nowrap"
        style={{
          background: GRADIENTS.subtle,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {prefix}0{suffix}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-widest text-[#8c6a58]">
        {label}
      </span>
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".hero-badge", ".hero-title", ".hero-sub", ".hero-form", ".hero-stats", ".hero-visual"],
          { autoAlpha: 1, x: 0, y: 0 }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Ambient blob loops ──
        gsap.to(".hero-orb-1", { x: 45, y: 35, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(".hero-orb-2", { x: -30, y: 50, duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2 });
        gsap.to(".hero-orb-3", { x: 20, y: -40, duration: 11, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 4 });

        // ── Left content entrance ──
        gsap.set(".hero-badge", { autoAlpha: 0, y: 24 });
        gsap.set([".hero-title", ".hero-sub", ".hero-form", ".hero-stats"], { autoAlpha: 0, y: 36 });
        gsap.set(".hero-visual", { autoAlpha: 0, x: 50 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(".hero-badge", { autoAlpha: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" })
          .to(".hero-title", { autoAlpha: 1, y: 0, duration: 0.75 }, "-=0.3")
          .to(".hero-sub", { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.45")
          .to(".hero-form", { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.4")
          .to(".hero-stats", { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.25")
          .to(".hero-visual", { autoAlpha: 1, x: 0, duration: 1, ease: "power2.out" }, 0.1);

        // ── "mucho menos" shimmer every ~7s ──
        gsap.to(".hero-highlight", {
          backgroundPositionX: "-20%",
          duration: 1,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 6,
          delay: 2.5,
        });

        // ── Natural scroll parallax ──
        const p = { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-badge", { y: -40, scrollTrigger: p });
        gsap.to(".hero-title", { y: -100, scrollTrigger: p });
        gsap.to(".hero-sub", { y: -140, scrollTrigger: p });
        gsap.to(".hero-form", { y: -80, scrollTrigger: p });
        gsap.to(".hero-stats", { y: -30, scrollTrigger: p });
        gsap.to(".hero-orb-1", { y: -60, scrollTrigger: p });
        gsap.to(".hero-orb-2", { y: -90, scrollTrigger: p });
        gsap.to(".hero-visual", { y: -50, scrollTrigger: p });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-14 pt-14 pb-24 overflow-hidden"
    >
      <Blobs />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center justify-between gap-8">

          {/* Left — copy */}
          <div className="max-w-xl w-full">
            <div className="mb-6 hero-badge">
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

            <h1 className="hero-title text-[2.8rem] sm:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#3d2b1f] mb-4">
              Visita destinos increíbles por
              <br />
              <span
                className="hero-highlight italic"
                style={{
                  background: "linear-gradient(105deg, #e07842 0%, #c45a20 28%, #fde8d0 46%, #fff8f3 50%, #fde8d0 54%, #c45a20 72%, #e07842 100%)",
                  backgroundSize: "300% 100%",
                  backgroundPositionX: "100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingRight: "0.12em",
                }}
              >
                mucho menos
              </span>
            </h1>

            <p className="hero-sub text-lg text-[#8c6a58] leading-relaxed mb-8 max-w-lg">
              <span className="block">Encontramos los mejores precios.</span>
              <span className="block">Enterate primero.</span>
            </p>

            <div className="hero-form">
              <EmailForm />
              <p className="mt-4 text-xs text-[#b09080]">Te alertamos sobre los destinos que elijas</p>
            </div>

            <div className="hero-stats mt-14 grid grid-cols-2 gap-x-12 gap-y-10">
              <Stat target={10} suffix=" seg" label="para suscribirte" />
              <Stat target={3200} suffix="+" label="alertas enviadas" format={(v) => Math.round(v).toLocaleString("es-AR")} />
              <Stat prefix="-" target={51} suffix="%" label="descuento promedio" />
              <Stat target={0} suffix="" label="costo de suscripción" format={() => "Gratis"} />
            </div>
          </div>

          {/* Right — animated visual */}
          <div className="hidden lg:flex items-center justify-center shrink-0 hero-visual">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
