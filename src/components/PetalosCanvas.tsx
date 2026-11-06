import React, { useEffect, useRef } from 'react';

interface Petalo {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spin: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  initialX: number;
  color: string;
  opacity: number;
}

export const PetalosCanvas: React.FC<{ cantidad?: number }> = ({ cantidad = 24 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Si el usuario prefiere movimiento reducido, no se dibuja la lluvia de pétalos
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colores = ['#C0392B', '#7B1E26', '#E8A0A8', '#9B2335', '#D63031'];

    // Inicializar pétalos
    const petalos: Petalo[] = Array.from({ length: cantidad }, () => {
      const x = Math.random() * window.innerWidth;
      return {
        x,
        initialX: x,
        y: Math.random() * window.innerHeight - window.innerHeight,
        size: 10 + Math.random() * 12,
        speedY: 0.8 + Math.random() * 1.4,
        speedX: (Math.random() - 0.5) * 0.8,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.03,
        oscillationSpeed: 0.01 + Math.random() * 0.02,
        oscillationDistance: 15 + Math.random() * 30,
        color: colores[Math.floor(Math.random() * colores.length)],
        opacity: 0.65 + Math.random() * 0.35,
      };
    });

    let time = 0;

    const dibujarPetalo = (p: Petalo) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      // Forma orgánica de pétalo de rosa en bezier
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.8, p.size * 0.9, p.size * 0.2, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.2, -p.size * 0.7, -p.size * 0.8, 0, -p.size);
      ctx.fill();

      // Nervadura sutil en el centro
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.8);
      ctx.lineTo(0, p.size * 0.6);
      ctx.stroke();

      ctx.restore();
    };

    const animar = () => {
      if (!isRunning) return;

      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of petalos) {
        p.y += p.speedY;
        p.angle += p.spin;
        p.x = p.initialX + Math.sin(time * p.oscillationSpeed * 50) * p.oscillationDistance;

        // Si el pétalo sale por abajo, reiniciarlo arriba
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.initialX = Math.random() * canvas.width;
          p.x = p.initialX;
        }

        dibujarPetalo(p);
      }

      animationFrameId = requestAnimationFrame(animar);
    };

    // Pausa automática cuando la pestaña está oculta
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(animar);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animationFrameId = requestAnimationFrame(animar);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [cantidad]);

  return (
    <canvas
      ref={canvasRef}
      className="petalos-canvas-layer fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
