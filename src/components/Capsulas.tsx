import React, { useState } from 'react';
import { capsulas, pareja, type CapsulaItem } from '../data/datos.ts';
import { RosaSVG } from './RosaSVG.tsx';

export const Capsulas: React.FC = () => {
  const [capsulaSeleccionada, setCapsulaSeleccionada] = useState<CapsulaItem | null>(null);

  const hoyStr = new Date().toISOString().split('T')[0];

  const intentarAbrir = (cap: CapsulaItem, desbloqueada: boolean) => {
    if (!desbloqueada) return;
    setCapsulaSeleccionada(cap);
  };

  const formatearFecha = (fechaStr: string) => {
    try {
      const [year, month, day] = fechaStr.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return fechaStr;
    }
  };

  const calcularDiasRestantes = (fechaStr: string) => {
    const [year, month, day] = fechaStr.split('-').map(Number);
    const objetivo = new Date(year, month - 1, day);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const diff = objetivo.getTime() - hoy.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-[var(--granate)] font-bold block mb-1">
          Cápsulas del Tiempo
        </span>
        <h3 className="text-xl md:text-2xl font-serif-titulos font-bold text-[var(--tinta)]">
          Mensajes para el Futuro
        </h3>
        <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
          Cartas selladas que solo pueden leerse a partir de la fecha indicada.
        </p>
      </div>

      <div className="space-y-4">
        {capsulas.map((cap) => {
          const desbloqueada = hoyStr >= cap.fechaDesbloqueo;
          const diasFaltantes = calcularDiasRestantes(cap.fechaDesbloqueo);

          return (
            <div
              key={cap.id}
              onClick={() => intentarAbrir(cap, desbloqueada)}
              className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden select-none ${
                desbloqueada
                  ? 'tarjeta-romantica bg-[var(--papel)] border-[var(--rosa)] cursor-pointer hover:shadow-md'
                  : 'bg-stone-100/80 border-stone-300 opacity-80 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      desbloqueada
                        ? 'bg-[var(--rosa-palido)] text-[var(--granate)]'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {desbloqueada ? '🔓' : '🔒'}
                  </div>
                  <div>
                    <h4 className="font-serif-titulos font-bold text-base text-[var(--tinta)]">
                      {cap.titulo}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {desbloqueada
                        ? `Desbloqueada el ${formatearFecha(cap.fechaDesbloqueo)}`
                        : `Se abre el ${formatearFecha(cap.fechaDesbloqueo)}`}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {desbloqueada ? (
                    <span className="btn-romantico px-3 py-1 rounded-full text-xs font-semibold bg-[var(--rojo)] text-white shadow-xs">
                      Abrir carta
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-stone-500 bg-stone-200 px-2.5 py-1 rounded-full">
                      Faltan {diasFaltantes} días
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DE CÁPSULA DESBLOQUEADA */}
      {capsulaSeleccionada && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="tarjeta-romantica textura-papel bg-[var(--papel)] p-6 md:p-8 max-w-md w-full border border-[var(--rosa)] shadow-2xl relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setCapsulaSeleccionada(null)}
              className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--rosa-palido)] text-[var(--granate)] hover:bg-[var(--rosa)]"
            >
              Cerrar ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <RosaSVG variante="abierta" color="rojo" size={26} />
              <span className="text-xs uppercase tracking-widest text-[var(--granate)] font-bold">
                Cápsula del Tiempo Desbloqueada
              </span>
            </div>

            <h3 className="text-xl font-serif-titulos font-bold text-[var(--granate)] mb-2">
              {capsulaSeleccionada.titulo}
            </h3>
            <p className="text-xs text-stone-400 mb-4 pb-2 border-b border-[var(--rosa-palido)]">
              Destinado para: {formatearFecha(capsulaSeleccionada.fechaDesbloqueo)}
            </p>

            <div className="text-base leading-relaxed text-[var(--tinta)] mb-6 font-serif-titulos italic">
              «{capsulaSeleccionada.mensaje}»
            </div>

            <div className="text-right border-t border-[var(--rosa-palido)] pt-4">
              <p className="font-manuscrita text-2xl text-[var(--rojo)]">
                {pareja.firma && pareja.firma !== 'POR_COMPLETAR' ? pareja.firma : '— Con amor'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
