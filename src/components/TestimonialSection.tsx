import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Quote } from "lucide-react";
import { useState } from "react";

export const TestimonialSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const testimonials = [
    {
      quote: "The breathing tool from Day 4 literally stopped my panic attacks. I use it every time I feel overwhelmed.",
      name: "Sarah M.",
      context: "Mother of 6-month-old",
      before: "Constant anxiety, couldn't sleep",
      after: "Managing daily stress, sleeping better"
    },
    {
      quote: "Week 3's thought challenging exercise helped me realize my negative thoughts weren't facts. Game changer.",
      name: "Jessica L.",
      context: "Mother of twins",
      before: "Overwhelmed by guilt and self-doubt",
      after: "Confident in my parenting abilities"
    },
    {
      quote: "The mood tracking tool helped me see patterns I never noticed. I could finally predict and prepare for difficult days.",
      name: "Maria R.",
      context: "Mother of 3-year-old",
      before: "Felt out of control emotionally",
      after: "Understanding my emotional patterns"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real Mothers, Real Results
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from mothers who've built their toolkits and transformed their experience.
          </p>
        </div>

        {/* Featured Video Testimonial */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  "This program gave me my life back"
                </h3>
                <p className="text-muted-foreground mb-6">
                  Watch Amanda share how the 8-week program helped her go from feeling completely overwhelmed 
                  to confident and in control of her emotions.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-4">
                    <span className="font-medium text-foreground">Before:</span>
                    <span className="text-muted-foreground">Crying daily, avoiding friends, constant exhaustion</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-medium text-foreground">After:</span>
                    <span className="text-muted-foreground">Enjoying motherhood, reconnected with support network</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-secondary/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {!isVideoPlaying ? (
                    <Button
                      size="lg"
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute z-10"
                    >
                      <Play className="w-6 h-6 mr-2" />
                      Play Video (60 seconds)
                    </Button>
                  ) : (
                    <div className="w-full h-full bg-black/80 flex items-center justify-center text-white">
                      <p>Video Player Placeholder</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Written Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 h-full flex flex-col">
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              <blockquote className="text-foreground mb-6 flex-1">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.context}</p>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex gap-2">
                    <span className="font-medium text-foreground">Before:</span>
                    <span className="text-muted-foreground">{testimonial.before}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-accent">After:</span>
                    <span className="text-muted-foreground">{testimonial.after}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};