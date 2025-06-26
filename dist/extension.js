var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { askGemini } from "./aiServise.js";
import { getAllWorkspaceFiles } from "./utils/fileUtils.js";
export function activate(context) {
    const commandId = "extension.openChat";
    const disposable = vscode.commands.registerCommand(commandId, () => {
        const panel = vscode.window.createWebviewPanel("aiChat", "AI Code Assistant", vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath, "webview-ui", "dist")),
            ],
        });
        // 🔁 Handle messages from WebView
        panel.webview.onDidReceiveMessage((message) => __awaiter(this, void 0, void 0, function* () {
            if (message.command === "askGemini") {
                const reply = yield askGemini(message.text);
                panel.webview.postMessage({ type: "bot-response", text: reply });
            }
            if (message.command === "getFiles") {
                const files = yield getAllWorkspaceFiles();
                panel.webview.postMessage({ type: "file-suggestions", files });
            }
            if (message.command === "askWithFile") {
                try {
                    const filePath = vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, message.filename);
                    const fileContent = fs.readFileSync(filePath.fsPath, "utf8");
                    const prompt = `Here is the content of file "${message.filename}":\n\n${fileContent}\n\nNow answer the following question:\n${message.question}`;
                    const reply = yield askGemini(prompt);
                    panel.webview.postMessage({ type: "bot-response", text: reply });
                }
                catch (err) {
                    panel.webview.postMessage({ type: "bot-response", text: "❌ Error reading file." });
                }
            }
        }));
        // ✅ Load React WebView Manually
        const distPath = path.join(context.extensionPath, "webview-ui", "dist");
        const assetsPath = path.join(distPath, "assets");
        const files = fs.readdirSync(assetsPath);
        const jsFile = files.find(f => f.endsWith(".js"));
        const cssFile = files.find(f => f.endsWith(".css"));
        const scriptUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(assetsPath, jsFile)));
        const styleUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(assetsPath, cssFile)));
        // ✅ Inject HTML manually
        panel.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AI Code Assistant</title>
          <link rel="stylesheet" href="${styleUri}">
        </head>
        <body>
          <div id="root"></div>
          <script>
            const vscode = acquireVsCodeApi();
          </script>
          <script type="module" src="${scriptUri}"></script>
        </body>
      </html>
    `;
    });
    context.subscriptions.push(disposable);
}
export function deactivate() { }
