# Syke Parturi

Staattinen Astro-sivusto Syke Parturille Lahteen. Sivuston pääsisältö toimii ilman asiakaspuolen JavaScriptiä eikä sivusto tee ulkoisia verkkopyyntöjä käytön aikana.

## Kehitys

Node.js 22 ja pnpm.

```sh
pnpm install
pnpm dev
```

## Tarkistukset ja julkaisu

```sh
pnpm format
pnpm format:check
pnpm lint
pnpm check
pnpm doctor
pnpm build
pnpm lhci
```

`pnpm lint` käyttää Oxlintin type-aware-tilaa TypeScript-tiedostoille. Oxlint ei käsittele Astro-komponenttien `.astro`-templateja; ne tarkistetaan `astro check` -komennolla osana `pnpm check` -komentoa. `pnpm doctor` suorittaa React Doctorin ei-interaktiivisessa offline-tilassa; projekti ei sisällä React-komponentteja.

Shadcn CLI:n nykyisessä komento-ohjeessa ei ole lint- tai check-komentoa, joten erillistä `shadcn:lint`-skriptiä ei ole.

`pnpm lhci` käyttää paikallista Chromea. CI tarkistaa myös muodostetut tiedostot lycheyllä (`lycheeverse/lychee-action`).

WebMCP-skripti rekisteröi vain luku -työkalut sitä tukevassa selaimessa. Sivun ja `/.well-known/webmcp.json`-manifestin faktat käyttävät samaa `src/data/business.ts`-tietolähdettä.

OG-kuva, faviconit ja sovelluskuvakkeet voi luoda uudelleen komennolla `pnpm assets:generate`. Parturiliikkeen valokuva on tallennettu `src/assets`-hakemistoon ja optimoidaan Astro buildissa.

---

## English

Static Astro website for Syke Parturi in Lahti. Its main content works without client-side JavaScript, and the site makes no external network requests at runtime.

### Development

Use Node.js 22 and pnpm.

```sh
pnpm install
pnpm dev
```

### Checks and build

```sh
pnpm format
pnpm format:check
pnpm lint
pnpm check
pnpm doctor
pnpm build
pnpm lhci
```

`pnpm lint` runs Oxlint in type-aware mode for TypeScript files. Oxlint does not lint Astro `.astro` templates; `astro check` covers them as part of `pnpm check`. React Doctor runs non-interactively and offline; this project has no React components.

The WebMCP script registers read-only tools in supporting browsers. The page and `/.well-known/webmcp.json` manifest use the same `src/data/business.ts` fact source.

The current shadcn CLI help has no lint or check command, so there is no `shadcn:lint` script. `pnpm lhci` uses a local Chrome installation. CI also checks generated files with lychee. Regenerate the OG image, favicons, and app icons with `pnpm assets:generate`.
