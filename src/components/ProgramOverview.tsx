import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Target } from "lucide-react";

export const ProgramOverview = () => {
  const phases = [
    {
      title: "Foundation Learning",
      timeframe: "Days 1-3",
      description: "Understanding your depression and building awareness",
      icon: Target
    },
    {
      title: "First Coping Tool",
      timeframe: "Day 4",
      description: "Learn your first practical tool for managing symptoms",
      icon: CheckCircle
    },
    {
      title: "Building Your Toolkit",
      timeframe: "Weeks 2-8",
      description: "Master 11 additional evidence-based tools and techniques",
      icon: Clock
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            This 8-week program will teach you 12 specific tools to manage postpartum depression
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We know you're ready for relief now. Here's exactly what to expect as we build your depression-fighting toolkit together.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-12">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-border transform -translate-x-1/2"></div>
          
          <div className="space-y-8 md:space-y-12">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div key={index} className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 w-6 h-6 bg-primary rounded-full transform -translate-x-1/2 z-10 border-4 border-background"></div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{phase.title}</h3>
                            <span className="text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                              {phase.timeframe}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{phase.description}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  {/* Spacer for the other side */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Commitment */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-accent/5 border-accent/20">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Are you ready to stick with us through the learning phase to build your toolkit?
            </h3>
            <p className="text-muted-foreground">
              Real change takes time, but we'll support you every step of the way.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};