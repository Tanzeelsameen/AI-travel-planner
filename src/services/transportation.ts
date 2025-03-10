
// Service to handle flight data from SerpAPI
import { addDays, format } from "date-fns";

// Helper to format date for SerpAPI (YYYY-MM-DD format)
const formatDateForApi = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

// Get API key from localStorage
const getApiKey = () => {
  return localStorage.getItem("serpapi_key") || import.meta.env.VITE_SERP_API_KEY;
};

export const getFlightData = async (source: string, destination: string, date: Date) => {
  try {
    // Get API key from localStorage - if not set, use mock data
    const serpApiKey = getApiKey();
    
    if (!serpApiKey) {
      console.log("No SerpAPI key found, using mock data");
      return getMockFlightData(source, destination, date);
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
  } catch (error) {
    console.error("Error fetching flight data:", error);
    // Fall back to mock data if there's an error
    console.log("Falling back to mock data due to error");
    return getMockFlightData(source, destination, date);
  }
};

// Mock data function for fallback with dynamic source and destination
const getMockFlightData = (source: string, destination: string, date: Date) => {
  const formattedDate = formatDateForApi(date);
  const nextDayDate = addDays(date, 1);
  const formattedNextDay = formatDateForApi(nextDayDate);
  
  const departureTime = "17:05";
  const arrivalTime = "22:45";
  const nextDayDepartureTime = "07:00";
  const nextDayArrivalTime = "08:45";
  
  return {
    "best_flights": [
      {
        "flights": [
          {
            "departure_airport": {
              "name": `${source} International Airport`,
              "id": source,
              "time": `${formattedDate} ${departureTime}`
            },
            "arrival_airport": {
              "name": "Transit Airport",
              "id": "DMK",
              "time": `${formattedDate} ${arrivalTime}`
            },
            "duration": 250,
            "airplane": "Airbus A330",
            "airline": "Transit Airlines",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/XJ.png",
            "travel_class": "Economy",
            "flight_number": "TA 231",
            "legroom": "31 in",
            "extensions": [
              "Average legroom (31 in)",
              "In-seat power & USB outlets",
              "Carbon emissions estimate: 189 kg"
            ]
          },
          {
            "departure_airport": {
              "name": "Transit Airport",
              "id": "DMK",
              "time": `${formattedNextDay} ${nextDayDepartureTime}`
            },
            "arrival_airport": {
              "name": `${destination} International Airport`,
              "id": destination,
              "time": `${formattedNextDay} ${nextDayArrivalTime}`
            },
            "duration": 105,
            "airplane": "Airbus A320",
            "airline": "Destination Airlines",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/FD.png",
            "travel_class": "Economy",
            "flight_number": "DA 642",
            "legroom": "28 in",
            "extensions": [
              "Below average legroom (28 in)",
              "Carbon emissions estimate: 98 kg"
            ]
          }
        ],
        "layovers": [
          {
            "duration": 495,
            "name": "Transit Airport",
            "id": "DMK",
            "overnight": true
          }
        ],
        "total_duration": 850,
        "carbon_emissions": {
          "this_flight": 287000,
          "typical_for_this_route": 224000,
          "difference_percent": 28
        },
        "price": 264,
        "type": "One way",
        "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
        "booking_token": "WyJDalJJYTJJMGFYSnZORmt0ZUVGQlNrdFViVkZDUnkwdExTMHRMUzB0TFc5clltSm1OMEZCUVVGQlIyWkdZblZGU2t0NE5VOUJFZ3RZU2pJek1YeEdSRFkwTWhvTENNck5BUkFDR2dOVlUwUTRISERLelFFPSIsW1siREVMIiwiMjAyNS0wMy0wNyIsIkRNSyIsbnVsbCwiWEoiLCIyMzEiXSxbIkRNSyIsIjIwMjUtMDMtMDgiLCJIQU4iLG51bGwsIkZEIiwiNjQyIl1dXQ=="
      },
      {
        "flights": [
          {
            "departure_airport": {
              "name": `${source} International Airport`,
              "id": source,
              "time": `${formattedDate} 00:05`
            },
            "arrival_airport": {
              "name": `${destination} International Airport`,
              "id": destination,
              "time": `${formattedDate} 05:35`
            },
            "duration": 240,
            "airplane": "Airbus A330",
            "airline": "Direct Airlines",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/VJ.png",
            "travel_class": "Economy",
            "flight_number": "DA 972",
            "legroom": "31 in",
            "extensions": [
              "Average legroom (31 in)",
              "Carbon emissions estimate: 205 kg"
            ],
            "overnight": true
          }
        ],
        "total_duration": 240,
        "carbon_emissions": {
          "this_flight": 205000,
          "typical_for_this_route": 224000,
          "difference_percent": -8
        },
        "price": 299,
        "type": "One way",
        "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/VJ.png",
        "booking_token": "WyJDalJJYTJJMGFYSnZORmt0ZUVGQlNrdFViVkZDUnkwdExTMHRMUzB0TFc5clltSm1OMEZCUVVGQlIyWkdZblZGU2t0NE5VOUJFZ1ZXU2prM01ob0xDUGpvQVJBQ0dnTlZVMFE0SEhENDZBRT0iLFtbIkRFTCIsIjIwMjUtMDMtMDciLCJIQU4iLG51bGwsIlZKIiwiOTcyIl1dXQ=="
      }
    ]
  };
};
