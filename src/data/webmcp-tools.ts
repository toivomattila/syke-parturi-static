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
    name: "get_opening_hours",
    description: "Hakee Syke Parturin aukioloajat.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_directions_link",
    description: "Hakee Google Maps -reittiohjelinkin Syke Parturiin.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
] as const;
