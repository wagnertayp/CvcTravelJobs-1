import { useState, useEffect } from "react";
import { Check, ChevronRight } from "lucide-react";

interface ProgressiveChecklistLoaderProps {
  title: string;
  steps: string[];
  onComplete: () => void;
}

export default function ProgressiveChecklistLoader({ title, steps, onComplete }: ProgressiveChecklistLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        setCurrentStep(prev => prev + 1);
      }, 7000); // 7 seconds per step

      return () => clearTimeout(timer);
    } else if (currentStep === steps.length) {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 500);

      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-cvc-blue flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4">
        {/* Header similar to breadcrumb */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChevronRight className="h-5 w-5 text-cvc-yellow" />
            <h1 className="text-white font-semibold text-lg">{title}</h1>
          </div>
          <div className="w-16 h-0.5 bg-cvc-yellow/70 mx-auto rounded-full"></div>
        </div>

        {/* Simple Progress Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = currentStep === index;
            const isPending = index > currentStep;

            return (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className={`
                  relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500
                  ${isCompleted ? 'bg-cvc-yellow text-cvc-blue transform scale-110' : 
                    isActive ? 'bg-cvc-yellow text-cvc-blue' : 
                    'bg-white/20 text-white/60'}
                `}>
                  {isCompleted ? (
                    <Check className="h-4 w-4 animate-bounce" />
                  ) : (
                    index + 1
                  )}
                  
                  {/* Loading ring animation for active step */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-cvc-yellow/30 border-t-cvc-yellow animate-spin"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={`
                    text-sm font-medium transition-all duration-300
                    ${isCompleted ? 'text-white' : 
                      isActive ? 'text-white animate-pulse' : 
                      'text-white/60'}
                  `}>
                    {step}
                  </p>
                  
                  {/* Progress dots under active step */}
                  {isActive && (
                    <div className="flex gap-1 mt-1">
                      <div className="w-1 h-1 bg-cvc-yellow/60 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-cvc-yellow/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-1 bg-cvc-yellow/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      <div className="w-1 h-1 bg-cvc-yellow/60 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                      <div className="w-1 h-1 bg-cvc-yellow/60 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                    </div>
                  )}
                </div>

                {/* Enhanced loading animation */}
                {isActive && (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-cvc-yellow rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-cvc-yellow rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                    <div className="w-1.5 h-1.5 bg-cvc-yellow rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                  </div>
                )}
                
                {/* Completion effect */}
                {isCompleted && (
                  <div className="w-4 h-4 bg-green-500/80 rounded-full flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Simple progress indicator */}
        <div className="mt-6 text-center">
          <div className="text-white/80 text-xs mb-2">
            {completedSteps.length} de {steps.length} etapas
          </div>
          <div className="w-full bg-white/20 rounded-full h-1">
            <div 
              className="h-full bg-cvc-yellow rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}