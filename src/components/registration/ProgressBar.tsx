import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/contexts/ProgressContext";

interface ProgressBarProps {
  showQuestionProgress?: boolean;
}

export const ProgressBar = ({ showQuestionProgress = false }: ProgressBarProps) => {
  const { currentStep, totalSteps, currentQuestion, totalQuestions, getProgressPercentage, getQuestionProgress } = useProgress();

  const progressValue = showQuestionProgress ? getQuestionProgress() : getProgressPercentage();
  const currentCount = showQuestionProgress ? currentQuestion : currentStep;
  const totalCount = showQuestionProgress ? totalQuestions : totalSteps;
  const label = showQuestionProgress ? "Question" : "Step";

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{label} {currentCount} of {totalCount}</span>
        <span>{Math.round(progressValue)}%</span>
      </div>
      <Progress value={progressValue} className="h-2" />
      {!showQuestionProgress && (
        <div className="text-center text-sm text-muted-foreground">
          {currentStep === 1 && "Safety Assessment"}
          {currentStep === 2 && "Assessment Results"}
          {currentStep === 3 && "Personal Details"}
          {currentStep === 4 && "Insurance & Matching"}
        </div>
      )}
    </div>
  );
};