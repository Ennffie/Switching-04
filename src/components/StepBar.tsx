import React from 'react';
import { Check } from 'lucide-react';

interface StepBarProps {
  currentStep: number;
}

const StepBar: React.FC<StepBarProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: '選擇計劃' },
    { number: 2, label: '基金轉換指示' },
    { number: 3, label: '確認' },
  ];

  return (
    <div className="w-full bg-white px-4 py-6 border-b border-gray-100 mb-2">
      <div className="max-w-md mx-auto relative flex items-center justify-between">
        {/* Connecting Lines */}
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200 -z-0" />
        <div 
          className="absolute top-4 left-0 h-[2px] bg-[#E19C4B] transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {/* Step Items */}
        {steps.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isActive = index + 1 === currentStep;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${isCompleted 
                    ? 'bg-[#E19C4B] text-white shadow-sm' 
                    : isActive 
                      ? 'bg-white border-2 border-[#E19C4B] text-[#E19C4B] shadow-sm' 
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                  }
                `}
              >
                {isCompleted ? <Check size={18} strokeWidth={3} /> : step.number}
              </div>
              <span 
                className={`
                  text-xs font-medium transition-colors duration-300
                  ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepBar;
