import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  Briefcase, 
  Building2, 
  Sparkles, 
  MapPin, 
  Mail, 
  FileText, 
  X, 
  HelpCircle, 
  Lock, 
  Wifi, 
  Users,
  Award,
  ExternalLink
} from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'seeker' | 'employer' | 'security' | 'island';
  categoryLabel: string;
  question: string;
  questionTagalog: string;
  answer: React.ReactNode;
  tags: string[];
}

export const HelpCenterFAQSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'seeker' | 'employer' | 'security'>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(['verify-job', 'update-profile']) // Default expand two key requested FAQs
  );

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setExpandedIds(new Set(faqList.map(item => item.id)));
  };

  const handleCollapseAll = () => {
    setExpandedIds(new Set());
  };

  const faqList: FAQItem[] = useMemo(() => [
    {
      id: 'verify-job',
      category: 'security',
      categoryLabel: 'Verification & Safety',
      question: 'How to verify a job listing? (Paano i-verify kung lehitimo ang job listing?)',
      questionTagalog: 'Paano malalaman kung lehitimo at verified ang isang trabaho sa Palawan?',
      tags: ['verify', 'legit', 'fake', 'scam', 'dole', 'peso', 'badge', 'employer', 'safety'],
      answer: (
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Upang protektahan ang bawat Palaweño laban sa mga ilegal na rekruter at scam, ipinapatupad ng 
            <strong> Hanap Palawan</strong> ang mahigpit na multi-layer verification process bago itanghal ang mga trabaho:
          </p>
          <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
              <div>
                <strong className="text-slate-800 dark:text-slate-200">Tingnan ang "Verified Palawan Employer" Badge:</strong>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  May katabing berdeng checkmark badge ang lahat ng establisimyentong nagsumite ng valid Mayor's Business Permit at DTI/SEC registration sa lalawigan.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
              <div>
                <strong className="text-slate-800 dark:text-slate-200">DOLE MIMAROPA & PESO Alignment:</strong>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Ang lahat ng pasahod ay sumusunod sa minimum wage order ng MIMAROPA Region. Ang mga bakanteng posisyon mula sa Public Employment Service Office (PESO) ay may tatak na opisyal na ahensya.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
              <div>
                <strong className="text-slate-800 dark:text-slate-200">Walang Placement o Processing Fee:</strong>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Ipinagbabawal ang paniningil sa aplikante. Kung may mag-message sa inyo na humihingi ng pera para sa ID o medical bago ang interbyu, agad itong i-report sa <span className="text-emerald-600 dark:text-emerald-400 font-medium">support@hanappalawan.ph</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'update-profile',
      category: 'seeker',
      categoryLabel: 'Job Seeker',
      question: 'How to update my profile or resume? (Paano i-update ang profile o resume?)',
      questionTagalog: 'Paano mag-edit ng personal na impormasyon, kakayahan, at lokasyon sa Palawan?',
      tags: ['profile', 'resume', 'cv', 'edit', 'update', 'contact', 'skills', 'experience', 'location'],
      answer: (
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Ang iyong Profile ang nagsisilbing digital resume kapag nagpapasa ng aplikasyon sa mga kumpanya at resort sa buong Palawan. Sundin ang mga simpleng hakbang na ito:
          </p>
          <ol className="list-decimal list-inside space-y-1.5 pl-1 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <li>
              Pindutin ang <strong>"Aking Profile"</strong> tab sa itaas na navigation bar (o sa mobile drawer menu).
            </li>
            <li>
              I-click ang <strong>"I-edit ang Profile"</strong> button sa kanang bahagi ng profile card.
            </li>
            <li>
              Maaari mong baguhin ang:
              <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5 text-slate-500 dark:text-slate-400">
                <li><strong>Personal info:</strong> Buong pangalan, active contact number, at email</li>
                <li><strong>Lokasyon sa Palawan:</strong> Hal. Puerto Princesa, El Nido, Coron, San Vicente, Roxas, o Taytay</li>
                <li><strong>Headline & Skills:</strong> Hal. <em>Front Desk Associate, Tour Boat Guide, Line Cook, IT Support</em></li>
                <li><strong>Work Experience & Education:</strong> Nakaraang mga trabaho at kurso</li>
              </ul>
            </li>
            <li>
              I-click ang <strong>"I-save ang Pagbabago"</strong>. Agad na makikita ng mga employer ang pinakabago mong impormasyon sa susunod mong pag-apply.
            </li>
          </ol>
        </div>
      )
    },
    {
      id: 'apply-job',
      category: 'seeker',
      categoryLabel: 'Job Seeker',
      question: 'How to apply for jobs and use the AI Cover Note generator?',
      questionTagalog: 'Paano magpasa ng aplikasyon at gamitin ang Gabay Palaweño AI?',
      tags: ['apply', 'application', 'ai', 'cover note', 'letter', 'gabay', 'interview'],
      answer: (
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Mabilis at walang abala ang pag-apply sa Hanap Palawan:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Pumili ng trabaho sa <strong>Job Search Feed</strong> at pindutin ang <strong>"Mag-apply Ngayon"</strong>.</li>
            <li>Kusa nang ilalagay ng sistema ang detalye mula sa iyong profile.</li>
            <li>
              <strong>AI Cover Note:</strong> Pindutin ang button na may icon ng <Sparkles className="w-3.5 h-3.5 text-emerald-600 inline" /> <em>"Gabay Palaweño AI"</em> upang kusa itong sumulat ng magalang, pormal, at angkop na application letter base sa iyong karanasan at requirements ng kumpanya.
            </li>
            <li>I-review ang mensahe at pindutin ang <strong>"Isumite ang Aplikasyon"</strong>. Masusubaybayan mo ang status sa <strong>"Aking Aplikasyon"</strong>.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'employer-post',
      category: 'employer',
      categoryLabel: 'Employer & Business',
      question: 'How do employers post a job and screen candidates? (Paano mag-post ng trabaho?)',
      questionTagalog: 'Paano maglathala ng bakanteng posisyon at sumuri ng mga aplikante ang mga negosyo sa Palawan?',
      tags: ['employer', 'post job', 'hiring', 'recruitment', 'pipeline', 'screen', 'candidates'],
      answer: (
        <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Dinisenyo ang plataporma upang mabilis na maikonekta ang mga lokal na negosyo sa mga kwalipikadong Palaweño:
          </p>
          <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <p><strong>1. Lumipat sa Employer View:</strong> I-click ang switch sa header na <em>"Lumipat sa Employer"</em>.</p>
            <p><strong>2. Mag-post ng Trabaho:</strong> Pindutin ang <em>"Mag-post ng Bagong Trabaho"</em>. Ilagay ang Job Title, Munisipyo, Uri ng Trabaho (Full-time, Part-time, Seasonal para sa Peak Season), at Perks (hal. Staff Housing sa El Nido/Coron, libreng meals, o transport allowance).</p>
            <p><strong>3. Pamahalaan sa Hiring Pipeline:</strong> Sa <em>"Hiring Pipeline"</em> tab, makikita mo ang mga aplikante. Gamitin ang automated <strong>AI Candidate Dossier</strong> upang mabilis na masuri ang lakas, karanasan, at mga mairerekomendang tanong sa interbyu.</p>
          </div>
        </div>
      )
    },
    {
      id: 'employer-verification',
      category: 'employer',
      categoryLabel: 'Employer & Business',
      question: 'How can a business get the "Verified Palawan Employer" badge?',
      questionTagalog: 'Paano makakakuha ng opisyal na Verified Badge ang isang Palawan hotel, resort, o kumpanya?',
      tags: ['verify employer', 'badge', 'permit', 'legitimacy', 'peso accreditation', 'hotel', 'resort'],
      answer: (
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Ang <strong>Verified Employer Badge</strong> ay nagbibigay ng mataas na tiwala sa mga aplikante at nagpapataas ng bilang ng kwalipikadong resumes na matatanggap ninyo:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Ihanda ang inyong Mayor's Business Permit sa inyong munisipyo (hal. Puerto Princesa, El Nido, Coron, San Vicente).</li>
            <li>Isumite ang inyong business info at Tax Identification Number (TIN) sa verification desk sa Employer portal.</li>
            <li>Sinusuri ito ng aming verification officers kasama ang PESO coordinator sa loob ng 24–48 oras ng araw ng trabaho.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'island-signal',
      category: 'security',
      categoryLabel: 'Island Access & Connectivity',
      question: 'What if internet or cell signal is slow in island municipalities (Coron, Cuyo, San Vicente)?',
      questionTagalog: 'Paano kung mahina ang signal o walang wifi sa malalayong isla o munisipyo sa Palawan?',
      tags: ['signal', 'internet', 'offline', 'low bandwidth', 'island', 'coron', 'cuyo', 'san vicente', 'save'],
      answer: (
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Batid namin ang hamon sa telekomunikasyon sa iba't ibang kapuluan ng Palawan. May mga built-in features ang plataporma para dito:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><strong>Data-Light Architecture:</strong> Hindi gumagamit ang site ng mabibigat na video ads o mabagal na external scripts.</li>
            <li><strong>Offline Bookmark:</strong> I-click ang bookmark icon habang may signal sa bayan; naka-cache ang mga detalye ng trabaho upang mabasa pa rin kahit mawalan ng koneksyon sa biyahe.</li>
            <li><strong>Smart Draft Recovery:</strong> Kapag nag-type ka ng aplikasyon at biglang nawala ang signal, pansamantalang itinatago ito sa browser memory para hindi masayang ang iyong sinulat.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy-data',
      category: 'security',
      categoryLabel: 'Data Privacy & Security',
      question: 'Is my personal contact information safe from spammers and third parties?',
      questionTagalog: 'Ligtas ba ang aking numero ng telepono at email address sa ilalim ng Data Privacy?',
      tags: ['privacy', 'dpa', 'security', 'contact', 'spam', 'safe', 'confidential'],
      answer: (
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Opo. mahigpit kaming sumusunod sa <strong>Republic Act No. 10173 (Data Privacy Act of 2012)</strong> ng Pilipinas:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Ang inyong numero ng telepono at email ay ibinabahagi <em>lamang</em> sa kumpanya kung saan kayo mismong nagsumite ng aplikasyon.</li>
            <li>Hindi ibinebenta, ipinaparenta, o ipinapamahagi ang inyong impormasyon sa mga advertising networks o lending apps.</li>
            <li>Maaari mong hilingin ang permanenteng pagbura (Data Deletion) ng iyong buong account at mga rekord anumang oras.</li>
          </ul>
        </div>
      )
    }
  ], []);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return faqList.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const qLower = searchQuery.toLowerCase();
      const matchQuestion = item.question.toLowerCase().includes(qLower);
      const matchQuestionTL = item.questionTagalog.toLowerCase().includes(qLower);
      const matchTags = item.tags.some(tag => tag.toLowerCase().includes(qLower));

      return matchQuestion || matchQuestionTL || matchTags;
    });
  }, [faqList, selectedCategory, searchQuery]);

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Help Center & FAQ Hub</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mga kasagutan sa madalas na katanungan ng mga Palaweño job seekers at lokal na employers.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExpandAll}
            className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 cursor-pointer"
          >
            Ibukadkad Lahat
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:underline px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            Itupi Lahat
          </button>
        </div>
      </div>

      {/* Search Input & Category Filters */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Maghanap ng tanong (hal. verify, profile, resume, employer, signal)..."
            className="w-full pl-9 pr-9 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="I-clear ang search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Filter Categories */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Lahat ({faqList.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('seeker')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors inline-flex items-center gap-1 ${
              selectedCategory === 'seeker'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            <span>Job Seekers</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('employer')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors inline-flex items-center gap-1 ${
              selectedCategory === 'employer'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>Employers & Negosyo</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('security')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors inline-flex items-center gap-1 ${
              selectedCategory === 'security'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Verification & Safety</span>
          </button>
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-2.5 pt-1">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-4">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Walang nahanap na tugma sa "{searchQuery}"
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Subukang maghanap ng ibang salita o pindutin ang "Lahat" upang makita ang buong listahan.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors"
            >
              I-reset ang filter
            </button>
          </div>
        ) : (
          filteredFAQs.map(item => {
            const isExpanded = expandedIds.has(item.id);

            return (
              <div 
                key={item.id}
                className={`rounded-xl border transition-all duration-150 overflow-hidden ${
                  isExpanded
                    ? 'border-emerald-300 dark:border-emerald-700/80 bg-white dark:bg-slate-900 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Header button */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-3.5 sm:p-4 text-left flex items-start justify-between gap-3 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.category === 'seeker'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300'
                          : item.category === 'employer'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                      }`}>
                        {item.categoryLabel}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {item.question}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {item.questionTagalog}
                    </p>
                  </div>

                  <div className={`p-1 rounded-lg text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 shrink-0 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Answer Content */}
                {isExpanded && (
                  <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Palawan Support Card */}
      <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-2 mt-4">
        <h4 className="font-bold text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Opisyal na Tanggapan at Ugnayan sa Palawan</span>
        </h4>
        <p className="text-[11px] text-slate-600 dark:text-slate-400">
          Kailangan mo ba ng karagdagang tulong sa paghahanap ng trabaho o pag-verify ng employer? Maaari kang makipag-ugnayan sa:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 pt-1">
          <div className="flex items-start gap-2 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-lg border border-emerald-100/70 dark:border-emerald-900/40">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">City PESO Puerto Princesa</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">City Hall Complex, Sta. Monica, Puerto Princesa City</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-lg border border-emerald-100/70 dark:border-emerald-900/40">
            <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Email Support Desk</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">support@hanappalawan.ph (Lunes - Biyernes, 8:00 AM - 5:00 PM)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
