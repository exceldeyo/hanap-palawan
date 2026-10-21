import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { validateBirTin, validateDtiNumber } from '../../utils/validation';
import { 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Search, 
  UserCheck, 
  Eye, 
  FileCheck2, 
  AlertTriangle, 
  ShieldCheck, 
  Clock,
  LogOut,
  KeyRound,
  Copy,
  Check,
  BookOpen,
  Link2,
  Sparkles,
  Mail,
  MapPin
} from 'lucide-react';

const REJECTION_PRESETS = [
  'Malabo o hindi mabasa ang in-upload na larawan ng BIR Form 2303 / DTI Certificate.',
  'Hindi tugma ang nakasulat na BIR TIN o DTI Number sa larawan ng sertipiko.',
  'Kulang o hindi opisyal na dokumento ang in-upload. Mangyaring mag-upload ng malinaw na larawan ng tunay na sertipiko.',
  'Paso (Expired) na ang DTI Business Name Registration Certificate.'
];

export const AdminVerificationView: React.FC = () => {
  const {
    employerVerifications,
    reviewEmployerVerification,
    exitAdminMode,
    updateAdminPasskey,
    recoverAdminPasskey
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewDoc, setPreviewDoc] = useState<{
    uid: string;
    title: string;
    company: string;
    number: string;
    url: string;
    status: string;
  } | null>(null);
  const [rejectingUid, setRejectingUid] = useState<string | null>(null);
  const [rejectionNote, setRejectionNote] = useState(REJECTION_PRESETS[0]);

  const [showKeySettings, setShowKeySettings] = useState(false);
  const [keyTab, setKeyTab] = useState<'change' | 'recover'>('change');
  const [currentKeyInput, setCurrentKeyInput] = useState('');
  const [newKeyInput, setNewKeyInput] = useState('');
  const [recoveryEmailInput, setRecoveryEmailInput] = useState('');
  const [recoveryCodeInput, setRecoveryCodeInput] = useState('');
  const [recoveryNewKeyInput, setRecoveryNewKeyInput] = useState('');
  const [keyStatusMsg, setKeyStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [showAdminGuide, setShowAdminGuide] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const exclusiveAdminUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/?portal=hanap-admin`
      : 'https://hanappalawan.ph/?portal=hanap-admin';

  const handleCopyExclusiveLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(exclusiveAdminUrl).catch(() => {});
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleConfirmReject = (uid: string) => {
    reviewEmployerVerification(uid, 'rejected', rejectionNote);
    setRejectingUid(null);
  };

  const handleUpdateKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = updateAdminPasskey(currentKeyInput, newKeyInput);
    if (res.success) {
      setKeyStatusMsg({ type: 'success', text: res.message });
      setCurrentKeyInput('');
      setNewKeyInput('');
    } else {
      setKeyStatusMsg({ type: 'error', text: res.message });
    }
  };

  const handleRecoverKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = recoverAdminPasskey(recoveryEmailInput, recoveryCodeInput, recoveryNewKeyInput);
    if (res.success) {
      setKeyStatusMsg({ type: 'success', text: res.message });
      setRecoveryEmailInput('');
      setRecoveryCodeInput('');
      setRecoveryNewKeyInput('');
    } else {
      setKeyStatusMsg({ type: 'error', text: res.message });
    }
  };

  const activeVerifications = employerVerifications.filter(
    e => e.uid !== 'emp-102' && e.companyName !== 'El Nido Paradise Resort'
  );

  const filteredEmployers = activeVerifications.filter(emp => {
    const rawStatus = emp.verificationStatus;
    const status = (rawStatus === 'verified' || rawStatus === 'rejected') ? rawStatus : 'pending';
    const matchesFilter = filter === 'all' || status === filter;
    const matchesSearch =
      (emp.companyName || emp.displayName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.birNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.dtiNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = activeVerifications.filter(e => e.verificationStatus !== 'verified' && e.verificationStatus !== 'rejected').length;
  const verifiedCount = activeVerifications.filter(e => e.verificationStatus === 'verified').length;
  const rejectedCount = activeVerifications.filter(e => e.verificationStatus === 'rejected').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Exclusive Trusted Admin Security Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Private Exclusive Admin Link · Hidden from Public</span>
              </span>
              <span className="text-xs text-emerald-300 font-mono">1–2 Business Days SLA Review Hub</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Hanap Palawan · Admin Verification & Compliance Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Eksklusibong portal para sa mga Trusted Personnel ng Hanap Palawan. Suriin ang mga isinumiteng BIR Form 2303 at DTI/SEC Registration photos ng mga employer bago sila payagang mag-post ng trabaho.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end flex-wrap">
            <button
              type="button"
              onClick={() => setShowAdminGuide(!showAdminGuide)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 border ${
                showAdminGuide
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Step-by-Step Admin Guide</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowKeySettings(!showKeySettings);
                setKeyStatusMsg(null);
              }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 border ${
                showKeySettings
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
              }`}
            >
              <KeyRound className="w-4 h-4 text-amber-300" />
              <span>Security Key & Recovery</span>
            </button>

            <button
              type="button"
              onClick={exitAdminMode}
              className="px-4 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Exclusive Private Link Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-slate-300 min-w-0">
            <Link2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-white shrink-0">Exclusive Admin Link (Auto-Adapts on Deploy):</span>
            <code className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 font-mono text-emerald-300 truncate max-w-full">
              {exclusiveAdminUrl}
            </code>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyExclusiveLink}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Nakopya na ang Link!' : 'Copy Exclusive Link'}</span>
            </button>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white">Ctrl+Shift+A</kbd>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <button
          type="button"
          onClick={() => setFilter('pending')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            filter === 'pending'
              ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{pendingCount}</div>
          <div className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-0.5">
            Target SLA: 1–2 Business Days
          </div>
        </button>

        <button
          type="button"
          onClick={() => setFilter('verified')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            filter === 'verified'
              ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Verified Employers</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{verifiedCount}</div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
            Approved to Post Jobs
          </div>
        </button>

        <button
          type="button"
          onClick={() => setFilter('rejected')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            filter === 'rejected'
              ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-400 dark:border-rose-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Rejected / Returned</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{rejectedCount}</div>
          <div className="text-[11px] text-rose-700 dark:text-rose-400 font-semibold mt-0.5">
            Needs Re-upload
          </div>
        </button>

        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${filter === 'all' ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
              Total Submissions
            </span>
            <UserCheck className={`w-4 h-4 ${filter === 'all' ? 'text-emerald-400 dark:text-emerald-600' : 'text-slate-400'}`} />
          </div>
          <div className="text-2xl font-black mt-1">{activeVerifications.length}</div>
          <div className={`text-[11px] font-semibold mt-0.5 ${filter === 'all' ? 'text-emerald-300 dark:text-emerald-700' : 'text-slate-500'}`}>
            All Registered Companies
          </div>
        </button>
      </div>

      {/* Collapsible Step-by-Step Admin Tutorial Guide */}
      {showAdminGuide && (
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/40 dark:border-emerald-700/60 rounded-2xl p-5 sm:p-6 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Step-by-Step Tutorial: Paano Gamitin ang Exclusive Admin Panel
                </h2>
                <p className="text-[11px] text-slate-500">
                  Gabay para sa mga awtorisadong Admin sa pagsusuri ng mga Employer at pamamahala ng Security Key.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAdminGuide(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕ Isara
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                STEP 1 · EXCLUSIVE ACCESS
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white">Buksan ang Private Link</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Walang makikitang Admin button sa public header o footer. Buksan lamang gamit ang <code className="font-mono">/?portal=hanap-admin</code> o pindutin ang <kbd className="font-mono">Ctrl+Shift+A</kbd>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                STEP 2 · INSPECT PHOTOS
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white">Suriin ang BIR at DTI</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                I-click ang <strong>"Suriin ang Photo"</strong> sa bawat employer card upang ikumpara kung tugma ang tinype nilang BIR TIN at DTI number sa in-upload na sertipiko.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                STEP 3 · APPROVE OR REJECT
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white">Desisyon sa 1–2 Araw</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                I-click ang <strong>Approve & Verify</strong> kung lehitimo upang makapag-post na sila ng trabaho, o <strong>Reject</strong> at pumili ng dahilan kung malabo/mali ang dokumento.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="inline-block px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                STEP 4 · KEY & RECOVERY
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white">Palitan o I-recover ang Key</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Kapag nakalimutan ang Admin Key, gamitin ang <strong>Nakalimutan ang Code? (Recover)</strong> gamit ang <strong>Admin Email</strong> (<code className="font-mono">exceldeousman@gmail.com</code>) <strong>O</strong> Master Recovery Code (<code className="font-mono">PALAWAN-MASTER-RECOVERY-2026</code>).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Collapsible Change / Recover Admin Security Key Card */}
      {showKeySettings && (
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-700/80 rounded-2xl p-5 sm:p-6 shadow-md space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Admin Security Key Management & Emergency Recovery
                </h2>
                <p className="text-[11px] text-slate-500">
                  Palitan ang kasalukuyang Admin Key o i-reset ito gamit ang Master Recovery Code.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setKeyTab('change');
                    setKeyStatusMsg(null);
                  }}
                  className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${
                    keyTab === 'change'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  Change Key
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setKeyTab('recover');
                    setKeyStatusMsg(null);
                  }}
                  className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${
                    keyTab === 'recover'
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  Forgot / Recover Key
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowKeySettings(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {keyStatusMsg && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold ${
                keyStatusMsg.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
              }`}
            >
              {keyStatusMsg.text}
            </div>
          )}

          {keyTab === 'change' ? (
            <form onSubmit={handleUpdateKeySubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kasalukuyang Admin Key
                </label>
                <input
                  type="password"
                  value={currentKeyInput}
                  onChange={e => setCurrentKeyInput(e.target.value)}
                  placeholder="Ilagay ang kasalukuyang key..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Bagong Admin Security Key (Min. 8 chars)
                </label>
                <input
                  type="password"
                  value={newKeyInput}
                  onChange={e => setNewKeyInput(e.target.value)}
                  placeholder="Ilagay ang bagong secret key..."
                  required
                  minLength={8}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs cursor-pointer h-[38px]"
              >
                I-save ang Bagong Admin Key
              </button>
            </form>
          ) : (
            <form onSubmit={handleRecoverKeySubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Option 1: Admin Email (Easy Recovery)
                </label>
                <input
                  type="email"
                  value={recoveryEmailInput}
                  onChange={e => setRecoveryEmailInput(e.target.value)}
                  placeholder="exceldeousman@gmail.com / admin@hanappalawan.ph"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Option 2: Recovery Code (Optional)
                </label>
                <input
                  type="password"
                  value={recoveryCodeInput}
                  onChange={e => setRecoveryCodeInput(e.target.value)}
                  placeholder="PALAWAN-MASTER-RECOVERY-2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Bagong Admin Key (Min. 8 chars)
                </label>
                <input
                  type="password"
                  value={recoveryNewKeyInput}
                  onChange={e => setRecoveryNewKeyInput(e.target.value)}
                  placeholder="Bagong Admin Key..."
                  required
                  minLength={8}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs cursor-pointer h-[38px]"
              >
                I-recover at I-reset ang Key
              </button>
            </form>
          )}
        </div>
      )}

      {/* Filters & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'pending'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Pending Review ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('verified')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'verified'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('rejected')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'rejected'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Rejected ({rejectedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Lahat ({activeVerifications.length})
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Hanapin ang kumpanya, email, TIN, o DTI..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Employers List */}
      <div className="space-y-4">
        {filteredEmployers.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Walang natagpuang employer sa kategoryang ito</h3>
            <p className="text-xs text-slate-500">Lahat ng verification requests sa filter na ito ay nasuri na.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredEmployers.map(emp => {
              const status = emp.verificationStatus || 'pending';
              const birValid = validateBirTin(emp.birNumber || '').valid;
              const dtiValid = validateDtiNumber(emp.dtiNumber || '').valid;
              const hasBothPhotos = Boolean(emp.birDocumentUrl && emp.dtiDocumentUrl);

              return (
                <div
                  key={emp.uid}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5 transition-all hover:border-emerald-500/40"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                          {emp.companyName || emp.displayName}
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 capitalize ${
                            status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200'
                              : status === 'rejected'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200'
                          }`}
                        >
                          {status === 'verified' && <CheckCircle2 className="w-3 h-3" />}
                          {status === 'pending' && <Clock className="w-3 h-3" />}
                          {status === 'rejected' && <XCircle className="w-3 h-3" />}
                          <span>{status === 'pending' ? 'Pending (1–2 Days SLA)' : status}</span>
                        </span>
                        {(emp.wasPreviouslyRejected || emp.previousRejectionReason) && status === 'pending' && (
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-rose-500 text-white shadow-2xs flex items-center gap-1 animate-pulse">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Re-submitted (Previously Rejected)</span>
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{emp.municipality || 'Puerto Princesa'} · {emp.industry || 'Local Enterprise'}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{emp.email}</span>
                        </span>
                        {emp.verificationSubmittedAt && (
                          <span className="text-slate-400">
                            Isinumite: <strong className="text-slate-600 dark:text-slate-300">{emp.verificationSubmittedAt}</strong>
                          </span>
                        )}
                      </div>

                      {/* Automated Pre-Check Summary */}
                      <div className="flex items-center gap-2 flex-wrap pt-0.5 text-[11px]">
                        <span className={`font-semibold flex items-center gap-1 ${birValid ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600'}`}>
                          <Sparkles className="w-3 h-3" />
                          <span>{birValid ? 'BIR Format Valid' : 'Check BIR Format'}</span>
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className={`font-semibold flex items-center gap-1 ${dtiValid ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600'}`}>
                          <span>{dtiValid ? 'DTI/SEC Format Valid' : 'Check DTI Format'}</span>
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className={`font-semibold ${hasBothPhotos ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'}`}>
                          {hasBothPhotos ? '2/2 Certificate Photos Attached' : 'Missing Document Photo'}
                        </span>
                      </div>

                      {/* Re-submitted after Rejection Alert Banner */}
                      {(emp.wasPreviouslyRejected || emp.previousRejectionReason) && status === 'pending' && (
                        <div className="mt-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs space-y-1 animate-in fade-in">
                          <div className="flex items-center gap-1.5 font-extrabold text-amber-900 dark:text-amber-200">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>⚠️ MULING ISINANGGUNI (DATING REJECTED USER)</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-amber-900/90 dark:text-amber-200/90">
                            Muling nagsumite / nag-update ng profile at requirements ang employer na ito matapos ma-reject ng Admin. Paki-double check ang mga bagong BIR Form 2303 / DTI details bago mag-approve.
                          </p>
                          {emp.previousRejectionReason && (
                            <div className="pt-1.5 border-t border-amber-200 dark:border-amber-800 text-[11px] font-mono text-amber-900 dark:text-amber-200">
                              <strong>Dating Dahilan ng Rejection:</strong> "{emp.previousRejectionReason}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {status !== 'verified' && (
                        <button
                          type="button"
                          onClick={() => reviewEmployerVerification(emp.uid, 'verified')}
                          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Verify</span>
                        </button>
                      )}

                      {status !== 'rejected' && (
                        <button
                          type="button"
                          onClick={() => setRejectingUid(rejectingUid === emp.uid ? null : emp.uid)}
                          className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Rejection Reason Input Box with Quick Presets */}
                  {rejectingUid === emp.uid && (
                    <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-3 animate-in fade-in">
                      <label className="block text-xs font-bold text-rose-900 dark:text-rose-200">
                        Pumili o mag-type ng dahilan ng pag-reject (makikita ito agad ng Employer sa kanilang Profile):
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {REJECTION_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setRejectionNote(preset)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border text-left transition-colors cursor-pointer ${
                              rejectionNote === preset
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-white dark:bg-slate-900 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800 hover:bg-rose-100'
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={rejectionNote}
                          onChange={e => setRejectionNote(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-700 text-xs text-slate-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleConfirmReject(emp.uid)}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer shrink-0"
                        >
                          Kumpirmahin ang Pag-reject
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Uploaded BIR & DTI Document Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {/* BIR Certificate Card */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {emp.birDocumentUrl ? (
                          <img
                            src={emp.birDocumentUrl}
                            alt="BIR Form 2303"
                            className="w-16 h-14 object-cover rounded-lg border border-slate-300 dark:border-slate-700 shrink-0 bg-white cursor-pointer"
                            onClick={() =>
                              setPreviewDoc({
                                uid: emp.uid,
                                title: 'BIR Form 2303 Certificate Photo',
                                company: emp.companyName || emp.displayName,
                                number: `BIR TIN: ${emp.birNumber}`,
                                url: emp.birDocumentUrl!,
                                status
                              })
                            }
                          />
                        ) : (
                          <div className="w-16 h-14 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="block text-[10px] font-bold uppercase text-slate-400">1. BIR TIN & Form 2303 Photo</span>
                          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block truncate">
                            {emp.birNumber || 'Walang BIR TIN'}
                          </span>
                          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                            <FileCheck2 className="w-3 h-3" />
                            <span>{emp.birDocumentUrl ? 'May In-upload na Larawan' : 'Walang Larawan'}</span>
                          </span>
                        </div>
                      </div>

                      {emp.birDocumentUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewDoc({
                              uid: emp.uid,
                              title: 'BIR Form 2303 Certificate Photo',
                              company: emp.companyName || emp.displayName,
                              number: `BIR TIN: ${emp.birNumber}`,
                              url: emp.birDocumentUrl!,
                              status
                            })
                          }
                          className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Suriin ang Photo</span>
                        </button>
                      )}
                    </div>

                    {/* DTI Certificate Card */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {emp.dtiDocumentUrl ? (
                          <img
                            src={emp.dtiDocumentUrl}
                            alt="DTI Certificate"
                            className="w-16 h-14 object-cover rounded-lg border border-slate-300 dark:border-slate-700 shrink-0 bg-white cursor-pointer"
                            onClick={() =>
                              setPreviewDoc({
                                uid: emp.uid,
                                title: 'DTI / SEC Registration Certificate Photo',
                                company: emp.companyName || emp.displayName,
                                number: `Registration No: ${emp.dtiNumber}`,
                                url: emp.dtiDocumentUrl!,
                                status
                              })
                            }
                          />
                        ) : (
                          <div className="w-16 h-14 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="block text-[10px] font-bold uppercase text-slate-400">2. DTI / SEC Registration Photo</span>
                          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block truncate">
                            {emp.dtiNumber || 'Walang DTI Number'}
                          </span>
                          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                            <FileCheck2 className="w-3 h-3" />
                            <span>{emp.dtiDocumentUrl ? 'May In-upload na Larawan' : 'Walang Larawan'}</span>
                          </span>
                        </div>
                      </div>

                      {emp.dtiDocumentUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewDoc({
                              uid: emp.uid,
                              title: 'DTI / SEC Registration Certificate Photo',
                              company: emp.companyName || emp.displayName,
                              number: `Registration No: ${emp.dtiNumber}`,
                              url: emp.dtiDocumentUrl!,
                              status
                            })
                          }
                          className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Suriin ang Photo</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Document Inspection Lightbox Modal with Direct Verification Actions */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{previewDoc.title}</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold mt-0.5">
                  {previewDoc.company} · {previewDoc.number}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {previewDoc.status !== 'verified' && (
                  <button
                    type="button"
                    onClick={() => {
                      reviewEmployerVerification(previewDoc.uid, 'verified');
                      setPreviewDoc(null);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Employer</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
                >
                  ✕ Isara
                </button>
              </div>
            </div>
            <div className="max-h-[70vh] overflow-auto rounded-xl bg-slate-100 dark:bg-slate-950 p-3 flex items-center justify-center">
              <img src={previewDoc.url} alt={previewDoc.title} className="max-w-full h-auto rounded-lg shadow-sm" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
