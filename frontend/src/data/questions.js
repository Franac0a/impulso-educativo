const questions = [
  // BLOQUE R - Realista
  {
    id: 1,
    block: "R",
    text: "1. Prefiero:",
    options: [
      { text: "Arreglar un electrodoméstico o un motor", value: "R" },
      { text: "Enseñar o explicarle algo a un compañero", value: "S" },
      { text: "Investigar o experimentar con ideas", value: "I" },
      { text: "Crear obras de arte o diseñar algo", value: "A" },
      { text: "Organizar tareas o administrar proyectos", value: "C" },
      { text: "Persuadir o liderar a un grupo", value: "E" },
    ],
  },
  {
    id: 2,
    block: "R",
    text: "2. Me motiva más:",
    options: [
      { text: "Construir o arreglar cosas con mis manos", value: "R" },
      { text: "Ayudar o cuidar a otras personas", value: "S" },
      { text: "Resolver problemas complejos", value: "I" },
      { text: "Diseñar algo creativo", value: "A" },
      { text: "Planificar y organizar actividades", value: "C" },
      { text: "Convencer o vender ideas a otros", value: "E" },
    ],
  },
  {
    id: 3,
    block: "R",
    text: "3. Prefiero trabajar:",
    options: [
      { text: "Con herramientas o máquinas", value: "R" },
      { text: "Con personas enseñando o apoyando", value: "S" },
      { text: "Con teorías, cálculos o investigaciones", value: "I" },
      { text: "Con arte, música o diseño", value: "A" },
      { text: "Con sistemas, reglas y organización", value: "C" },
      { text: "Convenciendo o dirigiendo grupos", value: "E" },
    ],
  },

  // BLOQUE I - Investigador
  {
    id: 4,
    block: "I",
    text: "4. Prefiero actividades que impliquen:",
    options: [
      { text: "Investigar y analizar información", value: "I" },
      { text: "Ayudar o enseñar a otros", value: "S" },
      { text: "Construir o arreglar cosas", value: "R" },
      { text: "Crear o innovar", value: "A" },
      { text: "Planificación y control", value: "C" },
      { text: "Persuasión y liderazgo", value: "E" },
    ],
  },
  {
    id: 5,
    block: "I",
    text: "5. Me siento más cómodo:",
    options: [
      { text: "Analizando datos o ideas", value: "I" },
      { text: "Ayudando o enseñando a alguien", value: "S" },
      { text: "Trabajando con herramientas y máquinas", value: "R" },
      { text: "Creando arte o diseño", value: "A" },
      { text: "Organizando tareas o información", value: "C" },
      { text: "Dirigiendo o motivando a otros", value: "E" },
    ],
  },
  {
    id: 6,
    block: "I",
    text: "6. Prefiero actividades intelectuales que:",
    options: [
      { text: "Resolver problemas o investigar", value: "I" },
      { text: "Ayudar a personas o animales", value: "S" },
      { text: "Reparar o construir cosas", value: "R" },
      { text: "Diseñar o crear algo nuevo", value: "A" },
      { text: "Administrar o planificar", value: "C" },
      { text: "Persuadir, vender o liderar", value: "E" },
    ],
  },

  // BLOQUE A - Artístico
  {
    id: 7,
    block: "A",
    text: "7. Disfruto más:",
    options: [
      { text: "Dibujar, pintar o componer", value: "A" },
      { text: "Enseñar o cuidar a otros", value: "S" },
      { text: "Investigar, leer y analizar", value: "I" },
      { text: "Trabajar con herramientas", value: "R" },
      { text: "Organizar información o procesos", value: "C" },
      { text: "Persuadir o liderar un grupo", value: "E" },
    ],
  },
  {
    id: 8,
    block: "A",
    text: "8. Me interesa más:",
    options: [
      { text: "Arte, música o creatividad", value: "A" },
      { text: "Trabajar con personas para ayudarlas", value: "S" },
      { text: "Ciencia, tecnología o matemáticas", value: "I" },
      { text: "Trabajos manuales o técnicos", value: "R" },
      { text: "Gestión y administración", value: "C" },
      { text: "Ventas, política o liderazgo", value: "E" },
    ],
  },
  {
    id: 9,
    block: "A",
    text: "9. Prefiero que mi actividad sea:",
    options: [
      { text: "Creativa", value: "A" },
      { text: "Con personas", value: "S" },
      { text: "Intelectual o analítica", value: "I" },
      { text: "Manual o técnica", value: "R" },
      { text: "Organizada y estructurada", value: "C" },
      { text: "Persuasiva o social", value: "E" },
    ],
  },

  // BLOQUE S - Social
  {
    id: 10,
    block: "S",
    text: "10. Disfruto ayudar o enseñar:",
    options: [
      { text: "Ayudar o enseñar", value: "S" },
      { text: "Construir o reparar", value: "R" },
      { text: "Resolver problemas o investigar", value: "I" },
      { text: "Crear cosas nuevas", value: "A" },
      { text: "Administrar o planificar", value: "C" },
      { text: "Liderar o motivar a otros", value: "E" },
    ],
  },
  {
    id: 11,
    block: "S",
    text: "11. Me siento más competente:",
    options: [
      { text: "Cuidando o enseñando", value: "S" },
      { text: "Con tareas manuales", value: "R" },
      { text: "Analizando información", value: "I" },
      { text: "Creando arte o diseño", value: "A" },
      { text: "Organizando procesos", value: "C" },
      { text: "Persuadiendo o dirigiendo", value: "E" },
    ],
  },
  {
    id: 12,
    block: "S",
    text: "12. Prefiero actividades sociales que:",
    options: [
      { text: "Ayudar a otros", value: "S" },
      { text: "Construcción o reparación", value: "R" },
      { text: "Investigar o experimentar", value: "I" },
      { text: "Diseñar o innovar", value: "A" },
      { text: "Planificación y control", value: "C" },
      { text: "Liderar o persuadir", value: "E" },
    ],
  },

  // BLOQUE C - Convencional
  {
    id: 13,
    block: "C",
    text: "13. Me gusta organizar tareas o procesos:",
    options: [
      { text: "Organizar tareas o procesos", value: "C" },
      { text: "Ayudar o enseñar personas", value: "S" },
      { text: "Analizar problemas y soluciones", value: "I" },
      { text: "Crear arte, música o diseño", value: "A" },
      { text: "Trabajar con herramientas o máquinas", value: "R" },
      { text: "Convencer o liderar equipos", value: "E" },
    ],
  },
  {
    id: 14,
    block: "C",
    text: "14. Me atrae:",
    options: [
      { text: "Administrar y planear", value: "C" },
      { text: "Ayudar y enseñar", value: "S" },
      { text: "Investigar y aprender", value: "I" },
      { text: "Crear cosas nuevas y artísticas", value: "A" },
      { text: "Hacer trabajos manuales", value: "R" },
      { text: "Persuadir o motivar a otros", value: "E" },
    ],
  },
  {
    id: 15,
    block: "C",
    text: "15. Prefiero actividades:",
    options: [
      { text: "Organizadas o administrativas", value: "C" },
      { text: "Con personas", value: "S" },
      { text: "Intelectuales o analíticas", value: "I" },
      { text: "Creativas o artísticas", value: "A" },
      { text: "Con herramientas o maquinaria", value: "R" },
      { text: "De liderazgo o ventas", value: "E" },
    ],
  },

  // BLOQUE E - Emprendedor
  {
    id: 16,
    block: "E",
    text: "16. Disfruto cuando lidero o persuado personas:",
    options: [
      { text: "Persuadir o liderar", value: "E" },
      { text: "Construyo o reparo cosas", value: "R" },
      { text: "Ayudo a otros", value: "S" },
      { text: "Investigo o resuelvo problemas", value: "I" },
      { text: "Diseño o creo arte", value: "A" },
      { text: "Planifico o administro", value: "C" },
    ],
  },
  {
    id: 17,
    block: "E",
    text: "17. Me siento más motivado:",
    options: [
      { text: "Convenciendo o liderando", value: "E" },
      { text: "Trabajando con manos o herramientas", value: "R" },
      { text: "Ayudando o enseñando a otros", value: "S" },
      { text: "Analizando ideas y conceptos", value: "I" },
      { text: "Creando arte o diseño", value: "A" },
      { text: "Organizando y administrando", value: "C" },
    ],
  },
  {
    id: 18,
    block: "E",
    text: "18. Prefiero un trabajo que sea:",
    options: [
      { text: "De liderazgo o de ventas", value: "E" },
      { text: "Manual y técnico", value: "R" },
      { text: "De ayuda o enseñanza", value: "S" },
      { text: "Intelectual y analítico", value: "I" },
      { text: "Creativo y artístico", value: "A" },
      { text: "Organizado y administrativo", value: "C" },
    ],
  },
];

export default questions;
