import React, { useState } from 'react';
import { 
  X, 
  Info, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Sparkles, 
  Lock, 
  Palmtree, 
  ExternalLink 
} from 'lucide-react';
import { HelpCenterFAQSection } from './HelpCenterFAQSection';

export type TransparencyTab = 'about' | 'privacy' | 'help';

interface SiteTransparencyModalProps {
  initialTab?: TransparencyTab;
  onClose: () => void;
}

export const SiteTransparencyModal: React.FC<SiteTransparencyModalProps> = ({ 
  initialTab = 'about', 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<TransparencyTab>(initialTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl my-auto overflow-hidden flex flex-col max-h-[90vh] transition-colors"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="transparency-modal-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-xs shrink-0">
              <Palmtree className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 id="transparency-modal-title" className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                Transparency & Legal Information
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hanap Palawan · Ang Opisyal na Plataporma ng Trabaho para sa Palaweño
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Isara ang window"
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 px-4 sm:px-6 gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'about'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About Us</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('help')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'help'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help Center & FAQ</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* ABOUT US TAB */}
          {activeTab === 'about' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <section className="bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60">
                <h3 className="font-bold text-sm sm:text-base text-emerald-900 dark:text-emerald-200 flex items-center gap-2 mb-1.5">
                  <Palmtree className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Misyon at Adhikaing Palaweño</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Ang <strong>Hanap Palawan</strong> ay binuo upang mapabilis at mapadali ang ugnayan sa pagitan ng mga 
                  talentadong Palaweño at ng mga lehitimong negosyo sa buong lalawigan ng Palawan—mula sa Lungsod ng Puerto Princesa, 
                  mga isla ng Calamianes (Coron, Culion, Busuanga), Northern Palawan (El Nido, San Vicente, Taytay, Roxas), 
                  hanggang sa Timog Palawan (Narra, Brooke&apos;s Point, Bataraza), at maging sa mga oportunidad na Remote WFH.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Walang Placement Fee</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    100% libre ang serbisyo para sa mga aplikante. Ipinagbabawal ang anumang recruitment charge o kaltas sa sahod 
                    alinsunod sa mga patakaran ng Department of Labor and Employment (DOLE).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Lehitimong Palawan Employers</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Bawat kompanya ay dumadaan sa administrative verification ng Business Permit, DTI o SEC registration 
                    upang masigurong ligtas laban sa illegal recruitment at job scams.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Disenyong Angkop sa Isla</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Magaan at mabilis mag-load ang app upang magamit kahit sa mga liblib na munisipyo o may mahinang 
                    koneksyon sa internet. May kasamang built-in offline readiness.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                    4
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Katuwang ang PESO & Komunidad</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Nakikipag-ugnayan sa City at Provincial Public Employment Service Offices (PESO) upang suportahan ang 
                    lokal na trabaho, turismo, agrikultura, IT-BPO, at pangangalaga sa kalikasan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PRIVACY POLICY TAB */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <section className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Pagsunod sa Republic Act No. 10173 (Data Privacy Act of 2012)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pinahahalagahan ng Hanap Palawan ang iyong karapatan sa pribasiya alinsunod sa mga panuntunan ng 
                  National Privacy Commission (NPC) ng Pilipinas.
                </p>
              </section>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Impormasyong Kinokolekta</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Kinokolekta lamang namin ang personal na impormasyon tulad ng buong pangalan, email address, numero ng telepono, 
                    kasalukuyang munisipyo sa Palawan, kasaysayan sa trabaho, at resume na kusang-loob na ibinibigay sa pag-aapply.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Layunin ng Paggamit ng Datos</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Ang mga detalye ay ginagamit para lamang sa pagproseso ng aplikasyon sa trabaho, pagpapadala ng imbitasyon sa interbyu, 
                    at pag-verify ng pagiging lehitimo ng aplikante. Hindi namin ibebenta o ipamamahagi ang inyong datos sa anumang ad network o ikatlong partido.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Karapatan ng May-ari ng Datos</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    May karapatan kang humiling ng kopya ng iyong nakaimbak na datos, mag-update ng profile, o hilingin ang ganap na 
                    pagbura (data deletion) ng iyong aplikasyon at CV sa pamamagitan ng aming Help Desk.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* HELP CENTER & EXPANDABLE FAQ TAB */}
          {activeTab === 'help' && (
            <HelpCenterFAQSection />
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Hanap Palawan · Para sa kapakanan ng bawat manggagawang Palaweño
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
          >
            Naiintindihan Ko
          </button>
        </div>
      </div>
    </div>
  );
};
