
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateTravelPlan = async (
  source: string,
  destination: string,
  startDate: Date,
  endDate: Date,
  budget: string,
  travelers: string,
  interests: string
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `As an expert travel planner, create a detailed travel itinerary with the following details:
    - From: ${source}
    - To: ${destination}
    - Dates: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}
    - Budget: $${budget}
    - Number of Travelers: ${travelers}
    - Interests: ${interests}

    Please provide:
    1. A day-by-day itinerary
    2. Recommended accommodations within budget
    3. Must-visit attractions based on interests
    4. Local food recommendations
    5. Transportation tips
    6. Estimated costs breakdown`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw new Error("Failed to generate travel plan. Please try again.");
  }
}
