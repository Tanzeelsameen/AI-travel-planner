
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "markdown-to-jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SerpApiKeyForm } from "@/components/SerpApiKeyForm";
import { TravelChat } from "@/components/TravelChat";
import { Loader2 } from "lucide-react";

interface TravelPlanProps {
  plan: string;
  flightData?: any;
  destination?: string;
  isLoadingFlights?: boolean;
}

export const TravelPlan = ({ 
  plan, 
  flightData, 
  destination = "", 
  isLoadingFlights = false 
}: TravelPlanProps) => {
  return (
    <div className="w-full space-y-6">
      <Card className="w-full max-w-2xl p-6 backdrop-blur-sm bg-white/30 shadow-xl">
        <ScrollArea className="h-[500px] pr-4">
          <div className="prose prose-emerald max-w-none">
            {isLoadingFlights ? (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-2" />
                <p className="text-blue-800">Loading flight information...</p>
              </div>
            ) : flightData ? (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h2 className="text-xl font-bold text-blue-800 mb-4">Recommended Flights</h2>
                
                {flightData.best_flights && flightData.best_flights.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Airline</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {flightData.best_flights.map((flight: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {flight.airline_logo && (
                                <img src={flight.airline_logo} alt="Airline" className="h-6" />
                              )}
                              <span className="font-medium">{flight.flights[0].airline}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {flight.flights.map((segment: any, segmentIndex: number) => (
                                <div key={segmentIndex} className="mb-1 last:mb-0">
                                  {segment.departure_airport.id} → {segment.arrival_airport.id}
                                </div>
                              ))}
                              {flight.layovers && flight.layovers.length > 0 && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {flight.layovers.map((layover: any, layoverIndex: number) => (
                                    <div key={layoverIndex}>
                                      Layover: {layover.name} ({Math.floor(layover.duration / 60)}h {layover.duration % 60}m)
                                      {layover.overnight && " (overnight)"}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {flight.flights.map((segment: any, segmentIndex: number) => (
                                <div key={segmentIndex} className="mb-1 last:mb-0">
                                  {new Date(segment.departure_airport.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                                  {new Date(segment.arrival_airport.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  <div className="text-xs text-gray-500">
                                    {Math.floor(segment.duration / 60)}h {segment.duration % 60}m
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-bold text-emerald-600">${flight.price}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs"
                              asChild
                            >
                              <a 
                                href={`https://www.google.com/flights?hl=en#flt=${flight.flights[0].departure_airport.id}.${flight.flights[0].arrival_airport.id}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                Book now
                              </a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4">
                    <p>No flight data available for this route. Try a different source or destination.</p>
                  </div>
                )}
              </div>
            ) : (
              null
            )}
            <Markdown>{plan}</Markdown>
          </div>
        </ScrollArea>
      </Card>
      
      {/* Add the chat component */}
      <TravelChat destination={destination} travelPlan={plan} />
    </div>
  );
};
