import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PalawanNewsCategory, PalawanNewsItem } from '../../types';
import { NewsCardSkeleton } from '../common/Skeletons';
import { 
  Landmark, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Briefcase, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  Search,
  Zap,
  Building2,
  Share2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Newspaper
} from 'lucide-react';

export const PalawanLocalNewsView: React.FC = () => {
  const { 
    newsItems, 
    bookmarkedNewsIds, 
    toggleBookmarkNews, 
    setActiveNewsDetail,
    navigateToJobSearchWithKeyword,
    setSeekerTab
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlySaved, setOnlySaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 480);
    return () => clearTimeout(timer);
  }, []);

  const municipalities = [
    { label: 'Buong Palawan', value: 'all' },
    { label: 'Puerto Princesa City', value: 'Puerto Princesa' },
    { label: 'Coron & Calamianes', value: 'Coron' },
    { label: 'San Vicente', value: 'San Vicente' },
    { label: 'El Nido', value: 'El Nido' },
    { label: 'Bataraza & Narra', value: 'Narra' },
    { label: 'Cuyo & Island Groups', value: 'Cuyo' }
  ];

  const categories: { label: string; value: string }[] = [
    { label: 'Lahat ng Balita', value: 'all' },
    { label: 'Infrastructure & Energy', value: 'Infrastructure & Energy' },
    { label: 'Economic Development', value: 'Economic Development' },
    { label: 'Tourism & Hospitality', value: 'Tourism & Hospitality' },
    { label: 'Agriculture & Fisheries', value: 'Agriculture & Fisheries' },
    { label: 'Employment & Skills (PESO)', value: 'Employment & Skills' }
  ];

  const filteredNews = useMemo(() => {
    return newsItems.filter(item => {
      if (onlySaved && !bookmarkedNewsIds.includes(item.id)) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedMunicipality !== 'all') {
        const munLower = selectedMunicipality.toLowerCase();
        if (!item.municipality.toLowerCase().includes(munLower)) return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchTagalog = item.headlineTagalog && item.headlineTagalog.toLowerCase().includes(query);
        const matchSnippet = item.snippet.toLowerCase().includes(query);
        const matchMun = item.municipality.toLowerCase().includes(query);
        const matchKeywords = item.relatedSearchKeywords.some(k => k.toLowerCase().includes(query));
        if (!matchTitle && !matchTagalog && !matchSnippet && !matchMun && !matchKeywords) {
          return false;
        }
      }
      return true;
    });
  }, [newsItems, selectedCategory, selectedMunicipality, searchQuery, onlySaved, bookmarkedNewsIds]);

  const handleShare = (item: PalawanNewsItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${item.title} - Palawan Provincial Government (${item.sourceUrl})`);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Hero Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Palawan Provincial Government Official Gazette</span>
              </span>
              <span>·</span>
              <a 
                href="https://palawan.gov.ph" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>palawan.gov.ph</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Palawan Local News & Economic Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Curated official updates sa mga bagong proyektong pang-imprastraktura, pagsulong ng ekonomiya, at mga employment initiatives mula sa Kapitolyo ng Lalawigan ng Palawan para sa mga naghahanap ng trabaho.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSeekerTab('jobs')}
              className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs min-h-[40px]"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Maghanap ng Trabaho</span>
            </button>
          </div>
        </div>

        {/* Provincial Economic Key Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-800/60">
            <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Infrastructure Pipeline</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              ₱12.6B Active Budget
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              Solar microgrids, RoRo ports, causeways, and water grids
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Private Sector Influx</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              ₱8.3B TEZ Investments
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              San Vicente eco-resorts & Southern agro-industrial park
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>LGU & PESO Livelihood</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              2,500+ Target Matches
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              "Trabaho sa Isla" caravans & free TESDA vouchers
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="pt-2 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Maghanap sa balita (Solar, Port, El Nido, PESO, Highway)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all min-h-[42px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-bold p-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Saved filter toggle */}
            <div className="md:col-span-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOnlySaved(prev => !prev)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px] border ${
                  onlySaved 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs font-bold' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-white' : ''}`} />
                <span>Nai-save na Bulletins ({bookmarkedNewsIds.length})</span>
              </button>
            </div>
          </div>

          {/* Municipality Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth pb-1 text-xs -mx-4 px-4 sm:mx-0 sm:px-0">
            <span className="text-slate-400 dark:text-slate-500 font-medium text-[11px] shrink-0 mr-1">Munisipalidad:</span>
            {municipalities.map(mun => (
              <button
                key={mun.value}
                type="button"
                onClick={() => setSelectedMunicipality(mun.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer min-h-[34px] shrink-0 ${
                  selectedMunicipality === mun.value
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {mun.label}
              </button>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map(cat => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[34px] shrink-0 ${
                  selectedCategory === cat.value && !onlySaved
                    ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-medium flex-wrap gap-2">
        <span>
          Mayroong <strong className="text-slate-800 dark:text-slate-200 tabular-nums">{filteredNews.length}</strong> balita mula sa Palawan Provincial Government
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedMunicipality !== 'all' || onlySaved) && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedMunicipality('all');
              setOnlySaved(false);
            }}
            className="text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer font-semibold"
          >
            I-reset lahat ng filter
          </button>
        )}
      </div>

      {/* News Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map(idx => (
            <NewsCardSkeleton key={idx} />
          ))}
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-3 shadow-xs">
          <Newspaper className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Walang nakitang balita</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Subukang baguhin ang search keyword o alisin ang munisipalidad filter para makita ang iba pang balita sa Palawan.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedMunicipality('all');
              setOnlySaved(false);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Ipakita ang Lahat ng Balita
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredNews.map(item => {
            const isBookmarked = bookmarkedNewsIds.includes(item.id);

            return (
              <article
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600/60 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Metadata Header */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5 truncate min-w-0">
                      <span className="font-bold text-emerald-800 dark:text-emerald-400 truncate">{item.category}</span>
                      <span className="shrink-0">·</span>
                      <span className="shrink-0">{item.publishedDate}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleBookmarkNews(item.id)}
                        className="p-1.5 text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                        title={isBookmarked ? 'Naka-save na balita' : 'I-save ang balita'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShare(item)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                        title="I-share ang balita"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Tagalog translation */}
                  <div>
                    <h2 
                      onClick={() => setActiveNewsDetail(item)}
                      className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer break-words"
                    >
                      {item.title}
                    </h2>
                    {item.headlineTagalog && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 italic font-medium leading-relaxed">
                        "{item.headlineTagalog}"
                      </p>
                    )}
                  </div>

                  {/* Municipality & Department */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.municipality}</span>
                    </span>
                    <span>·</span>
                    <span className="text-slate-400 dark:text-slate-500 truncate">
                      {item.sourceDepartment}
                    </span>
                  </div>

                  {/* Curated Snippet Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.snippet}
                  </p>

                  {/* Economic Milestone Box */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Economic Milestone & Scope</span>
                    </div>
                    <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                      {item.economicImpact}
                    </p>
                  </div>

                  {/* Career & Hiring Implications Banner */}
                  <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-800/60 space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                        <span>Implikasyon sa Trabaho</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-white/90 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-700">
                        {item.jobMarketImplications.estimatedJobs}
                      </span>
                    </div>

                    <p className="text-xs text-emerald-950 dark:text-emerald-100 font-medium leading-relaxed">
                      {item.jobMarketImplications.actionableAdvice}
                    </p>

                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {item.jobMarketImplications.demandSectors.map((sector, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => navigateToJobSearchWithKeyword(sector)}
                          className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs min-h-[30px]"
                        >
                          {sector}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions - Responsive mobile layout */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium flex items-center justify-center sm:justify-start gap-1 hover:underline py-1"
                  >
                    <span>Opisyal na Link (palawan.gov.ph)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-2 flex-col sm:flex-row w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setActiveNewsDetail(item)}
                      className="w-full sm:w-auto px-3.5 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg font-semibold transition-colors cursor-pointer min-h-[36px] text-center"
                    >
                      Basahin ang Buong Bulletin
                    </button>

                    {item.relatedSearchKeywords.length > 0 && (
                      <button
                        type="button"
                        onClick={() => navigateToJobSearchWithKeyword(item.relatedSearchKeywords[0])}
                        className="w-full sm:w-auto px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs min-h-[36px]"
                      >
                        <Briefcase className="w-3 h-3 shrink-0" />
                        <span>Maghanap ng Trabaho</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Official Information Disclosure */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            Ang mga ulat at impormasyon ay hango sa mga opisyal na press release, Sangguniang Panlalawigan resolutions, at executive announcements ng <strong>Pamahalaang Panlalawigan ng Palawan</strong> (palawan.gov.ph).
          </span>
        </div>
        <a
          href="https://palawan.gov.ph"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-bold whitespace-nowrap hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Bumisita sa palawan.gov.ph</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
