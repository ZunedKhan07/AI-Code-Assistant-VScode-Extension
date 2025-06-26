import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export async function getAllWorkspaceFiles(): Promise<string[]> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) return [];

  const rootPath = workspaceFolders[0].uri.fsPath;
  const files: string[] = [];

  function walk(dir: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) walk(fullPath);
      else files.push(path.relative(rootPath, fullPath).replace(/\\/g, "/"));
    }
  }

  walk(rootPath);
  return files;
}
