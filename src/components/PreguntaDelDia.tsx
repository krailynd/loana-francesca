import React, { useState, useEffect } from 'react';
import { bancoPreguntas, type PreguntaMotor } from '../data/bancos.ts';
import { RosaSVG } from './RosaSVG.tsx';

export const PreguntaDelDia: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('todas');
  const [preguntasFiltradas, setPreguntasFiltradas] = useState<PreguntaMotor[]>(bancoPreguntas);
  const [bolsaPendiente, setBolsaPendiente] = useState<number[]>([]);
  const [preguntaActual, setPreguntaActual] = useState<PreguntaMotor | null>(null);
  const [contadorPreguntasVistas, setContadorPreguntasVistas] = useState<number>(1);
  const [turno, setTurno] = useState<'ella' | 'el'>('ella');
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState<boolean>(false);
  const [animando, setAnimando] = useState<boolean>(false);

  // Cargar favoritos de localStorage
  useEffect(() => {
    try {
      const guardados = localStorage.getItem('para-ti-preguntas-favoritas');
      if (guardados) {
        setFavoritos(JSON.parse(guardados));
      }
    } catch (e) {
      console.warn('No se pudo acceder a localStorage para favoritos', e);
    }
  }, []);

  // Actualizar lista filtrada según categoría
  useEffect(() => {
    let lista = bancoPreguntas;
    if (categoriaSeleccionada !== 'todas') {
      lista = bancoPreguntas.filter((p) => p.categoria === categoriaSeleccionada);
    }
    setPreguntasFiltradas(lista);

    // Reiniciar la bolsa barajada con los IDs de la categoría
    const indicesBarajados = [...lista.map((p) => p.id)].sort(() => Math.random() - 0.5);
    setBolsaPendiente(indicesBarajados);

    if (indicesBarajados.length > 0) {
      const primerId = indicesBarajados[0];
      const primeraPregunta = lista.find((p) => p.id === primerId) || lista[0];
      setPreguntaActual(primeraPregunta);
      setContadorPreguntasVistas(1);
    }
  }, [categoriaSeleccionada]);

  // Avanzar a la siguiente pregunta sin repetir hasta agotar el mazo
  const siguientePregunta = () => {
    if (preguntasFiltradas.length === 0) return;

    setAnimando(true);
    setTimeout(() => {
      // Alternar turnos
      setTurno((prev) => (prev === 'ella' ? 'el' : 'ella'));

      let nuevaBolsa = bolsaPendiente.slice(1);
      let nuevoContador = contadorPreguntasVistas + 1;

      // Si se agotó la bolsa de esta categoría, rebarajar todo el mazo
      if (nuevaBolsa.length === 0) {
        nuevaBolsa = [...preguntasFiltradas.map((p) => p.id)].sort(() => Math.random() - 0.5);
        nuevoContador = 1;
      }

      setBolsaPendiente(nuevaBolsa);
      setContadorPreguntasVistas(nuevoContador);

      const siguienteId = nuevaBolsa[0];
      const sig = preguntasFiltradas.find((p) => p.id === siguienteId) || preguntasFiltradas[0];
      setPreguntaActual(sig);
      setAnimando(false);
    }, 200);
  };

  const toggleFavorito = (id: number) => {
    let nuevos: number[];
    if (favoritos.includes(id)) {
      nuevos = favoritos.filter((f) => f !== id);
    } else {
      nuevos = [...favoritos, id];
    }
    setFavoritos(nuevos);
    try {
      localStorage.setItem('para-ti-preguntas-favoritas', JSON.stringify(nuevos));
    } catch (e) {
      console.warn('Error guardando en localStorage', e);
    }
  };

  const categorias = [
    { id: 'todas', etiqueta: 'Todas' },
    { id: 'recuerdo', etiqueta: 'Recuerdos' },
    { id: 'profunda', etiqueta: 'Profundas' },
    { id: 'futuro', etiqueta: 'Futuro' },
    { id: 'divertida', etiqueta: 'Divertidas' },
    { id: 'coqueta', etiqueta: 'Coquetas' },
  ];

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      {/* Selector de categorías */}
      <div className="w-full flex items-center justify-start gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none px-1">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaSeleccionada(cat.id)}
            className={`btn-romantico px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              categoriaSeleccionada === cat.id
                ? 'bg-[var(--granate)] text-[var(--papel)] shadow-sm'
                : 'bg-[var(--papel)] text-[var(--tinta)] border border-[var(--rosa-palido)] hover:bg-[var(--rosa-palido)]'
            }`}
          >
            {cat.etiqueta}
          </button>
        ))}
      </div>

      {/* Indicador de turnos y favoritos */}
      <div className="w-full flex justify-between items-center px-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Turno:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
              turno === 'ella'
                ? 'bg-[var(--rosa-palido)] text-[var(--granate)] border border-[var(--rosa)]'
                : 'bg-stone-200 text-stone-800 border border-stone-300'
            }`}
          >
            <span>{turno === 'ella' ? '👑' : '🧔'}</span>
            <span>{turno === 'ella' ? 'Ahora responde ella' : 'Ahora respondes tú'}</span>
          </span>
        </div>

        <button
          onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
          className="btn-romantico text-xs text-[var(--granate)] hover:underline flex items-center gap-1"
        >
          <span>❤️</span>
          <span>Favoritos ({favoritos.length})</span>
        </button>
      </div>

      {/* MODAL O VISTA DE FAVORITOS */}
      {mostrarFavoritos ? (
        <div className="w-full tarjeta-romantica p-6 border border-[var(--rosa)] mb-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--rosa-palido)]">
            <h3 className="font-serif-titulos text-lg font-bold text-[var(--granate)]">
              Tus Preguntas Guardadas
            </h3>
            <button
              onClick={() => setMostrarFavoritos(false)}
              className="text-xs px-2.5 py-1 rounded-full bg-[var(--rosa-palido)] text-[var(--granate)] font-medium"
            >
              Cerrar ✕
            </button>
          </div>

          {favoritos.length === 0 ? (
            <p className="text-sm text-stone-500 text-center py-6 font-manuscrita text-xl">
              Aún no has marcado preguntas favoritas. Toca el corazón en cualquier pregunta para guardarla aquí.
            </p>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {favoritos.map((favId) => {
                const preg = bancoPreguntas.find((p) => p.id === favId);
                if (!preg) return null;
                return (
                  <div
                    key={favId}
                    className="p-3 bg-[var(--crema)] rounded-xl border border-[var(--rosa-palido)] flex justify-between items-center gap-2"
                  >
                    <p className="text-sm text-[var(--tinta)] font-serif-titulos leading-snug">
                      «{preg.texto}»
                    </p>
                    <button
                      onClick={() => toggleFavorito(favId)}
                      className="text-sm p-1 text-[var(--rojo)] hover:scale-110"
                      title="Quitar de favoritos"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* TARJETA PRINCIPAL DE PREGUNTA */
        <div
          className={`tarjeta-romantica w-full p-8 md:p-10 border border-[var(--rosa)] relative flex flex-col justify-between min-h-[260px] text-center transition-all duration-300 ${
            animando ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Contador y categoría */}
          <div className="flex justify-between items-center text-xs text-stone-500 mb-4">
            <span className="uppercase tracking-widest font-semibold text-[var(--granate)]">
              {preguntaActual?.categoria}
            </span>
            <span className="bg-[var(--crema)] px-2.5 py-1 rounded-full border border-[var(--rosa-palido)] font-medium">
              Pregunta {contadorPreguntasVistas} de {preguntasFiltradas.length}
            </span>
          </div>

          {/* Texto de la pregunta */}
          <div className="my-auto py-4">
            <RosaSVG variante="petalo" color="rosa" size={24} className="mx-auto mb-3 opacity-60" />
            <h3 className="text-xl md:text-2xl font-serif-titulos text-[var(--tinta)] leading-relaxed font-bold px-2">
              «{preguntaActual?.texto}»
            </h3>
          </div>

          {/* Pie de tarjeta con acciones */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--rosa-palido)]">
            <button
              type="button"
              onClick={() => preguntaActual && toggleFavorito(preguntaActual.id)}
              className="btn-romantico p-2 rounded-full hover:bg-[var(--rosa-palido)] transition-transform text-lg"
              aria-label="Marcar como favorita"
            >
              {preguntaActual && favoritos.includes(preguntaActual.id) ? '❤️' : '🤍'}
            </button>

            <button
              type="button"
              onClick={siguientePregunta}
              className="btn-romantico px-6 py-2.5 bg-[var(--rojo)] hover:bg-[var(--granate)] text-[var(--papel)] rounded-full font-medium text-sm shadow-md flex items-center gap-2"
            >
              <span>Nueva pregunta</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
