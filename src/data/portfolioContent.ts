export type Lang = "en" | "es";
export type ThemeMode = "light" | "dark";

export const profile = {
  name: "Marcos Velasquez Vela",
  handle: "Dauphinsss",
  email: "marcosvelasquezvela123@gmail.com",
  github: "https://github.com/Dauphinsss",
  linkedin: "https://www.linkedin.com/in/dauphinsss/",
  whatsapp: "https://wa.me/59172776768"
};

export const copy = {
  en: {
    label: "Portfolio",
    name: "Marcos Velasquez Vela",
    bio: "Fullstack developer focused on building clean products, useful experiences, and motion-rich interfaces.",
    workTitle: "What I Build",
    workItems: ["Web Apps", "Frontend Motion", "Fullstack Systems"],
    aboutTitle: "About",
    aboutText:
      "I am Dauphinsss online. I like to turn ideas into products that feel simple, fast, and human.",
    linksTitle: "Contact",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    whatsapp: "WhatsApp",
    footer: "Open to collaborations and freelance work."
  },
  es: {
    label: "Portafolio",
    name: "Marcos Velasquez Vela",
    bio: "Desarrollador fullstack enfocado en crear productos limpios, experiencias utiles e interfaces con movimiento.",
    workTitle: "Lo Que Construyo",
    workItems: ["Web Apps", "Animacion Frontend", "Sistemas Fullstack"],
    aboutTitle: "Sobre Mi",
    aboutText:
      "En internet soy Dauphinsss. Me gusta convertir ideas en productos simples, rapidos y humanos.",
    linksTitle: "Contacto",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    whatsapp: "WhatsApp",
    footer: "Disponible para colaboraciones y trabajo freelance."
  }
} as const;
