import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sobres, pareja, type SobreItem } from '../data/datos.ts';
import { RosaSVG } from './RosaSVG.tsx';

export const Sobres: React.FC = () => {
  const [abiertos, setAbiertos] = useState<string[]>([]);
  const [sobreSeleccionado, setSobreSeleccionado] = useState<SobreItem | null>(null);

  useEffect(() => {
    try {
      const guardados = localStorage.getItem('para-ti-sobres-abiertos');
      if (guardados) {
        setAbiertos(JSON.parse(guardados));
      }
    } catch (e) {
      console.warn('Error leyendo sobres de localStorage', e);
    }
  }, []);

  const abrirSobre = (sobre: SobreItem) => {
    setSobreSeleccionado(sobre);

    if (!abiertos.includes(sobre.id)) {
      const nuevos = [...abiertos, sobre.id];
      setAbiertos(nuevos);
      try {
        localStorage.setItem('para-ti-sobres-abiertos', JSON.stringify(nuevos));
      } catch (e) {
        // Ignorar
      }

      // Celebración si abre el último sobre
      if (nuevos.length === sobres.length) {
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.5 },
            colors: ['#C0392B', '#7B1E26', '#E8A0A8', '#D4A017'],
            disableForReducedMotion: true,
          });
        } catch (e) {
          // Ignorar
        }
      }
    }
  };

  const cerrarModal = () => {
    setSobreSeleccionado(null);
  };

  const total = sobres.length;
  const abiertosCount = abiertos.length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Barra de progreso */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[var(--papel)] p-4 rounded-2xl border border-[var(--rosa)] shadow-sm mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[var(--granate)] font-semibold block">
            Sobres Especiales
          </span>
          <p className="text-sm font-serif-titulos font-bold text-[var(--tinta)]">
            Abre esto cuando…
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--rosa-palido)] text-[var(--granate)] border border-[var(--rosa)]">
            {abiertosCount} de {total} abiertos
          </span>
        </div>
      </div>

      {/* REJILLA DE SOBRES FÍSICOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sobres.map((sobre) => {
          const yaAbierto = abiertos.includes(sobre.id);

          return (
            <div
              key={sobre.id}
              onClick={() => abrirSobre(sobre)}
              className={`group cursor-pointer relative aspect-[16/11] rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 border select-none ${
                yaAbierto
                  ? 'bg-[#FDFBF7] border-stone-300 shadow-xs opacity-90'
                  : 'bg-[#F4E8DC] border-[#D8C7B5] shadow-md hover:shadow-xl hover:-translate-y-1'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Sobre para cuando ${sobre.cuando}. ${yaAbierto ? 'Ya leído' : 'Sin abrir'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') abrirSobre(sobre);
              }}
            >
              {/* Solapa decorativa superior */}
              <div
                className={`absolute top-0 left-0 right-0 h-1/2 border-b transition-colors ${
                  yaAbierto
                    ? 'bg-[#F7F2EA] border-stone-200'
                    : 'bg-[#EBDEC0]/40 border-[#D8C7B5]'
                }`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />

              {/* Rótulo superior */}
              <div className="relative z-10 flex justify-between items-center text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                <span>Sobre</span>
                {yaAbierto && (
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    Leído ✓
                  </span>
                )}
              </div>

              {/* Sello de rosa en el centro si está sin abrir */}
              <div className="relative z-10 my-auto text-center">
                {!yaAbierto && (
                  <div className="w-10 h-10 mx-auto rounded-full bg-[var(--granate)] text-[var(--papel)] flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform">
                    <RosaSVG variante="boton" color="dorado" size={20} />
                  </div>
                )}
                <h4 className="font-serif-titulos font-bold text-sm md:text-base text-[var(--tinta)] leading-snug">
                  {sobre.cuando}
                </h4>
              </div>

              {/* Pie del sobre */}
              <div className="relative z-10 text-right">
                <span className="text-[11px] font-manuscrita text-[var(--granate)] font-bold">
                  {yaAbierto ? 'Toca para releer' : 'Toca para abrir carta'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL CON LA CARTA DEL SOBRE DESPLEGADA */}
      {sobreSeleccionado && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="tarjeta-romantica textura-papel bg-[var(--papel)] p-6 md:p-8 max-w-md w-full border border-[var(--rosa)] shadow-2xl relative animate-fadeIn">
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={cerrarModal}
              className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--rosa-palido)] text-[var(--granate)] hover:bg-[var(--rosa)]"
            >
              Cerrar ✕
            </button>

            {/* Cabecera del sobre */}
            <div className="flex items-center gap-2 mb-4">
              <RosaSVG variante="abierta" color="rojo" size={26} />
              <span className="text-xs uppercase tracking-widest text-[var(--granate)] font-bold">
                Para ti cuando…
              </span>
            </div>

            <h3 className="text-xl font-serif-titulos font-bold text-[var(--granate)] mb-4 pb-2 border-b border-[var(--rosa-palido)]">
              {sobreSeleccionado.cuando}
            </h3>

            {/* Mensaje de la carta */}
            <div className="text-base leading-relaxed text-[var(--tinta)] mb-6 py-2 font-serif-titulos italic">
              «{sobreSeleccionado.mensaje}»
            </div>

            {/* Firma */}
            <div className="text-right border-t border-[var(--rosa-palido)] pt-4">
              <p className="font-manuscrita text-2xl text-[var(--rojo)]">
                {pareja.firma && pareja.firma !== 'POR_COMPLETAR'
                  ? pareja.firma
                  : '— Con todo mi amor'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
