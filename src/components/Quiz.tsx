import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { quiz as quizPersonalizado } from '../data/datos.ts';
import { quizSemilla, type PreguntaQuizSemilla } from '../data/bancos.ts';
import { RosaSVG } from './RosaSVG.tsx';

export const Quiz: React.FC = () => {
  // Si no hay preguntas en datos.ts, usamos la semilla genérica de bancos.ts
  const preguntasBase: PreguntaQuizSemilla[] =
    quizPersonalizado && quizPersonalizado.length > 0 ? quizPersonalizado : quizSemilla;

  const [indiceActual, setIndiceActual] = useState(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [preguntas, setPreguntas] = useState<PreguntaQuizSemilla[]>(preguntasBase);

  const pregunta = preguntas[indiceActual];
  const total = preguntas.length;

  const seleccionarOpcion = (idx: number) => {
    if (respondido) return;
    setOpcionSeleccionada(idx);
    setRespondido(true);

    if (idx === pregunta.correcta) {
      setAciertos((prev) => prev + 1);
    }
  };

  const siguientePregunta = () => {
    if (indiceActual + 1 < total) {
      setIndiceActual((prev) => prev + 1);
      setOpcionSeleccionada(null);
      setRespondido(false);
    } else {
      setFinalizado(true);
      // Disparar confeti con los colores de la paleta
      const porcentaje = Math.round(((aciertos + (opcionSeleccionada === pregunta.correcta ? 1 : 0)) / total) * 100);
      if (porcentaje >= 60) {
        dispararConfetiRomantico();
      }
    }
  };

  const reiniciarQuiz = () => {
    // Rebarajar preguntas
    const barajadas = [...preguntasBase].sort(() => Math.random() - 0.5);
    setPreguntas(barajadas);
    setIndiceActual(0);
    setOpcionSeleccionada(null);
    setRespondido(false);
    setAciertos(0);
    setFinalizado(false);
  };

  const dispararConfetiRomantico = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C0392B', '#7B1E26', '#E8A0A8', '#D4A017', '#F7D6DA'],
        disableForReducedMotion: true,
      });
    } catch (e) {
      console.warn('Confetti no disponible', e);
    }
  };

  if (finalizado) {
    const porcentaje = Math.round((aciertos / total) * 100);

    let mensajeFinal = '';
    let emoji = '';
    if (porcentaje <= 40) {
      mensajeFinal = 'Hay un montón de cosas lindas que todavía nos falta descubrir juntos. ¡La aventura apenas empieza!';
      emoji = '🌱';
    } else if (porcentaje <= 79) {
      mensajeFinal = '¡Me conoces de maravilla! Cada momento que compartimos se nota en tus respuestas.';
      emoji = '💖';
    } else {
      mensajeFinal = '¡Puntaje perfecto de complicidad! Eres mi persona favorita y me conoces como nadie más en este mundo.';
      emoji = '👑';
    }

    return (
      <div className="tarjeta-romantica w-full max-w-md mx-auto p-8 border border-[var(--rosa)] text-center animate-fadeIn">
        <div className="text-4xl mb-3">{emoji}</div>
        <h3 className="text-2xl font-bold font-serif-titulos text-[var(--granate)] mb-2">
          Resultado del Quiz
        </h3>
        <p className="text-sm text-stone-500 mb-6">¿Cuánto nos conocemos?</p>

        <div className="p-6 bg-[var(--crema)] rounded-2xl border border-[var(--rosa-palido)] mb-6">
          <span className="block text-5xl font-bold font-serif-titulos text-[var(--rojo)]">
            {aciertos} / {total}
          </span>
          <span className="text-xs uppercase tracking-widest text-[var(--granate)] font-semibold mt-1 block">
            {porcentaje}% de aciertos
          </span>
        </div>

        <p className="text-base text-[var(--tinta)] leading-relaxed mb-8 px-2 font-serif-titulos italic">
          «{mensajeFinal}»
        </p>

        <button
          type="button"
          onClick={reiniciarQuiz}
          className="btn-romantico px-6 py-3 bg-[var(--granate)] hover:bg-[var(--rojo)] text-[var(--papel)] rounded-full font-medium text-sm shadow-md flex items-center justify-center gap-2 mx-auto"
        >
          <span>🔄</span>
          <span>Jugar de nuevo</span>
        </button>
      </div>
    );
  }

  const progreso = Math.round(((indiceActual + 1) / total) * 100);

  return (
    <div className="w-full max-w-lg mx-auto tarjeta-romantica p-6 md:p-8 border border-[var(--rosa)]">
      {/* Barra de progreso */}
      <div className="w-full mb-6">
        <div className="flex justify-between items-center text-xs text-stone-500 mb-2">
          <span className="font-semibold text-[var(--granate)] uppercase tracking-wider">
            Quiz «Cuánto me conoces»
          </span>
          <span className="font-medium bg-[var(--crema)] px-2.5 py-0.5 rounded-full border border-[var(--rosa-palido)]">
            {indiceActual + 1} de {total}
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--crema)] rounded-full overflow-hidden border border-[var(--rosa-palido)]">
          <div
            className="h-full bg-[var(--rojo)] transition-all duration-300 rounded-full"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* Pregunta */}
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-serif-titulos font-bold text-[var(--tinta)] leading-snug">
          {pregunta.pregunta}
        </h3>
      </div>

      {/* Opciones */}
      <div className="space-y-2.5 mb-6">
        {pregunta.opciones.map((opcion, idx) => {
          let estiloBoton = 'bg-[var(--papel)] text-[var(--tinta)] border-[var(--rosa-palido)] hover:bg-[var(--crema)]';

          if (respondido) {
            if (idx === pregunta.correcta) {
              estiloBoton = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-semibold';
            } else if (idx === opcionSeleccionada) {
              estiloBoton = 'bg-rose-100 text-rose-950 border-rose-300 opacity-90';
            } else {
              estiloBoton = 'bg-[var(--papel)] text-stone-400 border-stone-200 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={respondido}
              onClick={() => seleccionarOpcion(idx)}
              className={`w-full p-3.5 rounded-xl border text-left text-sm md:text-base transition-all flex items-center justify-between min-h-[44px] ${estiloBoton}`}
            >
              <span>{opcion}</span>
              {respondido && idx === pregunta.correcta && (
                <span className="text-emerald-700 text-lg">✓</span>
              )}
              {respondido && idx === opcionSeleccionada && idx !== pregunta.correcta && (
                <span className="text-rose-600 text-lg">✕</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Retroalimentación inmediata con explicación */}
      {respondido && (
        <div className="p-4 bg-[var(--crema)] rounded-xl border border-[var(--rosa-palido)] mb-6 animate-fadeIn">
          <p className="text-xs uppercase tracking-wider font-bold mb-1 text-[var(--granate)] flex items-center gap-1.5">
            <span>{opcionSeleccionada === pregunta.correcta ? '¡Exacto! 🎉' : 'Casi casi... 💭'}</span>
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            {pregunta.explicacion}
          </p>
        </div>
      )}

      {/* Botón Siguiente */}
      {respondido && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={siguientePregunta}
            className="btn-romantico px-6 py-2.5 bg-[var(--rojo)] hover:bg-[var(--granate)] text-[var(--papel)] rounded-full text-sm font-medium shadow flex items-center gap-2"
          >
            <span>{indiceActual + 1 < total ? 'Siguiente pregunta' : 'Ver resultado'}</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};
