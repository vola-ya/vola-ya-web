"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GRADIENTS } from "../lib/constants";

gsap.registerPlugin(useGSAP);

// ─── Alert data — "dark" variant = true for special alerts ───────────────────
const SETS: { route: string; saving: string; price: string; label: string; dark?: boolean }[][] = [
  [
    { route: "EZE → LIM", saving: "-51%", price: "$220", label: "Error de tarifa", dark: false },
    { route: "GRU → BOG", saving: "-47%", price: "$275", label: "Oferta flash", dark: false },
    { route: "SCL → MVD", saving: "-38%", price: "$189", label: "Precio mínimo", dark: true },
  ],
  [
    { route: "BOG → MEX", saving: "-44%", price: "$310", label: "Tarifa oculta", dark: false },
    { route: "LIM → MAD", saving: "-52%", price: "$490", label: "Error de tarifa", dark: true },
    { route: "EZE → MIA", saving: "-41%", price: "$350", label: "Oferta flash", dark: true },
  ],
];

// [x, y] offsets from container center
const POSITIONS = [
  [[-175, -145], [195, 10], [-155, 155]],
  [[175, -145], [-195, 10], [155, 155]],
] as const;

// ─── Floating alert card ──────────────────────────────────────────────────────
function AlertCard({ route, saving, price, label, dark = false, id }: {
  route: string; saving: string; price: string; label: string; dark?: boolean; id: string;
}) {
  const bg = dark ? "#3d2b1f" : "rgba(255,255,255,0.96)";
  const border = dark ? "1px solid rgba(224,120,66,0.3)" : "1px solid rgba(224,120,66,0.18)";
  const shadow = dark
    ? "0 10px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(224,120,66,0.15)"
    : "0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(224,120,66,0.1)";
  const routeColor = dark ? "#faf6f1" : "#3d2b1f";
  const labelColor = dark ? "#c8a090" : "#8c6a58";
  const planeStroke = dark ? "#e07842" : "#e07842";

  return (
    <div
      id={id}
      className="absolute rounded-xl overflow-hidden"
      style={{
        width: 162,
        top: "50%",
        left: "50%",
        marginTop: -38,
        marginLeft: -81,
        zIndex: 20,
        background: bg,
        backdropFilter: "blur(16px)",
        border,
        boxShadow: shadow,
        willChange: "transform",
        transform: "translate(0px,0px) scale(0)",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={planeStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z" />
            </svg>
            <span className="text-[11px] font-black tracking-tight" style={{ color: routeColor }}>{route}</span>
          </div>
          <span
            className="text-[8px] font-black text-white px-1.5 py-0.5 rounded-full shrink-0 ml-1"
            style={{ background: GRADIENTS.primary }}
          >
            {saving}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px]" style={{ color: labelColor }}>{label}</span>
          <span className="text-[14px] font-black text-[#e07842]">{price}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Micro-pulse ring (burst effect) ─────────────────────────────────────────
function PulseRing({ id }: { id: string }) {
  return (
    <div
      id={id}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 60,
        height: 60,
        top: "50%",
        left: "50%",
        marginTop: -30,
        marginLeft: -30,
        zIndex: 15,
        border: "1.5px solid #e07842",
        opacity: 0,
        willChange: "transform",
      }}
    />
  );
}

// ─── Radar rings ──────────────────────────────────────────────────────────────
function RadarRings() {
  return (
    <div className="radar-root absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`radar-ring-${i} absolute rounded-full border border-[#e07842]`}
          style={{ width: 190 + i * 80, height: 190 + i * 80, opacity: 0 }}
        />
      ))}
      <svg className="radar-arc absolute" style={{ width: 370, height: 370 }} viewBox="0 0 370 370">
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e07842" stopOpacity="0" />
            <stop offset="100%" stopColor="#e07842" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path d="M185,8 A177,177 0 0,1 362,185" fill="none" stroke="url(#arcGrad)" strokeWidth="2" />
      </svg>
    </div>
  );
}

