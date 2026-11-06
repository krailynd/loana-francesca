# Para Ti 🌹 — Experiencia Romántica Digital

Un detalle web íntimo, interactivo y hecho con cariño para sorprender a tu pareja en el celular o en la computadora. Construido con **Astro 7**, **React 19**, **Tailwind CSS v4** y tipografías editoriales románticas.

Incluye una carta interactiva con sello de cera, juegos para citas (ruleta de planes, preguntas, quiz, dos verdades), 12 razones interactivas, talonario de vales de amor con sello de canje, sobres «Abre esto cuando…», cápsulas del tiempo, mapa interactivo y **6 tarjetas con códigos QR offline decorados con una luna creciente dorada**, listos para imprimir en hoja A4 y regalar en mano con una flor o un chocolate.

---

## 📖 Cómo personalizar este detalle (En 5 minutos)

**Todo el contenido de la experiencia vive en un solo archivo:**
👉 `src/data/datos.ts`

No necesitas saber programar ni tocar código complejo. Simplemente abre ese archivo y edita los textos que están entre comillas:

1. **Nombres de la pareja:**
   ```typescript
   export const pareja = {
     de: "Tu Nombre",
     para: "El Nombre de Ella",
     apodoPara: "Mi Amor",
     fechaInicio: "2024-02-14", // Año-Mes-Día (para el contador de días juntos)
     ciudad: "Ica, Perú",
     diaCita: { diaSemana: 5, hora: "19:00" }, // 5 = Viernes (cuenta regresiva para su cita)
     firma: "— Con amor, Tu Nombre",
   };
   ```

2. **La carta principal:**
   Escribe los párrafos de tu carta en la sección `cartaPrincipal`.

3. **Tus propias fotos (Opcional):**
   - Coloca tus fotos en la carpeta `public/fotos/` (por ejemplo: `foto1.jpg`).
   - Agrégalas en la lista `fotos` de `src/data/datos.ts`.
   - *Nota:* Si aún no tienes fotos subidas, la página mostrará un mensaje elegante sin romper el diseño.

4. **Sobres y Vales:**
   Puedes personalizar los mensajes de los sobres («Abre esto cuando estés triste...») o los vales («Vale por un masaje de 20 minutos...»).

---

## 🖨️ Tarjetas QR para regalar en físico

La página `/tarjetas-qr` contiene **6 tarjetas con códigos QR listos para imprimir en una sola hoja A4**.
- Cada código QR está decorado con un emblema de **luna creciente dorada** en el centro.
- **Son 100% offline:** Tu pareja puede escanearlos con la cámara de su teléfono y leer el mensaje de texto al instante, ¡incluso sin conexión a internet ni datos móviles!
- Presiona `Ctrl + P` (o el botón «Imprimir» en la página) para obtener la hoja formateada con líneas punteadas para recortar.

---

## 🚀 Cómo probarlo en tu computadora

1. Abre la terminal en esta carpeta.
2. Instala las dependencias (si aún no lo has hecho):
   ```bash
   npm install
   ```
3. Inicia el servidor de prueba:
   ```bash
   npm run dev
   ```
4. Abre en tu navegador la dirección que aparece en pantalla:
   👉 `http://localhost:4321`

---

## ☁️ Cómo subirlo a Vercel (Gratis y en 2 pasos)

Puedes tener tu página web funcionando en internet con su propio enlace para enviárselo a tu pareja:

### Opción 1: Con GitHub (Recomendada)
1. Sube este proyecto a tu cuenta de GitHub (el proyecto ya viene configurado).
2. Entra en [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **«Add New…» → «Project»**.
4. Selecciona tu repositorio.
5. Vercel detectará automáticamente que es un proyecto **Astro**. Haz clic en **«Deploy»**.
6. ¡Listo! En menos de 1 minuto tendrás un enlace público como `https://para-ti-tu-pareja.vercel.app`.

### Opción 2: Con Vercel CLI (Desde la terminal)
Si tienes instalado Vercel en tu computadora:
```bash
npx vercel
```
Sigue las 3 preguntas en pantalla y tu sitio estará en vivo de inmediato.

---

## 🎨 Paleta de colores romántica

- **Rojo Pasión:** `#C0392B`
- **Granate:** `#7B1E26`
- **Vino Intenso:** `#5C1620`
- **Rosa Pétalo:** `#E8A0A8`
- **Crema Cálido:** `#FDF6EC`
- **Papel Antiguo:** `#FFFDF8`
- **Dorado Clásico:** `#D4A017`
- **Tinta Sepia:** `#3B2F2F`

---

## 🔒 Privacidad y seguridad

- **Cero rastreadores:** No contiene Google Analytics, cookies invasivas ni publicidad.
- **Datos locales:** Todo el progreso de juegos, vales canjeados y sobres leídos se almacena únicamente en el celular de tu pareja mediante `localStorage`.
- **Modo seguro:** Puedes activar una contraseña o fecha especial en `accesoConFecha` dentro de `src/data/datos.ts` si deseas que nadie más pueda abrir la web sin saber el día de su aniversario.
