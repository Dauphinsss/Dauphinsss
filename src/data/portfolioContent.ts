export type Lang = "en" | "es";
export type ThemeMode = "light" | "dark";

export const profile = {
  name: "Marcos Velaquez Vela",
  handle: "Dauphinsss",
  email: "marcosvelasquezvela123@gmail.com",
  github: "https://github.com/Dauphinsss",
  linkedin: "https://www.linkedin.com/in/dauphinsss/",
  whatsapp: "https://wa.me/59172776768"
};

export const copy = {
  en: {
    label: "Digital Playground",
    name: "Marcos Velaquez Vela",
    bio: "Web, mobile, and desktop developer. I design with motion and build with precision.",
    signature: "Made with a lot of <3 and caffeine.",
    workTitle: "Visual Pulse",
    workItems: ["VISUAL", "PULSE", "SALMON"],
    aboutTitle: "About",
    aboutText:
      "People call me Marko. Online, I am Dauphinsss. React, Astro, Node, and GSAP are my main language.",
    linksTitle: "Contact",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    whatsapp: "WhatsApp",
    footer: "Open to collaborations, commissions, and bold ideas."
  },
  es: {
    label: "Playground Digital",
    name: "Marcos Velaquez Vela",
    bio: "Desarrollador web, mobile y desktop. Diseno con movimiento y construyo con precision.",
    signature: "Hecho con mucho <3 y cafeina.",
    workTitle: "Pulso Visual",
    workItems: ["PULSO", "VISUAL", "SALMON"],
    aboutTitle: "Sobre Mi",
    aboutText:
      "Todos me dicen Marko. En internet soy Dauphinsss. React, Astro, Node y GSAP son mi idioma principal.",
    linksTitle: "Contacto",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    whatsapp: "WhatsApp",
    footer: "Disponible para colaboraciones, comisiones e ideas audaces."
  }
} as const;
