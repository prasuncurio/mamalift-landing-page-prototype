import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Phone, X } from "lucide-react";
import { useState } from "react";

export const CrisisFloatingButton = () => {
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowCrisisModal(true)}
          className="bg-crisis text-white hover:bg-crisis/90 shadow-lg rounded-full px-6 py-3 text-sm font-semibold"
        >
          <Heart className="w-4 h-4 mr-2" />
          Need Help Now?
        </Button>
      </div>

      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-card p-6 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-crisis" />
                <h3 className="text-xl font-semibold text-foreground">Immediate Support</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCrisisModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="bg-crisis/10 rounded-lg p-4">
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
                  You're not alone, and help is available immediately.
                </p>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => setShowCrisisModal(false)}
                  variant="outline"
                  className="w-full"
                >
                  Continue Assessment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};