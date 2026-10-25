import rawValues from "../content/business.json";
import type { BusinessValues } from "./business-values";

const businessValues = rawValues as BusinessValues;

const SITE_URL = "https://sykeparturi.datato.fi/";

const schemaDaysByLabel: Record<string, readonly string[]> = {
  "Ma–Pe": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  La: ["Saturday"],
};

function phoneDigits(display: string): string {
  return display.replace(/\s/g, "");
}

function phoneHref(display: string): string {
  const digits = phoneDigits(display);
  if (digits.startsWith("+")) return `tel:${digits}`;
  if (digits.startsWith("0")) return `tel:+358${digits.slice(1)}`;
  return `tel:+${digits}`;
}

function phoneInternational(display: string): string {
  const digits = phoneDigits(display);
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return `+358${digits.slice(1)}`;
  return `+${digits}`;
}

function formatAddressLine(address: BusinessValues["address"]): string {
  return `${address.street}, ${address.postalCode} ${address.locality}`;
}

function directionsUrl(address: BusinessValues["address"]): string {
  const encoded = formatAddressLine(address).replace(/, /g, "%2C+").replace(/ /g, "+");
  return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
}

function mapsEmbedUrl(address: BusinessValues["address"]): string {
  const query = encodeURIComponent(formatAddressLine(address));
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

const openingHours = businessValues.openingHours.map((hours) => {
  const schemaDays = schemaDaysByLabel[hours.days];
  if (!schemaDays) {
    throw new Error(
      `Invalid src/content/business.json: openingHours.days "${hours.days}" has no schema.org mapping`,
    );
  }
  return { ...hours, schemaDays };
});

/** Marketing copy and optional CMS fields (not bundled into the WebMCP client script). */
export const businessSite = {
  tagline: businessValues.tagline,
  heroHeadingLine1: businessValues.heroHeadingLine1,
  heroHeadingLine2: businessValues.heroHeadingLine2,
  intro: businessValues.intro,
  servicesIntro: businessValues.servicesIntro,
  bookingLink: businessValues.bookingLink,
  notice: businessValues.notice,
};

export const business = {
  name: businessValues.name,
  url: SITE_URL,
  address: businessValues.address,
  phone: {
    display: businessValues.phone,
    href: phoneHref(businessValues.phone),
    international: phoneInternational(businessValues.phone),
  },
  businessId: businessValues.businessId,
  openingHours,
  directionsUrl: directionsUrl(businessValues.address),
  mapsEmbedUrl: mapsEmbedUrl(businessValues.address),
  gallery: businessValues.gallery
    .map((item) => ({
      src: item.src,
      alt: item.alt?.trim() ?? "",
    }))
    .filter((item) => item.src.length > 0),
  services: businessValues.services.map(({ name, price, currency }) => ({
    name,
    price,
    currency,
  })),
};

export const openingHoursText = `Aukioloajat: ${business.openingHours.map((hours) => `${hours.days} ${hours.opens.slice(0, 5)}–${hours.closes.slice(0, 5)}`).join(", ")}, Su suljettu`;

function serviceLlmsLabel(service: { id: string; name: string; price: number }): string {
  if (service.id === "beard") return `parranajo / parran muotoilu ${service.price} €`;
  return `${service.name} ${service.price} €`;
}

export function buildLlmsTxt(): string {
  const servicesLine = businessValues.services.map(serviceLlmsLabel).join("; ");
  const hoursShort = business.openingHours
    .map(
      (hours) =>
        `${hours.days} ${hours.opens.slice(0, 5).replace(":00", "")}–${hours.closes.slice(0, 5).replace(":00", "")}`,
    )
    .join(", ");
  const addressLine = `${business.address.street}, ${business.address.postalCode} ${business.address.locality}`;

  return `# ${business.name}

> ${business.name} on parturi Lahdessa. Palvelut ovat hiustenleikkuu sekä parranajo tai parran muotoilu.

## Palvelut ja hinnat

- [Palvelut](${business.url}#palvelut): ${servicesLine}.

## Yhteystiedot

- [Yhteystiedot](${business.url}#yhteystiedot): ${addressLine}; puhelin ${business.phone.display}; Y-tunnus ${business.businessId}; aukioloajat: ${hoursShort}, Su suljettu.

## Reittiohjeet

- [Avaa reittiohjeet](${business.directionsUrl}): ${addressLine}.

## Koneellisesti luettavat tiedot

- [WebMCP-manifesti](${business.url}.well-known/webmcp.json): ${business.name}n palvelut, yhteystiedot ja reittiohje.
- [AI Catalog](${business.url}.well-known/ai-catalog.json): ${business.name}n WebMCP-manifesti ja tiedot.
`;
}

export { webmcpTools } from "./webmcp-tools";

export const aiCatalog = {
  specVersion: "1.0",
  host: {
    displayName: business.name,
    documentationUrl: new URL("/llms.txt", business.url).href,
  },
  entries: [
    {
      identifier: "urn:air:datato.fi:business:syke-parturi-webmcp",
      displayName: `${business.name} WebMCP-manifesti`,
      type: "application/json",
      url: new URL("/.well-known/webmcp.json", business.url).href,
      description: "WebMCP-manifesti palveluiden, yhteystietojen ja reittiohjeen lukemiseen.",
      representativeQueries: [
        `Mitkä ovat ${business.name} palvelut ja hinnat?`,
        `Missä ${business.name} sijaitsee ja miten sinne saa reittiohjeet?`,
        `Mitkä ovat ${business.name} aukioloajat?`,
      ],
      metadata: {
        webmcpManifestUrl: new URL("/.well-known/webmcp.json", business.url).href,
        llmsTxtUrl: new URL("/llms.txt", business.url).href,
      },
    },
  ],
} as const;
