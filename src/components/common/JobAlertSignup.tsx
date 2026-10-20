import React, { useState } from 'react';
import { Mail, BellRing, CheckCircle2, Sparkles, Send, ShieldCheck, AlertCircle, RotateCcw } from 'lucide-react';

export const JobAlertSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState(() => {
    try {
      return localStorage.getItem('hanap_palawan_last_alert_email') || '';
    } catch {
      return '';
    }
  });

  const validateEmail = (val: string): boolean => {
    const trimmed = val.trim();
    if (!trimmed) {
      setEmailError('Mangyaring ilagay ang iyong email address.');
      return false;
    }
    // Standard RFC-compliant email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setEmailError('Wastong email ang kailangan (halimbawa: juan@gmail.com).');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError) {
      // Clear error once user enters a valid format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(val.trim())) {
        setEmailError(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      try {
        const existingAlerts = JSON.parse(localStorage.getItem('hanap_palawan_job_alerts_v4') || '[]');
        const newAlert = {
          email: cleanEmail,
          subscribedAt: new Date().toISOString()
        };
        localStorage.setItem('hanap_palawan_job_alerts_v4', JSON.stringify([...existingAlerts, newAlert]));
        localStorage.setItem('hanap_palawan_subscribed_alert', 'true');
        localStorage.setItem('hanap_palawan_last_alert_email', cleanEmail);
      } catch (err) {
        console.warn('Storage error', err);
      }

      setSubmittedEmail(cleanEmail);
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      setEmailError(null);
    }, 550);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmail('');
    setEmailError(null);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 dark:from-emerald-950/25 dark:via-slate-900 dark:to-slate-950 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-4 sm:p-6 shadow-xs relative overflow-hidden transition-all">
      {/* Decorative ambient background glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5">
        {/* Left Hook & Copy */}
        <div className="flex items-start gap-3.5 max-w-xl text-center lg:text-left flex-col sm:flex-row sm:items-center lg:items-start">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/25 mx-auto sm:mx-0">
            <BellRing className="w-5 h-5 text-emerald-100 animate-bounce" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                Lingguhang Palawan Job Alerts
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Libre · Linggu-linggo
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Maging una sa mga pinakabagong bakanteng trabaho sa Puerto Princesa, El Nido, Coron, San Vicente, at Remote WFH diretso sa iyong inbox.
            </p>
          </div>
        </div>

        {/* Right Column: Form with Validation or Emerald Success State */}
        <div className="w-full lg:w-auto shrink-0 max-w-md">
          {isSuccess ? (
            <div className="bg-emerald-600/10 dark:bg-emerald-950/40 border border-emerald-500/40 dark:border-emerald-500/50 rounded-2xl p-4 sm:p-4.5 text-left space-y-3 animate-in fade-in zoom-in-95 duration-200 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Mabuhay! Maligayang pagdating sa Job Alerts Community
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      Aktibo
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    Ipadadala ang lingguhang digest sa:
                  </p>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 truncate mt-0.5 font-mono">
                    {submittedEmail}
                  </p>
                </div>
              </div>

              {/* Confirmation badges */}
              <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-between gap-2 flex-wrap text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-medium text-emerald-800 dark:text-emerald-300">
                  <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Tuwing Lunes ng 8:00 AM</span>
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline font-semibold cursor-pointer inline-flex items-center gap-1 py-0.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Mag-subscribe ng ibang email</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1 min-w-[220px]">
                  <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                    emailError ? 'text-rose-500' : 'text-slate-400'
                  }`} />
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => email && validateEmail(email)}
                    placeholder="Ipasok ang email address..."
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-validation-error' : undefined}
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-white dark:bg-slate-800 border rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs min-h-[42px] ${
                      emailError
                        ? 'border-rose-400 dark:border-rose-500 ring-2 ring-rose-400/20'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/25 cursor-pointer flex items-center justify-center gap-1.5 shrink-0 min-h-[42px] focus-visible:outline-emerald-500"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Mag-subscribe</span>
                    </>
                  )}
                </button>
              </div>

              {/* Validation error message if invalid */}
              {emailError ? (
                <div 
                  id="email-validation-error"
                  role="alert"
                  className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium px-1 animate-in fade-in duration-150"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{emailError}</span>
                </div>
              ) : (
                /* Trust statement & Municipality scope */
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 px-1 gap-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Walang spam · Pwede mag-unsubscribe kahit kailan</span>
                  </span>
                  <span className="hidden sm:inline font-medium">Buong Palawan Coverage</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
