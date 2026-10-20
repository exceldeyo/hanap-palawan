import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { JobSearchFeed } from './components/seeker/JobSearchFeed';
import { ApplyModal } from './components/seeker/ApplyModal';
import { MyApplicationsView } from './components/seeker/MyApplicationsView';
import { MyInterviewsView } from './components/seeker/MyInterviewsView';
import { ProfileResumeView } from './components/seeker/ProfileResumeView';
import { GuidedResumeBuilder } from './components/seeker/GuidedResumeBuilder';
import { SavedJobsView } from './components/seeker/SavedJobsView';
import { PalawanLocalNewsView } from './components/seeker/PalawanLocalNewsView';
import { PalawanNewsModal } from './components/seeker/PalawanNewsModal';
import { GabayPalawanAIModal } from './components/seeker/GabayPalawanAIModal';
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { EmployerJobsView } from './components/employer/EmployerJobsView';
import { EmployerInterviewsView } from './components/employer/EmployerInterviewsView';
import { PostJobModal } from './components/employer/PostJobModal';
import { ApplicantReviewModal } from './components/employer/ApplicantReviewModal';
import { ScheduleInterviewModal } from './components/employer/ScheduleInterviewModal';
import { LiveInterviewRoomModal } from './components/employer/LiveInterviewRoomModal';
import { SiteTransparencyModal, TransparencyTab } from './components/common/SiteTransparencyModal';
import { AuthModal } from './components/common/AuthModal';
import { LandingPageView } from './components/common/LandingPageView';
import { BackToTop } from './components/common/BackToTop';
import { JobAlertSignup } from './components/common/JobAlertSignup';
import { CheckCircle2, Info, X, Palmtree, Sparkles, Heart, ShieldCheck, HelpCircle } from 'lucide-react';

const AppShell: React.FC = () => {
  const [transparencyTab, setTransparencyTab] = useState<TransparencyTab | null>(null);
  const { 
    currentRole, 
    seekerTab, 
    setSeekerTab,
    employerTab, 
    setEmployerTab,
    notifications, 
    dismissNotification,
    applyingForJob,
    aiAssistantJob,
    reviewApplicant,
    schedulingForApplicant,
    activeInterviewRoom,
    activeNewsDetail,
    showLanding
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-[104px] sm:pt-[116px] py-4 sm:py-6">
        {showLanding ? (
          <LandingPageView />
        ) : currentRole === 'seeker' ? (
          <>
            {seekerTab === 'jobs' && <JobSearchFeed />}
            {seekerTab === 'news' && <PalawanLocalNewsView />}
            {seekerTab === 'saved' && <SavedJobsView />}
            {seekerTab === 'applications' && <MyApplicationsView />}
            {seekerTab === 'interviews' && <MyInterviewsView />}
            {seekerTab === 'profile' && <ProfileResumeView />}
            {seekerTab === 'builder' && <GuidedResumeBuilder />}
          </>
        ) : (
          <>
            {employerTab === 'pipeline' && <EmployerDashboard />}
            {employerTab === 'jobs' && <EmployerJobsView />}
            {employerTab === 'interviews' && <EmployerInterviewsView />}
            {employerTab === 'post-job' && <PostJobModal />}
          </>
        )}
      </main>

      {/* Global Modals */}
      {applyingForJob && <ApplyModal />}
      {aiAssistantJob && <GabayPalawanAIModal />}
      {reviewApplicant && <ApplicantReviewModal />}
      {schedulingForApplicant && <ScheduleInterviewModal />}
      {activeInterviewRoom && <LiveInterviewRoomModal />}
      {activeNewsDetail && <PalawanNewsModal />}
      {transparencyTab && (
        <SiteTransparencyModal 
          initialTab={transparencyTab} 
          onClose={() => setTransparencyTab(null)} 
        />
      )}
      <AuthModal />

      {/* Back to Top Floating Action Button */}
      <BackToTop />

      {/* Toast Notifications */}
      {notifications.length > 0 && (
        <div className="fixed bottom-3 sm:bottom-4 left-3 right-3 sm:left-auto sm:right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
          {notifications.map(notif => (
            <div
              key={notif.id}
              className={`p-3.5 rounded-xl shadow-lg border text-xs font-medium flex items-center justify-between gap-3 pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-2 ${
                notif.type === 'success'
                  ? 'bg-slate-900 text-white border-slate-800'
                  : 'bg-emerald-950 text-emerald-100 border-emerald-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {notif.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Info className="w-4 h-4 text-emerald-300 shrink-0" />
                )}
                <span>{notif.message}</span>
              </div>
              <button
                type="button"
                onClick={() => dismissNotification(notif.id)}
                className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 sm:py-8 mt-10 sm:mt-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          {/* Job Alert Signup Banner */}
          <JobAlertSignup />

          {/* Main Footer Grid Layout: Brand, Dedication Badge, and Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 sm:gap-5">
            {/* Brand & Tagline Zone */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2.5 sm:gap-3 text-center sm:text-left">
              {/* Logo Icon & Name Lockup */}
              <div 
                onClick={() => {
                  if (currentRole === 'seeker') setSeekerTab('jobs');
                  else setEmployerTab('pipeline');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
                title="Bumalik sa itaas / Home"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Palmtree className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-100" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    Hanap Palawan
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:border dark:border-emerald-800 text-emerald-800 shrink-0">
                    PH
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                <span className="hidden sm:inline text-slate-300 dark:text-slate-700 mr-2">·</span>
                <span>The Official Career Platform for the Last Frontier</span>
              </div>
            </div>

            {/* Dedication Badge Zone */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 flex items-center justify-center md:justify-end">
              <div className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0 px-3 py-1 rounded-full bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70 shadow-2xs">
                <span className="whitespace-nowrap">Gawa nang may</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0 animate-pulse" />
                <span className="whitespace-nowrap font-medium text-slate-700 dark:text-slate-300">para sa bawat Palaweño</span>
              </div>
            </div>

            {/* Quick-Access Transparency & Support Links Row */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-4 w-full sm:w-auto text-center sm:text-left">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold hidden sm:inline">
                  Quick Links:
                </span>
                <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs font-semibold flex-wrap">
                  <button
                    type="button"
                    onClick={() => setTransparencyTab('about')}
                    className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-emerald-500 py-1"
                  >
                    <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>About Us</span>
                  </button>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                  <button
                    type="button"
                    onClick={() => setTransparencyTab('privacy')}
                    className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-emerald-500 py-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Privacy Policy</span>
                  </button>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                  <button
                    type="button"
                    onClick={() => setTransparencyTab('help')}
                    className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-emerald-500 py-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Help Center</span>
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center sm:justify-end gap-1.5 text-center sm:text-right shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Verified Palawan Portal · DOLE & PESO Compliant</span>
              </div>
            </div>
          </div>

          {/* Sub Row: Municipalities on left, Copyright on right */}
          <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[11px] text-slate-500 dark:text-slate-400 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 font-medium">
              <span className="text-slate-400 dark:text-slate-500 font-normal">Sakop:</span>
              <span className="inline-flex items-center gap-2">
                <span>Puerto Princesa</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span>El Nido</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span>Coron</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span>San Vicente</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span>Taytay</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span>Narra</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold whitespace-nowrap">Remote WFH</span>
            </div>

            <div className="text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap shrink-0">
              © {new Date().getFullYear()} Hanap Palawan · Trabaho Para sa Palaweño
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
