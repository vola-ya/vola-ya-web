import { DEALS } from "../lib/data";
import { GRADIENTS } from "../lib/constants";
import SectionHeader from "./SectionHeader";

export default function OpportunitiesSection() {
  return (
    <section className="px-6 md:px-14 py-20 border-t border-[#e8e0d4]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <SectionHeader
            label="Alertas recientes"
            title="Oportunidades de hoy"
            subtitle="¡No te pierdas el próximo! Estas ofertas se las enviamos a los usuarios en las últimas 48hs."
          />
          <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e07842] hover:opacity-70 transition-opacity whitespace-nowrap mb-8">
            Ver historial completo
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          {DEALS.map((card) => (
            <div key={card.city} className={`cursor-pointer group ${card.offset ? "md:mt-10" : ""}`}>
              <div className="relative rounded-2xl overflow-hidden mb-4" style={{ height: 340 }}>
                <img
                  src={card.img}
                  alt={card.city}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full text-white"
                    style={{ background: GRADIENTS.primary }}
                  >
                    {card.discount}
                  </span>
                  {card.tag && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white text-[#9c4411]">
                      {card.tag}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start justify-between px-1">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#e07842] mb-1">{card.location}</p>
                  <h3 className="text-xl font-extrabold text-[#3d2b1f]">{card.city}</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#b09080] line-through mb-0.5">{card.original}</p>
                  <p className="text-xl font-black text-[#e07842]">{card.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
