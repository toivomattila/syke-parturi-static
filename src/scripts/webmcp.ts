import { business, openingHoursText, webmcpTools } from "../data/business";

const mc = document.modelContext ?? navigator.modelContext;

if (mc) {
  try {
    const toolText: Record<(typeof webmcpTools)[number]["name"], string> = {
      get_services_and_prices: business.services
        .map((service) => `${service.name}: ${service.price} €`)
        .join("\n"),
      get_location_and_contact: [
        business.name,
        `${business.address.street}, ${business.address.postalCode} ${business.address.locality}`,
        `Puhelin: ${business.phone.display}`,
        `Y-tunnus: ${business.businessId}`,
        openingHoursText,
      ].join("\n"),
      get_opening_hours: openingHoursText,
      get_directions_link: business.directionsUrl,
    };

    for (const tool of webmcpTools) {
      const registration = mc.registerTool({
        ...tool,
        annotations: { readOnlyHint: true },
        execute: () => ({ content: [{ type: "text", text: toolText[tool.name] }] }),
      });
      void Promise.resolve(registration).catch(() => {});
    }
  } catch {}
}
