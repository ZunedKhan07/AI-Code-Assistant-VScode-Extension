// src/vscode.ts
let instance: ReturnType<typeof acquireVsCodeApi> | null = null;

export const vscode =
  typeof acquireVsCodeApi === "function"
    ? (instance ??= acquireVsCodeApi())
    : {
        postMessage: () => {},
        setState: () => {},
        getState: () => {},
      };
