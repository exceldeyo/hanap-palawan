import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { validateBirTin, validateDtiNumber } from '../../utils/validation';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Phone, 
  Edit3, 
  Camera, 
  CheckCircle2, 
  PlusCircle, 
  ExternalLink,
  Briefcase,
  Clock,
  AlertTriangle,
  XCircle,
  Upload,
  FileCheck2,
  ShieldCheck,
  Eye,
  Trash2,
  UserPlus,
  LogIn
} from 'lucide-react';

export const EmployerProfileView: React.FC = () => {
  const { userProfile, updateEmployerProfile, jobs, deleteJob, setEmployerTab, openAuthModal } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [previewDocImage, setPreviewDocImage] = useState<{ title: string; url: string } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [complianceError, setComplianceError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: userProfile?.companyName || userProfile?.displayName || '',
    industry: userProfile?.industry || 'Technology & Tourism',
    municipality: userProfile?.municipality || 'Puerto Princesa City',
    companySize: userProfile?.companySize || '10-50 employees',
    website: userProfile?.website || '',
    phone: userProfile?.phone || '',
    companyDescription: userProfile?.companyDescription || 'Rehistradong negosyo sa Palawan na nagbibigay ng lokal na oportunidad sa trabaho.',
    coverPhotoUrl: userProfile?.coverPhotoUrl || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80',
    avatarUrl: userProfile?.avatarUrl || '',
    facebookUrl: userProfile?.facebookUrl || '',
    instagramUrl: userProfile?.instagramUrl || '',
    linkedinUrl: userProfile?.linkedinUrl || '',
    birNumber: userProfile?.birNumber || '',
    dtiNumber: userProfile?.dtiNumber || '',
    birDocumentUrl: userProfile?.birDocumentUrl || '',
    dtiDocumentUrl: userProfile?.dtiDocumentUrl || ''
  });

  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        companyName: userProfile.companyName || userProfile.displayName || prev.companyName,
        industry: userProfile.industry || prev.industry,
        municipality: userProfile.municipality || prev.municipality,
        companySize: userProfile.companySize || prev.companySize,
        website: userProfile.website || prev.website,
        phone: userProfile.phone || prev.phone,
        companyDescription: userProfile.companyDescription || prev.companyDescription,
        coverPhotoUrl: userProfile.coverPhotoUrl || prev.coverPhotoUrl,
        avatarUrl: userProfile.avatarUrl || prev.avatarUrl,
        facebookUrl: userProfile.facebookUrl || prev.facebookUrl,
        instagramUrl: userProfile.instagramUrl || prev.instagramUrl,
        linkedinUrl: userProfile.linkedinUrl || prev.linkedinUrl,
        birNumber: userProfile.birNumber || '',
        dtiNumber: userProfile.dtiNumber || '',
        birDocumentUrl: userProfile.birDocumentUrl || '',
        dtiDocumentUrl: userProfile.dtiDocumentUrl || ''
      }));
    }
  }, [userProfile]);

  const verificationStatus = userProfile?.verificationStatus || 'unverified';
  const isVerified = verificationStatus === 'verified' || Boolean(userProfile?.isVerified);

  const companyJobs = jobs.filter(
    j =>
      j.company.toLowerCase() === (userProfile?.companyName || formData.companyName).toLowerCase() ||
      j.employerId === userProfile?.uid
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (formData.birNumber.trim()) {
      const birCheck = validateBirTin(formData.birNumber);
      if (!birCheck.valid) {
        setFormError(birCheck.message || 'Invalid BIR TIN.');
        return;
      }
    }

    if (formData.dtiNumber.trim()) {
      const dtiCheck = validateDtiNumber(formData.dtiNumber);
      if (!dtiCheck.valid) {
        setFormError(dtiCheck.message || 'Invalid DTI/SEC Number.');
        return;
      }
    }

    if ((formData.birNumber.trim() || formData.dtiNumber.trim()) && (!formData.birDocumentUrl || !formData.dtiDocumentUrl)) {
      setFormError('Kailangan i-upload ang malinaw na larawan (photo) ng inyong BIR Form 2303 at DTI/SEC Certificate para ma-verify.');
      return;
    }

    const res = updateEmployerProfile(formData);
    if (!res.success) {
      setFormError(res.error || 'May mali sa inyong inilagay na impormasyon.');
      return;
    }
    setIsEditing(false);
  };

  const handleSubmitRequirements = (e: React.FormEvent) => {
    e.preventDefault();
    setComplianceError(null);

    const birCheck = validateBirTin(formData.birNumber);
    if (!birCheck.valid) {
      setComplianceError(birCheck.message || 'Invalid ang BIR TIN.');
      return;
    }

    const dtiCheck = validateDtiNumber(formData.dtiNumber);
    if (!dtiCheck.valid) {
      setComplianceError(dtiCheck.message || 'Invalid ang DTI/SEC Number.');
      return;
    }

    if (!formData.birDocumentUrl) {
      setComplianceError('Mangyaring mag-upload ng larawan (photo) ng inyong BIR Certificate of Registration (Form 2303).');
      return;
    }

    if (!formData.dtiDocumentUrl) {
      setComplianceError('Mangyaring mag-upload ng larawan (photo) ng inyong DTI o SEC Registration Certificate.');
      return;
    }

    const res = updateEmployerProfile({
      ...formData,
      birNumber: formData.birNumber.trim(),
      dtiNumber: formData.dtiNumber.trim().toUpperCase(),
      birDocumentUrl: formData.birDocumentUrl,
      dtiDocumentUrl: formData.dtiDocumentUrl
    });

    if (!res.success) {
      setComplianceError(res.error || 'Hindi naisumite ang requirements.');
    }
  };

  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'coverPhotoUrl' | 'avatarUrl' | 'birDocumentUrl' | 'dtiDocumentUrl'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      const result = event.target?.result as string;
      if (result) {
        setFormData(prev => ({ ...prev, [field]: result }));
        setComplianceError(null);
        setFormError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!userProfile) {
    return (
      <div className="max-w-xl mx-auto my-8 sm:my-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 text-center shadow-lg space-y-5 animate-in fade-in duration-200">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            Account Required · Kailangan Mag-Sign Up o Sign In
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            BIR & DTI Verified Employer Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            Kailangan mo munang gumawa ng account (<strong>Sign Up</strong>) o mag-<strong>Sign In</strong> bilang Employer upang ma-access ang Company Profile, mag-upload ng BIR & DTI requirements, at mag-post ng trabaho.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() =>
              openAuthModal(
                'signup',
                'employer',
                'Kailangan mo ng account o mag-Sign Up / Sign In muna bilang Employer upang ma-access ang BIR & DTI Verified Employer Portal.'
              )
            }
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 shrink-0" />
            <span>Gumawa ng Employer Account (Sign Up)</span>
          </button>
          <button
            type="button"
            onClick={() =>
              openAuthModal(
                'signin',
                'employer',
                'Mag-sign in sa iyong Employer Account upang buksan ang iyong Company Profile.'
              )
            }
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4 shrink-0" />
            <span>Mag-Sign In bilang Employer</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Facebook / Instagram Style Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {/* Cover Photo Banner */}
        <div className="relative h-48 sm:h-72 w-full bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 overflow-hidden">
          <img
            src={formData.coverPhotoUrl}
            alt="Company Cover Banner"
            className="w-full h-full object-cover opacity-90"
            onError={e => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          <button
            type="button"
            onClick={() => {
              setFormError(null);
              setIsEditing(true);
            }}
            className="absolute top-4 right-4 px-3.5 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>I-edit ang Cover & Profile</span>
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="px-4 sm:px-8 pb-5 sm:pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3.5 sm:gap-4 -mt-12 sm:-mt-16 mb-3 sm:mb-4">
            {/* Avatar & Title */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-5 min-w-0">
              <div className="relative w-20 h-20 sm:w-32 sm:h-32 shrink-0">
                {formData.avatarUrl ? (
                  <img
                    src={formData.avatarUrl}
                    alt={formData.companyName}
                    className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-xl bg-white dark:bg-slate-800"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white font-black text-2xl sm:text-4xl flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl">
                    {formData.companyName.charAt(0)}
                  </div>
                )}
                {isVerified ? (
                  <span
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 flex items-center justify-center text-white shadow-sm"
                    title="Verified Employer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                ) : verificationStatus === 'pending' ? (
                  <span
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-6 h-6 rounded-full bg-amber-500 border-2 border-white dark:border-slate-950 flex items-center justify-center text-white shadow-sm"
                    title="Pending Verification Review"
                  >
                    <Clock className="w-3.5 h-3.5" />
                  </span>
                ) : null}
              </div>

              <div className="pt-1 sm:pt-0 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight break-words">
                    {formData.companyName}
                  </h1>
                  {isVerified ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Employer</span>
                    </span>
                  ) : verificationStatus === 'pending' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>Pending Admin Review</span>
                    </span>
                  ) : verificationStatus === 'rejected' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1 shrink-0">
                      <XCircle className="w-3 h-3" />
                      <span>Verification Rejected</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
                      Unverified Account
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                  {formData.industry} · <span className="font-mono">{formData.companySize}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setEmployerTab('post-job')}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Mag-post ng Trabaho</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormError(null);
                  setIsEditing(true);
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <Edit3 className="w-4 h-4 text-slate-500" />
                <span>I-edit ang Profile</span>
              </button>
            </div>
          </div>

          {/* Bio / Description */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {formData.companyDescription}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{formData.municipality}, Palawan</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <a href={formData.website} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline truncate">
                  {formData.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-mono">{formData.phone}</span>
              </div>
            </div>

            {/* Social Media Links Bar */}
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold flex-wrap">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Social Media:</span>
              <a href={formData.facebookUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors">
                Facebook Page
              </a>
              <a href={formData.instagramUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors">
                Instagram
              </a>
              <a href={formData.linkedinUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Employer Verification Status & DTI/BIR Photo Upload Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                BIR & DTI Requirements Verification Status
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upang maiwasan ang job posting spam at mga scammer, kailangang mag-upload ng malinaw na larawan ng BIR Form 2303 at DTI/SEC Certificate para masuri ng Hanap Palawan Admin.
            </p>
          </div>

          {/* Real-Time Status Badge */}
          <div className="shrink-0">
            {isVerified ? (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-extrabold text-emerald-900 dark:text-emerald-200">Status: VERIFIED & APPROVED</div>
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400">Maaari nang mag-post ng trabaho</div>
                </div>
              </div>
            ) : verificationStatus === 'pending' ? (
              <div className="px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-extrabold text-amber-900 dark:text-amber-200">Status: PENDING REVIEW (1–2 Business Days)</div>
                  <div className="text-[10px] text-amber-700 dark:text-amber-400">
                    {userProfile?.verificationSubmittedAt ? `Isinumite: ${userProfile.verificationSubmittedAt}` : 'Maghintay ng 1–2 business days para sa approval'}
                  </div>
                </div>
              </div>
            ) : verificationStatus === 'rejected' ? (
              <div className="px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center gap-2.5">
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                <div>
                  <div className="text-xs font-extrabold text-rose-900 dark:text-rose-200">Status: REJECTED BY ADMIN</div>
                  <div className="text-[10px] text-rose-700 dark:text-rose-400">Pakisuri at mag-upload muli</div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200">Status: NOT YET SUBMITTED</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Mag-upload ng BIR at DTI photos sa ibaba</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Explanation Banner */}
        {verificationStatus === 'rejected' && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-3">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Dahilan ng Pagka-reject mula sa Admin:</p>
              <p>{userProfile?.verificationRejectionReason || 'Hindi tugma ang numero o malabo ang in-upload na larawan ng BIR/DTI certificate. Pakisigurong opisyal na dokumento ang naka-upload.'}</p>
              <p className="font-semibold text-rose-700 dark:text-rose-300 pt-1 border-t border-rose-200/60 dark:border-rose-900/60 mt-1">
                📌 Maaari kayong mag-update ng inyong BIR TIN / DTI Number at mag-upload ng bagong malinaw na larawan sa ibaba, at i-click ang <strong>"I-resubmit ang BIR at DTI Requirements"</strong> upang muling masuri ng Admin.
              </p>
            </div>
          </div>
        )}

        {verificationStatus === 'pending' && (
          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/90 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-3.5 shadow-2xs">
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-extrabold text-sm">Naisumite na ang inyong BIR at DTI Requirements!</p>
                <span className="px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 font-bold text-[10px]">
                  Estimated Approval: 1–2 Business Days
                </span>
              </div>
              <p className="leading-relaxed">
                Salamat sa pagpapadala ng inyong mga dokumento. Kasalukuyang sinusuri ng ating <strong>Hanap Palawan Compliance Admin</strong> ang inyong opisyal na BIR TIN (<span className="font-mono font-bold">{formData.birNumber}</span>), DTI/SEC Registration (<span className="font-mono font-bold">{formData.dtiNumber}</span>), at ang mga in-upload na larawan ng sertipiko. Mangyaring maghintay ng <strong>1 hanggang 2 business days</strong> para sa pinal na pag-apruba upang makapag-post ng trabaho.
              </p>
            </div>
          </div>
        )}

        {/* Submitted Requirements Checklist Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400">1. BIR TIN Number</span>
              {validateBirTin(formData.birNumber).valid ? (
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">Valid Format</span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[10px]">Required</span>
              )}
            </div>
            <div className="font-mono font-bold text-slate-900 dark:text-white truncate">
              {formData.birNumber || 'Wala pang nakalagay'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400">2. BIR Certificate Photo</span>
              {formData.birDocumentUrl ? (
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">Uploaded</span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[10px]">Missing Photo</span>
              )}
            </div>
            <div className="text-slate-700 dark:text-slate-300 font-semibold">
              {formData.birDocumentUrl ? 'BIR Form 2303 Attached' : 'Mag-upload ng larawan'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400">3. DTI / SEC Number</span>
              {validateDtiNumber(formData.dtiNumber).valid ? (
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">Valid Format</span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[10px]">Required</span>
              )}
            </div>
            <div className="font-mono font-bold text-slate-900 dark:text-white truncate">
              {formData.dtiNumber || 'Wala pang nakalagay'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400">4. DTI / SEC Photo</span>
              {formData.dtiDocumentUrl ? (
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">Uploaded</span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[10px]">Missing Photo</span>
              )}
            </div>
            <div className="text-slate-700 dark:text-slate-300 font-semibold">
              {formData.dtiDocumentUrl ? 'DTI Certificate Attached' : 'Mag-upload ng larawan'}
            </div>
          </div>
        </div>

        {/* Direct Submission & Document Upload Form */}
        <form onSubmit={handleSubmitRequirements} className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-5">
          {complianceError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{complianceError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* BIR TIN & BIR Photo Upload Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Opisyal na BIR TIN Number (Format: XXX-XXX-XXX-000) *
                </label>
                <input
                  type="text"
                  value={formData.birNumber}
                  onChange={e => {
                    setFormData({ ...formData, birNumber: e.target.value });
                    setComplianceError(null);
                  }}
                  placeholder="Halimbawa: 005-482-910-000"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Paalala: Hindi tinatanggap ang random na numero. Dapat may gitling at nagsisimula sa 0 ang 3-digit branch code (hal. 000).
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Mag-upload ng Larawan ng BIR Certificate (Form 2303) *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageFileUpload(e, 'birDocumentUrl')}
                  className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1"
                />

                {formData.birDocumentUrl && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={formData.birDocumentUrl}
                        alt="BIR Certificate Preview"
                        className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
                          <span>BIR Form 2303 Photo Ready</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">Handa na para sa pagsusuri ng Admin</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewDocImage({ title: 'BIR Form 2303 Certificate Photo', url: formData.birDocumentUrl })}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tingnan</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* DTI Number & DTI Photo Upload Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Opisyal na DTI / SEC Registration No. (Format: DTI-YYYY-XXXXXX) *
                </label>
                <input
                  type="text"
                  value={formData.dtiNumber}
                  onChange={e => {
                    setFormData({ ...formData, dtiNumber: e.target.value.toUpperCase() });
                    setComplianceError(null);
                  }}
                  placeholder="Halimbawa: DTI-2026-882910 o BN-4829104"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Paalala: Isama ang opisyal na prefix (DTI-, BN-, SEC-, o CDA-) at 6-8 digit certificate serial number.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Mag-upload ng Larawan ng DTI / SEC Registration Certificate *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageFileUpload(e, 'dtiDocumentUrl')}
                  className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1"
                />

                {formData.dtiDocumentUrl && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={formData.dtiDocumentUrl}
                        alt="DTI Certificate Preview"
                        className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
                          <span>DTI / SEC Photo Ready</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">Handa na para sa pagsusuri ng Admin</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewDocImage({ title: 'DTI / SEC Certificate Photo', url: formData.dtiDocumentUrl })}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tingnan</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Kapag naisumite na, mangyaring maghintay ng <strong>1–2 business days</strong> para sa pag-apruba. Makikita mo rito sa Employer Section kung <strong>Pending Review</strong>, <strong>Verified</strong>, o <strong>Rejected</strong> ang iyong mga dokumento.
            </p>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>
                {verificationStatus === 'pending'
                  ? 'I-update ang Isinumiteng Requirements'
                  : verificationStatus === 'rejected'
                  ? 'I-resubmit ang BIR at DTI Requirements'
                  : 'I-submit ang BIR at DTI Requirements'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Company Feed / Active Job Openings Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span>Mga Aktibong Job Postings ng Kumpanya ({companyJobs.length})</span>
          </h2>
          <button
            type="button"
            onClick={() => setEmployerTab('jobs')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Tingnan lahat sa Job Manager →
          </button>
        </div>

        {companyJobs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Wala pang nakapaskil na trabaho</h3>
            <p className="text-xs text-slate-500">I-click ang "Mag-post ng Trabaho" upang magsimulang humimok ng mga lokal na aplikante.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companyJobs.map(job => (
              <div key={job.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-xs hover:border-emerald-500/50 transition-all">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {job.department}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">{job.workplaceType}</span>
                    <button
                      type="button"
                      onClick={() => deleteJob(job.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                      title="Delete job posting"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">{job.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{job.description}</p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-800 dark:text-slate-200">₱{(job.salaryMin / 1000).toFixed(0)}k - ₱{(job.salaryMax / 1000).toFixed(0)}k/mo</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => deleteJob(job.id)}
                      className="text-rose-600 dark:text-rose-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer font-sans"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmployerTab('pipeline')}
                      className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer font-sans"
                    >
                      <span>Pipeline</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Document Image Lightbox Modal */}
      {previewDocImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{previewDocImage.title}</h3>
              <button
                type="button"
                onClick={() => setPreviewDocImage(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 text-xs font-bold cursor-pointer"
              >
                ✕ Isara
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto rounded-xl bg-slate-100 dark:bg-slate-950 p-2 flex items-center justify-center">
              <img src={previewDocImage.url} alt={previewDocImage.title} className="max-w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal (Facebook / Instagram Setup Style) */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">I-edit ang Company Profile</h3>
                <p className="text-xs text-slate-500">I-setup ang iyong kumpanya tulad sa Facebook o Instagram.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pangalan ng Kumpanya</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Industriya / Uri ng Negosyo</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Munisipalidad sa Palawan</label>
                  <input
                    type="text"
                    value={formData.municipality}
                    onChange={e => setFormData({ ...formData, municipality: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Laki ng Kumpanya (Company Size)</label>
                  <input
                    type="text"
                    value={formData.companySize}
                    onChange={e => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Website URL</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={e => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cover Photo Banner (Mag-upload mula sa Device)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageFileUpload(e, 'coverPhotoUrl')}
                    className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Company Logo / Avatar (Mag-upload mula sa Device)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageFileUpload(e, 'avatarUrl')}
                    className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-900 cursor-pointer bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Paglalarawan ng Kumpanya (Company Description / Bio)</label>
                <textarea
                  rows={4}
                  value={formData.companyDescription}
                  onChange={e => setFormData({ ...formData, companyDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ikuwento ang misyon, kultura, at mga benepisyo sa inyong kumpanya..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Facebook URL</label>
                  <input
                    type="url"
                    value={formData.facebookUrl}
                    onChange={e => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Instagram URL</label>
                  <input
                    type="url"
                    value={formData.instagramUrl}
                    onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold cursor-pointer"
                >
                  Kanselahin
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  I-save ang Pagbabago
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
