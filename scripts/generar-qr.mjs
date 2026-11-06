/**
 * GENERADOR DE CÓDIGOS QR ROMÁNTICOS PERSONALIZADOS CON LUNA Y ROSAS — «Para Ti»
 * 
 * Genera códigos QR con nivel de corrección alto ('H' ~30% de redundancia)
 * e incrusta una elegante luna creciente dorada y detalles en el centro,
 * manteniendo una legibilidad perfecta e instantánea desde cámaras de celular.
 */

import fs from 'node:fs';
import path from 'node:path';
import QRCode from 'qrcode';
import { mensajesQR, pareja, urlPublica } from '../src/data/datos.ts';

const DIRECTORIO_SALIDA = path.resolve('public/qr');

/**
 * Inserta un emblema central con una luna creciente y estrella/rosa dorada en el SVG del QR.
 * Gracias al nivel de redundancia 'H', la cámara recupera el 100% de la información
 * mientras que el diseño visual resulta único, romántico y artesanal.
 */
function incrustarLunaEnSvg(svgRaw) {
  // Obtenemos viewBox
  const matchViewBox = svgRaw.match(/viewBox="([^"]+)"/);
  if (!matchViewBox) return svgRaw;

  const viewBox = matchViewBox[1].split(' ').map(Number);
  const ancho = viewBox[2];
  const alto = viewBox[3];
  const centroX = ancho / 2;
  const centroY = alto / 2;

  // Radio del emblema central (~20% del ancho del QR para estar dentro del margen seguro de redundancia H)
  const radioEmblema = ancho * 0.11;

  // Emblema SVG: Círculo de fondo cremoso con borde dorado y luna creciente
  const emblema = `
  <g class="emblema-luna-romantica">
    <!-- Círculo contenedor con sombra sutil -->
    <circle cx="${centroX}" cy="${centroY}" r="${radioEmblema}" fill="#FFFDF8" stroke="#D4A017" stroke-width="${ancho * 0.012}" />
    <!-- Círculo interior vino -->
    <circle cx="${centroX}" cy="${centroY}" r="${radioEmblema * 0.85}" fill="#5C1620" />
    
    <!-- Luna Creciente Dorada -->
    <path 
      d="M ${centroX + radioEmblema * 0.15} ${centroY - radioEmblema * 0.55} 
         A ${radioEmblema * 0.55} ${radioEmblema * 0.55} 0 1 0 ${centroX + radioEmblema * 0.15} ${centroY + radioEmblema * 0.55} 
         A ${radioEmblema * 0.45} ${radioEmblema * 0.45} 0 0 1 ${centroX + radioEmblema * 0.15} ${centroY - radioEmblema * 0.55} Z" 
      fill="#D4A017" 
    />

    <!-- Pequeño destello o estrella amorosa junto a la luna -->
    <path
      d="M ${centroX + radioEmblema * 0.35} ${centroY - radioEmblema * 0.15} 
         Q ${centroX + radioEmblema * 0.35} ${centroY} ${centroX + radioEmblema * 0.5} ${centroY} 
         Q ${centroX + radioEmblema * 0.35} ${centroY} ${centroX + radioEmblema * 0.35} ${centroY + radioEmblema * 0.15} 
         Q ${centroX + radioEmblema * 0.35} ${centroY} ${centroX + radioEmblema * 0.2} ${centroY} 
         Q ${centroX + radioEmblema * 0.35} ${centroY} ${centroX + radioEmblema * 0.35} ${centroY - radioEmblema * 0.15} Z"
      fill="#FDF6EC"
    />
  </g>
</svg>`;

  return svgRaw.replace('</svg>', emblema);
}

async function main() {
  console.log('🌙 Iniciando generación de códigos QR románticos personalizados con Luna...');

  if (!fs.existsSync(DIRECTORIO_SALIDA)) {
    fs.mkdirSync(DIRECTORIO_SALIDA, { recursive: true });
  }

  const firmaValida = pareja.firma && pareja.firma !== 'POR_COMPLETAR' ? `\n\n${pareja.firma}` : '';
  let generados = 0;

  for (const item of mensajesQR) {
    const textoCompleto = `${item.texto}${firmaValida}`;
    const rutaSvg = path.join(DIRECTORIO_SALIDA, `${item.id}.svg`);
    const rutaPng = path.join(DIRECTORIO_SALIDA, `${item.id}.png`);

    // SVG con corrección 'H' y colores de alta elegancia
    const opcionesSvg = {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2,
      color: {
        dark: '#5C1620',   // Vino profundo
        light: '#FFFDF8',  // Papel cálido
      },
    };

    const rawSvg = await QRCode.toString(textoCompleto, opcionesSvg);
    const svgConLuna = incrustarLunaEnSvg(rawSvg);
    fs.writeFileSync(rutaSvg, svgConLuna, 'utf-8');

    // Generamos también PNG con nivel H
    await QRCode.toFile(rutaPng, textoCompleto, {
      type: 'png',
      errorCorrectionLevel: 'H',
      margin: 2,
      scale: 8,
      color: {
        dark: '#5C1620',
        light: '#FFFDF8',
      },
    });

    console.log(`  🌙 ✓ QR con Luna generado: ${item.id} («${item.tituloTarjeta}»)`);
    generados++;
  }

  // QR Especial a la experiencia si urlPublica está configurada
  if (urlPublica && urlPublica.trim() !== '' && !urlPublica.includes('POR_COMPLETAR')) {
    const rutaSvgExp = path.join(DIRECTORIO_SALIDA, 'qr-experiencia.svg');
    const rutaPngExp = path.join(DIRECTORIO_SALIDA, 'qr-experiencia.png');

    const rawSvgExp = await QRCode.toString(urlPublica.trim(), {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2,
      color: {
        dark: '#7B1E26',
        light: '#FFFDF8',
      },
    });

    const svgConLunaExp = incrustarLunaEnSvg(rawSvgExp);
    fs.writeFileSync(rutaSvgExp, svgConLunaExp, 'utf-8');

    await QRCode.toFile(rutaPngExp, urlPublica.trim(), {
      type: 'png',
      errorCorrectionLevel: 'H',
      margin: 2,
      scale: 8,
      color: {
        dark: '#7B1E26',
        light: '#FFFDF8',
      },
    });

    console.log(`  🌙 ✓ QR con Luna a la web generado: ${urlPublica}`);
    generados++;
  }

  console.log(`✨ Total de ${generados} códigos QR románticos con Luna creados.`);
}

main().catch((err) => {
  console.error('❌ Error generando códigos QR con luna:', err);
  process.exit(1);
});
