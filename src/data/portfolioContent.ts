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
    projectsTitle: "Projects",
    projects: [
      {
        name: "Informática Art",
        logo: "/projects/informatica/logo.png",
        tags: "Expo · React Native · TypeScript · Firebase",
        status: "Live on Google Play",
        text: "Mobile app for Computer Engineering students at UMSS, with over a thousand users. Study material lives organized by subject and section — notes, slides, past exams, recorded classes — so nobody has to dig through a chat group again. Students post documents, images, videos and PDFs, comment and react, and get a push notification when something new lands in a subject they follow. Google sign-in, light and dark themes, and an admin panel for managing subjects, teachers and moderation reports.",
        url: "https://play.google.com/store/apps/details?id=com.informatica.app",
        cta: "Get it on Google Play",
        siteUrl: "https://informatica.art",
        siteCta: "informatica.art",
        shots: [
          { src: "/projects/informatica/inicio.webp", alt: "Subject feed in dark mode" },
          { src: "/projects/informatica/inicio-claro.webp", alt: "Subject feed in light mode" },
          {
            src: "/projects/informatica/publicaciones.webp",
            alt: "Latest posts with views and reactions",
          },
          { src: "/projects/informatica/materia.webp", alt: "Subject detail with sort filters" },
          {
            src: "/projects/informatica/secciones.webp",
            alt: "Sections: notes, slides, past exams",
          },
          { src: "/projects/informatica/dashboard.webp", alt: "Admin dashboard with live stats" },
          {
            src: "/projects/informatica/gestion-materias.webp",
            alt: "Subject management with cover art",
          },
          { src: "/projects/informatica/docentes.webp", alt: "Teacher directory" },
          { src: "/projects/informatica/denuncias.webp", alt: "Moderation report queue" },
          { src: "/projects/informatica/perfil.webp", alt: "User profile screen" },
        ],
      },
    ],
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
    projectsTitle: "Proyectos",
    projects: [
      {
        name: "Informática Art",
        logo: "/projects/informatica/logo.png",
        tags: "Expo · React Native · TypeScript · Firebase",
        status: "Publicada en Google Play",
        text: "App móvil para estudiantes de Ingeniería Informática de la UMSS, con más de mil usuarios. El material de estudio vive ordenado por materia y sección — apuntes, diapositivas, exámenes pasados, clases grabadas — para que nadie tenga que volver a bucear en un grupo de WhatsApp. Los estudiantes suben documentos, imágenes, videos y PDFs, comentan y reaccionan, y reciben una notificación cuando llega algo nuevo a una materia que siguen. Login con Google, tema claro y oscuro, y un panel de administración para gestionar materias, docentes y moderar denuncias.",
        url: "https://play.google.com/store/apps/details?id=com.informatica.app",
        cta: "Descargar en Google Play",
        siteUrl: "https://informatica.art",
        siteCta: "informatica.art",
        shots: [
          { src: "/projects/informatica/inicio.webp", alt: "Listado de materias en modo oscuro" },
          {
            src: "/projects/informatica/inicio-claro.webp",
            alt: "Listado de materias en modo claro",
          },
          {
            src: "/projects/informatica/publicaciones.webp",
            alt: "Últimas publicaciones con vistas y reacciones",
          },
          {
            src: "/projects/informatica/materia.webp",
            alt: "Detalle de materia con filtros de orden",
          },
          {
            src: "/projects/informatica/secciones.webp",
            alt: "Secciones: apuntes, diapositivas, exámenes",
          },
          {
            src: "/projects/informatica/dashboard.webp",
            alt: "Panel de administración con métricas en vivo",
          },
          {
            src: "/projects/informatica/gestion-materias.webp",
            alt: "Gestión de materias con portadas",
          },
          { src: "/projects/informatica/docentes.webp", alt: "Directorio de docentes" },
          { src: "/projects/informatica/denuncias.webp", alt: "Cola de denuncias para moderar" },
          { src: "/projects/informatica/perfil.webp", alt: "Pantalla de perfil de usuario" },
        ],
      },
    ],
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
