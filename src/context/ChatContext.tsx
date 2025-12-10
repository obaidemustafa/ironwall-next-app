import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

interface Message {
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

interface ChatContextType {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  isLoading: boolean;
  openChat: () => void;
  closeChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearHistory: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize from localStorage or default
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("ironwall_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    }
    return [
      {
        role: "model",
        text: "Hello! I'm the IronWall AI. How can I assist you with your vulnerability research today?",
        timestamp: new Date(),
      },
    ];
  });

  // Save to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem("ironwall_chat_history", JSON.stringify(messages));
  }, [messages]);

  // Helper to convert internal messages to API history format
  const getHistoryForApi = () => {
    // Skip the first welcome message
    return messages
      .filter((_, index) => index > 0)
      .map((msg) => ({
        role: msg.role,
        parts: msg.text,
      }));
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const minimizeChat = () => setIsMinimized(true);
  const maximizeChat = () => setIsMinimized(false);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { role: "user", text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const historyForApi = getHistoryForApi();

      const response = await fetch(`${API_BASE_URL}/api/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text, history: historyForApi }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();

      const botMsg: Message = {
        role: "model",
        text: data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I apologize, but I encountered an error communicating with the AI service. Please ensure the backend is running and try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([
      {
        role: "model",
        text: "History cleared. How can I help?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        isMinimized,
        messages,
        isLoading,
        openChat,
        closeChat,
        minimizeChat,
        maximizeChat,
        sendMessage,
        clearHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
