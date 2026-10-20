import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Trash2, 
  PlusCircle, 
  Users, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';

export const EmployerJobsView: React.FC = () => {
  const { jobs, applicants, deleteJob, setEmployerTab, setSelectedJobId, setRole, setSeekerTab } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Mga Aktibong Job Openings sa Palawan</h2>
          <p className="text-xs text-slate-500 mt-1">
            Pamahalaan ang mga naka-publish na posisyon at bilang ng mga natanggap na aplikante.
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

      <div className="space-y-3">
        {jobs.map(job => {
          const appCount = applicants.filter(a => a.jobId === job.id).length;

          return (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-3 sm:space-y-4 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-700">{job.department}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500">{job.workplaceType}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {job.title}
                </h3>

                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </span>
                  <span>·</span>
                  <span className="font-mono font-semibold text-slate-800">
                    ₱{(job.salaryMin / 1000).toFixed(0)}k - ₱{(job.salaryMax / 1000).toFixed(0)}k / month
                  </span>
                </div>
              </div>

              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setEmployerTab('pipeline');
                  }}
                  className="px-3 py-2 bg-emerald-50 text-emerald-800 font-bold rounded-lg text-xs border border-emerald-200 flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100 transition-colors min-h-[38px]"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{appCount} Aplikante</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setRole('seeker');
                      setSeekerTab('jobs');
                    }}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                    title="Preview as Job Seeker"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteJob(job.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                    title="Delete job listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
