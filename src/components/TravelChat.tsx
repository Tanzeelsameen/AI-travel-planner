import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateChatResponse } from "@/services/gemini";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface TravelChatProps {
  destination: string;
  travelPlan: string;
}

const convertLinksToHtml = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+\.[^\s]+)/g;
  
  return text.replace(urlPattern, (url) => {
    const href = url.startsWith('www.') ? `https://${url}` : url;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${url}</a>`;
  });
};

export const TravelChat = ({ destination, travelPlan }: TravelChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (travelPlan && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `I've created your travel plan to ${destination}. Feel free to ask me any questions about your trip!`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [travelPlan, destination, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      const response = await generateChatResponse(inputMessage, travelPlan);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mt-6 backdrop-blur-sm bg-white/30 shadow-xl flex flex-col">
      <div className="p-4 border-b flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-emerald-600" />
        <h2 className="font-semibold text-lg">Travel Assistant</h2>
      </div>

      <ScrollArea className="flex-1 p-4 h-[300px]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-2 max-w-[80%] rounded-lg p-3",
                message.role === "user"
                  ? "ml-auto bg-emerald-100 text-emerald-900"
                  : "bg-gray-100"
              )}
            >
              <div>
                <div 
                  className="text-sm"
                  dangerouslySetInnerHTML={{ 
                    __html: message.role === "assistant" 
                      ? convertLinksToHtml(message.content)
                      : message.content 
                  }}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 bg-gray-100 max-w-[80%] rounded-lg p-3">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
              <span className="text-sm">Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t flex items-center gap-2"
      >
        <Input
          placeholder="Ask about your trip..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 bg-white/50"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </Card>
  );
};
