"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FAQ_ITEMS } from "../lib/data";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-header", {
          autoAlpha: 0,
          y: 24,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-header",
            start: "top 88%",
          },
        });

        gsap.set(".faq-card", { autoAlpha: 0, y: 36, scale: 0.97 });

        ScrollTrigger.batch(".faq-card", {
          start: "top 88%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1,
            }),
          once: true,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="px-6 md:px-14 py-20 bg-[#faf6f1] border-t border-[#e8e0d4]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="faq-header">
          <SectionHeader label="Preguntas frecuentes" title="Todo lo que necesitás saber" />
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="faq-card bg-white rounded-2xl p-8">
              <h3 className="text-base font-bold text-[#3d2b1f] mb-3">{item.q}</h3>
              <p className="text-[#8c6a58] leading-relaxed text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
