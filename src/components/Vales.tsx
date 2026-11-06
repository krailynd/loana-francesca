import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { vales as valesData, type ValeItem } from '../data/datos.ts';
import { RosaSVG } from './RosaSVG.tsx';

interface CanjeadoInfo {
  id: string;
  fecha: string;
}

export const Vales: React.FC = () => {
  const [canjeados, setCanjeados] = useState<Record<string, string>>({});
  const [modalConfirmar, setModalConfirmar] = useState<ValeItem | null>(null);

  useEffect(() => {
    try {
      const guardados = localStorage.getItem('para-ti-vales-canjeados');
      if (guardados) {
        setCanjeados(JSON.parse(guardados));
      }
    } catch (e) {
      console.warn('Error leyendo localStorage', e);
    }
  }, []);

  const solicitarCanje = (vale: ValeItem) => {
    setModalConfirmar(vale);
  };

  const confirmarCanje = () => {
    if (!modalConfirmar) return;

    const fechaHoy = new Date().toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const nuevos = {
      ...canjeados,
      [modalConfirmar.id]: fechaHoy,
    };

    setCanjeados(nuevos);
    setModalConfirmar(null);

    try {
      localStorage.setItem('para-ti-vales-canjeados', JSON.stringify(nuevos));
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C0392B', '#D4A017', '#E8A0A8'],
        disableForReducedMotion: true,
      });
    } catch (e) {
      // Ignorar
    }
  };

  const restaurarVales = () => {
    if (window.confirm('¿Deseas restaurar todos los vales para poder canjearlos de nuevo?')) {
      setCanjeados({});
      try {
        localStorage.removeItem('para-ti-vales-canjeados');
      } catch (e) {
        // Ignorar
      }
    }
  };

  const total = valesData.length;
  const usados = Object.keys(canjeados).length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Barra de progreso */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[var(--papel)] p-4 rounded-2xl border border-[var(--rosa)] shadow-sm mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[var(--granate)] font-semibold block">
            Talonario de Vales
          </span>
          <p className="text-sm font-serif-titulos font-bold text-[var(--tinta)]">
            Cupones de Amor Canjeables
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--crema)] text-[var(--granate)] border border-[var(--rosa-palido)]">
            {usados} de {total} canjeados
          </span>
        </div>
      </div>

      {/* REJILLA DE VALES / CUPONES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {valesData.map((vale) => {
          const estaCanjeado = Boolean(canjeados[vale.id]);
          const fechaCanje = canjeados[vale.id];

          return (
            <div
              key={vale.id}
              className={`borde-cupon-dorado p-5 rounded-2xl flex flex-col justify-between transition-all relative overflow-hidden ${
                estaCanjeado ? 'opacity-85 bg-stone-50' : 'hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Círculos decorativos de recorte lateral de ticket */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[var(--crema)] border-r-2 border-dashed border-[var(--dorado)] pointer-events-none" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[var(--crema)] border-l-2 border-dashed border-[var(--dorado)] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--granate)] font-bold">
                    Cupón Válido
                  </span>
                  <RosaSVG variante="boton" color="rojo" size={16} />
                </div>

                <h4
                  className={`text-lg font-serif-titulos font-bold text-[var(--tinta)] mb-1 ${
                    estaCanjeado ? 'line-through text-stone-500' : ''
                  }`}
                >
                  {vale.titulo}
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {vale.detalle}
                </p>
              </div>

              {/* SELLO O BOTÓN DE CANJEAR */}
              <div className="mt-5 pt-3 border-t border-dashed border-stone-200 flex justify-between items-center">
                {estaCanjeado ? (
                  <div className="w-full flex items-center justify-between">
                    <span className="sello-canjeado text-xs">
                      CANJEADO
                    </span>
                    <span className="text-[11px] text-stone-500 font-sans">
                      Usado el {fechaCanje}
                    </span>
                  </div>
                ) : (
                  <>
                    <span className="text-[11px] text-stone-400 font-manuscrita text-base">
                      Válido cuando tú quieras
                    </span>
                    <button
                      type="button"
                      onClick={() => solicitarCanje(vale)}
                      className="btn-romantico px-4 py-1.5 bg-[var(--rojo)] hover:bg-[var(--granate)] text-[var(--papel)] rounded-full text-xs font-semibold shadow-sm transition-transform"
                    >
                      Canjear vale
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTÓN RESTAURAR VALES */}
      <div className="mt-8 text-center no-print">
        <button
          type="button"
          onClick={restaurarVales}
          className="text-xs text-stone-400 hover:text-[var(--granate)] underline py-2 px-3"
        >
          Reiniciar el estado de todos los vales
        </button>
      </div>

      {/* DIÁLOGO MODAL DE CONFIRMACIÓN */}
      {modalConfirmar && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="tarjeta-romantica bg-[var(--papel)] p-6 max-w-sm w-full border border-[var(--rosa)] text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[var(--rosa-palido)] text-[var(--granate)] flex items-center justify-center mx-auto mb-3 text-xl">
              💌
            </div>
            <h4 className="font-serif-titulos text-lg font-bold text-[var(--granate)] mb-2">
              ¿Segura que deseas canjear este vale?
            </h4>
            <p className="text-sm font-semibold text-[var(--rojo)] mb-1">
              «{modalConfirmar.titulo}»
            </p>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              Una vez confirmado, el vale se marcará con el sello CANJEADO y la fecha de hoy.
            </p>

            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => setModalConfirmar(null)}
                className="btn-romantico px-4 py-2 rounded-full text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200"
              >
                Todavía no
              </button>
              <button
                type="button"
                onClick={confirmarCanje}
                className="btn-romantico px-5 py-2 rounded-full text-xs font-semibold text-white bg-[var(--rojo)] hover:bg-[var(--granate)] shadow"
              >
                Sí, canjear ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
