import { useState, useEffect } from "react";

// Dummy data
const START_LOCATION = "MPSTME, Vile Parle";
const START_COORDS = [19.1076, 72.8366];

const ENDPOINTS = [
  { label: "Andheri", distanceKm: 5, coords: [19.1136, 72.8697] },
  { label: "Bandra", distanceKm: 12, coords: [19.0596, 72.8295] },
  { label: "Juhu", distanceKm: 8, coords: [19.1076, 72.8262] },
  { label: "Santa Cruz", distanceKm: 6, coords: [19.0840, 72.8410] },
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

// Calculate trip function
const calculateTrip = (distanceKm, vehicleType, model) => {
  const vehicle = VEHICLES[vehicleType].find(v => v.model === model);
  const efficiency = vehicle ? vehicle.efficiency : 20;
  
  const fuelUsed = (distanceKm / efficiency).toFixed(2);
  const carbon = (distanceKm * (vehicleType === "bus" ? 0.8 : vehicleType === "bike" ? 0.5 : 2.3)).toFixed(2);
    
  return { model, fuelUsed, unit: "L", carbon };
};

// Interactive Map Component
const InteractiveMap = ({ startCoords, endCoords, startLabel, endLabel, distance }) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      height: "400px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "16px",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
    }}>
      {/* Animated background pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 2px, transparent 2px),
          radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 2px, transparent 2px),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px, 30px 30px, 20px 20px",
        animation: animationPhase % 2 === 0 ? "float 3s ease-in-out infinite" : "none"
      }} />
      
      {/* Start point */}
      <div style={{
        position: "absolute",
        top: "25%",
        left: "20%",
        transform: "translate(-50%, -50%)",
        background: "linear-gradient(135deg, #4CAF50, #45a049)",
        color: "white",
        padding: "12px 16px",
        borderRadius: "25px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)",
        border: "3px solid rgba(255,255,255,0.3)",
        backdropFilter: "blur(10px)",
        animation: "pulse 2s infinite"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>🏁</span>
          <span>START</span>
        </div>
        <div style={{ fontSize: "12px", opacity: 0.9, marginTop: "4px" }}>
          {startLabel}
        </div>
      </div>
      
      {/* End point */}
      <div style={{
        position: "absolute",
        bottom: "25%",
        right: "20%",
        transform: "translate(50%, 50%)",
        background: "linear-gradient(135deg, #f44336, #d32f2f)",
        color: "white",
        padding: "12px 16px",
        borderRadius: "25px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 8px 25px rgba(244, 67, 54, 0.4)",
        border: "3px solid rgba(255,255,255,0.3)",
        backdropFilter: "blur(10px)",
        animation: "pulse 2s infinite 0.5s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>📍</span>
          <span>DESTINATION</span>
        </div>
        <div style={{ fontSize: "12px", opacity: 0.9, marginTop: "4px" }}>
          {endLabel}
        </div>
      </div>
      
      {/* Animated route */}
      <svg style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }}>
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00BCD4" />
            <stop offset="50%" stopColor="#2196F3" />
            <stop offset="100%" stopColor="#3F51B5" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Route line */}
        <path 
          d="M 20% 30% Q 50% 10%, 80% 70%"
          stroke="url(#routeGradient)"
          strokeWidth="6"
          fill="none"
          strokeDasharray={`${animationPhase * 25} 20`}
          filter="url(#glow)"
          style={{
            transition: "stroke-dasharray 0.5s ease"
          }}
        />
        
        {/* Moving dot */}
        <circle 
          r="8" 
          fill="#FFD700"
          style={{
            transformOrigin: "center",
            animation: "moveDot 3s ease-in-out infinite"
          }}
        >
          <animateMotion dur="3s" repeatCount="indefinite">
            <path d="M 20% 30% Q 50% 10%, 80% 70%" />
          </animateMotion>
        </circle>
      </svg>
      
      {/* Center info panel */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        padding: "20px 24px",
        borderRadius: "16px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
        textAlign: "center",
        border: "1px solid rgba(255,255,255,0.3)",
        minWidth: "200px"
      }}>
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>🗺️</div>
        <div style={{ fontSize: "18px", fontWeight: "700", color: "#333", marginBottom: "4px" }}>
          Route Overview
        </div>
        <div style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
          Total Distance
        </div>
        <div style={{ 
          fontSize: "28px", 
          fontWeight: "800", 
          color: "#2196F3",
          textShadow: "0 2px 4px rgba(33, 150, 243, 0.3)"
        }}>
          {distance} km
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes moveDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

