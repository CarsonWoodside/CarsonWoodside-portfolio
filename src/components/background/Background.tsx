import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  targetOpacity: number;
  speed: number;
  twinkleSpeed: number;
}

export function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 6000);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.4 + 0.2,
        opacity: Math.random(),
        targetOpacity: Math.random(),
        speed: Math.random() * 0.0003 + 0.0001,
        twinkleSpeed: Math.random() * 0.008 + 0.002,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep background gradient
      const bg = ctx.createRadialGradient(
        canvas.width / 2, 0,
        0,
        canvas.width / 2, canvas.height / 2,
        canvas.height
      );
      bg.addColorStop(0, "#0a0a0f");
      bg.addColorStop(1, "#050505");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Drift opacity toward target
        if (Math.abs(star.opacity - star.targetOpacity) < 0.01) {
          star.targetOpacity = Math.random();
        }
        star.opacity += (star.targetOpacity - star.opacity) * star.twinkleSpeed;

        // Slow upward drift
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        const alpha = Math.max(0, Math.min(1, star.opacity));

        // Glow halo
        const glow = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 4
        );
        glow.addColorStop(0, `rgba(200, 230, 255, ${alpha * 0.25})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
        ctx.fill();

        const isBright = star.size > 1.2;
        const coreColor = isBright
          ? `rgba(180, 240, 255, ${alpha})`
          : `rgba(220, 220, 255, ${alpha})`;

        ctx.fillStyle = coreColor;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross sparkle on brightest stars only
        if (isBright && alpha > 0.6) {
          const sparkLen = star.size * 5 * alpha;
          ctx.strokeStyle = `rgba(180, 240, 255, ${alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - sparkLen, star.y);
          ctx.lineTo(star.x + sparkLen, star.y);
          ctx.moveTo(star.x, star.y - sparkLen);
          ctx.lineTo(star.x, star.y + sparkLen);
          ctx.stroke();
        }
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, #050505 100%)",
        }}
      />
    </>
  );
}