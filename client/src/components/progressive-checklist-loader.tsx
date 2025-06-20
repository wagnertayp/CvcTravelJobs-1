import { useState, useEffect } from "react";
import { Check } from "lucide-react";

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
      }, 2500); // 2.5 seconds per step for comfortable reading

      return () => clearTimeout(timer);
    } else if (currentStep === steps.length) {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="w-3 h-3 bg-cvc-blue rounded-full mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        </div>

        {/* Checklist */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = currentStep === index;
            const isPending = index > currentStep;

            return (
              <div key={index} className="flex items-center gap-4">
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
                  ${isCompleted ? 'bg-cvc-blue' : isPending ? 'bg-gray-300' : 'bg-cvc-blue'}
                `}>
                  {isCompleted ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={`
                    font-medium text-lg
                    ${isCompleted || isActive ? 'text-gray-900' : 'text-gray-400'}
                  `}>
                    {step}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}