import type { ReactNode } from "react";

export interface Step {
  num: string;
  title: string;
  desc: string;
  icon: ReactNode;
}

export interface Deal {
  discount: string;
  location: string;
  city: string;
  price: string;
  original: string;
  offset: boolean;
  img: string;
  tag?: string;
}

export interface Feature {
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export const STEPS: Step[] = [
  {
    num: "01",
    title: "Rastreo Inteligente",
    desc: "Solo necesitás un email. Sin tarjeta, sin datos de más. En 10 segundos estás dentro.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="11" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Alertas Inmediatas",
    desc: "Monitoreamos cientos de rutas todos los días buscando caídas de precios reales.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Vuela y Ahorra",
    desc: "Recibís un email claro con el precio, la ruta y el link. Comprás directo con la aerolínea.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22l-4-9-9-4 19-7z" />
      </svg>
    ),
  },
];

export const DEALS: Deal[] = [
  {
    discount: "-51% DESCUENTO",
    location: "Cusco, Perú",
    city: "Cusco",
    price: "$220",
    original: "$450",
    offset: false,
    img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80",
  },
  {
    discount: "-47% DESCUENTO",
    location: "Argentina",
    city: "Buenos Aires",
    price: "$310",
    original: "$580",
    offset: true,
    img: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&q=80",
  },
  {
    discount: "-47% DESCUENTO",
    location: "Brasil",
    city: "Río de Janeiro",
    price: "$275",
    original: "$520",
    offset: false,
    img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80",
    tag: "Error de tarifa",
  },
];

export const FEATURES: Feature[] = [
  {
    title: "Foco sudamericano",
    desc: "Rutas desde y hacia Argentina, Brasil, Chile, Colombia y más. Ofertas pensadas para viajeros de la región.",
  },
  {
    title: "En español, para vos",
    desc: "Todo lo que necesitás saber, en tu idioma, con el contexto que importa. Precios en dólares y pesos, fechas, condiciones.",
  },
  {
    title: "Mientras hacés tu valija",
    desc: "Rastreamos precios todo el día. Cuando demos con lo que buscás, sos el primero en enterarte.",
  },
  {
    title: "Gastá menos",
    desc: "Accedés a precios que buscando por tu cuenta son casi imposibles de encontrar.",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    q: "¿Cuánto cuesta?",
    a: "Es gratis. Ofrecemos un servicio principal que te alerta sobre ofertas increíbles sin cobrar una tarifa de suscripción. Queremos que más personas experimenten la belleza de Sudamérica.",
  },
  {
    q: "¿Con qué frecuencia recibiré alertas?",
    a: "Solo cuando se encuentran ofertas reales. Valoramos tu espacio y no te bombardearemos con tarifas promedio. Solo sabrás de nosotros cuando encontremos una verdadera ganga o un error de tarifa.",
  },
];
