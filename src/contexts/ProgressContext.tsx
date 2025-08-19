import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProgressContextType {
  currentStep: number;
  currentQuestion: number;
  totalSteps: number;
  totalQuestions: number;
  setCurrentStep: (step: number) => void;
  setCurrentQuestion: (question: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  getProgressPercentage: () => number;
  getQuestionProgress: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalSteps = 4;
  const totalQuestions = 10;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / totalSteps) * 100;
  };

  const getQuestionProgress = () => {
    return (currentQuestion / totalQuestions) * 100;
  };

  return (
    <ProgressContext.Provider value={{
      currentStep,
      currentQuestion,
      totalSteps,
      totalQuestions,
      setCurrentStep,
      setCurrentQuestion,
      nextStep,
      prevStep,
      nextQuestion,
      prevQuestion,
      getProgressPercentage,
      getQuestionProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};