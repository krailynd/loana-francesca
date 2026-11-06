/**
 * ARCHIVO ÚNICO DE PERSONALIZACIÓN — «Para Ti»
 * 
 * Todo el contenido personal de la experiencia vive en este archivo.
 * Edita los valores entre comillas según los recuerdos y datos de tu pareja.
 * Los campos marcados con "POR_COMPLETAR" están diseñados para que los completes
 * a tu propio ritmo; la aplicación oculta de manera elegante los módulos que aún
 * no tengan datos personales cargados.
 */

export interface ParejaConfig {
  de: string;
  para: string;
  apodoPara?: string;
  fechaInicio: string; // Formato ISO "AAAA-MM-DD", ej. "2024-02-14" o "POR_COMPLETAR"
  ciudad: string;
  lugarCitaHabitual: string;
  diaCita: {
    diaSemana: number; // 0 = Domingo, 1 = Lunes, ..., 5 = Viernes, 6 = Sábado
    hora: string;      // Formato "HH:mm" (24h), ej. "19:00"
  };
  firma: string;       // Firma corta para cartas y notas, ej. "— E."
}

export interface CartaConfig {
  saludo: string;
  parrafos: string[];
  cierre: string;
}

export interface SobreItem {
  id: string;
  cuando: string;
  mensaje: string;
}

export interface ValeItem {
  id: string;
  titulo: string;
  detalle: string;
}

export interface HitoItem {
  fecha: string;
  titulo: string;
  texto: string;
  foto?: string;
}

export interface FotoItem {
  src: string;
  pie: string;
  alt?: string;
  fecha?: string;
}

export interface CancionItem {
  titulo: string;
  artista: string;
  nota: string;
}

export interface PlaylistConfig {
  enlace: string; // Enlace web a Spotify o YouTube, opcional
  canciones: CancionItem[];
}

export interface PreguntaQuizConfig {
  pregunta: string;
  opciones: string[];
  correcta: number; // Índice 0, 1, 2 o 3
  explicacion: string;
}

export interface LugarItem {
  id: string;
  nombre: string;
  estado: "visitado" | "por-conocer";
  nota: string;
  x: number; // Posición X en el mapa SVG ilustrado (0 - 100)
  y: number; // Posición Y en el mapa SVG ilustrado (0 - 100)
}

export interface MensajeQRItem {
  id: string;
  tituloTarjeta: string;
  subtitulo: string;
  texto: string;
}

export interface CapsulaItem {
  id: string;
  fechaDesbloqueo: string; // Formato ISO "AAAA-MM-DD"
  titulo: string;
  mensaje: string;
}

export interface AccesoFechaConfig {
  activado: boolean;
  fechaCorrecta: string; // "AAAA-MM-DD"
  pista: string;
}

// -------------------------------------------------------------
// 1. DATOS DE LA PAREJA
// -------------------------------------------------------------
export const pareja: ParejaConfig = {
  de: "POR_COMPLETAR",            // Nombre de quien regala
  para: "POR_COMPLETAR",          // Nombre de ella
  apodoPara: "POR_COMPLETAR",     // Apodo cariñoso opcional
  fechaInicio: "POR_COMPLETAR",   // ISO: "2024-01-15" — para el contador de días juntos
  ciudad: "Ica, Perú",
  lugarCitaHabitual: "Plaza de Armas de Ica",
  diaCita: { diaSemana: 5, hora: "19:00" }, // Viernes 19:00 hrs para la cuenta regresiva
  firma: "POR_COMPLETAR",         // Firma corta, ej. "— E."
};

// URL pública del despliegue (se usa para el QR especial que abre el sitio)
// Si está vacía "", no se generará el QR a la web hasta que tengas tu dominio en Vercel.
export const urlPublica = "";

// Pantalla opcional de acceso con fecha de inicio (desactivada por defecto)
export const accesoConFecha: AccesoFechaConfig = {
  activado: false,
  fechaCorrecta: "POR_COMPLETAR",
  pista: "La fecha en que empezó nuestra historia juntos (AAAA-MM-DD)",
};

// -------------------------------------------------------------
// 2. CARTA PRINCIPAL
// -------------------------------------------------------------
export const cartaPrincipal: CartaConfig = {
  saludo: "Hola, mi amor:",
  parrafos: [
    "POR_COMPLETAR — párrafo 1: por qué le haces este detalle.",
    "POR_COMPLETAR — párrafo 2: un recuerdo concreto de ustedes.",
    "POR_COMPLETAR — párrafo 3: algo que valoras de ella y casi no le dices.",
    "POR_COMPLETAR — párrafo 4: un plan simple para cuando la situación mejore.",
  ],
  cierre: "Te quiero con todo mi corazón.",
};

