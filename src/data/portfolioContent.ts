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
    bio: "Web, mobile, and desktop developer... and much more, I think..., I am good, I promise.",
    workTitle: "Visual Pulse",
    workItems: ["THIS SHOULD", "REPRESENT ME", "FOR REAL"],
    aboutTitle: "About",
    aboutText:
      "Hi, I am Marko. Fullstack developer from Bolivia — I build real things for the web, mobile and desktop, and I care about making every interface feel alive. Lately I am deep into automation and AI agents (n8n, MCP, LLMs).",
    linksTitle: "Contact",
    skillsTitle: "Skills",
    skillsRows: [
      "JavaScript · TypeScript · React · React Native · Expo · Next.js · Angular · Astro · HTML5 · CSS3 · TailwindCSS",
      "Node.js · Express · NestJS · Rust · Python · PostgreSQL · MySQL · Prisma · Firebase",
      "n8n · MCP · REST APIs · Webhooks · LLMs · AI Agents · Gemini · Claude · OpenAI",
      "GSAP · Framer Motion · Tauri · Git · VS Code · LaTeX · Bun · Docker"
    ],
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    whatsapp: "WhatsApp",
    footer: "Made with a lot of <3 and caffeine."
  },
  es: {
    label: "Playground Digital",
    name: "Marcos Velaquez Vela",
    bio: "Desarrollador web, mobile y desktop... y mucho mas, creo..., soy bueno, lo prometo.",
    workTitle: "Pulso Visual",
    workItems: ["ESTO DEBERIA", "REPRESENTARME", "DE VERDAD"],
    aboutTitle: "Sobre Mi",
    aboutText:
      "Hola, soy Marko. Desarrollador fullstack de Bolivia — construyo cosas reales para web, mobile y desktop, y me obsesiona que cada interfaz se sienta viva. Últimamente estoy metido en automatización y agentes de IA (n8n, MCP, LLMs).",
    linksTitle: "Contacto",
    skillsTitle: "Skills",
    skillsRows: [
      "JavaScript · TypeScript · React · React Native · Expo · Next.js · Angular · Astro · HTML5 · CSS3 · TailwindCSS",
      "Node.js · Express · NestJS · Rust · Python · PostgreSQL · MySQL · Prisma · Firebase",
      "n8n · MCP · APIs REST · Webhooks · LLMs · Agentes de IA · Gemini · Claude · OpenAI",
      "GSAP · Framer Motion · Tauri · Git · VS Code · LaTeX · Bun · Docker"
    ],
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    whatsapp: "WhatsApp",
    footer: "Hecho con mucho <3 y cafeina."
  }
} as const;
