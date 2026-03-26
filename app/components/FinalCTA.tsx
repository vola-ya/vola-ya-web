import EmailForm from "./EmailForm";
import { GRADIENTS } from "../lib/constants";

export default function FinalCTA() {
  return (
    <section id="empezar" className="px-6 md:px-14 py-6">
      <div
        className="max-w-7xl mx-auto rounded-3xl px-8 md:px-20 py-16 text-center"
        style={{ background: GRADIENTS.dark }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-[-0.02em] mb-4">
          ¿Listo para tu próxima aventura?
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">
          No pagues de más nunca más. Unite hoy a la comunidad de viajeros inteligentes más grande{"\u00A0"}de{"\u00A0"}la{"\u00A0"}región.
        </p>
        <EmailForm dark buttonLabel="¡Quiero viajar!" />
      </div>
    </section>
  );
}
