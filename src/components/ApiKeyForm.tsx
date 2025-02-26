
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { setApiKey, hasApiKey } from "@/services/gemini";
import { useToast } from "@/components/ui/use-toast";

export const ApiKeyForm = () => {
  const [apiKey, setApiKeyValue] = useState("");
  const { toast } = useToast();
  const [isSet, setIsSet] = useState(hasApiKey());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(apiKey);
    setIsSet(true);
    toast({
      title: "Success",
      description: "API key has been saved",
    });
  };

  return (
    <Card className="w-full max-w-2xl p-6 space-y-6 backdrop-blur-sm bg-white/30 shadow-xl">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Gemini API Key Setup</h2>
          <p className="text-sm text-gray-600">
            To use the AI Travel Planner, you need to provide your Gemini API key.
            Get your API key from{" "}
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Gemini API key"
              value={apiKey}
              onChange={(e) => setApiKeyValue(e.target.value)}
              className="bg-white/50"
            />
          </div>
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
          >
            Save API Key
          </Button>
        </form>
      </div>
    </Card>
  );
};
