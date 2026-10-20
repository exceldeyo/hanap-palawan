import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicantStatus } from '../../types';
import { generateCandidateDossierSummary } from '../../services/geminiService';
import { 
  X, 
  Calendar, 
  Star, 
  MessageSquare, 
  Mail, 
  Phone, 
  ExternalLink, 
  Sparkles, 
  Plus 
} from 'lucide-react';

export const ApplicantReviewModal: React.FC = () => {
  const { 
    reviewApplicant, 
    setSelectedApplicantId, 
    updateApplicantStatus, 
    addEmployerNote, 
    rateApplicant, 
    setSchedulingForApplicant 
  } = useApp();

  const [noteInput, setNoteInput] = useState('');
  const [aiBrief, setAiBrief] = useState<{
    executiveSummary: string;
    topStrengths: string[];
    recommendedQuestions: string[];
    riskOrProbeArea: string;
  } | null>(null);
  const [isLoadingAiBrief, setIsLoadingAiBrief] = useState(false);

  if (!reviewApplicant) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    addEmployerNote(reviewApplicant.id, noteInput.trim());
    setNoteInput('');
  };

  const handleGenerateAiBrief = async () => {
    setIsLoadingAiBrief(true);
    try {
      const brief = await generateCandidateDossierSummary({ applicant: reviewApplicant });
      setAiBrief(brief);
    } finally {
      setIsLoadingAiBrief(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 border-b border-slate-200 bg-slate-50 flex items-start justify-between shrink-0 gap-3">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
            {reviewApplicant.avatarUrl ? (
              <img
                src={reviewApplicant.avatarUrl}
                alt={reviewApplicant.fullName}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-slate-200 shrink-0 mt-0.5 sm:mt-0"
              />
            ) : (
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-base sm:text-lg shrink-0 mt-0.5 sm:mt-0">
                {reviewApplicant.fullName.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-snug break-words">{reviewApplicant.fullName}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                  {reviewApplicant.matchScore}% Match
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 break-words">
                Applied for <strong className="text-slate-800">{reviewApplicant.jobTitle}</strong> · {new Date(reviewApplicant.appliedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedApplicantId(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Header Strip */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 text-xs">
          {/* Status selector & Rating */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600">Stage:</span>
              <select
                value={reviewApplicant.status}
                onChange={e => updateApplicantStatus(reviewApplicant.id, e.target.value as ApplicantStatus)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="applied">1. Applied</option>
                <option value="reviewing">2. In Review</option>
                <option value="interview_scheduled">3. Interview Scheduled</option>
                <option value="offered">4. Offer Extended</option>
                <option value="rejected">5. Declined</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-600 mr-1">Rating:</span>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => rateApplicant(reviewApplicant.id, star)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 ${
                      (reviewApplicant.rating || 0) >= star
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* AI Brief & Schedule CTAs */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleGenerateAiBrief}
              disabled={isLoadingAiBrief}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold rounded-lg shadow-2xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[38px]"
            >
              <Sparkles className={`w-3.5 h-3.5 text-emerald-600 ${isLoadingAiBrief ? 'animate-spin' : ''}`} />
              <span>{isLoadingAiBrief ? 'Analyzing...' : 'AI Recruiter Brief'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSchedulingForApplicant(reviewApplicant);
                setSelectedApplicantId(null);
              }}
              className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[38px]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 flex-1 text-sm text-slate-700">
          {/* AI Executive Brief Accordion if loaded */}
          {aiBrief && (
            <div className="p-4 bg-emerald-950 text-white rounded-xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Recruiter Brief & Interview Questions</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-mono">Gemini 3.8 Flash</span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {aiBrief.executiveSummary}
              </p>

              <div className="pt-2 border-t border-emerald-800/80 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                  Recommended Interview Questions to Ask:
                </span>
                <ul className="text-xs text-slate-200 space-y-1 list-disc list-inside">
                  {aiBrief.recommendedQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-emerald-800/80 text-[11px] text-emerald-300">
                <strong>Probe Area: </strong> {aiBrief.riskOrProbeArea}
              </div>
            </div>
          )}

          {/* Key Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Location</span>
              <span className="font-semibold text-slate-800">{reviewApplicant.location}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Expected Salary</span>
              <span className="font-semibold text-slate-900 font-mono">{reviewApplicant.expectedSalary}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Availability</span>
              <span className="font-semibold text-slate-800">{reviewApplicant.availability}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Resume File</span>
              <span className="font-semibold text-emerald-700 truncate block">{reviewApplicant.resumeFileName}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{reviewApplicant.email}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{reviewApplicant.phone}</span>
            </span>
            {reviewApplicant.portfolioUrl && (
              <>
                <span>·</span>
                <a
                  href={reviewApplicant.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Portfolio</span>
                </a>
              </>
            )}
          </div>

          {/* Cover Note */}
          {reviewApplicant.coverNote && (
            <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-100 space-y-1.5">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                Liham ng Kandidato (Cover Note)
              </h4>
              <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                {reviewApplicant.coverNote}
              </p>
            </div>
          )}

          {/* Screening Questions & Answers */}
          {reviewApplicant.screeningAnswers && reviewApplicant.screeningAnswers.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Screening Questions & Responses
              </h4>
              <div className="space-y-2">
                {reviewApplicant.screeningAnswers.map((ans, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="font-semibold text-slate-800">Q: {ans.question}</div>
                    <div className="text-slate-900 pl-3 border-l-2 border-emerald-500 font-medium">
                      A: {ans.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidate Skills */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Skills & Qualifications
            </h4>
            <div className="text-xs text-slate-700 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono">
              {reviewApplicant.skills.map((skill, idx) => (
                <React.Fragment key={skill}>
                  <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                    {skill}
                  </span>
                  {idx < reviewApplicant.skills.length - 1 && <span aria-hidden="true" className="text-slate-300">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          {reviewApplicant.experience && reviewApplicant.experience.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Work Experience History
              </h4>
              <div className="space-y-4">
                {reviewApplicant.experience.map(exp => (
                  <div key={exp.id} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-xs">{exp.role}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{exp.duration}</span>
                    </div>
                    <div className="text-xs font-semibold text-emerald-700">{exp.company}</div>
                    <ul className="mt-2 space-y-1 text-xs text-slate-600 list-disc list-inside">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Internal Employer Notes */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>Internal Hiring Notes ({reviewApplicant.employerNotes.length})</span>
            </h4>

            {reviewApplicant.employerNotes.length > 0 ? (
              <div className="space-y-2">
                {reviewApplicant.employerNotes.map(note => (
                  <div key={note.id} className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between text-[11px] text-amber-900 font-semibold">
                      <span>{note.author}</span>
                      <span className="font-mono text-slate-400">{new Date(note.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No internal notes added yet.</p>
            )}

            <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
              <input
                type="text"
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                placeholder="Add evaluation note or feedback..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="submit"
                disabled={!noteInput.trim()}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => updateApplicantStatus(reviewApplicant.id, 'rejected')}
            className="px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer text-center min-h-[38px]"
          >
            Decline Application
          </button>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSelectedApplicantId(null)}
              className="flex-1 sm:flex-initial px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-center min-h-[38px]"
            >
              Close Dossier
            </button>
            <button
              type="button"
              onClick={() => {
                setSchedulingForApplicant(reviewApplicant);
                setSelectedApplicantId(null);
              }}
              className="flex-1 sm:flex-initial px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[38px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
