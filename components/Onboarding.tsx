import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const ONBOARDING_STEPS = [
  {
    icon: 'bolt',
    title: 'Welcome to ForgeBody',
    subtitle: 'Human Performance OS',
    description: 'Your personal health dashboard that works with any affordable smartwatch. Get premium insights without the premium price.',
    features: ['Universal device support', 'AI-powered coaching', 'No subscription required'],
  },
  {
    icon: 'watch',
    title: 'Connect Your Device',
    subtitle: 'Works With Budget Smartwatches',
    description: 'ForgeBody syncs with popular affordable wearables through Health Connect (Android) or Apple HealthKit (iOS).',
    features: ['Xiaomi Mi Band', 'Amazfit', 'Fitbit', 'Samsung', 'Huawei', 'Realme', 'Honor'],
  },
  {
    icon: 'monitoring',
    title: 'Track What Matters',
    subtitle: 'Comprehensive Health Metrics',
    description: 'Monitor your daily activity, sleep quality, heart rate, and hydration. Set personal goals and watch your progress.',
    features: ['Steps & Activity', 'Sleep Analysis', 'Heart Rate Trends', 'Hydration Tracking'],
  },
  {
    icon: 'auto_awesome',
    title: 'AI-Powered Insights',
    subtitle: 'Personalized Recommendations',
    description: 'Get actionable insights powered by AI. Understand your body better and optimize your performance.',
    features: ['Weekly Reports', 'Trend Analysis', 'Recovery Recommendations', 'Goal Suggestions'],
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-900" style={{ fontSize: '16px' }}>bolt</span>
            </div>
            <span className="text-white font-bold tracking-wider text-sm">FORGEBODY</span>
          </div>
          <button 
            onClick={handleSkip}
            className="text-slate-500 hover:text-white tech-label transition-colors"
          >
            Skip
          </button>
        </div>

        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
          <div className="mb-12">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-emerald-400 text-4xl">{step.icon}</span>
            </div>
            <span className="tech-label text-emerald-400 mb-4 block">{step.subtitle}</span>
            <h1 className="text-5xl font-black text-white tracking-tight mb-6 italic uppercase">{step.title}</h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-lg">{step.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-12">
            {step.features.map((feature, idx) => (
              <div 
                key={feature}
                className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
                style={{ 
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
                  transition: `all 0.3s ease-out ${idx * 50}ms`
                }}
              >
                <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {ONBOARDING_STEPS.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep 
                    ? 'w-8 bg-emerald-500' 
                    : idx < currentStep 
                      ? 'w-4 bg-emerald-500/50' 
                      : 'w-4 bg-white/20'
                }`}
              ></div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold tracking-wide transition-all flex items-center gap-3 group"
          >
            {isLastStep ? 'Get Started' : 'Continue'}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              {isLastStep ? 'rocket_launch' : 'arrow_forward'}
            </span>
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center justify-center gap-8">
            {['Xiaomi', 'Amazfit', 'Fitbit', 'Samsung', 'Huawei'].map((brand) => (
              <span key={brand} className="text-slate-600 text-sm font-medium">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
