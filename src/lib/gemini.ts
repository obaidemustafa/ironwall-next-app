// This file is kept for backward compatibility
// The actual Gemini API calls are now made through the backend via ChatContext.tsx

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export async function generateResponse(
    userMessage: string,
    history: { role: "user" | "model"; parts: string }[] = []
): Promise<string> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage, history }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "API request failed");
        }

        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I apologize, but I encountered an error communicating with the AI service. Please try again later.";
    }
}
