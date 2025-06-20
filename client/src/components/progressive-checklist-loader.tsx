import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";

interface ProgressiveChecklistLoaderProps {
  title: string;
  steps: string[];
  onComplete: () => void;
}

export default function ProgressiveChecklistLoader({ title, steps, onComplete }: ProgressiveChecklistLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [animatingStep, setAnimatingStep] = useState<number | null>(null);

  useEffect(() => {
    if (currentStep < steps.length) {
      // Start animation for current step
      setAnimatingStep(currentStep);
      
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        setAnimatingStep(null);
        setCurrentStep(prev => prev + 1);
      }, 8500); // 8.5 seconds per step (2.5 + 6 additional)

      return () => clearTimeout(timer);
    } else if (currentStep === steps.length) {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 1500);

      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center z-50">
      <div className="max-w-lg w-full mx-4">
        {/* Title Section */}
        <div className="text-center mb-10">
          <div className="relative mb-6">
            <div className="w-4 h-4 bg-cvc-blue rounded-full mx-auto animate-pulse shadow-lg"></div>
            <div className="absolute inset-0 w-4 h-4 bg-cvc-blue rounded-full mx-auto animate-ping opacity-75"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-cvc-blue to-cvc-yellow mx-auto rounded-full"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Progresso</span>
            <span>{Math.round((completedSteps.length / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cvc-blue to-cvc-yellow rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Enhanced Checklist */}
        <div className="space-y-5">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = animatingStep === index;
            const isPending = index > currentStep;

            return (
              <div 
                key={index} 
                className={`
                  flex items-center gap-4 p-4 rounded-xl transition-all duration-700 ease-out
                  ${isActive ? 'bg-white shadow-lg transform scale-105 border-2 border-cvc-blue/20' : 
                    isCompleted ? 'bg-white shadow-md' : 'bg-gray-50'}
                `}
              >
                <div className={`
                  relative flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-bold text-white transition-all duration-500 shadow-lg
                  ${isCompleted ? 'bg-gradient-to-br from-cvc-blue to-cvc-dark-blue transform scale-110' : 
                    isActive ? 'bg-gradient-to-br from-cvc-blue to-cvc-dark-blue' : 
                    'bg-gray-300'}
                `}>
                  {isCompleted ? (
                    <Check className="h-7 w-7 animate-bounce" />
                  ) : isActive ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <div className="absolute inset-0 rounded-full bg-cvc-blue animate-pulse opacity-50"></div>
                    </>
                  ) : (
                    <span className="text-lg font-bold">{index + 1}</span>
                  )}
                  
                  {/* Premium glow effect for active step */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-cvc-blue opacity-30 animate-ping"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={`
                    font-semibold text-lg transition-all duration-500
                    ${isCompleted ? 'text-gray-900' : 
                      isActive ? 'text-cvc-blue' : 
                      'text-gray-400'}
                  `}>
                    {step}
                  </p>
                  
                  {/* Status indicator */}
                  <div className="mt-1">
                    {isCompleted && (
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Concluído
                      </span>
                    )}
                    {isActive && (
                      <span className="text-xs text-cvc-blue font-medium flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-cvc-blue rounded-full animate-pulse"></div>
                        Processando...
                      </span>
                    )}
                    {isPending && (
                      <span className="text-xs text-gray-400 font-medium">
                        Aguardando
                      </span>
                    )}
                  </div>
                </div>

                {/* Completion checkmark animation */}
                {isCompleted && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer with estimated time */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Tempo estimado: {Math.ceil((steps.length * 8.5) / 60)} minutos
          </p>
        </div>
      </div>
    </div>
  );
}