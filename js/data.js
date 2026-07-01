/* =========================================================
   DATA.JS
   Datos de ejemplo del negocio.
   -----------------------------------------------------------
   Cuando exista un backend real, este archivo deja de tener
   datos "hardcodeados" y en su lugar hace fetch() a tu API.
   Todo el resto del código (render.js, booking.js) consume
   estas mismas estructuras, así que no tendrás que reescribir
   la interfaz, solo cómo se obtienen los datos.
   ========================================================= */

const DATA = {

  wodHoy: {
    nombre: "Heavy metal",
    formato: "For time — cap 18 min",
    movimientos: [
      { cantidad: "21-15-9", descripcion: "Thrusters (40/30 kg)" },
      { cantidad: "21-15-9", descripcion: "Pull-ups" },
      { cantidad: "400 m", descripcion: "Carrera entre rondas" }
    ]
  },

  programas: [
    {
      nombre: "CrossFit",
      descripcion: "Entrenamiento funcional de alta intensidad, constantemente variado. Clases de 60 min con coach en piso."
    },
    {
      nombre: "Halterofilia",
      descripcion: "Técnica de levantamiento olímpico: snatch y clean & jerk. Ideal para mejorar tus números en el WOD."
    },
    {
      nombre: "Gimnasia",
      descripcion: "Control corporal, movilidad y habilidades: handstands, muscle-ups, pistol squats."
    },
    {
      nombre: "Open gym",
      descripcion: "Acceso libre a equipo e instalaciones para tu propio entrenamiento, con supervisión de coach."
    },
    {
      nombre: "Crossfeet Kids",
      descripcion: "Movimiento, juego y fuerza funcional para niños de 6 a 12 años, en formato seguro y divertido."
    },
    {
      nombre: "Nutrición",
      descripcion: "Asesoría personalizada para que tu alimentación acompañe tu progreso físico."
    }
  ],

  horarios: {
    lunes: [
      { hora: "06:00", clase: "CrossFit", coach: "Coach Mariana", cupoMax: 12 },
      { hora: "07:00", clase: "CrossFit", coach: "Coach Diego", cupoMax: 12 },
      { hora: "17:00", clase: "Halterofilia", coach: "Coach Diego", cupoMax: 8 },
      { hora: "18:00", clase: "CrossFit", coach: "Coach Mariana", cupoMax: 12 },
      { hora: "19:00", clase: "CrossFit", coach: "Coach Ale", cupoMax: 12 }
    ],
    martes: [
      { hora: "06:00", clase: "CrossFit", coach: "Coach Ale", cupoMax: 12 },
      { hora: "07:00", clase: "Gimnasia", coach: "Coach Mariana", cupoMax: 8 },
      { hora: "18:00", clase: "CrossFit", coach: "Coach Diego", cupoMax: 12 },
      { hora: "19:00", clase: "Open gym", coach: "Coach Ale", cupoMax: 15 }
    ],
    miercoles: [
      { hora: "06:00", clase: "CrossFit", coach: "Coach Mariana", cupoMax: 12 },
      { hora: "07:00", clase: "CrossFit", coach: "Coach Diego", cupoMax: 12 },
      { hora: "17:00", clase: "Crossfeet Kids", coach: "Coach Ale", cupoMax: 10 },
      { hora: "18:00", clase: "Halterofilia", coach: "Coach Diego", cupoMax: 8 },
      { hora: "19:00", clase: "CrossFit", coach: "Coach Mariana", cupoMax: 12 }
    ],
    jueves: [
      { hora: "06:00", clase: "CrossFit", coach: "Coach Ale", cupoMax: 12 },
      { hora: "07:00", clase: "Gimnasia", coach: "Coach Mariana", cupoMax: 8 },
      { hora: "18:00", clase: "CrossFit", coach: "Coach Diego", cupoMax: 12 },
      { hora: "19:00", clase: "CrossFit", coach: "Coach Ale", cupoMax: 12 }
    ],
    viernes: [
      { hora: "06:00", clase: "CrossFit", coach: "Coach Mariana", cupoMax: 12 },
      { hora: "07:00", clase: "CrossFit", coach: "Coach Diego", cupoMax: 12 },
      { hora: "17:00", clase: "Open gym", coach: "Coach Ale", cupoMax: 15 },
      { hora: "18:00", clase: "CrossFit", coach: "Coach Mariana", cupoMax: 12 }
    ],
    sabado: [
      { hora: "08:00", clase: "CrossFit", coach: "Coach Ale", cupoMax: 14 },
      { hora: "09:00", clase: "Open gym", coach: "Coach Diego", cupoMax: 15 }
    ]
  },

  membresias: [
    {
      nombre: "2 días / semana",
      precio: 650,
      periodo: "mes",
      features: ["8 clases al mes", "Acceso a open gym", "Sin permanencia"],
      destacado: false
    },
    {
      nombre: "Ilimitado",
      precio: 950,
      periodo: "mes",
      features: ["Clases ilimitadas", "Acceso a open gym", "1 clase de halterofilia/semana", "Descuento en eventos"],
      destacado: true
    },
    {
      nombre: "Día completo",
      precio: 120,
      periodo: "día",
      features: ["1 clase + open gym", "Ideal para visitantes", "Sin compromiso"],
      destacado: false
    }
  ],

  coaches: [
    { nombre: "Coach Mariana", rol: "Head coach · L2", iniciales: "MR" },
    { nombre: "Coach Diego", rol: "Halterofilia · L1", iniciales: "DG" },
    { nombre: "Coach Ale", rol: "Gimnasia · L1", iniciales: "AL" },
    { nombre: "Coach Sofía", rol: "Nutrición deportiva", iniciales: "SF" }
  ],

  testimonios: [
    { texto: "Llegué sin saber qué era un WOD. Hoy hago mi primer muscle-up y bajé 12 kg en 8 meses.", autor: "Renata G." },
    { texto: "Lo que más valoro es la comunidad. Aquí nadie entrena solo, siempre hay alguien echándote ánimos.", autor: "Hugo M." },
    { texto: "Los coaches realmente corrigen técnica, no solo cuentan reps. Eso marcó la diferencia para mí.", autor: "Paola S." }
  ]
};
