import React, { useState } from 'react';
import { fotos, type FotoItem } from '../data/datos.ts';
import { RosaSVG } from './RosaSVG.tsx';

export const GaleriaFotos: React.FC = () => {
  const [fotoActiva, setFotoActiva] = useState<FotoItem | null>(null);

  const fotosValidas = fotos.filter((f) => f.src && !f.src.startsWith('POR_COMPLETAR'));

  return (
    <div className="w-full max-w-3xl mx-auto">
      {fotosValidas.length === 0 ? (
        /* Estado por defecto sin fotos subidas (elegante y sin roturas) */
        <div className="tarjeta-romantica p-8 text-center border border-[var(--rosa)] max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[var(--rosa-palido)] text-[var(--granate)] flex items-center justify-center mx-auto mb-3">
            <RosaSVG variante="boton" color="rojo" size={32} />
          </div>
          <h4 className="font-serif-titulos text-lg font-bold text-[var(--granate)] mb-2">
            Nuestro Álbum de Recuerdos
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto mb-4">
            Cada foto nuestra tiene un pedacito de historia. Agrega tus fotos favoritas en <code className="bg-stone-100 px-1 py-0.5 rounded text-[11px]">public/fotos/</code> y regístralas en <code className="bg-stone-100 px-1 py-0.5 rounded text-[11px]">src/data/datos.ts</code>.
          </p>
          <div className="p-3 bg-[var(--crema)] rounded-xl border border-[var(--rosa-palido)] text-xs text-stone-500 italic font-manuscrita text-base">
            «Las mejores fotos son las que aún nos faltan por tomar»
          </div>
        </div>
      ) : (
        /* Galería con tarjetas tipo Polaroid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fotosValidas.map((f, idx) => (
            <div
              key={idx}
              onClick={() => setFotoActiva(f)}
              className="group cursor-pointer bg-white p-3 pb-5 rounded-xl shadow-md border border-stone-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:rotate-1"
              role="button"
              tabIndex={0}
              aria-label={`Ver foto: ${f.pie || 'Momento juntos'}`}
            >
              <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden mb-3 relative">
                <img
                  src={f.src}
                  alt={f.alt || f.pie || 'Fotografía de nosotros'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <p className="font-manuscrita text-lg text-stone-700 text-center leading-snug truncate px-1">
                {f.pie || 'Un momento especial'}
              </p>
              {f.fecha && (
                <p className="text-[10px] text-stone-400 text-center uppercase tracking-wider mt-0.5">
                  {f.fecha}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* LIGHTBOX MODAL EN PANTALLA COMPLETA */}
      {fotoActiva && (
        <div
          onClick={() => setFotoActiva(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 pb-6 rounded-2xl max-w-lg w-full shadow-2xl relative animate-fadeIn"
          >
            <button
              type="button"
              onClick={() => setFotoActiva(null)}
              className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200"
            >
              ✕ Cerrar
            </button>

            <div className="max-h-[70vh] rounded-xl overflow-hidden mb-4 bg-stone-100 flex items-center justify-center">
              <img
                src={fotoActiva.src}
                alt={fotoActiva.alt || fotoActiva.pie || 'Momento'}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="text-center px-4">
              <p className="font-manuscrita text-2xl text-[var(--granate)] font-bold mb-1">
                {fotoActiva.pie}
              </p>
              {fotoActiva.fecha && (
                <p className="text-xs text-stone-500 uppercase tracking-widest">
                  {fotoActiva.fecha}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
