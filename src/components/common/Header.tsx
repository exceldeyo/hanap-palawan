import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Send, 
  Calendar, 
  User, 
  Building2, 
  PlusCircle, 
  Palmtree,
  Users,
  Sun,
  Moon,
  LogIn,
  LogOut,
  FileText
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentRole, 
    seekerTab, 
    setSeekerTab, 
    employerTab, 
    setEmployerTab,
    applicants, 
    interviews, 
    candidateProfile,
    theme,
    toggleTheme,
    userProfile,
    openAuthModal,
    signOut
  } = useApp();

  const myApplicationsCount = applicants.filter(a => a.email === candidateProfile.email).length;
  const employerPendingCount = applicants.filter(a => a.status === 'applied' || a.status === 'reviewing').length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 shadow-sm">
      {/* Top Brand & Controls Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo & Brand Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <button 
              type="button"
              onClick={() => {
                if (currentRole === 'seeker') setSeekerTab('jobs');
                else setEmployerTab('pipeline');
              }}
              className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Palmtree className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                    Hanap Palawan
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:border dark:border-emerald-800 text-emerald-800 shrink-0">
                    PH
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate hidden sm:block">
                  Trabaho Para sa Palaweño
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links (>= lg, 1024px+) */}
          <nav className="hidden lg:flex items-center gap-1">
            {currentRole === 'seeker' ? (
              <>
                <button
                  type="button"
                  onClick={() => setSeekerTab('jobs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    seekerTab === 'jobs'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Maghanap ng Trabaho</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSeekerTab('applications')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    seekerTab === 'applications'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>My Applications</span>
                  {myApplicationsCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {myApplicationsCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSeekerTab('profile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    seekerTab === 'profile'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSeekerTab('builder')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    seekerTab === 'builder'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-2xs border border-emerald-500'
                      : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume Builder</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setEmployerTab('pipeline')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    employerTab === 'pipeline'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Candidate Pipeline</span>
                  {employerPendingCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {employerPendingCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setEmployerTab('jobs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    employerTab === 'jobs'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Company Postings</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEmployerTab('interviews')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    employerTab === 'interviews'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Interview Schedule</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEmployerTab('post-job')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    employerTab === 'post-job'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-2xs border border-emerald-500'
                      : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Post a Job</span>
                </button>
              </>
            )}
          </nav>

          {/* Right Action: Auth & Theme (Clean & Spacious for mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Auth Button or User Profile Badge */}
            {userProfile ? (
              <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200 dark:border-slate-800">
                <div 
                  className="flex items-center gap-1.5 py-1 px-2 sm:px-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-xs shadow-2xs max-w-[120px] sm:max-w-[180px]"
                  title={`${userProfile.displayName} (${userProfile.email})`}
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col text-left leading-none min-w-0">
                    <span className="font-bold text-[11px] text-slate-800 dark:text-slate-100 truncate">
                      {userProfile.role === 'employer' && userProfile.companyName ? userProfile.companyName : userProfile.displayName}
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-400 capitalize truncate">
                      {userProfile.role === 'employer' ? 'Employer' : 'Seeker'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={signOut}
                  title="Mag-sign out sa account"
                  className="p-2 text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-2xs shrink-0"
                  aria-label="Mag-sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Mobile View: Single Compact Sign In Button */}
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="flex sm:hidden items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px] bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shrink-0 active:scale-95"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>

                {/* Tablet/Desktop View: Dual Seeker / Employer Buttons */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openAuthModal('signin', 'seeker')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[38px] bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shrink-0 active:scale-95"
                    title="Mag-sign in o mag-sign up bilang Job Seeker"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Job Seeker</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal('signin', 'employer')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[38px] bg-teal-700 hover:bg-teal-800 text-white shadow-xs shrink-0 border border-teal-500/30 active:scale-95"
                    title="Mag-sign in o mag-sign up bilang Employer / Negosyo"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Employer</span>
                  </button>
                </div>
              </div>
            )}

            {/* Global Dark Mode Theme Switcher */}
            <button
              type="button"
              onClick={(e) => toggleTheme(e)}
              aria-label={theme === 'dark' ? 'Ilipat sa Light Mode' : 'Ilipat sa Dark Mode'}
              title={theme === 'dark' ? 'Ilipat sa Light Mode' : 'Ilipat sa Dark Mode'}
              className="p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center border border-slate-200/80 dark:border-slate-700 shadow-2xs shrink-0 group"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0 transition-transform duration-300 group-hover:-rotate-12" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tablet and Mobile Navigation Bar (< lg): Clean row with full visibility */}
      <div className="lg:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-2 sm:px-3">
          <nav className="flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-2 text-xs touch-pan-x">
            {currentRole === 'seeker' ? (
              <>
                <button
                  type="button"
                  onClick={() => setSeekerTab('jobs')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    seekerTab === 'jobs' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Maghanap</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSeekerTab('applications')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    seekerTab === 'applications' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Applications</span>
                  {myApplicationsCount > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      seekerTab === 'applications' 
                        ? 'bg-white/25 text-white' 
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 dark:border dark:border-emerald-800'
                    }`}>
                      {myApplicationsCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSeekerTab('profile')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    seekerTab === 'profile' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSeekerTab('builder')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    seekerTab === 'builder' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-800/80'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume Builder</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setEmployerTab('pipeline')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    employerTab === 'pipeline' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Pipeline</span>
                  {employerPendingCount > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      employerTab === 'pipeline' 
                        ? 'bg-white/25 text-white' 
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 dark:border dark:border-emerald-800'
                    }`}>
                      {employerPendingCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setEmployerTab('jobs')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    employerTab === 'jobs' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Postings</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEmployerTab('interviews')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    employerTab === 'interviews' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Interviews</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEmployerTab('post-job')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    employerTab === 'post-job' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-800/80'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Post Job</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
