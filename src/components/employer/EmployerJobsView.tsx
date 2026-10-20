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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Mga Aktibong Job Openings sa Palawan</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pamahalaan ang mga naka-publish na posisyon at bilang ng mga natanggap na aplikante. Real-time na natatanggal sa Job Seekers feed kapag binura.
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

      {jobs.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center space-y-3 shadow-xs">
          <Building2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Walang Aktibong Job Postings</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Lahat ng binurang trabaho ay real-time nang inalis sa Job Seekers feed. I-click ang "Mag-post ng Bagong Trabaho" upang mag-publish ng bagong opening.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map(job => {
            const appCount = applicants.filter(a => a.jobId === job.id).length;

            return (
              <div
                key={job.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs space-y-3 sm:space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{job.company}</span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{job.department}</span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{job.workplaceType}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>

                  <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                    <span>·</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      ₱{(job.salaryMin / 1000).toFixed(0)}k - ₱{(job.salaryMax / 1000).toFixed(0)}k / month
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setEmployerTab('pipeline');
                    }}
                    className="px-3 py-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold rounded-lg text-xs border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors min-h-[38px]"
                  >
                    <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
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
                      className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                      title="Preview as Job Seeker"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteJob(job.id)}
                      className="px-3 py-2 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 rounded-lg text-xs font-bold transition-colors cursor-pointer min-h-[38px] flex items-center gap-1.5"
                      title="Delete job listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