// ─── Phone frame — light mode, Y-tilted, 3D depth ────────────────────────────
function PhoneFrame() {
  return (
    // Outer wrapper provides perspective for the tilt
    <div
      className="relative z-10"
      style={{ perspective: "800px", perspectiveOrigin: "50% 50%" }}
    >
      {/* Phone body */}
      <div
        className="relative flex flex-col"
        style={{
          width: 190,
          height: 360,
          borderRadius: 36,
          background: "linear-gradient(160deg, #fdf9f5 0%, #f0e8dc 100%)",
          boxShadow: [
            "8px 0 0 0 rgba(38,32,26,0.82)",  // right edge — metallic dark warm
            "-2px 0 0 0 rgba(55,48,40,0.6)",  // left edge — slightly lighter
            "0 3px 0 0 rgba(30,24,18,0.7)",   // bottom edge
            "0 50px 100px rgba(0,0,0,0.22)",  // deep ambient
            "0 12px 30px rgba(0,0,0,0.14)",   // mid shadow
            "0 4px 8px rgba(0,0,0,0.09)",     // near shadow
            "inset 0 1px 0 rgba(255,255,255,0.95)", // top glare
          ].join(", "),
          border: "1.5px solid rgba(45,38,30,0.75)",
          transform: "rotateY(-18deg)",
          transformStyle: "preserve-3d",
          overflow: "visible",
        }}
      >
        {/* Clip to border-radius for screen content */}
        <div
          className="flex flex-col flex-1"
          style={{ borderRadius: 36, overflow: "hidden" }}
        >
          {/* Screen glass glare */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 36,
              background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 50%)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />

          {/* Dynamic island */}
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div style={{ width: 68, height: 20, borderRadius: 12, background: "#1a1008" }} />
          </div>

          {/* Screen content */}
          <div className="flex-1 flex flex-col px-3.5 pt-2.5 pb-3 overflow-hidden">
            {/* App header */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-[11px] font-black uppercase tracking-widest"
                style={{
                  background: GRADIENTS.subtle,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Vola Ya!
              </span>
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e07842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span
                  className="phone-badge absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-[6px] font-black text-white"
                  style={{ background: GRADIENTS.primary }}
                >3</span>
              </div>
            </div>

            {/* Scanning status */}
            <div className="flex items-center gap-1.5 mb-5">
              <span className="phone-dot w-1.5 h-1.5 rounded-full bg-[#e07842]" />
              <span className="text-[8px] text-[#8c6a58] font-semibold uppercase tracking-widest">
                Rastreando rutas...
              </span>
            </div>

            {/* Scrolling destinations */}
            <div className="flex-1 overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)" }}>
              <div style={{ animation: "scrollUp 12s linear infinite" }}>
                {[
                  { from: "EZE", to: "LIM", price: "$220", hot: false },
                  { from: "GRU", to: "BOG", price: "$275", hot: false },
                  { from: "SCL", to: "MVD", price: "$189", hot: true },
                  { from: "BOG", to: "MEX", price: "$310", hot: false },
                  { from: "LIM", to: "MAD", price: "$490", hot: false },
                  { from: "EZE", to: "MIA", price: "$350", hot: true },
                  { from: "GRU", to: "SCL", price: "$165", hot: false },
                  { from: "BOG", to: "LIM", price: "$240", hot: false },
                  // duplicate for seamless loop
                  { from: "EZE", to: "LIM", price: "$220", hot: true },
                  { from: "GRU", to: "BOG", price: "$275", hot: false },
                  { from: "SCL", to: "MVD", price: "$189", hot: true },
                  { from: "BOG", to: "MEX", price: "$310", hot: false },
                  { from: "LIM", to: "MAD", price: "$490", hot: true },
                  { from: "EZE", to: "MIA", price: "$350", hot: false },
                  { from: "GRU", to: "SCL", price: "$165", hot: false },
                  { from: "BOG", to: "LIM", price: "$240", hot: true },
                ].map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-1.5 py-1.5 border-b border-[#e8ddd4]/60 last:border-0"
                    style={d.hot ? { background: "linear-gradient(90deg, rgba(224,120,66,0.13) 0%, rgba(224,120,66,0.06) 100%)", borderRadius: 6 } : undefined}
                  >
                    <span className="text-[9px] font-bold" style={{ color: d.hot ? "#c45a20" : "#3d2b1f" }}>{d.from} → {d.to}</span>
                    <span className="text-[10px] font-black" style={{ color: d.hot ? "#e07842" : "#8c6a58" }}>{d.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-1.5 pt-2">
              <div className="phone-bar flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(224,120,66,0.12)" }}>
                <div className="phone-bar-fill h-full rounded-full" style={{ background: GRADIENTS.primary, width: "0%" }} />
              </div>
              <span className="text-[7px] text-[#b09080]">Escaneando</span>
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2.5 shrink-0">
            <div style={{ width: 56, height: 3, borderRadius: 2, background: "rgba(60,30,10,0.15)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HeroVisual ───────────────────────────────────────────────────────────────
export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".radar-ring-1, .radar-ring-2, .radar-ring-3, .radar-ring-4", { opacity: 0.12 });
        gsap.set(".phone-bar-fill", { width: "65%" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Radar rings breathe + pulse ──
        [1, 2, 3, 4].forEach((i) => {
          gsap.to(`.radar-ring-${i}`, {
            opacity: 0.18, scale: 1.04, duration: 2,
            ease: "sine.inOut", repeat: -1, yoyo: true, delay: (i - 1) * 0.45,
          });
          gsap.to(`.radar-ring-${i}`, {
            scale: 1.14, opacity: 0, duration: 1.8,
            ease: "power2.out", repeat: -1,
            repeatDelay: 2.5 + i * 0.4, delay: 1 + i * 0.6,
          });
        });

        // ── Arcs rotate ──
        gsap.to(".radar-arc", { rotation: 360, duration: 4, ease: "none", repeat: -1, transformOrigin: "center center" });

        // ── Phone idle ──
        gsap.to(".phone-badge", { scale: 1.35, duration: 0.6, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(".phone-dot", { autoAlpha: 0, duration: 0.7, ease: "none", repeat: -1, yoyo: true });
        gsap.to(".phone-bar-fill", { width: "100%", duration: 2.5, ease: "power1.inOut", repeat: -1, yoyo: true, repeatDelay: 0.3 });

        // ── Burst cycle ──
        const BURST = 0.5;
        const STAGGER = 0.45;
        const HOLD = 1.8;
        const FADE = 0.4;
        const GAP = 0.5;

        function firePulse(pulseId: string) {
          const el = document.getElementById(pulseId);
          if (!el) return;
          gsap.fromTo(el,
            { scale: 0.3, opacity: 0.8 },
            { scale: 3.5, opacity: 0, duration: 0.55, ease: "power2.out" }
          );
        }

        function runCycle(setIndex: 0 | 1, onComplete: () => void) {
          const positions = POSITIONS[setIndex];
          const cards = [0, 1, 2].map((i) => document.getElementById(`alert-${setIndex}-${i}`));
          const pulses = [0, 1, 2].map((i) => `pulse-${setIndex}-${i}`);

          // Reset all cards to center
          cards.forEach((card) => {
            if (card) gsap.set(card, { x: 0, y: 0, scale: 0, autoAlpha: 0, rotateY: -18 });
          });

          const tl = gsap.timeline({ onComplete });

          cards.forEach((card, i) => {
            if (!card) return;
            const [tx, ty] = positions[i];
            tl.to(card,
              { x: tx, y: ty, scale: 1, autoAlpha: 1, rotateY: -18, duration: BURST, ease: "back.out(1.5)" },
              i * STAGGER
            );
            // Fire micro-pulse at the moment each card bursts
            tl.call(() => firePulse(pulses[i]), [], i * STAGGER);
          });

          tl.to({}, { duration: HOLD });

          tl.to(cards.filter(Boolean), {
            autoAlpha: 0, scale: 0.75, rotateY: -18,
            duration: FADE, ease: "power2.in",
          });

          tl.to({}, { duration: GAP });
        }

        function loop() {
          runCycle(0, () => runCycle(1, loop));
        }

        gsap.delayedCall(0.8, loop);
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: 440, height: 440, perspective: "800px" }}
      aria-hidden
    >
      <RadarRings />
      <PhoneFrame />

      {/* Alert cards — both cycles */}
      {SETS[0].map((alert, i) => <AlertCard key={`a0${i}`} id={`alert-0-${i}`} {...alert} />)}
      {SETS[1].map((alert, i) => <AlertCard key={`a1${i}`} id={`alert-1-${i}`} {...alert} />)}

      {/* Micro-pulse rings — one per card per cycle */}
      {[0, 1].map((s) => [0, 1, 2].map((i) => (
        <PulseRing key={`p${s}${i}`} id={`pulse-${s}-${i}`} />
      )))}
    </div>
  );
}
