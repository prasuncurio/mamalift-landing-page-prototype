import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Phone, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CrisisIntervention = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-crisis/10 to-crisis/5 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-8 border-crisis/30 bg-card shadow-xl">
          {/* Alert Header */}
          <div className="flex items-center gap-3 mb-6 p-4 bg-crisis/10 rounded-lg border border-crisis/20">
            <AlertTriangle className="w-8 h-8 text-crisis flex-shrink-0" />
            <div>
              <h1 className="text-2xl font-bold text-crisis">Your Safety Comes First</h1>
              <p className="text-crisis/80">We want to connect you with immediate support</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 mb-8">
            <div className="text-center">
              <Heart className="w-16 h-16 text-crisis mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                You don't have to go through this alone
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Based on your responses, we want to make sure you have immediate access to support. 
                These feelings are temporary and treatable, and help is available right now.
              </p>
            </div>

            {/* Crisis Resources */}
            <div className="grid gap-4">
              <div className="bg-crisis/5 rounded-lg p-6 border border-crisis/20">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-crisis" />
                  <h3 className="text-xl font-semibold text-foreground">Immediate Crisis Support</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground mb-1">National Postpartum Support International</p>
                    <a 
                      href="tel:1-800-944-4773" 
                      className="text-2xl font-mono text-crisis hover:underline block"
                    >
                      1-800-944-4773
                    </a>
                    <p className="text-sm text-muted-foreground">Available 24/7 • Call now for immediate support</p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">What to expect when you call:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Immediate connection with a trained specialist</li>
                  <li>• No judgment, just support and understanding</li>
                  <li>• Help finding local resources and providers</li>
                  <li>• Someone who understands what you're going through</li>
                </ul>
              </div>

              <div className="bg-accent/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Remember:</h3>
                <p className="text-muted-foreground">
                  Postpartum depression and anxiety are medical conditions, not personal failures. 
                  Thousands of mothers have felt exactly what you're feeling right now, and with proper support, they got better. 
                  <strong className="text-foreground"> You will get through this.</strong>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 text-center">
              <Button
                size="lg"
                className="bg-crisis hover:bg-crisis/90 text-white text-lg px-8 py-6"
                onClick={() => window.open('tel:1-800-944-4773')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Support Line Now
              </Button>

              <div className="text-sm text-muted-foreground">
                <p className="mb-4">If you're in immediate danger, please call 911 or go to your nearest emergency room.</p>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="text-muted-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return to Homepage
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};