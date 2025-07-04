# 🧠 AI Code Assistant - VS Code Extension

This is a fully functional **Visual Studio Code extension** built as part of an internship assignment by **Intershala (CodingJr)**. The extension integrates a React-based AI chat interface within VS Code, allowing developers to ask coding-related questions, attach files using `@filename` mentions, and get intelligent code suggestions using Gemini AI.

## ✨ Features

- ✅ **React Chat UI in WebView**  
  A smooth, modern React interface inside VS Code with scrolling message history and clean layout.

- 📄 **File Mentions with `@` Syntax**  
  Type `@` to view and select files from your current workspace — supports both code and images.

- 🤖 **AI Code Generation (Gemini API)**  
  Automatically generates, explains, or improves code based on user queries or file content.

- 🛠 **Context-Aware Responses**  
  Sends file content along with user prompts for smarter answers.

## 📸 Demo

> 💡 _Insert a link to your demo video (Google Drive, Loom, or YouTube) here._

## 🚀 Tech Stack

| Layer        | Tech                     |
|--------------|--------------------------|
| Extension    | TypeScript + Node.js     |
| Chat UI      | React + Vite             |
| AI Backend   | Gemini (Google AI Model) |
| APIs Used    | VS Code Extension & WebView API |

## 📁 Project Structure

ai-code-assistant-vscode-extension/
├── extension.ts # VS Code entry point
├── aiServise.ts # Gemini AI interaction
├── webview-ui/ # React frontend
│ ├── src/
│ │ └── App.tsx # Main chat interface
│ └── index.html # WebView HTML entry
└── utils/fileUtils.ts # File system access logic 


## 🛠 Installation

1. Clone the repo  
   `git clone https://github.com/your-username/ai-code-assistant-vscode-extension.git`

2. Install dependencies  
   ```bash
   npm install
   cd webview-ui && npm install

Build frontend

bash
Copy
Edit
npm run build:webview
Build backend

bash
Copy
Edit
npm run build
Open in VS Code → Run Extension
Press F5 to launch the extension in a new VS Code window.

🧪 Usage
Use Ctrl+Shift+P → “Open AI Code Chat”

Type any coding question or use @filename syntax to attach a file from workspace

📌 Assignment Info
This project was developed as a submission for an internship assignment provided by CodingJr via Internshala, requiring an AI-based assistant with file awareness in a VS Code extension.

📧 Submission
Submitted to: vikas@codingjr.online
GitHub: https://github.com/your-username
Phone: +91-XXXXXXXXXX
