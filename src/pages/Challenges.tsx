import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Trophy, 
  Flame, 
  Star, 
  Users, 
  Clock, 
  Gift, 
  Zap,
  Target,
  CheckCircle2,
  Play,
  Pause,
  Award,
  Crown,
  Sparkles,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotification } from '@/contexts/NotificationContext';

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  reward: string;
  icon: string;
  partnerId?: string;
  partnerName?: string;
  partnerAvatar?: string;
  acceptedAt?: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  xpReward: number;
}

const Challenges = () => {
  const [userChallenges, setUserChallenges] = useState<Challenge[]>([]);
  const [userLevel, setUserLevel] = useState(5);
  const [userXP, setUserXP] = useState(1250);
  const [userEcoCoins, setUserEcoCoins] = useState(() => {
    return parseInt(localStorage.getItem('userEcoCoins') || '850');
  });
  const [streak, setStreak] = useState(7);
  const { showEcoCoinsNotification, showCouponUnlockedNotification } = useNotification();

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
        xpReward: 250
      }
    ];

    // Combine stored and default challenges, avoiding duplicates
    const allChallenges = [...defaultChallenges];
    storedChallenges.forEach((stored: Challenge) => {
      if (!allChallenges.find(c => c.id === stored.id)) {
        allChallenges.push(stored);
      }
    });

    setUserChallenges(allChallenges);
  }, []);

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const toggleChallengeStatus = (id: string) => {
    setUserChallenges(prev => prev.map(challenge => {
      if (challenge.id === id) {
        const newStatus = challenge.status === 'active' ? 'paused' : 
                         challenge.status === 'paused' ? 'active' : 'completed';
        return { ...challenge, status: newStatus };
      }
      return challenge;
    }));
  };

  const completeChallenge = (challengeId: string) => {
    const challenge = userChallenges.find(c => c.id === challengeId);
    if (!challenge) return;

    // Mark challenge as completed
    setUserChallenges(prev => prev.map(c => 
      c.id === challengeId 
        ? { ...c, status: 'completed' as const, progress: 100 }
        : c
    ));

    // Save to localStorage
    const updatedChallenges = userChallenges.map(c => 
      c.id === challengeId 
        ? { ...c, status: 'completed' as const, progress: 100 }
        : c
    );
    localStorage.setItem('userChallenges', JSON.stringify(updatedChallenges));

    // Show eco coins notification first
    setTimeout(() => {
      showEcoCoinsNotification(50, 'Challenge completed!');
      
      // Update eco coins state
      const newCoins = userEcoCoins + 50;
      setUserEcoCoins(newCoins);
      
      // Show coupon notification after a delay
      setTimeout(() => {
        const brands = ['EcoGreen', 'SustainableLiving', 'GreenChoice', 'EcoFriendly Co.'];
        const randomBrand = brands[Math.floor(Math.random() * brands.length)];
        const coupon = {
          id: Date.now().toString(),
          brandName: randomBrand,
          discount: '15%',
          code: `ECO${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          isUsed: false
        };
        
        showCouponUnlockedNotification(coupon);
      }, 2000);
    }, 100);
  };

  const activeChallenges = userChallenges.filter(c => c.status === 'active');
  const completedChallenges = userChallenges.filter(c => c.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/eco-connect">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to EcoConnect
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="h-5 w-5 text-eco-primary" />
                My Challenges
              </h1>
              <p className="text-xs text-muted-foreground">Level up your eco game</p>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
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

        {/* Active Challenges */}
        <motion.section
          className="mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Target className="h-6 w-6 text-eco-primary" />
              Active Challenges
              <Badge className="bg-eco-primary text-primary-foreground">{activeChallenges.length}</Badge>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence>
              {activeChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50 overflow-hidden">
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleChallengeStatus(challenge.id)}
                        >
                          {challenge.status === 'active' ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm">{challenge.description}</p>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-bold">{challenge.progress}%</span>
                        </div>
                        <Progress 
                          value={challenge.progress} 
                          className="h-3"
                        />
                      </div>

                      {/* Partner Info (if exists) */}
                      {challenge.partnerId && (
                        <div className="flex items-center gap-2 p-3 bg-eco-muted/20 rounded-lg">
                          <Users className="h-4 w-4 text-eco-primary" />
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={challenge.partnerAvatar} />
                            <AvatarFallback className="text-xs">
                              {challenge.partnerName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            With {challenge.partnerName}
                          </span>
                        </div>
                      )}

                      {/* Challenge Details */}
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

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          className="flex-1"
                          onClick={() => toggleChallengeStatus(challenge.id)}
                        >
                          {challenge.status === 'active' ? (
                            <Pause className="h-4 w-4 mr-2" />
                          ) : (
                            <Play className="h-4 w-4 mr-2" />
                          )}
                          {challenge.status === 'active' ? 'Pause' : 'Resume'}
                        </Button>
                        <Button 
                          className="flex-1 bg-gradient-primary hover:shadow-glow"
                          onClick={() => completeChallenge(challenge.id)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Mark Complete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Completed Challenges */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Award className="h-6 w-6 text-verified" />
              Completed Challenges
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
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-green-800">{challenge.title}</h4>
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          COMPLETED
                        </Badge>
                      </div>
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-green-600">+{challenge.xpReward} XP earned</span>
                      <span className="text-green-600 font-medium">{challenge.reward}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Challenges;