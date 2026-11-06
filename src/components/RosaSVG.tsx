import React from 'react';

export interface RosaSVGProps {
  variante?: "abierta" | "boton" | "petalo";
  color?: "rojo" | "granate" | "rosa" | "dorado" | string;
  tallo?: boolean;
  className?: string;
  size?: number | string;
  animada?: boolean;
  style?: React.CSSProperties;
}

export const RosaSVG: React.FC<RosaSVGProps> = ({
  variante = "abierta",
  color = "rojo",
  tallo = false,
  className = "",
  size = 48,
  animada = false,
  style,
}) => {
  const paletas: Record<string, { principal: string; sombra: string; luz: string }> = {
    rojo: { principal: "#C0392B", sombra: "#7B1E26", luz: "#E8A0A8" },
    granate: { principal: "#7B1E26", sombra: "#5C1620", luz: "#C0392B" },
    rosa: { principal: "#E8A0A8", sombra: "#C0392B", luz: "#F7D6DA" },
    dorado: { principal: "#D4A017", sombra: "#9C720B", luz: "#FBE38E" },
  };

  const tono = paletas[color] || { principal: color, sombra: "#5C1620", luz: "#FFF" };
  const verdeTallo = "#2E5B3E";
  const verdeClaro = "#3D7A53";

  const viewBox = tallo ? "0 0 100 145" : "0 0 100 100";
  const width = typeof size === "number" ? `${size}px` : size;
  const height = tallo 
    ? (typeof size === "number" ? `${size * 1.45}px` : "auto") 
    : width;

  const gradId = `rosa-react-grad-${color.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      className={`rosa-svg inline-block select-none overflow-visible ${animada ? "anim-rosa-apertura" : ""} ${className}`}
      aria-hidden="true"
      role="img"
      style={style}
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={tono.luz} stopOpacity="0.9" />
          <stop offset="50%" stopColor={tono.principal} />
          <stop offset="100%" stopColor={tono.sombra} />
        </radialGradient>

        <linearGradient id="tallo-grad-react" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={verdeClaro} />
          <stop offset="100%" stopColor={verdeTallo} />
        </linearGradient>
      </defs>

      {tallo && (
        <g className="tallo-grupo">
          <path
            d="M 50,75 C 50,95 47,115 50,140"
            stroke="url(#tallo-grad-react)"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 48,102 C 45,102 43,105 42,107 C 44,107 47,106 48,105 Z"
            fill={verdeTallo}
          />
          <path
            d="M 48,92 C 34,88 22,96 16,108 C 28,110 40,104 48,95 Z"
            fill="url(#tallo-grad-react)"
          />
          <path
            d="M 48,93 C 35,97 23,104 18,107"
            stroke={verdeClaro}
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M 50,110 C 64,105 76,112 84,124 C 72,126 58,121 50,113 Z"
            fill="url(#tallo-grad-react)"
          />
          <path
            d="M 50,111 C 63,114 74,120 81,123"
            stroke={verdeClaro}
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        </g>
      )}

      {variante === "abierta" && (
        <g className="rosa-flor-abierta">
          <path
            d="M 28,26 C 14,38 12,62 26,76 C 42,86 64,86 78,74 C 90,60 88,36 74,24 C 58,12 38,14 28,26 Z"
            fill={tono.sombra}
            opacity="0.95"
          />
          <path
            d="M 20,44 C 15,62 30,78 48,78 C 32,74 24,60 20,44 Z"
            fill={tono.principal}
          />
          <path
            d="M 80,44 C 85,62 70,78 52,78 C 68,74 76,60 80,44 Z"
            fill={tono.principal}
          />
          <path
            d="M 32,74 C 44,82 60,82 70,74 C 58,78 42,78 32,74 Z"
            fill={tono.luz}
            opacity="0.8"
          />
          <path
            d="M 22,36 C 26,56 42,70 60,70 C 40,68 28,54 22,36 Z"
            fill={`url(#${gradId})`}
          />
          <path
            d="M 78,36 C 74,56 58,70 40,70 C 60,68 72,54 78,36 Z"
            fill={`url(#${gradId})`}
          />
          <path
            d="M 28,32 C 34,18 64,18 72,32 C 76,50 64,64 50,65 C 36,64 24,50 28,32 Z"
            fill={tono.principal}
          />
          <path
            d="M 34,32 C 36,22 62,22 66,32 C 70,44 58,56 50,56 C 42,56 32,44 34,32 Z"
            fill={tono.sombra}
          />
          <path
            d="M 38,34 C 40,26 58,26 62,34 C 64,42 56,50 50,50 C 44,50 36,42 38,34 Z"
            fill={tono.principal}
          />
          <path
            d="M 44,36 C 46,30 54,30 56,36 C 58,42 52,46 50,46 C 47,46 43,40 46,37 C 49,34 52,36 52,39"
            fill="none"
            stroke={tono.luz}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 32,28 C 42,20 58,20 68,28"
            fill="none"
            stroke={tono.luz}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 24,42 C 30,58 46,68 62,66"
            fill="none"
            stroke={tono.luz}
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M 76,42 C 70,58 54,68 38,66"
            fill="none"
            stroke={tono.sombra}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      )}

      {variante === "boton" && (
        <g className="rosa-flor-boton">
          <path
            d="M 44,68 C 40,78 30,82 25,85 C 32,80 44,76 48,70 Z"
            fill={verdeTallo}
          />
          <path
            d="M 56,68 C 60,78 70,82 75,85 C 68,80 56,76 52,70 Z"
            fill={verdeTallo}
          />
          <path
            d="M 50,70 L 50,86"
            stroke={verdeClaro}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 50,15 C 68,30 72,58 56,70 C 44,70 32,58 34,30 C 38,18 46,15 50,15 Z"
            fill={tono.sombra}
          />
          <path
            d="M 50,16 C 64,28 66,54 52,66 C 42,66 36,54 38,30 C 42,20 47,16 50,16 Z"
            fill={`url(#${gradId})`}
          />
          <path
            d="M 38,28 C 46,42 56,58 50,66 C 42,62 36,46 38,28 Z"
            fill={tono.luz}
            opacity="0.85"
          />
          <path
            d="M 60,26 C 54,40 44,56 49,66 C 58,60 62,44 60,26 Z"
            fill={tono.principal}
          />
          <path
            d="M 47,18 C 50,15 53,16 55,20"
            stroke={tono.luz}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}

      {variante === "petalo" && (
        <g className="rosa-petalo-suelto">
          <path
            d="M 50,10 C 75,20 88,50 75,78 C 62,95 38,95 25,78 C 12,50 25,20 50,10 Z"
            fill={`url(#${gradId})`}
          />
          <path
            d="M 50,15 C 60,35 62,65 50,85"
            stroke={tono.luz}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M 32,60 C 45,72 55,72 68,60"
            stroke={tono.sombra}
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </g>
      )}
    </svg>
  );
};
