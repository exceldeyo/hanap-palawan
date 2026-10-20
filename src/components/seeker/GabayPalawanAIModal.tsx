import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  generateTailoredCoverNote, 
  analyzeJobFitAndGaps, 
  getMockInterviewQuestion, 
  evaluateMockAnswer,
  MatchAnalysisResult,
  MockQuestionResult,
  MockAnswerEvaluation
} from '../../services/geminiService';
import { 
  X, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Mic, 
  MicOff, 
  Send, 
  Copy, 
  ArrowRight, 
  Star, 
  TrendingUp, 
  Coins, 
  MapPin, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';

export const GabayPalawanAIModal: React.FC = () => {
  const { 
    aiAssistantJob, 
    setAiAssistantJob, 
    aiInitialTab, 
    candidateProfile, 
    setApplyingForJob 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pitch' | 'fit' | 'interview' | 'living'>(aiInitialTab || 'pitch');

  // Pitch tab state
  const [generatedPitch, setGeneratedPitch] = useState<string>('');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState<boolean>(false);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  // Fit tab state
  const [fitAnalysis, setFitAnalysis] = useState<MatchAnalysisResult | null>(null);
  const [isAnalyzingFit, setIsAnalyzingFit] = useState<boolean>(false);

  // Mock Interview tab state
  const [currentQuestion, setCurrentQuestion] = useState<MockQuestionResult | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [candidateAnswer, setCandidateAnswer] = useState<string>('');
  const [evaluation, setEvaluation] = useState<MockAnswerEvaluation | null>(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState<boolean>(false);
  const [isEvaluatingAnswer, setIsEvaluatingAnswer] = useState<boolean>(false);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);

  const [speechError, setSpeechError] = useState<string | null>(null);

  useEffect(() => {
    if (aiInitialTab) {
      setActiveTab(aiInitialTab);
    }
  }, [aiInitialTab]);

  useEffect(() => {
    if (!aiAssistantJob) return;

    if (activeTab === 'pitch' && !generatedPitch) {
      handleGeneratePitch();
    } else if (activeTab === 'fit' && !fitAnalysis) {
      handleAnalyzeFit();
    } else if (activeTab === 'interview' && !currentQuestion) {
      handleLoadQuestion(1);
    }
  }, [aiAssistantJob, activeTab]);

  if (!aiAssistantJob) return null;

  const job = aiAssistantJob;

  const handleGeneratePitch = async () => {
    setIsGeneratingPitch(true);
    try {
      const pitch = await generateTailoredCoverNote({
        candidate: candidateProfile,
        job
      });
      setGeneratedPitch(pitch);
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  const handleAnalyzeFit = async () => {
    setIsAnalyzingFit(true);
    try {
      const analysis = await analyzeJobFitAndGaps({
        candidate: candidateProfile,
        job
      });
      setFitAnalysis(analysis);
    } finally {
      setIsAnalyzingFit(false);
    }
  };

  const handleLoadQuestion = async (qNum: number) => {
    setIsLoadingQuestion(true);
    setEvaluation(null);
    setCandidateAnswer('');
    try {
      const q = await getMockInterviewQuestion({
        job,
        candidate: candidateProfile,
        questionNumber: qNum
      });
      setCurrentQuestion(q);
      setQuestionNumber(qNum);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!candidateAnswer.trim() || !currentQuestion) return;
    setIsEvaluatingAnswer(true);
    try {
      const res = await evaluateMockAnswer({
        job,
        question: currentQuestion.question,
        answer: candidateAnswer.trim()
      });
      setEvaluation(res);
    } finally {
      setIsEvaluatingAnswer(false);
    }
  };

  const handleToggleMic = () => {
    setSpeechError(null);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError('Speech recognition is not supported in this browser. You can type your answer directly in the box below.');
      return;
    }

    if (isListeningMic) {
      setIsListeningMic(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-PH';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListeningMic(true);
      recognition.onend = () => setIsListeningMic(false);
      recognition.onerror = () => {
        setIsListeningMic(false);
        setSpeechError('Microphone input encountered an issue. You can continue by typing.');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCandidateAnswer(prev => prev ? `${prev} ${transcript}` : transcript);
      };

      recognition.start();
    } catch (e) {
      setIsListeningMic(false);
      setSpeechError('Could not start microphone. Please type your response.');
    }
  };

  const handleUsePitchInApplication = () => {
    setAiAssistantJob(null);
    setApplyingForJob(job);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-4 sm:my-6 flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 border-b border-slate-200 bg-emerald-950 text-white flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center font-bold shrink-0 mt-0.5 sm:mt-0">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Gabay Palaweño AI</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 uppercase tracking-wider shrink-0">
                  Gemini Flash
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5 truncate">
                Role: <strong className="text-white">{job.title}</strong> at {job.company}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAiAssistantJob(null)}
            className="p-1.5 text-emerald-300/70 hover:text-white hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold px-2 sm:px-4 shrink-0 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('pitch')}
            className={`py-3 px-3 sm:px-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[42px] ${
              activeTab === 'pitch'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Tailored Pitch & Cover Note</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fit')}
            className={`py-3 px-3 sm:px-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[42px] ${
              activeTab === 'fit'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span>Fit & Skills Gap Analysis</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interview')}
            className={`py-3 px-3 sm:px-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[42px] ${
              activeTab === 'interview'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5 shrink-0" />
            <span>AI Mock Interview Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('living')}
            className={`py-3 px-3 sm:px-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[42px] ${
              activeTab === 'living'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coins className="w-3.5 h-3.5 shrink-0" />
            <span>Palawan Salary & Living Guide</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="overflow-y-auto p-6 flex-1 text-sm text-slate-700 space-y-6">
          {/* TAB 1: PITCH & COVER NOTE */}
          {activeTab === 'pitch' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Palawan-Tailored Application Pitch
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Crafted to highlight your local roots, PSU/WPU alumni background, and island technical adaptability.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGeneratePitch}
                  disabled={isGeneratingPitch}
                  className="px-3 py-1.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isGeneratingPitch ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>
              </div>

              {isGeneratingPitch ? (
                <div className="p-8 border border-slate-200 rounded-xl bg-slate-50 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-600">Gabay Palaweño is tailoring your application note...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl font-sans text-xs text-slate-800 leading-relaxed whitespace-pre-line shadow-xs">
                    {generatedPitch}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedPitch)}
                      className="px-3.5 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedPitch ? 'Copied to clipboard!' : 'Copy Cover Note'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleUsePitchInApplication}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                    >
                      <span>Apply Now with This Pitch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FIT & SKILLS GAP */}
          {activeTab === 'fit' && (
            <div className="space-y-5">
              {isAnalyzingFit ? (
                <div className="p-8 border border-slate-200 rounded-xl bg-slate-50 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-600">Analyzing qualifications against Palawan role benchmarks...</p>
                </div>
              ) : fitAnalysis ? (
                <div className="space-y-5">
                  {/* Score strip */}
                  <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-emerald-400 uppercase font-bold tracking-wider block">
                        Estimated Match Index
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                        {fitAnalysis.matchScore}% Match
                      </h4>
                      <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                        {fitAnalysis.fitSummary}
                      </p>
                    </div>

                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold font-mono text-xl sm:text-2xl text-emerald-400 shrink-0 self-center sm:self-auto">
                      {fitAnalysis.matchScore}%
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Your Key Standout Strengths</span>
                    </h5>
                    <div className="space-y-1.5">
                      {fitAnalysis.keyStrengths.map((str, idx) => (
                        <div key={idx} className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-lg text-xs text-slate-800">
                          {str}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Palawan Advantage */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>Local Palawan Advantage</span>
                    </h5>
                    <div className="space-y-1.5">
                      {fitAnalysis.palawanAdvantage.map((adv, idx) => (
                        <div key={idx} className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-slate-800">
                          {adv}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Gaps */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Areas to Emphasize / Address in Interview</span>
                    </h5>
                    <div className="space-y-1.5">
                      {fitAnalysis.skillsGaps.map((gap, idx) => (
                        <div key={idx} className="p-3 bg-amber-50/60 border border-amber-100 rounded-lg text-xs text-slate-800">
                          {gap}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tip */}
                  <div className="p-3.5 bg-slate-100 rounded-xl text-xs text-slate-700">
                    <strong className="text-slate-900">Gabay Palaweño Recommendation: </strong>
                    {fitAnalysis.recommendedAction}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 3: AI MOCK INTERVIEW */}
          {activeTab === 'interview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Interactive Palawan Role Simulation (Question #{questionNumber} of 3)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Practice answering real scenario questions for {job.title} and receive instant coaching feedback.
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleLoadQuestion(n)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        questionNumber === n
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {isLoadingQuestion ? (
                <div className="p-8 border border-slate-200 rounded-xl bg-slate-50 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-600">Preparing role scenario question...</p>
                </div>
              ) : currentQuestion ? (
                <div className="space-y-4">
                  {/* Question Box */}
                  <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                      Interviewer Scenario Prompt
                    </div>
                    <p className="text-sm font-semibold leading-relaxed">
                      "{currentQuestion.question}"
                    </p>
                    <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                      <strong>Focus:</strong> {currentQuestion.context}
                    </div>
                  </div>

                  {/* Candidate Answer Input */}
                  <div className="space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-slate-700">Your Spoken or Typed Response:</span>
                      <button
                        type="button"
                        onClick={handleToggleMic}
                        className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[36px] self-start sm:self-auto ${
                          isListeningMic
                            ? 'bg-rose-600 text-white animate-pulse'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isListeningMic ? <MicOff className="w-3.5 h-3.5 shrink-0" /> : <Mic className="w-3.5 h-3.5 shrink-0" />}
                        <span>{isListeningMic ? 'Listening (Speak now)...' : 'Use Voice Input'}</span>
                      </button>
                    </div>

                    {speechError && (
                      <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[11px] flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                        <span>{speechError}</span>
                      </div>
                    )}

                    <textarea
                      rows={4}
                      value={candidateAnswer}
                      onChange={e => setCandidateAnswer(e.target.value)}
                      placeholder="Speak using microphone or type your answer here..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed font-sans"
                    />

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleSubmitAnswer}
                        disabled={!candidateAnswer.trim() || isEvaluatingAnswer}
                        className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                      >
                        <Send className="w-3.5 h-3.5 shrink-0" />
                        <span>{isEvaluatingAnswer ? 'Evaluating with Gemini...' : 'Submit Answer for Feedback'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Evaluation Box */}
                  {evaluation && (
                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                          AI Rubric Feedback
                        </span>
                        <div className="flex items-center text-amber-500">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${s <= evaluation.score ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-slate-800 space-y-1.5">
                        <p><strong className="text-emerald-900">What went well:</strong> {evaluation.praise}</p>
                        <p><strong className="text-amber-900">How to elevate:</strong> {evaluation.constructiveAdvice}</p>
                        <p className="p-2 bg-white rounded border border-emerald-100 text-slate-700">
                          <strong className="text-slate-900">Pro Tip:</strong> {evaluation.modelAnswerTip}
                        </p>
                      </div>

                      {questionNumber < 3 && (
                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleLoadQuestion(questionNumber + 1)}
                            className="px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>Next Question (#{questionNumber + 1})</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 4: PALAWAN SALARY & LIVING GUIDE */}
          {activeTab === 'living' && (
            <div className="space-y-5 text-xs text-slate-700">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Palawan Cost-of-Living & Compensation Benchmark
                </h4>
                <p className="text-slate-500 mt-0.5">
                  Guidance to help you evaluate offers and negotiate your package across Puerto Princesa, El Nido, Coron, and remote work.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 text-sm">Puerto Princesa</div>
                  <div className="text-emerald-700 font-mono font-bold">₱45k - ₱150k / mo</div>
                  <ul className="text-slate-600 space-y-1 text-[11px] list-disc list-inside">
                    <li>Rent: ₱8,000 - ₱16,000 / mo</li>
                    <li>Internet: Converge / PLDT Fiber ready</li>
                    <li>Commute: Low tricycle / multicab costs</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 text-sm">El Nido & Coron</div>
                  <div className="text-emerald-700 font-mono font-bold">₱55k - ₱130k / mo</div>
                  <ul className="text-slate-600 space-y-1 text-[11px] list-disc list-inside">
                    <li>Housing often included / subsidized</li>
                    <li>Service charge shares boost monthly net</li>
                    <li>Starlink or backup satellite recommended</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 text-sm">Remote (From Palawan)</div>
                  <div className="text-emerald-700 font-mono font-bold">₱60k - ₱200k+ / mo</div>
                  <ul className="text-slate-600 space-y-1 text-[11px] list-disc list-inside">
                    <li>Zero commute stress</li>
                    <li>Ask for power backup / solar stipend</li>
                    <li>HMO coverage across local Palawan hospitals</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                <span className="font-bold text-emerald-950 block">Key Palawan Negotiation Checklist:</span>
                <p className="text-emerald-900 text-[11px]">
                  1. <strong>Power Continuity:</strong> Ask if the company provides solar generator or UPS equipment allowance for PALECO outages.<br />
                  2. <strong>Health Insurance:</strong> Ensure Maxicare, PhilHealth, or local accredited hospital network in Puerto Princesa/Taytay is included.<br />
                  3. <strong>Eco-Leave / Island Well-Being:</strong> Many progressive Palawan companies offer 3-5 days paid environmental volunteering leaves.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500">
            Powered by Gabay Palaweño AI & Gemini
          </span>
          <button
            type="button"
            onClick={() => setAiAssistantJob(null)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
