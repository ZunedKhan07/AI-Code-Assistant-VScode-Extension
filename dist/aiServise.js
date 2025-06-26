var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
}
else {
    console.error("❌ .env not found");
}
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey)
    throw new Error("❌ GEMINI_API_KEY is missing");
const genAI = new GoogleGenerativeAI(apiKey);
export function askGemini(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
            const result = yield model.generateContent(prompt);
            const response = result.response;
            return response.text();
        }
        catch (err) {
            console.error("Gemini Error:", err);
            return "❌ Failed to fetch response.";
        }
    });
}
