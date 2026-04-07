"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, MotionPathPlugin);

// ── Geography ────────────────────────────────────────────────────────────────
// Rough South America silhouette path for the viewBox 0 0 560 480
const SA_PATH =
  "M 168,55 C 318,38 465,56 500,175 C 520,252 492,352 450,405 C 420,438 355,468 268,466 C 195,465 132,456 98,415 C 55,368 55,295 64,228 C 74,158 100,95 138,68 C 150,59 160,55 168,55 Z";

// 8 cities spread across the continent
const CITIES = [
  { id: "bog", x: 158, y: 78,  label: "BOGOTÁ",        deal: "-44%", price: "$135", anchor: "end"   },
  { id: "mde", x: 188, y: 112, label: "MEDELLÍN",      deal: "-38%", price: "$118", anchor: "end"   },
  { id: "lim", x: 128, y: 208, label: "LIMA",           deal: "-53%", price: "$107", anchor: "end"   },
  { id: "lpz", x: 252, y: 268, label: "LA PAZ",         deal: "-41%", price: "$98",  anchor: "start" },
  { id: "scl", x: 218, y: 385, label: "SANTIAGO",       deal: "-49%", price: "$95",  anchor: "end"   },
  { id: "bue", x: 395, y: 398, label: "BUENOS AIRES",   deal: "-51%", price: "$160", anchor: "start" },
  { id: "gru", x: 440, y: 302, label: "SÃO PAULO",      deal: "-46%", price: "$142", anchor: "start" },
  { id: "rio", x: 462, y: 232, label: "RÍO DE JANEIRO", deal: "-47%", price: "$145", anchor: "start" },
];

// Ambient routes always drawn (background network)
const AMBIENT_ROUTES = [
  { id: "amb-1", d: "M 395,398 C 320,340 240,290 218,385" },   // BUE → SCL
  { id: "amb-2", d: "M 395,398 C 420,345 435,318 440,302" },   // BUE → GRU
  { id: "amb-3", d: "M 440,302 C 450,268 456,250 462,232" },   // GRU → RIO
  { id: "amb-4", d: "M 128,208 C 185,260 225,268 252,268" },   // LIM → LPZ
  { id: "amb-5", d: "M 158,78  C 172,92  182,102 188,112" },   // BOG → MDE
];

// Active flight routes (drawn per flight)
const ACTIVE_ROUTES = [
  { id: "fly-1", d: "M 395,398 C 295,298 200,240 128,208",  from: "bue", to: "lim", dur: 3.4 },
  { id: "fly-2", d: "M 395,398 C 310,260 210,148 158,78",   from: "bue", to: "bog", dur: 3.8 },
  { id: "fly-3", d: "M 128,208 C 265,185 360,208 462,232",  from: "lim", to: "rio", dur: 3.2 },
  { id: "fly-4", d: "M 218,385 C 290,360 360,340 440,302",  from: "scl", to: "gru", dur: 2.8 },
  { id: "fly-5", d: "M 158,78  C 300,72  400,140 462,232",  from: "bog", to: "rio", dur: 3.6 },
];

// Which cities show alert tags (must be destinations in ACTIVE_ROUTES)
const ALERT_CITIES = ["lim", "bog", "rio", "gru"];

