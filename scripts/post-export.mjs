import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const outDir = path.join(rootDir, "out");
const enDir = path.join(outDir, "en");

console.log("\n==================================================");
console.log("  QIT Post-Export Build Step");
console.log("==================================================");
console.log(`Working Directory: ${rootDir}`);
console.log(`Output Directory:  ${outDir}`);
console.log(`English Directory: ${enDir}`);

// 1. Fail if out/ does not exist
if (!fs.existsSync(outDir)) {
  console.error("\n[FATAL] Output directory does not exist: " + outDir);
  process.exit(1);
}

// 2. Fail if out/en/ does not exist
if (!fs.existsSync(enDir)) {
  console.error("\n[FATAL] English export directory does not exist: " + enDir);
  console.error("Static export failed to generate default locale pages.");
  process.exit(1);
}

// 3. Copy ENTIRE contents of out/en/ (files and subfolders recursively) into out/ root
const enEntries = fs.readdirSync(enDir);
if (enEntries.length === 0) {
  console.error("\n[FATAL] English export directory is empty: " + enDir);
  process.exit(1);
}

console.log(`\nCopying ${enEntries.length} items from out/en/ to out/ root...`);
for (const entry of enEntries) {
  const src = path.join(enDir, entry);
  const dest = path.join(outDir, entry);
  
  // Recursively copy each file or directory into out/
  fs.cpSync(src, dest, {
    recursive: true,
    force: true,
  });
  console.log(`  ✓ Copied en/${entry} -> /${entry}`);
}

// 4. Verify that root index.html exists after copy; fail if missing
const rootIndex = path.join(outDir, "index.html");
if (!fs.existsSync(rootIndex)) {
  console.error("\n[FATAL] Root index.html does not exist after copy: " + rootIndex);
  process.exit(1);
}

// Check other expected root pages
const expectedPages = [
  "index.html",
  "courses/index.html",
  "about/index.html",
  "pricing/index.html",
  "register/index.html",
  "gallery/index.html",
  "privacy/index.html",
  "terms/index.html",
  "refund-policy/index.html",
];

for (const rel of expectedPages) {
  const p = path.join(outDir, rel);
  if (!fs.existsSync(p)) {
    console.error(`\n[FATAL] Expected root page missing: ${rel} at ${p}`);
    process.exit(1);
  }
}

// 5. Generate Cloudflare Pages _redirects file
// Clean prefix stripping for default locale; no forced (!) rules so real files win
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

// 6. Confirmation listing of root-level HTML files produced
console.log("\n--- Verified Root-Level HTML Output ---");
const rootItems = fs.readdirSync(outDir, { withFileTypes: true });
let htmlCount = 0;
for (const item of rootItems) {
  if (item.isFile() && item.name.endsWith(".html")) {
    const stat = fs.statSync(path.join(outDir, item.name));
    console.log(`  [File]   /${item.name} (${stat.size} bytes)`);
    htmlCount++;
  } else if (item.isDirectory() && !["_next", "images", "videos", "en", "ar", "ur"].includes(item.name)) {
    const subIndex = path.join(outDir, item.name, "index.html");
    if (fs.existsSync(subIndex)) {
      const stat = fs.statSync(subIndex);
      console.log(`  [Folder] /${item.name}/index.html (${stat.size} bytes)`);
      htmlCount++;
    }
  }
}
console.log(`Total verified root-level HTML pages: ${htmlCount}`);
console.log("==================================================\n");
