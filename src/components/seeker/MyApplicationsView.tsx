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
  Briefcase
} from 'lucide-react';

export const MyApplicationsView: React.FC = () => {
  const { applicants, candidateProfile, setSeekerTab, setSelectedJobId, setActiveInterviewRoom, interviews } = useApp();

  const myApplications = applicants.filter(a => a.email === candidateProfile.email);

  const getStatusBadge = (status: ApplicantStatus) => {
    switch (status) {
      case 'interview_scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>Interview Scheduled</span>
          </span>
        );
      case 'reviewing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Under Review</span>
          </span>
        );
      case 'offered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Offer Extended!</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <span>Declined</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Send className="w-3.5 h-3.5" />
            <span>Application Submitted</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Mga Ipinadalang Aplikasyon (My Applications)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Subaybayan ang estado ng iyong mga resume at interview requests sa mga kumpanya sa Palawan.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSeekerTab('jobs')}
          className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Mag-browse Pa ng Trabaho</span>
        </button>
      </div>

      {myApplications.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
          <Send className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">Wala ka pang naipapadalang aplikasyon</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Mag-apply sa mga bukas na oportunidad sa Puerto Princesa, El Nido, Coron, o remote work gamit ang iyong 1-click Palawan resume.
          </p>
          <button
            type="button"
            onClick={() => setSeekerTab('jobs')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <span>Tingnan ang mga Oportunidad</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myApplications.map(app => {
            const relatedInterview = interviews.find(
              i => i.applicantEmail === candidateProfile.email && i.jobId === app.jobId && i.status === 'scheduled'
            );

            return (
              <div
                key={app.id}
                className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-3.5 sm:space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{app.company}</span>
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">{app.location}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {app.jobTitle}
                    </h3>

                    <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span>Submitted: {new Date(app.appliedAt).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>Expected: <strong className="text-slate-800 font-mono">{app.expectedSalary}</strong></span>
                      <span>·</span>
                      <span>Notice: {app.availability}</span>
                    </div>
                  </div>

                  <div className="self-start sm:self-auto">
                    {getStatusBadge(app.status)}
                  </div>
                </div>

                {/* Cover note preview */}
                {app.coverNote && (
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    <strong className="text-slate-800">Your Letter Pitch: </strong>
                    {app.coverNote}
                  </div>
                )}

                {/* If interview scheduled, provide quick direct link */}
                {relatedInterview && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-amber-950 font-medium">
                      <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        Interview Scheduled on <strong>{relatedInterview.date} at {relatedInterview.time}</strong> with {relatedInterview.interviewerName} ({relatedInterview.interviewerRole})
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveInterviewRoom(relatedInterview)}
                      className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer min-h-[38px]"
                    >
                      <span>Buksan ang Virtual Room</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="truncate text-[11px]">Resume Attached: <strong className="text-slate-700 font-mono">{app.resumeFileName}</strong></span>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedJobId(app.jobId);
                      setSeekerTab('jobs');
                    }}
                    className="text-emerald-700 hover:text-emerald-900 font-semibold hover:underline cursor-pointer self-start sm:self-auto py-1"
                  >
                    Tingnan ang Job Post →
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
