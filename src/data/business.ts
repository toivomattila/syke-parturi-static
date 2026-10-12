export const business = {
  name: "Syke Parturi",
  url: "https://sykeparturi.datato.fi/",
  address: {
    street: "Kauppakatu 18",
    postalCode: "15140",
    locality: "Lahti",
    country: "FI",
  },
  phone: {
    display: "050 380 3388",
    href: "tel:+358503803388",
    international: "+358503803388",
  },
  businessId: "3593342-5",
  openingHours: "Aukioloajat: soita ja kysy",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Kauppakatu+18%2C+15140+Lahti",
  services: [
    { name: "Hiustenleikkuu", price: 20, currency: "EUR" },
    { name: "Parranajo / parran muotoilu", price: 15, currency: "EUR" },
  ],
} as const;

export const webmcpTools = [
  {
    name: "get_services_and_prices",
    description: "Hakee Syke Parturin palvelut ja hinnat.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_location_and_contact",
    description: "Hakee Syke Parturin osoitteen, puhelinnumeron, Y-tunnuksen ja aukioloaikatiedon.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_directions_link",
    description: "Hakee Google Maps -reittiohjelinkin Syke Parturiin.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
] as const;

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
      ],
      metadata: {
        webmcpManifestUrl: new URL("/.well-known/webmcp.json", business.url).href,
        llmsTxtUrl: new URL("/llms.txt", business.url).href,
      },
    },
  ],
} as const;
