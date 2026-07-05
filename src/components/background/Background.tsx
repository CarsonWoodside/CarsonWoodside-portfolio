import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  targetOpacity: number;
  twinkleSpeed: number;
  driftSpeed: number;
}

interface ConstellationLine {
  fromIndex: number;
  toIndex: number;
  opacity: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const MAX_STARS = 320;
const CONSTELLATION_RADIUS = 160;
const LINK_DISTANCE = 100;

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const constellationLinesRef = useRef<ConstellationLine[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const shootingStarTimerRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let running = false;

    // ── Init star field ────────────────────────────────────────────────
    const initStars = () => {
      const count = Math.min(MAX_STARS, Math.floor((canvas.width * canvas.height) / 5000));
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.4 + 0.2,
        opacity: Math.random(),
        targetOpacity: Math.random(),
        twinkleSpeed: Math.random() * 0.008 + 0.002,
        driftSpeed: Math.random() * 0.0003 + 0.0001,
      }));
    };

    // ── Spawn a shooting star ──────────────────────────────────────────
    const spawnShootingStar = () => {
      const angle = (Math.random() * 40 + 20) * (Math.PI / 180);
      const speed = Math.random() * 8 + 6;
      const startX = Math.random() * canvas.width * 0.8;
      const startY = Math.random() * canvas.height * 0.3;
      const maxLife = Math.random() * 40 + 40;

      shootingStarsRef.current.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 120 + 80,
        opacity: 1,
        life: 0,
        maxLife,
      });
    };

    // ── Update constellation lines based on mouse ──────────────────────
    // Collect the stars near the mouse first (cheap box check before the
    // sqrt), then only pair within that small subset instead of all stars.
    const updateConstellation = () => {
      const mouse = mouseRef.current;
      const stars = starsRef.current;
      const lines: ConstellationLine[] = [];

      const near: { index: number; dist: number }[] = [];
      for (let i = 0; i < stars.length; i++) {
        const dx = stars[i].x - mouse.x;
        const dy = stars[i].y - mouse.y;
        if (dx > CONSTELLATION_RADIUS || dx < -CONSTELLATION_RADIUS) continue;
        if (dy > CONSTELLATION_RADIUS || dy < -CONSTELLATION_RADIUS) continue;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONSTELLATION_RADIUS) near.push({ index: i, dist });
      }

      for (let a = 0; a < near.length; a++) {
        for (let b = a + 1; b < near.length; b++) {
          const from = stars[near[a].index];
          const to = stars[near[b].index];
          const ddx = from.x - to.x;
          const ddy = from.y - to.y;
          if (ddx > LINK_DISTANCE || ddx < -LINK_DISTANCE) continue;
          if (ddy > LINK_DISTANCE || ddy < -LINK_DISTANCE) continue;
          const distBetween = Math.sqrt(ddx * ddx + ddy * ddy);

          if (distBetween < LINK_DISTANCE) {
            const fade =
              (1 - near[a].dist / CONSTELLATION_RADIUS) *
              (1 - near[b].dist / CONSTELLATION_RADIUS) *
              (1 - distBetween / LINK_DISTANCE);
            lines.push({ fromIndex: near[a].index, toIndex: near[b].index, opacity: fade });
          }
        }
      }

      constellationLinesRef.current = lines;
    };

    // ── Draw one frame; `animated` also advances the simulation ─────────
    const drawFrame = (animated: boolean) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const bg = ctx.createRadialGradient(
        canvas.width / 2, 0, 0,
        canvas.width / 2, canvas.height / 2, canvas.height
      );
      bg.addColorStop(0, "#0a0a0f");
      bg.addColorStop(1, "#050505");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;

      // ── Draw constellation lines ─────────────────────────────────────
      constellationLinesRef.current.forEach((line) => {
        const from = stars[line.fromIndex];
        const to = stars[line.toIndex];
        const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        grad.addColorStop(0, `rgba(0, 200, 255, ${line.opacity * 0.6})`);
        grad.addColorStop(0.5, `rgba(150, 220, 255, ${line.opacity * 0.8})`);
        grad.addColorStop(1, `rgba(0, 200, 255, ${line.opacity * 0.6})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      });

      // ── Draw stars ───────────────────────────────────────────────────
      stars.forEach((star) => {
        if (animated) {
          // Twinkle
          if (Math.abs(star.opacity - star.targetOpacity) < 0.01) {
            star.targetOpacity = Math.random();
          }
          star.opacity += (star.targetOpacity - star.opacity) * star.twinkleSpeed;

          // Drift upward
          star.y -= star.driftSpeed;
          if (star.y < 0) {
            star.y = canvas.height;
            star.x = Math.random() * canvas.width;
          }
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

        // Core
        const isBright = star.size > 1.2;
        ctx.fillStyle = isBright
          ? `rgba(180, 240, 255, ${alpha})`
          : `rgba(220, 220, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross sparkle on brightest stars
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

      if (!animated) return;

      // ── Draw shooting stars ──────────────────────────────────────────
      shootingStarsRef.current = shootingStarsRef.current.filter((s) => {
        s.life++;
        s.x += s.vx;
        s.y += s.vy;

        // Fade in then out
        const progress = s.life / s.maxLife;
        s.opacity = progress < 0.2
          ? progress / 0.2
          : 1 - (progress - 0.2) / 0.8;

        const tailX = s.x - s.vx * (s.length / 10);
        const tailY = s.y - s.vy * (s.length / 10);

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(180, 230, 255, ${s.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Small bright head
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        return s.life < s.maxLife;
      });

      // ── Schedule next shooting star ──────────────────────────────────
      shootingStarTimerRef.current++;
      // Fire one every 180-360 frames (~3-6 seconds at 60fps)
      if (shootingStarTimerRef.current > Math.random() * 180 + 180) {
        spawnShootingStar();
        shootingStarTimerRef.current = 0;
      }

      updateConstellation();
    };

    const loop = () => {
      drawFrame(true);
      if (running) animFrameRef.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (running || reducedMotionQuery.matches || document.hidden) return;
      running = true;
      animFrameRef.current = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };

    // Reduced motion keeps the atmosphere as a single static frame.
    const renderMode = () => {
      stopLoop();
      if (reducedMotionQuery.matches) {
        constellationLinesRef.current = [];
        shootingStarsRef.current = [];
        drawFrame(false);
      } else {
        startLoop();
      }
    };

    // ── Resize ─────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      if (reducedMotionQuery.matches) drawFrame(false);
    };

    // ── Mouse tracking ─────────────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else renderMode();
    };

    resize();
    renderMode();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", renderMode);

    return () => {
      stopLoop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", renderMode);
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

      {/* Vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, #050505 100%)",
        }}
      />
    </>
  );
}
