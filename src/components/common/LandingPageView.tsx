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
  const { openAuthModal, dismissLanding, setSeekerTab, setEmployerTab, setRole, userProfile } = useApp();

  const handleOpenSeekerSection = (tab: 'jobs' | 'applications' | 'profile') => {
    if (tab === 'profile' && !userProfile) {
      openAuthModal(
        'signup',
        'seeker',
        'Kailangan mo munang gumawa ng account (Sign Up) o mag-Sign In bilang Job Seeker upang magamit ang Smart Resume & Profile Builder.'
      );
      return;
    }
    setRole('seeker');
    setSeekerTab(tab);
    dismissLanding();
  };

  const handleOpenVerifiedEmployersCard = () => {
    if (!userProfile || userProfile.role !== 'employer') {
      openAuthModal(
        'signup',
        'employer',
        'Kailangan mo ng account o mag-Sign Up / Sign In muna bilang Employer upang ma-access ang BIR & DTI Verified Employer Portal.'
      );
      return;
    }
    setRole('employer');
    setEmployerTab('profile');
    dismissLanding();
  };

  return (
    <div className="min-h-[88vh] flex flex-col items-center justify-center py-6 sm:py-12 md:py-16 px-3 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Hero Card Container - Super Large on Desktop */}
      <div className="max-w-6xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-colors">
        
        {/* Top Header Banner - Grand Desktop View */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-5 sm:p-14 md:p-20 lg:p-24 text-white relative overflow-hidden group">
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

          <div className="relative z-10 flex flex-col items-center text-center space-y-5 sm:space-y-7">
            <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:rotate-3 transition-transform duration-300">
              <Palmtree className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-emerald-200 animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-200 text-[11px] sm:text-sm font-bold tracking-wide shadow-xs">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>Palawan Island, Philippines (Puerto Princesa, El Nido, Coron & More)</span>
            </div>

            <h1 className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg max-w-4xl leading-tight">
              Hanap Palawan Trabaho
            </h1>

            <p className="text-xs sm:text-lg md:text-xl text-emerald-100 max-w-3xl font-normal leading-relaxed">
              Ang opisyal at pinagkakatiwalaang tulay sa pagitan ng mga de-kalidad na manggagawang Palaweño at mga nangungunang employer sa buong Palawan.
            </p>

            {/* Quick Seeker & Employer Sign-In Callout Buttons on Banner */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md sm:max-w-xl">
              <button
                type="button"
                onClick={() => openAuthModal('signin', 'seeker')}
                className="w-full sm:w-1/2 py-3.5 px-5 rounded-2xl bg-white text-emerald-900 font-extrabold text-xs sm:text-sm shadow-lg hover:bg-emerald-50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Mag-login bilang Job Seeker</span>
              </button>

              <button
                type="button"
                onClick={() => openAuthModal('signin', 'employer')}
                className="w-full sm:w-1/2 py-3.5 px-5 rounded-2xl bg-emerald-950/85 text-white border border-emerald-400/50 font-extrabold text-xs sm:text-sm shadow-lg hover:bg-emerald-900 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-teal-300 shrink-0" />
                <span>Mag-login bilang Employer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Menu / Features Grid */}
        <div className="p-5 sm:p-10 lg:p-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => handleOpenSeekerSection('jobs')}
            className="bg-white dark:bg-slate-900 p-5 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center text-center space-y-2.5 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Lokal at Direktang Trabaho
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Hanapin ang tamang posisyon sa turismo, agrikultura, IT, hospitality, at pamahalaan sa buong lalawigan.
            </p>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 pt-1">
              Tingnan ang Job Listings <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenSeekerSection('profile')}
            className="bg-white dark:bg-slate-900 p-5 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center text-center space-y-2.5 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Smart Resume & Profile Builder
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Buuin ang iyong propesyonal na Palaweño resume at subaybayan ang iyong mga aplikasyon at panayam.
            </p>
            <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 inline-flex items-center gap-1 pt-1">
              {userProfile ? 'Buksan ang My Profile' : 'Mag-Sign Up / Sign In para sa Profile'} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={handleOpenVerifiedEmployersCard}
            className="bg-white dark:bg-slate-900 p-5 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center text-center space-y-2.5 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              BIR & DTI Verified Employers
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Ligtas na proseso ng aplikasyon, beripikadong kumpanya, at direktang recruitment pipeline para sa negosyo.
            </p>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 pt-1">
              {userProfile?.role === 'employer' ? 'Buksan ang Employer Portal' : 'Mag-Sign Up / Sign In bilang Employer'} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* Action Buttons Zone */}
        <div className="p-6 sm:p-10 lg:p-12 bg-white dark:bg-slate-900 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => openAuthModal('signup', 'seeker')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 shrink-0" />
            <span>Gumawa ng Job Seeker Account</span>
          </button>

          <button
            type="button"
            onClick={() => openAuthModal('signup', 'employer')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Gumawa ng Employer Account</span>
          </button>

          <button
            type="button"
            onClick={dismissLanding}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-200 dark:border-emerald-800"
          >
            <span>Bumisita sa Job Listings</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
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
