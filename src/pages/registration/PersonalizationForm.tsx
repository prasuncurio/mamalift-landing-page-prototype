import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/contexts/FormContext';
import { useProgress } from '@/contexts/ProgressContext';
import { ProgressBar } from '@/components/registration/ProgressBar';
import { CrisisFloatingButton } from '@/components/registration/CrisisFloatingButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const PersonalizationForm = () => {
  const navigate = useNavigate();
  const { formData, updateDemographics } = useForm();
  const { setCurrentStep } = useProgress();

  // Set correct step on component mount
  React.useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  const [localData, setLocalData] = useState({
    firstName: formData.demographics.firstName || '',
    lastName: formData.demographics.lastName || '',
    email: formData.demographics.email || '',
    phone: formData.demographics.phone || '',
    zipCode: formData.demographics.zipCode || '',
    sessionType: (formData.demographics.sessionType || undefined) as 'video' | 'phone' | 'in-person' | 'no-preference' | undefined,
    referralSource: formData.demographics.referralSource || '',
    providerName: formData.demographics.providerName || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isPlusProgramUser = formData.programType === 'MamaLift Plus';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!localData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!localData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!localData.email.trim()) newErrors.email = 'Email is required';
    if (!localData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!localData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!localData.referralSource) newErrors.referralSource = 'Please tell us how you found us';
    
    if (localData.email && !/\S+@\S+\.\S+/.test(localData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (localData.zipCode && !/^\d{5}(-\d{4})?$/.test(localData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Filter out undefined values for sessionType
    const dataToUpdate = {
      ...localData,
      sessionType: localData.sessionType || undefined
    };

    updateDemographics(dataToUpdate);
    navigate('/registration/step4');
  };

  const handleInputChange = (field: string, value: string) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const showProviderField = localData.referralSource && 
    ['My OB/GYN referred me', 'My baby\'s pediatrician referred me', 'My primary care doctor referred me', 'Another therapist referred me'].includes(localData.referralSource);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <ProgressBar />
          
          <div className="mt-8">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-8 bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardTitle className="text-3xl font-bold text-foreground">
                  {isPlusProgramUser 
                    ? "Let's Set Up Your Enhanced MamaLift Plus Care"
                    : "Let's Personalize Your MamaLift Program"
                  }
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground mt-3">
                  Step 3 of 4: Treatment Personalization
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8 space-y-8">
                {/* Program Information */}
                <div className={`p-6 rounded-lg border-l-4 ${isPlusProgramUser ? 'border-l-orange-500 bg-orange-50/50' : 'border-l-blue-500 bg-blue-50/50'} bg-muted/30`}>
                  <h3 className="font-bold text-foreground mb-3">Your Program Details</h3>
                  {isPlusProgramUser ? (
                    <div className="space-y-2">
                      <p className="text-sm text-foreground/80">✨ Your enhanced program includes bi-weekly therapist sessions</p>
                      <p className="text-sm text-foreground/80">🎯 You'll get priority scheduling and additional crisis support</p>
                      <p className="text-sm font-semibold text-orange-700 bg-orange-100 px-3 py-1 rounded-lg inline-block">
                        ⚡ Priority timeline: First appointment within 24 hours
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-foreground/80">💬 Based on your assessment, you'll receive weekly therapist check-ins on chat</p>
                      <p className="text-sm text-foreground/80">🛠️ Your treatment plan focuses on the 12 core depression-fighting tools</p>
                      <p className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg inline-block">
                        📅 Typical timeline: First appointment within 48 hours
                      </p>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div className="bg-gradient-to-r from-background to-muted/20 p-6 rounded-xl border border-border/50 space-y-6">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Basic Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                          What should your therapist call you? <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={localData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`transition-all duration-200 ${errors.firstName ? 'border-destructive ring-destructive/20' : 'hover:border-primary/50 focus:border-primary'}`}
                          placeholder="First name"
                        />
                        {errors.firstName && <p className="text-sm text-destructive mt-1 flex items-center gap-1">⚠️ {errors.firstName}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                          For your treatment records and appointments <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          value={localData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`transition-all duration-200 ${errors.lastName ? 'border-destructive ring-destructive/20' : 'hover:border-primary/50 focus:border-primary'}`}
                          placeholder="Last name"
                        />
                        {errors.lastName && <p className="text-sm text-destructive mt-1 flex items-center gap-1">⚠️ {errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        For your personalized treatment plan and appointment reminders <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={localData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`transition-all duration-200 ${errors.email ? 'border-destructive ring-destructive/20' : 'hover:border-primary/50 focus:border-primary'}`}
                        placeholder="Email address"
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1 flex items-center gap-1">⚠️ {errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                          For appointment confirmations and crisis support if needed <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={localData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`transition-all duration-200 ${errors.phone ? 'border-destructive ring-destructive/20' : 'hover:border-primary/50 focus:border-primary'}`}
                          placeholder="Phone number"
                        />
                        {errors.phone && <p className="text-sm text-destructive mt-1 flex items-center gap-1">⚠️ {errors.phone}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-sm font-medium text-foreground">
                          For finding the nearest care provider for you <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="zipCode"
                          value={localData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className={`transition-all duration-200 ${errors.zipCode ? 'border-destructive ring-destructive/20' : 'hover:border-primary/50 focus:border-primary'}`}
                          placeholder="Zip code"
                        />
                        {errors.zipCode && <p className="text-sm text-destructive mt-1 flex items-center gap-1">⚠️ {errors.zipCode}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Scheduling Preferences */}
                  <div className="bg-gradient-to-r from-background to-muted/20 p-6 rounded-xl border border-border/50 space-y-6">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Scheduling Preferences
                    </h3>
                    
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-foreground">Preferred Session Type</Label>
                      <RadioGroup 
                        value={localData.sessionType} 
                        onValueChange={(value) => handleInputChange('sessionType', value)}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="video" id="video" />
                          <Label htmlFor="video" className="flex-1 cursor-pointer">📹 Video sessions</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="phone" id="phone" />
                          <Label htmlFor="phone" className="flex-1 cursor-pointer">📞 Phone sessions</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="in-person" id="in-person" />
                          <Label htmlFor="in-person" className="flex-1 cursor-pointer">🏥 In-person (if available)</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="no-preference" id="no-preference" />
                          <Label htmlFor="no-preference" className="flex-1 cursor-pointer">✨ No preference</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Referral Information */}
                  <div className="bg-gradient-to-r from-background to-muted/20 p-6 rounded-xl border border-border/50 space-y-6">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Referral Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">
                          How did you find us? <span className="text-destructive">*</span>
                        </Label>
                        <Select value={localData.referralSource} onValueChange={(value) => handleInputChange('referralSource', value)}>
                          <SelectTrigger className={`transition-all duration-200 ${errors.referralSource ? 'border-destructive ring-destructive/20' : 'hover:border-primary/50 focus:border-primary'}`}>
                            <SelectValue placeholder="Select how you found us" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="My OB/GYN referred me">🩺 My OB/GYN referred me</SelectItem>
                            <SelectItem value="My baby's pediatrician referred me">👶 My baby's pediatrician referred me</SelectItem>
                            <SelectItem value="My primary care doctor referred me">⚕️ My primary care doctor referred me</SelectItem>
                            <SelectItem value="Another therapist referred me">🧠 Another therapist referred me</SelectItem>
                            <SelectItem value="Found online/social media">🌐 Found online/social media</SelectItem>
                            <SelectItem value="Friend or family recommendation">👥 Friend or family recommendation</SelectItem>
                            <SelectItem value="Through my insurance">🏥 Through my insurance</SelectItem>
                            <SelectItem value="Other">📝 Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.referralSource && <p className="text-sm text-destructive mt-1 flex items-center gap-1">⚠️ {errors.referralSource}</p>}
                      </div>

                      {showProviderField && (
                        <div className="space-y-2 animate-fade-in">
                          <Label htmlFor="providerName" className="text-sm font-medium text-foreground">Provider name (optional)</Label>
                          <Input
                            id="providerName"
                            value={localData.providerName}
                            onChange={(e) => handleInputChange('providerName', e.target.value)}
                            className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                            placeholder="Dr. Smith, ABC Medical Center, etc."
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-gradient-to-r from-muted/20 to-background p-6 rounded-xl border border-border/50">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/registration/step2')}
                        className="flex-1 h-12 text-base hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                      >
                        ← Back to Assessment Results
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 h-12 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Continue to Insurance & Therapist Matching →
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