// -------------------------------------------------------------
// 3. SOBRES «ABRE ESTO CUANDO...»
// -------------------------------------------------------------
export const sobres: SobreItem[] = [
  {
    id: "triste",
    cuando: "…estés triste",
    mensaje: "Respira hondo y recuerda que los días grises también pasan. No tienes que poder con todo tú sola hoy; aquí estoy yo para sostenerte y recordarte lo valiosa y fuerte que eres. Te quiero mucho.",
  },
  {
    id: "extranes",
    cuando: "…me extrañes",
    mensaje: "Cierra los ojos un segundo. Imagina que estoy sentado a tu lado en la Plaza de Armas, tomándote la mano sin decir nada. La distancia es solo un rato; las ganas de verte siguen intactas.",
  },
  {
    id: "brava",
    cuando: "…estés brava conmigo",
    mensaje: "Sé que a veces me equivoco o no encuentro las palabras justas. Perdóname si te hice sentir mal. Mi intención nunca será lastimarte; te escucho y quiero que lo arreglemos con calma.",
  },
  {
    id: "dudes",
    cuando: "…dudes de nosotros",
    mensaje: "Las relaciones reales no son perfectas, pero lo que siento por ti es sincero y decidido. Cada día elijo caminar a tu lado y construir algo bonito contigo paso a paso.",
  },
  {
    id: "dormir",
    cuando: "…no puedas dormir",
    mensaje: "Suelta los pensamientos que dan vueltas en tu cabeza. Mañana será otro día y podrás empezar de nuevo. Que descanses bonito, sueña con cosas lindas.",
  },
  {
    id: "cualquiera",
    cuando: "…sea un día cualquiera y sonrías",
    mensaje: "Verte sonreír alegra cualquier rincón de Ica. Gracias por hacer que un día ordinario se sienta especial con solo existir en él. Que tengas un día maravilloso.",
  },
];

// -------------------------------------------------------------
// 4. RAZONES POR LAS QUE TE QUIERO (Mínimo 12 editables)
// -------------------------------------------------------------
export const razones: string[] = [
  "Por la forma en que tus ojos brillan cuando me cuentas algo que te apasiona.",
  "Porque tus abrazos tienen la habilidad exacta de calmar mis peores días.",
  "Por tu risa sincera, esa que no puedes disimular y se contagia al instante.",
  "Por cómo te preocupas por los detalles pequeños que nadie más nota.",
  "Porque contigo caminar por la calle sin rumbo fijo se convierte en el mejor plan.",
  "Por tu paciencia conmigo y por enseñarme a ver las cosas con otra perspectiva.",
  "Por la ternura con la que tratas a las personas y a quienes quieres.",
  "Porque me inspiras a ser una mejor persona cada día, sin exigírmelo.",
  "Por la complicidad que tenemos con una sola mirada en medio de la gente.",
  "Porque compartes tus sueños y temores conmigo con total confianza.",
  "Por cómo disfrutas de un helado o una comida rica como si fuera el mayor tesoro.",
  "Simplemente porque eres tú, y en este mundo no existe nadie que se te compare.",
];

// -------------------------------------------------------------
// 5. VALES DE AMOR CANJEABLES (Persisten en el navegador)
// -------------------------------------------------------------
export const vales: ValeItem[] = [
  {
    id: "vale-1",
    titulo: "Un abrazo largo",
    detalle: "Sin límite de tiempo, cuando lo pidas y donde sea.",
  },
  {
    id: "vale-2",
    titulo: "Una salida a caminar",
    detalle: "El viernes que tú elijas, caminando despacio y sin mirar el celular.",
  },
  {
    id: "vale-3",
    titulo: "Tu postre favorito",
    detalle: "En cuanto nos veamos, va por mi cuenta en tu lugar preferido.",
  },
  {
    id: "vale-4",
    titulo: "Una carta más",
    detalle: "Escrita a mano en papel, sin motivo ni fecha especial.",
  },
  {
    id: "vale-5",
    titulo: "Elegir la película",
    detalle: "Tú tienes el control total del catálogo esa noche; yo pongo la canchita.",
  },
  {
    id: "vale-6",
    titulo: "Escucharte sin interrumpir",
    detalle: "Solo escuchar y darte apoyo, sin intentar arreglar nada si no me lo pides.",
  },
  {
    id: "vale-7",
    titulo: "Masaje de hombros",
    detalle: "10 minutos dedicados a relajarte, sin quejarme ni apurarme.",
  },
  {
    id: "vale-8",
    titulo: "Un «te quiero» inesperado",
    detalle: "En el momento del día en que menos te lo esperes.",
  },
];

// -------------------------------------------------------------
// 6. HITOS DE NUESTRA HISTORIA (Línea de tiempo)
// -------------------------------------------------------------
export const hitos: HitoItem[] = [
  {
    fecha: "El primer día",
    titulo: "Aquí empieza nuestra historia",
    texto: "El día en que nuestras miradas coincidieron y todo empezó a cambiar despacio, de la manera más linda.",
  },
  // Agrega más hitos editando este archivo cuando quieras:
  // { fecha: "2024-05-10", titulo: "Nuestra primera cita", texto: "Caminamos por la plaza y no queríamos despedirnos." }
];

// -------------------------------------------------------------
// 7. GALERÍA DE FOTOS
// -------------------------------------------------------------
// Guarda tus fotos en public/fotos/ y regístralas aquí:
// export const fotos: FotoItem[] = [{ src: "/fotos/foto1.webp", pie: "Tarde inolvidable" }];
export const fotos: FotoItem[] = [];