export default function HeroAnimation({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const svg = svgRef.current;
      if (!svg) return;

      // ── 1. Continent silhouette fades in ──────────────────────────
      gsap.from("#sa-silhouette", { autoAlpha: 0, duration: 1.2, ease: "power2.out" });

      // ── 2. Ambient glow pulses in ──────────────────────────────────
      gsap.from("#network-glow", { autoAlpha: 0, scale: 0.6, duration: 1.5, ease: "power2.out",
        transformOrigin: "center center", delay: 0.2 });

      // ── 3. Dot grid appears ────────────────────────────────────────
      gsap.from(".grid-dot", {
        autoAlpha: 0, scale: 0, duration: 0.4, delay: 0.1,
        stagger: { amount: 1, from: "random" },
      });

      // ── 4. Ambient routes draw slowly ─────────────────────────────
      gsap.fromTo(".ambient-route", { drawSVG: "0% 0%" }, {
        drawSVG: "0% 100%",
        duration: 1.8, ease: "power1.inOut", stagger: 0.15, delay: 0.5,
      });

      // ── 5. City nodes scale in ─────────────────────────────────────
      gsap.from(".city-pulse", {
        scale: 0, autoAlpha: 0, duration: 0.5, ease: "back.out(2.5)",
        stagger: 0.1, delay: 0.7, transformOrigin: "center center",
      });
      gsap.from(".city-core", {
        scale: 0, duration: 0.4, ease: "back.out(3)",
        stagger: 0.1, delay: 0.8, transformOrigin: "center center",
      });
      gsap.from(".city-name", { autoAlpha: 0, x: -6, duration: 0.4, stagger: 0.1, delay: 1.0 });

      // ── 6. Pulse rings loop ────────────────────────────────────────
      gsap.to(".city-pulse", {
        scale: 3, autoAlpha: 0, duration: 2.2, ease: "power1.out",
        repeat: -1, stagger: { each: 0.5 }, delay: 1.5,
        transformOrigin: "center center",
      });

      // ── 7. Flight sequence: ALERT FIRST → then plane flies ─────────
      function flySequence(idx: number) {
        const flight = ACTIVE_ROUTES[idx % ACTIVE_ROUTES.length];
        const routeEl  = svg!.querySelector<SVGPathElement>(`#${flight.id}`);
        const planeEl  = svg!.querySelector<SVGGElement>(`#plane`);
        const alertEl  = svg!.querySelector<SVGGElement>(`#alert-${flight.to}`);
        const destCity = CITIES.find((c) => c.id === flight.to);
        const pingEl   = svg!.querySelector<SVGCircleElement>(`#ping-${flight.to}`);

        if (!routeEl || !planeEl || !alertEl || !destCity) {
          gsap.delayedCall(0.5, () => flySequence(idx + 1));
          return;
        }

        // Reset
        gsap.set(routeEl, { drawSVG: "0% 0%", stroke: "#e07842", opacity: 0 });
        gsap.set(planeEl, { autoAlpha: 0 });
        gsap.set(alertEl, { autoAlpha: 0, scale: 0, transformOrigin: "center bottom" });

        const tl = gsap.timeline({ onComplete: () => flySequence(idx + 1) });

        // Step 1 — Deal alert POPS at destination (the discovery moment)
        tl.to(alertEl, {
          autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2.2)",
          transformOrigin: "center bottom",
        });

        // Radar ping from destination city
        if (pingEl) {
          tl.set(pingEl, { r: 6, opacity: 0.8 }, "<");
          tl.to(pingEl, { r: 32, opacity: 0, duration: 0.9, ease: "power1.out" }, "<");
        }

        // Step 2 — Short pause (user "sees" the deal)
        tl.to({}, { duration: 0.7 });

        // Step 3 — Active route draws from origin (the departure)
        tl.to(routeEl, { opacity: 0.85, duration: 0.2 });
        tl.fromTo(routeEl, { drawSVG: "0% 0%" }, {
          drawSVG: "0% 100%", duration: 0.9, ease: "power2.in",
        }, "<");

        // Step 4 — Plane appears at origin and flies to destination
        tl.to(planeEl, { autoAlpha: 1, duration: 0.15 });
        tl.to(planeEl, {
          motionPath: {
            path: routeEl, align: routeEl,
            alignOrigin: [0.5, 0.5], autoRotate: 90, start: 0, end: 1,
          },
          duration: flight.dur, ease: "power1.inOut",
        }, "<");

        // Step 5 — Plane arrives → alert celebrates + fades
        tl.to(planeEl, { autoAlpha: 0, duration: 0.25 }, "-=0.2");
        tl.to(alertEl, { scale: 1.12, duration: 0.18, transformOrigin: "center bottom" }, "<");
        tl.to(alertEl, { scale: 1, duration: 0.18, transformOrigin: "center bottom" });
        tl.to(alertEl, { autoAlpha: 0, duration: 0.35, delay: 1.0 });
        tl.to(routeEl, { opacity: 0, duration: 0.4 }, "-=0.35");
      }

      gsap.delayedCall(1.8, () => flySequence(0));
    });
  }, { scope: svgRef });

  // Dot grid
  const dots: { cx: number; cy: number }[] = [];
  for (let x = 28; x < 556; x += 38) {
    for (let y = 18; y < 480; y += 38) {
      dots.push({ cx: x, cy: y });
    }
  }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 560 480"
      className={className}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Warm glow behind network */}
        <radialGradient id="glowGrad" cx="55%" cy="55%" r="45%">
          <stop offset="0%"   stopColor="#e07842" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#e07842" stopOpacity="0" />
        </radialGradient>
        {/* Active route glow filter */}
        <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── SA silhouette ───────────────────────────────────────────── */}
      <path
        id="sa-silhouette"
        d={SA_PATH}
        fill="#e07842"
        opacity={0.055}
        stroke="#e07842"
        strokeWidth={0.8}
        strokeOpacity={0.15}
      />

      {/* ── Network glow ────────────────────────────────────────────── */}
      <ellipse
        id="network-glow"
        cx="305" cy="260"
        rx="220" ry="195"
        fill="url(#glowGrad)"
      />

      {/* ── Dot grid ────────────────────────────────────────────────── */}
      <g opacity={0.2}>
        {dots.map((d, i) => (
          <circle key={i} className="grid-dot" cx={d.cx} cy={d.cy} r={1.1} fill="#c8b09a" />
        ))}
      </g>

      {/* ── Ambient always-on routes ─────────────────────────────────── */}
      <g fill="none" strokeLinecap="round">
        {AMBIENT_ROUTES.map((r) => (
          <path
            key={r.id}
            id={r.id}
            className="ambient-route"
            d={r.d}
            stroke="#e07842"
            strokeWidth={1}
            strokeDasharray="4 5"
            opacity={0.3}
          />
        ))}
      </g>

      {/* ── Active flight routes (drawn per flight) ───────────────── */}
      <g fill="none" strokeLinecap="round">
        {ACTIVE_ROUTES.map((r) => (
          <path
            key={r.id}
            id={r.id}
            d={r.d}
            stroke="#e07842"
            strokeWidth={2}
            strokeDasharray="6 4"
            opacity={0}
            filter="url(#routeGlow)"
          />
        ))}
      </g>

      {/* ── City nodes ──────────────────────────────────────────────── */}
      {CITIES.map((c) => (
        <g key={c.id}>
          {/* Radar ping (animated per flight) */}
          <circle id={`ping-${c.id}`} cx={c.x} cy={c.y} r={6} fill="none" stroke="#e07842" strokeWidth={1.5} opacity={0} />
          {/* Pulse ring */}
          <circle className="city-pulse" cx={c.x} cy={c.y} r={6} fill="none" stroke="#e07842" strokeWidth={1.2} opacity={0.55} />
          {/* Dot */}
          <circle className="city-core" cx={c.x} cy={c.y} r={4.5} fill="#e07842" />
          <circle cx={c.x} cy={c.y} r={2} fill="#faf6f1" />
          {/* Label */}
          <text
            className="city-name"
            x={c.anchor === "end" ? c.x - 11 : c.x + 11}
            y={c.y + 4}
            textAnchor={c.anchor as "end" | "start"}
            fontSize={7.5}
            fontWeight={700}
            fill="#8c6a58"
            fontFamily="inherit"
            letterSpacing={0.8}
          >
            {c.label}
          </text>
        </g>
      ))}

      {/* ── Deal alert cards (one per destination city) ─────────────── */}
      {ALERT_CITIES.map((cityId) => {
        const c = CITIES.find((x) => x.id === cityId)!;
        const isRight = c.x > 280;
        const bx = isRight ? c.x + 12 : c.x - 82;
        const by = c.y - 46;
        const arrowX = isRight ? c.x + 12 : c.x - 6;

        return (
          <g key={`alert-${cityId}`} id={`alert-${cityId}`} opacity={0}>
            {/* Shadow */}
            <rect x={bx + 2} y={by + 2} width={68} height={40} rx={7} fill="#3d2b1f" opacity={0.2} />
            {/* Card */}
            <rect x={bx} y={by} width={68} height={40} rx={7} fill="#3d2b1f" />
            {/* Arrow */}
            <polygon
              points={`${arrowX},${c.y - 7} ${arrowX - 6},${c.y - 14} ${arrowX + 6},${c.y - 14}`}
              fill="#3d2b1f"
            />
            {/* Discount badge */}
            <rect x={bx + 7} y={by + 7} width={30} height={12} rx={3} fill="#e07842" />
            <text x={bx + 22} y={by + 17} textAnchor="middle" fontSize={7.5} fontWeight={800} fill="white" fontFamily="inherit">
              {c.deal}
            </text>
            {/* Price */}
            <text x={bx + 10} y={by + 34} fontSize={14} fontWeight={900} fill="white" fontFamily="inherit">
              {c.price}
            </text>
          </g>
        );
      })}

      {/* ── Single reusable airplane ─────────────────────────────────── */}
      <g id="plane" opacity={0}>
        <g transform="translate(-9,-9) scale(0.78)">
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="#e07842"
          />
        </g>
        {/* Glow halo */}
        <circle r={6} fill="#e07842" opacity={0.2} />
      </g>
    </svg>
  );
}
