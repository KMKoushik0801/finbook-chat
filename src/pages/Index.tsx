import { useState } from "react";
import { HistorySidebar } from "@/components/HistorySidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { NewsPanel } from "@/components/NewsPanel";
import { UserTypeSelector } from "@/components/UserTypeSelector";

const Index = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [userType, setUserType] = useState<'student' | 'professional' | null>(null);

  const toggleHistory = () => {
    setHistoryOpen(!historyOpen);
  };

  const handleUserTypeSelect = (type: 'student' | 'professional') => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 overflow-hidden">
      {/* User Type Selection Modal */}
      {!userType && (
        <UserTypeSelector onSelect={handleUserTypeSelect} />
      )}

      {/* Main Layout */}
      <div className="flex h-screen">
        {/* History Sidebar */}
        <HistorySidebar isOpen={historyOpen} onToggle={toggleHistory} />

        {/* Chat Interface */}
        <ChatInterface historyOpen={historyOpen} />

        {/* News Panel */}
        <NewsPanel />
      </div>
    </div>
  );
};

export default Index;
