import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Palmtree, 
  Briefcase, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  UserPlus,
  LogIn,
  Users
} from 'lucide-react';

export const LandingPageView: React.FC = () => {
  const { openAuthModal, dismissLanding } = useApp();

  return (
    <div className="min-h-[88vh] flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-3 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Hero Card Container - Super Large on Desktop */}
      <div className="max-w-6xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-colors">
        
        {/* Top Header Banner - Grand Desktop View */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-5 sm:p-14 md:p-24 lg:p-28 text-white relative overflow-hidden group">
          {/* Decorative background circles */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-teal-400/25 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />

          {/* Falling leaves simulation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-2 left-[8%] text-emerald-300 animate-fall-slow opacity-85 text-2xl select-none">🌿</div>
            <div className="absolute top-0 left-[22%] text-teal-200 animate-fall-fast opacity-90 text-lg select-none" style={{ animationDelay: '1.2s' }}>🍃</div>
            <div className="absolute top-4 left-[42%] text-emerald-200 animate-fall-slow opacity-75 text-xl select-none" style={{ animationDelay: '2.5s' }}>🌴</div>
            <div className="absolute top-1 left-[65%] text-teal-300 animate-fall-fast opacity-85 text-2xl select-none" style={{ animationDelay: '0.8s' }}>🌿</div>
            <div className="absolute top-3 left-[85%] text-emerald-300 animate-fall-slow opacity-90 text-lg select-none" style={{ animationDelay: '3.1s' }}>🍃</div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6 sm:space-y-8">
            <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:rotate-3 transition-transform duration-300">
              <Palmtree className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-emerald-200 animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-200 text-xs sm:text-base font-bold tracking-wide shadow-xs">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
              <span>Palawan Island, Philippines (Puerto Princesa, El Nido, Coron & More)</span>
            </div>

            <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-lg max-w-4xl leading-tight">
              Hanap Palawan Trabaho
            </h1>

            <p className="text-sm sm:text-xl md:text-2xl text-emerald-100 max-w-3xl font-normal leading-relaxed">
              Ang opisyal at pinagkakatiwalaang tulay sa pagitan ng mga de-kalidad na manggagawang Palaweño at mga nangungunang employer sa buong Palawan.
            </p>

            {/* Quick Seeker & Employer Sign-In Callout Buttons on Banner */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md sm:max-w-xl">
              <button
                type="button"
                onClick={() => openAuthModal('signin', 'seeker')}
                className="w-full sm:w-1/2 py-3.5 px-5 rounded-2xl bg-white text-emerald-900 font-extrabold text-sm shadow-lg hover:bg-emerald-50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-emerald-700" />
                <span>Job Seeker Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => openAuthModal('signin', 'employer')}
                className="w-full sm:w-1/2 py-3.5 px-5 rounded-2xl bg-emerald-950/80 text-white border border-emerald-400/50 font-extrabold text-sm shadow-lg hover:bg-emerald-900 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-teal-300" />
                <span>Employer Sign In</span>
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="p-6 sm:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center text-center space-y-3 hover:border-emerald-500/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-2xs">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Lokal at Direktang Trabaho</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Hanapin ang tamang posisyon sa turismo, agrikultura, IT, hospitality, at pamahalaan sa buong lalawigan.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center text-center space-y-3 hover:border-emerald-500/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center shadow-2xs">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Gabay Palaweño AI</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Smart AI assistant para sa resume building, interview preparation, at payo sa pamantayan ng sahod sa Palawan.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center text-center space-y-3 hover:border-emerald-500/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Ligtas at Verified</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Ligtas na proseso ng aplikasyon, beripikadong kumpanya, at direktang interview room para sa employer at aplikante.
            </p>
          </div>
        </div>

        {/* Action Buttons Zone */}
        <div className="p-8 sm:p-12 lg:p-16 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => openAuthModal('signup', 'seeker')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-5 h-5" />
            <span>Gumawa ng Libreng Account</span>
          </button>

          <button
            type="button"
            onClick={() => openAuthModal('signin')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-300 dark:border-slate-700"
          >
            <LogIn className="w-5 h-5" />
            <span>Mag-sign In</span>
          </button>

          <button
            type="button"
            onClick={dismissLanding}
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Bumisita sa Job Listings</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Note */}
        <div className="px-8 py-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          <span>Para sa progresibong Palawan · Trabaho Para sa Palaweño</span>
        </div>

      </div>
    </div>
  );
};
