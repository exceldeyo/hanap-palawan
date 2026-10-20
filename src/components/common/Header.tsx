import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Heart, 
  Send, 
  Calendar, 
  User, 
  RotateCcw, 
  Building2, 
  PlusCircle, 
  Palmtree,
  Users,
  Sun,
  Moon,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentRole, 
    setRole, 
    seekerTab, 
    setSeekerTab, 
    employerTab, 
    setEmployerTab,
    savedJobIds, 
    applicants, 
    interviews, 
    candidateProfile,
    resetDemoData,
    theme,
    toggleTheme,
    userProfile,
    openAuthModal,
    signOut
  } = useApp();

  const myApplicationsCount = applicants.filter(a => a.email === candidateProfile.email).length;
  const myUpcomingInterviews = interviews.filter(i => i.applicantEmail === candidateProfile.email && i.status === 'scheduled').length;
  const employerPendingCount = applicants.filter(a => a.status === 'applied' || a.status === 'reviewing').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top Brand & Controls Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
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

          {/* Desktop Navigation Links (>= lg, 1024px+ for ample horizontal space) */}
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
                  onClick={() => setSeekerTab('saved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    seekerTab === 'saved'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Saved Jobs</span>
                  {savedJobIds.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center">
                      {savedJobIds.length}
                    </span>
                  )}
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
                  onClick={() => setSeekerTab('interviews')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    seekerTab === 'interviews'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Interviews</span>
                  {myUpcomingInterviews > 0 && (
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                      {myUpcomingInterviews}
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
                  <span>My Profile & CV</span>
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

          {/* Right Action: Role Switcher, Auth, Theme & Reset */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Role switch toggle pill */}
            <div className="p-0.5 sm:p-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center text-xs font-semibold border border-slate-200/60 dark:border-slate-700/80 shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => setRole('seeker')}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs transition-all cursor-pointer min-h-[30px] sm:min-h-[34px] flex items-center gap-1 whitespace-nowrap ${
                  currentRole === 'seeker'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Seeker</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs transition-all cursor-pointer min-h-[30px] sm:min-h-[34px] flex items-center gap-1 whitespace-nowrap ${
                  currentRole === 'employer'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Employer</span>
              </button>
            </div>

            {/* Auth Button or User Profile Badge */}
            {userProfile ? (
              <div className="flex items-center gap-1 sm:gap-1.5 pl-1 border-l border-slate-200 dark:border-slate-800">
                <div 
                  className="flex items-center gap-1.5 py-1 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-xs shadow-2xs"
                  title={`${userProfile.displayName} (${userProfile.email})`}
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden sm:flex flex-col text-left leading-none">
                    <span className="font-bold text-[11px] text-slate-800 dark:text-slate-100 max-w-[100px] truncate">
                      {userProfile.role === 'employer' && userProfile.companyName ? userProfile.companyName : userProfile.displayName}
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-400 capitalize">
                      {userProfile.role === 'employer' ? 'Negosyo' : 'Job Seeker'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={signOut}
                  title="Mag-sign out sa account"
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors cursor-pointer min-h-[32px] sm:min-h-[36px] min-w-[32px] sm:min-w-[36px] flex items-center justify-center border border-transparent hover:border-rose-200 dark:hover:border-rose-800 shadow-2xs shrink-0"
                  aria-label="Mag-sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer min-h-[30px] sm:min-h-[34px] bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs hover:shadow-xs shrink-0"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In / Sign Up</span>
                <span className="sm:hidden">Sign In</span>
              </button>
            )}

            {/* Global Dark Mode Theme Switcher - clean square icon button on all breakpoints */}
            <button
              type="button"
              onClick={(e) => toggleTheme(e)}
              aria-label={theme === 'dark' ? 'Ilipat sa Light Mode' : 'Ilipat sa Dark Mode'}
              title={theme === 'dark' ? 'Ilipat sa Light Mode' : 'Ilipat sa Dark Mode'}
              className="p-1.5 sm:p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer min-h-[32px] sm:min-h-[36px] min-w-[32px] sm:min-w-[36px] flex items-center justify-center border border-slate-200/80 dark:border-slate-700 shadow-2xs shrink-0 active:scale-95 group"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0 transition-transform duration-300 group-hover:-rotate-12" />
              )}
            </button>

            {/* Reset Demo Data Button */}
            <button
              type="button"
              onClick={resetDemoData}
              title="I-reset ang sample Palawan listings"
              aria-label="I-reset ang sample Palawan listings"
              className="p-1.5 sm:p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer min-h-[32px] sm:min-h-[36px] min-w-[32px] sm:min-w-[36px] flex items-center justify-center border border-slate-200/60 dark:border-slate-700/80 shadow-2xs shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tablet and Mobile Navigation Bar (< lg): Full-width border with container alignment */}
      <div className="lg:hidden border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-xs transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <nav className="flex items-center sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1.5 sm:py-2 text-xs">
            {currentRole === 'seeker' ? (
              <>
                <button
                  type="button"
                  onClick={() => setSeekerTab('jobs')}
                  className={`px-3 py-1.5 sm:py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[38px] shrink-0 ${
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
                  onClick={() => setSeekerTab('saved')}
                  className={`px-3 py-1.5 sm:py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[38px] shrink-0 ${
                    seekerTab === 'saved' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Saved</span>
                  {savedJobIds.length > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      seekerTab === 'saved' 
                        ? 'bg-white/25 text-white backdrop-blur-xs' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {savedJobIds.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSeekerTab('applications')}
                  className={`px-3 py-1.5 sm:py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[38px] shrink-0 ${
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
                        ? 'bg-white/25 text-white backdrop-blur-xs' 
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 dark:border dark:border-emerald-800'
                    }`}>
                      {myApplicationsCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSeekerTab('interviews')}
                  className={`px-3 py-1.5 sm:py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[38px] shrink-0 ${
                    seekerTab === 'interviews' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Interviews</span>
                  {myUpcomingInterviews > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      seekerTab === 'interviews' 
                        ? 'bg-white/25 text-white backdrop-blur-xs' 
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 dark:border dark:border-amber-800'
                    }`}>
                      {myUpcomingInterviews}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSeekerTab('profile')}
                  className={`px-3 py-1.5 sm:py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[38px] shrink-0 ${
                    seekerTab === 'profile' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile & CV</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setEmployerTab('pipeline')}
                  className={`px-3 py-1.5 sm:py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[38px] shrink-0 ${
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
                        ? 'bg-white/25 text-white backdrop-blur-xs' 
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 dark:border dark:border-emerald-800'
                    }`}>
                      {employerPendingCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setEmployerTab('jobs')}
                  className={`px-3 py-1.5 sm:py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[38px] shrink-0 ${
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
                  className={`px-3 py-1.5 sm:py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[38px] shrink-0 ${
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
                  className={`px-3 py-1.5 sm:py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] sm:min-h-[38px] shrink-0 ${
                    employerTab === 'post-job' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-800/60'
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
