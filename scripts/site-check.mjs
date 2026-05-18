import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const errors = [];

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const app = read("src/App.jsx");
const html = read("index.html");
const distHtml = existsSync(join(root, "dist/index.html")) ? read("dist/index.html") : "";
const packageJson = JSON.parse(read("package.json"));
const manifest = JSON.parse(read("public/site.webmanifest"));
const sw = read("public/sw.js");
const staticHeaders = read("public/_headers");
const robots = read("public/robots.txt");
const sitemap = read("public/sitemap.xml");
const vercel = JSON.parse(read("vercel.json"));

expect(!/dangerouslySetInnerHTML|eval\(|new Function/.test(app), "Riskli DOM/JS kullanımı bulundu.");
expect(app.includes("VITE_WEB3FORMS_ACCESS_KEY"), "Form anahtarı env değişkeninden okunmuyor.");
expect(app.includes('name="botcheck"'), "Form honeypot spam alanı bulunamadı.");
expect(app.includes('status === "email-client"'), "Mailto fallback ayrı durum olarak gösterilmiyor.");
expect(app.includes("useInitialHashScroll"), "İlk yüklemede hash scroll desteği bulunamadı.");
expect(!app.includes("PopStateEvent"), "PopStateEvent yerine daha uyumlu Event kullanılmalı.");

const blankTargets = [...app.matchAll(/<a\b[\s\S]*?target="_blank"[\s\S]*?>/g)];
blankTargets.forEach((match, index) => {
  const tag = match[0];
  expect(/rel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/.test(tag), `target="_blank" link ${index + 1} noopener/noreferrer içermiyor.`);
});

expect(/<meta\s+name="description"/.test(html), "Meta description eksik.");
expect(/<link rel="canonical" href="https:\/\/bariscreativedesign\.com\/"/.test(html), "Canonical URL eksik veya hatalı.");
expect(/property="og:image" content="https:\/\/bariscreativedesign\.com\/og-image\.png"/.test(html), "OG image absolute URL değil.");
expect(/name="twitter:image" content="https:\/\/bariscreativedesign\.com\/og-image\.png"/.test(html), "Twitter image absolute URL değil.");
expect(robots.includes("Sitemap: https://bariscreativedesign.com/sitemap.xml"), "robots.txt sitemap adresi eksik.");
expect(sitemap.includes("<loc>https://bariscreativedesign.com/</loc>"), "sitemap ana URL eksik.");
expect(packageJson.engines?.node === ">=22.12.0", "package.json Node engine bilgisi eksik veya hatalı.");

function jsonLdBlocksFrom(content) {
  return [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
}

const jsonLdBlocks = jsonLdBlocksFrom(html);
const distJsonLdBlocks = distHtml ? jsonLdBlocksFrom(distHtml) : [];
const jsonLdHashes = (distJsonLdBlocks.length ? distJsonLdBlocks : jsonLdBlocks).map((block) => {
  const hash = createHash("sha256").update(block[1]).digest("base64");
  return `'sha256-${hash}'`;
});
expect(jsonLdBlocks.length >= 1, "JSON-LD blokları eksik.");
[...jsonLdBlocks, ...distJsonLdBlocks].forEach((block, index) => {
  try {
    JSON.parse(block[1]);
  } catch (error) {
    errors.push(`JSON-LD blok ${index + 1} geçersiz: ${error.message}`);
  }
});

expect(manifest.name === "BarışCreativeDesign", "Manifest adı hatalı.");
expect(Array.isArray(manifest.icons) && manifest.icons.length >= 2, "Manifest ikonları eksik.");
expect(sw.includes("bcd-v2026-05-10-1"), "Service worker cache versiyonu güncel değil.");
expect(!sw.includes('const VERSION = "bcd-v1"'), "Service worker eski cache versiyonunu kullanıyor.");

const allHeaders = vercel.headers.flatMap((entry) => entry.headers || []);
const headerNames = new Set(allHeaders.map((header) => header.key.toLowerCase()));
const csp = allHeaders.find((header) => header.key.toLowerCase() === "content-security-policy")?.value || "";
[
  "content-security-policy",
  "strict-transport-security",
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
  "permissions-policy",
].forEach((header) => {
  expect(headerNames.has(header), `${header} başlığı vercel.json içinde yok.`);
});
expect(!/script-src[^;]*'unsafe-inline'/.test(csp), "CSP script-src içinde unsafe-inline olmamalı.");
expect(jsonLdHashes.every((hash) => csp.includes(hash)), "CSP JSON-LD hash değerleri güncel değil.");
expect(staticHeaders.includes("Content-Security-Policy:"), "public/_headers CSP içermiyor.");
expect(jsonLdHashes.every((hash) => staticHeaders.includes(hash)), "public/_headers JSON-LD hash değerleri güncel değil.");

const distPath = join(root, "dist");
if (existsSync(distPath)) {
  expect(!walk(distPath).some((file) => file.endsWith(".map")), "Dist içinde source map dosyası var.");
  expect(distHtml.includes("/assets/"), "Dist HTML üretim asset yollarını içermiyor.");
  expect(!distHtml.includes("/src/main.jsx"), "Dist HTML geliştirme giriş dosyasını içeriyor.");
}

if (errors.length) {
  console.error("Site check failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Site check passed.");
