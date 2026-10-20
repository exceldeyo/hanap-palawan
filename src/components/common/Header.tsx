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
  FileText,
  Settings,
  ChevronDown,
  ShieldAlert
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
    signOut,
    exitAdminMode,
    employerVerifications,
    showLanding,
    dismissLanding
  } = useApp();

  const isLandingVisible = showLanding && !userProfile && currentRole !== 'admin';
  const pendingVerificationsCount = employerVerifications.filter(e => e.verificationStatus === 'pending' || !e.verificationStatus).length;

  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);

  const myApplicationsCount = applicants.filter(a => a.email === candidateProfile.email).length;
  const employerPendingCount = applicants.filter(a => a.status === 'applied' || a.status === 'reviewing').length;

  const handleSeekerNav = (tab: 'jobs' | 'applications' | 'profile') => {
    if ((tab === 'profile' || tab === 'applications') && !userProfile) {
      openAuthModal(
        'signup',
        'seeker',
        'Kailangan mo munang gumawa ng account (Sign Up) o mag-Sign In bilang Job Seeker upang ma-access ang iyong Profile at Applications.'
      );
      return;
    }
    dismissLanding();
    setSeekerTab(tab);
  };

  const handleEmployerNav = (tab: 'pipeline' | 'jobs' | 'interviews' | 'post-job' | 'profile') => {
    if (!userProfile) {
      openAuthModal(
        'signup',
        'employer',
        'Kailangan mo ng account o mag-Sign Up / Sign In muna bilang Employer upang ma-access ang Employer Portal.'
      );
      return;
    }
    dismissLanding();
    setEmployerTab(tab);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 shadow-sm">
      {/* Top Brand & Controls Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo & Brand Zone */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
            <button 
              type="button"
              onClick={() => {
                dismissLanding();
                if (currentRole === 'seeker') setSeekerTab('jobs');
                else setEmployerTab('pipeline');
              }}
              className="flex items-center gap-1.5 sm:gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Palmtree className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[13px] sm:text-base tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                    Hanap Palawan
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:border dark:border-emerald-800 text-emerald-800 shrink-0">
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
            {currentRole === 'admin' ? (
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/70 flex items-center gap-2 shadow-2xs">
                  <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Trusted Personnel · Admin Verification Hub</span>
                  {pendingVerificationsCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-black">
                      {pendingVerificationsCount} Pending
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={exitAdminMode}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 transition-colors cursor-pointer"
                >
                  Exit Admin Panel
                </button>
              </div>
            ) : currentRole === 'seeker' ? (
              <>
                <button
                  type="button"
                  onClick={() => handleSeekerNav('jobs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    !isLandingVisible && seekerTab === 'jobs'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Maghanap ng Trabaho</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSeekerNav('applications')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    !isLandingVisible && seekerTab === 'applications'
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
                  onClick={() => handleSeekerNav('profile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    !isLandingVisible && seekerTab === 'profile'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleEmployerNav('pipeline')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    !isLandingVisible && employerTab === 'pipeline'
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
                  onClick={() => handleEmployerNav('jobs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    !isLandingVisible && employerTab === 'jobs'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Company Postings</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEmployerNav('interviews')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    !isLandingVisible && employerTab === 'interviews'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Interview Schedule</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEmployerNav('profile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    !isLandingVisible && employerTab === 'profile'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 font-bold shadow-2xs'
                      : 'border border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Company Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEmployerNav('post-job')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                    !isLandingVisible && employerTab === 'post-job'
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
          <div className="flex items-center gap-1.5 sm:gap-2 pr-1 sm:pr-0 shrink-0">
            {/* Auth Button or User Profile Badge with Dropdown */}
            {userProfile ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 py-1 px-2 sm:px-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-xs shadow-2xs cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                  title="I-click para sa profile at mga pagpipilian"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col text-left leading-none min-w-0 max-w-[95px] sm:max-w-[150px]">
                    <span className="font-bold text-[11px] text-slate-800 dark:text-slate-100 truncate">
                      {userProfile.role === 'employer' && userProfile.companyName ? userProfile.companyName : userProfile.displayName}
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-400 capitalize truncate">
                      {userProfile.role === 'employer' ? 'Employer' : 'Seeker'}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setProfileDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
                        <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {userProfile.displayName}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {userProfile.email}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 capitalize">
                          {userProfile.role === 'employer' ? 'Employer Account' : 'Job Seeker Account'}
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            if (currentRole === 'seeker') {
                              setSeekerTab('profile');
                            } else {
                              setEmployerTab('profile');
                            }
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          <span>Profile & Settings</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            signOut();
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer transition-colors border-t border-slate-100 dark:border-slate-700/60"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Mag-sign out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => openAuthModal('signin', 'seeker')}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer min-h-[32px] sm:min-h-[38px] bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shrink-0 active:scale-95 whitespace-nowrap"
                  title="Mag-sign in o mag-sign up bilang Job Seeker"
                >
                  <Briefcase className="hidden min-[420px]:block w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>Seeker</span>
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('signin', 'employer')}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer min-h-[32px] sm:min-h-[38px] bg-teal-700 hover:bg-teal-800 text-white shadow-xs shrink-0 border border-teal-500/30 active:scale-95 whitespace-nowrap"
                  title="Mag-sign in o mag-sign up bilang Employer / Negosyo"
                >
                  <Building2 className="hidden min-[420px]:block w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>Employer</span>
                </button>
              </div>
            )}

            {/* Global Dark Mode Theme Switcher */}
            <button
              type="button"
              onClick={(e) => toggleTheme(e)}
              aria-label={theme === 'dark' ? 'Ilipat sa Light Mode' : 'Ilipat sa Dark Mode'}
              title={theme === 'dark' ? 'Ilipat sa Light Mode' : 'Ilipat sa Dark Mode'}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-all cursor-pointer min-h-[32px] min-w-[32px] sm:min-h-[36px] sm:min-w-[36px] flex items-center justify-center border border-slate-200/80 dark:border-slate-700 shadow-2xs shrink-0 group"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 dark:text-slate-300 shrink-0 transition-transform duration-300 group-hover:-rotate-12" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tablet and Mobile Navigation Bar (< lg): Clean row with full visibility */}
      <div className="lg:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-2 sm:px-3">
          <nav className="flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-2 text-xs touch-pan-x">
            {currentRole === 'admin' ? (
              <div className="flex items-center justify-between w-full px-2 gap-2">
                <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Trusted Admin Panel ({pendingVerificationsCount} Pending)</span>
                </div>
                <button
                  type="button"
                  onClick={exitAdminMode}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] shrink-0 cursor-pointer"
                >
                  Exit Admin
                </button>
              </div>
            ) : currentRole === 'seeker' ? (
              <>
                <button
                  type="button"
                  onClick={() => handleSeekerNav('jobs')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    !isLandingVisible && seekerTab === 'jobs' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Maghanap</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSeekerNav('applications')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    !isLandingVisible && seekerTab === 'applications' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Applications</span>
                  {myApplicationsCount > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      !isLandingVisible && seekerTab === 'applications' 
                        ? 'bg-white/25 text-white' 
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 dark:border dark:border-emerald-800'
                    }`}>
                      {myApplicationsCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSeekerNav('profile')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    !isLandingVisible && seekerTab === 'profile' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleEmployerNav('pipeline')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    !isLandingVisible && employerTab === 'pipeline' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Pipeline</span>
                  {employerPendingCount > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      !isLandingVisible && employerTab === 'pipeline' 
                        ? 'bg-white/25 text-white' 
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 dark:border dark:border-emerald-800'
                    }`}>
                      {employerPendingCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleEmployerNav('jobs')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    !isLandingVisible && employerTab === 'jobs' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Postings</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEmployerNav('interviews')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    !isLandingVisible && employerTab === 'interviews' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Interviews</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEmployerNav('profile')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    !isLandingVisible && employerTab === 'profile' 
                      ? 'bg-emerald-600 text-white font-bold shadow-2xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEmployerNav('post-job')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] shrink-0 ${
                    !isLandingVisible && employerTab === 'post-job' 
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
