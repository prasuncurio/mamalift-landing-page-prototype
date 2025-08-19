import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EPDSQuestion } from "@/components/registration/EPDSQuestion";
import { CrisisIntervention } from "@/components/registration/CrisisIntervention";
import { CrisisFloatingButton } from "@/components/registration/CrisisFloatingButton";
import { useForm } from "@/contexts/FormContext";
import { useProgress } from "@/contexts/ProgressContext";
import { epdsQuestions } from "@/data/epdsQuestions";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

export const EPDSAssessment = () => {
  const navigate = useNavigate();
  const { formData } = useForm();
  const { currentQuestion, setCurrentQuestion, nextQuestion, prevQuestion } = useProgress();
  const [showCrisisIntervention, setShowCrisisIntervention] = useState(false);

  // Check for crisis intervention after each response
  useEffect(() => {
    const q10Response = formData.epdsResponses.find(r => r.questionId === 10);
    if (q10Response && q10Response.score > 0) {
      setShowCrisisIntervention(true);
    }
  }, [formData.epdsResponses]);

  // Show crisis intervention page if triggered
  if (showCrisisIntervention) {
    return <CrisisIntervention />;
  }

  // Show welcome screen before first question
  if (currentQuestion === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-8 md:p-12 bg-card shadow-xl text-center">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Begin Your Assessment
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              You'll now answer one question at a time about how you've been feeling in the past 7 days. 
              Take your time and answer as honestly as possible.
            </p>
            <button
              onClick={() => setCurrentQuestion(1)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Start Question 1
            </button>
          </Card>
        </div>
        <CrisisFloatingButton />
      </div>
    );
  }

  const currentQuestionData = epdsQuestions[currentQuestion - 1];

  const handleNext = () => {
    if (currentQuestion === epdsQuestions.length) {
      // Assessment complete, navigate to results
      navigate('/registration/step2');
    } else {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion === 1) {
      setCurrentQuestion(0); // Go back to welcome screen
    } else {
      prevQuestion();
    }
  };

  return (
    <>
      <EPDSQuestion
        question={currentQuestionData}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoBack={true}
        canGoNext={true}
      />
      <CrisisFloatingButton />
    </>
  );
};