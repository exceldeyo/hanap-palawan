import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  signUpWithEmail, 
  signInWithEmail, 
  signInWithGoogle 
} from '../../services/firebase';
import { 
  X, 
  User, 
  Building2, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Palmtree, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  ArrowRight,
  Loader2
} from 'lucide-react';

const PALAWAN_MUNICIPALITIES = [
  'Puerto Princesa City',
  'El Nido (Bacuit)',
  'Coron (Calamianes)',
  'San Vicente',
  'Taytay',
  'Roxas',
  'Narra',
  'Brooke\'s Point',
  'Aborlan',
  'Bataraza',
  'Sofronio Española',
  'Quezon',
  'Culion',
  'Busuanga',
  'Linapacan',
  'Cuyo',
  'Dumaran',
  'Araceli',
  'Balabac',
  'Agutaya',
  'Cagayancillo',
  'Kalayaan'
];

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    authModalTargetRole,
    setUserProfile,
    setRole,
    setCandidateProfile
  } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode || 'signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>(authModalTargetRole || 'seeker');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [municipality, setMunicipality] = useState('Puerto Princesa City');
  const [phone, setPhone] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setCompanyName('');
    setPhone('');
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleModeChange = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const formatAuthError = (error: any): string => {
    const code = error?.code || '';
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      return 'Maling email o password. Pakisuri at subukan muli.';
    }
    if (code === 'auth/email-already-in-use') {
      return 'May account na gamit ang email na ito. Maaari kang mag-sign in direkta.';
    }
    if (code === 'auth/weak-password') {
      return 'Masyadong maikli ang password. Maglagay ng kahit 6 na characters.';
    }
    if (code === 'auth/invalid-email') {
      return 'Hindi wastong format ng email address.';
    }
    if (code === 'auth/popup-closed-by-user') {
      return 'Kinansela ang Google login window.';
    }
    if (code === 'auth/operation-not-allowed') {
      return 'Pakisuri kung naka-enable ang Email/Password provider sa Firebase Console.';
    }
    return error?.message || 'Nagkaroon ng problema. Pakisubukan muli.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Pakilagay ang inyong email at password.');
      return;
    }

    if (mode === 'signup') {
      if (selectedRole === 'seeker' && !fullName.trim()) {
        setErrorMsg('Pakilagay ang inyong buong pangalan.');
        return;
      }
      if (selectedRole === 'employer' && !companyName.trim()) {
        setErrorMsg('Pakilagay ang pangalan ng inyong negosyo o kumpanya.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Ang password ay dapat hindi bababa sa 6 na characters.');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const profile = await signUpWithEmail(
          email.trim(),
          password,
          fullName.trim() || (selectedRole === 'employer' ? companyName.trim() : 'Palaweño'),
          selectedRole,
          {
            companyName: selectedRole === 'employer' ? companyName.trim() : undefined,
            municipality,
            phone: phone.trim()
          }
        );

        setUserProfile(profile);
        setRole(profile.role);
        if (profile.role === 'seeker') {
          setCandidateProfile(prev => ({
            ...prev,
            fullName: profile.displayName || prev.fullName,
            email: profile.email || prev.email,
            location: profile.municipality ? `${profile.municipality}, Palawan` : prev.location,
            phone: profile.phone || prev.phone
          }));
        }

        setSuccessMsg(`Maligayang pagdating sa Hanap Palawan, ${profile.displayName}!`);
        setTimeout(() => {
          closeAuthModal();
        }, 1200);
      } else {
        const profile = await signInWithEmail(email.trim(), password);
        if (profile) {
          setUserProfile(profile);
          setRole(profile.role);
          if (profile.role === 'seeker') {
            setCandidateProfile(prev => ({
              ...prev,
              fullName: profile.displayName || prev.fullName,
              email: profile.email || prev.email,
              location: profile.municipality ? `${profile.municipality}, Palawan` : prev.location,
              phone: profile.phone || prev.phone
            }));
          }
          setSuccessMsg(`Maligayang pagbabalik, ${profile.displayName}!`);
          setTimeout(() => {
            closeAuthModal();
          }, 1000);
        }
      }
    } catch (err: any) {
      setErrorMsg(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const profile = await signInWithGoogle(selectedRole);
      setUserProfile(profile);
      setRole(profile.role);
      setSuccessMsg(`Maligayang pagpasok, ${profile.displayName}!`);
      setTimeout(() => {
        closeAuthModal();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center shrink-0">
              <Palmtree className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="auth-modal-title" className="text-base sm:text-lg font-bold tracking-tight">
                  {mode === 'signin' ? 'Mag-sign In sa Hanap Palawan' : 'Gumawa ng Libreng Account'}
                </h2>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-200 border border-emerald-500/30">
                  Palawan Hub
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Para sa mga Naghahanap ng Trabaho at mga Negosyo sa Isla
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Isara ang modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-1.5 gap-1 shrink-0">
          <button
            type="button"
            onClick={() => handleModeChange('signin')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'signin'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Mag-sign In</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'signup'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Gumawa ng Account</span>
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">{errorMsg}</p>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-semibold">{successMsg}</p>
            </div>
          )}

          {/* Role Selection on Sign Up */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Piliin ang inyong uri ng account:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedRole('seeker')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                    selectedRole === 'seeker'
                      ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    {selectedRole === 'seeker' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Job Seeker</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                      Maghahanap ng trabaho at mag-aapply sa Palawan
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('employer')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                    selectedRole === 'employer'
                      ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    {selectedRole === 'employer' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Employer / Negosyo</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                      Mag-popost ng opening at magha-hire ng tauhan
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name / Contact Person for Sign Up */}
            {mode === 'signup' && (
              <>
                {selectedRole === 'seeker' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Buong Pangalan (Full Name) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="hal. Maria Santos"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Pangalan ng Negosyo o Kumpanya <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="hal. El Nido Island Resort o Palawan Logistics Co."
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Contact Person o Hiring Manager
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="hal. Juan Dela Cruz (HR Head)"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Municipality Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Bayan sa Palawan <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <select
                        value={municipality}
                        onChange={(e) => setMunicipality(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer"
                      >
                        {PALAWAN_MUNICIPALITIES.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number (Palawan / PH)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0917-123-4567"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hal. inyongemail@gmail.com"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password <span className="text-rose-500">*</span>
                </label>
                {mode === 'signup' && (
                  <span className="text-[10px] text-slate-400">Hindi bababa sa 6 na characters</span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  aria-label={showPassword ? 'Itago ang password' : 'Ipakita ang password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Pinoproseso...</span>
                </>
              ) : mode === 'signin' ? (
                <>
                  <span>Mag-sign In sa Hanap Palawan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Gumawa ng {selectedRole === 'seeker' ? 'Seeker' : 'Employer'} Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 dark:text-slate-400 font-semibold">
                o magpatuloy gamit ang
              </span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-semibold text-xs shadow-2xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Magpatuloy gamit ang Google</span>
          </button>

          {/* Switch Prompt */}
          <div className="text-center pt-2">
            {mode === 'signin' ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Wala ka pang account?{' '}
                <button
                  type="button"
                  onClick={() => handleModeChange('signup')}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  Gumawa ng libreng account dito
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                May account ka na?{' '}
                <button
                  type="button"
                  onClick={() => handleModeChange('signin')}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  Mag-sign in dito
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="bg-slate-50 dark:bg-slate-950/70 p-3 px-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Protektado sa ilalim ng RA 10173 (PH Data Privacy Act)</span>
          </div>
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">100% Libre</span>
        </div>
      </div>
    </div>
  );
};
