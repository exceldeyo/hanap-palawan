import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, Video, UserCheck, ArrowRight } from 'lucide-react';

export const ScheduleInterviewModal: React.FC = () => {
  const { schedulingForApplicant, setSchedulingForApplicant, scheduleInterview } = useApp();

  const [date, setDate] = useState('2026-10-23');
  const [time, setTime] = useState('14:00');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [format, setFormat] = useState<'video' | 'phone' | 'onsite'>('video');
  const [stage, setStage] = useState('Technical & Cultural Screen');
  const [interviewerName, setInterviewerName] = useState('Elena Cruz');
  const [interviewerRole, setInterviewerRole] = useState('Engineering Director · Palawan Tech Hub');
  const [meetingLink, setMeetingLink] = useState('https://hanap.app/meet/hn-plwn-' + Math.floor(1000 + Math.random() * 9000));
  const [locationOrDetails, setLocationOrDetails] = useState('Hanap Palawan Virtual Video Room');
  const [notesOrAgenda, setNotesOrAgenda] = useState(
    '1. Introductions & Palawan background (10 mins)\n2. Deep dive into past projects and technical approach (20 mins)\n3. Discussion on local island connectivity resilience & teamwork (10 mins)\n4. Candidate Q&A regarding company and perks (5 mins)'
  );

  if (!schedulingForApplicant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleInterview({
      applicantId: schedulingForApplicant.id,
      applicantName: schedulingForApplicant.fullName,
      applicantEmail: schedulingForApplicant.email,
      jobId: schedulingForApplicant.jobId,
      jobTitle: schedulingForApplicant.jobTitle,
      company: schedulingForApplicant.company,
      date,
      time,
      durationMinutes: Number(durationMinutes),
      format,
      stage,
      interviewerName,
      interviewerRole,
      meetingLink,
      locationOrDetails,
      notesOrAgenda
    });
    setSchedulingForApplicant(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[94vh] flex flex-col">
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Interview Coordination
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug break-words">
              Schedule with {schedulingForApplicant.fullName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 break-words">
              Role: <strong className="text-slate-800">{schedulingForApplicant.jobTitle}</strong> ({schedulingForApplicant.company})
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSchedulingForApplicant(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs text-slate-700 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Petsa (Date)</label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Oras (Time)</label>
              <input
                type="time"
                required
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
              <select
                value={durationMinutes}
                onChange={e => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Format</label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="video">Virtual Video Call (Hanap Video)</option>
                <option value="phone">Phone Call</option>
                <option value="onsite">On-Site Office Interview</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interview Stage</label>
              <input
                type="text"
                required
                value={stage}
                onChange={e => setStage(e.target.value)}
                placeholder="e.g. Technical Evaluation, Culture Screen, Panel Interview"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interviewer Name</label>
              <input
                type="text"
                required
                value={interviewerName}
                onChange={e => setInterviewerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interviewer Title</label>
              <input
                type="text"
                required
                value={interviewerRole}
                onChange={e => setInterviewerRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Meeting Link or Room Details</label>
              <input
                type="text"
                value={meetingLink}
                onChange={e => setMeetingLink(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Agenda & Notes for Candidate</label>
              <textarea
                rows={4}
                value={notesOrAgenda}
                onChange={e => setNotesOrAgenda(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] text-slate-400">
              Awtomatikong magpapadala ng imbitasyon sa aplikante.
            </span>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSchedulingForApplicant(null)}
                className="flex-1 sm:flex-initial px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer text-center min-h-[40px]"
              >
                Kanselahin
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Kumpirmahin at I-schedule</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
