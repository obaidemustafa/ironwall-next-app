import { useRef, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  X,
  Minimize2,
  Send,
  Bot,
  User,
  Maximize2,
  Loader2,
  Sparkles,
} from "lucide-react";

export const AIChatbot = () => {
  const {
    isOpen,
    isMinimized,
    messages,
    isLoading,
    closeChat,
    minimizeChat,
    maximizeChat,
    sendMessage,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputRef.current?.value.trim();
    if (!text) return;

    sendMessage(text);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (!isOpen) return null;

  // Minimized State (Floating Action Button)
  if (isMinimized) {
    return (
      <div className="fixed bottom-8 right-8 z-[100] animate-in fade-in zoom-in duration-300">
        <Button
          onClick={maximizeChat}
          className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] border-2 border-white/20 relative group"
        >
          <div className="absolute inset-0 rounded-full animate-ping bg-indigo-400 opacity-20 duration-1000" />
          <MessageSquare className="h-8 w-8 relative z-10" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
          </span>
        </Button>
      </div>
    );
  }

  // Full Screen / Expanded State
  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      {/* Main Container */}
      <div className="w-full h-full max-w-5xl bg-card/50 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
        {/* Ambient Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-violet-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-1000" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/40 bg-card/60 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/20">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                IronWall Intelligence
              </h2>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs text-foreground/60 font-medium">
                  System Online
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="icon"
              onClick={minimizeChat}
              className="rounded-xl h-10 w-10 bg-white/5 hover:bg-white/10 border border-white/10"
              title="Minimize"
            >
              <Minimize2 className="h-5 w-5" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={closeChat}
              className="rounded-xl h-10 w-10 hover:bg-red-500/80"
              title="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex gap-4 max-w-[85%] md:max-w-[75%] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards",
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-lg border border-white/5",
                  msg.role === "user"
                    ? "bg-gradient-to-br from-slate-700 to-slate-900"
                    : "bg-gradient-to-br from-violet-600 to-indigo-600"
                )}
              >
                {msg.role === "user" ? (
                  <User className="h-5 w-5 text-zinc-300" />
                ) : (
                  <Bot className="h-5 w-5 text-white" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={cn(
                  "p-5 rounded-3xl text-sm md:text-base leading-relaxed whitespace-pre-wrap shadow-sm backdrop-blur-sm",
                  msg.role === "user"
                    ? "bg-zinc-800/80 text-zinc-100 rounded-tr-md border border-white/5"
                    : "bg-white/5 text-zinc-100 rounded-tl-md border border-white/10"
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 mr-auto max-w-[75%] animate-in fade-in">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl rounded-tl-md p-5 flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                <span className="text-sm text-foreground/60">
                  Analyzing request...
                </span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-border/40 bg-card/60 backdrop-blur-xl">
          <form
            onSubmit={handleSend}
            className="relative flex items-center gap-4 max-w-4xl mx-auto w-full"
          >
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
              <Input
                ref={inputRef}
                placeholder="Ask IronWall AI..."
                className="relative h-14 pl-6 pr-6 bg-background/80 border-border/50 rounded-2xl focus-visible:ring-0 focus-visible:border-indigo-500/50 text-base shadow-inner"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              size="icon"
              className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105"
              disabled={isLoading}
            >
              <Send className="h-6 w-6" />
            </Button>
          </form>
          <p className="text-center text-[10px] text-foreground/30 mt-3">
            AI responses may vary. Double-check important vulnerability data.
          </p>
        </div>
      </div>
    </div>
  );
};
