import { useState, useEffect } from 'react';
import { Loader2, Mail, CheckCircle } from 'lucide-react';

interface InitialFetchOverlayProps {
  show: boolean;
  onComplete: () => void;
  onError: (error: string) => void;
}

export function InitialFetchOverlay({ show, onComplete, onError }: InitialFetchOverlayProps) {
  const [step, setStep] = useState<'fetching' | 'summarizing' | 'ranking' | 'complete'>('fetching');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!show) return;

    let stepTimeout: NodeJS.Timeout;
    
    // Simulate progression through steps
    const progressSteps = async () => {
      setStep('fetching');
      await new Promise(resolve => {
        stepTimeout = setTimeout(resolve, 2000);
      });
      
      setStep('summarizing');
      await new Promise(resolve => {
        stepTimeout = setTimeout(resolve, 3000);
      });
      
      setStep('ranking');
      await new Promise(resolve => {
        stepTimeout = setTimeout(resolve, 2000);
      });
      
      setStep('complete');
      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    progressSteps().catch(err => {
      setError(err.message);
      onError(err.message);
    });

    return () => {
      if (stepTimeout) clearTimeout(stepTimeout);
    };
  }, [show, onComplete, onError]);

  if (!show) return null;

  const getStepIcon = (currentStep: string) => {
    if (step === 'complete' || (step === 'ranking' && currentStep !== 'ranking')) {
      return <CheckCircle className="w-5 h-5 text-success" />;
    }
    if (step === currentStep) {
      return <Loader2 className="w-5 h-5 animate-spin text-primary" />;
    }
    return <div className="w-5 h-5 rounded-full border-2 border-muted" />;
  };

  const getStepText = (stepName: string) => {
    if (step === 'complete' || (step === 'ranking' && stepName !== 'ranking')) {
      return 'text-success';
    }
    if (step === stepName) {
      return 'text-primary font-medium';
    }
    return 'text-muted-foreground';
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-heading-lg font-semibold text-foreground mb-2">
            Preparing your first digest...
          </h1>
          <p className="text-body text-foreground-muted">
            This will only take a moment while we analyze your emails
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {getStepIcon('fetching')}
            <span className={`text-body ${getStepText('fetching')}`}>
              Fetching your recent emails
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {getStepIcon('summarizing')}
            <span className={`text-body ${getStepText('summarizing')}`}>
              Summarizing with AI
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {getStepIcon('ranking')}
            <span className={`text-body ${getStepText('ranking')}`}>
              Ranking by importance
            </span>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-body text-destructive">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}