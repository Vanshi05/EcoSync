import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Marketplace", path: "/marketplace" },
  { name: "Eco Connect", path: "/eco-connect" },
  { name: "Bill Advisor", path: "/carbon-budget" },
  { name: "Travel Score", path: "/trip-tracker" },
  { name: "Impact Calculator", path: "/lca-score" },
];

export function Navigation() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
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
      </div>
    </nav>
  );
}