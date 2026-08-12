"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

const COLORS = ["#c8ff5a", "#63e6ff", "#a78bfa"];

export default function DustCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !dot || !ring) return;

    const particles: Particle[] = [];
    let frame = 0;
    let pointerX = -100;
    let pointerY = -100;
    let ringX = -100;
    let ringY = -100;
    let lastX = pointerX;
    let lastY = pointerY;
    let hovering = false;
    let dpr = 1;

    document.documentElement.classList.add("has-dust-cursor");

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addDust = (x: number, y: number, amount: number) => {
      for (let index = 0; index < amount && particles.length < 70; index += 1) {
        const life = 28 + Math.random() * 24;
        particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.75,
          vy: -0.25 - Math.random() * 0.7,
          life,
          maxLife: life,
          size: 0.8 + Math.random() * 2.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const move = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      const distance = Math.hypot(pointerX - lastX, pointerY - lastY);
      if (distance > 3) addDust(pointerX, pointerY, Math.min(4, Math.ceil(distance / 12)));
      lastX = pointerX;
      lastY = pointerY;
      hovering = Boolean((event.target as Element | null)?.closest("a, button, input, textarea, select, [role='button']"));
    };

    const leave = () => {
      pointerX = -100;
      pointerY = -100;
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "lighter";
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.985;
        particle.life -= 1;
        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }
        const alpha = Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.68;
        context.globalAlpha = alpha;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${hovering ? 1.55 : 1})`;
      ring.style.borderColor = hovering ? "#c8ff5a" : "rgba(99,230,255,.72)";
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-dust-cursor");
    };
  }, []);

  return (
    <div className="dust-cursor" aria-hidden="true">
      <canvas ref={canvasRef} className="dust-cursor-canvas" />
      <div ref={ringRef} className="dust-cursor-ring" />
      <div ref={dotRef} className="dust-cursor-dot" />
    </div>
  );
}
