import type { webmcpTools } from "../data/webmcp-tools";

type WebmcpToolName = (typeof webmcpTools)[number]["name"];

export function initWebmcp(
  toolText: Record<WebmcpToolName, string>,
  tools: typeof webmcpTools,
): void {
  const mc = document.modelContext ?? navigator.modelContext;
  let initialized = false;

  if (mc && !initialized) {
    initialized = true;
    for (const tool of tools) {
      try {
        const registration = mc.registerTool({
          ...tool,
          annotations: { readOnlyHint: true },
          execute: () => ({ content: [{ type: "text", text: toolText[tool.name] }] }),
        });
        void Promise.resolve(registration).catch(() => {});
      } catch {
        // A failing registration must not prevent the remaining tools from loading.
      }
    }
  }
}
