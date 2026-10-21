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
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Briefcase
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
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
            Interview Scheduled
          </span>
        );
      case 'reviewing':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 border border-blue-300 dark:border-blue-800">
            In Review
          </span>
        );
      case 'offered':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
            Offer Extended
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 border border-rose-300 dark:border-rose-800">
            Declined
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
            Applied
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Employer Hiring Portal
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold shrink-0">
              Palawan Talent Pool
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Candidate Pipeline & Screening
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Suriin ang mga aplikante, mag-imbita para sa panayam, at mag-iwan ng rubric evaluations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEmployerTab('post-job')}
          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0 min-h-[40px]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Mag-post ng Bagong Trabaho</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, skill, location..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[38px]"
          />
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
          <select
            value={filterJobId}
            onChange={e => setFilterJobId(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none min-h-[38px]"
          >
            <option value="all">All Jobs ({applicants.length})</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none min-h-[38px]"
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
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-2xs">
          <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">Walang natagpuang aplikante sa filter na ito</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Subukang baguhin ang search query o piliin ang "All Jobs" upang makita ang lahat ng aplikante.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredApplicants.map(app => (
            <div
              key={app.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 text-emerald-300 font-extrabold text-base flex items-center justify-center shrink-0 border border-slate-800 shadow-2xs">
                    {app.fullName.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                        {app.fullName}
                      </h3>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {app.matchScore}% Match
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                      {app.headline} · <span className="font-semibold text-slate-700 dark:text-slate-300">{app.jobTitle}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {getStatusBadge(app.status)}

                  <button
                    type="button"
                    onClick={() => setSelectedApplicantId(app.id)}
                    className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Review Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSchedulingForApplicant(app)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule Interview</span>
                  </button>
                </div>
              </div>

              {/* Details & Skills Line */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{app.location}</span>
                  </span>
                  <span>·</span>
                  <span>In-apply noong {new Date(app.appliedAt).toLocaleDateString()}</span>
                  <span>·</span>
                  <span>Inaasahang Sahod: <strong className="text-slate-800 dark:text-slate-200 font-mono">{app.expectedSalary}</strong></span>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  {app.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
