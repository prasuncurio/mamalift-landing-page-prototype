import { Card } from "@/components/ui/card";
import { Shield, Award, Users, Clock } from "lucide-react";

export const CredibilitySection = () => {
  const credentials = [
    {
      icon: Shield,
      title: "FDA Approved",
      description: "Cleared as a prescription digital therapeutic",
      highlight: true
    },
    {
      icon: Award,
      title: "Clinically Proven",
      description: "Proven effective in multiple clinical trials",
      highlight: false
    },
    {
      icon: Users,
      title: "Insurance Covered",
      description: "Covered by major insurance providers",
      highlight: false
    },
    {
      icon: Clock,
      title: "Fast Access",
      description: "Connect with licensed therapists in 2 days, not 2-12 weeks",
      highlight: true
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-lg text-muted-foreground">
            The only FDA-approved digital therapeutic specifically designed for postpartum depression.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {credentials.map((credential, index) => {
            const Icon = credential.icon;
            return (
              <Card 
                key={index} 
                className={`p-6 text-center transition-all hover:shadow-lg ${
                  credential.highlight ? 'bg-primary/5 border-primary/20' : ''
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  credential.highlight ? 'bg-primary/10' : 'bg-accent/10'
                }`}>
                  <Icon className={`w-8 h-8 ${
                    credential.highlight ? 'text-primary' : 'text-accent'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {credential.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {credential.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Insurance Logos Placeholder */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">Accepted by major insurance providers:</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {['Blue Cross Blue Shield - HighMark', 'Blue Cross Blue Shield  - Horizon'].map((insurer, index) => (
              <div key={index} className="px-4 py-2 bg-card rounded-lg border text-sm text-muted-foreground font-medium">
                {insurer}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};