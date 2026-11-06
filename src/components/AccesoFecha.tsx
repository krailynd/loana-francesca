import React, { useState, useEffect } from 'react';
import { accesoConFecha } from '../data/datos.ts';
import { RosaSVG } from './RosaSVG.tsx';

export const AccesoFecha: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [desbloqueado, setDesbloqueado] = useState(!accesoConFecha.activado);
  const [inputFecha, setInputFecha] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!accesoConFecha.activado) {
      setDesbloqueado(true);
      return;
    }

    try {
      const guardado = localStorage.getItem('para-ti-desbloqueado');
      if (guardado === 'true') {
        setDesbloqueado(true);
      }
    } catch {
      // Ignorar si localStorage falla
    }
  }, []);

  const validarFecha = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputFecha.trim() === accesoConFecha.fechaCorrecta.trim()) {
      setDesbloqueado(true);
      setError(false);
      try {
        localStorage.setItem('para-ti-desbloqueado', 'true');
      } catch {
        // Ignorar
      }
    } else {
      setError(true);
    }
  };

  if (desbloqueado) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#FDF6EC] flex items-center justify-center p-4">
      <div className="tarjeta-romantica bg-white p-8 max-w-sm w-full border border-[var(--rosa)] text-center shadow-xl">
        <div className="w-16 h-16 rounded-full bg-[var(--rosa-palido)] mx-auto mb-4 flex items-center justify-center">
          <RosaSVG variante="boton" color="rojo" size={32} />
        </div>

        <h3 className="font-serif-titulos text-xl font-bold text-[var(--granate)] mb-2">
          Un rincón privado
        </h3>
        <p className="text-xs text-stone-600 mb-6 leading-relaxed">
          Para entrar, ingresa la fecha especial que marca el comienzo de nuestra historia.
        </p>

        {accesoConFecha.pista && (
          <div className="p-3 bg-[var(--crema)] rounded-xl border border-[var(--rosa-palido)] text-xs text-stone-700 mb-4 italic">
            💡 Pista: {accesoConFecha.pista}
          </div>
        )}

        <form onSubmit={validarFecha} className="space-y-4">
          <div>
            <input
              type="date"
              value={inputFecha}
              onChange={(e) => {
                setInputFecha(e.target.value);
                setError(false);
              }}
              className="w-full p-2.5 text-center text-sm rounded-xl border border-stone-300 bg-[var(--papel)] text-[var(--tinta)] focus:outline-none focus:border-[var(--rojo)]"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-rose-600 font-medium">
              Esa fecha no coincide. Vuelve a intentarlo con cariño.
            </p>
          )}

          <button
            type="submit"
            className="btn-romantico w-full py-2.5 bg-[var(--rojo)] hover:bg-[var(--granate)] text-[var(--papel)] rounded-full text-sm font-semibold shadow-md"
          >
            Abrir nuestro espacio
          </button>
        </form>
      </div>
    </div>
  );
};
