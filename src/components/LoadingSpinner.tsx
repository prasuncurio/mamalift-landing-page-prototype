import React from 'react';
import { Heart } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-xl shadow-xl border border-border/50 text-center">
        <div className="relative mb-6">
          <Heart className="w-12 h-12 text-primary mx-auto animate-pulse" />
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Getting your assessment ready...
        </h3>
        <p className="text-sm text-muted-foreground">
          This will just take a moment
        </p>
      </div>
    </div>
  );
};