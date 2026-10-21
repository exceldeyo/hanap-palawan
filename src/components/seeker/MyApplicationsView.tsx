import React from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicantStatus } from '../../types';
import { 
  Send, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  ArrowRight, 
  Sparkles,
  Briefcase,
  Video,
  FileText,
  UserCheck,
  TrendingUp,
  MapPin,
  XCircle,
  ShieldCheck
} from 'lucide-react';

export const MyApplicationsView: React.FC = () => {
  const { applicants, candidateProfile, setSeekerTab, setSelectedJobId, setActiveInterviewRoom, interviews, currentUser, userProfile } = useApp();

  const myApplications = applicants.filter(a => 
    (currentUser && a.seekerId === currentUser.uid) || 
    a.email === candidateProfile.email || 
    (userProfile && a.email === userProfile.email) ||
    (!a.seekerId)
  );

  const stats = {
    total: myApplications.length,
    reviewing: myApplications.filter(a => a.status === 'reviewing' || a.status === 'applied').length,
    interviews: myApplications.filter(a => a.status === 'interview_scheduled').length,
    offered: myApplications.filter(a => a.status === 'offered').length
  };

  const getStatusBadge = (status: ApplicantStatus) => {
    switch (status) {
      case 'interview_scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Interview Scheduled</span>
          </span>
        );
      case 'reviewing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 border border-blue-300 dark:border-blue-800">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Under Employer Review</span>
          </span>
        );
      case 'offered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Offer Extended!</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 border border-rose-300 dark:border-rose-800">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Declined</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
            <Send className="w-3.5 h-3.5 text-emerald-600" />
            <span>Submitted</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Send className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Mga Ipinadalang Aplikasyon (My Applications)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Subaybayan ang estado ng iyong mga naipadalang resume at interview requests sa mga kumpanya sa Palawan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSeekerTab('jobs')}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Briefcase className="w-4 h-4" />
            <span>Mag-browse Pa ng Trabaho</span>
          </button>
        </div>

        {/* Overview Stats KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400">Kabuuan (Total)</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 tabular-nums">{stats.total}</div>
            <span className="text-[11px] text-slate-500">Submitted resumes</span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60">
            <span className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-300">Under Review</span>
            <div className="text-2xl font-black text-blue-900 dark:text-blue-100 mt-0.5 tabular-nums">{stats.reviewing}</div>
            <span className="text-[11px] text-blue-600 dark:text-blue-400">Sinusuri ng HR</span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60">
            <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-300">Interviews</span>
            <div className="text-2xl font-black text-amber-900 dark:text-amber-100 mt-0.5 tabular-nums">{stats.interviews}</div>
            <span className="text-[11px] text-amber-600 dark:text-amber-400">Nakatakdang usapan</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60">
            <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300">Offers</span>
            <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100 mt-0.5 tabular-nums">{stats.offered}</div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Job offers</span>
          </div>
        </div>
      </div>

      {/* Applications Feed */}
      {myApplications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-2xs">
          <Send className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">Wala ka pang naipapadalang aplikasyon</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Mag-apply sa mga bukas na oportunidad sa Puerto Princesa, El Nido, Coron, o remote WFH gamit ang iyong 1-click Palawan resume.
          </p>
          <button
            type="button"
            onClick={() => setSeekerTab('jobs')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <span>Tingnan ang mga Oportunidad</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myApplications.map(app => {
            const relatedInterview = interviews.find(
              i => (i.applicantEmail === candidateProfile.email || i.applicantEmail === userProfile?.email) && i.jobId === app.jobId && i.status === 'scheduled'
            );

            return (
              <div
                key={app.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{app.company}</span>
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{app.location}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      {app.jobTitle}
                    </h3>

                    {/* Clean Metadata Line (NO PILLS) */}
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
                      <span>In-apply noong: <strong className="text-slate-700 dark:text-slate-300">{new Date(app.appliedAt).toLocaleDateString()}</strong></span>
                      <span>·</span>
                      <span>Inaasahang Sahod: <strong className="text-slate-900 dark:text-white font-mono">{app.expectedSalary}</strong></span>
                      <span>·</span>
                      <span>Notice: {app.availability}</span>
                    </div>
                  </div>

                  <div className="self-start sm:self-auto shrink-0">
                    {getStatusBadge(app.status)}
                  </div>
                </div>

                {/* Cover Letter Note Preview */}
                {app.coverNote && (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white font-bold">Ang iyong Letter Pitch: </strong>
                    {app.coverNote}
                  </div>
                )}

                {/* If Interview Scheduled */}
                {relatedInterview && (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 text-amber-950 dark:text-amber-200 font-medium">
                      <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>
                        Nakatakdang Interview noong <strong>{relatedInterview.date} sa ganap na {relatedInterview.time}</strong> kasama si {relatedInterview.interviewerName} ({relatedInterview.interviewerRole})
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveInterviewRoom(relatedInterview)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      <Video className="w-4 h-4" />
                      <span>Buksan ang Virtual Room</span>
                    </button>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="truncate font-mono">In-attach na Resume: <strong className="text-slate-800 dark:text-slate-200">{app.resumeFileName || 'Palawan_Digital_Resume.pdf'}</strong></span>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedJobId(app.jobId);
                      setSeekerTab('jobs');
                    }}
                    className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold cursor-pointer self-start sm:self-auto"
                  >
                    Tingnan ang Job Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
