import { initWebmcp } from "./webmcp-init";
import type { webmcpTools } from "../data/webmcp-tools";

type WebmcpToolName = (typeof webmcpTools)[number]["name"];

type WebmcpPayload = {
  toolText: Record<WebmcpToolName, string>;
  tools: typeof webmcpTools;
};

function readPayload(): WebmcpPayload | null {
  const element = document.getElementById("webmcp-payload");
  if (!element?.textContent) return null;
  return JSON.parse(element.textContent) as WebmcpPayload;
}

const payload = readPayload();
if (payload) {
  initWebmcp(payload.toolText, payload.tools);
}
