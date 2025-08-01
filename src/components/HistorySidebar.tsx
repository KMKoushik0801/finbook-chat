import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatHistory {
  id: string;
  title: string;
  date: string;
}

interface HistorySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HistorySidebar = ({ isOpen, onToggle }: HistorySidebarProps) => {
  const [chatHistory] = useState<ChatHistory[]>([
    { id: "1", title: "Market Analysis Q3", date: "2 hours ago" },
    { id: "2", title: "SENSEX Predictions", date: "1 day ago" },
    { id: "3", title: "GDP Growth Discussion", date: "3 days ago" },
    { id: "4", title: "Investment Strategies", date: "1 week ago" },
    { id: "5", title: "Crypto Market Trends", date: "2 weeks ago" },
  ]);

  return (
    <>
      {/* History Toggle Button */}
      <Button
        onClick={onToggle}
        variant="ghost"
        className="fixed top-4 left-4 z-50 bg-sidebar-bg border-0 text-foreground hover:bg-muted/50 rounded-lg px-4 py-2"
      >
        History
      </Button>

      {/* History Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-sidebar-bg border-r border-border transition-all duration-300 z-40 ${
          isOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full"
        }`}
      >
        {isOpen && (
          <div className="p-6 pt-16">
            <h2 className="text-lg font-semibold text-foreground mb-6">Previous Discussions</h2>
            
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-3">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors border border-border/50"
                  >
                    <h3 className="font-medium text-foreground text-sm mb-1">
                      {chat.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{chat.date}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </>
  );
};