// Statistics Card Component
const StatsCard = ({ icon, title, value, unit, color, bgColor }) => (
  <div style={{
    background: bgColor,
    padding: "24px",
    borderRadius: "16px",
    border: `2px solid ${color}20`,
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    cursor: "pointer"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = `0 20px 40px ${color}30`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
  }}>
    <div style={{
      position: "absolute",
      top: "-10px",
      right: "-10px",
      width: "60px",
      height: "60px",
      background: `linear-gradient(135deg, ${color}20, ${color}10)`,
      borderRadius: "50%"
    }} />
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
      <span style={{ fontSize: "24px" }}>{icon}</span>
      <span style={{ fontSize: "14px", fontWeight: "600", color: "#666" }}>{title}</span>
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
      <span style={{ fontSize: "28px", fontWeight: "800", color }}>
        {value}
      </span>
      <span style={{ fontSize: "14px", color: "#888" }}>{unit}</span>
    </div>
  </div>
);

function TripTracker() {
  const [destination, setDestination] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [vehicleType, setVehicleType] = useState("car");
  const [model, setModel] = useState(VEHICLES.car[0].model);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleEndTrip = async () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const endpoint = ENDPOINTS.find(
      e => e.label.toLowerCase() === destination.toLowerCase()
    );

    let tripData = endpoint || { 
      label: destination || "Unknown Location", 
      distanceKm: 10,
      coords: [19.0760, 72.8777]
    };

    setSelectedEndpoint(tripData);

    const calc = calculateTrip(tripData.distanceKm, vehicleType, model);

    const newTrip = {
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
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "20px"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <header style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "32px",
          borderRadius: "24px",
          color: "white",
          marginBottom: "32px",
          boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ffffff\" fill-opacity=\"0.1\"><circle cx=\"10\" cy=\"10\" r=\"2\"/></g></g></svg>')"
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1 style={{ 
              margin: 0, 
              fontSize: "36px", 
              fontWeight: "800",
              marginBottom: "8px",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}>
              🌱 EcoTracker Pro
            </h1>
            <p style={{ margin: 0, fontSize: "18px", opacity: 0.9 }}>
              Track your carbon footprint, make a difference
            </p>
            <div style={{ 
              marginTop: "20px", 
              display: "flex", 
              alignItems: "center", 
              gap: "20px",
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "20px" }}>👤</span>
                <span style={{ fontWeight: "600" }}>{USER.username}</span>
              </div>
              <div style={{
                background: "rgba(255,255,255,0.2)",
                padding: "8px 16px",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)"
              }}>
                <span style={{ fontSize: "20px", marginRight: "8px" }}>💰</span>
                <span style={{ fontWeight: "700", fontSize: "18px" }}>{USER.ecoCoins}</span>
                <span style={{ marginLeft: "4px", opacity: 0.8 }}>EcoCoins</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          marginBottom: "32px"
        }}>
          
          {/* Trip Planning Panel */}
          <div style={{
            background: "white",
            padding: "32px",
            borderRadius: "24px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.05)"
          }}>
            <h2 style={{ 
              margin: "0 0 24px 0", 
              color: "#2c3e50", 
              fontSize: "24px", 
              fontWeight: "700" 
            }}>
              🚀 Plan Your Trip
            </h2>
            
            <div style={{ marginBottom: "24px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "8px", 
                fontWeight: "600", 
                color: "#555" 
              }}>
                📍 Starting Point
              </label>
              <div style={{
                padding: "16px",
                background: "linear-gradient(135deg, #e8f5e8, #f0f8f0)",
                borderRadius: "12px",
                border: "2px solid #4CAF50",
                color: "#2e7d32",
                fontWeight: "600"
              }}>
                {START_LOCATION}
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "8px", 
                fontWeight: "600", 
                color: "#555" 
              }}>
                🏁 Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="Enter your destination..."
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "12px",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2196F3";
                  e.target.style.boxShadow = "0 0 0 3px rgba(33, 150, 243, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "32px"
            }}>
              <div>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#555" 
                }}>
                  🚗 Vehicle
                </label>
                <select
                  value={vehicleType}
                  onChange={e => {
                    setVehicleType(e.target.value);
                    setModel(VEHICLES[e.target.value][0].model);
                  }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    fontSize: "16px",
                    backgroundColor: "white",
                    cursor: "pointer"
                  }}
                >
                  {Object.keys(VEHICLES).map(v => (
                    <option key={v} value={v}>
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {(vehicleType === "car" || vehicleType === "bike" || vehicleType === "rickshaw") && (
                <div>
                  <label style={{ 
                    display: "block", 
                    marginBottom: "8px", 
                    fontWeight: "600", 
                    color: "#555" 
                  }}>
                    🏷️ Model
                  </label>
                  <select 
                    value={model} 
                    onChange={e => setModel(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "16px",
                      border: "2px solid #e0e0e0",
                      borderRadius: "12px",
                      fontSize: "16px",
                      backgroundColor: "white",
                      cursor: "pointer"
                    }}
                  >
                    {VEHICLES[vehicleType].map(v => (
                      <option key={v.model} value={v.model}>{v.model}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button
              onClick={handleEndTrip}
              disabled={isCalculating || !destination}
              style={{
                width: "100%",
                padding: "18px",
                background: isCalculating 
                  ? "linear-gradient(135deg, #bdbdbd, #9e9e9e)" 
                  : "linear-gradient(135deg, #4CAF50, #45a049)",
                color: "white",
                border: "none",
                borderRadius: "16px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: isCalculating ? "not-allowed" : "pointer",
                boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                if (!isCalculating && destination) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 12px 30px rgba(76, 175, 80, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(76, 175, 80, 0.3)";
              }}
            >
              {isCalculating ? "🔄 Calculating..." : "🚀 Calculate Carbon Footprint"}
            </button>
          </div>

          {/* Quick Stats Panel */}
          <div style={{
            background: "white",
            padding: "32px",
            borderRadius: "24px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.05)"
          }}>
            <h2 style={{ 
              margin: "0 0 24px 0", 
              color: "#2c3e50", 
              fontSize: "24px", 
              fontWeight: "700" 
            }}>
              📊 Your Impact
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <StatsCard
                icon="🚗"
                title="Total Trips"
                value={history.length}
                unit="trips"
                color="#2196F3"
                bgColor="linear-gradient(135deg, #e3f2fd, #f0f8ff)"
              />
              
              <StatsCard
                icon="📏"
                title="Distance Traveled"
                value={history.reduce((sum, trip) => sum + trip.distanceKm, 0)}
                unit="km"
                color="#FF9800"
                bgColor="linear-gradient(135deg, #fff3e0, #fef7ed)"
              />
              
              <StatsCard
                icon="🌍"
                title="Carbon Emitted"
                value={history.reduce((sum, trip) => sum + parseFloat(trip.carbon.split(' ')[0]), 0).toFixed(1)}
                unit="kg CO₂e"
                color="#f44336"
                bgColor="linear-gradient(135deg, #ffebee, #fef2f2)"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && selectedEndpoint && (
          <div style={{
            background: "white",
            padding: "32px",
            borderRadius: "24px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
            marginBottom: "32px",
            border: "1px solid rgba(0,0,0,0.05)"
          }}>
            <h2 style={{ 
              margin: "0 0 32px 0", 
              color: "#2c3e50", 
              fontSize: "28px", 
              fontWeight: "700",
              textAlign: "center"
            }}>
              🎯 Trip Analysis
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "32px"
            }}>
              <StatsCard
                icon="📍"
                title="Route"
                value={`${START_LOCATION.split(',')[0]} → ${selectedEndpoint.label}`}
                unit=""
                color="#9C27B0"
                bgColor="linear-gradient(135deg, #f3e5f5, #faf5ff)"
              />
              
              <StatsCard
                icon="📏"
                title="Distance"
                value={selectedEndpoint.distanceKm}
                unit="km"
                color="#FF9800"
                bgColor="linear-gradient(135deg, #fff3e0, #fef7ed)"
              />
              
              <StatsCard
                icon="⛽"
                title="Fuel Used"
                value={result.fuelUsed}
                unit={result.unit}
                color="#FF5722"
                bgColor="linear-gradient(135deg, #fbe9e7, #fef4f3)"
              />
              
              <StatsCard
                icon="🌍"
                title="CO₂ Emitted"
                value={result.carbon}
                unit="kg"
                color="#f44336"
                bgColor="linear-gradient(135deg, #ffebee, #fef2f2)"
              />
            </div>

            <InteractiveMap
              startCoords={START_COORDS}
              endCoords={selectedEndpoint.coords}
              startLabel={START_LOCATION}
              endLabel={selectedEndpoint.label}
              distance={selectedEndpoint.distanceKm}
            />
          </div>
        )}

        {/* Trip History */}
        <div style={{
          background: "white",
          padding: "32px",
          borderRadius: "24px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.05)"
        }}>
          <h2 style={{ 
            margin: "0 0 32px 0", 
            color: "#2c3e50", 
            fontSize: "28px", 
            fontWeight: "700" 
          }}>
            📜 Trip History
          </h2>
          
          {history.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
              borderRadius: "16px",
              border: "2px dashed #dee2e6"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚗</div>
              <h3 style={{ margin: "0 0 8px 0", color: "#6c757d" }}>No trips yet!</h3>
              <p style={{ margin: 0, color: "#868e96" }}>Start tracking your carbon footprint today</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {history.map((trip, index) => (
                <div 
                  key={trip.id} 
                  style={{ 
                    background: index === 0 
                      ? "linear-gradient(135deg, #e8f5e8, #f0f8f0)"
                      : "linear-gradient(135deg, #f8f9fa, #ffffff)",
                    border: index === 0 
                      ? "2px solid #4CAF50" 
                      : "2px solid #e9ecef",
                    borderRadius: "16px", 
                    padding: "24px",
                    position: "relative",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {index === 0 && (
                    <div style={{
                      position: "absolute",
                      top: "-8px",
                      right: "20px",
                      background: "linear-gradient(135deg, #4CAF50, #45a049)",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      ✨ Latest Trip
                    </div>
                  )}
                  
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "flex-start",
                    marginBottom: "16px"
                  }}>
                    <div>
                      <h3 style={{ 
                        margin: "0 0 8px 0", 
                        fontSize: "18px", 
                        fontWeight: "700", 
                        color: "#2c3e50" 
                      }}>
                        {trip.start} → {trip.end}
                      </h3>
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "12px", 
                        fontSize: "14px", 
                        color: "#666" 
                      }}>
                        <span>📅 {trip.date}</span>
                        <span>🕒 {trip.time}</span>
                      </div>
                    </div>
                    <div style={{
                      background: index === 0 
                        ? "rgba(76, 175, 80, 0.1)" 
                        : "rgba(33, 150, 243, 0.1)",
                      color: index === 0 ? "#2e7d32" : "#1976d2",
                      padding: "8px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      Trip #{history.length - index}
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
                    gap: "16px"
                  }}>
                    <div style={{
                      background: "rgba(255, 152, 0, 0.1)",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 152, 0, 0.2)"
                    }}>
                      <div style={{ fontSize: "20px", marginBottom: "4px" }}>📏</div>
                      <div style={{ fontSize: "12px", color: "#666", marginBottom: "2px" }}>Distance</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#f57c00" }}>
                        {trip.distanceKm} km
                      </div>
                    </div>
                    
                    <div style={{
                      background: "rgba(156, 39, 176, 0.1)",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(156, 39, 176, 0.2)"
                    }}>
                      <div style={{ fontSize: "20px", marginBottom: "4px" }}>🚗</div>
                      <div style={{ fontSize: "12px", color: "#666", marginBottom: "2px" }}>Vehicle</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#7b1fa2" }}>
                        {trip.vehicle}
                      </div>
                    </div>
                    
                    <div style={{
                      background: "rgba(255, 87, 34, 0.1)",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 87, 34, 0.2)"
                    }}>
                      <div style={{ fontSize: "20px", marginBottom: "4px" }}>⛽</div>
                      <div style={{ fontSize: "12px", color: "#666", marginBottom: "2px" }}>Fuel</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#d84315" }}>
                        {trip.fuelUsed}
                      </div>
                    </div>
                    
                    <div style={{
                      background: "rgba(244, 67, 54, 0.1)",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(244, 67, 54, 0.2)"
                    }}>
                      <div style={{ fontSize: "20px", marginBottom: "4px" }}>🌍</div>
                      <div style={{ fontSize: "12px", color: "#666", marginBottom: "2px" }}>Carbon</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#c62828" }}>
                        {trip.carbon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TripTracker;