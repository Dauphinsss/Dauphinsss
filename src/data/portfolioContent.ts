export type Lang = "en" | "es";
export type ThemeMode = "light" | "dark";

export const profile = {
  name: "Marcos Velaquez Vela",
  handle: "Dauphinsss",
  email: "marcosvelasquezvela123@gmail.com",
  github: "https://github.com/Dauphinsss",
  youtube: "https://youtube.com/@dauphinsss",
  whatsapp: "https://wa.me/59172776768",
  /**
   * Drop a PDF at `public/cv.pdf` and set this to "/cv.pdf" — the download
   * button stays hidden while it is empty, so there is never a dead link.
   */
  cv: "",
};

export const copy = {
  en: {
    label: "Dev · Design · Education",
    name: "Marcos Velaquez Vela",
    bio: "Fullstack developer, graphic designer and educator. I build for web, mobile and desktop, I design what I build, and I teach what I know.",
    workTitle: "Manifesto",
    workItems: ["I BUILD REAL THINGS", "I DESIGN HOW THEY FEEL", "AND I TEACH WHAT I KNOW"],
    aboutTitle: "About",
    aboutText:
      "Hi, I am Marko. Fullstack developer from Bolivia — I build real things for the web, mobile and desktop, and I care about making every interface feel alive. I also come from graphic design, so the visual side is mine end to end. And I teach: I have taught several classes in Computer Engineering, and explaining something forces you to really understand it. When a project calls for it, I automate processes with AI too.",
    linksTitle: "Contact",
    skillsTitle: "Skills",
    skillsRows: [
      "JavaScript · TypeScript · React · React Native · Expo · Next.js · Angular · Astro · HTML5 · CSS3 · TailwindCSS",
      "Node.js · Express · NestJS · Rust · Python · PostgreSQL · MySQL · Prisma · Firebase · REST APIs · Webhooks",
      "GSAP · Framer Motion · Three.js · Tauri · Git · VS Code · Docker · Bun · LaTeX · n8n · MCP · LLMs",
    ],
    github: "GitHub",
    youtube: "YouTube",
    email: "Email",
    whatsapp: "WhatsApp",
    nowTitle: "Right now",
    nowItems: [
      "Building for web, mobile and desktop — and shipping it to production.",
      "Designing every interface I build, end to end.",
      "Teaching classes in Computer Engineering.",
      "Automating processes with AI when a project calls for it.",
    ],
    ctaTitle: "Let's build something",
    ctaText:
      "Open to work, freelance and collaborations. Tell me what you have in mind and I will answer.",
    ctaEmail: "Write to me",
    ctaWhatsapp: "WhatsApp",
    ctaCv: "Download CV",
    footer: "Made with a lot of <3 and caffeine.",
  },
  es: {
    label: "Dev · Diseño · Educación",
    name: "Marcos Velaquez Vela",
    bio: "Desarrollador fullstack, diseñador gráfico y educador. Construyo para web, mobile y desktop, diseño lo que construyo, y enseño lo que sé.",
    workTitle: "Manifiesto",
    workItems: ["CONSTRUYO COSAS REALES", "DISEÑO CÓMO SE SIENTEN", "Y ENSEÑO LO QUE SÉ"],
    aboutTitle: "Sobre Mi",
    aboutText:
      "Hola, soy Marko. Desarrollador fullstack de Bolivia — construyo cosas reales para web, mobile y desktop, y me obsesiona que cada interfaz se sienta viva. También vengo del diseño gráfico, así que la parte visual la resuelvo de punta a punta. Y enseño: he dado varias clases en Ingeniería Informática, y explicar algo te obliga a entenderlo de verdad. Cuando el proyecto lo pide, también automatizo procesos con IA.",
    linksTitle: "Contacto",
    skillsTitle: "Skills",
    skillsRows: [
      "JavaScript · TypeScript · React · React Native · Expo · Next.js · Angular · Astro · HTML5 · CSS3 · TailwindCSS",
      "Node.js · Express · NestJS · Rust · Python · PostgreSQL · MySQL · Prisma · Firebase · APIs REST · Webhooks",
      "GSAP · Framer Motion · Three.js · Tauri · Git · VS Code · Docker · Bun · LaTeX · n8n · MCP · LLMs",
    ],
    github: "GitHub",
    youtube: "YouTube",
    email: "Email",
    whatsapp: "WhatsApp",
    nowTitle: "Ahora mismo",
    nowItems: [
      "Construyendo para web, mobile y desktop — y subiéndolo a producción.",
      "Diseñando cada interfaz que construyo, de punta a punta.",
      "Dando clases en Ingeniería Informática.",
      "Automatizando procesos con IA cuando el proyecto lo pide.",
    ],
    ctaTitle: "Construyamos algo",
    ctaText:
      "Abierto a trabajo, freelance y colaboraciones. Contame qué tenés en mente y te respondo.",
    ctaEmail: "Escribime",
    ctaWhatsapp: "WhatsApp",
    ctaCv: "Descargar CV",
    footer: "Hecho con mucho <3 y cafeina.",
  },
} as const;
