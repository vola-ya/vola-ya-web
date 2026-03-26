import { GRADIENTS } from "../lib/constants";

export default function Navigation() {
  return (
    <nav className="relative px-6 md:px-14 py-4 flex items-center justify-between border-b border-[#e8e0d4]">
      <span className="text-xl font-extrabold tracking-tight">
        vola<span className="text-[#e07842]">ya!</span>
      </span>

      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        <a href="#" className="text-sm font-semibold text-[#e07842] border-b-2 border-[#e07842] pb-0.5">
          Ofertas
        </a>
        <a href="#como-funciona" className="text-sm text-[#8c6a58] hover:text-[#3d2b1f] font-medium transition-colors">
          Cómo funciona
        </a>
        <a href="#por-que" className="text-sm text-[#8c6a58] hover:text-[#3d2b1f] font-medium transition-colors">
          Nosotros
        </a>
        <a href="#faq" className="text-sm text-[#8c6a58] hover:text-[#3d2b1f] font-medium transition-colors">
          Preguntas frecuentes
        </a>
      </div>

      <a
        href="#empezar"
        className="hidden md:block text-xs font-bold text-white uppercase tracking-widest px-5 py-3 rounded-xl transition-all active:scale-95"
        style={{ background: GRADIENTS.primary }}
      >
        Regístrate ahora
      </a>
    </nav>
  );
}
