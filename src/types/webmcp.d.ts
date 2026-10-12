interface WebMCPTextResult {
  content: Array<{ type: "text"; text: string }>;
}

interface WebMCPToolRegistration {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, never>;
    additionalProperties: false;
  };
  annotations: { readOnlyHint: true };
  execute: () => WebMCPTextResult;
}

interface WebMCPModelContext {
  registerTool(tool: WebMCPToolRegistration): void | Promise<void>;
}

interface Document {
  modelContext?: WebMCPModelContext;
}

interface Navigator {
  modelContext?: WebMCPModelContext;
}
