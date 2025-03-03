
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "markdown-to-jsx";

interface TravelPlanProps {
  plan: string;
  flightData?: any;
}

export const TravelPlan = ({ plan, flightData }: TravelPlanProps) => {
  return (
    <Card className="w-full max-w-2xl p-6 mt-6 backdrop-blur-sm bg-white/30 shadow-xl">
      <ScrollArea className="h-[500px] pr-4">
        <div className="prose prose-emerald max-w-none">
          {flightData && (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Recommended Flights</h2>
              {flightData.best_flights.map((flight: any, index: number) => (
                <div key={index} className="mb-6 pb-6 border-b border-blue-100 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <img src={flight.airline_logo} alt="Airline" className="h-6 mr-2" />
                      <span className="font-semibold">{flight.flights[0].airline}</span>
                    </div>
                    <div className="font-bold text-emerald-600">${flight.price}</div>
                  </div>
                  
                  {flight.flights.map((segment: any, segmentIndex: number) => (
                    <div key={segmentIndex} className="mb-3 last:mb-0">
                      <div className="flex justify-between text-sm">
                        <div>
                          <div className="font-medium">{segment.departure_airport.id} → {segment.arrival_airport.id}</div>
                          <div className="text-gray-600">{segment.flight_number} • {segment.travel_class}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {new Date(segment.departure_airport.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                            {new Date(segment.arrival_airport.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                          <div className="text-gray-600">
                            {Math.floor(segment.duration / 60)}h {segment.duration % 60}m
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {flight.layovers && flight.layovers.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Layover: </span>
                      {flight.layovers.map((layover: any, layoverIndex: number) => (
                        <span key={layoverIndex}>
                          {layover.name} ({Math.floor(layover.duration / 60)}h {layover.duration % 60}m)
                          {layover.overnight && " (overnight)"}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <Markdown>{plan}</Markdown>
        </div>
      </ScrollArea>
    </Card>
  );
};
