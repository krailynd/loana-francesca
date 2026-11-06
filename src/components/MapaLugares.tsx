import React, { useState } from 'react';
import { lugares, type LugarItem } from '../data/datos.ts';

export const MapaLugares: React.FC = () => {
  const [lugarActivo, setLugarActivo] = useState<LugarItem | null>(null);

  const visitados = lugares.filter((l) => l.estado === 'visitado').length;
  const porConocer = lugares.filter((l) => l.estado === 'por-conocer').length;

  return (
    <div className="w-full max-w-2xl mx-auto tarjeta-romantica p-6 md:p-8 border border-[var(--rosa)]">
      {/* Cabecera y estadísticas */}
      <div className="flex flex-col sm:flex-row justify-between items-center pb-4 mb-6 border-b border-[var(--rosa-palido)]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[var(--granate)] font-semibold block">
            Nuestro Mapa de Aventuras
          </span>
          <h3 className="text-xl font-serif-titulos font-bold text-[var(--tinta)]">
            Lugares Especiales en Ica
          </h3>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-xs font-semibold">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <span>✓</span>
            <span>{visitados} visitados</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
            <span>📍</span>
            <span>{porConocer} por conocer</span>
          </span>
        </div>
      </div>

      {/* MAPA ILUSTRADO INTERACTIVO SVG */}
      <div className="relative w-full aspect-[16/10] bg-[#F7EFE5] rounded-2xl border-2 border-[#D5C2B0] overflow-hidden shadow-inner mb-6">
        {/* Fondo estilizado con dunas suaves y oasis */}
        <svg
          viewBox="0 0 100 62.5"
          className="w-full h-full select-none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="duna-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EED9C4" />
              <stop offset="100%" stopColor="#DFBF9F" />
            </linearGradient>
            <radialGradient id="oasis-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#81C784" />
              <stop offset="60%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#2E7D32" />
            </radialGradient>
          </defs>

          {/* Dunas del desierto de Ica */}
          <path
            d="M 0,25 Q 25,10 50,28 T 100,20 L 100,62.5 L 0,62.5 Z"
            fill="url(#duna-grad)"
            opacity="0.5"
          />
          <path
            d="M 0,38 Q 30,22 65,42 T 100,35 L 100,62.5 L 0,62.5 Z"
            fill="url(#duna-grad)"
            opacity="0.8"
          />

          {/* Oasis sutil de Huacachina en la esquina inferior izquierda */}
          <ellipse cx="28" cy="45" rx="10" ry="5.5" fill="#64B5F6" opacity="0.65" />
          <ellipse cx="28" cy="45" rx="8" ry="4" fill="#29B6F6" opacity="0.8" />
          {/* Palmeras del oasis */}
          <circle cx="20" cy="44" r="2" fill="#388E3C" opacity="0.7" />
          <circle cx="36" cy="46" r="2.2" fill="#2E7D32" opacity="0.7" />

          {/* Trazado de ruta conectando los puntos */}
          <path
            d="M 28,45 Q 40,32 50,28 T 68,18 T 80,48"
            stroke="var(--rosa)"
            strokeWidth="0.8"
            strokeDasharray="1.5,1.5"
            fill="none"
            opacity="0.7"
          />
        </svg>

        {/* PINES INTERACTIVOS POSICIONADOS EN EL MAPA */}
        {lugares.map((lugar) => {
          const esVisitado = lugar.estado === 'visitado';
          const esSeleccionado = lugarActivo?.id === lugar.id;

          return (
            <button
              key={lugar.id}
              type="button"
              onClick={() => setLugarActivo(lugar)}
              style={{ left: `${lugar.x}%`, top: `${lugar.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group p-1 rounded-full transition-transform duration-300 focus:outline-none ${
                esSeleccionado ? 'scale-125 z-30' : 'hover:scale-115 z-10'
              }`}
              title={lugar.nombre}
            >
              <div
                className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs shadow-md border-2 transition-colors ${
                  esVisitado
                    ? 'bg-emerald-600 border-white text-white'
                    : 'bg-[var(--rojo)] border-white text-white'
                }`}
              >
                {esVisitado ? '✓' : '📍'}
              </div>

              {/* Rótulo flotante de nombre */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {lugar.nombre}
              </span>
            </button>
          );
        })}
      </div>

      {/* DETALLE DEL LUGAR SELECCIONADO */}
      {lugarActivo ? (
        <div className="p-4 bg-[var(--crema)] rounded-xl border border-[var(--rosa-palido)] animate-fadeIn">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-serif-titulos font-bold text-base text-[var(--granate)] flex items-center gap-2">
              <span>{lugarActivo.estado === 'visitado' ? '🌿' : '✨'}</span>
              <span>{lugarActivo.nombre}</span>
            </h4>
            <span
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                lugarActivo.estado === 'visitado'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {lugarActivo.estado === 'visitado' ? 'Visitado' : 'Por conocer'}
            </span>
          </div>
          <p className="text-xs md:text-sm text-stone-700 leading-relaxed">
            {lugarActivo.nota}
          </p>
        </div>
      ) : (
        <p className="text-xs text-stone-500 text-center italic font-manuscrita text-lg">
          Toca cualquier punto del mapa para ver nuestra historia en ese lugar
        </p>
      )}
    </div>
  );
};
