import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDailyCheckIn } from "@/hooks/useDailyCheckIn";
import ProtectedRoute from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import CarbonBudget from "./pages/CarbonBudget";
import NotFound from "./pages/NotFound";
import TripTracker from "./pages/TripTracker";
import SwipePage from "./pages/SwipePage";
import LandingPage from './pages/LandingPage';
import EcoConnect from "./pages/EcoConnect";
import LcaScore from "./pages/LcaScore";
import Challenges from "./pages/Challenges";
import Cart from "./pages/Cart";

const queryClient = new QueryClient();

const App = () => {
  useDailyCheckIn();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
            {/* Public routes */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Index />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/carbon-budget"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CarbonBudget />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trip-tracker"
              element={
                <ProtectedRoute>
                  <Layout>
                    <TripTracker />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenges"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Challenges />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/swipe-page"
              element={
                <ProtectedRoute>
                  <Layout>
                    <SwipePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/marketplace"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Marketplace />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/eco-connect"
              element={
                <ProtectedRoute>
                  <Layout>
                    <EcoConnect />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/lca-score"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LcaScore />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Cart />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Redirect any unknown routes */}
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;