// -------------------------------------------------------------
// 8. NUESTRA PLAYLIST
// -------------------------------------------------------------
export const playlist: PlaylistConfig = {
  enlace: "", // Si tienes una playlist en Spotify o YouTube, pon la URL aquí
  canciones: [
    {
      titulo: "Canción para empezar",
      artista: "POR_COMPLETAR",
      nota: "Esta canción me recuerda al momento en que te conocí.",
    },
    {
      titulo: "Melodía de nuestras tardes",
      artista: "POR_COMPLETAR",
      nota: "Para escucharla caminando juntos al atardecer.",
    },
  ],
};

// -------------------------------------------------------------
// 9. QUIZ «CUÁNTO ME CONOCES»
// -------------------------------------------------------------
// Preguntas personalizadas sobre la pareja. Si se deja vacío [], se usarán
// las 5 preguntas semilla genéricas sobre la experiencia web.
export const quiz: PreguntaQuizConfig[] = [];

// -------------------------------------------------------------
// 10. MAPA DE LUGARES EN ICA
// -------------------------------------------------------------
export const lugares: LugarItem[] = [
  {
    id: "plaza-armas",
    nombre: "Plaza de Armas de Ica",
    estado: "visitado",
    nota: "Nuestras caminatas nocturnas, las charlas y el punto de encuentro de cada viernes.",
    x: 48,
    y: 52,
  },
  {
    id: "huacachina",
    nombre: "Oasis de Huacachina",
    estado: "por-conocer",
    nota: "Subir a la duna a ver el atardecer juntos un viernes con más tiempo.",
    x: 32,
    y: 68,
  },
  {
    id: "parque-amor",
    nombre: "Parque y alamedas de la ciudad",
    estado: "visitado",
    nota: "Un rincón tranquilo para sentarnos a comer un helado y hablar de todo.",
    x: 58,
    y: 40,
  },
  {
    id: "mirador",
    nombre: "Mirador de las dunas",
    estado: "por-conocer",
    nota: "Ver las luces de la ciudad encenderse cuando cae la noche.",
    x: 25,
    y: 80,
  },
];

// -------------------------------------------------------------
// 11. MENSAJES PARA LOS CÓDIGOS QR IMPRIMIBLES
// -------------------------------------------------------------
// Estos mensajes van grabados como texto plano dentro de cada QR.
// Funcionan 100% offline sin necesidad de internet.
export const mensajesQR: MensajeQRItem[] = [
  {
    id: "qr-1",
    tituloTarjeta: "Para empezar la noche",
    subtitulo: "Escanea al comenzar nuestra cita",
    texto: "Este código vale por un abrazo largo de bienvenida. No importa cómo haya sido tu semana, hoy nos tenemos el uno al otro.",
  },
  {
    id: "qr-2",
    tituloTarjeta: "Una razón de hoy",
    subtitulo: "Guárdalo para leerlo despacio",
    texto: "Me encanta la paz que me transmites cuando estamos juntos. Tienes una luz única que hace todo más fácil.",
  },
  {
    id: "qr-3",
    tituloTarjeta: "Nuestro viernes",
    subtitulo: "Un recordatorio importante",
    texto: "El tiempo que pasamos juntos vale mucho más que cualquier lugar lujoso. Contigo el plan más simple es el mejor.",
  },
  {
    id: "qr-4",
    tituloTarjeta: "Para un día triste",
    subtitulo: "Abre solo cuando haga falta",
    texto: "Si hoy las cosas salieron mal o te sientes cansada, acuérdate de que eres maravillosa y que siempre puedes contar conmigo.",
  },
  {
    id: "qr-5",
    tituloTarjeta: "Un secreto",
    subtitulo: "Para ti solita",
    texto: "Cada vez que te veo venir hacia mí para saludarnos, se me reinicia el corazón. Eres mi persona favorita.",
  },
  {
    id: "qr-6",
    tituloTarjeta: "Para cerrar la noche",
    subtitulo: "Léelo al despedirnos",
    texto: "Gracias por este rato juntos. Te prometo que cada día cuidaré más de lo que tenemos. Descansa bonito.",
  },
];

// -------------------------------------------------------------
// 12. CÁPSULAS DEL TIEMPO (Se desbloquean por fecha)
// -------------------------------------------------------------
export const capsulas: CapsulaItem[] = [
  {
    id: "capsula-1",
    fechaDesbloqueo: "2024-01-01", // Fecha pasada: disponible de inmediato para prueba
    titulo: "Mensaje desde el inicio",
    mensaje: "Si estás leyendo esto, es porque hemos recorrido un camino juntos y cada paso ha valido la pena. Gracias por elegirme día a día.",
  },
  {
    id: "capsula-2",
    fechaDesbloqueo: "2026-12-31", // Fecha futura: bloqueada hasta fin de año
    titulo: "Para cuando termine este año",
    mensaje: "Un año más compartiendo risas, aprendizajes y sueños. Mi deseo sigue siendo el mismo: seguir construyendo contigo.",
  },
];
