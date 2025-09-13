import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  MapPin, 
  Flag, 
  Fuel, 
  TreePine, 
  Calendar, 
  Clock, 
  Route,
  BarChart3,
  Users,
  Coins
} from "lucide-react";

// Dummy data
const START_LOCATION = "MPSTME, Vile Parle";
const START_COORDS: [number, number] = [19.1076, 72.8366];

const ENDPOINTS = [
  { label: "Andheri", distanceKm: 5, coords: [19.1136, 72.8697] as [number, number] },
  { label: "Bandra", distanceKm: 12, coords: [19.0596, 72.8295] as [number, number] },
  { label: "Juhu", distanceKm: 8, coords: [19.1076, 72.8262] as [number, number] },
  { label: "Santa Cruz", distanceKm: 6, coords: [19.0840, 72.8410] as [number, number] },
];

const VEHICLES = {
  car: [
    { model: "Maruti Swift", efficiency: 18 },
    { model: "Honda City", efficiency: 15 },
  ],
  bike: [
    { model: "Honda Activa", efficiency: 50 },
    { model: "Bajaj Pulsar", efficiency: 45 },
  ],
  rickshaw: [
    { model: "Auto Rickshaw", efficiency: 25 },
  ],
  bus: [
    { model: "City Bus", efficiency: 8 },
  ],
};

const USER = {
  username: "EcoUser123",
  ecoCoins: 250,
};

interface Trip {
  id: number;
  start: string;
  end: string;
  distanceKm: number;
  vehicle: string;
  model: string;
  fuelUsed: string;
  carbon: string;
  date: string;
  time: string;
}

interface TripResult {
  model: string;
  fuelUsed: string;
  unit: string;
  carbon: string;
}

interface Endpoint {
  label: string;
  distanceKm: number;
  coords: [number, number];
}

// Calculate trip function
const calculateTrip = (distanceKm: number, vehicleType: string, model: string): TripResult => {
  const vehicle = VEHICLES[vehicleType as keyof typeof VEHICLES].find(v => v.model === model);
  const efficiency = vehicle ? vehicle.efficiency : 20;
  
  const fuelUsed = (distanceKm / efficiency).toFixed(2);
  const carbon = (distanceKm * (vehicleType === "bus" ? 0.8 : vehicleType === "bike" ? 0.5 : 2.3)).toFixed(2);
    
  return { model, fuelUsed, unit: "L", carbon };
};

// Trip Map Component
const TripMap = () => {
  return (
    <Card className="h-96 bg-gradient-card border-border/50 shadow-medium overflow-hidden">
      <CardContent className="p-0 h-full">
        <img 
          src="/trip.png" 
          alt="Trip route visualization" 
          className="w-full h-full object-cover rounded-lg"
        />
      </CardContent>
    </Card>
  );
};

// Statistics Card Component
const StatsCard = ({ icon: Icon, title, value, unit, className = "" }: {
  icon: any;
  title: string;
  value: string | number;
  unit: string;
  className?: string;
}) => (
  <Card className={`bg-gradient-card border-border/50 shadow-medium hover:shadow-strong transition-all hover-scale ${className}`}>
    <CardContent className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </CardContent>
  </Card>
);

