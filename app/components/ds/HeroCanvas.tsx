"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const LINK_DISTANCE = 120;

/** Reads the particle colors from the active theme's tokens. */
function themeColors() {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  const accent = v("--accent-hover", "#5b8cff");
  return {
    dots: [accent, accent, v("--accent2-hover", "#c084fc"), v("--fg-secondary", "#e4e8f7")],
    line: accent,
  };
}

/**
 * Decorative particle network behind the hero. It animates only while it is on screen and
 * the tab is visible, and draws a single still frame for visitors who prefer reduced motion.
 * Phase 2 of the redesign removes it (docs/DESIGN-CHARTER.md).
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let particles: Particle[] = [];
    let colors = themeColors();
    let raf = 0;
    let running = false;
    let onScreen = true;
    let w = 0;
    let h = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      colors = themeColors();
      const count = Math.round((w * h) / 13000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: Math.random() < 0.8 ? 2 : 3,
        color: colors.dots[Math.floor(Math.random() * colors.dots.length)],
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.strokeStyle = colors.line;
      ctx!.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > LINK_DISTANCE || Math.abs(dy) > LINK_DISTANCE) continue;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            ctx!.globalAlpha = 0.16 * (1 - dist / LINK_DISTANCE);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      ctx!.globalAlpha = 0.85;
      for (const p of particles) {
        ctx!.fillStyle = p.color;
        ctx!.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }
      ctx!.globalAlpha = 1;
    }

    function step() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }
      draw();
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (running || motionQuery.matches || !onScreen || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(step);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function refresh() {
      stop();
      init();
      draw();
      start();
    }

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    observer.observe(canvas);

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 150);
    }
    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("themechange", refresh);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", refresh);
    return () => {
      stop();
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", refresh);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", refresh);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
