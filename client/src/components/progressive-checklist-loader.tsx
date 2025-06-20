import { useState, useEffect } from "react";
import { Check, ChevronRight, CheckCircle2 } from "lucide-react";

interface ProgressiveChecklistLoaderProps {
  title: string;
  steps: string[];
  onComplete: () => void;
}

export default function ProgressiveChecklistLoader({ title, steps, onComplete }: ProgressiveChecklistLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentStep < steps.length) {
      // Start loading animation for current step
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        setIsLoading(false);
        
        // Small delay before moving to next step
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 300);
      }, 6000); // 6 seconds per step

      return () => clearTimeout(timer);
    } else if (currentStep === steps.length) {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 800);

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

        {/* Single Step Loading - Configuration Style */}
        <div className="max-w-md mx-auto space-y-3">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = currentStep === index;
            
            // Only show completed steps and current active step
            if (!isCompleted && !isActive) {
              return null;
            }

            return (
              <div 
                key={index} 
                className={`
                  flex items-center gap-3 p-3 rounded-lg transition-all duration-500
                  ${isCompleted ? 'bg-green-50 border border-green-200' : 'bg-cvc-yellow/10 border border-cvc-yellow/30'}
                `}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : isActive ? (
                  <div className="w-5 h-5 border-2 border-cvc-yellow border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                )}
                
                <span className={`text-sm ${
                  isCompleted ? 'text-gray-900 font-medium' : 
                  isActive ? 'text-gray-900 font-medium' : 
                  'text-gray-500'
                }`}>
                  {step}
                </span>
                
                {/* Loading dots for active step */}
                {isActive && (
                  <div className="flex gap-1 ml-auto">
                    <div className="w-1.5 h-1.5 bg-cvc-yellow rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-cvc-yellow rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                    <div className="w-1.5 h-1.5 bg-cvc-yellow rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
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