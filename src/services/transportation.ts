
// Service to handle flight data from SerpAPI
import { format } from "date-fns";

// Helper to format date for SerpAPI (YYYY-MM-DD format)
const formatDateForApi = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

// Get API key from localStorage
const getApiKey = () => {
  return localStorage.getItem("serpapi_key") || import.meta.env.VITE_SERP_API_KEY;
};

export const getFlightData = async (source: string, destination: string, date: Date) => {
  // Get API key from localStorage
  const serpApiKey = getApiKey();
  
  if (!serpApiKey) {
    throw new Error("No SerpAPI key found. Please set up your SerpAPI key to get real-time flight information.");
  }
  
  // Build the SerpAPI URL
  const formattedDate = formatDateForApi(date);
  const url = `https://serpapi.com/search.json?engine=google_flights&type=2&departure_id=${source}&arrival_id=${destination}&outbound_date=${formattedDate}&currency=USD&hl=en&api_key=${serpApiKey}`;
  
  console.log(`Fetching flight data for ${source} to ${destination} on ${formattedDate}`);
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`SerpAPI error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
};
