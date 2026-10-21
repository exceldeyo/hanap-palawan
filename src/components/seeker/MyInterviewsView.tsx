import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  Building2, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  Phone,
  Briefcase
} from 'lucide-react';

export const MyInterviewsView: React.FC = () => {
  const { interviews, candidateProfile, userProfile, setActiveInterviewRoom, setSeekerTab } = useApp();

  const userEmail = userProfile?.email || candidateProfile.email;
  const myInterviews = interviews.filter(i => i.applicantEmail === userEmail);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Nai-schedule na mga Interview
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Makisalamuha sa mga employers sa Palawan sa pamamagitan ng virtual video meeting o on-site interview room.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSeekerTab('jobs')}
          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
        >
          <Briefcase className="w-4 h-4" />
          <span>Mag-explore ng Trabaho</span>
        </button>
      </div>

      {myInterviews.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-2xs">
          <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">Wala pang nakatakdang interview</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Kapag nagustuhan ng employer ang iyong profile at screening answers, makakatanggap ka ng direct invitation para sa video meeting dito.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myInterviews.map(interview => (
            <div
              key={interview.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{interview.company}</span>
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{interview.stage}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {interview.jobTitle}
                  </h3>

                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-medium">
                    <span className="flex items-center gap-1 font-extrabold text-slate-900 dark:text-white">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{interview.date} ({interview.time})</span>
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{interview.durationMinutes} mins</span>
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="flex items-center gap-1 capitalize">
                      {interview.format === 'video' ? <Video className="w-3.5 h-3.5 text-emerald-600" /> : <Phone className="w-3.5 h-3.5 text-amber-600" />}
                      <span>{interview.format} Interview</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  {interview.status === 'completed' ? (
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Natapos Na</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveInterviewRoom(interview)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
                    >
                      <Video className="w-4 h-4" />
                      <span>Pumasok sa Virtual Video Room</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Interviewer Details */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950 text-emerald-300 font-bold flex items-center justify-center text-sm shrink-0 border border-slate-700">
                    {interview.interviewerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white">{interview.interviewerName}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{interview.interviewerRole}</div>
                  </div>
                </div>

                <div className="text-left sm:text-right text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="block font-semibold text-slate-800 dark:text-slate-200">{interview.locationOrDetails}</span>
                </div>
              </div>

              {/* Agenda / Notes */}
              {interview.notesOrAgenda && (
                <div className="space-y-1.5 text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white block">Agenda at Gabay sa Pag-uusap:</span>
                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    {interview.notesOrAgenda}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
