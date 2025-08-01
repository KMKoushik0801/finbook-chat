import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, TrendingUp, DollarSign, BarChart3, Tag, Activity } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  time: string;
}

const newsCategories = [
  { id: "finances", label: "Finances", icon: DollarSign },
  { id: "gdp", label: "GDP Changes", icon: BarChart3 },
  { id: "sales", label: "Sales", icon: TrendingUp },
  { id: "offers", label: "Offers", icon: Tag },
  { id: "sensex", label: "SENSEX", icon: Activity },
];

const newsData: Record<string, NewsItem[]> = {
  finances: [
    { id: "1", title: "Global Market Outlook", content: "Financial markets show positive momentum as quarterly earnings exceed expectations...", category: "finances", time: "2 hours ago" },
    { id: "2", title: "Fed Interest Rate Decision", content: "The Federal Reserve maintains current interest rates, signaling cautious optimism...", category: "finances", time: "4 hours ago" },
  ],
  gdp: [
    { id: "3", title: "GDP Growth Accelerates", content: "Economic indicators suggest stronger than expected GDP growth for Q4...", category: "gdp", time: "1 hour ago" },
    { id: "4", title: "Regional Economic Analysis", content: "Asia-Pacific region leads global economic recovery with robust GDP figures...", category: "gdp", time: "3 hours ago" },
  ],
  sales: [
    { id: "5", title: "Retail Sales Surge", content: "Consumer spending drives retail sales to new highs this quarter...", category: "sales", time: "30 minutes ago" },
    { id: "6", title: "E-commerce Growth", content: "Online retail continues its upward trajectory with 15% year-over-year growth...", category: "sales", time: "1 hour ago" },
  ],
  offers: [
    { id: "7", title: "Investment Opportunities", content: "New IPO offerings present attractive investment prospects for Q1...", category: "offers", time: "45 minutes ago" },
    { id: "8", title: "Bond Market Updates", content: "Government bonds offer competitive yields amid market stability...", category: "offers", time: "2 hours ago" },
  ],
  sensex: [
    { id: "9", title: "SENSEX Hits New High", content: "Indian stock market reaches record levels driven by strong corporate earnings...", category: "sensex", time: "15 minutes ago" },
    { id: "10", title: "Sectoral Performance", content: "Technology and pharmaceutical sectors lead SENSEX gains today...", category: "sensex", time: "1 hour ago" },
  ],
};

export const NewsPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsNewsOpen(true);
  };

  const closeNews = () => {
    setIsNewsOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="w-80 bg-news border-l border-border p-6 relative">
      {/* News Category Buttons */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground mb-6">Latest Updates</h2>
        {newsCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              variant="ghost"
              className="w-full justify-start bg-muted/20 hover:bg-muted/40 border-0 text-foreground rounded-lg p-4 h-auto"
            >
              <IconComponent className="w-5 h-5 mr-3 text-primary" />
              <span className="font-medium">{category.label}</span>
            </Button>
          );
        })}
      </div>

      {/* News Content Modal */}
      {isNewsOpen && selectedCategory && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-4xl max-h-[80vh] bg-card border-border animate-book-open origin-right">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground flex items-center">
                {(() => {
                  const category = newsCategories.find(c => c.id === selectedCategory);
                  const IconComponent = category?.icon || DollarSign;
                  return (
                    <>
                      <IconComponent className="w-6 h-6 mr-3 text-primary" />
                      {category?.label} News
                    </>
                  );
                })()}
              </h2>
              <Button
                onClick={closeNews}
                variant="ghost"
                size="sm"
                className="hover:bg-muted/50"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {newsData[selectedCategory]?.map((news) => (
                  <div key={news.id} className="border-b border-border/50 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground text-lg">{news.title}</h3>
                      <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                        {news.time}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{news.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};