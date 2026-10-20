import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  MapPin, 
  FileText, 
  Plus, 
  Trash2, 
  Save, 
  GraduationCap, 
  Briefcase, 
  Heart,
  Calendar,
  Upload,
  Sparkles,
  Camera
} from 'lucide-react';

import { GuidedResumeBuilder } from './GuidedResumeBuilder';

export const ProfileResumeView: React.FC = () => {
  const {
    candidateProfile,
    updateCandidateProfile,
    jobs,
    savedJobIds,
    toggleSaveJob,
    interviews,
    setActiveInterviewRoom,
    userProfile,
    openAuthModal
  } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'saved' | 'interviews' | 'builder'>('profile');

  if (!userProfile) {
    return (
      <div className="max-w-xl mx-auto py-8 sm:py-12 px-4 text-center space-y-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm my-4 sm:my-8">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-inner">
          <User className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">I-connect ang Iyong Profile at CV</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Mag-sign in o mag-sign up bilang Job Seeker para ma-access ang iyong personal Palawan CV, saved jobs, at interview schedule.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => openAuthModal('signin', 'seeker')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all cursor-pointer"
          >
            Mag-sign In bilang Job Seeker
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('signup', 'seeker')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          >
            Gumawa ng Bagong Account
          </button>
        </div>
      </div>
    );
  }

  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));
  const myInterviews = interviews.filter(i => i.applicantEmail === candidateProfile.email);

  const [fullName, setFullName] = useState(candidateProfile.fullName);
  const [email, setEmail] = useState(candidateProfile.email);
  const [phone, setPhone] = useState(candidateProfile.phone);
  const [headline, setHeadline] = useState(candidateProfile.headline);
  const [location, setLocation] = useState(candidateProfile.location);
  const [summary, setSummary] = useState(candidateProfile.summary);
  const [skills, setSkills] = useState<string[]>(candidateProfile.skills);
  const [newSkill, setNewSkill] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState(candidateProfile.portfolioUrl || '');
  const [githubUrl, setGithubUrl] = useState(candidateProfile.githubUrl || '');
  const [avatarUrl, setAvatarUrl] = useState(candidateProfile.avatarUrl || '');

  // Dynamic experience and education lists
  const [experienceList, setExperienceList] = useState(candidateProfile.experience || []);
  const [educationList, setEducationList] = useState(candidateProfile.education || []);

  // Form inputs for adding new experience
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpDuration, setNewExpDuration] = useState('');
  const [newExpHighlight, setNewExpHighlight] = useState('');

  // Form inputs for adding new education
  const [newEduDegree, setNewEduDegree] = useState('');
  const [newEduSchool, setNewEduSchool] = useState('');
  const [newEduYear, setNewEduYear] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [parseMsg, setParseMsg] = useState<string | null>(null);

  const handleAddSkill = () => {
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddExperience = () => {
    if (!newExpRole.trim() || !newExpCompany.trim()) return;
    const newExp = {
      id: 'exp-' + Date.now(),
      role: newExpRole.trim(),
      company: newExpCompany.trim(),
      duration: newExpDuration.trim() || '2025 - Present',
      highlights: newExpHighlight.trim()
        ? [newExpHighlight.trim()]
        : ['Nagsilbi sa lokal na komunidad at proyektong panteknolohiya']
    };
    setExperienceList([newExp, ...experienceList]);
    setNewExpRole('');
    setNewExpCompany('');
    setNewExpDuration('');
    setNewExpHighlight('');
  };

  const handleDeleteExperience = (id: string) => {
    setExperienceList(experienceList.filter(e => e.id !== id));
  };

  const handleAddEducation = () => {
    if (!newEduDegree.trim() || !newEduSchool.trim()) return;
    const newEdu = {
      id: 'edu-' + Date.now(),
      degree: newEduDegree.trim(),
      school: newEduSchool.trim(),
      year: newEduYear.trim() || '2021 - 2025'
    };
    setEducationList([newEdu, ...educationList]);
    setNewEduDegree('');
    setNewEduSchool('');
    setNewEduYear('');
  };

  const handleDeleteEducation = (id: string) => {
    setEducationList(educationList.filter(e => e.id !== id));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const text = (event.target?.result as string) || '';
      setParseMsg('Binabasa at pinu-parse ang resume...');
      setTimeout(() => {
        if (text.includes('@')) {
          const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
          if (emailMatch) setEmail(emailMatch[1]);
        }
        if (text.length > 50) {
          setSummary(text.slice(0, 300) + '...');
        }
        setParseMsg('Tagumpay na na-parse at nai-fill up ang profile mula sa resume!');
        setTimeout(() => setParseMsg(null), 4000);
      }, 1000);
    };
    reader.readAsText(file);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const result = event.target?.result as string;
      if (result) {
        setAvatarUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateProfile({
      fullName,
      email,
      phone,
      headline,
      location,
      summary,
      skills,
      portfolioUrl,
      githubUrl,
      avatarUrl,
      experience: experienceList,
      education: educationList,
      resumeLastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-4 sm:space-y-6 pb-8 overflow-hidden">
      {/* Compact Mobile-First Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <label className="relative cursor-pointer group shrink-0" title="Mag-upload ng Profile Picture">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                referrerPolicy="no-referrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-xl">
                {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-xs">
              <Camera className="w-3 h-3" />
            </span>
            <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
          </label>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
                {fullName || 'Palaweño Job Seeker'}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                Palaweño Seeker
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 truncate">{headline}</p>
            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">{location}</span>
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between pt-2.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 text-xs shrink-0">
          <span className="text-[11px] text-slate-400">CV Updated:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono text-[11px]">
            {candidateProfile.resumeLastUpdated}
          </span>
        </div>
      </div>

      {/* 2x2 Grid on Mobile, 4 Columns on Tablet/Desktop — Fits 100% on Mobile Screens */}
      <div className="grid grid-cols-2 sm:grid-cols-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-xs gap-1.5">
        <button
          type="button"
          onClick={() => setActiveSubTab('profile')}
          className={`px-2.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${
            activeSubTab === 'profile'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Profile & CV</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('saved')}
          className={`px-2.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${
            activeSubTab === 'saved'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Saved ({savedJobIds.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('interviews')}
          className={`px-2.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${
            activeSubTab === 'interviews'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Interviews ({myInterviews.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('builder')}
          className={`px-2.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${
            activeSubTab === 'builder'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Resume Builder</span>
        </button>
      </div>

      {activeSubTab === 'builder' && <GuidedResumeBuilder />}

      {activeSubTab === 'saved' ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Nai-save na mga Trabaho (Saved Jobs)</span>
          </h3>
          {savedJobs.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <Heart className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">Wala ka pang naka-save na trabaho.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedJobs.map(job => (
                <div key={job.id} className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">{job.company}</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{job.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                      ₱{(job.salaryMin / 1000).toFixed(0)}k - ₱{(job.salaryMax / 1000).toFixed(0)}k
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSaveJob(job.id)}
                      className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
                    >
                      Tanggalin
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeSubTab === 'interviews' ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>Nai-schedule na Interview</span>
          </h3>
          {myInterviews.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">Wala pang nakatakdang interview para sa iyo.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myInterviews.map(interview => (
                <div key={interview.id} className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{interview.jobTitle}</div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">{interview.company} · {interview.stage}</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {interview.date} ({interview.time}) - {interview.durationMinutes} mins
                    </div>
                  </div>
                  {interview.status !== 'completed' && (
                    <button
                      type="button"
                      onClick={() => setActiveInterviewRoom(interview)}
                      className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0 text-center"
                    >
                      Pumasok sa Video Room
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {activeSubTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-7 shadow-xs space-y-5 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Personal & Career Information
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                I-update ang iyong impormasyon para sa mabilis na aplikasyon sa Palawan.
              </p>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs min-h-[40px]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedSuccess ? 'Nai-save Na!' : 'I-save ang Profile'}</span>
            </button>
          </div>

          {parseMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{parseMsg}</span>
            </div>
          )}

          {/* Compact Mobile-Friendly Upload Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="space-y-1.5 min-w-0">
              <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">Mag-upload ng Resume (Auto-Fill)</span>
              </label>
              <p className="text-[11px] text-slate-500 leading-snug">PDF/TXT resume para awtomatikong ma-fill up ang profile.</p>
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleResumeUpload}
                className="w-full max-w-full text-[11px] text-slate-500 file:mr-2.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer overflow-hidden"
              />
            </div>

            <div className="space-y-1.5 min-w-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/70 dark:border-slate-700/60">
              <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">Palitan ang Profile Picture</span>
              </label>
              <p className="text-[11px] text-slate-500 leading-snug">Mag-upload ng larawan direkta mula sa iyong device.</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="w-full max-w-full text-[11px] text-slate-500 file:mr-2.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-900 cursor-pointer overflow-hidden"
              />
            </div>
          </div>

          {/* Basic inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Buong Pangalan</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Telepono / Mobile</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Lokasyon sa Palawan</label>
              <input
                type="text"
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Puerto Princesa City, El Nido, Coron"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Professional Headline</label>
              <input
                type="text"
                required
                value={headline}
                onChange={e => setHeadline(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tungkol sa Iyo (Professional Summary)</label>
              <textarea
                rows={3}
                value={summary}
                onChange={e => setSummary(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 leading-relaxed"
              />
            </div>
          </div>

          {/* Skills Management */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Kasanayan at Teknolohiya (Skills & Tools)
            </label>

            <div className="flex flex-wrap items-center gap-1.5">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-200 dark:border-emerald-800"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 w-full sm:max-w-sm">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Idagdag (hal. Customer Service, Divemaster)"
                className="flex-1 min-w-0 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
              >
                Idagdag
              </button>
            </div>
          </div>

          {/* Online Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Portfolio o Website URL</label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={e => setPortfolioUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">GitHub / LinkedIn URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={e => setGithubUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-3.5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Edukasyon (Education)</span>
            </h4>

            <div className="space-y-2">
              {educationList.map(edu => (
                <div key={edu.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-start sm:items-center gap-2 text-xs">
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 dark:text-white">{edu.degree}</div>
                    <div className="text-slate-600 dark:text-slate-400 truncate">{edu.school}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-slate-400 text-[11px]">{edu.year}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2.5">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Magdagdag ng Edukasyon</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Degree / Kurso (hal. BSIT)"
                  value={newEduDegree}
                  onChange={e => setNewEduDegree(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
                <input
                  type="text"
                  placeholder="Paaralan / Unibersidad"
                  value={newEduSchool}
                  onChange={e => setNewEduSchool(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
                <input
                  type="text"
                  placeholder="Taon (hal. 2020 - 2024)"
                  value={newEduYear}
                  onChange={e => setNewEduYear(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
              <button
                type="button"
                onClick={handleAddEducation}
                className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Idagdag ang Edukasyon</span>
              </button>
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="space-y-3.5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Karanasan sa Trabaho (Work Experience)</span>
            </h4>

            <div className="space-y-2.5">
              {experienceList.map(exp => (
                <div key={exp.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{exp.role}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-slate-400 text-[11px]">{exp.duration}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-semibold">{exp.company}</div>
                  <ul className="mt-1.5 space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2.5">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Magdagdag ng Karanasan sa Trabaho</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Posisyon (hal. Front Desk)"
                  value={newExpRole}
                  onChange={e => setNewExpRole(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
                <input
                  type="text"
                  placeholder="Kumpanya / Organisasyon"
                  value={newExpCompany}
                  onChange={e => setNewExpCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
                <input
                  type="text"
                  placeholder="Tagal (hal. 2023 - Present)"
                  value={newExpDuration}
                  onChange={e => setNewExpDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
              <input
                type="text"
                placeholder="Pangunahing gawain o tagumpay (Highlight)"
                value={newExpHighlight}
                onChange={e => setNewExpHighlight(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddExperience}
                className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Idagdag ang Karanasan</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
