import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const indexPath = "dist/index.html";
if (!existsSync(indexPath)) {
  console.error("Missing dist/index.html — run pnpm build first");
  process.exit(1);
}

const html = readFileSync(indexPath, "utf8");
let failed = false;

function fail(msg) {
  console.error(msg);
  failed = true;
}

const requiredStrings = [
  "Syke Parturi",
  "3593342-5",
  "Kauppakatu 18",
  "050 380 3388",
  "Hiustenleikkuu",
];
for (const s of requiredStrings) {
  if (!html.includes(s)) fail(`index.html missing required string: ${s}`);
}

const forbidden = ["undefined", "NaN", "[object Object]", "TODO", "lorem"];
for (const s of forbidden) {
  if (html.toLowerCase().includes(s.toLowerCase())) fail(`index.html contains forbidden: ${s}`);
}

const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!ldMatch) {
  fail("JSON-LD script not found");
} else {
  try {
    JSON.parse(ldMatch[1]);
  } catch {
    fail("JSON-LD does not parse");
  }
}

const requiredDist = [
  "dist/robots.txt",
  "dist/sitemap-index.xml",
  "dist/llms.txt",
  "dist/og-image.png",
  "dist/.well-known/webmcp.json",
  "dist/.well-known/ai-catalog.json",
];
for (const f of requiredDist) {
  if (!existsSync(f)) fail(`Missing ${f}`);
}

if (/<script[^>]+src="[^"]*\.ts"/i.test(html)) {
  fail("index.html references an unbundled .ts script");
}

const moduleScripts = [...html.matchAll(/<script type="module" src="(\/_astro\/[^"]+\.js)"/g)];
if (moduleScripts.length === 0) {
  fail("index.html has no bundled Astro client module scripts");
}

let webmcpBundled = false;
for (const [, scriptPath] of moduleScripts) {
  const jsPath = join("dist", scriptPath.slice(1));
  if (!existsSync(jsPath)) {
    fail(`Missing bundled script ${jsPath}`);
    continue;
  }
  const js = readFileSync(jsPath, "utf8");
  if (js.includes("webmcp-payload") && js.includes("registerTool")) {
    webmcpBundled = true;
  }
}
if (!webmcpBundled) {
  fail("WebMCP bootstrap bundle not found (expected registerTool + webmcp-payload)");
}

const astroDir = "dist/_astro";
if (existsSync(astroDir)) {
  for (const file of readdirSync(astroDir)) {
    if (!file.endsWith(".css")) continue;
    const css = readFileSync(join(astroDir, file), "utf8");
    if (/data:font/i.test(css)) {
      fail(`${join(astroDir, file)} contains inlined data:font URL`);
    }
  }
}

if (failed) process.exit(1);
console.log("output:check passed");
