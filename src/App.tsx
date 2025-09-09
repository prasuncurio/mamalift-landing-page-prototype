
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "@/contexts/FormContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { RegistrationIntro } from "./pages/registration/RegistrationIntro";
import { EPDSAssessment } from "./pages/registration/EPDSAssessment";
import { AssessmentResults } from "./pages/registration/AssessmentResults";
import { PersonalizationForm } from "./pages/registration/PersonalizationForm";
import { InsuranceTherapistMatching } from "./pages/registration/InsuranceTherapistMatching";
import { RegistrationComplete } from "./pages/registration/RegistrationComplete";
import {FraudAnalyticsChatbot} from "./pages/chatbot/FraudAnalyticsChatbot"

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = useLoading();
  
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/registration/start" element={<RegistrationIntro />} />
        <Route path="/registration/step1" element={<EPDSAssessment />} />
        <Route path="/registration/step2" element={<AssessmentResults />} />
        <Route path="/registration/step3" element={<PersonalizationForm />} />
        <Route path="/registration/step4" element={<InsuranceTherapistMatching />} />
        <Route path="/registration/complete" element={<RegistrationComplete />} />
        <Route path="/chatbot/" element={<FraudAnalyticsChatbot  />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LoadingProvider>
        <FormProvider>
          <ProgressProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename="/mamalift-landing-page-prototype/">
              <AppContent />
            </BrowserRouter>
          </ProgressProvider>
        </FormProvider>
      </LoadingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
