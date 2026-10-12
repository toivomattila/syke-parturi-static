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
pnpm shadcn:lint
pnpm check
pnpm doctor
pnpm build
pnpm lhci
```

`pnpm lint` käyttää Oxlintin type-aware-tilaa TypeScript-tiedostoille. Oxlint ei käsittele Astro-komponenttien `.astro`-templateja; ne tarkistetaan `astro check` -komennolla osana `pnpm check` -komentoa. `pnpm doctor` suorittaa React Doctorin ei-interaktiivisessa offline-tilassa; projekti ei sisällä React-komponentteja.

`pnpm shadcn:lint` käyttää `@shadcn/lint`-lisäosaa Oxlintin kautta ja estää mielivaltaiset Tailwind-arvot. Sääntö on määritelty tiedostossa `.oxlint.shadcn.json`; lisäsäännöt voi valita [sääntöluettelosta](https://github.com/shadcn-ui/lint/blob/main/docs/rules.md). Lisäosa tunnistaa React JSX-, Vue- ja Svelte-tiedostot, mutta ei Astro-templateja. Oxlint tarkistaa tuetut `.ts`- ja `.tsx`-tiedostot. Projektissa ei ole TSX-käyttöliittymäkomponentteja; nykyiset `Button.astro`- ja `Card.astro`-komponentit tarkistetaan Astro-työkaluilla, eivät tällä lisäosalla.

`pnpm lhci` käyttää paikallista Chromea. CI tarkistaa muodostetut tiedostot lycheyllä offline-tilassa; ulkoisten linkkien toimivuutta ei tarkisteta.
Lighthouse-asetukset määrittävät kategoria-assertiot URL-kohtaisesti: etusivun SEO-raja säilyy, mutta `404.html`-sivun SEO-assertio on pois käytöstä. 404-sivun `noindex` on tarkoituksellinen, koska OpenShip palvelee virheellisiä osoitteita soft-404-sivuina.

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
pnpm shadcn:lint
pnpm check
pnpm doctor
pnpm build
pnpm lhci
```

`pnpm lint` runs Oxlint in type-aware mode for TypeScript files. Oxlint does not lint Astro `.astro` templates; `astro check` covers them as part of `pnpm check`. React Doctor runs non-interactively and offline; this project has no React components.

The WebMCP script registers read-only tools in supporting browsers. The page and `/.well-known/webmcp.json` manifest use the same `src/data/business.ts` fact source.

`pnpm shadcn:lint` runs `@shadcn/lint` through Oxlint and disallows arbitrary Tailwind values. The rule is configured in `.oxlint.shadcn.json`; choose additional rules from the [rule list](https://github.com/shadcn-ui/lint/blob/main/docs/rules.md). The plugin recognizes React JSX, Vue, and Svelte files, but not Astro templates. Oxlint checks supported `.ts` and `.tsx` files. This site has no TSX UI components; `Button.astro` and `Card.astro` are checked by Astro tooling, not this plugin. `pnpm lhci` uses a local Chrome installation. CI checks generated files with lychee in offline mode, so external link health is not checked. Regenerate the OG image, favicons, and app icons with `pnpm assets:generate`.

Lighthouse category assertions are URL-specific: the homepage keeps its SEO threshold, while the SEO assertion is disabled for `404.html`. The 404 page intentionally has `noindex` because OpenShip serves invalid paths as soft 404s.
