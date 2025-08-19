import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/contexts/FormContext';
import { useProgress } from '@/contexts/ProgressContext';
import { ProgressBar } from '@/components/registration/ProgressBar';
import { CrisisFloatingButton } from '@/components/registration/CrisisFloatingButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Clock, Star, MapPin, GraduationCap, Heart } from 'lucide-react';
import drSarahMitchell from "@/assets/dr-sarah-mitchell.jpg";

export const InsuranceTherapistMatching = () => {
  const navigate = useNavigate();
  const { formData, updateInsurance } = useForm();
  const { setCurrentStep } = useProgress();

  // Set correct step on component mount
  React.useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]);

  const [insuranceData, setInsuranceData] = useState({
    provider: formData.insurance?.provider || '',
    memberId: formData.insurance?.memberId || '',
    groupNumber: formData.insurance?.groupNumber || '',
  });

  const [selectedAppointment, setSelectedAppointment] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isPlusProgramUser = formData.programType === 'MamaLift Plus';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!insuranceData.provider) newErrors.provider = 'Insurance provider is required';
    if (!insuranceData.memberId.trim()) newErrors.memberId = 'Member ID is required';
    if (!selectedAppointment) newErrors.appointment = 'Please select an appointment time';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    updateInsurance({
      ...insuranceData,
      selectedAppointment,
      therapistId: 'dr-sarah-mitchell',
      matchedDate: new Date().toISOString(),
    });

    // Navigate to completion/confirmation page
    navigate('/registration/complete');
  };

  const handleInputChange = (field: string, value: string) => {
    setInsuranceData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const availableSlots = [
    { id: '1', date: 'Tomorrow', time: '2:00 PM', isPriority: true },
    { id: '2', date: 'Thursday', time: '10:00 AM', isPriority: false },
    { id: '3', date: 'Thursday', time: '3:30 PM', isPriority: true },
    { id: '4', date: 'Friday', time: '11:00 AM', isPriority: false },
    { id: '5', date: 'Monday', time: '9:00 AM', isPriority: true },
    { id: '6', date: 'Monday', time: '4:00 PM', isPriority: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ProgressBar />
          
          <div className="mt-8">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-8 bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardTitle className="text-3xl font-bold text-foreground">
                  Let's Connect You with Your Therapist
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground mt-3">
                  Step 4 of 4: Insurance & Provider Matching
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  Ensuring you can access care without financial barriers
                </p>
              </CardHeader>

              <CardContent className="p-8 space-y-8">
                {/* Program Benefits Preview */}
                <div className={`p-6 rounded-lg border-l-4 ${isPlusProgramUser ? 'border-l-orange-500 bg-orange-50/50' : 'border-l-blue-500 bg-blue-50/50'} bg-muted/30`}>
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Your Coverage Benefits
                  </h3>
                  {isPlusProgramUser ? (
                    <p className="text-sm text-foreground/80">
                      🌟 Your enhanced coverage includes: 8-week program + bi-weekly sessions + priority support
                    </p>
                  ) : (
                    <p className="text-sm text-foreground/80">
                      ✅ Your insurance covers: 8-week digital program + weekly therapist sessions
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Insurance Verification */}
                  <div className="bg-gradient-to-r from-background to-muted/20 p-6 rounded-xl border border-border/50 space-y-6">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Insurance Verification
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-sm font-medium text-foreground">
                          Insurance Provider <span className="text-destructive">*</span>
                        </Label>
                        <Select value={insuranceData.provider} onValueChange={(value) => handleInputChange('provider', value)}>
                          <SelectTrigger className={`transition-all duration-200 ${errors.provider ? 'border-destructive ring-destructive/20' : 'hover:border-primary/50 focus:border-primary'}`}>
                            <SelectValue placeholder="Select your insurance provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aetna">🏥 Aetna</SelectItem>
                            <SelectItem value="anthem">🔵 Anthem Blue Cross Blue Shield</SelectItem>
                            <SelectItem value="cigna">⚕️ Cigna</SelectItem>
                            <SelectItem value="humana">💚 Humana</SelectItem>
                            <SelectItem value="kaiser">🏨 Kaiser Permanente</SelectItem>
                            <SelectItem value="molina">🌟 Molina Healthcare</SelectItem>
                            <SelectItem value="tricare">🇺🇸 Tricare</SelectItem>
                            <SelectItem value="united">🛡️ United Healthcare</SelectItem>
                            <SelectItem value="other">📋 Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.provider && <p className="text-sm text-destructive mt-1 flex items-center gap-1">⚠️ {errors.provider}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="memberId" className="text-sm font-medium text-foreground">
                          Member/Policy ID <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="memberId"
                          value={insuranceData.memberId}
                          onChange={(e) => handleInputChange('memberId', e.target.value)}
                          className={`transition-all duration-200 ${errors.memberId ? 'border-destructive ring-destructive/20' : 'hover:border-primary/50 focus:border-primary'}`}
                          placeholder="Enter your member ID"
                        />
                        {errors.memberId && <p className="text-sm text-destructive mt-1 flex items-center gap-1">⚠️ {errors.memberId}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="groupNumber" className="text-sm font-medium text-foreground">
                          Group Number <span className="text-muted-foreground">(optional)</span>
                        </Label>
                        <Input
                          id="groupNumber"
                          value={insuranceData.groupNumber}
                          onChange={(e) => handleInputChange('groupNumber', e.target.value)}
                          className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                          placeholder="Enter group number if available"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Therapist Matching */}
                  <div className="bg-gradient-to-r from-background to-muted/20 p-6 rounded-xl border border-border/50 space-y-6">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Your Matched Therapist
                    </h3>
                    
                    {/* Therapist Profile */}
                    <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={drSarahMitchell} alt="Dr. Sarah Mitchell" />
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">SM</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-bold text-foreground">Dr. Sarah Mitchell, PhD, LCSW</h4>
                            {isPlusProgramUser && <Badge variant="secondary" className="text-xs">Priority Match</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Licensed Clinical Psychologist</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-foreground/80">
                              <MapPin className="w-4 h-4 text-primary" />
                              Specializes in Postpartum Depression & Anxiety
                            </div>
                            <div className="flex items-center gap-2 text-sm text-foreground/80">
                              <GraduationCap className="w-4 h-4 text-primary" />
                              15 years experience, 500+ mothers helped
                            </div>
                            <div className="flex items-center gap-2 text-sm text-foreground/80">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              4.9/5 rating from patients
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm font-medium text-foreground">Personal Message</span>
                            </div>
                            <p className="text-sm text-foreground/80 italic">
                              "I understand exactly what you're going through. As a mother myself, I've dedicated my career to helping women navigate the challenges of motherhood with compassion and evidence-based care."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Appointment Scheduling */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Select Your First Appointment
                      </h4>
                      
                      {isPlusProgramUser && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <p className="text-sm text-orange-800">
                            🚀 As a MamaLift Plus member, you get priority access to the earliest appointment slots
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {availableSlots.map((slot) => (
                          <div
                            key={slot.id}
                            className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                              selectedAppointment === slot.id
                                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                : 'border-border hover:border-primary/50 hover:bg-muted/30'
                            } ${
                              slot.isPriority && isPlusProgramUser ? 'ring-1 ring-orange-400 bg-orange-50/50' : ''
                            }`}
                            onClick={() => {
                              setSelectedAppointment(slot.id);
                              if (errors.appointment) {
                                setErrors(prev => ({ ...prev, appointment: '' }));
                              }
                            }}
                          >
                            {slot.isPriority && isPlusProgramUser && (
                              <Badge variant="outline" className="absolute -top-2 -right-2 text-xs bg-orange-100 text-orange-700 border-orange-300">
                                Priority
                              </Badge>
                            )}
                            <div className="text-sm font-medium text-foreground">{slot.date}</div>
                            <div className="text-lg font-bold text-primary">{slot.time}</div>
                            <div className="text-xs text-muted-foreground">
                              {formData.demographics.sessionType === 'video' ? '📹 Video' : 
                               formData.demographics.sessionType === 'phone' ? '📞 Phone' : 
                               formData.demographics.sessionType === 'in-person' ? '🏥 In-person' : '📹 Video'}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {errors.appointment && <p className="text-sm text-destructive mt-1 flex items-center gap-1">⚠️ {errors.appointment}</p>}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-gradient-to-r from-muted/20 to-background p-6 rounded-xl border border-border/50">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/registration/step3')}
                        className="flex-1 h-12 text-base hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                      >
                        ← Back to Personalization
                      </Button>
                      
                      
                      <Button
                        type="submit"
                        className="flex-1 h-12 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Confirm My Appointment
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <CrisisFloatingButton />
    </div>
  );
};