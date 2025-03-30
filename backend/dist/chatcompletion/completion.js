"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatCompl = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const key = process.env.OPENAI_API_KEY;
const openai = new openai_1.default({
    apiKey: key
});
// will export this function and use this in the route where this will act as the assistant 
const chatCompl = async (content) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant for summarizing information." },
                { role: "user", content: content },
            ],
            model: "gpt-4o",
            max_tokens: 500,
            store: true
        });
        return completion.choices[0];
    }
    catch (e) {
        console.log("Error generating completion", e);
        throw new Error("Failed to generate summary.");
    }
};
exports.chatCompl = chatCompl;
