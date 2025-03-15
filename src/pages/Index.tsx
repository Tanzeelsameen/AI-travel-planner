
import { useState } from "react";
import { TravelForm, type TravelFormData } from "@/components/TravelForm";
import { TravelPlan } from "@/components/TravelPlan";
import { generateTravelPlan, hasApiKey } from "@/services/gemini";
import { useToast } from "@/components/ui/use-toast";
import { ApiKeyForm } from "@/components/ApiKeyForm";

const Index = () => {
  const [travelPlan, setTravelPlan] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async (data: TravelFormData) => {
    try {
      setIsLoading(true);
      setDestination(data.destination);
      const plan = await generateTravelPlan(
        data.source,
        data.destination,
        data.startDate!,
        data.endDate!,
        data.budget,
        data.travelers,
        data.interests
      );
      setTravelPlan(plan);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            AI Travel Planner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your perfect trip with our AI-powered travel assistant. Just tell us your preferences, and we'll create a personalized itinerary for you.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {!hasApiKey() ? (
            <ApiKeyForm />
          ) : (
            <>
              <TravelForm onSubmit={handleSubmit} isLoading={isLoading} />
              {travelPlan && (
                <TravelPlan 
                  plan={travelPlan} 
                  destination={destination}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
