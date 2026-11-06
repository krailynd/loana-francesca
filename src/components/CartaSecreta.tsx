import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// SVGs decorativos limpios y elegantes
export const TulipanRojoSVG: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 28,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none overflow-visible ${className}`}
    aria-hidden="true"
  >
    {/* Tallo y hojas */}
    <path
      d="M32 38 C32 46 31 52 32 60"
      stroke="#2D6A4F"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M32 50 C22 49 16 43 14 36 C19 36 26 41 32 47"
      fill="#40916C"
    />
    <path
      d="M32 45 C40 44 48 38 50 31 C45 32 38 37 32 43"
      fill="#52B788"
    />
    {/* Flor de tulipán en capas de rojo terciopelo */}
    <path
      d="M32 10 C26 18 25 28 32 38 C39 28 38 18 32 10 Z"
      fill="#C0392B"
    />
    <path
      d="M21 16 C16 25 20 36 32 38 C25 33 21 25 21 16 Z"
      fill="#7B1E26"
    />
    <path
      d="M43 16 C48 25 44 36 32 38 C39 33 43 25 43 16 Z"
      fill="#E63946"
    />
    {/* Brillo central */}
    <path
      d="M32 13 C30 19 30 26 32 31 C34 26 34 19 32 13 Z"
      fill="#FF758F"
      opacity="0.75"
    />
  </svg>
);

export const RosaRojaSVG: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 28,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none overflow-visible ${className}`}
    aria-hidden="true"
  >
    {/* Hojas laterales */}
    <path
      d="M20 42 C12 40 10 30 16 25 C21 31 22 37 20 42 Z"
      fill="#2D6A4F"
    />
    <path
      d="M44 42 C52 40 54 30 48 25 C43 31 42 37 44 42 Z"
      fill="#40916C"
    />
    {/* Capullo de rosa */}
    <circle cx="32" cy="28" r="18" fill="#5C1620" />
    <path
      d="M19 26 C17 17 28 12 37 14 C45 16 47 24 43 31 C38 37 23 37 19 26 Z"
      fill="#7B1E26"
    />
    <path
      d="M23 32 C19 25 25 18 33 20 C40 22 42 28 38 34 C33 39 25 37 23 32 Z"
      fill="#C0392B"
    />
    <path
      d="M26 24 C25 20 30 16 35 18 C38 20 38 24 36 27 C33 30 27 28 26 24 Z"
      fill="#E63946"
    />
    <path
      d="M29 22 C29 20 32 18 35 20 C37 22 36 24 34 25 C32 26 30 24 29 22 Z"
      fill="#FF4D6D"
    />
  </svg>
);

