import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/contexts/FormContext";
import { useProgress } from "@/contexts/ProgressContext";
import { ProgressBar } from "@/components/registration/ProgressBar";
import { CrisisFloatingButton } from "@/components/registration/CrisisFloatingButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Heart, Clock, Users, Shield } from "lucide-react";

export const AssessmentResults = () => {
  const navigate = useNavigate();
  const { formData } = useForm();
  const { setCurrentStep } = useProgress();
  
  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  const { epdsScore, programType, riskLevel } = formData;

  // Redirect if no assessment data
  if (epdsScore === 0 && formData.epdsResponses.length === 0) {
    navigate('/registration/step1');
    return null;
  }

  const handleContinue = () => {
    if (programType === 'ineligible') {
      // Open crisis support resources
      window.open('tel:1-800-944-4773', '_self');
    } else {
      navigate('/registration/step3');
    }
  };

  const renderEligibleContent = () => {
    const isPlusProgram = programType === 'MamaLift Plus';
    
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-primary mx-auto" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            You're Eligible for {isPlusProgram ? 'MamaLift Plus' : 'MamaLift'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isPlusProgram 
              ? "Your assessment shows you need extra support - you'll get our enhanced program"
              : "Your assessment shows you're a great fit for our 8-week program"
            }
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Program Duration</h3>
            <p className="text-sm text-muted-foreground">
              8-week structured program with evidence-based tools
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Therapist Support</h3>
            <p className="text-sm text-muted-foreground">
              {isPlusProgram 
                ? "Bi-weekly sessions with priority scheduling"
                : "Weekly check-ins with licensed therapists"
              }
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">First Session</h3>
            <p className="text-sm text-muted-foreground">
              {isPlusProgram 
                ? "Priority matching - within 24 hours"
                : "Scheduled within 48 hours"
              }
            </p>
          </Card>
        </div>

        {isPlusProgram && (
          <Card className="p-6 bg-accent/10 border-accent">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="font-semibold text-accent mb-2">Enhanced Support Includes:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Additional crisis support resources</li>
                  <li>• Priority therapist matching and scheduling</li>
                  <li>• Bi-weekly instead of weekly sessions</li>
                  <li>• 24/7 crisis line access</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        <div className="text-center px-4">
          <Button onClick={handleContinue} size="lg" className="px-6 sm:px-8 w-full sm:w-auto min-h-[48px] whitespace-normal break-words">
            Continue to Personalize My Treatment
          </Button>
        </div>
      </div>
    );
  };

  const renderIneligibleContent = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <AlertTriangle className="w-16 h-16 text-accent mx-auto" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          We Want to Connect You with the Right Level of Care
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your assessment indicates you need more intensive support than our program provides
        </p>
      </div>

      <Card className="p-8 bg-accent/5 border-accent/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Recommended Resources</h3>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-semibold mb-2">Immediate Support</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Postpartum Support International Helpline
            </p>
            <a 
              href="tel:1-800-944-4773" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              1-800-944-4773
            </a>
          </div>
          
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-semibold mb-2">Crisis Text Support</h4>
            <p className="text-sm text-muted-foreground mb-2">
              National Crisis Text Line
            </p>
            <p className="text-primary font-medium">Text HOME to 741741</p>
          </div>
          
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-semibold mb-2">Find Local Therapists</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Psychology Today therapist directory
            </p>
            <a 
              href="https://www.psychologytoday.com/us/therapists" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Browse Local Providers
            </a>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="text-center">
          <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">
            This doesn't mean you're "too sick" - it means you deserve the most effective care for your situation. 
            These resources can provide the intensive support that will help you heal.
          </p>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleContinue} size="lg" className="px-8">
          Contact a Crisis Counselor
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => window.open('https://www.psychologytoday.com/us/therapists', '_blank')}
        >
          Access These Resources
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <ProgressBar />
        </div>
        
        <Card className="p-8 md:p-12 bg-card shadow-xl">
          {programType === 'ineligible' ? renderIneligibleContent() : renderEligibleContent()}
        </Card>
      </div>
      <CrisisFloatingButton />
    </div>
  );
};