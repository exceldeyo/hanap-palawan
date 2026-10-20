import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Building2, 
  Briefcase 
} from 'lucide-react';

export const SavedJobsView: React.FC = () => {
  const { 
    jobs, 
    savedJobIds, 
    toggleSaveJob, 
    setSelectedJobId, 
    setSeekerTab, 
    setApplyingForJob, 
    openAiAssistant 
  } = useApp();

  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Nai-save na mga Trabaho (Saved Jobs)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Ang iyong mga na-bookmark na oportunidad para sa madaling pag-apply at paghahanda.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSeekerTab('jobs')}
          className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Maghanap Pa</span>
        </button>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
          <Heart className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">Wala pang naka-save na trabaho</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            I-click ang puso sa anumang job card upang i-bookmark ito para sa susunod mong pag-apply.
          </p>
          <button
            type="button"
            onClick={() => setSeekerTab('jobs')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <span>Mag-browse ng Trabaho</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.map(job => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-emerald-700 block mb-0.5">
                      {job.company}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {job.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaveJob(job.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="flex items-center gap-1 text-slate-700">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{job.location}</span>
                  </span>
                  <span>·</span>
                  <span>{job.workplaceType}</span>
                  <span>·</span>
                  <span className="font-mono font-semibold text-slate-900">
                    ₱{(job.salaryMin / 1000).toFixed(0)}k - ₱{(job.salaryMax / 1000).toFixed(0)}k
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openAiAssistant(job, 'pitch')}
                  className="px-2.5 py-1.5 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer min-h-[36px]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Copilot</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setSeekerTab('jobs');
                    }}
                    className="px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg font-medium cursor-pointer min-h-[36px]"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplyingForJob(job)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer min-h-[36px]"
                  >
                    Apply Now
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
