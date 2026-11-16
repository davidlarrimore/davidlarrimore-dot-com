// scripts/generate-og-images.js
//
// Generates the link-preview (Open Graph) images used by LinkedIn, Slack, etc.
//
//   public/images/og-default.png          Site-wide fallback card
//   public/blog/images/<slug>/og.jpg      Per-post card, cropped from the post's `cover`
//
// LinkedIn's crawler does not reliably render WebP or SVG, so previews must be
// PNG/JPG. Images are 1200x627 (LinkedIn's recommended 1.91:1 ratio).
//
// Run with `npm run generate-og-images` after changing the profile photo or
// adding/changing a blog post cover, and commit the output.

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const matter = require("gray-matter");

const WIDTH = 1200;
const HEIGHT = 627;

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const POSTS_DIR = path.join(PUBLIC_DIR, "blog", "posts");

// Pointy-top hexagon, matching the avatar frame in HeroSection.
function hexPoints(cx, cy, size) {
  const h = size / 2;
  return [
    [cx, cy - h],
    [cx + h, cy - h / 2],
    [cx + h, cy + h / 2],
    [cx, cy + h],
    [cx - h, cy + h / 2],
    [cx - h, cy - h / 2],
  ]
    .map((p) => p.join(","))
    .join(" ");
}

async function generateDefault() {
  const avatarSize = 300;
  const avatarCx = 230;
  const avatarCy = HEIGHT / 2;
  const font = "Helvetica Neue, Helvetica, Arial, sans-serif";
  const mono = "Menlo, Monaco, Courier New, monospace";

  const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3d6ef2"/>
      <stop offset="1" stop-color="#a855f7"/>
    </linearGradient>
    <radialGradient id="glowBlue" cx="0.12" cy="0.2" r="0.7">
      <stop offset="0" stop-color="#3d6ef2" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#3d6ef2" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowPurple" cx="0.95" cy="0.95" r="0.6">
      <stop offset="0" stop-color="#a855f7" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#232a44" stroke-width="1" opacity="0.6"/>
    </pattern>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0c0f1c"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowBlue)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowPurple)"/>
  <rect x="0" y="${HEIGHT - 8}" width="${WIDTH}" height="8" fill="url(#frame)"/>

  <polygon points="${hexPoints(avatarCx, avatarCy, avatarSize + 14)}" fill="url(#frame)"/>

  <text x="440" y="212" font-family="${mono}" font-size="24" fill="#84acff" letter-spacing="1">// technologist · executive · builder</text>
  <text x="438" y="300" font-family="${font}" font-size="78" font-weight="700" fill="#eef1fb" letter-spacing="-2">Dave Larrimore</text>
  <text font-family="${font}" font-size="31" fill="#9aa4c4">
    <tspan x="440" y="364">I build technology, lead teams, and turn</tspan>
    <tspan x="440" y="406">complex challenges into practical solutions.</tspan>
  </text>
  <text x="440" y="478" font-family="${mono}" font-size="24" fill="#7580a3">davidlarrimore.com</text>
</svg>`);

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${avatarSize}" height="${avatarSize}"><polygon points="${hexPoints(
      avatarSize / 2,
      avatarSize / 2,
      avatarSize
    )}" fill="#fff"/></svg>`
  );

  const avatar = await sharp(path.join(PUBLIC_DIR, "images", "profile.webp"))
    .resize(avatarSize, avatarSize, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const out = path.join(PUBLIC_DIR, "images", "og-default.png");
  await sharp(background)
    .composite([
      {
        input: avatar,
        left: Math.round(avatarCx - avatarSize / 2),
        top: Math.round(avatarCy - avatarSize / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`✓ ${path.relative(PUBLIC_DIR, out)}`);
}

async function generatePostImages() {
  if (!fs.existsSync(POSTS_DIR)) return;

  for (const file of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
    const slug = file.replace(/\.md$/, "");
    const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
    if (!data.cover) {
      console.log(`- ${slug}: no cover, will use the site default`);
      continue;
    }

    const coverPath = path.join(PUBLIC_DIR, data.cover);
    if (!fs.existsSync(coverPath)) {
      console.warn(`! ${slug}: cover not found at ${data.cover}`);
      continue;
    }

    const outDir = path.join(PUBLIC_DIR, "blog", "images", slug);
    fs.mkdirSync(outDir, { recursive: true });
    const out = path.join(outDir, "og.jpg");
    await sharp(coverPath)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
      .flatten({ background: "#0c0f1c" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(out);
    console.log(`✓ ${path.relative(PUBLIC_DIR, out)}`);
  }
}

(async () => {
  await generateDefault();
  await generatePostImages();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
