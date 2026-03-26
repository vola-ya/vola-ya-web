import { FAQ_ITEMS } from "../lib/data";
import SectionHeader from "./SectionHeader";

export default function FAQ() {
  return (
    <section id="faq" className="px-6 md:px-14 py-20 bg-[#faf6f1] border-t border-[#e8e0d4]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="Preguntas frecuentes" title="Todo lo que necesitás saber" />
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="bg-white rounded-2xl p-8">
              <h3 className="text-base font-bold text-[#3d2b1f] mb-3">{item.q}</h3>
              <p className="text-[#8c6a58] leading-relaxed text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
