import React from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CrisisSupport } from "@/components/CrisisSupport";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { useForm } from "@/contexts/FormContext";
import { Calendar, Download, Heart, MessageCircle, Shield, Smartphone, Star, CheckCircle, Clock, Phone } from "lucide-react";
import appStoreIcon from "@/assets/app-store-icon.png";
import googlePlayIcon from "@/assets/google-play-icon.png";
import drSarahMitchell from "@/assets/dr-sarah-mitchell.jpg";

export const RegistrationComplete = () => {
  const { formData } = useForm();
  const { programType, demographics, insurance } = formData;

  const isProgramPlus = programType === 'MamaLift Plus';

  const handleSendToPhone = () => {
    // In a real app, this would send SMS with download links
    alert("Download links sent to your phone!");
  };

  const formatAppointmentDate = (date: string | Date | null) => {
    if (!date) return 'Tomorrow at 2:00 PM';
    
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'EEEE, MMMM do \'at\' h:mm a');
    } catch {
      return 'Tomorrow at 2:00 PM';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <ConfettiAnimation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Depression-Fighting Toolkit Starts Now!
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Welcome to your 8-week journey to feeling better
          </p>
          <Badge variant="secondary" className="text-base px-4 py-2">
            Registration Complete ✨
          </Badge>
        </div>

        {/* Personal Care Team Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Your Personal Care Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={drSarahMitchell} alt="Dr. Sarah Mitchell" />
                <AvatarFallback className="text-lg">SM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">Dr. Sarah Mitchell is your assigned therapist</h3>
                <p className="text-muted-foreground mb-2">
                  Licensed Clinical Psychologist • 15 years experience
                </p>
                <p className="text-sm text-primary font-medium">
                  "I understand exactly what you're going through, and I'm here to support you every step of the way."
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">First Appointment</p>
                  <p className="text-sm text-muted-foreground">
                    {formatAppointmentDate(insurance.matchedDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Star className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Program Assignment</p>
                  <p className="text-sm text-muted-foreground">
                    You're enrolled in {programType}
                    {isProgramPlus && <Badge variant="outline" className="ml-2 text-xs">Enhanced</Badge>}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Download Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Download Your Program
            </CardTitle>
            <CardDescription>
              Your 8-week program is available in our mobile app. Download now to begin Day 1 of your depression-fighting toolkit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                size="lg" 
                className="flex-1 h-14 text-base bg-black hover:bg-black/90 text-white"
                onClick={() => window.open('#', '_blank')}
              >
                <img src={appStoreIcon} alt="App Store" className="w-6 h-6 mr-2" />
                Download on the App Store
              </Button>
              <Button 
                size="lg" 
                className="flex-1 h-14 text-base bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open('#', '_blank')}
              >
                <img src={googlePlayIcon} alt="Google Play" className="w-6 h-6 mr-2" />
                Get it on Google Play
              </Button>
            </div>

            <div className="text-center mb-6">
              <Button variant="outline" onClick={handleSendToPhone} className="mb-4">
                <Smartphone className="w-4 h-4 mr-2" />
                Send Download Link to My Phone
              </Button>
              <p className="text-sm text-muted-foreground">
                Available for iPhone and Android devices
              </p>
            </div>

            <Separator className="my-6" />

            {/* App Features Preview */}
            <div>
              <h3 className="font-semibold mb-4 text-center">What's in Your App:</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  Your personalized 8-week program
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  Daily toolkit-building exercises
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  Crisis support tools (including breathing exercises)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  Progress tracking & therapist communication
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Access Section */}
        <div className="">
          {/* Crisis Toolkit */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Crisis Toolkit (Available Now)
            </h2>
            <p className="text-muted-foreground mb-4">
              While you download the app, your crisis resources are still available here. These same tools will be in your mobile app.
            </p>
            <CrisisSupport />
          </div>

          {/* Account Setup */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              Account Setup
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Login Credentials</p>
                    <p className="text-sm text-muted-foreground">
                      Your login details have been sent to {demographics.email}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">App Login Instructions</p>
                    <p className="text-sm text-muted-foreground">
                      Use the same email and OTP from your email to log into the mobile app
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Automatic Sync</p>
                    <p className="text-sm text-muted-foreground">
                      Your therapist and appointment details will sync automatically
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What Happens Next Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              What Happens Next
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Right Now</p>
                  <p className="text-sm text-muted-foreground">
                    Download the app and log in with your credentials
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Tomorrow</p>
                  <p className="text-sm text-muted-foreground">
                    Day 1 program unlocks in your mobile app
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Your First Appointment ({formatAppointmentDate(insurance.matchedDate)})</p>
                  <p className="text-sm text-muted-foreground">
                    Video session with Dr. Mitchell
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Program-Specific Messaging */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your {programType} Experience</CardTitle>
          </CardHeader>
          <CardContent>
            {isProgramPlus ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm">Your enhanced program includes priority app notifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Bi-weekly therapist check-ins will be scheduled through the app</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm">Extra crisis support features are enabled in your app</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Your weekly therapist chat sessions will be coordinated through the app</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Complete daily exercises to unlock new tools each week</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Final Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button size="lg" className="flex-1 h-12 text-base">
            <Download className="w-4 h-4 mr-2" />
            Download iOS App
          </Button>
          <Button size="lg" className="flex-1 h-12 text-base">
            <Download className="w-4 h-4 mr-2" />
            Download Android App
          </Button>
        </div>

        {/* Final Reassurance */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                <strong>Remember:</strong> You now have 24/7 access to crisis support both on this website and in your mobile app. 
                Your assigned therapist and the structured program you committed to are now just a tap away.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};