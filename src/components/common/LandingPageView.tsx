import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Palmtree, 
  Briefcase, 
  UserCheck, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  LogIn, 
  UserPlus,
  Heart
} from 'lucide-react';

export const LandingPageView: React.FC = () => {
  const { openAuthModal, dismissLanding } = useApp();

  return (
    <div className="min-h-[88vh] flex flex-col items-center justify-center py-10 sm:py-16 px-3 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Hero Card Container - Larger on Desktop */}
      <div className="max-w-5xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-colors">
        
        {/* Top Header Banner - Bigger in Desktop View */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-8 sm:p-14 md:p-20 text-white relative overflow-hidden group">
          {/* Decorative background circles */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-emerald-600/30 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute -left-16 -top-16 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />

          {/* Falling leaves simulation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-2 left-[10%] text-emerald-300 animate-fall-slow opacity-75 text-xl select-none">🌿</div>
            <div className="absolute top-0 left-[25%] text-teal-300 animate-fall-fast opacity-80 text-base select-none" style={{ animationDelay: '1.2s' }}>🍃</div>
            <div className="absolute top-3 left-[45%] text-emerald-200 animate-fall-slow opacity-60 text-lg select-none" style={{ animationDelay: '2.5s' }}>🌴</div>
            <div className="absolute top-1 left-[70%] text-teal-200 animate-fall-fast opacity-70 text-xl select-none" style={{ animationDelay: '0.8s' }}>🌿</div>
            <div className="absolute top-2 left-[88%] text-emerald-300 animate-fall-slow opacity-80 text-base select-none" style={{ animationDelay: '3.1s' }}>🍃</div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:rotate-3 transition-transform duration-300">
              <Palmtree className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-200 animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-bold tracking-wide shadow-xs">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Palawan Island, Philippines (Puerto Princesa, El Nido, Coron & More)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
              Hanap Palawan Trabaho
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-emerald-100 max-w-2xl font-normal leading-relaxed">
              Ang opisyal na tulay sa pagitan ng mga de-kalidad na manggagawang Palaweño at mga pinagkakatiwalaang employer sa buong Palawan.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="p-6 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center text-center space-y-2.5 hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Lokal at Direktang Trabaho</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Hanapin ang tamang posisyon sa turismo, agrikultura, IT, hospitality, at pamahalaan.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center text-center space-y-2.5 hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Gabay Palaweño AI</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              AI assistant para sa resume building, interview preparation, at payo sa pasahod.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center text-center space-y-2.5 hover:border-emerald-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Ligtas at Verified</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Ligtas na proseso ng aplikasyon at direktang pakikipag-ugnayan sa mga kumpanya.
            </p>
          </div>
        </div>

        {/* Action Buttons Zone */}
        <div className="p-8 sm:p-12 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => openAuthModal('signup', 'seeker')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Gumawa ng Account / Sign Up</span>
          </button>

          <button
            type="button"
            onClick={() => openAuthModal('signin', 'seeker')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-300 dark:border-slate-700"
          >
            <LogIn className="w-4 h-4" />
            <span>Mag-sign In</span>
          </button>

          <button
            type="button"
            onClick={dismissLanding}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 font-semibold text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Magpatuloy sa Job Feed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Note */}
        <div className="px-8 py-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <span>Para sa progresibong Palawan · Trabaho Para sa Palaweño</span>
        </div>

      </div>
    </div>
  );
};
