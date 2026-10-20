import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkplaceType, JobType, ExperienceLevel, ScreeningQuestion } from '../../types';
import { generateJobPostingDraft } from '../../services/geminiService';
import { PlusCircle, Trash2, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const PostJobModal: React.FC = () => {
  const { addJob, setEmployerTab } = useApp();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('Palawan Tech Innovation Hub');
  const [department, setDepartment] = useState('Engineering & Digital');
  const [location, setLocation] = useState('Puerto Princesa City, Palawan');
  const [workplaceType, setWorkplaceType] = useState<WorkplaceType>('Hybrid');
  const [type, setType] = useState<JobType>('Full-time');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Mid Level');
  const [salaryMin, setSalaryMin] = useState<number>(85000);
  const [salaryMax, setSalaryMax] = useState<number>(120000);
  const [currency, setCurrency] = useState<'PHP' | 'USD'>('PHP');
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [qualificationsText, setQualificationsText] = useState('');
  const [benefitsText, setBenefitsText] = useState('');
  const [skillsText, setSkillsText] = useState('');

  // Screening questions
  const [screeningQuestions, setScreeningQuestions] = useState<ScreeningQuestion[]>([
    { id: 'q-1', question: 'Are you currently based in Palawan or open to relocating to the job site?', required: true },
    { id: 'q-2', question: 'What is your current notice period or earliest start date?', required: true }
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAiDraftJob = async () => {
    setAiNotice(null);
    if (!title.trim()) {
      setAiNotice('Pakilagay muna ang Job Title (hal. "Eco-Tour Lead Guide" o "Mobile App Developer") bago i-click ang AI Auto-Draft.');
      return;
    }

    setIsAiGenerating(true);
    try {
      const draft = await generateJobPostingDraft({
        title,
        location,
        workplaceType,
        department
      });

      setDepartment(draft.department);
      setLocation(draft.location);
      setSalaryMin(draft.salaryMin);
      setSalaryMax(draft.salaryMax);
      setDescription(draft.description);
      setResponsibilitiesText(draft.responsibilities.join('\n'));
      setQualificationsText(draft.qualifications.join('\n'));
      setBenefitsText(draft.benefits.join('\n'));
      setSkillsText(draft.skills.join(', '));
      if (draft.screeningQuestions && draft.screeningQuestions.length > 0) {
        setScreeningQuestions(draft.screeningQuestions);
      }
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleAddQuestion = () => {
    if (!newQuestionText.trim()) return;
    setScreeningQuestions(prev => [
      ...prev,
      {
        id: 'q-' + Date.now(),
        question: newQuestionText.trim(),
        required: true
      }
    ]);
    setNewQuestionText('');
  };

  const handleRemoveQuestion = (id: string) => {
    setScreeningQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parseLines = (text: string) =>
      text
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean);

    const skillsArray = skillsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    setTimeout(() => {
      addJob({
        title,
        company,
        location,
        workplaceType,
        type,
        experienceLevel,
        salaryMin: Number(salaryMin),
        salaryMax: Number(salaryMax),
        currency,
        salaryPeriod: 'month',
        department,
        description: description || 'Exciting career opportunity joining our Palawan-focused team.',
        responsibilities: parseLines(responsibilitiesText).length > 0 ? parseLines(responsibilitiesText) : [
          'Lead key daily operations and collaborative projects in Palawan.',
          'Coordinate closely with local community partners and team members.',
          'Uphold provincial environmental and quality standards.'
        ],
        qualifications: parseLines(qualificationsText).length > 0 ? parseLines(qualificationsText) : [
          'Relevant industry background and proven track record.',
          'Strong communication and collaborative mindset.'
        ],
        benefits: parseLines(benefitsText).length > 0 ? parseLines(benefitsText) : [
          'Competitive compensation with 14th-month pay',
          'Comprehensive HMO with local Palawan coverage',
          'Paid eco-leave for coastal conservation initiatives'
        ],
        skills: skillsArray.length > 0 ? skillsArray : ['Operations', 'Problem Solving', 'Communication'],
        screeningQuestions
      });

      setIsSubmitting(false);
      setSuccess(true);
    }, 350);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-8 shadow-xs">
        <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">Mag-post ng Bagong Trabaho sa Palawan</h2>
            <p className="text-xs text-slate-500 mt-1">
              Direktang abutin ang mga mahuhusay na Palaweño sa Puerto Princesa, El Nido, Coron, San Vicente, at remote work.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAiDraftJob}
            disabled={isAiGenerating}
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[40px]"
          >
            <Sparkles className={`w-4 h-4 text-emerald-600 ${isAiGenerating ? 'animate-spin' : ''}`} />
            <span>{isAiGenerating ? 'Bumubuo ng Job Details...' : 'Auto-Draft with Palawan AI'}</span>
          </button>
        </div>

        {aiNotice && (
          <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center justify-between gap-2">
            <span>{aiNotice}</span>
            <button type="button" onClick={() => setAiNotice(null)} className="text-amber-700 hover:text-amber-900 font-bold p-1 cursor-pointer">
              ✕
            </button>
          </div>
        )}

        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Matagumpay na Na-publish ang Opening!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Bukas na ngayon ang inyong listing para sa <strong>{title}</strong>. Maaari nang magpasa ng resume at screening answers ang mga kwalipikadong aplikante.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setEmployerTab('jobs')}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px]"
              >
                <span>Tingnan ang Job Postings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle('');
                  setDescription('');
                  setResponsibilitiesText('');
                  setQualificationsText('');
                  setBenefitsText('');
                  setSkillsText('');
                  setSuccess(false);
                }}
                className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-center min-h-[42px]"
              >
                Mag-post Pa ng Ibang Role
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-700">
            {/* 1. Basic Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Impormasyon ng Posisyon (Role Overview)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-slate-700">
                      Job Title *
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Hal. "Marine Conservation Specialist" o "Full Stack Dev"
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer, Eco-Resort Lead, Solar Systems Engineer"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    placeholder="e.g. Engineering, Marine Science, Hospitality"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Workplace Policy</label>
                  <select
                    value={workplaceType}
                    onChange={e => setWorkplaceType(e.target.value as WorkplaceType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote (Home-based Palawan)</option>
                    <option value="Onsite">Onsite (Island / Facility)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as JobType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Location / Munisipalidad</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Puerto Princesa City, El Nido, Coron, San Vicente"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={e => setExperienceLevel(e.target.value as ExperienceLevel)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead / Director">Lead / Director</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Compensation */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Buwanang Sahod (Monthly Compensation)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={e => setCurrency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="PHP">PHP (₱)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Min Salary (Monthly)</label>
                  <input
                    type="number"
                    required
                    value={salaryMin}
                    onChange={e => setSalaryMin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Max Salary (Monthly)</label>
                  <input
                    type="number"
                    required
                    value={salaryMax}
                    onChange={e => setSalaryMax(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            {/* 3. Description & Details */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3. Deskripsyon at Kwalipikasyon (Description & Requirements)
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  About the Opportunity *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Ilarawan ang kumpanya, misyon, at layunin ng posisyon..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Responsibilities (one per line)
                </label>
                <textarea
                  rows={3}
                  value={responsibilitiesText}
                  onChange={e => setResponsibilitiesText(e.target.value)}
                  placeholder="Lead core frontend features...&#10;Coordinate with local PAMBO marine officers...&#10;Optimize for low-bandwidth networks..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Qualifications (one per line)
                </label>
                <textarea
                  rows={3}
                  value={qualificationsText}
                  onChange={e => setQualificationsText(e.target.value)}
                  placeholder="3+ years proven experience...&#10;Graduate of PSU, WPU, or accredited university...&#10;Knowledge of Palawan island logistics..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Benefits & Perks (one per line)
                </label>
                <textarea
                  rows={3}
                  value={benefitsText}
                  onChange={e => setBenefitsText(e.target.value)}
                  placeholder="Comprehensive HMO (Maxicare Palawan)...&#10;Starlink or high-speed fiber internet stipend...&#10;Paid eco-leave for conservation..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Required Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={skillsText}
                  onChange={e => setSkillsText(e.target.value)}
                  placeholder="e.g. React, TypeScript, Hospitality, Scuba Diving, Solar PV"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* 4. Screening Questions */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>4. Screening Questions Para sa mga Aplikante</span>
                <span className="text-[11px] font-normal text-slate-500">
                  {screeningQuestions.length} tanong
                </span>
              </h3>

              <div className="space-y-2">
                {screeningQuestions.map((q, idx) => (
                  <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3">
                    <span className="font-medium text-slate-800 text-xs">
                      {idx + 1}. {q.question}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newQuestionText}
                  onChange={e => setNewQuestionText(e.target.value)}
                  placeholder="Magdagdag ng pasadyang tanong..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[40px]"
                />
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  disabled={!newQuestionText.trim()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-40 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer min-h-[40px] flex items-center justify-center"
                >
                  Idagdag
                </button>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500">
                Makikita agad ito sa Hanap Palawan portal.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-lg shadow-sm transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isSubmitting ? 'Ipinapublish...' : 'I-publish ang Job Opening'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
