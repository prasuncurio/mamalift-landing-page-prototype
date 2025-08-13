import { HeroSection } from "@/components/HeroSection";
import { CrisisSupport } from "@/components/CrisisSupport";
import { ProgramOverview } from "@/components/ProgramOverview";
import { CredibilitySection } from "@/components/CredibilitySection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CrisisSupport />
      <ProgramOverview />
      <CredibilitySection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
};

export default Index;