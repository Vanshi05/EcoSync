// Neighborhood Sustainability Tracker - Landing Page
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Leaf, 
  Users, 
  ArrowRight, 
  ShoppingBag,
  User,
  LogOut,
  FileText,
  MapPin,
  Camera
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";


const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/public/landscape.png"
            alt="Sustainable Landscape"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <Badge className="bg-eco-primary text-primary-foreground px-6 py-3 text-base font-medium shadow-medium">
              <Leaf className="h-5 w-5 mr-2" />
              Building Sustainable Neighborhoods Together
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight">
              Track, Trade, and
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                Transform
              </span>
              <span className="text-4xl md:text-5xl text-muted-foreground block mt-4">
                Your Community's Impact
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join your neighborhood's sustainability journey. Monitor energy usage, 
              trade eco-friendly products, earn rewards, and build a greener future together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button size="lg" asChild className="bg-gradient-primary hover:shadow-glow transition-all text-lg px-8 py-4">
              <Link to="/auth">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border/50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need for 
            <span className="text-eco-primary"> Sustainable Living</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform makes it easy to reduce your environmental impact
            while building stronger community connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50 group">
            <CardContent className="p-8 text-center space-y-4">
              <div className="bg-eco-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-8 w-8 text-eco-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sustainable Marketplace</h3>
              <p className="text-muted-foreground">
                Buy, sell, and trade eco-friendly products within your neighborhood community.
              </p>
              <Button variant="ghost" className="text-eco-primary hover:text-eco-primary/80" asChild>
                <Link to="/marketplace">
                  Explore Marketplace →
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50 group">
            <CardContent className="p-8 text-center space-y-4">
              <div className="bg-accent/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">EcoConnect</h3>
              <p className="text-muted-foreground">
                Connect with like-minded eco warriors and unlock sustainability challenges together.
              </p>
              <Button variant="ghost" className="text-accent hover:text-accent/80" asChild>
                <Link to="/eco-connect">
                  Find Eco Partners →
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50 group">
            <CardContent className="p-8 text-center space-y-4">
              <div className="bg-sustainable/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="h-8 w-8 text-sustainable" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Bill Advisor</h3>
              <p className="text-muted-foreground">
                Upload your electricity bill and get actionable tips to reduce energy usage and carbon emissions.
              </p>
              <Button variant="ghost" className="text-sustainable hover:text-sustainable/80" asChild>
                <Link to="/carbon-budget">
                  Get Bill Tips →
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50 group">
            <CardContent className="p-8 text-center space-y-4">
              <div className="bg-verified/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-verified" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Travel Score</h3>
              <p className="text-muted-foreground">
                Track your trips and see the carbon footprint of your travel, helping you make greener choices.
              </p>
              <Button variant="ghost" className="text-verified hover:text-verified/80" asChild>
                <Link to="/trip-tracker">
                  Track Travel →
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50 group lg:col-span-1 md:col-span-2 mx-auto max-w-sm">
            <CardContent className="p-8 text-center space-y-4">
              <div className="bg-muted/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Impact Calculator</h3>
              <p className="text-muted-foreground">
                Upload a product image to receive its environmental impact score and understand its carbon footprint.
              </p>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
                <Link to="/lca-score">
                  Calculate Impact →
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-secondary py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Making Real Impact Together
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-12">
            Our community is already making a difference
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary-foreground">2,500+</p>
              <p className="text-primary-foreground/80">Community Members</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary-foreground">50,000kg</p>
              <p className="text-primary-foreground/80">CO₂ Reduced</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary-foreground">15,000+</p>
              <p className="text-primary-foreground/80">Items Exchanged</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary-foreground">₹12L+</p>
              <p className="text-primary-foreground/80">Community Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-card rounded-2xl p-12 shadow-strong border border-border/50">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Join the Sustainable Revolution?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start tracking your impact, connect with neighbors, and build a more sustainable future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-primary hover:shadow-glow transition-all text-lg px-8 py-4">
              <Link to="/auth">
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border/50 text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
