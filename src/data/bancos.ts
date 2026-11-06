/**
 * BANCOS DE CONTENIDO SEMILLA — «Para Ti»
 * 
 * Contiene el catálogo completo de preguntas para el motor de preguntas,
 * los planes de la ruleta pensados en Ica, y las preguntas de quiz semilla.
 */

export interface PreguntaMotor {
  id: number;
  texto: string;
  categoria: "recuerdo" | "profunda" | "futuro" | "divertida" | "coqueta";
}

export interface PlanRuleta {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
}

export interface PreguntaQuizSemilla {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

// -------------------------------------------------------------
// BANCO DE PREGUNTAS (40 preguntas: 30 oficiales + 10 del mismo tono)
// -------------------------------------------------------------
export const bancoPreguntas: PreguntaMotor[] = [
  // Las 30 preguntas oficiales requeridas
  {
    id: 1,
    texto: "¿Cuál es tu recuerdo favorito de nosotros hasta ahora?",
    categoria: "recuerdo",
  },
  {
    id: 2,
    texto: "¿Qué es algo que hago que te hace sentir querida sin que me dé cuenta?",
    categoria: "profunda",
  },
  {
    id: 3,
    texto: "Si mañana tuviéramos un día entero libre y sin gastar mucho, ¿qué harías conmigo?",
    categoria: "futuro",
  },
  {
    id: 4,
    texto: "¿Qué sueño tienes que todavía no me has contado completo?",
    categoria: "profunda",
  },
  {
    id: 5,
    texto: "¿Cuál fue el momento exacto en que pensaste: «él me gusta de verdad»?",
    categoria: "recuerdo",
  },
  {
    id: 6,
    texto: "¿Qué canción te recuerda a nosotros? ¿Por qué?",
    categoria: "recuerdo",
  },
  {
    id: 7,
    texto: "¿Qué es lo que más te preocupa últimamente y no me has dicho?",
    categoria: "profunda",
  },
  {
    id: 8,
    texto: "¿Qué cosa pequeña podría hacer más seguido para hacerte feliz?",
    categoria: "profunda",
  },
  {
    id: 9,
    texto: "¿Cómo te imaginas nuestra vida en tres años?",
    categoria: "futuro",
  },
  {
    id: 10,
    texto: "¿Qué aprendiste de tu familia sobre el amor que quieres repetir… y qué no?",
    categoria: "profunda",
  },
  {
    id: 11,
    texto: "¿Cuál es tu plan de cita perfecto, sin importar el dinero?",
    categoria: "futuro",
  },
  {
    id: 12,
    texto: "¿Qué es algo que te da vergüenza pero quieres que sepa?",
    categoria: "profunda",
  },
  {
    id: 13,
    texto: "Si pudieras revivir un día conmigo, ¿cuál sería?",
    categoria: "recuerdo",
  },
  {
    id: 14,
    texto: "¿Qué parte de tu infancia te gustaría contarme hoy?",
    categoria: "profunda",
  },
  {
    id: 15,
    texto: "¿En qué momento te sientes más tranquila conmigo?",
    categoria: "profunda",
  },
  {
    id: 16,
    texto: "¿Qué es algo que nunca quieres que dejemos de hacer?",
    categoria: "profunda",
  },
  {
    id: 17,
    texto: "¿Cuál es tu mayor miedo en una relación? Hablemos de eso sin pelear.",
    categoria: "profunda",
  },
  {
    id: 18,
    texto: "¿Qué te gustaría que hiciéramos cada viernes, como tradición nuestra?",
    categoria: "futuro",
  },
  {
    id: 19,
    texto: "¿Qué palabra crees que nos describe como pareja?",
    categoria: "divertida",
  },
  {
    id: 20,
    texto: "¿Hay algo que quieras que mejoremos como pareja? Dilo ahora, con calma.",
    categoria: "profunda",
  },
  {
    id: 21,
    texto: "¿Qué es lo más bonito que alguien ha hecho por ti?",
    categoria: "recuerdo",
  },
  {
    id: 22,
    texto: "Si hoy tuvieras que describirme a tu mejor amiga en una frase, ¿qué dirías?",
    categoria: "divertida",
  },
  {
    id: 23,
    texto: "¿Qué cosa de ti crees que todavía no conozco?",
    categoria: "profunda",
  },
  {
    id: 24,
    texto: "¿Qué te hace reír de mí aunque intentes que no se note?",
    categoria: "divertida",
  },
  {
    id: 25,
    texto: "¿Cuál sería tu domingo perfecto dentro de cinco años?",
    categoria: "futuro",
  },
  {
    id: 26,
    texto: "¿Qué quieres que te prometa hoy, algo chico y cumplible?",
    categoria: "profunda",
  },
  {
    id: 27,
    texto: "¿Qué lugar de Ica quieres que conozcamos juntos primero?",
    categoria: "futuro",
  },
  {
    id: 28,
    texto: "¿Qué foto nuestra es tu favorita y por qué?",
    categoria: "recuerdo",
  },
  {
    id: 29,
    texto: "¿Qué es algo bonito que hacían tus abuelos o tus papás como pareja?",
    categoria: "recuerdo",
  },
  {
    id: 30,
    texto: "Completa la frase: «Contigo, hasta un día simple se siente…»",
    categoria: "coqueta",
  },
  // 10 preguntas adicionales del mismo tono cálido y respetuoso
  {
    id: 31,
    texto: "¿Qué gesto o detalle mío te saca una sonrisa automática?",
    categoria: "coqueta",
  },
  {
    id: 32,
    texto: "Si tuviéramos que inventar un apodo secreto entre nosotros, ¿cuál se te ocurre?",
    categoria: "divertida",
  },
  {
    id: 33,
    texto: "¿Cuál fue la primera impresión que tuviste de mí el primer día que me viste?",
    categoria: "recuerdo",
  },
  {
    id: 34,
    texto: "¿Hay algún lugar especial al que te gustaría que viajemos solo nosotros dos?",
    categoria: "futuro",
  },
  {
    id: 35,
    texto: "¿Qué comida o postre sientes que representa mejor nuestras salidas?",
    categoria: "divertida",
  },
  {
    id: 36,
    texto: "¿Qué es lo que más te da paz cuando estás cansada al final del día?",
    categoria: "profunda",
  },
  {
    id: 37,
    texto: "¿Qué manía o costumbre graciosa mía has empezado a notar más?",
    categoria: "divertida",
  },
  {
    id: 38,
    texto: "Si pudieras congelar un instante exacto de nuestras citas, ¿cuál elegirías?",
    categoria: "recuerdo",
  },
  {
    id: 39,
    texto: "¿Cuál es esa pequeña meta personal tuya en la que quieres que te apoye con todo?",
    categoria: "profunda",
  },
  {
    id: 40,
    texto: "Si me tuvieras enfrente ahora mismo, ¿qué me dirías al oído?",
    categoria: "coqueta",
  },
];

// -------------------------------------------------------------
// PLANES BARATOS PARA LA RULETA (15 planes en Ica y sencillos)
// -------------------------------------------------------------
export const planesRuleta: PlanRuleta[] = [
  {
    id: 1,
    titulo: "Paseo nocturno y helado",
    descripcion: "Caminar por la Plaza de Armas de noche con un helado rico en mano, hablando sin apuros.",
    icono: "🍦",
  },
  {
    id: 2,
    titulo: "Atardecer en Huacachina",
    descripcion: "Subir la duna a pie un viernes con más tiempo para ver los colores del sol caer sobre el desierto.",
    icono: "🌅",
  },
  {
    id: 3,
    titulo: "Picnic simple en el parque",
    descripcion: "Sándwiches caseros, jugo y una manta sobre el césped para descansar y charlar.",
    icono: "🥪",
  },
  {
    id: 4,
    titulo: "Cine en casa con canchita",
    descripcion: "Elegir su película favorita, preparar canchita caliente y verla abrazados.",
    icono: "🎬",
  },
  {
    id: 5,
    titulo: "Tarde de fotos urbanas",
    descripcion: "Recorrer el centro buscando los 5 rincones más bonitos y sacarnos fotos divertidas.",
    icono: "📸",
  },
  {
    id: 6,
    titulo: "Cocinar algo nuevo y barato",
    descripcion: "Poner música, ponernos delantales e intentar una receta nueva juntos.",
    icono: "🍳",
  },
  {
    id: 7,
    titulo: "Noche de preguntas sin celular",
    descripcion: "Poner la playlist bajita, apagar pantallas y jugar a responder preguntas del corazón.",
    icono: "💬",
  },
  {
    id: 8,
    titulo: "Mirar el atardecer desde lo alto",
    descripcion: "Buscar un punto alto de la ciudad y contemplar las luces encenderse poco a poco.",
    icono: "🌆",
  },
  {
    id: 9,
    titulo: "Intercambio de cartas leídas",
    descripcion: "Escribirnos una carta corta cada uno y leérnosla en voz alta mirándonos a los ojos.",
    icono: "💌",
  },
  {
    id: 10,
    titulo: "Paseo por el mercado o feria",
    descripcion: "Caminar mirando puestos sin obligación de comprar nada, rematando con un antojo dulce.",
    icono: "🛍️",
  },
  {
    id: 11,
    titulo: "Dibujo mutuo a ciegas",
    descripcion: "Hojas y lápices: dibujarnos el uno al otro en 3 minutos sin mirar el papel. Risas aseguradas.",
    icono: "🎨",
  },
  {
    id: 12,
    titulo: "Maratón de serie con mantita",
    descripcion: "Ver dos o tres capítulos de esa serie pendiente bajo una manta calientita.",
    icono: "📺",
  },
  {
    id: 13,
    titulo: "Caminata de anécdotas de infancia",
    descripcion: "Caminar cuadras contando las historias más curiosas de cuando éramos niños.",
    icono: "🚶",
  },
  {
    id: 14,
    titulo: "Noche de cartas o juegos de mesa",
    descripcion: "Un juego simple, apuesta de besos o penitencias inocentes para pasarla genial.",
    icono: "🃏",
  },
  {
    id: 15,
    titulo: "Hacer un favor juntos como equipo",
    descripcion: "Ayudar a alguien o hacer un pequeño gesto solidario juntos para sentirnos equipo.",
    icono: "🤝",
  },
];

// -------------------------------------------------------------
// PREGUNTAS SEMILLA DEL QUIZ (Basadas en la experiencia y día de cita)
// -------------------------------------------------------------
export const quizSemilla: PreguntaQuizSemilla[] = [
  {
    pregunta: "¿Qué flor es el símbolo visual que acompaña toda esta experiencia?",
    opciones: ["El girasol", "La rosa roja dibujada", "La margarita", "El tulipán"],
    correcta: 1,
    explicacion: "La rosa roja en capas fue dibujada exclusivamente para acompañar cada rincón de este detalle.",
  },
  {
    pregunta: "¿Cuántos vales de amor canjeables vienen incluidos para usar?",
    opciones: ["4 vales", "6 vales", "8 vales", "12 vales"],
    correcta: 2,
    explicacion: "Hay exactamente 8 vales especiales, desde abrazos largos hasta escuchar sin interrumpir.",
  },
  {
    pregunta: "¿Qué día de la semana marca nuestra cuenta regresiva habitual de cita?",
    opciones: ["Miércoles a las 18:00", "Viernes a las 19:00", "Sábado a las 20:00", "Domingo a las 17:00"],
    correcta: 1,
    explicacion: "El viernes a las 19:00 hrs es nuestro momento sagrado de encuentro en la Plaza de Armas.",
  },
  {
    pregunta: "¿Qué sucede con los vales una vez que decides canjearlos?",
    opciones: [
      "Desaparecen de la pantalla",
      "Se marcan con el sello «CANJEADO» y guardan la fecha",
      "Piden una clave bancaria",
      "Se envían por correo electrónico",
    ],
    correcta: 1,
    explicacion: "Cada vale canjeado queda tachado y sellado en tu navegador con la fecha exacta en que lo usaste.",
  },
  {
    pregunta: "¿Cuál es el verdadero propósito detrás de este detalle digital?",
    opciones: [
      "Presumir habilidades de programación",
      "Recordarte lo mucho que te quiero y celebrar nuestro tiempo juntos",
      "Llenar espacio en internet",
      "Un trabajo práctico universitario",
    ],
    correcta: 1,
    explicacion: "Todo fue creado con cariño pensando en ti, en tus sonrisas y en cada momento que compartimos.",
  },
];
