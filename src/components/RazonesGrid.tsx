import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { razones } from '../data/datos.ts';
import { RosaSVG } from './RosaSVG.tsx';

const NUMEROS_ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

export const RazonesGrid: React.FC = () => {
  const [abiertas, setAbiertas] = useState<number[]>([]);
  const [completadoCelebrado, setCompletadoCelebrado] = useState(false);

  const total = razones.length;

  useEffect(() => {
    try {
      const guardadas = localStorage.getItem('para-ti-razones-abiertas');
      if (guardadas) {
        const parsed = JSON.parse(guardadas);
        setAbiertas(parsed);
      }
    } catch (e) {
      // localStorage no disponible
    }
  }, []);

  const toggleTarjeta = (idx: number) => {
    let nuevas: number[];
    if (abiertas.includes(idx)) {
      nuevas = abiertas.filter((i) => i !== idx);
    } else {
      nuevas = [...abiertas, idx];
    }
    setAbiertas(nuevas);

    try {
      localStorage.setItem('para-ti-razones-abiertas', JSON.stringify(nuevas));
    } catch (e) {
      // Ignorar
    }

    if (nuevas.length === total && !completadoCelebrado) {
      setCompletadoCelebrado(true);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#C0392B', '#7B1E26', '#E8A0A8', '#D4A017'],
          disableForReducedMotion: true,
        });
      } catch (e) {
        // Ignorar
      }
    }
  };

  const progreso = abiertas.length;
  const todasDescubiertas = progreso === total;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Contador superior */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[var(--papel)] p-4 rounded-2xl border border-[var(--rosa)] shadow-sm mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[var(--granate)] font-semibold block">
            Colección de Recuerdos
          </span>
          <p className="text-sm font-serif-titulos font-bold text-[var(--tinta)]">
            Razones por las que te quiero
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--rosa-palido)] text-[var(--granate)] border border-[var(--rosa)]">
            {progreso} de {total} descubiertas
          </span>
        </div>
      </div>

      {/* MENSAJE ESPECIAL CUANDO SE DESCUBREN TODAS */}
      {todasDescubiertas && (
        <div className="p-6 bg-rose-50 border-2 border-[var(--rojo)] rounded-2xl text-center mb-8 shadow-md animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-[var(--rojo)] text-white flex items-center justify-center mx-auto mb-2 text-2xl shadow">
            ❤
          </div>
          <h4 className="text-xl font-bold font-serif-titulos text-[var(--granate)] mb-2">
            ¡Descubriste todas las razones!
          </h4>
          <p className="text-sm text-[var(--tinta)] max-w-md mx-auto leading-relaxed">
            Y la verdad es que 12 razones son solo el comienzo: cada día que paso a tu lado me da mil motivos nuevos para elegirte una y otra vez.
          </p>
        </div>
      )}

      {/* REJILLA DE TARJETAS FLIP 3D */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
        {razones.map((razon, idx) => {
          const estaAbierta = abiertas.includes(idx);
          const romano = NUMEROS_ROMANOS[idx] || `${idx + 1}`;

          return (
            <div
              key={idx}
              onClick={() => toggleTarjeta(idx)}
              className="group cursor-pointer aspect-[3/4] [perspective:1000px] select-none"
              role="button"
              tabIndex={0}
              aria-label={`Razón ${romano}. ${estaAbierta ? 'Descubierta: ' + razon : 'Toca para descubrir'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleTarjeta(idx);
              }}
            >
              <div
                className={`relative w-full h-full duration-500 [transform-style:preserve-3d] transition-transform rounded-2xl shadow-sm hover:shadow-md ${
                  estaAbierta ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* FRENTE: NÚMERO ROMANO + ROSA */}
                <div className="absolute inset-0 w-full h-full bg-[var(--papel)] border border-[var(--rosa-palido)] rounded-2xl p-4 flex flex-col justify-between items-center text-center [backface-visibility:hidden]">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-sans">
                    Razón
                  </span>

                  <div className="my-auto flex flex-col items-center">
                    <span className="text-2xl font-bold font-serif-titulos text-[var(--granate)] mb-1">
                      {romano}
                    </span>
                    <RosaSVG variante="abierta" color="rojo" size={26} />
                  </div>

                  <span className="text-[10px] text-[var(--granate)] font-medium font-manuscrita text-sm">
                    Toca para ver
                  </span>
                </div>

                {/* DORSO: TEXTO DE LA RAZÓN */}
                <div className="absolute inset-0 w-full h-full bg-[var(--crema)] border-2 border-[var(--dorado)] rounded-2xl p-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                  <span className="text-[10px] text-stone-400 font-serif-titulos uppercase tracking-widest mb-1">
                    {romano}
                  </span>
                  <p className="text-xs md:text-sm font-serif-titulos text-[var(--tinta)] leading-relaxed font-medium">
                    «{razon}»
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
