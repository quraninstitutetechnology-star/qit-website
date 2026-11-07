import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const outDir = path.join(rootDir, "out");
const enDir = path.join(outDir, "en");

if (!fs.existsSync(outDir)) {
  console.error("Error: out/ directory does not exist.");
  process.exit(1);
}

if (fs.existsSync(enDir)) {
  // Copy all files and folders from out/en to out/
  fs.cpSync(enDir, outDir, {
    recursive: true,
    force: true,
  });
  console.log("✓ Copied out/en/ contents to out/ for default root locale routes.");
} else {
  console.warn("Warning: out/en/ does not exist.");
}

// Generate Cloudflare Pages _redirects file
const redirectsPath = path.join(outDir, "_redirects");
const redirects = [
  "# Cloudflare Pages 301 redirects for default locale (English has clean prefix-free URLs)",
  "/en/*  /:splat  301",
  "/en    /        301",
  "",
].join("\n");

fs.writeFileSync(redirectsPath, redirects, "utf8");
console.log("✓ Generated out/_redirects for Cloudflare Pages.");

// Also save to public/_redirects so it persists in the repo
const publicRedirectsPath = path.join(rootDir, "public", "_redirects");
fs.writeFileSync(publicRedirectsPath, redirects, "utf8");
console.log("✓ Synchronized public/_redirects.");
