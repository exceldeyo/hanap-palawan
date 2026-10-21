import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SalaryRangeFilter } from './SalaryRangeFilter';
import { PalawanNewsSection } from './PalawanNewsSection';
import { JobCardSkeleton } from '../common/Skeletons';
import { 
  Search, 
  MapPin, 
  Heart, 
  CheckCircle2, 
  Building2, 
  ExternalLink, 
  Sparkles, 
  Filter, 
  TrendingUp, 
  FileText, 
  ChevronRight,
  ChevronDown,
  RotateCcw,
  X,
  ShieldCheck,
  Clock,
  Briefcase,
  DollarSign,
  Share2,
  Check,
  Send,
  Zap,
  Compass,
  ArrowRight
} from 'lucide-react';

export const JobSearchFeed: React.FC = () => {
  const { 
    jobs, 
    selectedJobId, 
    setSelectedJobId, 
    savedJobIds, 
    toggleSaveJob, 
    setApplyingForJob,
    openAiAssistant,
    applicants,
    candidateProfile,
    jobSearchKeywordFilter,
    setJobSearchKeywordFilter,
    userProfile
  } = useApp();

  const [keywordQuery, setKeywordQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minSalaryFilter, setMinSalaryFilter] = useState<number>(0);

  // Sync keyword query when navigated from Palawan news or external actions
  useEffect(() => {
    if (jobSearchKeywordFilter) {
      setKeywordQuery(jobSearchKeywordFilter);
      setJobSearchKeywordFilter('');
    }
  }, [jobSearchKeywordFilter, setJobSearchKeywordFilter]);

  // Mobile navigation state: 'list' | 'detail'
  const [mobileDetailView, setMobileDetailView] = useState<boolean>(false);

  // Expandable filters state
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);

  // Loading state shimmer
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Share feedback state
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Save feedback state for micro-animation response
  const [saveFeedback, setSaveFeedback] = useState<{ id: string; action: 'saved' | 'removed' } | null>(null);

  const handleToggleSaveJob = (jobId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isCurrentlySaved = savedJobIds.includes(jobId);
    toggleSaveJob(jobId);
    setSaveFeedback({
      id: jobId,
      action: isCurrentlySaved ? 'removed' : 'saved'
    });
    setTimeout(() => {
      setSaveFeedback(prev => (prev?.id === jobId ? null : prev));
    }, 1000);
  };

  const handleShareJob = (jobId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const shareUrl = `${window.location.origin}/?jobId=${jobId}`;
      navigator.clipboard.writeText(shareUrl).catch(() => {});
      setCopiedShareId(jobId);
      setTimeout(() => setCopiedShareId(null), 2000);
    }
  };

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchKeyword = !keywordQuery || 
        job.title.toLowerCase().includes(keywordQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(keywordQuery.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(keywordQuery.toLowerCase())) ||
        job.department.toLowerCase().includes(keywordQuery.toLowerCase());

      const matchLocation = !locationQuery ||
        job.location.toLowerCase().includes(locationQuery.toLowerCase());

      const matchWorkplace = selectedWorkplace === 'all' || job.workplaceType === selectedWorkplace;
      const matchType = selectedType === 'all' || job.type === selectedType;
      const matchSalary = job.salaryMax >= minSalaryFilter;

      return matchKeyword && matchLocation && matchWorkplace && matchType && matchSalary;
    });
  }, [jobs, keywordQuery, locationQuery, selectedWorkplace, selectedType, minSalaryFilter]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedWorkplace !== 'all') count++;
    if (selectedType !== 'all') count++;
    if (minSalaryFilter > 0) count++;
    if (locationQuery) count++;
    return count;
  }, [selectedWorkplace, selectedType, minSalaryFilter, locationQuery]);

  const activeJob = useMemo(() => {
    if (!selectedJobId) return filteredJobs[0] || jobs[0];
    return jobs.find(j => j.id === selectedJobId) || filteredJobs[0] || jobs[0];
  }, [selectedJobId, jobs, filteredJobs]);

  const existingApplication = useMemo(() => {
    if (!activeJob) return null;
    const userEmail = userProfile?.email || candidateProfile.email;
    return applicants.find(a => a.jobId === activeJob.id && (a.email === userEmail || a.seekerId === userProfile?.uid));
  }, [activeJob, applicants, candidateProfile.email, userProfile]);

  const formatSalary = (min: number, max: number, currency: string, period: string) => {
    const symbol = currency === 'PHP' ? '₱' : '$';
    const minFormatted = (min / 1000).toLocaleString() + 'k';
    const maxFormatted = (max / 1000).toLocaleString() + 'k';
    return `${symbol}${minFormatted} - ${symbol}${maxFormatted} / ${period}`;
  };

  const getDaysAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Ngayong araw';
    if (days === 1) return '1 araw nakalipas';
    return `${days} araw nakalipas`;
  };

  const handleSelectJobCard = (id: string) => {
    setSelectedJobId(id);
    setMobileDetailView(true);
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Search Hero Banner */}
      <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 ${mobileDetailView ? 'hidden lg:block' : 'block'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Palawan Career & Direct Hiring Hub
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
              {jobs.length} Aktibong Oportunidad
            </span>
          </div>

          <div className="text-slate-500 dark:text-slate-400 text-[11px]">
            Puerto Princesa · El Nido · Coron · San Vicente · Narra · WFH
          </div>
        </div>

        {/* Main Search Inputs Grid */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Keyword Search */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={keywordQuery}
              onChange={e => setKeywordQuery(e.target.value)}
              placeholder="Posisyon, kasanayan, o kumpanya..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[44px]"
            />
            {keywordQuery && (
              <button
                type="button"
                onClick={() => setKeywordQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Location Input */}
          <div className="relative md:w-56 lg:w-64 shrink-0">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={locationQuery}
              onChange={e => setLocationQuery(e.target.value)}
              placeholder="Munisipyo / Isla..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[44px]"
            />
            {locationQuery && (
              <button
                type="button"
                onClick={() => setLocationQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Toggle & Search CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFilterExpanded(prev => !prev)}
              className={`flex-1 md:flex-initial py-2.5 px-4 border rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] whitespace-nowrap ${
                isFilterExpanded || activeFilterCount > 0
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${isFilterExpanded ? 'rotate-180' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => {
                const elem = document.getElementById('job-feed-results');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 md:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px] whitespace-nowrap"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span>Maghanap</span>
            </button>
          </div>
        </div>

        {/* Quick Municipality Shortcut Pills */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-semibold text-[11px] shrink-0 mr-1">
            Palawan Locations:
          </span>
          {[
            { label: 'Lahat ng Palawan', query: '' },
            { label: 'Puerto Princesa', query: 'Puerto Princesa' },
            { label: 'El Nido', query: 'El Nido' },
            { label: 'Coron', query: 'Coron' },
            { label: 'San Vicente', query: 'San Vicente' },
            { label: 'Taytay', query: 'Taytay' },
            { label: 'Narra & Timog', query: 'Narra' },
            { label: 'Remote / WFH', query: 'Remote' }
          ].map(loc => {
            const isSelected = locationQuery.toLowerCase() === loc.query.toLowerCase();
            return (
              <button
                key={loc.label}
                type="button"
                onClick={() => setLocationQuery(loc.query)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {loc.label}
              </button>
            );
          })}
        </div>

        {/* Expandable Advanced Filters */}
        {isFilterExpanded && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Piliin ang Parameter ng Trabaho:</span>
              </span>

              {(keywordQuery || locationQuery || selectedWorkplace !== 'all' || selectedType !== 'all' || minSalaryFilter > 0) && (
                <button
                  type="button"
                  onClick={() => {
                    setKeywordQuery('');
                    setLocationQuery('');
                    setSelectedWorkplace('all');
                    setSelectedType('all');
                    setMinSalaryFilter(0);
                  }}
                  className="text-rose-600 dark:text-rose-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>I-reset ang lahat</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              {/* Workplace Policy */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <span className="text-[11px] text-slate-400 dark:text-slate-500 px-2 font-medium">Workplace:</span>
                {['all', 'Remote', 'Hybrid', 'Onsite'].map(policy => (
                  <button
                    key={policy}
                    type="button"
                    onClick={() => setSelectedWorkplace(policy)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedWorkplace === policy 
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {policy === 'all' ? 'Lahat' : policy}
                  </button>
                ))}
              </div>

              {/* Employment Type */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <span className="text-[11px] text-slate-400 dark:text-slate-500 px-2 font-medium">Uri:</span>
                {['all', 'Full-time', 'Contract'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedType === type 
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {type === 'all' ? 'Lahat' : type}
                  </button>
                ))}
              </div>

              {/* Salary Range Filter */}
              <SalaryRangeFilter
                minSalary={minSalaryFilter}
                onChangeMinSalary={setMinSalaryFilter}
                matchingCount={filteredJobs.length}
                totalCount={jobs.length}
              />
            </div>
          </div>
        )}
      </div>

      {/* Palawan Local Government & Recruitment Announcements */}
      <div className={mobileDetailView ? 'hidden lg:block' : 'block'}>
        <PalawanNewsSection 
          onSearchKeyword={kw => {
            setKeywordQuery(kw);
            const feedElem = document.getElementById('job-feed-results');
            if (feedElem) {
              feedElem.scrollIntoView({ behavior: 'smooth' });
            }
          }} 
        />
      </div>

      {/* Main 2-Column Split Viewport */}
      <div id="job-feed-results" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Job Cards List (40% / 5 Cols) */}
        <div className={`space-y-3 ${mobileDetailView ? 'hidden lg:block lg:col-span-5' : 'block lg:col-span-5'}`}>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-medium">
            <span>Mayroong <strong className="text-slate-900 dark:text-white tabular-nums">{filteredJobs.length}</strong> trabaho na tumutugma</span>
            <span>Inuna ang pinakabagong post</span>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map(idx => (
                <JobCardSkeleton key={idx} />
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3 shadow-2xs">
              <Building2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">Walang nakitang trabaho sa search na ito</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Subukang palawakin ang keywords o i-reset ang mga filter.</p>
              <button
                type="button"
                onClick={() => {
                  setKeywordQuery('');
                  setLocationQuery('');
                  setSelectedWorkplace('all');
                  setSelectedType('all');
                  setMinSalaryFilter(0);
                }}
                className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                I-reset ang lahat ng filter
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map(job => {
                const isSelected = activeJob?.id === job.id;
                const isSaved = savedJobIds.includes(job.id);
                const isApplied = applicants.some(
                  a => a.jobId === job.id && (a.email === userProfile?.email || a.email === candidateProfile.email)
                );

                return (
                  <div
                    key={job.id}
                    onClick={() => handleSelectJobCard(job.id)}
                    className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 sm:p-5 shadow-xs transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950 text-emerald-400 font-extrabold text-base flex items-center justify-center shrink-0 border border-slate-800 shadow-2xs">
                          {job.company.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block truncate">
                            {job.company}
                          </span>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {job.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={e => handleToggleSaveJob(job.id, e)}
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
                            isSaved
                              ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/60'
                              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                          title={isSaved ? 'Remove from saved' : 'Save job'}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Metadata line with typographic separators (NO PILLS) */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span className="inline-flex items-center gap-1 text-slate-800 dark:text-slate-200 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{job.location}</span>
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span>{job.workplaceType}</span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span>{job.type}</span>
                    </div>

                    {/* Salary Display */}
                    <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="font-mono font-extrabold text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">
                        ₱{(job.salaryMin / 1000).toFixed(0)}k - ₱{(job.salaryMax / 1000).toFixed(0)}k <span className="text-[10px] text-slate-400 font-normal">/ buwan</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {isApplied && (
                          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Naka-apply Na</span>
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">
                          {getDaysAgo(job.postedDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Active Job Detail View (60% / 7 Cols Desktop, Drawer on Mobile) */}
        <div className={`lg:col-span-7 ${mobileDetailView ? 'block' : 'hidden lg:block'}`}>
          {activeJob ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6 lg:sticky lg:top-20 max-h-[calc(100vh-100px)] overflow-y-auto no-scrollbar">
              {/* Mobile Back Button */}
              <div className="lg:hidden pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMobileDetailView(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>← Bumalik sa Listahan</span>
                </button>
                <span className="text-xs text-slate-400">Job Details</span>
              </div>

              {/* Header Hero Section of Job */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0 border border-slate-800">
                      {activeJob.company.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                          {activeJob.company}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Verified Local Business</span>
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                        {activeJob.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleSaveJob(activeJob.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        savedJobIds.includes(activeJob.id)
                          ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 text-rose-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800'
                      }`}
                      title="Bookmark Job"
                    >
                      <Heart className={`w-5 h-5 ${savedJobIds.includes(activeJob.id) ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShareJob(activeJob.id)}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                      title="Share link"
                    >
                      {copiedShareId === activeJob.id ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Key Metrics Banner Grid (No pill wrappers) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pasahod / Sahod</span>
                    <span className="font-mono font-extrabold text-emerald-700 dark:text-emerald-400 text-sm block mt-0.5">
                      ₱{(activeJob.salaryMin / 1000).toFixed(0)}k - ₱{(activeJob.salaryMax / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lokasyon</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate mt-0.5">
                      {activeJob.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Workplace</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">
                      {activeJob.workplaceType}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Uri ng Trabaho</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">
                      {activeJob.type}
                    </span>
                  </div>
                </div>

                {/* Main Call To Action Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                  {existingApplication ? (
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between w-full">
                      <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 text-xs font-bold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Naisumite na ang iyong aplikasyon noong {new Date(existingApplication.appliedAt).toLocaleDateString()}</span>
                      </div>
                      <span className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-400">
                        Status: {existingApplication.status.replace('_', ' ')}
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setApplyingForJob(activeJob)}
                      className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Mag-Apply Agad (1-Click Resume)</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => openAiAssistant(activeJob, 'pitch')}
                    className="px-4 py-3 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Gabay Palaweño AI Assistant</span>
                  </button>
                </div>
              </div>

              {/* Job Description & Requirements */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
                    Deskripsyon ng Trabaho (Job Description)
                  </h3>
                  <p className="whitespace-pre-line">{activeJob.description}</p>
                </div>

                {activeJob.qualifications && activeJob.qualifications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
                      Mga Katangian & Qualifications
                    </h3>
                    <ul className="space-y-2">
                      {activeJob.qualifications.map((qual: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills tags */}
                {activeJob.skills && activeJob.skills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
                      Kasanayan (Key Skills)
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {activeJob.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Screening Questions Preview */}
                {activeJob.screeningQuestions && activeJob.screeningQuestions.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
                      Mga Tanong sa Application ({activeJob.screeningQuestions.length}):
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      {activeJob.screeningQuestions.map(q => (
                        <li key={q.id}>· {q.question}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              Pumili ng trabaho sa kaliwa upang makita ang buong detalye.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
