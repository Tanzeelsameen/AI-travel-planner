
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "markdown-to-jsx";

interface TravelPlanProps {
  plan: string;
}

export const TravelPlan = ({ plan }: TravelPlanProps) => {
  return (
    <Card className="w-full max-w-2xl p-6 mt-6 backdrop-blur-sm bg-white/30 shadow-xl">
      <ScrollArea className="h-[500px] pr-4">
        <div className="prose prose-emerald max-w-none">
          <Markdown>{plan}</Markdown>
        </div>
      </ScrollArea>
    </Card>
  );
};
