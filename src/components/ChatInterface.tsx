import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatInterfaceProps {
  historyOpen: boolean;
}

export const ChatInterface = ({ historyOpen }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Financia, your AI financial assistant. How can I help you with your financial queries today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're asking about financial matters. Let me help you with that information.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div 
      className={`flex-1 flex flex-col bg-chat border-r border-border transition-all duration-300 ${
        historyOpen ? "ml-80" : "ml-0"
      }`}
    >
      {/* Chat Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-3 rounded-full mr-4 shadow-lg">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Financia</h1>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div className={`p-2 rounded-full ${
                message.sender === "user" 
                  ? "bg-secondary" 
                  : "bg-gradient-to-r from-primary to-primary/80 shadow-glow"
              }`}>
                {message.sender === "user" ? (
                  <User className="w-5 h-5 text-secondary-foreground" />
                ) : (
                  <Bot className="w-5 h-5 text-primary-foreground" />
                )}
              </div>
              
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-secondary text-secondary-foreground ml-12"
                    : "bg-muted/30 text-foreground mr-12 border border-border/50"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-6 border-t border-border bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Financia about markets, investments, or financial advice..."
                className="min-h-[60px] max-h-32 resize-none bg-background border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-glow p-3 rounded-xl"
              disabled={!inputMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};