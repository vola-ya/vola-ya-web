"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURES } from "../lib/data";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WhyVolaYa() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Section header
        gsap.from(".why-header", {
          autoAlpha: 0,
          y: 24,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".why-header",
            start: "top 88%",
          },
        });

        // Feature items slide in from the left
        ScrollTrigger.batch(".feature-item", {
          start: "top 86%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1,
            }),
          once: true,
        });

        // Orange bar grows from top down
        ScrollTrigger.batch(".feature-bar", {
          start: "top 86%",
          onEnter: (batch) =>
            gsap.to(batch, {
              scaleY: 1,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.1,
            }),
          once: true,
        });

        // Set initial states
        gsap.set(".feature-item", { autoAlpha: 0, x: -30 });
        gsap.set(".feature-bar", { scaleY: 0, transformOrigin: "top center" });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="por-que"
      className="px-6 md:px-14 py-16 bg-[#f0ebe3]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="why-header">
          <SectionHeader
            label="Por qué Vola Ya!"
            labelNode={
              <>
                Por qué Vola <span className="text-[#e07842]">Ya!</span>
              </>
            }
          />
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="feature-item flex gap-5 py-9 border-b border-[#e0d8ce] last:border-0 md:[&:nth-last-child(2)]:border-0"
            >
              <div className="feature-bar w-1 flex-shrink-0 rounded-full bg-[#e07842] self-stretch min-h-[2rem]" />
              <div>
                <h3 className="text-xl font-bold text-[#3d2b1f] mb-2">{item.title}</h3>
                <p className="text-[#8c6a58] leading-relaxed text-[15px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
