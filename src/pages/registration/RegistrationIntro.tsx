import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/registration/ProgressBar";
import { CrisisFloatingButton } from "@/components/registration/CrisisFloatingButton";
import { Heart, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useEffect } from "react";

export const RegistrationIntro = () => {
  const navigate = useNavigate();
  const { setCurrentStep, setCurrentQuestion } = useProgress();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setCurrentStep(1);
    setCurrentQuestion(0);
    // Clear loading state when component mounts
    setIsLoading(false);
  }, [setCurrentStep, setCurrentQuestion, setIsLoading]);

  const handleStartAssessment = () => {
    navigate('/registration/step1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar />
        </div>

        {/* Main Content */}
        <Card className="p-8 md:p-12 bg-card shadow-xl">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Let's Begin Your Personalized Assessment
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              This 5-minute safety assessment helps us ensure this program is right for you and connect you with appropriate care.
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Step 1 of 4: Safety Assessment
            </div>
          </div>

          {/* What to Expect */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">What to expect:</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground">10 Simple Questions</h3>
                    <p className="text-sm text-muted-foreground">About how you've been feeling in the past 7 days</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground">Takes 5 Minutes</h3>
                    <p className="text-sm text-muted-foreground">One question at a time, at your own pace</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground">Personalized Care</h3>
                    <p className="text-sm text-muted-foreground">Your answers help us match you with the right level of support</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground">Safe & Confidential</h3>
                    <p className="text-sm text-muted-foreground">HIPAA-compliant with immediate crisis support if needed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why this assessment?</h3>
              <p className="text-muted-foreground mb-4">
                This is the Edinburgh Postnatal Depression Scale (EPDS), a clinically validated screening tool used by healthcare providers worldwide to assess perinatal mood.
              </p>
              <p className="text-muted-foreground mb-4">
                Your responses help us:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Determine if our program is the right fit for you</li>
                <li>• Connect you with appropriate level of care</li>
                <li>• Ensure your safety throughout the process</li>
                <li>• Personalize your treatment plan</li>
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-primary/5 rounded-lg p-6 mb-8 border border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-3">Before we begin:</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• <strong className="text-foreground">Answer honestly</strong> - there are no right or wrong answers</p>
              <p>• <strong className="text-foreground">Think about the past 7 days</strong> - focus on recent feelings, not your overall experience</p>
              <p>• <strong className="text-foreground">Take your time</strong> - you can pause and return to any question</p>
              <p>• <strong className="text-crisis">Your safety matters</strong> - if you're having thoughts of self-harm, we'll connect you with immediate support</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleStartAssessment}
              className="text-xl px-12 py-6 mb-4"
            >
              Begin Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground">
              This assessment is required to ensure program safety and effectiveness
            </p>
          </div>
        </Card>
      </div>

      <CrisisFloatingButton />
    </div>
  );
};