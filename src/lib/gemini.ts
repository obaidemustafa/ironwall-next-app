import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Fallback or error if key is missing (handled gracefully in UI usually)
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// System prompt defining the assistant's persona
const SYSTEM_PROMPT = `
You are the AI Assistant for IronWall, a cutting-edge cybersecurity research platform designed to detect chained vulnerabilities in real-world C/C++ systems.
Your goal is to assist users ("Researchers") in understanding the platform, analyzing basic vulnerability concepts, and navigating the IronWall console.

Key Platform Features you should know:
- **Discovery Monitor**: Real-time tracking of potential vulnerabilities.
- **Scan History**: Logs of past campaigns and their results.
- **Reports**: Detailed analysis of findings.
- **New Campaign**: Area to launch new fuzzing/analysis tasks (supported engines: AFL++, angr).
- **Active Campaigns**: Currently running tasks (e.g., openssl-heap-analysis).

Tone: Professional, Technical, Secure, and Helpful.
Constraint: Do not provide code to exploit systems maliciously outside of the context of authorized research and defense.
`;

export async function generateResponse(
    userMessage: string,
    history: { role: "user" | "model"; parts: string }[] = []
): Promise<string> {
    if (!genAI) {
        return "Error: VITE_GEMINI_API_KEY is missing in environment variables.";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // We can use the chat capability of Gemini for history
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am the IronWall AI Assistant. How can I help you today?" }],
                },
                ...history.map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.parts }]
                }))
            ],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I apologize, but I encountered an error communicating with the AI service. Please try again later.";
    }
}
