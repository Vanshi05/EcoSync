import { useState, useEffect } from "react";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceTabs } from "@/components/marketplace/MarketplaceTabs";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Leaf, Users, Recycle, TrendingUp, ArrowRight, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import heroImage from "@/assets/marketplace-hero.jpg";

interface Product {
  id: number;
  name: string;
  description?: string;
  price_inr: number;
  images?: any;
  sustainability_score?: number;
  carbon_footprint?: number;
  condition?: string;
  is_eco_friendly?: boolean;
  is_second_hand?: boolean;
  listing_type?: string;
  vendor?: {
    business_name: string;
    is_verified?: boolean;
  };
  seller?: {
    username: string;
    avatar_url?: string;
  };
}

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const [currentTab, setCurrentTab] = useState("all");
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProductsByTab();
  }, [products, currentTab]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          users!listings_seller_id_fkey(username, avatar_url, full_name)
        `)
        .eq('status', 'active')
        .eq('is_available', true)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      // Get brand profiles and home businesses separately for users who have them
      const userIds = data?.map(listing => listing.seller_id) || [];
      const { data: brandProfiles } = await supabase
        .from('brand_profiles')
        .select('user_id, brand_name, verification_status')
        .in('user_id', userIds);

      const { data: homeBusinesses } = await supabase
        .from('home_businesses')
        .select('user_id, business_name')
        .in('user_id', userIds);

      const brandProfilesMap = new Map(
        brandProfiles?.map(bp => [bp.user_id, bp]) || []
      );

      const homeBusinessesMap = new Map(
        homeBusinesses?.map(hb => [hb.user_id, hb]) || []
      );

      const formattedProducts = data?.map(listing => {
        const brandProfile = brandProfilesMap.get(listing.seller_id);
        const homeBusiness = homeBusinessesMap.get(listing.seller_id);
        
        return {
          id: listing.id,
          name: listing.title,
          description: listing.description,
          price_inr: listing.price,
          images: listing.images,
          sustainability_score: listing.sustainability_score,
          carbon_footprint: listing.carbon_saved_kg,
          condition: listing.condition,
          is_eco_friendly: listing.listing_type === 'homemade',
          is_second_hand: listing.listing_type === 'thrifted',
          listing_type: listing.listing_type,
          vendor: brandProfile ? {
            business_name: brandProfile.brand_name,
            is_verified: brandProfile.verification_status === 'verified'
          } : homeBusiness ? {
            business_name: homeBusiness.business_name,
            is_verified: false
          } : undefined,
          seller: {
            username: listing.users?.username || 'Unknown User',
            avatar_url: listing.users?.avatar_url
          }
        };
      }) || [];

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProductsByTab = () => {
    let filtered = products;
    
    switch (currentTab) {
      case "thrifted":
        filtered = products.filter(p => p.listing_type === 'thrifted');
        break;
      case "homemade":
        filtered = products.filter(p => p.listing_type === 'homemade');
        break;
      case "brands":
        filtered = products.filter(p => p.vendor?.is_verified);
        break;
      default:
        filtered = products;
    }
    
    setFilteredProducts(filtered);
  };

  const handleSearch = (query: string) => {
    let filtered = products;
    
    if (query.trim()) {
      filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleFilter = (filters: any) => {
    // Filter implementation would go here
    console.log('Applying filters:', filters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-primary rounded-lg p-2">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">EcoNest</h1>
                <p className="text-xs text-muted-foreground">Sustainable Marketplace</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Welcome back, <span className="text-foreground font-medium">{user?.email}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Sustainable Marketplace"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-eco-primary text-primary-foreground px-4 py-2 text-sm font-medium">
              <Leaf className="h-4 w-4 mr-2" />
              Neighborhood Sustainability Hub
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Sustainable
              <span className="bg-gradient-primary bg-clip-text text-transparent ml-4">
                Marketplace
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Buy, sell, and exchange sustainable products within your community. 
              Reduce waste, support local makers, and build a greener neighborhood together.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <Users className="h-5 w-5 text-eco-primary" />
              <span className="text-foreground font-medium">500+ Members</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <Recycle className="h-5 w-5 text-accent" />
              <span className="text-foreground font-medium">2,000+ Items Saved</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <TrendingUp className="h-5 w-5 text-sustainable" />
              <span className="text-foreground font-medium">85% Carbon Reduction</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all">
              Start Shopping
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-border/50 bg-white/10 backdrop-blur-sm hover:bg-white/20">
              List Your Items
            </Button>
          </div>
        </div>
      </section>

      {/* Marketplace Content */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="space-y-8">
          <MarketplaceHeader
            onSearch={handleSearch}
            onFilter={handleFilter}
            onViewToggle={setCurrentView}
            currentView={currentView}
          />

          <MarketplaceTabs onTabChange={setCurrentTab} onProductUpload={fetchProducts}>
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading sustainable products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <Leaf className="h-16 w-16 text-eco-primary mx-auto opacity-50" />
                <h3 className="text-xl font-medium text-foreground">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or check back later for new listings.
                </p>
              </div>
            ) : (
              <div className={
                currentView === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    view={currentView}
                  />
                ))}
              </div>
            )}
          </MarketplaceTabs>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;