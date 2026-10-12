import { business, webmcpTools } from "../../data/business";
import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
  const manifest = {
    name: business.name,
    url: business.url,
    version: "1.0.0",
    tools: webmcpTools.map((tool) => ({
      ...tool,
      annotations: { readOnlyHint: true },
    })),
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
