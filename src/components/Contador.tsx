import React, { useState, useEffect } from 'react';
import { pareja } from '../data/datos.ts';

export interface ContadorProps {
  variante?: 'mini' | 'completo';
  className?: string;
}

export function calcularProximaCita(ahora: Date, diaSemana: number, horaStr: string): Date {
  const [horaT, minT] = horaStr.split(':').map((n) => parseInt(n, 10) || 0);
  const objetivo = new Date(ahora.getTime());
  objetivo.setHours(horaT, minT, 0, 0);

  let diferenciaDias = (diaSemana - ahora.getDay() + 7) % 7;

  if (diferenciaDias === 0) {
    // Si hoy es el mismo día de la semana, verificar si ya pasó la hora
    if (ahora.getTime() >= objetivo.getTime()) {
      diferenciaDias = 7;
    }
  }

  objetivo.setDate(objetivo.getDate() + diferenciaDias);
  return objetivo;
}

export const Contador: React.FC<ContadorProps> = ({ variante = 'completo', className = '' }) => {
  const [diasJuntos, setDiasJuntos] = useState<number | null>(null);
  const [mesesJuntos, setMesesJuntos] = useState<number | null>(null);
  const [cuentaRegresiva, setCuentaRegresiva] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
    textoCorta: '',
  });

  const fechaValida =
    pareja.fechaInicio &&
    pareja.fechaInicio !== 'POR_COMPLETAR' &&
    !isNaN(new Date(pareja.fechaInicio).getTime());

  useEffect(() => {
    const actualizar = () => {
      const ahora = new Date();

      // 1. Cálculo de días juntos (solo si hay fecha válida)
      if (fechaValida) {
        const inicio = new Date(pareja.fechaInicio);
        const diffMs = ahora.getTime() - inicio.getTime();
        if (diffMs > 0) {
          const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          const meses = Math.floor(dias / 30.4375);
          setDiasJuntos(dias);
          setMesesJuntos(meses);
        }
      }

      // 2. Cálculo de la próxima cita semanal (por defecto viernes 19:00)
      const diaSemana = pareja.diaCita?.diaSemana ?? 5;
      const hora = pareja.diaCita?.hora ?? '19:00';
      const proxima = calcularProximaCita(ahora, diaSemana, hora);

      const diffCita = proxima.getTime() - ahora.getTime();
      const dias = Math.floor(diffCita / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diffCita % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diffCita % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diffCita % (1000 * 60)) / 1000);

      let texto = '';
      if (dias > 0) {
        texto = `${dias} d, ${horas} h y ${minutos} min`;
      } else if (horas > 0) {
        texto = `${horas} h, ${minutos} min y ${segundos} s`;
      } else {
        texto = `${minutos} min y ${segundos} s`;
      }

      setCuentaRegresiva({ dias, horas, minutos, segundos, textoCorta: texto });
    };

    actualizar();
    const interval = setInterval(actualizar, 1000);
    return () => clearInterval(interval);
  }, [fechaValida]);

  // VARIANTE MINI (Ideal para cabeceras o píldoras discretas)
  if (variante === 'mini') {
    return (
      <div className={`inline-flex flex-col sm:flex-row items-center gap-2 text-xs md:text-sm font-medium ${className}`}>
        {diasJuntos !== null && (
          <span className="px-3 py-1.5 rounded-full bg-[var(--rosa-palido)] text-[var(--granate)] border border-[var(--rosa)] flex items-center gap-1.5 shadow-sm">
            <span>🌹</span>
            <span><strong>{diasJuntos}</strong> días juntos</span>
          </span>
        )}
        <span className="px-3 py-1.5 rounded-full bg-[var(--papel)] text-[var(--tinta)] border border-[var(--dorado)] flex items-center gap-1.5 shadow-sm">
          <span>⏳</span>
          <span>Próxima cita en <strong>{cuentaRegresiva.textoCorta || 'un momento'}</strong></span>
        </span>
      </div>
    );
  }

  // VARIANTE COMPLETA
  return (
    <div className={`tarjeta-romantica p-6 max-w-md mx-auto text-center border border-[var(--rosa)] ${className}`}>
      {/* Sección Días Juntos (se oculta si POR_COMPLETAR) */}
      {diasJuntos !== null && (
        <div className="mb-6 pb-6 border-b border-[var(--rosa-palido)]">
          <p className="text-xs uppercase tracking-widest text-[var(--granate)] font-semibold mb-1">
            Nuestra Historia
          </p>
          <div className="text-4xl md:text-5xl font-bold font-serif-titulos text-[var(--rojo)] my-1">
            {diasJuntos} <span className="text-xl md:text-2xl font-normal font-sans text-[var(--tinta)]">días</span>
          </div>
          {mesesJuntos !== null && mesesJuntos > 0 && (
            <p className="text-xs text-stone-500 font-manuscrita text-base">
              Aproximadamente {mesesJuntos} meses de momentos inolvidables
            </p>
          )}
        </div>
      )}

      {/* Sección Cuenta Regresiva de Cita */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[var(--granate)] font-semibold mb-1 flex items-center justify-center gap-1.5">
          <span>Próximo Encuentro</span>
          <span className="text-xs font-normal text-stone-500">
            ({pareja.lugarCitaHabitual || 'Plaza de Armas'})
          </span>
        </p>
        <p className="text-xs text-stone-500 mb-4">
          Cuenta regresiva para nuestro viernes a las {pareja.diaCita?.hora || '19:00'} hrs:
        </p>

        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
          <div className="bg-[var(--crema)] p-2.5 rounded-xl border border-[var(--rosa-palido)]">
            <span className="block text-2xl font-bold text-[var(--granate)] font-serif-titulos">
              {cuentaRegresiva.dias}
            </span>
            <span className="text-[10px] uppercase text-stone-500 tracking-wider">Días</span>
          </div>
          <div className="bg-[var(--crema)] p-2.5 rounded-xl border border-[var(--rosa-palido)]">
            <span className="block text-2xl font-bold text-[var(--granate)] font-serif-titulos">
              {cuentaRegresiva.horas}
            </span>
            <span className="text-[10px] uppercase text-stone-500 tracking-wider">Horas</span>
          </div>
          <div className="bg-[var(--crema)] p-2.5 rounded-xl border border-[var(--rosa-palido)]">
            <span className="block text-2xl font-bold text-[var(--granate)] font-serif-titulos">
              {cuentaRegresiva.minutos}
            </span>
            <span className="text-[10px] uppercase text-stone-500 tracking-wider">Min</span>
          </div>
          <div className="bg-[var(--crema)] p-2.5 rounded-xl border border-[var(--rosa-palido)]">
            <span className="block text-2xl font-bold text-[var(--rojo)] font-serif-titulos">
              {cuentaRegresiva.segundos}
            </span>
            <span className="text-[10px] uppercase text-stone-500 tracking-wider">Seg</span>
          </div>
        </div>

        <p className="text-xs text-stone-500 mt-4 italic font-manuscrita text-lg text-[var(--granate)]">
          «El tiempo que pasamos juntos vale más que cualquier lugar»
        </p>
      </div>
    </div>
  );
};
