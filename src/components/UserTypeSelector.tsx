import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Briefcase, Check } from "lucide-react";

interface UserTypeSelectorProps {
  onSelect: (type: 'student' | 'professional') => void;
}

export const UserTypeSelector = ({ onSelect }: UserTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<'student' | 'professional' | null>(null);

  const handleSelect = (type: 'student' | 'professional') => {
    setSelectedType(type);
    onSelect(type);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-card border-border shadow-xl animate-scale-in">
        <div className="p-8 text-center">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 rounded-full w-16 h-16 mx-auto mb-6 shadow-glow">
            <Briefcase className="w-8 h-8 text-primary-foreground mx-auto" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-4">Welcome to Financia</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Help us personalize your financial experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Option */}
            <Button
              onClick={() => handleSelect('student')}
              variant="outline"
              className={`h-32 flex-col bg-muted/20 hover:bg-muted/40 border-2 transition-all duration-300 ${
                selectedType === 'student' 
                  ? 'border-primary bg-primary/10 shadow-glow' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <GraduationCap className="w-8 h-8 text-primary" />
                {selectedType === 'student' && (
                  <Check className="w-6 h-6 text-primary" />
                )}
              </div>
              <div className="text-left w-full">
                <h3 className="font-semibold text-foreground text-lg mb-1">Student</h3>
                <p className="text-sm text-muted-foreground">
                  Learning about finance, investments, and market fundamentals
                </p>
              </div>
            </Button>

            {/* Professional Option */}
            <Button
              onClick={() => handleSelect('professional')}
              variant="outline"
              className={`h-32 flex-col bg-muted/20 hover:bg-muted/40 border-2 transition-all duration-300 ${
                selectedType === 'professional' 
                  ? 'border-primary bg-primary/10 shadow-glow' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <Briefcase className="w-8 h-8 text-primary" />
                {selectedType === 'professional' && (
                  <Check className="w-6 h-6 text-primary" />
                )}
              </div>
              <div className="text-left w-full">
                <h3 className="font-semibold text-foreground text-lg mb-1">Professional</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced financial analysis, trading strategies, and market insights
                </p>
              </div>
            </Button>
          </div>

          {selectedType && (
            <div className="mt-8 animate-fade-in">
              <p className="text-primary font-medium">
                Great choice! Your experience will be tailored for {selectedType === 'student' ? 'learning' : 'professional analysis'}.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};