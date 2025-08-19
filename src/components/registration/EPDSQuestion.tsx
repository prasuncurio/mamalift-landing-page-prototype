import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "@/contexts/FormContext";
import { useProgress } from "@/contexts/ProgressContext";
import { EPDSQuestion as EPDSQuestionType } from "@/data/epdsQuestions";

interface EPDSQuestionProps {
  question: EPDSQuestionType;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

export const EPDSQuestion = ({ question, onNext, onPrevious, canGoBack, canGoNext }: EPDSQuestionProps) => {
  const { formData, updateEPDSResponse } = useForm();
  const { currentQuestion, totalQuestions } = useProgress();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Load existing response if available
  useEffect(() => {
    const existingResponse = formData.epdsResponses.find(r => r.questionId === question.id);
    if (existingResponse) {
      const optionIndex = question.options.findIndex(opt => opt.score === existingResponse.score);
      setSelectedOption(optionIndex);
    } else {
      setSelectedOption(null);
    }
  }, [question.id, formData.epdsResponses, question.options]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const selectedAnswer = question.options[optionIndex];
    
    updateEPDSResponse({
      questionId: question.id,
      score: selectedAnswer.score,
      answer: selectedAnswer.text,
    });
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion} of {totalQuestions}</span>
            <span>{Math.round((currentQuestion / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className={`p-8 mb-8 ${question.isCritical ? 'border-crisis/30 bg-crisis/5' : 'bg-card'} shadow-lg`}>
          {question.isCritical && (
            <div className="flex items-center gap-2 mb-6 p-4 bg-crisis/10 rounded-lg border border-crisis/20">
              <AlertTriangle className="w-5 h-5 text-crisis flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-crisis">Critical Safety Question</p>
                <p className="text-xs text-crisis/80">Your safety is our top priority. Please answer honestly.</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              {question.question}
            </h2>
            {question.context && (
              <p className="text-muted-foreground">
                {question.context}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedOption === index
                    ? question.isCritical
                      ? 'border-crisis bg-crisis/10 text-foreground'
                      : 'border-primary bg-primary/10 text-foreground'
                    : 'border-border hover:border-primary/50 hover:bg-accent/20 text-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.text}</span>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedOption === index
                      ? question.isCritical
                        ? 'border-crisis bg-crisis'
                        : 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {selectedOption === index && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!canGoBack}
              className="flex items-center gap-2 w-full sm:w-auto order-2 sm:order-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={selectedOption === null || !canGoNext}
              className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2"
            >
              {currentQuestion === totalQuestions ? 'Complete Assessment' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};