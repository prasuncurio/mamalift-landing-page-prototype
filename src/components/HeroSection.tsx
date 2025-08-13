import { Button } from "@/components/ui/button";
import heroImage from "@/assets/mama-hero.avif";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-background to-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                You're not alone. Thousands of mothers feel exactly like you do right now.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Get immediate support for what you're experiencing, plus proven treatment that builds over time.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6">
                Start My Program
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Get Support Now
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>FDA Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Insurance Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Clinically Proven</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="A mother looking hopeful and supported"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};