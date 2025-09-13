import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Trophy, 
  Flame, 
  Star, 
  Crown,
  Sparkles,
  TrendingUp,
  Target,
  Award,
  CheckCircle2,
  Clock,
  Gift,
  Copy,
  Calendar,
  ShoppingBag,
  Zap,
  Edit3,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  reward: string;
  icon: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  xpReward: number;
  completedAt?: string;
}

interface Coupon {
  id: string;
  brandName: string;
  discount: string;
  code: string;
  validUntil: string;
  isUsed: boolean;
  earnedFrom?: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [userLevel, setUserLevel] = useState(5);
  const [userXP, setUserXP] = useState(1250);
  const [userEcoCoins, setUserEcoCoins] = useState(() => {
    return parseInt(localStorage.getItem('userEcoCoins') || '850');
  });
  const [streak, setStreak] = useState(7);
  const [userChallenges, setUserChallenges] = useState<Challenge[]>([]);
  const [userCoupons, setUserCoupons] = useState<Coupon[]>(() => {
    return JSON.parse(localStorage.getItem('userCoupons') || '[]');
  });

  useEffect(() => {
    // Load challenges from localStorage
    const storedChallenges = JSON.parse(localStorage.getItem('userChallenges') || '[]');
    
    // Add some default challenges for demo
    const defaultChallenges: Challenge[] = [
      {
        id: 'default-1',
        title: 'Morning Solar Boost',
        description: 'Use solar power for morning routine for 5 days straight',
        duration: '5 days',
        reward: '100 Eco-Coins',
        icon: '☀️',
        status: 'active',
        progress: 60,
        difficulty: 'easy',
        category: 'Energy',
        xpReward: 150
      },
      {
        id: 'default-2',
        title: 'Green Commute Master',
        description: 'Take public transport or bike to work for 2 weeks',
        duration: '14 days',
        reward: '200 Eco-Coins',
        icon: '🚴‍♀️',
        status: 'active',
        progress: 85,
        difficulty: 'medium',
        category: 'Transport',
        xpReward: 300
      },
      {
        id: 'default-3',
        title: 'Waste Warrior',
        description: 'Achieve zero food waste for a week',
        duration: '7 days',
        reward: '150 Eco-Coins',
        icon: '♻️',
        status: 'completed',
        progress: 100,
        difficulty: 'hard',
        category: 'Waste',
        xpReward: 250,
        completedAt: '2025-01-10'
      },
      {
        id: 'default-4',
        title: 'Water Conservation Hero',
        description: 'Reduce water usage by 30% for a month',
        duration: '30 days',
        reward: '250 Eco-Coins',
        icon: '💧',
        status: 'completed',
        progress: 100,
        difficulty: 'hard',
        category: 'Water',
        xpReward: 400,
        completedAt: '2025-01-05'
      }
    ];

    // Combine stored and default challenges
    const allChallenges = [...defaultChallenges];
    storedChallenges.forEach((stored: Challenge) => {
      if (!allChallenges.find(c => c.id === stored.id)) {
        allChallenges.push(stored);
      }
    });

    setUserChallenges(allChallenges);

    // Load default coupons if none exist
    if (userCoupons.length === 0) {
      const defaultCoupons: Coupon[] = [
        {
          id: 'coupon-1',
          brandName: 'EcoGreen',
          discount: '15%',
          code: 'ECO4A2B5C',
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          isUsed: false,
          earnedFrom: 'Waste Warrior Challenge'
        },
        {
          id: 'coupon-2',
          brandName: 'SustainableTech',
          discount: '20%',
          code: 'TECH9X8Y7Z',
          validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
          isUsed: false,
          earnedFrom: 'Water Conservation Hero'
        },
        {
          id: 'coupon-3',
          brandName: 'GreenLiving',
          discount: '10%',
          code: 'GREEN123ABC',
          validUntil: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          isUsed: true,
          earnedFrom: 'Energy Saver Challenge'
        }
      ];
      setUserCoupons(defaultCoupons);
      localStorage.setItem('userCoupons', JSON.stringify(defaultCoupons));
    }

    // Update EcoCoins from localStorage changes
    const updateEcoCoins = () => {
      const newCoins = parseInt(localStorage.getItem('userEcoCoins') || '850');
      setUserEcoCoins(newCoins);
    };

    window.addEventListener('storage', updateEcoCoins);
    return () => window.removeEventListener('storage', updateEcoCoins);
  }, []);

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Coupon code copied to clipboard",
    });
  };

  const activeChallenges = userChallenges.filter(c => c.status === 'active');
  const completedChallenges = userChallenges.filter(c => c.status === 'completed');
  const activeCoupons = userCoupons.filter(c => !c.isUsed && new Date(c.validUntil) > new Date());
  const expiredCoupons = userCoupons.filter(c => c.isUsed || new Date(c.validUntil) <= new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                </h1>
                <p className="text-sm text-muted-foreground">Level {userLevel} Eco Warrior</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* User Stats Dashboard */}
        <motion.div
          className="grid md:grid-cols-4 gap-4 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-primary text-primary-foreground overflow-hidden relative">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Level</p>
                  <p className="text-2xl font-bold">{userLevel}</p>
                </div>
                <Crown className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-2">
                <Progress value={(userXP % 500) / 5} className="h-2" />
                <p className="text-xs opacity-75 mt-1">{userXP % 500}/500 XP to next level</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary text-primary-foreground overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Eco Coins</p>
                  <p className="text-2xl font-bold">{userEcoCoins}</p>
                </div>
                <Sparkles className="h-8 w-8 opacity-80" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <p className="text-xs opacity-75">+125 this week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-400 to-red-500 text-white overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Fire Streak</p>
                  <p className="text-2xl font-bold">{streak}</p>
                </div>
                <Flame className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-75 mt-2">days in a row</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-400 to-pink-500 text-white overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total XP</p>
                  <p className="text-2xl font-bold">{userXP}</p>
                </div>
                <Star className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-75 mt-2">Eco Warrior status</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs defaultValue="quests" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="quests" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                My Quests
              </TabsTrigger>
              <TabsTrigger value="coupons" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Coupons
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Achievements
              </TabsTrigger>
            </TabsList>

            {/* Quests Tab */}
            <TabsContent value="quests" className="space-y-8">
              {/* Active Quests */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Zap className="h-6 w-6 text-eco-primary" />
                    Active Quests
                    <Badge className="bg-eco-primary text-primary-foreground">{activeChallenges.length}</Badge>
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {activeChallenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl">{challenge.icon}</div>
                              <div>
                                <h3 className="font-bold text-lg text-foreground">{challenge.title}</h3>
                                <Badge className={`text-xs ${getDifficultyBadgeColor(challenge.difficulty)}`}>
                                  {challenge.difficulty.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground text-sm">{challenge.description}</p>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-bold">{challenge.progress}%</span>
                            </div>
                            <Progress value={challenge.progress} className="h-3" />
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {challenge.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Gift className="h-4 w-4" />
                                {challenge.reward}
                              </div>
                            </div>
                            <Badge className="bg-verified/10 text-verified">
                              +{challenge.xpReward} XP
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Completed Quests */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Award className="h-6 w-6 text-verified" />
                    Completed Quests
                    <Badge className="bg-verified text-white">{completedChallenges.length}</Badge>
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {completedChallenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-medium">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-2xl">{challenge.icon}</div>
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          </div>
                          <h4 className="font-bold text-foreground mb-2">{challenge.title}</h4>
                          <div className="flex justify-between items-center text-sm">
                            <Badge className="bg-green-100 text-green-700">
                              {challenge.difficulty.toUpperCase()}
                            </Badge>
                            <span className="text-muted-foreground">
                              {challenge.completedAt && new Date(challenge.completedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-sm">
                            <span className="text-verified font-medium">+{challenge.xpReward} XP</span>
                            <span className="text-eco-primary font-medium">{challenge.reward}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            </TabsContent>

            {/* Coupons Tab */}
            <TabsContent value="coupons" className="space-y-8">
              {/* Active Coupons */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Gift className="h-6 w-6 text-eco-primary" />
                    Active Coupons
                    <Badge className="bg-eco-primary text-primary-foreground">{activeCoupons.length}</Badge>
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeCoupons.map((coupon, index) => (
                    <motion.div
                      key={coupon.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-medium hover:shadow-strong transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge className="bg-eco-primary text-primary-foreground">
                              {coupon.discount} OFF
                            </Badge>
                            <ShoppingBag className="h-5 w-5 text-eco-primary" />
                          </div>
                          
                          <h4 className="font-bold text-foreground mb-2">{coupon.brandName}</h4>
                          
                          <div className="bg-white/80 rounded-lg p-3 mb-3">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-bold">{coupon.code}</span>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyCode(coupon.code)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Valid until {new Date(coupon.validUntil).toLocaleDateString()}</span>
                            </div>
                            {coupon.earnedFrom && (
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4" />
                                <span className="text-xs">From: {coupon.earnedFrom}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Used/Expired Coupons */}
              {expiredCoupons.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Past Coupons
                      <Badge variant="secondary">{expiredCoupons.length}</Badge>
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {expiredCoupons.map((coupon) => (
                      <Card key={coupon.id} className="bg-muted/30 border-muted">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {coupon.discount} OFF
                            </Badge>
                            <Badge variant={coupon.isUsed ? "default" : "destructive"} className="text-xs">
                              {coupon.isUsed ? "Used" : "Expired"}
                            </Badge>
                          </div>
                          <h5 className="font-medium text-sm text-muted-foreground mb-1">{coupon.brandName}</h5>
                          <p className="font-mono text-xs text-muted-foreground">{coupon.code}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Achievements Coming Soon</h2>
                <p className="text-muted-foreground">
                  Your eco journey milestones and special recognitions will appear here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;