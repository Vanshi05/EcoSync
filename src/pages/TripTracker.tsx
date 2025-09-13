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

// Interactive Map Component
const InteractiveMap = ({ startCoords, endCoords, startLabel, endLabel, distance }: {
  startCoords: [number, number];
  endCoords: [number, number];
  startLabel: string;
  endLabel: string;
  distance: number;
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-96 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 border-border/50 overflow-hidden">
      <div className="relative h-full">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-subtle opacity-30" />
        
        {/* Start point */}
        <div className="absolute top-1/4 left-1/5 transform -translate-x-1/2 -translate-y-1/2">
          <Badge className="bg-eco-primary text-eco-primary-foreground border-white/30 backdrop-blur-sm animate-pulse">
            <Flag className="h-4 w-4 mr-2" />
            START
          </Badge>
          <p className="text-xs text-muted-foreground mt-1 text-center">{startLabel}</p>
        </div>
        
        {/* End point */}
        <div className="absolute bottom-1/4 right-1/5 transform translate-x-1/2 translate-y-1/2">
          <Badge className="bg-destructive text-destructive-foreground border-white/30 backdrop-blur-sm animate-pulse">
            <MapPin className="h-4 w-4 mr-2" />
            DESTINATION
          </Badge>
          <p className="text-xs text-muted-foreground mt-1 text-center">{endLabel}</p>
        </div>
        
        {/* Route visualization */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
          
          <path 
            d="M 20% 30% Q 50% 10%, 80% 70%"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${animationPhase * 20} 15`}
            className="transition-all duration-500"
          />
          
          <circle 
            r="6" 
            fill="hsl(var(--eco-primary))"
            className="animate-pulse"
          >
            <animateMotion dur="3s" repeatCount="indefinite">
              <path d="M 20% 30% Q 50% 10%, 80% 70%" />
            </animateMotion>
          </circle>
        </svg>
        
        {/* Center info panel */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Card className="bg-background/95 backdrop-blur-md border-border/50 shadow-elegant">
            <CardContent className="p-4 text-center">
              <Route className="h-6 w-6 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold text-foreground mb-1">Route Overview</h4>
              <p className="text-sm text-muted-foreground mb-2">Total Distance</p>
              <p className="text-2xl font-bold text-primary">{distance} km</p>
            </CardContent>
          </Card>
        </div>
      </div>
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
                  <span className="font-bold text-lg">{USER.ecoCoins}</span>
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

        {/* Results Section */}
        {result && selectedEndpoint && (
          <Card className="bg-gradient-card border-border/50 shadow-medium">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Trip Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

              <InteractiveMap
                startCoords={START_COORDS}
                endCoords={selectedEndpoint.coords}
                startLabel={START_LOCATION}
                endLabel={selectedEndpoint.label}
                distance={selectedEndpoint.distanceKm}
              />
            </CardContent>
          </Card>
        )}

        {/* Trip History */}
        <Card className="bg-gradient-card border-border/50 shadow-medium">
          <CardHeader>
            <CardTitle className="text-3xl">Trip History</CardTitle>
          </CardHeader>
          <CardContent>
            
            {history.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30">
                <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">No trips yet!</h3>
                <p className="text-muted-foreground">Start tracking your carbon footprint today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((trip, index) => (
                  <Card 
                    key={trip.id} 
                    className={`${
                      index === 0 
                        ? "bg-eco-muted/30 border-eco-primary shadow-medium" 
                        : "bg-gradient-card border-border/50"
                    } hover-scale transition-all`}
                  >
                    <CardContent className="p-6 relative">
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
    </div>
  );
}

export default TripTracker;