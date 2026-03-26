import { FEATURES } from "../lib/data";
import SectionHeader from "./SectionHeader";

export default function WhyVolaYa() {
  return (
    <section id="por-que" className="px-6 md:px-14 py-16 bg-[#f0ebe3]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Por qué Vola Ya!"
          labelNode={<>Por qué Vola <span className="text-[#e07842]">Ya!</span></>}
        />

        <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="flex gap-5 py-9 border-b border-[#e0d8ce] last:border-0 md:[&:nth-last-child(2)]:border-0"
            >
              <div className="w-1 flex-shrink-0 rounded-full bg-[#e07842] self-stretch min-h-[2rem]" />
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
