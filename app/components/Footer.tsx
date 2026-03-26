export default function Footer() {
  return (
    <footer className="px-6 md:px-14 py-7 border-t border-[#e8e0d4]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-base font-extrabold tracking-tight">
          vola<span className="text-[#e07842]">ya!</span>
        </span>
        <p className="text-xs text-[#c0a890]">© 2026 Vola Ya! Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-[#b09080] hover:text-[#3d2b1f] transition-colors">
            Términos
          </a>
          <a href="#" className="text-xs text-[#b09080] hover:text-[#3d2b1f] transition-colors">
            Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
