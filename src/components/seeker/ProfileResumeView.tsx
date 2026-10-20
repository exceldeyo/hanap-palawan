import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Save, 
  GraduationCap, 
  Briefcase, 
  ExternalLink 
} from 'lucide-react';

export const ProfileResumeView: React.FC = () => {
  const { candidateProfile, updateCandidateProfile } = useApp();

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
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = () => {
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
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
      resumeLastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
          {candidateProfile.avatarUrl ? (
            <img
              src={candidateProfile.avatarUrl}
              alt={candidateProfile.fullName}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-xl shrink-0">
              {candidateProfile.fullName.charAt(0)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">{candidateProfile.fullName}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                Palaweño Verified
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{candidateProfile.headline}</p>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{candidateProfile.location}</span>
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-[11px] text-slate-400">Palawan CV Last Updated:</div>
          <div className="text-xs font-semibold text-slate-700 font-mono">{candidateProfile.resumeLastUpdated}</div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-8 shadow-xs space-y-6 text-xs text-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Personal & Career Information
          </h3>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs min-h-[40px]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savedSuccess ? 'Nai-save Na!' : 'I-save ang Profile'}</span>
          </button>
        </div>

        {/* Basic inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Buong Pangalan</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Telepono / Mobile</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Lokasyon sa Palawan</label>
            <input
              type="text"
              required
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Puerto Princesa City, El Nido, Coron"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline</label>
            <input
              type="text"
              required
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tungkol sa Iyo (Professional Summary)</label>
            <textarea
              rows={3}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 leading-relaxed font-sans"
            />
          </div>
        </div>

        {/* Skills Management */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
            Kasanayan at Teknolohiya (Skills & Tools)
          </label>

          <div className="flex flex-wrap items-center gap-1.5">
            {skills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200"
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

          <div className="flex gap-2 max-w-sm">
            <input
              type="text"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              placeholder="Idagdag (hal. Docker, Starlink, Divemaster)"
              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* Online Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Portfolio o Website URL</label>
            <input
              type="url"
              value={portfolioUrl}
              onChange={e => setPortfolioUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / LinkedIn URL</label>
            <input
              type="url"
              value={githubUrl}
              onChange={e => setGithubUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Education Highlight (PSU/WPU) */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Pinag-aralan sa Palawan (Education)</span>
          </h4>

          {candidateProfile.education.map(edu => (
            <div key={edu.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
              <div>
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-600">{edu.school}</div>
              </div>
              <div className="font-mono text-slate-400 font-semibold">{edu.year}</div>
            </div>
          ))}
        </div>

        {/* Work experience preview */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span>Karanasan sa Trabaho (Work Experience)</span>
          </h4>

          {candidateProfile.experience.map(exp => (
            <div key={exp.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900">{exp.role}</span>
                <span className="font-mono text-slate-400 text-[11px]">{exp.duration}</span>
              </div>
              <div className="text-emerald-700 font-semibold">{exp.company}</div>
              <ul className="mt-2 space-y-1 text-slate-600 list-disc list-inside">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};
