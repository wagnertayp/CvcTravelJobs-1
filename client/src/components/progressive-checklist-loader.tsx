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

        {/* Sequential Loading Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = currentStep === index && isLoading;
            const isWaiting = currentStep === index && !isLoading;
            const isPending = index > currentStep;

            return (
              <div 
                key={index} 
                className={`
                  flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm border transition-all duration-500
                  ${isCompleted ? 'bg-green-500/20 border-green-400/40' :
                    isActive || isWaiting ? 'bg-cvc-yellow/20 border-cvc-yellow/40' :
                    'bg-white/10 border-white/20'}
                `}
              >
                <div className={`
                  relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500
                  ${isCompleted ? 'bg-green-500 text-white transform scale-110' : 
                    isActive || isWaiting ? 'bg-cvc-yellow text-cvc-blue' : 
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
                    ${isCompleted ? 'text-green-200' : 
                      isActive || isWaiting ? 'text-white' : 
                      'text-white/60'}
                  `}>
                    {step}
                  </p>
                  
                  {/* Status text */}
                  <div className="mt-1">
                    {isCompleted && (
                      <span className="text-xs text-green-300 font-medium">✓ Concluído</span>
                    )}
                    {isActive && (
                      <span className="text-xs text-cvc-yellow font-medium animate-pulse">⟳ Carregando...</span>
                    )}
                    {isWaiting && (
                      <span className="text-xs text-cvc-yellow font-medium">⏳ Finalizando...</span>
                    )}
                    {isPending && (
                      <span className="text-xs text-white/50 font-medium">⋯ Aguardando</span>
                    )}
                  </div>
                  
                  {/* Progress dots under active step */}
                  {isActive && (
                    <div className="flex gap-1 mt-2">
                      <div className="w-1 h-1 bg-cvc-yellow rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-cvc-yellow rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-1 bg-cvc-yellow rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      <div className="w-1 h-1 bg-cvc-yellow rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                      <div className="w-1 h-1 bg-cvc-yellow rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
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
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
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