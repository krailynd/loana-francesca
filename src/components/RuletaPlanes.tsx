import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { planesRuleta, type PlanRuleta } from '../data/bancos.ts';
import { RosaSVG } from './RosaSVG.tsx';

export const RuletaPlanes: React.FC = () => {
  const [girando, setGirando] = useState(false);
  const [planActual, setPlanActual] = useState<PlanRuleta>(planesRuleta[0]);
  const [planElegido, setPlanElegido] = useState<PlanRuleta | null>(null);
  const [confirmadoParaViernes, setConfirmadoParaViernes] = useState(false);

  // Cargar plan guardado en localStorage
  useEffect(() => {
    try {
      const guardado = localStorage.getItem('para-ti-plan-elegido');
      if (guardado) {
        const parsed = JSON.parse(guardado);
        setPlanElegido(parsed);
      }
    } catch (e) {
      console.warn('Error leyendo localStorage', e);
    }
  }, []);

  const girarRuleta = () => {
    if (girando) return;
    setGirando(true);
    setConfirmadoParaViernes(false);

    let velocidad = 50;
    let contador = 0;
    const vueltasTotales = 25 + Math.floor(Math.random() * 15);

    const paso = () => {
      contador++;
      const indiceAleatorio = Math.floor(Math.random() * planesRuleta.length);
      setPlanActual(planesRuleta[indiceAleatorio]);

      if (contador < vueltasTotales) {
        velocidad += 12; // Desaceleración progresiva
        setTimeout(paso, velocidad);
      } else {
        setGirando(false);
        try {
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#C0392B', '#E8A0A8', '#D4A017'],
          });
        } catch (e) {
          // Ignorar
        }
      }
    };

    paso();
  };

  const guardarParaEsteViernes = () => {
    setPlanElegido(planActual);
    setConfirmadoParaViernes(true);
    try {
      localStorage.setItem('para-ti-plan-elegido', JSON.stringify(planActual));
    } catch (e) {
      console.warn('Error guardando en localStorage', e);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto tarjeta-romantica p-6 md:p-8 border border-[var(--rosa)] text-center">
      {/* Encabezado */}
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest text-[var(--granate)] font-bold block mb-1">
          Ruleta de Citas en Ica
        </span>
        <h3 className="text-xl md:text-2xl font-serif-titulos font-bold text-[var(--tinta)]">
          ¿Qué hacemos este viernes?
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          15 planes simples y bonitos para disfrutar nuestro tiempo juntos sin gastar de más.
        </p>
      </div>

      {/* PLAN SELECCIONADO EN LA RULETA */}
      <div
        className={`p-8 bg-[var(--crema)] rounded-2xl border-2 transition-all duration-300 min-h-[200px] flex flex-col justify-center items-center relative overflow-hidden mb-6 ${
          girando
            ? 'border-[var(--rosa)] scale-98 blur-[0.4px]'
            : 'border-[var(--dorado)] shadow-md scale-100'
        }`}
      >
        <div className="text-5xl mb-3 select-none transform transition-transform duration-200">
          {planActual.icono}
        </div>
        <h4 className="text-xl font-serif-titulos font-bold text-[var(--granate)] mb-2">
          {planActual.titulo}
        </h4>
        <p className="text-sm text-stone-700 leading-relaxed max-w-xs">
          {planActual.descripcion}
        </p>

        {girando && (
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--rojo)] animate-pulse">
              Decidiendo destino...
            </span>
          </div>
        )}
      </div>

      {/* ACCIONES */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
        <button
          type="button"
          disabled={girando}
          onClick={girarRuleta}
          className="btn-romantico w-full sm:w-auto px-7 py-3 bg-[var(--granate)] hover:bg-[var(--rojo)] text-[var(--papel)] rounded-full text-sm font-semibold shadow-md flex items-center justify-center gap-2"
        >
          <span>🎲</span>
          <span>{girando ? 'Girando...' : 'Girar la ruleta'}</span>
        </button>

        {!girando && (
          <button
            type="button"
            onClick={guardarParaEsteViernes}
            className="btn-romantico w-full sm:w-auto px-6 py-3 bg-[var(--papel)] hover:bg-[var(--crema)] text-[var(--granate)] border border-[var(--dorado)] rounded-full text-sm font-semibold shadow-sm flex items-center justify-center gap-2"
          >
            <span>📌</span>
            <span>Elegir para este viernes</span>
          </button>
        )}
      </div>

      {confirmadoParaViernes && (
        <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-medium mb-4 animate-fadeIn">
          ✓ ¡Plan guardado con éxito! Nos vemos este viernes para cumplirlo.
        </div>
      )}

      {/* PLAN ELEGIDO ACTUALMENTE */}
      {planElegido && (
        <div className="pt-4 border-t border-[var(--rosa-palido)] text-left">
          <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-2">
            Plan acordado para nuestro próximo encuentro:
          </p>
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center gap-3">
            <span className="text-2xl">{planElegido.icono}</span>
            <div>
              <p className="text-sm font-bold text-amber-950 font-serif-titulos">
                {planElegido.titulo}
              </p>
              <p className="text-xs text-amber-800 leading-snug">
                {planElegido.descripcion}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
