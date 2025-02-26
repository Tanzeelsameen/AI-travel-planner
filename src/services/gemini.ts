
import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => localStorage.getItem('geminiApiKey');

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

    const prompt = `As an expert travel planner, create a detailed travel itinerary in markdown format with the following details:
    - From: ${source}
    - To: ${destination}
    - Dates: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}
    - Budget: $${budget}
    - Number of Travelers: ${travelers}
    - Interests: ${interests}

    Please provide a well-formatted markdown response with:

    # Trip Overview
    [Brief overview of the trip]

    # Day-by-Day Itinerary
    [Detailed daily schedule]

    # Accommodations
    [Recommended places to stay within budget]

    # Must-Visit Attractions
    [Key attractions based on interests]

    # Local Food Guide
    [Food recommendations and notable restaurants]

    # Transportation Tips
    [How to get around]

    # Cost Breakdown
    [Estimated expenses in a clear format]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw new Error("Failed to generate travel plan. Please try again.");
  }
}

export const setApiKey = (key: string) => {
  localStorage.setItem('geminiApiKey', key);
}

export const hasApiKey = () => {
  return !!getApiKey();
}
