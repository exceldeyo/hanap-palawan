import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SalaryRangeFilter } from './SalaryRangeFilter';
import { PalawanNewsSection } from './PalawanNewsSection';
import { JobCardSkeleton, JobDetailSkeleton } from '../common/Skeletons';
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
  Mic,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  X
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
    setSeekerTab,
    jobSearchKeywordFilter,
    setJobSearchKeywordFilter
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

  // Expandable filters state (collapsed by default to prevent overexposure on main page)
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);

  // Loading state with shimmer feedback
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  // Save feedback state for micro-animation & tactile visual response
  const [saveFeedback, setSaveFeedback] = useState<{ id: string; action: 'saved' | 'removed' } | null>(null);

  const handleToggleSaveJob = (jobId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
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
    return applicants.find(a => a.jobId === activeJob.id && a.email === candidateProfile.email);
  }, [activeJob, applicants, candidateProfile.email]);

  const formatSalary = (min: number, max: number, currency: string, period: string) => {
    const symbol = currency === 'PHP' ? '₱' : '$';
    const minFormatted = (min / 1000).toLocaleString() + 'k';
    const maxFormatted = (max / 1000).toLocaleString() + 'k';
    return `${symbol}${minFormatted} - ${symbol}${maxFormatted} / ${period}`;
  };

  const getDaysAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Just today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const handleSelectJobCard = (id: string) => {
    setSelectedJobId(id);
    setMobileDetailView(true);
    // Smooth scroll to top on mobile
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search Header Hero Bar - responsive desktop & mobile list view */}
      <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-xs space-y-3.5 ${mobileDetailView ? 'hidden lg:block' : 'block'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
          <span className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
            <span>Trabaho Para sa Palaweño · Palawan Direct Hiring Hub</span>
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-[11px] truncate md:max-w-md">
            Puerto Princesa · El Nido · Coron · San Vicente · Narra · Remote WFH
          </span>
        </div>

        {/* Responsive Search Controls: 1 unified row on tablet (md: 768px+) & desktop (lg: 1024px+), clean stacked on mobile */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3">
          {/* Keyword Search Input */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={keywordQuery}
              onChange={e => setKeywordQuery(e.target.value)}
              placeholder="Posisyon, kasanayan, o kumpanya..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[44px]"
            />
            {keywordQuery && (
              <button
                type="button"
                onClick={() => setKeywordQuery('')}
                aria-label="I-clear ang keyword"
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
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[44px]"
            />
            {locationQuery && (
              <button
                type="button"
                onClick={() => setLocationQuery('')}
                aria-label="I-clear ang lokasyon"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Buttons: Filters & Maghanap */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFilterExpanded(prev => !prev)}
              className={`flex-1 md:flex-initial py-2.5 px-3.5 border rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] whitespace-nowrap ${
                isFilterExpanded || activeFilterCount > 0
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title={isFilterExpanded ? 'Itago ang mga filter' : 'Ipakita ang mga filter'}
              aria-expanded={isFilterExpanded}
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
              className="flex-1 md:flex-initial px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] whitespace-nowrap"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span>Maghanap</span>
            </button>
          </div>
        </div>

        {/* Active Filter Summary Bar (visible when collapsed and filters are active) */}
        {!isFilterExpanded && activeFilterCount > 0 && (
          <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-emerald-800 dark:text-emerald-400">Aktibong Filter:</span>
              {locationQuery && (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                  {locationQuery}
                </span>
              )}
              {selectedWorkplace !== 'all' && (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                  {selectedWorkplace}
                </span>
              )}
              {selectedType !== 'all' && (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                  {selectedType}
                </span>
              )}
              {minSalaryFilter > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                  Min ₱{(minSalaryFilter / 1000).toLocaleString()}k
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setLocationQuery('');
                setSelectedWorkplace('all');
                setSelectedType('all');
                setMinSalaryFilter(0);
              }}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold cursor-pointer shrink-0 ml-auto"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Expandable Filter Drawer (Only exposed when user clicks 'Filters') */}
        {isFilterExpanded && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3.5 animate-in fade-in duration-200">
            {/* Palawan Municipalities Quick Shortcuts */}
            <div>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth pb-1.5 px-0.5 text-xs">
                <span className="text-slate-400 dark:text-slate-500 font-medium text-[11px] shrink-0 mr-1">Palawan:</span>
                {[
                  { label: 'All Palawan', query: '' },
                  { label: 'Puerto Princesa', query: 'Puerto Princesa' },
                  { label: 'El Nido', query: 'El Nido' },
                  { label: 'Coron', query: 'Coron' },
                  { label: 'San Vicente', query: 'San Vicente' },
                  { label: 'Taytay', query: 'Taytay' },
                  { label: 'Narra & South', query: 'Narra' },
                  { label: 'Remote / WFH', query: 'Remote' }
                ].map(loc => {
                  const isSelected = locationQuery.toLowerCase() === loc.query.toLowerCase();
                  return (
                    <button
                      key={loc.label}
                      type="button"
                      onClick={() => setLocationQuery(loc.query)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[36px] shrink-0 ${
                        isSelected
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800 shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {loc.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Filter Buttons (Workplace, Type, Salary) */}
            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Mga Parameter sa Trabaho:</span>
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
                    className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold cursor-pointer inline-flex items-center gap-1 self-start sm:self-auto py-0.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>I-reset ang mga filter</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                {/* Workplace Policy */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto no-scrollbar border border-transparent dark:border-slate-700/60 max-w-full">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 px-1 font-medium hidden xs:inline">Setup:</span>
                  {['all', 'Remote', 'Hybrid', 'Onsite'].map(policy => (
                    <button
                      key={policy}
                      type="button"
                      onClick={() => setSelectedWorkplace(policy)}
                      className={`px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all cursor-pointer min-h-[34px] ${
                        selectedWorkplace === policy 
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold' 
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {policy === 'all' ? 'All Setup' : policy}
                    </button>
                  ))}
                </div>

                {/* Employment Type */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto no-scrollbar border border-transparent dark:border-slate-700/60 max-w-full">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 px-1 font-medium hidden xs:inline">Type:</span>
                  {['all', 'Full-time', 'Contract'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all cursor-pointer min-h-[34px] ${
                        selectedType === type 
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold' 
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {type === 'all' ? 'All Types' : type}
                    </button>
                  ))}
                </div>

                {/* Dedicated Salary Range Filter */}
                <SalaryRangeFilter
                  minSalary={minSalaryFilter}
                  onChangeMinSalary={setMinSalaryFilter}
                  matchingCount={filteredJobs.length}
                  totalCount={jobs.length}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Palawan Local News Section (Curated updates from palawan.gov.ph) */}
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

      {/* Two-Column Responsive Layout */}
      <div id="job-feed-results" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Job Cards List (Hidden on mobile when mobileDetailView is true) */}
        <div className={`space-y-3 ${mobileDetailView ? 'hidden lg:block lg:col-span-5' : 'block lg:col-span-5'}`}>
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
            <span>Mayroong <strong className="text-slate-800 tabular-nums">{filteredJobs.length}</strong> trabaho na tumutugma</span>
            <span>Sorted by newest</span>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map(idx => (
                <JobCardSkeleton key={idx} />
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3">
              <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Walang nakitang trabaho sa search na ito</p>
              <p className="text-xs text-slate-500">Subukang palawakin ang keywords o piliin ang "All Palawan".</p>
              <button
                type="button"
                onClick={() => {
                  setKeywordQuery('');
                  setLocationQuery('');
                  setSelectedWorkplace('all');
                  setSelectedType('all');
                  setMinSalaryFilter(0);
                }}
                className="inline-block mt-2 text-xs font-semibold text-emerald-700 hover:underline cursor-pointer min-h-[44px] flex items-center justify-center mx-auto"
              >
                I-reset ang filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map(job => {
                const isSelected = activeJob?.id === job.id;
                const isSaved = savedJobIds.includes(job.id);
                const hasApplied = applicants.some(a => a.jobId === job.id && a.email === candidateProfile.email);
                const isAnimatingSave = saveFeedback?.id === job.id;

                return (
                  <div
                    key={job.id}
                    onClick={() => handleSelectJobCard(job.id)}
                    className={`group p-4 bg-white dark:bg-slate-900 rounded-xl border transition-all duration-200 ease-out cursor-pointer relative transform will-change-transform ${
                      isSelected
                        ? 'border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-600/20 dark:ring-emerald-500/25 shadow-sm bg-emerald-50/20 dark:bg-emerald-950/20 -translate-y-0.5'
                        : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-slate-950/60'
                    } ${
                      isAnimatingSave && saveFeedback?.action === 'saved'
                        ? 'ring-2 ring-rose-400/50 shadow-md'
                        : ''
                    } active:translate-y-0 active:scale-[0.99]`}
                  >
                    {/* Floating Save / Removed Feedback Badge */}
                    {isAnimatingSave && (
                      <div
                        className={`absolute -top-2.5 right-12 z-20 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md pointer-events-none flex items-center gap-1 animate-save-sparkle ${
                          saveFeedback.action === 'saved'
                            ? 'bg-rose-600 text-white shadow-rose-500/30'
                            : 'bg-slate-800 dark:bg-slate-700 text-slate-100 shadow-slate-900/30'
                        }`}
                      >
                        {saveFeedback.action === 'saved' ? (
                          <>
                            <Heart className="w-2.5 h-2.5 fill-white text-white" />
                            <span>Nai-save!</span>
                          </>
                        ) : (
                          <span>Tinanggal</span>
                        )}
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        {job.urgency && (
                          <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mb-1 tracking-tight flex items-center gap-1">
                            <span>{job.urgency === 'Urgent' ? '⚡ Urgently Hiring' : job.urgency === 'Featured' ? '⭐ Featured Palawan Opportunity' : '✨ Bagong Bukas'}</span>
                          </div>
                        )}
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                          {job.company}
                        </p>
                      </div>

                      {/* Save Job Button with Ping Effect & Heart Pop */}
                      <div className="relative shrink-0">
                        {isAnimatingSave && saveFeedback.action === 'saved' && (
                          <span className="absolute inset-0 rounded-lg bg-rose-400/40 animate-ping pointer-events-none" />
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleToggleSaveJob(job.id, e)}
                          title={isSaved ? 'Remove from saved' : 'Save job'}
                          aria-label={isSaved ? 'Remove from saved' : 'Save job'}
                          className={`p-2 rounded-lg transition-all cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center relative z-10 ${
                            isSaved 
                              ? 'text-rose-500 hover:text-rose-600 bg-rose-50/80 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/60' 
                              : 'text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          } active:scale-90`}
                        >
                          <Heart
                            className={`w-4 h-4 transition-transform ${
                              isAnimatingSave && saveFeedback.action === 'saved'
                                ? 'animate-heart-pop fill-rose-500 text-rose-500'
                                : isSaved
                                ? 'fill-rose-500 text-rose-500 scale-105'
                                : 'hover:scale-115'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span>{job.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.workplaceType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.type}</span>
                    </div>

                    <div className="mt-2.5 text-xs font-semibold text-slate-900 dark:text-white font-mono tabular-nums">
                      {formatSalary(job.salaryMin, job.salaryMax, job.currency, job.salaryPeriod)}
                    </div>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                      <span>Posted {getDaysAgo(job.postedDate)}</span>
                      
                      <div className="flex items-center gap-2">
                        {hasApplied && (
                          <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Applied</span>
                          </span>
                        )}
                        <span className="lg:hidden text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                          <span>Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Job View (Shown on desktop always; on mobile shown when mobileDetailView is true) */}
        <div className={`${mobileDetailView ? 'block lg:block lg:col-span-7' : 'hidden lg:block lg:col-span-7'}`}>
          {isLoading ? (
            <JobDetailSkeleton />
          ) : activeJob ? (
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 lg:p-7 sticky top-20 shadow-xs space-y-6">
              {/* Mobile Back Button Bar */}
              <div className="lg:hidden pb-3 border-b border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMobileDetailView(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer min-h-[40px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Bumalik sa Listahan</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleSaveJob(activeJob.id)}
                  className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer min-h-[40px] transition-all relative ${
                    savedJobIds.includes(activeJob.id)
                      ? 'border-rose-200 dark:border-rose-800/80 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  } active:scale-95`}
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      saveFeedback?.id === activeJob.id && saveFeedback.action === 'saved'
                        ? 'animate-heart-pop fill-rose-500 text-rose-500'
                        : savedJobIds.includes(activeJob.id)
                        ? 'fill-rose-500 text-rose-500 scale-105'
                        : 'text-slate-400'
                    }`}
                  />
                  <span>{savedJobIds.includes(activeJob.id) ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* Header Box */}
              <div className="border-b border-slate-200 pb-5 sm:pb-6 space-y-4">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="text-xs font-medium text-slate-500">
                      {activeJob.department} · {activeJob.experienceLevel}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug">
                      {activeJob.title}
                    </h2>
                    <div className="text-sm sm:text-base font-semibold text-emerald-700">
                      {activeJob.company}
                    </div>
                  </div>

                  {activeJob.companyLogo ? (
                    <img
                      src={activeJob.companyLogo}
                      alt={activeJob.company}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-slate-200 object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center font-bold text-emerald-800 text-base sm:text-lg shrink-0">
                      {activeJob.company.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Metadata Strip */}
                <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
                  <span className="flex items-center gap-1 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeJob.location}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeJob.workplaceType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeJob.type}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-slate-900 font-semibold">
                    {formatSalary(activeJob.salaryMin, activeJob.salaryMax, activeJob.currency, activeJob.salaryPeriod)}
                  </span>
                </div>

                {/* Gabay Palaweño AI Copilot Banner */}
                <div className="bg-emerald-950 text-white rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-start sm:items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5 sm:mt-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-white block">Gabay Palaweño AI Assistant</span>
                      <span className="text-[11px] text-emerald-200/80 block">Tailored pitch, fit score & mock interview practice</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:items-center shrink-0">
                    <button
                      type="button"
                      onClick={() => openAiAssistant(activeJob, 'pitch')}
                      className="px-2.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[38px]"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Pitch</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openAiAssistant(activeJob, 'fit')}
                      className="px-2.5 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 font-semibold text-xs rounded-lg border border-emerald-700 transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[38px]"
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Fit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openAiAssistant(activeJob, 'interview')}
                      className="px-2.5 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 font-semibold text-xs rounded-lg border border-emerald-700 transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[38px]"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Mock</span>
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  {existingApplication ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                      <div className="flex-1 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 min-h-[44px]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Resume Submitted on {new Date(existingApplication.appliedAt).toLocaleDateString()}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSeekerTab('applications')}
                        className="px-3.5 py-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline cursor-pointer text-center min-h-[40px] flex items-center justify-center"
                      >
                        Subaybayan ang Application
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setApplyingForJob(activeJob)}
                        className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 hover:shadow-md cursor-pointer min-h-[44px]"
                      >
                        <span>Mag-apply Gamit ang Resume</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleSaveJob(activeJob.id)}
                        className={`sm:hidden px-3.5 py-2.5 border rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer min-h-[44px] shrink-0 active:scale-95 ${
                          savedJobIds.includes(activeJob.id)
                            ? 'border-rose-200 dark:border-rose-800/80 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 transition-transform ${
                            saveFeedback?.id === activeJob.id && saveFeedback.action === 'saved'
                              ? 'animate-heart-pop fill-rose-500 text-rose-500'
                              : savedJobIds.includes(activeJob.id)
                              ? 'fill-rose-500 text-rose-500 scale-105'
                              : 'text-slate-400'
                          }`}
                        />
                        <span>{savedJobIds.includes(activeJob.id) ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleToggleSaveJob(activeJob.id)}
                    className={`hidden sm:flex px-4 py-2.5 border rounded-lg transition-all items-center justify-center gap-2 text-xs sm:text-sm font-medium cursor-pointer min-h-[44px] active:scale-95 ${
                      savedJobIds.includes(activeJob.id)
                        ? 'border-rose-200 dark:border-rose-800/80 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        saveFeedback?.id === activeJob.id && saveFeedback.action === 'saved'
                          ? 'animate-heart-pop fill-rose-500 text-rose-500'
                          : savedJobIds.includes(activeJob.id)
                          ? 'fill-rose-500 text-rose-500 scale-105'
                          : 'text-slate-400'
                      }`}
                    />
                    <span>{savedJobIds.includes(activeJob.id) ? 'Nai-save Na' : 'I-save ang Trabaho'}</span>
                  </button>
                </div>
              </div>

              {/* Main Body Description */}
              <div className="space-y-5 sm:space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                    Tungkol sa Trabaho (About the Opportunity)
                  </h4>
                  <p>{activeJob.description}</p>
                </div>

                {activeJob.responsibilities && activeJob.responsibilities.length > 0 && (
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                      Pangunahing Responsibilidad (Key Responsibilities)
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-600 marker:text-slate-400">
                      {activeJob.responsibilities.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeJob.qualifications && activeJob.qualifications.length > 0 && (
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                      Kwalipikasyon at Karanasan (Qualifications)
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-600 marker:text-slate-400">
                      {activeJob.qualifications.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeJob.benefits && activeJob.benefits.length > 0 && (
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                      Benepisyo at Palawan Perks
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-600 marker:text-slate-400">
                      {activeJob.benefits.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                    Kasanayang Hinahanap (Relevant Skills)
                  </h4>
                  <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono">
                    {activeJob.skills.map((skill, idx) => (
                      <React.Fragment key={skill}>
                        <span className="font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{skill}</span>
                        {idx < activeJob.skills.length - 1 && <span aria-hidden="true" className="text-slate-400">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {activeJob.screeningQuestions && activeJob.screeningQuestions.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-600 space-y-1">
                    <span className="font-semibold text-slate-800 block">Employer Screening Notice</span>
                    <span>Hinihingi ng employer ang pagsagot sa {activeJob.screeningQuestions.length} maikling katanungan sa oras ng application.</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
              Pumili ng trabaho sa kaliwa upang makita ang kumpletong detalye.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
