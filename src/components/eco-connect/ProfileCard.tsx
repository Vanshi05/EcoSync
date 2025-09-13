import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Leaf, 
  Award, 
  MapPin,
  Star,
  Users,
  Package,
  ShoppingBag
} from 'lucide-react';

interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  sustainability_score: number;
  city: string;
  state: string;
  active_listings: number;
  sales_completed: number;
  average_rating: number;
  followers_count: number;
  following_count: number;
}

interface ProfileCardProps {
  user: UserProfile;
  x: MotionValue<number>;
  rotate: MotionValue<number>;
  opacity: MotionValue<number>;
  onDragEnd: (event: any, info: any) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, x, rotate, opacity, onDragEnd }) => {
  const achievements = [
    { icon: Leaf, label: 'Eco Champion', condition: user.sustainability_score > 80 },
    { icon: Award, label: 'Top Seller', condition: user.sales_completed > 20 },
    { icon: Users, label: 'Community Leader', condition: user.followers_count > 100 },
    { icon: Star, label: 'Highly Rated', condition: user.average_rating > 4.5 }
  ].filter(achievement => achievement.condition);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: 1.02 }}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="bg-gradient-card shadow-strong border border-border/50 overflow-hidden w-full max-w-sm">
        {/* Profile Image & Header */}
        <div className="relative h-48 bg-gradient-hero">
          <img
            src={user.avatar_url}
            alt={user.full_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Sustainability Score Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-eco-primary text-primary-foreground px-3 py-1 text-sm font-semibold shadow-medium">
              <Zap className="h-3 w-3 mr-1" />
              {user.sustainability_score}
            </Badge>
          </div>

          {/* Name & Location */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl font-bold mb-1">{user.full_name}</h2>
            <div className="flex items-center gap-1 text-white/90">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{user.city}, {user.state}</span>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-4 space-y-4">
          {/* Energy Usage Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Sustainability Score</span>
              <span className="text-sm text-eco-primary font-bold">{user.sustainability_score}/100</span>
            </div>
            <Progress 
              value={user.sustainability_score} 
              className="h-2 bg-muted"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Eco Beginner</span>
              <span>Eco Master</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center space-y-1 p-2 bg-eco-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-1">
                <Package className="h-3 w-3 text-eco-primary" />
                <span className="text-sm font-bold text-foreground">{user.active_listings}</span>
              </div>
              <p className="text-xs text-muted-foreground">Listings</p>
            </div>
            <div className="text-center space-y-1 p-2 bg-eco-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-1">
                <ShoppingBag className="h-3 w-3 text-sustainable" />
                <span className="text-sm font-bold text-foreground">{user.sales_completed}</span>
              </div>
              <p className="text-xs text-muted-foreground">Sales</p>
            </div>
            <div className="text-center space-y-1 p-2 bg-eco-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-3 w-3 text-featured" />
                <span className="text-sm font-bold text-foreground">{user.average_rating.toFixed(1)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center space-y-1 p-2 bg-eco-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-1">
                <Users className="h-3 w-3 text-accent" />
                <span className="text-sm font-bold text-foreground">{user.followers_count}</span>
              </div>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
          </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Achievements</h3>
              <div className="flex flex-wrap gap-1">
                {achievements.slice(0, 3).map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-verified/10 text-verified border-verified/20 px-2 py-1 text-xs"
                    >
                      <IconComponent className="h-3 w-3 mr-1" />
                      {achievement.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Username */}
          <div className="text-center pt-2 border-t border-border/50">
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;