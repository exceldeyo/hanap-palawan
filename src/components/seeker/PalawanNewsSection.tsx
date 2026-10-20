import React, { useState, useMemo } from 'react';
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
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  Search,
  Sparkles,
  Newspaper,
  Compass,
  CheckCircle2,
  X
} from 'lucide-react';

interface PalawanNewsSectionProps {
  onSearchKeyword?: (kw: string) => void;
}

export const PalawanNewsSection: React.FC<PalawanNewsSectionProps> = ({ onSearchKeyword }) => {
  const { 
    newsItems, 
    bookmarkedNewsIds, 
    toggleBookmarkNews, 
    setActiveNewsDetail,
    setSeekerTab,
    navigateToJobSearchWithKeyword
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newsSearchQuery, setNewsSearchQuery] = useState<string>('');
  const [isSectionCollapsed, setIsSectionCollapsed] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleCollapse = () => {
    if (isSectionCollapsed) {
      setIsLoading(true);
      setIsSectionCollapsed(false);
      setTimeout(() => setIsLoading(false), 450);
    } else {
      setIsSectionCollapsed(true);
    }
  };

  const handleSelectCategory = (catVal: string) => {
    if (catVal === selectedCategory) return;
    setIsLoading(true);
    setSelectedCategory(catVal);
    setTimeout(() => setIsLoading(false), 380);
  };

  const categories: { label: string; value: string }[] = [
    { label: 'Lahat', value: 'all' },
    { label: 'Infrastructure & Energy', value: 'Infrastructure & Energy' },
    { label: 'Economic Development', value: 'Economic Development' },
    { label: 'Tourism & Hospitality', value: 'Tourism & Hospitality' },
    { label: 'Agri & Fisheries', value: 'Agriculture & Fisheries' },
    { label: 'PESO & Skills', value: 'Employment & Skills' }
  ];

  const filteredNews = useMemo(() => {
    return newsItems.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = newsSearchQuery.trim().toLowerCase();
      const matchSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        (item.headlineTagalog && item.headlineTagalog.toLowerCase().includes(query)) ||
        item.municipality.toLowerCase().includes(query) ||
        item.snippet.toLowerCase().includes(query) ||
        item.relatedSearchKeywords.some(kw => kw.toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });
  }, [newsItems, selectedCategory, newsSearchQuery]);

  const handleFilterJob = (keyword: string) => {
    if (onSearchKeyword) {
      onSearchKeyword(keyword);
    } else {
      navigateToJobSearchWithKeyword(keyword);
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-all">
      {/* Collapsible Header Bar */}
      <div 
        onClick={handleToggleCollapse}
        className="p-3.5 sm:p-5 bg-slate-50/80 dark:bg-slate-900/90 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer select-none border-b border-transparent data-[expanded=true]:border-slate-200/80 dark:data-[expanded=true]:border-slate-800"
        data-expanded={!isSectionCollapsed}
      >
        <div className="flex items-start sm:items-center justify-between gap-3">
          {/* Left: Icon & Title info */}
          <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5 sm:mt-0">
              <Landmark className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-100" />
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Palawan Local News
                </h2>
                <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950 px-2 py-0.5 rounded-md dark:border dark:border-emerald-800 shrink-0">
                  palawan.gov.ph Curated
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium shrink-0">
                  ({newsItems.length} updates)
                </span>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 sm:line-clamp-2 leading-relaxed">
                Economic milestones, infrastructure projects, at job trends mula sa Pamahalaang Panlalawigan ng Palawan
              </p>
            </div>
          </div>

          {/* Right: Expand/Collapse indicator */}
          <div className="flex items-center gap-2 shrink-0 pt-0.5 sm:pt-0">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden md:inline">
              {isSectionCollapsed ? 'I-click upang buksan' : 'I-click upang isara'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-200/60 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {isSectionCollapsed ? (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
          </div>
        </div>

        {/* Filter controls & Search (visible only when expanded) */}
        {!isSectionCollapsed && (
          <div 
            className="mt-3.5 pt-3 border-t border-slate-200/70 dark:border-slate-800 space-y-2.5 sm:space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
              {/* Category Segmented Buttons - Touch scrollable on mobile */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth pb-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleSelectCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[34px] flex items-center justify-center shrink-0 ${
                      selectedCategory === cat.value
                        ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                        : 'bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Quick News Search Input */}
              <div className="relative w-full md:w-64 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={newsSearchQuery}
                  onChange={e => setNewsSearchQuery(e.target.value)}
                  placeholder="Hanapin sa balita (Solar, Port, El Nido)..."
                  className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 min-h-[38px]"
                />
                {newsSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setNewsSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* News Content (visible only when expanded) */}
      {!isSectionCollapsed && (
        <div className="p-3.5 sm:p-5 space-y-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {[1, 2, 3].map(i => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400 space-y-2">
              <Newspaper className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Walang nahanap na balita sa napiling kategorya</p>
              <button
                type="button"
                onClick={() => { setSelectedCategory('all'); setNewsSearchQuery(''); }}
                className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                I-reset ang filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {filteredNews.slice(0, visibleCount).map(item => {
                const isBookmarked = bookmarkedNewsIds.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    className="bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 hover:border-emerald-300 dark:hover:border-emerald-600/60 rounded-xl p-3.5 sm:p-4 transition-all flex flex-col justify-between group shadow-2xs"
                  >
                    <div className="space-y-2.5">
                      {/* Metadata Header */}
                      <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <div className="flex items-center gap-1.5 truncate min-w-0">
                          <span className="font-semibold text-emerald-800 dark:text-emerald-400 truncate">{item.category}</span>
                          <span className="shrink-0">·</span>
                          <span className="text-slate-500 dark:text-slate-400 truncate shrink-0">{item.relativeTime}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleBookmarkNews(item.id)}
                          className="text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 p-1.5 -mr-1 cursor-pointer shrink-0 transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                          title={isBookmarked ? 'Naka-save na' : 'I-save'}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => setActiveNewsDetail(item)}
                        className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors cursor-pointer break-words"
                      >
                        {item.title}
                      </h3>

                      {/* Location snippet */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.municipality}</span>
                      </div>

                      {/* Curated Snippet */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {item.snippet}
                      </p>

                      {/* Economic/Infrastructure Project Indicator */}
                      <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>Economic Milestone</span>
                        </div>
                        <p className="text-[11px] text-slate-800 dark:text-slate-200 font-medium line-clamp-2 leading-relaxed">
                          {item.economicImpact}
                        </p>
                      </div>

                      {/* Career / Job Market Implication Snippet */}
                      <div className="text-[11px] text-emerald-950 dark:text-emerald-100 bg-emerald-50/80 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-800/60 flex items-start gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
                            {item.jobMarketImplications.estimatedJobs}
                          </span>
                          <span className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed block mt-0.5">
                            Nangangailangan ng: <strong className="font-semibold text-slate-800 dark:text-slate-200">{item.jobMarketImplications.demandSectors.slice(0, 2).join(', ')}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions - Responsive mobile-first layout */}
                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setActiveNewsDetail(item)}
                        className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-bold hover:underline flex items-center gap-1 cursor-pointer py-1 shrink-0"
                      >
                        <span>Basahin ang Buod</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {item.relatedSearchKeywords.length > 0 && (
                        <button
                          type="button"
                          onClick={() => handleFilterJob(item.relatedSearchKeywords[0])}
                          title={`Maghanap ng trabaho: ${item.relatedSearchKeywords[0]}`}
                          className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs min-w-0 max-w-[55%] sm:max-w-none"
                        >
                          <Briefcase className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="truncate">Hanapin: {item.relatedSearchKeywords[0]}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer view controls */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
              <span>Pinagkunan: <strong>Palawan Provincial Information Office</strong> · palawan.gov.ph</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end flex-wrap">
              {filteredNews.length > visibleCount && (
                <button
                  type="button"
                  onClick={() => setVisibleCount(prev => Math.min(prev + 3, filteredNews.length))}
                  className="w-full sm:w-auto px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer min-h-[36px]"
                >
                  Ipakita ang iba pa ({filteredNews.length - visibleCount})
                </button>
              )}

              <button
                type="button"
                onClick={() => setSeekerTab('news')}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer min-h-[36px] flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Buksan ang News Hub</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