export const CorazonRojoSVG: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// Algoritmo de normalización ultra-flexible para validar el nombre
export const normalizarRespuesta = (txt: string): string => {
  return txt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar tildes
    .replace(/['’`´]/g, '') // quitar apóstrofes
    .replace(/dall\s+orso/g, 'dallorso') // unir dall orso
    .replace(/[^a-z0-9\s]/g, ' ') // limpiar signos
    .replace(/\s+/g, ' ') // normalizar espacios múltiples
    .trim();
};

export const CartaSecreta: React.FC = () => {
  const [abierto, setAbierto] = useState<boolean>(false);
  const [fase, setFase] = useState<'pregunta' | 'abriendo' | 'revelada'>('pregunta');
  const [respuesta, setRespuesta] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [desbloqueadaPrevia, setDesbloqueadaPrevia] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Leer estado previo desbloqueado al montar
  useEffect(() => {
    try {
      const guardado = localStorage.getItem('para-ti-carta-secreta-desbloqueada');
      if (guardado === 'true') {
        setDesbloqueadaPrevia(true);
      }
    } catch {
      // Ignorar errores en navegadores con storage restringido
    }
  }, []);

  // Autofocus en el input al abrir el modal en fase de pregunta
  useEffect(() => {
    if (abierto && fase === 'pregunta') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [abierto, fase]);

  const dispararEfectoCelebracion = () => {
    try {
      // Ráfaga central de corazones y tonos rojos y dorados
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#C0392B', '#7B1E26', '#E63946', '#D4A017', '#FF758F'],
        disableForReducedMotion: true,
      });

      // Disparos laterales festivos
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 65,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#C0392B', '#D4A017', '#FF4D6D'],
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 65,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#7B1E26', '#D4A017', '#FF758F'],
        });
      }, 250);
    } catch {
      // Si el navegador bloquea canvas
    }
  };

  const abrirModal = () => {
    setError(null);
    if (desbloqueadaPrevia) {
      setFase('revelada');
    } else {
      setFase('pregunta');
      setRespuesta('');
    }
    setAbierto(true);
  };

  const cerrarModal = () => {
    setAbierto(false);
    setError(null);
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    const limpia = normalizarRespuesta(respuesta);

    // Comparar contra 'elvis melchor carbajal dallorso'
    if (limpia === 'elvis melchor carbajal dallorso') {
      setError(null);
      setFase('abriendo');
      dispararEfectoCelebracion();

      try {
        localStorage.setItem('para-ti-carta-secreta-desbloqueada', 'true');
        setDesbloqueadaPrevia(true);
      } catch {
        // Ignorar
      }

      // Transición elegante de apertura de sobre
      setTimeout(() => {
        setFase('revelada');
      }, 750);
    } else {
      setError(
        'Ese no es el nombre completo exacto de tu novio, piénsalo con cariño e inténtalo de nuevo ❤️'
      );
    }
  };

  return (
    <div className="w-full my-10 flex flex-col items-center">
      {/* BOTÓN PRINCIPAL LLAMATIVO Y ELEGANTE */}
      <div className="relative group p-1.5 rounded-3xl bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-amber-400 to-rose-600 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition duration-700 anim-brillo-dorado" />

        <button
          type="button"
          onClick={abrirModal}
          className="relative px-8 py-4 rounded-2xl bg-gradient-to-b from-[#7B1E26] via-[#5C1620] to-[#3B0E14] text-[var(--papel)] flex items-center gap-3.5 border border-amber-300/50 shadow-inner group-hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
        >
          {/* Tulipán a la izquierda */}
          <span className="shrink-0 transform group-hover:-rotate-12 transition-transform duration-300">
            <TulipanRojoSVG size={32} />
          </span>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Solo para ti
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-ping" />
            </div>
            <span className="text-lg md:text-2xl font-serif-titulos font-bold text-amber-100 flex items-center gap-2 drop-shadow-sm">
              💌 Carta Secreta 🌹
            </span>
            <span className="text-xs text-rose-200/90 font-sans block mt-0.5">
              Un secreto guardado con amor en el corazón
            </span>
          </div>

          {/* Rosa a la derecha */}
          <span className="shrink-0 transform group-hover:rotate-12 transition-transform duration-300 ml-1">
            <RosaRojaSVG size={32} />
          </span>
        </button>
      </div>

      {/* MODAL INMERSIVO EN ROJOS INTENSOS, ROSAS Y TULIPANES */}
      {abierto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="carta-secreta-titulo"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) cerrarModal();
          }}
        >
          <div className="relative w-full max-w-xl my-auto bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-amber-400/70 overflow-hidden transform transition-all text-[var(--tinta)]">
            {/* Cenefa decorativa superior en rojo terciopelo */}
            <div className="bg-gradient-to-r from-[#7B1E26] via-[#A8232F] to-[#7B1E26] px-6 py-4 text-white flex items-center justify-between border-b-2 border-amber-400/50">
              <div className="flex items-center gap-2">
                <RosaRojaSVG size={26} />
                <span className="font-serif-titulos font-bold text-base md:text-lg text-amber-200 tracking-wide">
                  Secreto de Amor
                </span>
                <TulipanRojoSVG size={24} />
              </div>

              <button
                type="button"
                onClick={cerrarModal}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            {/* FASE 1: PREGUNTA ROMÁNTICA */}
            {fase === 'pregunta' && (
              <div className="p-6 md:p-8 text-center space-y-6">
                {/* Corona floral de rosas y tulipanes */}
                <div className="flex justify-center items-center gap-2 text-rose-700">
                  <TulipanRojoSVG size={32} />
                  <RosaRojaSVG size={36} />
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-inner">
                    <CorazonRojoSVG size={22} className="text-[#C0392B] anim-latido" />
                  </div>
                  <RosaRojaSVG size={36} />
                  <TulipanRojoSVG size={32} />
                </div>

                <div>
                  <h3
                    id="carta-secreta-titulo"
                    className="text-2xl md:text-3xl font-serif-titulos font-bold text-[#7B1E26] leading-tight"
                  >
                    ¿Cuál es el nombre completo de tu novio?
                  </h3>
                  <p className="font-manuscrita text-2xl md:text-3xl text-[#C0392B] mt-2">
                    «Responde para abrir este secreto guardado solo para ti...»
                  </p>
                </div>

                <form onSubmit={manejarEnvio} className="space-y-4 max-w-md mx-auto">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={respuesta}
                      onChange={(e) => {
                        setRespuesta(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="Escribe su nombre completo aquí..."
                      className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-rose-300 focus:border-[#C0392B] focus:ring-4 focus:ring-rose-200 outline-none text-center font-medium text-base text-[var(--tinta)] shadow-inner transition-all placeholder:text-stone-400 placeholder:italic"
                      aria-label="Nombre completo de tu novio"
                    />
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs md:text-sm font-medium leading-relaxed animate-fadeIn flex items-center justify-center gap-2 shadow-sm">
                      <span className="shrink-0 text-base">💌</span>
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="submit"
                      className="btn-romantico px-8 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#7B1E26] via-[#C0392B] to-[#7B1E26] text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-amber-300/40"
                    >
                      Descubrir Secreto 🗝️❤️
                    </button>
                  </div>
                </form>

                <p className="text-[11px] text-stone-400 italic">
                  Tip amoroso: Incluye todos sus nombres y apellidos como figuran en su corazón.
                </p>
              </div>
            )}

            {/* FASE INTERMEDIA: ANIMACIÓN DE APERTURA DE SOBRE */}
            {fase === 'abriendo' && (
              <div className="p-12 text-center space-y-4 flex flex-col items-center justify-center min-h-[320px]">
                <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center text-4xl shadow-lg anim-latido border-2 border-rose-300">
                  💌
                </div>
                <h4 className="text-2xl font-serif-titulos font-bold text-[#7B1E26]">
                  Abriendo tu carta con amor...
                </h4>
                <div className="flex gap-2 text-rose-600">
                  <TulipanRojoSVG size={28} />
                  <RosaRojaSVG size={28} />
                </div>
              </div>
            )}

            {/* FASE 2: CARTA REVELADA (AVISO DEL PANTALÓN + POEMA CONMOVEDOR) */}
            {fase === 'revelada' && (
              <div className="p-6 md:p-8 space-y-6 max-h-[82vh] overflow-y-auto anim-sobre-abrir">
                {/* GRAN AVISO DESTACADO DEL SOBRE FÍSICO */}
                <div className="relative overflow-hidden rounded-3xl p-6 md:p-7 bg-gradient-to-br from-[#7B1E26] via-[#5C1620] to-[#3B0E14] text-white border-2 border-amber-400 shadow-xl text-center">
                  {/* Destellos y decoraciones florales en las esquinas */}
                  <div className="absolute top-2 left-3 opacity-80">
                    <TulipanRojoSVG size={30} />
                  </div>
                  <div className="absolute top-2 right-3 opacity-80">
                    <RosaRojaSVG size={30} />
                  </div>
                  <div className="absolute bottom-2 left-3 opacity-70">
                    <RosaRojaSVG size={26} />
                  </div>
                  <div className="absolute bottom-2 right-3 opacity-70">
                    <TulipanRojoSVG size={26} />
                  </div>

                  <div className="relative z-10 space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-amber-400 text-stone-900 shadow-sm">
                      ¡Misión Especial Para Ti!
                    </span>

                    <h3 className="text-xl md:text-2xl font-serif-titulos font-bold text-amber-200 leading-snug drop-shadow-md">
                      🌹 Elvis tiene un sobre en su pantalón de atrás... 🌹
                    </h3>

                    <p className="text-sm md:text-base font-sans text-rose-100 font-medium max-w-md mx-auto leading-relaxed">
                      ¡Ve a buscarlo cuando quieras! Pero antes de eso, quiero que leas esto con todo tu corazón:
                    </p>
                  </div>
                </div>

                {/* TARJETA DEL POEMA CONMOVEDOR */}
                <div className="textura-papel bg-white/95 rounded-3xl p-6 md:p-8 border border-rose-200 shadow-md space-y-5 text-left relative">
                  {/* Encabezado del poema con tulipanes y rosas */}
                  <div className="flex items-center justify-between border-b border-rose-100 pb-4">
                    <div className="flex items-center gap-2">
                      <TulipanRojoSVG size={26} />
                      <span className="font-serif-titulos font-bold text-[#7B1E26] text-lg">
                        De mi alma para la tuya
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-600">
                      <CorazonRojoSVG size={18} />
                      <RosaRojaSVG size={24} />
                    </div>
                  </div>

                  {/* Estrofas estructuradas con los sentimientos de Elvis */}
                  <div className="space-y-4 text-stone-800 text-sm md:text-base leading-relaxed">
                    <p className="indent-2">
                      Miro hacia atrás y todo lo que hemos vivido juntos ha sido un camino simplemente hermoso. Cada risa cómplice, cada abrazo a destiempo y cada instante compartido a tu lado se han convertido en los tesoros más preciosos que guardo en mi memoria.
                    </p>

                    <p className="indent-2">
                      Sé que en este trayecto no siempre he sido perfecto y que a veces puedo equivocarme. Por los momentos difíciles, por las dudas o por cualquier falla que haya cometido, te pido perdón desde lo más puro y hondo de mi pecho. <strong className="text-[#7B1E26] font-semibold">Me encantaría que me perdonaras</strong>, porque mi mayor deseo es aprender a ser un mejor compañero para ti cada día.
                    </p>

                    <p className="indent-2">
                      No te imaginas cuánto me fascina pasar el día contigo. No hay lugar en el mundo donde me sienta más en paz que a tu lado. Cada mañana y cada noche trato de darte todo el tiempo y la atención que puedo, de regalarte mi presencia sincera, porque compartir la vida con vos hace que todo tenga sentido y alegría.
                    </p>

                    <p className="indent-2">
                      Quiero con todas mis fuerzas que en cada gesto, en cada detalle y en cada cosa que hago por ti, sientas lo profundamente querida, cuidada y valorada que eres. Mereces sentirte la mujer más amada del universo, porque para mí lo eres todo.
                    </p>
                  </div>

                  {/* Dedicación cariñosa especial */}
                  <div className="pt-4 border-t border-rose-100 text-center space-y-2">
                    <p className="font-manuscrita text-2xl md:text-3xl text-[#C0392B] font-bold">
                      «Te amo con toda mi alma, mi ratita del mal preciosa ❤️»
                    </p>

                    <div className="pt-3 text-right">
                      <p className="font-manuscrita text-3xl md:text-4xl text-[#7B1E26]">
                        — Siempre tuyo, Elvis 🌹
                      </p>
                    </div>
                  </div>
                </div>

                {/* BOTÓN INFERIOR DE ACCIÓN / VOLVER */}
                <div className="text-center pt-2 pb-1 flex justify-center">
                  <button
                    type="button"
                    onClick={cerrarModal}
                    className="btn-romantico px-7 py-2.5 rounded-full text-xs font-semibold bg-rose-100 text-[#7B1E26] border border-rose-200 hover:bg-rose-200 transition-colors cursor-pointer"
                  >
                    Guardar en mi corazón y cerrar ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartaSecreta;
