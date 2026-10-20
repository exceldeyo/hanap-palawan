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
  Phone 
} from 'lucide-react';

export const MyInterviewsView: React.FC = () => {
  const { interviews, candidateProfile, setActiveInterviewRoom, setSeekerTab } = useApp();

  const myInterviews = interviews.filter(i => i.applicantEmail === candidateProfile.email);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Nai-schedule na mga Interview</h2>
          <p className="text-xs text-slate-500 mt-1">
            Makisalamuha sa mga employers sa Palawan sa pamamagitan ng virtual video meeting o on-site interview room.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSeekerTab('jobs')}
          className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center min-h-[40px]"
        >
          Mag-explore ng Trabaho
        </button>
      </div>

      {myInterviews.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">Wala pang nakatakdang interview</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Kapag nagustuhan ng employer ang iyong profile at screening answers, makakatanggap ka ng direct invitation para sa video screen dito.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myInterviews.map(interview => (
            <div
              key={interview.id}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{interview.company}</span>
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500">{interview.stage}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {interview.jobTitle}
                  </h3>

                  <div className="text-xs text-slate-600 mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{interview.date} ({interview.time})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{interview.durationMinutes} mins</span>
                    </span>
                    <span className="flex items-center gap-1 capitalize">
                      {interview.format === 'video' ? <Video className="w-3.5 h-3.5 text-blue-600" /> : <Phone className="w-3.5 h-3.5 text-amber-600" />}
                      <span>{interview.format} Interview</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {interview.status === 'completed' ? (
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Natapos Na</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveInterviewRoom(interview)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px]"
                    >
                      <Video className="w-4 h-4" />
                      <span>Pumasok sa Virtual Video Room</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Interviewer details */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
                    {interview.interviewerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{interview.interviewerName}</div>
                    <div className="text-[11px] text-slate-500">{interview.interviewerRole}</div>
                  </div>
                </div>

                <div className="text-left sm:text-right text-[11px] text-slate-500">
                  <span className="block font-medium text-slate-700">{interview.locationOrDetails}</span>
                </div>
              </div>

              {/* Agenda / Notes */}
              {interview.notesOrAgenda && (
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-800 block">Agenda at Gabay sa Pag-uusap:</span>
                  <p className="text-slate-600 whitespace-pre-line leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
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
