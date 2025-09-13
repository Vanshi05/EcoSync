import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const navigationItems = [
  { name: "Marketplace", path: "/marketplace" },
  { name: "Eco Connect", path: "/eco-connect" },
  { name: "Bill Advisor", path: "/carbon-budget" },
  { name: "Travel Score", path: "/trip-tracker" },
  { name: "Impact Calculator", path: "/lca-score" },
];

export function Navigation() {
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const totalItems = getTotalItems();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex justify-center space-x-8 flex-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center px-4 py-4 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-primary border-b-2 border-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <NavLink to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </Badge>
                )}
              </Button>
            </NavLink>

            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}