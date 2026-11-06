import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface FraseItem {
  texto: string;
  esMentira: boolean;
}

export const DosVerdades: React.FC = () => {
  const [fase, setFase] = useState<'escribir' | 'adivinar' | 'resultado'>('escribir');
  const [autor, setAutor] = useState<'Él' | 'Ella'>('Él');
  const [frase1, setFrase1] = useState('');
  const [frase2, setFrase2] = useState('');
  const [frase3, setFrase3] = useState('');
  const [indiceMentira, setIndiceMentira] = useState<number | null>(null);

  const [frasesBarajadas, setFrasesBarajadas] = useState<FraseItem[]>([]);
  const [eleccionAdivinador, setEleccionAdivinador] = useState<number | null>(null);

  // Marcador de la sesión
  const [puntosEl, setPuntosEl] = useState(0);
  const [puntosElla, setPuntosElla] = useState(0);
  const [rondas, setRondas] = useState(0);

  const sugerenciasRapidas = [
    { v1: 'Sé bailar salsa bastante bien', v2: 'De niño le tenía miedo a la oscuridad', m: 'Nunca he roto un plato en casa' },
    { v1: 'Mi comida favorita es el lomo saltado', v2: 'Puedo pasar horas escuchando la misma canción', m: 'Sé hablar tres idiomas con fluidez' },
    { v1: 'La primera vez que te vi me puse muy nervioso', v2: 'Tengo guardada la envoltura de un dulce que me diste', m: 'Nunca me he quedado dormido en el cine' },
  ];

  const cargarPlantilla = (s: { v1: string; v2: string; m: string }) => {
    setFrase1(s.v1);
    setFrase2(s.v2);
    setFrase3(s.m);
    setIndiceMentira(2); // La tercera es la mentira
  };

  const prepararParaAdivinar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!frase1.trim() || !frase2.trim() || !frase3.trim()) {
      alert('Por favor escribe las tres frases.');
      return;
    }
    if (indiceMentira === null) {
      alert('Por favor selecciona cuál de las tres es la mentira antes de pasar el celular.');
      return;
    }

    const lista: FraseItem[] = [
      { texto: frase1.trim(), esMentira: indiceMentira === 0 },
      { texto: frase2.trim(), esMentira: indiceMentira === 1 },
      { texto: frase3.trim(), esMentira: indiceMentira === 2 },
    ].sort(() => Math.random() - 0.5);

    setFrasesBarajadas(lista);
    setEleccionAdivinador(null);
    setFase('adivinar');
  };

  const adivinar = (idx: number) => {
    setEleccionAdivinador(idx);
    setFase('resultado');

    const acerto = frasesBarajadas[idx].esMentira;
    const adivinador = autor === 'Él' ? 'Ella' : 'Él';

    if (acerto) {
      if (adivinador === 'Ella') setPuntosElla((p) => p + 1);
      else setPuntosEl((p) => p + 1);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#C0392B', '#E8A0A8', '#D4A017'],
        });
      } catch (e) {
        // Ignorar si confetti falla
      }
    }
    setRondas((r) => r + 1);
  };

  const siguienteRonda = () => {
    setAutor((prev) => (prev === 'Él' ? 'Ella' : 'Él'));
    setFrase1('');
    setFrase2('');
    setFrase3('');
    setIndiceMentira(null);
    setEleccionAdivinador(null);
    setFase('escribir');
  };

  const adivinadorActual = autor === 'Él' ? 'Ella' : 'Él';

  return (
    <div className="w-full max-w-lg mx-auto tarjeta-romantica p-6 md:p-8 border border-[var(--rosa)]">
      {/* Marcador de sesión */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--rosa-palido)]">
        <div>
          <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
            Dos Verdades y Una Mentira
          </span>
          <span className="text-xs text-[var(--granate)] font-medium">
            Ronda {rondas + 1}
          </span>
        </div>
        <div className="flex items-center gap-3 bg-[var(--crema)] px-4 py-1.5 rounded-full border border-[var(--rosa-palido)] text-xs font-semibold">
          <span className="text-[var(--granate)]">🧔 Él: {puntosEl}</span>
          <span className="text-stone-300">|</span>
          <span className="text-[var(--rojo)]">👑 Ella: {puntosElla}</span>
        </div>
      </div>

      {/* FASE 1: ESCRIBIR */}
      {fase === 'escribir' && (
        <form onSubmit={prepararParaAdivinar} className="space-y-4 animate-fadeIn">
          <div className="text-center mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--rosa-palido)] text-[var(--granate)] inline-block">
              Turno de escribir: {autor}
            </span>
            <p className="text-sm text-stone-600 mt-2">
              Escribe 2 verdades sobre ti y 1 mentira. Marca con el botón cuál es la mentira para que la otra persona la descubra.
            </p>
          </div>

          <div className="space-y-3">
            {[frase1, frase2, frase3].map((frase, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border transition-all ${
                  indiceMentira === i
                    ? 'border-[var(--rojo)] bg-rose-50/60'
                    : 'border-[var(--rosa-palido)] bg-[var(--papel)]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <span className="font-semibold text-[var(--granate)]">Frase {i + 1}:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-[var(--rojo)] select-none">
                    <input
                      type="radio"
                      name="mentira"
                      checked={indiceMentira === i}
                      onChange={() => setIndiceMentira(i)}
                      className="accent-[var(--rojo)]"
                    />
                    <span>Es la mentira</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder={`Escribe aquí la frase ${i + 1}...`}
                  value={i === 0 ? frase1 : i === 1 ? frase2 : frase3}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (i === 0) setFrase1(val);
                    else if (i === 1) setFrase2(val);
                    else setFrase3(val);
                  }}
                  className="w-full p-2.5 text-sm rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-[var(--granate)]"
                />
              </div>
            ))}
          </div>

          {/* Sugerencias rápidas */}
          <div className="pt-2">
            <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold mb-1.5">
              ¿Sin ideas? Carga un ejemplo rápido:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sugerenciasRapidas.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => cargarPlantilla(s)}
                  className="btn-romantico text-xs px-2.5 py-1 bg-[var(--crema)] border border-[var(--rosa-palido)] rounded-lg text-stone-700 hover:bg-[var(--rosa-palido)]"
                >
                  Ejemplo {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="btn-romantico px-6 py-2.5 bg-[var(--granate)] hover:bg-[var(--rojo)] text-[var(--papel)] rounded-full text-sm font-medium shadow flex items-center gap-2"
            >
              <span>¡Listo! Pasar el celular a {adivinadorActual}</span>
              <span>→</span>
            </button>
          </div>
        </form>
      )}

      {/* FASE 2: ADIVINAR */}
      {fase === 'adivinar' && (
        <div className="space-y-6 text-center animate-fadeIn py-2">
          <div className="p-4 bg-[var(--crema)] rounded-2xl border border-[var(--rosa-palido)]">
            <span className="text-3xl block mb-2">🕵️‍♀️</span>
            <h4 className="font-serif-titulos text-lg font-bold text-[var(--granate)]">
              ¡Turno de {adivinadorActual}!
            </h4>
            <p className="text-sm text-stone-600 mt-1">
              Lee las tres frases con atención. ¿Cuál de ellas crees que es la mentira inventada por {autor}?
            </p>
          </div>

          <div className="space-y-3 text-left">
            {frasesBarajadas.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => adivinar(idx)}
                className="w-full p-4 rounded-xl border border-[var(--rosa-palido)] bg-[var(--papel)] hover:bg-[var(--crema)] hover:border-[var(--rosa)] transition-all text-sm md:text-base font-serif-titulos text-[var(--tinta)] shadow-sm min-h-[50px] flex items-center gap-3"
              >
                <span className="w-7 h-7 rounded-full bg-[var(--rosa-palido)] text-[var(--granate)] font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>«{item.texto}»</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FASE 3: RESULTADO */}
      {fase === 'resultado' && eleccionAdivinador !== null && (
        <div className="space-y-6 text-center animate-fadeIn py-2">
          {frasesBarajadas[eleccionAdivinador].esMentira ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-4xl block mb-2">🎉</span>
              <h4 className="text-xl font-bold font-serif-titulos text-emerald-900">
                ¡Acertaste! Descubriste la mentira
              </h4>
              <p className="text-sm text-emerald-800 mt-2 font-medium">
                Punto para {adivinadorActual}. ¡Se conocen muy bien!
              </p>
            </div>
          ) : (
            <div className="p-6 bg-rose-50 rounded-2xl border border-rose-200">
              <span className="text-4xl block mb-2">🙈</span>
              <h4 className="text-xl font-bold font-serif-titulos text-rose-900">
                ¡Caíste en la trampa!
              </h4>
              <p className="text-sm text-rose-800 mt-2">
                Esa frase era en realidad una verdad. La mentira era otra.
              </p>
            </div>
          )}

          {/* Revelación de todas las frases */}
          <div className="space-y-2 text-left">
            {frasesBarajadas.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-sm ${
                  item.esMentira
                    ? 'bg-rose-100/70 border-rose-300 text-rose-950 font-semibold'
                    : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                }`}
              >
                <span>«{item.texto}»</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold ml-2 shrink-0">
                  {item.esMentira ? '❌ Mentira' : '✅ Verdad'}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={siguienteRonda}
              className="btn-romantico px-6 py-2.5 bg-[var(--granate)] hover:bg-[var(--rojo)] text-[var(--papel)] rounded-full text-sm font-medium shadow flex items-center gap-2"
            >
              <span>Siguiente ronda (Turno de {adivinadorActual})</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
