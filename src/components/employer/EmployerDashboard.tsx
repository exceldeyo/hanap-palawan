import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicantStatus } from '../../types';
import { 
  Users, 
  Calendar, 
  Star, 
  Search, 
  Filter, 
  ArrowRight, 
  Eye, 
  Building2, 
  FileText, 
  PlusCircle, 
  Sparkles 
} from 'lucide-react';

export const EmployerDashboard: React.FC = () => {
  const { 
    applicants, 
    jobs, 
    setSelectedApplicantId, 
    setSchedulingForApplicant, 
    updateApplicantStatus,
    setEmployerTab
  } = useApp();

  const [filterJobId, setFilterJobId] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredApplicants = applicants.filter(app => {
    const matchJob = filterJobId === 'all' || app.jobId === filterJobId;
    const matchStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchQuery = !searchQuery ||
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchJob && matchStatus && matchQuery;
  });

  const getStatusBadge = (status: ApplicantStatus) => {
    switch (status) {
      case 'interview_scheduled':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            Interview Scheduled
          </span>
        );
      case 'reviewing':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
            In Review
          </span>
        );
      case 'offered':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Offer Extended
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
            Declined
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            Applied
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Employer Hiring Portal
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold shrink-0">
              Palawan Talent Pool
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Candidate Pipeline & Screening
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Suriin ang mga aplikante, mag-imbita para sa panayam, at mag-iwan ng rubric evaluations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEmployerTab('post-job')}
          className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Mag-post ng Bagong Trabaho</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, skill, location..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[38px]"
          />
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
          <select
            value={filterJobId}
            onChange={e => setFilterJobId(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none min-h-[38px]"
          >
            <option value="all">All Jobs ({applicants.length})</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none min-h-[38px]"
          >
            <option value="all">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="reviewing">Under Review</option>
            <option value="interview_scheduled">Interview Scheduled</option>
            <option value="offered">Offered</option>
            <option value="rejected">Declined</option>
          </select>
        </div>
      </div>

      {/* Candidate Pipeline Cards / Table */}
      {filteredApplicants.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 text-center space-y-3">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">Walang tumutugmang aplikante</h3>
          <p className="text-xs text-slate-500">Subukang baguhin ang mga filter o maghintay ng bagong aplikasyon.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredApplicants.map(applicant => (
            <div
              key={applicant.id}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-3.5 sm:space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                  {applicant.avatarUrl ? (
                    <img
                      src={applicant.avatarUrl}
                      alt={applicant.fullName}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-slate-200 shrink-0 mt-0.5 sm:mt-0"
                    />
                  ) : (
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-base sm:text-lg shrink-0 mt-0.5 sm:mt-0">
                      {applicant.fullName.charAt(0)}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{applicant.fullName}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                        {applicant.matchScore}% Match
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-0.5">{applicant.headline}</p>

                    <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span>Applied for: <strong className="text-slate-800">{applicant.jobTitle}</strong></span>
                      <span>·</span>
                      <span>{applicant.location}</span>
                      <span>·</span>
                      <span>Expected: <strong className="text-slate-800 font-mono">{applicant.expectedSalary}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {getStatusBadge(applicant.status)}

                  <div className="flex items-center text-amber-400 pl-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= (applicant.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-700">
                {applicant.skills.slice(0, 6).map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-slate-100 rounded text-slate-800">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer CTAs */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
                <span className="text-slate-400 truncate text-[11px]">
                  CV: <strong className="text-slate-600 font-mono">{applicant.resumeFileName}</strong>
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedApplicantId(applicant.id)}
                    className="flex-1 sm:flex-initial px-3.5 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Review Dossier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSchedulingForApplicant(applicant)}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
                  >
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>Schedule Interview</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
