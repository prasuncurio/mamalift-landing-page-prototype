import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Phone, Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const CrisisSupport = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<'breathe-in' | 'hold-in' | 'breathe-out' | 'hold-out'>('breathe-in');
  const [timeLeft, setTimeLeft] = useState(4);
  const [totalTime, setTotalTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const phases = [
    { name: 'breathe-in', duration: 4, label: 'Breathe In' },
    { name: 'hold-in', duration: 4, label: 'Hold' },
    { name: 'breathe-out', duration: 4, label: 'Breathe Out' },
    { name: 'hold-out', duration: 4, label: 'Hold' }
  ] as const;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Move to next phase
            const currentPhaseIndex = phases.findIndex(p => p.name === phase);
            const nextPhaseIndex = (currentPhaseIndex + 1) % phases.length;
            const nextPhase = phases[nextPhaseIndex];
            setPhase(nextPhase.name);
            return nextPhase.duration;
          }
          return prev - 1;
        });

        setTotalTime(prev => {
          const newTotal = prev + 1;
          // Stop after 3 minutes (180 seconds)
          if (newTotal >= 180) {
            setIsPlaying(false);
            return 0;
          }
          return newTotal;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, phase]);

  const handleBreathingExercise = () => {
    if (!isPlaying) {
      setPhase('breathe-in');
      setTimeLeft(4);
      setTotalTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const getCircleAnimation = () => {
    if (!isPlaying) return '';
    
    switch (phase) {
      case 'breathe-in':
        return 'animate-breathe-in';
      case 'hold-in':
        return 'scale-150';
      case 'breathe-out':
        return 'animate-breathe-out';
      case 'hold-out':
        return 'scale-100';
      default:
        return 'scale-100';
    }
  };

  const getCurrentPhaseLabel = () => {
    return phases.find(p => p.name === phase)?.label || 'Breathe In';
  };

  return (
    <section id="crisis-support" className="py-16 bg-crisis/5">
      <div className="container mx-auto px-4">
        <Card className="p-8 md:p-12 bg-card border-crisis/20 shadow-lg">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-crisis mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Feeling overwhelmed right now?
            </h2>
            <p className="text-lg text-muted-foreground">
              Take a moment. You're not alone, and help is available immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Breathing Exercise */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">
                3-Minute Guided Breathing
              </h3>
              
              <div className="relative bg-secondary/50 rounded-xl p-8">
                <div className="flex items-center justify-center mb-12">
                  <div className="relative">
                    <div className={`w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center transition-all duration-1000 ease-in-out ${getCircleAnimation()}`}>
                      <div className={`w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center transition-all duration-1000 ease-in-out ${isPlaying ? 'bg-primary/20' : ''}`}>
                        <div className="text-center">
                          {isPlaying && (
                            <>
                              <div className="text-sm font-semibold text-primary mb-1">
                                {getCurrentPhaseLabel()}
                              </div>
                              <div className="text-xs text-primary/70">
                                {timeLeft}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button
                    onClick={handleBreathingExercise}
                    className="mb-4"
                    size="lg"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Exercise
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Breathing Exercise
                      </>
                    )}
                  </Button>
                  
                  {isPlaying && (
                    <div className="space-y-2 animate-fade-in">
                      <p className="text-sm text-muted-foreground">
                        Follow the circle and breathe with the rhythm
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.floor((180 - totalTime) / 60)}:{String((180 - totalTime) % 60).padStart(2, '0')} remaining
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Crisis Resources */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">
                Immediate Support
              </h3>
              
              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-crisis" />
                    <h4 className="font-semibold text-foreground">Crisis Helpline</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    National Postpartum Support International
                  </p>
                  <a 
                    href="tel:1-800-944-4773" 
                    className="text-lg font-mono text-crisis hover:underline"
                  >
                    1-800-944-4773
                  </a>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Remember</h4>
                  <p className="text-sm text-muted-foreground">
                    What you're feeling is real, it's temporary, and it's treatable. 
                    Thousands of mothers have been exactly where you are right now and have gotten better.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              <strong>You don't need to register or sign up</strong> to use these resources right now.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};