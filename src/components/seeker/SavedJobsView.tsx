import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Building2, 
  Briefcase,
  Layers,
  Send,
  DollarSign
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
  const [showCompareMode, setShowCompareMode] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-rose-600 fill-current" />
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Nai-save na mga Trabaho (Saved Jobs)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Ang iyong mga na-bookmark na oportunidad para sa madaling pag-apply at paghahanda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedJobs.length >= 2 && (
            <button
              type="button"
              onClick={() => setShowCompareMode(!showCompareMode)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                showCompareMode
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{showCompareMode ? 'Itago ang Comparison' : 'Ipaghambing (Compare)'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setSeekerTab('jobs')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Briefcase className="w-4 h-4" />
            <span>Maghanap Pa</span>
          </button>
        </div>
      </div>

      {/* Side-by-side comparison matrix when toggled */}
      {showCompareMode && savedJobs.length >= 2 && (
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/40 dark:border-emerald-700/60 rounded-2xl p-5 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Paghahambing ng mga Saved Jobs ({savedJobs.length})</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowCompareMode(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕ Isara
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {savedJobs.map(job => (
              <div key={job.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block">{job.company}</span>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{job.title}</h4>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  <div><strong>Pasahod:</strong> ₱{(job.salaryMin / 1000).toFixed(0)}k - ₱{(job.salaryMax / 1000).toFixed(0)}k</div>
                  <div><strong>Lokasyon:</strong> {job.location}</div>
                  <div><strong>Setup:</strong> {job.workplaceType} ({job.type})</div>
                  <div><strong>Kasanayan:</strong> {job.skills.slice(0, 3).join(', ')}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setApplyingForJob(job)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Mag-Apply Agad
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Saved Jobs Grid */}
      {savedJobs.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-2xs">
          <Heart className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">Wala pang naka-save na trabaho</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            I-click ang puso sa anumang job card upang i-bookmark ito para sa susunod mong pag-apply.
          </p>
          <button
            type="button"
            onClick={() => setSeekerTab('jobs')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <span>Mag-browse ng Trabaho</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.map(job => (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                      {job.company}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                      {job.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaveJob(job.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-xl transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
                  <span className="flex items-center gap-1 text-slate-800 dark:text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{job.location}</span>
                  </span>
                  <span>·</span>
                  <span>{job.workplaceType}</span>
                  <span>·</span>
                  <span className="font-mono font-extrabold text-emerald-700 dark:text-emerald-400">
                    ₱{(job.salaryMin / 1000).toFixed(0)}k - ₱{(job.salaryMax / 1000).toFixed(0)}k / mo
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openAiAssistant(job, 'pitch')}
                  className="px-3 py-1.5 text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>AI Copilot</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setSeekerTab('jobs');
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer min-h-[36px]"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplyingForJob(job)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer min-h-[36px]"
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
