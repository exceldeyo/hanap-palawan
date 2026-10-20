import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink,
  Plus,
  Trash2,
  User,
  ShieldCheck
} from 'lucide-react';

export const GuidedResumeBuilder: React.FC = () => {
  const { candidateProfile, updateCandidateProfile } = useApp();

  const [fullName, setFullName] = useState(candidateProfile.fullName || 'Juan Dela Cruz');
  const [email, setEmail] = useState(candidateProfile.email || 'juan.palaweño@example.com');
  const [phone, setPhone] = useState(candidateProfile.phone || '+63 912 345 6789');
  const [location, setLocation] = useState(candidateProfile.location || 'Puerto Princesa City, Palawan');
  const [headline, setHeadline] = useState(candidateProfile.headline || 'Professional Job Seeker · Palawan');
  const [summary, setSummary] = useState(candidateProfile.summary || 'Masipag at dedikadong manggagawang Palaweño na may karanasan sa turismo, customer service, at operasyon. Handa nang maglingkod sa mga pinagkakatiwalaang negosyo sa Palawan.');
  const [skills, setSkills] = useState<string[]>(candidateProfile.skills || ['Customer Service', 'Tourism & Hospitality', 'Communication', 'Microsoft Office', 'English & Tagalog']);
  const [newSkill, setNewSkill] = useState('');
  
  const [experienceList, setExperienceList] = useState(candidateProfile.experience || [
    {
      id: 'exp-1',
      role: 'Guest Service Assistant',
      company: 'El Nido Beach Resort & Spa',
      duration: '2023 - Present',
      highlights: ['Namahala sa pagtanggap ng mga turista at booking.', 'Nagbigay ng impormasyon tungkol sa eco-tourism at Island hopping tours.']
    }
  ]);

  const [educationList, setEducationList] = useState(candidateProfile.education || [
    {
      id: 'edu-1',
      degree: 'BS in Hospitality Management',
      school: 'Palawan State University - Puerto Princesa',
      year: '2019 - 2023'
    }
  ]);

  // Add form states
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpDuration, setNewExpDuration] = useState('');
  const [newExpHighlight, setNewExpHighlight] = useState('');

  const [newEduDegree, setNewEduDegree] = useState('');
  const [newEduSchool, setNewEduSchool] = useState('');
  const [newEduYear, setNewEduYear] = useState('');

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleAddSkill = () => {
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddExperience = () => {
    if (!newExpRole.trim() || !newExpCompany.trim()) return;
    setExperienceList([
      {
        id: 'exp-' + Date.now(),
        role: newExpRole.trim(),
        company: newExpCompany.trim(),
        duration: newExpDuration.trim() || '2024 - Present',
        highlights: newExpHighlight.trim() ? [newExpHighlight.trim()] : ['Propesyonal na paglilingkod sa Palawan']
      },
      ...experienceList
    ]);
    setNewExpRole('');
    setNewExpCompany('');
    setNewExpDuration('');
    setNewExpHighlight('');
    showToast('Nai-dagdag ang karanasan sa trabaho!');
  };

  const handleAddEducation = () => {
    if (!newEduDegree.trim() || !newEduSchool.trim()) return;
    setEducationList([
      {
        id: 'edu-' + Date.now(),
        degree: newEduDegree.trim(),
        school: newEduSchool.trim(),
        year: newEduYear.trim() || '2020 - 2024'
      },
      ...educationList
    ]);
    setNewEduDegree('');
    setNewEduSchool('');
    setNewEduYear('');
    showToast('Nai-dagdag ang detalye ng edukasyon!');
  };

  const handleSaveAndSync = () => {
    updateCandidateProfile({
      fullName,
      email,
      phone,
      location,
      headline,
      summary,
      skills,
      experience: experienceList,
      education: educationList,
      resumeLastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });
    showToast('Tagumpay na nai-save ang resume sa inyong Palawan profile!');
  };

  // Download PDF simulation / Print to PDF
  const handleDownloadPDF = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
      window.print();
    }, 800);
  };

  // Shareable link generator
  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Kopyado na ang link ng iyong Palawan Resume sa clipboard!');
    } else {
      showToast('Na-ready na ang shareable resume profile!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Palawan Professional CV Generator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Guided Resume Builder</h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            I-input ang iyong kasaysayan sa trabaho, kasanayan, at edukasyon upang lumikha ng propesyonal at nababagay na resume para sa mga employer sa Palawan. Maaari itong i-download bilang PDF o i-share agad.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center">
          <button
            type="button"
            onClick={handleSaveAndSync}
            className="px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>I-save sa Profile</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
            className="px-5 py-2.5 bg-emerald-950/80 hover:bg-emerald-900 text-white border border-emerald-400/40 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-300" />
            <span>{isGeneratingPdf ? 'Ginagawa ang PDF...' : 'I-download ang PDF'}</span>
          </button>

          <button
            type="button"
            onClick={handleShareLink}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>I-share Link</span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Grid: Builder Form on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form Editor */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* 1. Personal Information */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>1. Personal Information</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Buong Pangalan</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Telepono</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Lokasyon sa Palawan</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Professional Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Professional Summary (Tungkol sa Iyo)</label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* 2. Skills & Competencies */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>2. Skills & Competencies</span>
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {skills.map(skill => (
                <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                  <span>{skill}</span>
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-rose-600 cursor-pointer p-0.5">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Idagdag ang kasanayan (hal. SCUBA, Accounting, Marketing)"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer shrink-0"
              >
                Add
              </button>
            </div>
          </div>

          {/* 3. Work Experience */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>3. Work History</span>
            </h3>

            <div className="space-y-3">
              {experienceList.map(exp => (
                <div key={exp.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 dark:text-white">
                    <span>{exp.role}</span>
                    <span className="font-mono text-slate-500 text-[11px]">{exp.duration}</span>
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-semibold">{exp.company}</div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1">{exp.highlights[0]}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Magdagdag ng Karanasan</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Posisyon (hal. Tour Coordinator)"
                  value={newExpRole}
                  onChange={e => setNewExpRole(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Kumpanya / Negosyo"
                  value={newExpCompany}
                  onChange={e => setNewExpCompany(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Tagal (hal. 2022 - 2024)"
                  value={newExpDuration}
                  onChange={e => setNewExpDuration(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Pangunahing tungkulin o tagumpay"
                  value={newExpHighlight}
                  onChange={e => setNewExpHighlight(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>
              <button
                type="button"
                onClick={handleAddExperience}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Idagdag ang Trabaho</span>
              </button>
            </div>
          </div>

          {/* 4. Education */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>4. Education</span>
            </h3>

            <div className="space-y-2">
              {educationList.map(edu => (
                <div key={edu.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{edu.degree}</div>
                    <div className="text-slate-600 dark:text-slate-400">{edu.school}</div>
                  </div>
                  <span className="font-mono text-slate-400 font-semibold">{edu.year}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Magdagdag ng Edukasyon</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Degree o Kurso"
                  value={newEduDegree}
                  onChange={e => setNewEduDegree(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Paaralan / Unibersidad"
                  value={newEduSchool}
                  onChange={e => setNewEduSchool(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Taon (hal. 2018 - 2022)"
                  value={newEduYear}
                  onChange={e => setNewEduYear(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>
              <button
                type="button"
                onClick={handleAddEducation}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Idagdag ang Edukasyon</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Live Resume PDF Preview */}
        <div className="lg:col-span-6 sticky top-20">
          <div className="bg-white text-slate-900 border border-slate-300 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6 print:shadow-none print:border-none print:m-0 font-sans">
            
            {/* Resume Header */}
            <div className="border-b border-slate-200 pb-6 text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{fullName || 'Palaweño Applicant'}</h1>
              <p className="text-sm font-bold text-emerald-700">{headline}</p>
              
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-600 flex-wrap pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-emerald-600" />
                  <span>{email}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>{phone}</span>
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider border-b border-emerald-600 pb-1">Professional Summary</h4>
              <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider border-b border-emerald-600 pb-1">Skills & Tools</h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded text-[11px] font-bold border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider border-b border-emerald-600 pb-1">Work Experience</h4>
              <div className="space-y-3">
                {experienceList.map(exp => (
                  <div key={exp.id} className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{exp.role}</span>
                      <span className="font-mono text-[11px] text-slate-500">{exp.duration}</span>
                    </div>
                    <div className="text-emerald-700 font-semibold">{exp.company}</div>
                    <ul className="list-disc list-inside text-slate-600 space-y-0.5 pl-1">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider border-b border-emerald-600 pb-1">Education</h4>
              <div className="space-y-2">
                {educationList.map(edu => (
                  <div key={edu.id} className="flex justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-slate-600">{edu.school}</div>
                    </div>
                    <span className="font-mono text-slate-500 text-[11px]">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Badge */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Verified Palawan Candidate</span>
              <span>Hanap Palawan Trabaho Hub</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
