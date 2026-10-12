import { aiCatalog } from "../../data/business";
import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(aiCatalog, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
