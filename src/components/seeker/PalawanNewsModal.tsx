import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Briefcase, 
  Building2, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Landmark, 
  CheckCircle2, 
  Share2,
  Zap,
  ArrowRight
} from 'lucide-react';

export const PalawanNewsModal: React.FC = () => {
  const { 
    activeNewsDetail, 
    setActiveNewsDetail, 
    bookmarkedNewsIds, 
    toggleBookmarkNews,
    navigateToJobSearchWithKeyword
  } = useApp();

  if (!activeNewsDetail) return null;

  const isBookmarked = bookmarkedNewsIds.includes(activeNewsDetail.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${activeNewsDetail.title} - Palawan Provincial Government (${activeNewsDetail.sourceUrl})`);
    }
  };

  const handleSearchJobs = (keyword: string) => {
    setActiveNewsDetail(null);
    navigateToJobSearchWithKeyword(keyword);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl my-auto overflow-hidden flex flex-col max-h-[92vh] transition-colors"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-3.5 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 bg-slate-50/80 dark:bg-slate-900/90">
          <div className="min-w-0 flex-1">
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 shrink-0" />
                <span>{activeNewsDetail.source}</span>
              </span>
              <span>·</span>
              <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{activeNewsDetail.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{activeNewsDetail.publishedDate}</span>
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-snug break-words">
              {activeNewsDetail.title}
            </h2>
            {activeNewsDetail.headlineTagalog && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 italic font-medium leading-relaxed">
                "{activeNewsDetail.headlineTagalog}"
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0 -mr-1 sm:mr-0">
            <button
              type="button"
              onClick={() => toggleBookmarkNews(activeNewsDetail.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center ${
                isBookmarked 
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60' 
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Nai-save na balita' : 'I-save ang balita'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title="Kopyahin ang link ng balita"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setActiveNewsDetail(null)}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title="Isara"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 flex-1 text-sm text-slate-700 dark:text-slate-300">
          {/* Official Provincial Source Bar */}
          <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
              <span className="font-semibold text-emerald-950 dark:text-emerald-200">
                Opisyal na Bulletin: {activeNewsDetail.sourceDepartment}
              </span>
            </div>
            <a
              href={activeNewsDetail.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>palawan.gov.ph</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Curated Summary Snippet */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Buod ng Balita</h3>
            <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
              {activeNewsDetail.snippet}
            </p>
          </div>

          {/* Key Infrastructure & Economic Scope */}
          <div className="p-3.5 bg-slate-900 dark:bg-slate-950 text-white rounded-xl space-y-1.5 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Economic & Infrastructure Milestone</span>
            </div>
            <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">
              {activeNewsDetail.economicImpact}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1.5 border-t border-slate-800">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>Sakop na Munisipalidad: <strong className="text-white">{activeNewsDetail.municipality}</strong></span>
            </div>
          </div>

          {/* Official Full Briefing Points */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Detalye ng Proyekto mula sa Pamahalaang Panlalawigan
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {activeNewsDetail.fullBriefing.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Seeker Career & Hiring Implications */}
          <div className="p-3.5 sm:p-4 bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <span>Epekto sa Trabaho & Demand sa Palawan</span>
              </div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-white/90 dark:bg-emerald-900/60 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-700">
                {activeNewsDetail.jobMarketImplications.estimatedJobs}
              </span>
            </div>

            <div className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
              {activeNewsDetail.jobMarketImplications.actionableAdvice}
            </div>

            <div>
              <div className="text-[11px] font-semibold text-emerald-900 dark:text-emerald-300 mb-1.5">
                Mga Kasanayan at Trabahong Nangangailangan ng Tauhan:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeNewsDetail.jobMarketImplications.demandSectors.map((sector, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSearchJobs(sector)}
                    className="px-2.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-2xs min-h-[32px]"
                  >
                    <span>{sector}</span>
                    <ArrowRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer - Mobile responsive button stack */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <a
            href={activeNewsDetail.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center sm:justify-start gap-1 font-medium hover:underline py-1"
          >
            <span>Tingnan sa palawan.gov.ph</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2 flex-col sm:flex-row w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveNewsDetail(null)}
              className="w-full sm:w-auto px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer min-h-[38px] text-center"
            >
              Isara
            </button>

            <button
              type="button"
              onClick={() => handleSearchJobs(activeNewsDetail.relatedSearchKeywords[0] || 'Palawan')}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer min-h-[38px] flex items-center justify-center gap-1.5 shadow-2xs text-center"
            >
              <Briefcase className="w-3.5 h-3.5 shrink-0" />
              <span>Maghanap ng Katugmang Trabaho</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
