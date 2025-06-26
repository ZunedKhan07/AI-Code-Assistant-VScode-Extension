import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, "../.env");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("✅ .env loaded");
} else {
  console.error("❌ .env not found");
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("❌ GEMINI_API_KEY is missing");

const genAI = new GoogleGenerativeAI(apiKey);

export async function askGemini(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (err: any) {
    console.error("Gemini Error:", err);
    return "❌ Failed to fetch response.";
  }
}
