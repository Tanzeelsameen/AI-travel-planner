
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export const SerpApiKeyForm = () => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("serpapi_key");
    setIsSet(!!storedKey);
    if (storedKey) {
      // Show only first 5 characters and last 4 characters for security
      const maskedKey = storedKey.substring(0, 5) + 
        "•".repeat(Math.max(0, storedKey.length - 9)) + 
        storedKey.substring(storedKey.length - 4);
      setApiKey(maskedKey);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only if the key isn't masked (i.e., it's a new key)
    if (!apiKey.includes("•")) {
      localStorage.setItem("serpapi_key", apiKey);
      
      toast({
        title: "Success",
        description: "SerpAPI key has been saved",
      });
      
      // Mask the key for display
      const maskedKey = apiKey.substring(0, 5) + 
        "•".repeat(Math.max(0, apiKey.length - 9)) + 
        apiKey.substring(apiKey.length - 4);
      setApiKey(maskedKey);
      setIsSet(true);
    }
  };

  const handleClear = () => {
    localStorage.removeItem("serpapi_key");
    setApiKey("");
    setIsSet(false);
    
    toast({
      title: "Cleared",
      description: "SerpAPI key has been removed",
    });
  };

  return (
    <Card className="w-full max-w-2xl backdrop-blur-sm bg-white/30 shadow-xl">
      <CardHeader>
        <CardTitle>SerpAPI Key Setup</CardTitle>
        <CardDescription>
          To get flight information, you need to provide a SerpAPI key.
          Get your API key from{" "}
          <a
            href="https://serpapi.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 underline"
          >
            SerpAPI Dashboard
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serpApiKey">SerpAPI Key</Label>
            <Input
              id="serpApiKey"
              type="password"
              placeholder={isSet ? "API key is saved" : "Enter your SerpAPI key"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-white/50"
            />
          </div>
          <div className="flex gap-3">
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              disabled={isSet && apiKey.includes("•")}
            >
              {isSet ? "Update API Key" : "Save API Key"}
            </Button>
            {isSet && (
              <Button 
                type="button"
                onClick={handleClear}
                variant="outline"
                className="bg-white/50"
              >
                Clear
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
