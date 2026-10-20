import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  UserCheck 
} from 'lucide-react';

export const EmployerInterviewsView: React.FC = () => {
  const { interviews, setActiveInterviewRoom } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Naka-iskedyul na mga Panayam (Scheduled Interviews)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Subaybayan ang mga video at face-to-face meetings sa mga aplikante sa Palawan.
          </p>
        </div>
      </div>

      {interviews.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 text-center space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">Walang naka-iskedyul na interview</h3>
          <p className="text-xs text-slate-500">Pumunta sa Candidate Pipeline upang mag-schedule ng unang panayam.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map(interview => (
            <div
              key={interview.id}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-emerald-700">{interview.stage}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500">{interview.company}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {interview.applicantName} — {interview.jobTitle}
                  </h3>

                  <div className="text-xs text-slate-600 mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{interview.date} at {interview.time}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{interview.durationMinutes} mins</span>
                    </span>
                    <span className="flex items-center gap-1 capitalize font-medium text-slate-700">
                      <Video className="w-3.5 h-3.5 text-blue-600" />
                      <span>{interview.format} Call</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {interview.status === 'completed' ? (
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Completed & Scored</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveInterviewRoom(interview)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px]"
                    >
                      <Video className="w-4 h-4" />
                      <span>Buksan ang Live Video Room</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Feedback summary if completed */}
              {interview.feedback && (
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-emerald-950 uppercase tracking-wider text-[11px]">
                      Recorded Interview Rubric & Verdict:
                    </span>
                    <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px]">
                      {interview.feedback.recommendation.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-slate-700">
                    <div className="bg-white p-2 rounded border border-emerald-100">
                      <span className="text-[10px] text-slate-400 block">Technical</span>
                      <span className="font-bold text-amber-500">★ {interview.feedback.ratings.technical}/5</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-emerald-100">
                      <span className="text-[10px] text-slate-400 block">Communication</span>
                      <span className="font-bold text-amber-500">★ {interview.feedback.ratings.communication}/5</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-emerald-100">
                      <span className="text-[10px] text-slate-400 block">Culture Fit</span>
                      <span className="font-bold text-amber-500">★ {interview.feedback.ratings.cultureFit}/5</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-emerald-100">
                      <span className="text-[10px] text-slate-400 block">Island Readiness</span>
                      <span className="font-bold text-amber-500">★ {interview.feedback.ratings.islandReadiness}/5</span>
                    </div>
                  </div>

                  <p className="text-slate-800 pt-1 leading-relaxed">
                    <strong>Notes:</strong> {interview.feedback.notes}
                  </p>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <span>Interviewer: <strong>{interview.interviewerName}</strong> ({interview.interviewerRole})</span>
                <span className="font-mono text-slate-400 text-[11px]">{interview.locationOrDetails}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
