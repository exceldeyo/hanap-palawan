import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateTailoredCoverNote } from '../../services/geminiService';
import { X, FileText, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const ApplyModal: React.FC = () => {
  const { applyingForJob, setApplyingForJob, candidateProfile, applyToJob, setSeekerTab } = useApp();

  const [fullName, setFullName] = useState(candidateProfile.fullName);
  const [email, setEmail] = useState(candidateProfile.email);
  const [phone, setPhone] = useState(candidateProfile.phone);
  const [expectedSalary, setExpectedSalary] = useState('₱115,000 / month');
  const [availability, setAvailability] = useState('30 days notice');
  const [coverNote, setCoverNote] = useState(
    `Magandang araw po sa ${applyingForJob?.company} hiring team!\n\nAs a passionate local professional based in Puerto Princesa City and graduate of Palawan State University, I am excited to apply for the ${applyingForJob?.title} role. My hands-on background in ${candidateProfile.skills.slice(0, 3).join(', ')} directly matches your team requirements, and I am eager to contribute to our home province.`
  );
  const [resumeName, setResumeName] = useState(candidateProfile.resumeFileName);
  const [customResumeUploaded, setCustomResumeUploaded] = useState(false);
  const [isPolishingWithAi, setIsPolishingWithAi] = useState(false);

  // Initialize screening question answers
  const [screeningAnswers, setScreeningAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    applyingForJob?.screeningQuestions.forEach(q => {
      initial[q.id] = '';
    });
    return initial;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!applyingForJob) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
      setCustomResumeUploaded(true);
    }
  };

  const handleAiPolishNote = async () => {
    setIsPolishingWithAi(true);
    try {
      const tailored = await generateTailoredCoverNote({
        candidate: candidateProfile,
        job: applyingForJob
      });
      setCoverNote(tailored);
    } finally {
      setIsPolishingWithAi(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedAnswers = applyingForJob.screeningQuestions.map(q => ({
      questionId: q.id,
      question: q.question,
      answer: screeningAnswers[q.id] || 'Not specified'
    }));

    setTimeout(() => {
      applyToJob({
        jobId: applyingForJob.id,
        fullName,
        email,
        phone,
        expectedSalary,
        availability,
        coverNote,
        screeningAnswers: formattedAnswers,
        resumeFileName: resumeName
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden my-4 sm:my-8 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/50 gap-3 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-slate-500">Direktang Application sa Palawan</div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug break-words">{applyingForJob.title}</h3>
            <p className="text-xs font-semibold text-emerald-700 truncate">{applyingForJob.company} · {applyingForJob.location}</p>
          </div>
          <button
            type="button"
            onClick={() => setApplyingForJob(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="p-5 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900">Naipadala ang Aplikasyon!</h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Matagumpay na natanggap ng hiring team ng <strong>{applyingForJob.company}</strong> ang inyong resume at screening responses. Makikita mo ang estado sa inyong dashboard.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setApplyingForJob(null);
                  setSeekerTab('applications');
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
              >
                <span>Tingnan sa My Applications</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setApplyingForJob(null)}
                className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center min-h-[42px]"
              >
                Maghanap Pa ng Trabaho
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 text-sm overflow-y-auto">
            {/* Section 1: Contact Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Impormasyon sa Pakikipag-ugnayan (Contact Details)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Buong Pangalan</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Numero ng Telepono</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Resume Selection */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Naka-attach na Resume
              </h4>
              <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-slate-900 truncate text-xs">{resumeName}</div>
                    <div className="text-[11px] text-slate-500">
                      {customResumeUploaded ? 'Uploaded from device' : `Palawan Profile Sync · Updated ${candidateProfile.resumeLastUpdated}`}
                    </div>
                  </div>
                </div>

                <label className="px-3 py-1.5 border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors shrink-0">
                  <span>Palitan</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Section 3: Salary & Availability */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3. Inaasahang Sahod at Notice Period
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Expected Monthly Salary</label>
                  <input
                    type="text"
                    required
                    value={expectedSalary}
                    onChange={e => setExpectedSalary(e.target.value)}
                    placeholder="e.g. ₱120,000 / month"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Kailan Puwedeng Magsimula</label>
                  <select
                    value={availability}
                    onChange={e => setAvailability(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="Immediate availability">Immediate availability (Agad-agad)</option>
                    <option value="2 weeks notice">2 weeks notice</option>
                    <option value="30 days notice">30 days notice</option>
                    <option value="60 days notice">60 days notice</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Screening Questions */}
            {applyingForJob.screeningQuestions && applyingForJob.screeningQuestions.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <span>4. Employer Screening Questions</span>
                  <span className="text-[11px] font-normal text-slate-500">Kailangan sagutin</span>
                </h4>
                <div className="space-y-3">
                  {applyingForJob.screeningQuestions.map((q, idx) => (
                    <div key={q.id}>
                      <label className="block text-xs font-medium text-slate-800 mb-1">
                        {idx + 1}. {q.question}
                      </label>
                      <textarea
                        required={q.required}
                        rows={2}
                        value={screeningAnswers[q.id] || ''}
                        onChange={e => setScreeningAnswers({ ...screeningAnswers, [q.id]: e.target.value })}
                        placeholder="Isulat ang iyong sagot dito..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5: Cover Note with AI Polish */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  5. Liham sa Hiring Manager (Cover Note)
                </label>

                <button
                  type="button"
                  onClick={handleAiPolishNote}
                  disabled={isPolishingWithAi}
                  className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer self-start sm:self-auto min-h-[32px]"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-emerald-600 ${isPolishingWithAi ? 'animate-spin' : ''}`} />
                  <span>{isPolishingWithAi ? 'Ginagawa ang Palawan Pitch...' : 'AI Polish with Gabay Palaweño'}</span>
                </button>
              </div>

              <textarea
                rows={4}
                value={coverNote}
                onChange={e => setCoverNote(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed font-sans"
              />
            </div>

            {/* Footer / Submit */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ligtas at direktang ipinapadala sa kumpanya sa Palawan.</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setApplyingForJob(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-center min-h-[40px]"
                >
                  Kanselahin
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer text-center min-h-[40px]"
                >
                  {isSubmitting ? 'Ipinapadala...' : 'Ipadala ang Aplikasyon'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
