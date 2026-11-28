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
const FACES: Record<"open" | "blink" | "alert", string> = {
  open: ".BBWBBWB..",
  blink: ".BBBBBBB..",
  alert: ".BWWBWWB..",
};

function colorFor(c: string) {
  return c === "B" ? "var(--accent)" : c === "P" ? "var(--accent2)" : "var(--white)";
}

/** Dave's pixel sprite as one crisp SVG. Decorative: always aria-hidden. */
export default function SpriteIcon({ size = 48, face = "open" }: { size?: number; face?: keyof typeof FACES }) {
  const grid = SPRITE.map((row, i) => (i === 6 ? FACES[face] : row));
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
      style={{ display: "block", flexShrink: 0 }}
    >
      {grid.flatMap((row, r) =>
        row.split("").map((c, x) => (c === "." ? null : <rect key={`${r}-${x}`} x={x} y={r} width={1} height={1} fill={colorFor(c)} />))
      )}
    </svg>
  );
}
