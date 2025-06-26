// src/vscode.ts
export const vscode = typeof acquireVsCodeApi === "function"
  ? acquireVsCodeApi()
  : {
      postMessage: () => {}, // dummy fallback
    };
