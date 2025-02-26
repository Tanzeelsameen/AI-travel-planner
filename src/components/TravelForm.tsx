
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./DatePicker";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export interface TravelFormData {
  source: string;
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  budget: string;
  travelers: string;
  interests: string;
}

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => Promise<void>;
  isLoading: boolean;
}

export const TravelForm = ({ onSubmit, isLoading }: TravelFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<TravelFormData>({
    source: "",
    destination: "",
    startDate: undefined,
    endDate: undefined,
    budget: "",
    travelers: "",
    interests: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.source || !formData.destination || !formData.startDate || 
        !formData.endDate || !formData.budget || !formData.travelers || !formData.interests) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    await onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl p-6 space-y-6 backdrop-blur-sm bg-white/30 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="source">Source Location</Label>
            <Input
              id="source"
              placeholder="Enter your starting point"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="Where do you want to go?"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="bg-white/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <DatePicker
              date={formData.startDate}
              onSelect={(date) => setFormData({ ...formData, startDate: date })}
            />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <DatePicker
              date={formData.endDate}
              onSelect={(date) => setFormData({ ...formData, endDate: date })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (USD)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="Enter your budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="travelers">Number of Travelers</Label>
            <Input
              id="travelers"
              type="number"
              placeholder="How many people?"
              value={formData.travelers}
              onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
              className="bg-white/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests">Interests</Label>
          <Input
            id="interests"
            placeholder="e.g., adventure, culture, food, nature"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            className="bg-white/50"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Plan...
            </>
          ) : (
            "Plan My Trip"
          )}
        </Button>
      </form>
    </Card>
  );
};
