
import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => import.meta.env.VITE_GEMINI_API_KEY;

export const generateTravelPlan = async (
  source: string,
  destination: string,
  startDate: Date,
  endDate: Date,
  budget: string,
  travelers: string,
  interests: string
) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Please enter your Gemini API key in the settings");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Calculate the duration of the trip
    const tripDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

    const prompt = `As an expert travel planner, create a detailed travel itinerary in markdown format with the following details:
    - From: ${source}
    - To: ${destination}
    - Dates: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()} (${tripDays} days)
    - Budget: $${budget}
    - Number of Travelers: ${travelers}
    - Interests: ${interests}

    Please provide a well-formatted markdown response with:

    # Trip Overview
    [Brief overview of the trip to ${destination}]

    # Day-by-Day Itinerary
    [Detailed daily schedule for ${tripDays} days in ${destination}]

    # Accommodations
    [Recommended places to stay within budget of $${budget}]

    # Must-Visit Attractions
    [Key attractions in ${destination} based on interests: ${interests}]

    # Local Food Guide
    [Food recommendations and notable restaurants in ${destination}]

    # Transportation Tips
    [How to get around in ${destination}]

    # Cost Breakdown
    [Estimated expenses in a clear format, ensuring the total stays within $${budget}]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw new Error("Failed to generate travel plan. Please try again.");
  }
}

export const generateChatResponse = async (message: string, travelPlan: string) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Please enter your Gemini API key in the settings");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a helpful travel assistant. The user has received the following travel plan and is asking a follow-up question. 
    
    Here is the travel plan that was generated earlier:
    
    ${travelPlan}
    
    The user's question is: "${message}"
    
    Please provide a helpful, informative, and concise response to their question, using the information in the travel plan where possible. If you don't know the answer to something not covered in the plan, you can suggest alternatives or provide general travel advice instead.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
}

export const setApiKey = (key: string) => {
  localStorage.setItem('geminiApiKey', key);
}

export const hasApiKey = () => {
  return !!getApiKey();
}
