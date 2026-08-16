"use client";

import { useEffect, useRef, useState } from "react";

const SPRITE = [
  "..........",
  "....P.....",
  "....P.....",
  "...BBB....",
  "..BBBBB...",
  ".BBBBBBB..",
  ".BBWBBWB..",
  ".BBBBBBB..",
  ".BBBBBBB..",
  ".B.B.B.B..",
];
const SPRITE_BLINK = SPRITE.map((row, i) => (i === 6 ? ".BBBBBBB.." : row));
const SPRITE_ALERT = SPRITE.map((row, i) => (i === 6 ? ".BWWBWWB.." : row));
const SPRITE_POKED = SPRITE.map((row, i) => (i === 5 ? ".BPBBBPB.." : i === 6 ? ".BBBBBBB.." : row));

const IDLE_MESSAGES = ["compiling thoughts…", "blue-600 detected", "AI-directed, human-made", "built with Claude"];
const NEAR_MESSAGES = ["personal space?", "i see you.", "hovering, huh?", "not today."];
const POKE_MESSAGES = [
  "whoa, do you think i'm a chatbot or something?",
  "whoa, do you think i'm a chatbot or something?",
  "ow.",
  "rude.",
  "that's my pixel.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const MARGIN = 24;
const EDGE_BAND = 64;

function topClearance() {
  return Math.round(window.innerHeight * 0.55);
}

function randomSpot(size: number) {
  const tc = topClearance();
  const maxY = Math.max(tc, window.innerHeight - size - MARGIN);
  const top = tc + Math.random() * (maxY - tc);
  const onRight = Math.random() < 0.5;
  const left = onRight
    ? Math.max(MARGIN, window.innerWidth - MARGIN - size - Math.random() * EDGE_BAND)
    : MARGIN + Math.random() * EDGE_BAND;
  return { left, top };
}

type Mode = "idle" | "near" | "poked";

interface PixelCompanionProps {
  size?: number;
  className?: string;
}

export default function PixelCompanion({ size = 56, className = "" }: PixelCompanionProps) {
  const [blink, setBlink] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [msg, setMsg] = useState("");
  const [lean, setLean] = useState(0);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [returning, setReturning] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showSmoke, setShowSmoke] = useState(false);
  const [smokeKey, setSmokeKey] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const pokeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const smokeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const returnTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const calmTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nearRef = useRef(false);
  const modeRef = useRef<Mode>("idle");
  const homeRef = useRef(pos);
  const posRef = useRef(pos);
  const lastFleeTime = useRef(0);
  const lastScrollY = useRef(0);
  const offsetRef = useRef(0);
  const smokeKeyRef = useRef(0);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    const initial = randomSpot(size);
    homeRef.current = initial;
    posRef.current = initial;
    setPos(initial);

    lastScrollY.current = window.scrollY;
    let alive = true;
    let blinkTimer: ReturnType<typeof setTimeout>;

    function scheduleBlink() {
      blinkTimer = setTimeout(() => {
        if (!alive) return;
        setBlink(true);
        blinkTimer = setTimeout(() => {
          if (!alive) return;
          setBlink(false);
          scheduleBlink();
        }, 140);
      }, 2400 + Math.random() * 3200);
    }
    scheduleBlink();

    function scheduleReturn() {
      clearTimeout(calmTimeout.current!);
      calmTimeout.current = setTimeout(() => {
        const home = homeRef.current;
        const p = posRef.current;
        if (Math.hypot(home.left - p.left, home.top - p.top) > 4) {
          setReturning(true);
          setPos(home);
          clearTimeout(returnTimeout.current!);
          returnTimeout.current = setTimeout(() => setReturning(false), 2200);
        }
      }, 6000);
    }
    scheduleReturn();

    function onMove(e: MouseEvent) {
      const el = rootRef.current;
      if (!el || pokeTimeout.current) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const isNear = dist < 150;
      if (isNear && !nearRef.current) {
        setMode("near");
        setMsg(pick(NEAR_MESSAGES));
      } else if (!isNear && nearRef.current) {
        setMode("idle");
        setMsg("");
      }
      if (isNear) {
        setLean(Math.max(-8, Math.min(8, (cx - e.clientX) / 6)));
        const now = performance.now();
        if (now - lastFleeTime.current > 70) {
          lastFleeTime.current = now;
          let dx = cx - e.clientX;
          let dy = cy - e.clientY;
          const mag = Math.hypot(dx, dy) || 1;
          dx /= mag;
          dy /= mag;
          const maxX = Math.max(MARGIN, window.innerWidth - size - MARGIN);
          const tc = topClearance();
          const maxY = Math.max(tc, window.innerHeight - size - MARGIN);
          const nextLeft = Math.max(MARGIN, Math.min(maxX, posRef.current.left + dx * 130));
          const nextTop = Math.max(tc, Math.min(maxY, posRef.current.top + dy * 130));
          setReturning(false);
          setPos({ left: nextLeft, top: nextTop });
        }
        scheduleReturn();
      }
      nearRef.current = isNear;
    }

    function onResize() {
      setPos((p) => ({
        left: Math.min(p.left, Math.max(MARGIN, window.innerWidth - size - MARGIN)),
        top: Math.min(p.top, Math.max(topClearance(), window.innerHeight - size - MARGIN)),
      }));
    }

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;
      offsetRef.current = Math.max(-50, Math.min(50, offsetRef.current + delta * 0.45));
      if (Math.abs(delta) > 12) {
        smokeKeyRef.current += 1;
        setSmokeKey(smokeKeyRef.current);
        setShowSmoke(true);
        clearTimeout(smokeTimeout.current!);
        smokeTimeout.current = setTimeout(() => setShowSmoke(false), 650);
      }
    }

    let raf = 0;
    function decay() {
      offsetRef.current *= 0.88;
      if (Math.abs(offsetRef.current) < 0.3) offsetRef.current = 0;
      setScrollOffset((prev) => {
        const r = Math.round(offsetRef.current * 10) / 10;
        return r !== prev ? r : prev;
      });
      raf = requestAnimationFrame(decay);
    }
    raf = requestAnimationFrame(decay);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      alive = false;
      clearTimeout(blinkTimer);
      clearTimeout(calmTimeout.current!);
      clearTimeout(returnTimeout.current!);
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  function handleClick() {
    setMode("poked");
    setMsg(pick(POKE_MESSAGES));
    clearTimeout(pokeTimeout.current!);
    pokeTimeout.current = setTimeout(() => {
      pokeTimeout.current = null;
      if (nearRef.current) {
        setMode("near");
        setMsg(pick(NEAR_MESSAGES));
      } else {
        setMode("idle");
        setMsg("");
      }
    }, 1400);
  }

  const grid = mode === "poked" ? SPRITE_POKED : mode === "near" ? SPRITE_ALERT : blink ? SPRITE_BLINK : SPRITE;
  const cell = size / 10;
  function colorFor(c: string) {
    return c === "B" ? "var(--accent)" : c === "P" ? "var(--accent2)" : c === "W" ? "#ffffff" : "transparent";
  }
  const bubbleMsg = msg || pick(IDLE_MESSAGES);
  const bubbleOnLeft = typeof window !== "undefined" ? pos.left < window.innerWidth / 2 : true;
  const scaleVal = mode === "near" ? 0.95 : mode === "poked" ? 1.05 : 1;
  const translateX = mode === "near" ? lean : 0;
  const posTransition = returning
    ? "left 2.2s var(--ease-standard), top 2.2s var(--ease-standard)"
    : "left 0.15s linear, top 0.15s linear";

  const bubbleStyle: React.CSSProperties = { bottom: "calc(100% + 14px)" };
  bubbleStyle[bubbleOnLeft ? "left" : "right"] = 0;

  return (
    <div
      ref={rootRef}
      className={`ds-companion ${className}`}
      style={{
        left: pos.left,
        top: pos.top,
        transition: posTransition,
        transform: `translateY(${-scrollOffset}px) translateX(${translateX}px) scale(${scaleVal})`,
      }}
      onMouseEnter={() => {
        if (mode === "idle") {
          setMode("near");
          setMsg(pick(NEAR_MESSAGES));
        }
      }}
      onClick={handleClick}
    >
      {mode !== "idle" && (
        <div className="ds-companion-bubble" style={bubbleStyle}>
          {bubbleMsg}
        </div>
      )}
      {showSmoke && (
        <div className="ds-companion-smoke" key={smokeKey}>
          <span />
          <span />
          <span />
        </div>
      )}
      <div className={`ds-companion-sprite ${mode === "poked" ? "is-poked" : ""}`} style={{ width: size, height: size }}>
        {grid.map((row, r) =>
          row.split("").map((c, cIdx) => (
            <div
              key={`${r}-${cIdx}`}
              style={{
                position: "absolute",
                left: cIdx * cell,
                top: r * cell,
                width: cell,
                height: cell,
                background: colorFor(c),
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
