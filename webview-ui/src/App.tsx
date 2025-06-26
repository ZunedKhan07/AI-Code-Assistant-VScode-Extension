import React, { useEffect, useState } from "react";
import { MessageFromExtension } from "./types";
import { vscode } from "./vscode"; // ✅ Safe import

function App() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [fileSuggestions, setFileSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data as MessageFromExtension;

      if (message.type === "bot-response") {
        setMessages((prev) => [...prev, { sender: "ai", text: message.text }]);
      }

      if (message.type === "file-suggestions") {
        setFileSuggestions(message.files);
        setShowSuggestions(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.endsWith("@")) {
      vscode.postMessage({ command: "getFiles" });
    }
  };

  const handleFileSelect = (file: string) => {
    const updatedInput = input.replace(/@$/, file);
    setInput(updatedInput);
    setShowSuggestions(false);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const match = input.match(/^@(.+)\s(.+)/);
    if (match) {
      const filename = match[1];
      const question = match[2];
      vscode.postMessage({ command: "askWithFile", filename, question });
    } else {
      vscode.postMessage({ command: "askGemini", text: input });
    }

    setInput("");
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "1rem" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Ask something... or type @ to search file"
        style={{ width: "80%", padding: "8px" }}
      />

      <button onClick={sendMessage} style={{ padding: "8px", marginLeft: "8px" }}>
        Send
      </button>

      {showSuggestions && (
        <div
          style={{
            background: "#eee",
            padding: "10px",
            marginTop: "5px",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          <strong>Suggested Files:</strong>
          {fileSuggestions.map((file, index) => (
            <div
              key={index}
              onClick={() => handleFileSelect(file)}
              style={{ cursor: "pointer", margin: "4px 0" }}
            >
              @{file}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
