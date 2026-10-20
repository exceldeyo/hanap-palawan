import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Send, 
  MessageSquare,
  FileCheck,
  ShieldAlert,
  Share2
} from 'lucide-react';

export const LiveInterviewRoomModal: React.FC = () => {
  const { activeInterviewRoom, setActiveInterviewRoom, submitInterviewFeedback } = useApp();

  const [isCamOn, setIsCamOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [activeSideTab, setActiveSideTab] = useState<'rubric' | 'ai-copilot' | 'notes'>('rubric');
  const [mobileView, setMobileView] = useState<'video' | 'panel'>('video');

  // Evaluation state
  const [techRating, setTechRating] = useState(4);
  const [commRating, setCommRating] = useState(5);
  const [cultureRating, setCultureRating] = useState(5);
  const [islandRating, setIslandRating] = useState(5);
  const [recommendation, setRecommendation] = useState<'strong_hire' | 'hire' | 'hold' | 'no_hire'>('hire');
  const [evalNotes, setEvalNotes] = useState('Impressive grasp of offline caching for island networks and deep dedication to Palawan community growth.');
  const [liveNotes, setLiveNotes] = useState('• Candidate discussed experience with PSU IT graduates.\n• Demonstrated strong background in Next.js.\n• Enthusiastic about long-term Palawan residency.');

  if (!activeInterviewRoom) return null;

  const interview = activeInterviewRoom;

  const handleFinishInterview = () => {
    submitInterviewFeedback(interview.id, {
      ratings: {
        technical: techRating,
        communication: commRating,
        cultureFit: cultureRating,
        islandReadiness: islandRating,
      },
      notes: evalNotes,
      recommendation,
      submittedAt: new Date().toISOString()
    });
    setActiveInterviewRoom(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950 flex flex-col">
      {/* Top Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between shrink-0 gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xs sm:text-sm text-white">Hanap Virtual Video Room</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700 shrink-0">
                LIVE · Encrypted
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 break-words leading-tight mt-0.5">
              {interview.jobTitle} at {interview.company} · Candidate: <strong className="text-white">{interview.applicantName}</strong>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveInterviewRoom(null)}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Mode Switcher: Video vs Rubric */}
      <div className="lg:hidden flex items-center justify-center p-2 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="p-0.5 bg-slate-950 rounded-lg flex items-center text-xs font-semibold w-full max-w-xs">
          <button
            type="button"
            onClick={() => setMobileView('video')}
            className={`flex-1 py-1.5 rounded-md text-center transition-all cursor-pointer min-h-[34px] ${
              mobileView === 'video'
                ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Video Call
          </button>
          <button
            type="button"
            onClick={() => setMobileView('panel')}
            className={`flex-1 py-1.5 rounded-md text-center transition-all cursor-pointer min-h-[34px] ${
              mobileView === 'panel'
                ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Rubric & Notes
          </button>
        </div>
      </div>

      {/* Main Grid: Video Feeds on Left, Side Panel on Right */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Video Area */}
        <div className={`${mobileView === 'video' ? 'flex' : 'hidden lg:flex'} lg:col-span-8 p-3 sm:p-6 flex-col justify-between bg-slate-950 overflow-y-auto`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
            {/* Candidate Feed */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                alt="Candidate"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{interview.applicantName} (Candidate)</span>
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 text-slate-300 text-[10px] font-mono">
                Puerto Princesa, Palawan · HD
              </div>
            </div>

            {/* Interviewer Feed */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shadow-lg">
              {isCamOn ? (
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                  alt="Interviewer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 font-bold flex items-center justify-center text-xl mx-auto">
                    {interview.interviewerName.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-400 block font-medium">Camera Off</span>
                </div>
              )}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold flex items-center gap-1.5">
                <span>{interview.interviewerName} (You)</span>
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 text-slate-300 text-[10px] font-mono">
                {interview.interviewerRole}
              </div>
            </div>
          </div>

          {/* Bottom Call Controls */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3.5 rounded-full text-white transition-all cursor-pointer ${
                isMicOn ? 'bg-slate-800 hover:bg-slate-700' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsCamOn(!isCamOn)}
              className={`p-3.5 rounded-full text-white transition-all cursor-pointer ${
                isCamOn ? 'bg-slate-800 hover:bg-slate-700' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {isCamOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={handleFinishInterview}
              className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Tapusin ang Interview</span>
            </button>
          </div>
        </div>

        {/* Right Side Control & Rubric Panel */}
        <div className={`${mobileView === 'panel' ? 'flex' : 'hidden lg:flex'} lg:col-span-4 bg-slate-900 border-l border-slate-800 flex-col justify-between overflow-hidden`}>
          {/* Panel Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveSideTab('rubric')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                activeSideTab === 'rubric'
                  ? 'border-emerald-500 text-emerald-400 font-bold bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Score Rubric
            </button>
            <button
              type="button"
              onClick={() => setActiveSideTab('ai-copilot')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activeSideTab === 'ai-copilot'
                  ? 'border-emerald-500 text-emerald-400 font-bold bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Follow-ups</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSideTab('notes')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                activeSideTab === 'notes'
                  ? 'border-emerald-500 text-emerald-400 font-bold bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Live Notes
            </button>
          </div>

          {/* Panel Content */}
          <div className="p-5 overflow-y-auto flex-1 text-xs text-slate-300 space-y-4">
            {activeSideTab === 'rubric' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Official Hiring Rubric</h4>
                  <p className="text-[11px] text-slate-400">
                    Grade candidate across core dimensions for the final decision.
                  </p>
                </div>

                {/* Dimension 1: Technical */}
                <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Technical & Domain Competence</span>
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button key={s} type="button" onClick={() => setTechRating(s)} className="p-0.5 cursor-pointer">
                          <Star className={`w-3.5 h-3.5 ${s <= techRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400">Knowledge of modern architecture, debugging, and systems.</p>
                </div>

                {/* Dimension 2: Communication */}
                <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Communication & Empathy</span>
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button key={s} type="button" onClick={() => setCommRating(s)} className="p-0.5 cursor-pointer">
                          <Star className={`w-3.5 h-3.5 ${s <= commRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400">Clear expression, collaborative team tone, and humility.</p>
                </div>

                {/* Dimension 3: Culture Fit */}
                <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Palawan Eco-Tourism & Mission Fit</span>
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button key={s} type="button" onClick={() => setCultureRating(s)} className="p-0.5 cursor-pointer">
                          <Star className={`w-3.5 h-3.5 ${s <= cultureRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400">Dedication to local community welfare and ecological guidelines.</p>
                </div>

                {/* Dimension 4: Island Readiness */}
                <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Island Operational Readiness</span>
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button key={s} type="button" onClick={() => setIslandRating(s)} className="p-0.5 cursor-pointer">
                          <Star className={`w-3.5 h-3.5 ${s <= islandRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400">Adaptability to low-bandwidth, PALECO outages, and island logistics.</p>
                </div>

                {/* Recommendation */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-white">Hiring Recommendation</label>
                  <select
                    value={recommendation}
                    onChange={e => setRecommendation(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-emerald-400 focus:outline-none"
                  >
                    <option value="strong_hire">Strong Hire (Top Priority)</option>
                    <option value="hire">Hire (Meets All Benchmarks)</option>
                    <option value="hold">Hold (Compare with other candidates)</option>
                    <option value="no_hire">Do Not Move Forward</option>
                  </select>
                </div>

                {/* Feedback Notes */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-white">Evaluation Summary</label>
                  <textarea
                    rows={3}
                    value={evalNotes}
                    onChange={e => setEvalNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none font-sans"
                  />
                </div>
              </div>
            )}

            {activeSideTab === 'ai-copilot' && (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    AI Suggested Follow-up Questions:
                  </span>
                  <p className="text-[11px] text-slate-300">
                    Derived from candidate resume and Palawan operational realities:
                  </p>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1 text-xs">
                  <strong className="text-emerald-300 block">Question 1: Offline Synchronization</strong>
                  <p className="text-slate-200">
                    "Can you walk through how you handled sync conflicts in your tour operator dispatch app when island 4G dropped out?"
                  </p>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1 text-xs">
                  <strong className="text-emerald-300 block">Question 2: Stakeholder Communication</strong>
                  <p className="text-slate-200">
                    "How did you persuade resort managers in El Nido to adopt automated check-in instead of traditional paper logbooks?"
                  </p>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1 text-xs">
                  <strong className="text-emerald-300 block">Question 3: Long-term Vision</strong>
                  <p className="text-slate-200">
                    "What makes you choose to build your career in Puerto Princesa instead of relocating to Metro Manila or overseas?"
                  </p>
                </div>
              </div>
            )}

            {activeSideTab === 'notes' && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-white block">Interviewer Live Scratchpad</span>
                <textarea
                  rows={10}
                  value={liveNotes}
                  onChange={e => setLiveNotes(e.target.value)}
                  placeholder="Type ongoing notes during the interview..."
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono leading-relaxed focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Panel Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <button
              type="button"
              onClick={handleFinishInterview}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Submit Evaluation & Complete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
