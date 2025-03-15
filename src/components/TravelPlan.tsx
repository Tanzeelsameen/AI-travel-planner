
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "markdown-to-jsx";
import { TravelChat } from "@/components/TravelChat";

interface TravelPlanProps {
  plan: string;
  destination?: string;
}

export const TravelPlan = ({ 
  plan, 
  destination = ""
}: TravelPlanProps) => {
  return (
    <div className="w-full space-y-6">
      <Card className="w-full max-w-2xl p-6 backdrop-blur-sm bg-white/30 shadow-xl">
        <ScrollArea className="h-[500px] pr-4">
          <div className="prose prose-emerald max-w-none">
            <Markdown>{plan}</Markdown>
          </div>
        </ScrollArea>
      </Card>
      
      {/* Add the chat component */}
      <TravelChat destination={destination} travelPlan={plan} />
    </div>
  );
};
