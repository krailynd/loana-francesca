import React, { useState } from 'react';
import { cartaPrincipal, pareja } from '../data/datos.ts';
import { RosaSVG } from './RosaSVG.tsx';

export const CartaSobre: React.FC = () => {
  const [abierto, setAbierto] = useState(false);

  const toggleSobre = () => {
    setAbierto(!abierto);
  };

  const imprimirCarta = () => {
    window.print();
  };

  const parrafosFiltrados = cartaPrincipal.parrafos.filter(
    (p) => p && !p.startsWith('POR_COMPLETAR')
  );

  const tieneContenidoPersonal = parrafosFiltrados.length > 0;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* SECCIÓN SOBRE INTERACTIVO 3D */}
      <div className="w-full relative flex flex-col items-center select-none py-6">
        {!abierto ? (
          /* SOBRE FÍSICO CERRADO */
          <div
            onClick={toggleSobre}
            className="group cursor-pointer relative w-full max-w-md aspect-[16/11] bg-[#F3E5D8] rounded-2xl shadow-xl border border-[#D5C2B0] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between p-6"
            style={{
              backgroundImage: 'radial-gradient(#E8D5C4 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
            role="button"
            tabIndex={0}
            aria-label="Toca para abrir la carta"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleSobre();
            }}
          >
            {/* Solapa triangular superior simulada */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2 bg-[#EAD8C7] border-b border-[#D5C2B0] shadow-sm transition-transform duration-500 origin-top"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Pliegues laterales del sobre */}
            <div
              className="absolute bottom-0 left-0 w-1/2 h-full bg-[#E5D2C0] opacity-30 pointer-events-none"
              style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-1/2 h-full bg-[#E5D2C0] opacity-30 pointer-events-none"
              style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
            />

            {/* Rótulo superior */}
            <div className="relative z-10 text-center mt-2">
              <span className="text-xs uppercase tracking-widest text-[#7B1E26] font-semibold">
                Correspondencia Especial
              </span>
            </div>

            {/* Sello de lacre con RosaSVG en el centro */}
            <div className="relative z-20 flex flex-col items-center my-auto">
              <div className="w-16 h-16 rounded-full bg-[#7B1E26] border-2 border-[#D4A017] shadow-lg flex items-center justify-center p-2 transform group-hover:scale-110 group-active:scale-95 transition-transform duration-300">
                <RosaSVG variante="abierta" color="dorado" size={34} />
              </div>
              <span className="mt-3 text-xs text-[#5C1620] font-manuscrita text-lg font-bold">
                Toca el sello para abrir
              </span>
            </div>

            {/* Destinatario */}
            <div className="relative z-10 text-right pr-2">
              <p className="font-manuscrita text-xl text-[#3B2F2F]">
                Para ti {pareja.apodoPara && pareja.apodoPara !== 'POR_COMPLETAR' ? `(${pareja.apodoPara})` : ''} ❤
              </p>
            </div>
          </div>
        ) : (
          /* CARTA DESPLEGADA (Estilo papel cálido con tipografía editorial) */
          <div className="w-full animate-fadeIn">
            <div className="flex justify-between items-center mb-4 no-print px-2">
              <button
                type="button"
                onClick={toggleSobre}
                className="btn-romantico px-4 py-1.5 text-xs font-medium text-[var(--granate)] bg-[var(--rosa-palido)] border border-[var(--rosa)] rounded-full hover:bg-[var(--rosa)]"
              >
                ← Guardar en el sobre
              </button>
              <button
                type="button"
                onClick={imprimirCarta}
                className="btn-romantico px-4 py-1.5 text-xs font-medium text-[var(--papel)] bg-[var(--granate)] rounded-full shadow hover:bg-[var(--rojo)] flex items-center gap-1.5"
              >
                <span>🖨️</span>
                <span>Imprimir esta carta</span>
              </button>
            </div>

            <article
              id="carta-imprimible"
              className="tarjeta-romantica textura-papel p-8 md:p-12 border border-[var(--rosa)] relative overflow-hidden"
              style={{
                boxShadow: '0 8px 30px rgba(123, 30, 38, 0.12)',
              }}
            >
              {/* Marca de agua sutil de RosaSVG en la esquina */}
              <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
                <RosaSVG variante="abierta" color="granate" size={180} />
              </div>

              {/* Encabezado */}
              <div className="flex items-center justify-between border-b border-[var(--rosa-palido)] pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <RosaSVG variante="abierta" color="rojo" size={32} />
                  <span className="text-xs uppercase tracking-widest text-[var(--granate)] font-semibold">
                    Carta desde el corazón
                  </span>
                </div>
                <span className="text-xs text-stone-500 font-sans">
                  {pareja.ciudad || 'Ica, Perú'}
                </span>
              </div>

              {/* Saludo */}
              <h2 className="text-2xl md:text-3xl font-serif-titulos text-[var(--granate)] mb-6 font-bold">
                {cartaPrincipal.saludo}
              </h2>

              {/* Contenido de párrafos */}
              <div className="space-y-4 text-base md:text-lg leading-relaxed text-[var(--tinta)]">
                {tieneContenidoPersonal ? (
                  parrafosFiltrados.map((parrafo, idx) => (
                    <p key={idx} className="indent-4 text-justify">
                      {parrafo}
                    </p>
                  ))
                ) : (
                  <>
                    <p className="indent-4 text-justify">
                      Hay palabras que a veces el día a día no nos deja decir con calma. Por eso quise construir este rincón para ti, como un refugio donde puedas volver cada vez que quieras recordar cuánto significas para mí.
                    </p>
                    <p className="indent-4 text-justify">
                      Cada conversación que hemos tenido, cada caminata por la Plaza de Armas y cada una de tus risas son pequeños tesoros que guardo con todo el cariño del mundo. Tu compañía hace que cualquier tarde simple se sienta como el mejor de los planes.
                    </p>
                    <p className="indent-4 text-justify">
                      Valoro tu paciencia, tu ternura y la luz bonita con la que miras las cosas, incluso cuando la semana se pone difícil. Eres un apoyo constante y un motivo sincero de alegría en mi vida.
                    </p>
                    <p className="indent-4 text-justify">
                      No importa cuántas cosas pasen alrededor: hoy y siempre elijo caminar a tu lado, celebrar tus triunfos y estar ahí para ti en cada paso del camino.
                    </p>
                  </>
                )}
              </div>

              {/* Cierre y firma manuscrita */}
              <div className="mt-8 pt-6 border-t border-[var(--rosa-palido)] flex flex-col items-end">
                <p className="text-base text-[var(--granate)] font-medium mb-1">
                  {cartaPrincipal.cierre}
                </p>
                <p className="font-manuscrita text-3xl md:text-4xl text-[var(--rojo)] mt-1">
                  {pareja.firma && pareja.firma !== 'POR_COMPLETAR'
                    ? pareja.firma
                    : pareja.de && pareja.de !== 'POR_COMPLETAR'
                    ? `— ${pareja.de}`
                    : '— Con todo mi amor'}
                </p>
              </div>

              {/* Detalle inferior */}
              <div className="mt-6 flex justify-center">
                <RosaSVG variante="boton" color="dorado" size={20} />
              </div>
            </article>
          </div>
        )}
      </div>
    </div>
  );
};
