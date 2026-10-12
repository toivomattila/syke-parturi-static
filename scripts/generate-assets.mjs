import sharp from "sharp";

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="70" fill="#0b1915"/><path d="M356 141c-28-26-60-39-101-39-67 0-111 37-111 91 0 48 35 73 104 91 54 14 78 25 78 55 0 31-29 50-71 50-45 0-83-17-113-48" fill="none" stroke="#d5ac70" stroke-width="36" stroke-linecap="round"/><path d="M98 256h316" stroke="#d5ac70" stroke-width="6" opacity=".45"/></svg>`;
const iconPng = async (size) => sharp(Buffer.from(icon)).resize(size, size).png().toBuffer();
await Promise.all([
  iconPng(180).then((data) => sharp(data).toFile("public/apple-touch-icon.png")),
  iconPng(192).then((data) => sharp(data).toFile("public/icon-192.png")),
  iconPng(512).then((data) => sharp(data).toFile("public/icon-512.png")),
]);
const png16 = await iconPng(64);
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
icoHeader.writeUInt8(64, 6);
icoHeader.writeUInt8(64, 7);
icoHeader.writeUInt8(0, 8);
icoHeader.writeUInt8(0, 9);
icoHeader.writeUInt16LE(1, 10);
icoHeader.writeUInt16LE(32, 12);
icoHeader.writeUInt32LE(png16.length, 14);
icoHeader.writeUInt32LE(22, 18);
await import("node:fs/promises").then(({ writeFile }) =>
  writeFile("public/favicon.ico", Buffer.concat([icoHeader, png16])),
);

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#183a2d"/><stop offset="1" stop-color="#091611"/></linearGradient><pattern id="lines" width="38" height="38" patternUnits="userSpaceOnUse"><path d="M0 38 38 0" stroke="#d5ac70" stroke-opacity=".08"/></pattern></defs><rect width="1200" height="630" fill="url(#bg)"/><rect width="1200" height="630" fill="url(#lines)"/><circle cx="970" cy="310" r="270" fill="none" stroke="#d5ac70" stroke-opacity=".13" stroke-width="2"/><circle cx="970" cy="310" r="220" fill="none" stroke="#d5ac70" stroke-opacity=".09"/><rect x="86" y="82" width="48" height="48" rx="2" fill="none" stroke="#d5ac70" stroke-width="2"/><text x="110" y="117" fill="#d5ac70" font-family="Georgia,serif" font-size="34" text-anchor="middle">S</text><text x="158" y="113" fill="#f4f0e8" font-family="Arial,sans-serif" font-size="20" font-weight="700" letter-spacing="4">SYKE PARTURI</text><text x="84" y="323" fill="#f4f0e8" font-family="Arial,sans-serif" font-size="90" font-weight="700" letter-spacing="-4">Hyvä tyyli.</text><text x="84" y="418" fill="#d5ac70" font-family="Arial,sans-serif" font-size="90" font-weight="700" letter-spacing="-4">Hyvä syke.</text><path d="M87 465h110" stroke="#d5ac70" stroke-width="3"/><text x="86" y="523" fill="#cbc9c0" font-family="Arial,sans-serif" font-size="24" letter-spacing="3">PARTURI · LAHTI</text><path d="M890 205c-45 45-70 104-70 167 0 109 77 190 181 190 81 0 141-55 141-136 0-73-53-121-147-143-72-17-104-33-104-75 0-40 38-65 91-65" fill="none" stroke="#d5ac70" stroke-width="9" stroke-linecap="round" opacity=".8"/></svg>`;
await sharp(Buffer.from(og)).png().toFile("public/og-image.png");