function TripTracker() {
  const [destination, setDestination] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [vehicleType, setVehicleType] = useState("car");
  const [model, setModel] = useState(VEHICLES.car[0].model);
  const [result, setResult] = useState<TripResult | null>(null);
  const [history, setHistory] = useState<Trip[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [userEcoCoins, setUserEcoCoins] = useState(USER.ecoCoins);

  const handleEndTrip = async () => {
    setIsCalculating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const endpoint = ENDPOINTS.find(
      e => e.label.toLowerCase() === destination.toLowerCase()
    );

    const tripData: Endpoint = endpoint || { 
      label: destination || "Unknown Location", 
      distanceKm: 10,
      coords: [19.0760, 72.8777] as [number, number]
    };

    setSelectedEndpoint(tripData);

    const calc = calculateTrip(tripData.distanceKm, vehicleType, model);

    // Award +15 eco points for bus selection
    if (vehicleType === "bus") {
      setUserEcoCoins(prev => prev + 15);
    }

    const newTrip: Trip = {
      id: Date.now(),
      start: START_LOCATION,
      end: tripData.label,
      distanceKm: tripData.distanceKm,
      vehicle: vehicleType,
      model: calc.model,
      fuelUsed: `${calc.fuelUsed} ${calc.unit}`,
      carbon: `${calc.carbon} kg CO₂e`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setResult(calc);
    setHistory([newTrip, ...history]);
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <Card className="bg-gradient-primary text-primary-foreground shadow-glow border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <TreePine className="h-8 w-8" />
                  EcoTracker Pro
                </h1>
                <p className="text-primary-foreground/90 text-lg">
                  Track your carbon footprint, make a difference
                </p>
              </div>
              
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">{USER.username}</span>
                </div>
                <Badge className="bg-white/20 text-primary-foreground hover:bg-white/30 border-white/30 backdrop-blur-sm px-4 py-2">
                  <Coins className="h-4 w-4 mr-2" />
                  <span className="font-bold text-lg">{userEcoCoins}</span>
                  <span className="ml-1">EcoCoins</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Trip Planning Panel */}
          <Card className="bg-gradient-card border-border/50 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Route className="h-6 w-6 text-primary" />
                Plan Your Trip
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-eco-primary" />
                  Starting Point
                </Label>
                <div className="p-4 bg-eco-muted/30 border-2 border-eco-primary/50 rounded-lg">
                  <span className="font-semibold text-eco-primary">{START_LOCATION}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-destructive" />
                  Destination
                </Label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter your destination..."
                  className="border-2 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    Vehicle
                  </Label>
                  <Select 
                    value={vehicleType} 
                    onValueChange={(value) => {
                      setVehicleType(value);
                      setModel(VEHICLES[value as keyof typeof VEHICLES][0].model);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(VEHICLES).map(v => (
                        <SelectItem key={v} value={v}>
                          {v.charAt(0).toUpperCase() + v.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(vehicleType === "car" || vehicleType === "bike" || vehicleType === "rickshaw") && (
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Select value={model} onValueChange={setModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {VEHICLES[vehicleType as keyof typeof VEHICLES].map(v => (
                          <SelectItem key={v.model} value={v.model}>{v.model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <Button
                onClick={handleEndTrip}
                disabled={isCalculating || !destination}
                size="lg"
                className="w-full bg-gradient-primary hover:shadow-glow transition-all"
              >
                {isCalculating ? "Calculating..." : "Calculate Carbon Footprint"}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats Panel */}
          <Card className="bg-gradient-card border-border/50 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <BarChart3 className="h-6 w-6 text-primary" />
                Your Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <StatsCard
                icon={Car}
                title="Total Trips"
                value={history.length}
                unit="trips"
              />
              
              <StatsCard
                icon={Route}
                title="Distance Traveled"
                value={history.reduce((sum, trip) => sum + trip.distanceKm, 0)}
                unit="km"
              />
              
              <StatsCard
                icon={TreePine}
                title="Carbon Emitted"
                value={history.reduce((sum, trip) => sum + parseFloat(trip.carbon.split(' ')[0]), 0).toFixed(1)}
                unit="kg CO₂e"
              />
            </CardContent>
          </Card>
        </div>

        {/* Results Section - Side by Side Cards */}
        {result && selectedEndpoint && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Trip Analysis Card */}
            <Card className="bg-gradient-card border-border/50 shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Trip Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StatsCard
                    icon={Route}
                    title="Route"
                    value={`${START_LOCATION.split(',')[0]} → ${selectedEndpoint.label}`}
                    unit=""
                  />
                  
                  <StatsCard
                    icon={MapPin}
                    title="Distance"
                    value={selectedEndpoint.distanceKm}
                    unit="km"
                  />
                  
                  <StatsCard
                    icon={Fuel}
                    title="Fuel Used"
                    value={result.fuelUsed}
                    unit={result.unit}
                  />
                  
                  <StatsCard
                    icon={TreePine}
                    title="CO₂ Emitted"
                    value={result.carbon}
                    unit="kg"
                  />
                </div>

                <TripMap />
              </CardContent>
            </Card>

            {/* Trip History Card */}
            <Card className="bg-gradient-card border-border/50 shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">Trip History</CardTitle>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-16 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30">
                    <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">No trips yet!</h3>
                    <p className="text-muted-foreground">Start tracking your carbon footprint today</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {history.map((trip, index) => (
                      <Card 
                        key={trip.id} 
                        className={`${
                          index === 0 
                            ? "bg-eco-muted/30 border-eco-primary shadow-medium" 
                            : "bg-gradient-card border-border/50"
                        } hover-scale transition-all`}
                      >
                        <CardContent className="p-4 relative">
                          {index === 0 && (
                            <Badge className="absolute -top-2 right-4 bg-eco-primary text-eco-primary-foreground">
                              ✨ Latest Trip
                            </Badge>
                          )}
                          
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-foreground mb-2">
                                {trip.start} → {trip.end}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {trip.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {trip.time}
                                </span>
                              </div>
                            </div>
                            <Badge variant={index === 0 ? "default" : "secondary"}>
                              Trip #{history.length - index}
                            </Badge>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-muted/50 p-3 rounded-lg">
                              <Route className="h-5 w-5 mb-1 text-primary" />
                              <p className="text-xs text-muted-foreground">Distance</p>
                              <p className="font-bold text-foreground">{trip.distanceKm} km</p>
                            </div>
                            
                            <div className="bg-muted/50 p-3 rounded-lg">
                              <Car className="h-5 w-5 mb-1 text-primary" />
                              <p className="text-xs text-muted-foreground">Vehicle</p>
                              <p className="font-bold text-foreground">{trip.vehicle}</p>
                            </div>
                            
                            <div className="bg-muted/50 p-3 rounded-lg">
                              <Fuel className="h-5 w-5 mb-1 text-primary" />
                              <p className="text-xs text-muted-foreground">Fuel</p>
                              <p className="font-bold text-foreground">{trip.fuelUsed}</p>
                            </div>
                            
                            <div className="bg-muted/50 p-3 rounded-lg">
                              <TreePine className="h-5 w-5 mb-1 text-primary" />
                              <p className="text-xs text-muted-foreground">Carbon</p>
                              <p className="font-bold text-foreground">{trip.carbon}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default TripTracker;