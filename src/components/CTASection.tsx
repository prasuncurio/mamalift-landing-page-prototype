import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLoading } from "@/contexts/LoadingContext";

export const CTASection = () => {
  const { setIsLoading } = useLoading();

  const handleStartProgram = () => {
    setIsLoading(true);
    // Small delay to show the loading state, then clear it when navigation completes
    setTimeout(() => setIsLoading(false), 1000);
  };
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to start building your depression-fighting toolkit?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Next, we'll ask some questions to personalize your treatment and ensure this program is safe and right for you.
              </p>
            </div>

            {/* What to Expect */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Personalized Assessment</h3>
                <p className="text-sm text-muted-foreground">5-minute questionnaire to tailor your treatment</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Safety Check</h3>
                <p className="text-sm text-muted-foreground">Ensuring this program meets your specific needs</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-crisis/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-crisis" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Immediate Access</h3>
                <p className="text-sm text-muted-foreground">Start your first learning module today</p>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="text-center mb-6">
              <Button size="lg" className="text-xl px-12 py-6 mb-4" asChild>
                <Link to="/registration/start" onClick={handleStartProgram}>
                  Start My Program
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                No payment required to begin assessment • Cancel anytime
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="border-t pt-6">
              <div className="flex justify-center items-center gap-8 flex-wrap text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>FDA Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Evidence-Based</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-crisis rounded-full"></div>
                  <span>Insurance Covered</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};