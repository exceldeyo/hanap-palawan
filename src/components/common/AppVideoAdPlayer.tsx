import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { soundEngine } from '../../utils/soundEngine';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Palmtree,
  Briefcase,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Search,
  Upload,
  Sparkles,
  Trash2,
  RefreshCw,
  Clock,
  MapPin,
  UserPlus,
  MousePointerClick,
  ChevronRight,
  ChevronLeft,
  Film
} from 'lucide-react';

interface VideoScene {
  id: number;
  durationSec: number;
  badge: string;
  title: string;
  subtitle: string;
  captionTaglish: string;
}

const VIDEO_SCENES: VideoScene[] = [
  {
    id: 0,
    durationSec: 7,
    badge: '01 · Opisyal na Video Ad',
    title: 'Hanap Palawan: Trabaho Para sa Palaweño',
    subtitle: 'Ang unang beripikado at real-time na career portal para sa buong lalawigan ng Palawan.',
    captionTaglish: '“Mula Puerto Princesa hanggang El Nido, Coron, at San Vicente—narito na ang ligtas at direktang tulay sa trabaho!”'
  },
  {
    id: 1,
    durationSec: 8,
    badge: '02 · Step 1: Sign Up & Login',
    title: 'Malinaw na Pagpili: Job Seeker o Employer',
    subtitle: 'Piliin ang tamang portal bago mag-login sa Email o Google Auth—naka-lock ang iyong role at malinis ang bawat field.',
    captionTaglish: '“Step 1: Pindutin ang Job Seeker o Employer button sa Header o Landing Page upang gumawa ng account o mag-sign in.”'
  },
  {
    id: 2,
    durationSec: 8,
    badge: '03 · Step 2: Job Seeker Guide',
    title: 'Maghanap ng Trabaho, Smart Resume & 1-Click Apply',
    subtitle: 'Mag-filter ayon sa munisipalidad at sahod, buuin ang iyong Palaweño Resume, at direktang mag-apply.',
    captionTaglish: '“Step 2: Mag-search ng posisyon sa Palawan, gamitin ang Smart Resume Builder, at i-click ang Apply Now!”'
  },
  {
    id: 3,
    durationSec: 8,
    badge: '04 · Step 3: Employer Verification',
    title: 'Mag-upload ng BIR Form 2303 at DTI Certificate Photos',
    subtitle: 'Iwas-scam: Mag-upload ng malinaw na larawan ng BIR at DTI documents at subaybayan ang 1–2 Business Days approval status.',
    captionTaglish: '“Step 3: Sa Employer Profile, ilagay ang BIR TIN at DTI Permit Number at i-upload ang larawan para sa 1–2 business days review.”'
  },
  {
    id: 4,
    durationSec: 8,
    badge: '05 · Step 4: Real-Time Cloud Sync',
    title: 'Verified Job Posting & Real-Time Deletion Sync',
    subtitle: 'Kapag nag-post o nag-delete ng trabaho ang Employer, agad itong nag-a-update nang real-time sa Job Seekers feed.',
    captionTaglish: '“Step 4: Lahat ng bagong post o binurang job opening ng Employer ay real-time na nagsi-sync sa screen ng Job Seekers!”'
  },
  {
    id: 5,
    durationSec: 6,
    badge: '06 · Simulan Na Ngayon',
    title: 'Handa Ka Na Bang Maghanap o Mag-Hire sa Palawan?',
    subtitle: 'Libre, ligtas, at disenyong pang-mobile at desktop para sa bawat Palaweño.',
    captionTaglish: '“Gumawa na ng libreng Job Seeker o Employer account sa Hanap Palawan ngayon!”'
  }
];

const TOTAL_DURATION = VIDEO_SCENES.reduce((acc, s) => acc + s.durationSec, 0);

interface AppVideoAdPlayerProps {
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const AppVideoAdPlayer: React.FC<AppVideoAdPlayerProps> = ({ isModal = false, onCloseModal }) => {
  const { openAuthModal, dismissLanding, setRole, setSeekerTab } = useApp();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStartedOnce, setHasStartedOnce] = useState<boolean>(false);
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const [volume, setVolume] = useState<number>(soundEngine.getVolume());
  const [isExpandedModal, setIsExpandedModal] = useState<boolean>(false);

  const lastSceneRef = useRef<number>(0);
  const lastSubStepRef = useRef<string>('');

  // Compute current scene index and progress within that scene
  const getScenePosition = (sec: number) => {
    let accumulated = 0;
    for (let i = 0; i < VIDEO_SCENES.length; i++) {
      const sceneDur = VIDEO_SCENES[i].durationSec;
      if (sec < accumulated + sceneDur || i === VIDEO_SCENES.length - 1) {
        const sceneElapsed = Math.max(0, sec - accumulated);
        const sceneProgress = Math.min(1, sceneElapsed / sceneDur);
        return { sceneIndex: i, sceneElapsed, sceneProgress };
      }
      accumulated += sceneDur;
    }
    return { sceneIndex: 0, sceneElapsed: 0, sceneProgress: 0 };
  };

  const { sceneIndex, sceneElapsed, sceneProgress } = getScenePosition(elapsedSec);
  const activeScene = VIDEO_SCENES[sceneIndex];

  // Playback timer loop
  useEffect(() => {
    if (!isPlaying) {
      soundEngine.stopBackgroundMusic(true);
      return;
    }

    soundEngine.startBackgroundMusic();

    const interval = window.setInterval(() => {
      setElapsedSec(prev => {
        const next = prev + 0.1;
        if (next >= TOTAL_DURATION) {
          setIsPlaying(false);
          soundEngine.stopBackgroundMusic(true);
          soundEngine.playSuccessSfx();
          return TOTAL_DURATION;
        }
        return next;
      });
    }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPlaying]);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      soundEngine.stopBackgroundMusic(true);
    };
  }, []);

  // Trigger synchronized sound effects on scene changes and animated sub-steps
  useEffect(() => {
    if (!isPlaying) return;

    if (sceneIndex !== lastSceneRef.current) {
      lastSceneRef.current = sceneIndex;
      soundEngine.playTransitionSfx();
    }

    const subStepKey = `${sceneIndex}-${Math.floor(sceneElapsed * 2)}`;
    if (subStepKey !== lastSubStepRef.current) {
      lastSubStepRef.current = subStepKey;

      // Scene-specific choreographed sound effects
      if (sceneIndex === 1 && (Math.abs(sceneElapsed - 1.5) < 0.25 || Math.abs(sceneElapsed - 4.0) < 0.25)) {
        soundEngine.playClickSfx();
      } else if (sceneIndex === 1 && sceneElapsed >= 2.0 && sceneElapsed <= 3.5) {
        soundEngine.playTypeSfx();
      } else if (sceneIndex === 2 && sceneElapsed >= 1.0 && sceneElapsed <= 2.5) {
        soundEngine.playTypeSfx();
      } else if (sceneIndex === 2 && Math.abs(sceneElapsed - 4.5) < 0.25) {
        soundEngine.playClickSfx();
      } else if (sceneIndex === 2 && Math.abs(sceneElapsed - 5.5) < 0.25) {
        soundEngine.playSuccessSfx();
      } else if (sceneIndex === 3 && (Math.abs(sceneElapsed - 2.0) < 0.25 || Math.abs(sceneElapsed - 4.0) < 0.25)) {
        soundEngine.playClickSfx();
      } else if (sceneIndex === 3 && Math.abs(sceneElapsed - 5.5) < 0.25) {
        soundEngine.playSuccessSfx();
      } else if (sceneIndex === 4 && (Math.abs(sceneElapsed - 2.0) < 0.25 || Math.abs(sceneElapsed - 5.0) < 0.25)) {
        soundEngine.playClickSfx();
      } else if (sceneIndex === 4 && Math.abs(sceneElapsed - 3.0) < 0.25) {
        soundEngine.playSuccessSfx();
      }
    }
  }, [isPlaying, sceneIndex, sceneElapsed]);

  const handleTogglePlay = () => {
    soundEngine.playClickSfx();
    if (!hasStartedOnce) {
      setHasStartedOnce(true);
    }
    if (elapsedSec >= TOTAL_DURATION) {
      setElapsedSec(0);
      lastSceneRef.current = 0;
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  };

  const handleReplay = () => {
    soundEngine.playClickSfx();
    setHasStartedOnce(true);
    setElapsedSec(0);
    lastSceneRef.current = 0;
    setIsPlaying(true);
  };

  const handleJumpToScene = (targetIdx: number) => {
    soundEngine.playClickSfx();
    setHasStartedOnce(true);
    let targetSec = 0;
    for (let i = 0; i < targetIdx; i++) {
      targetSec += VIDEO_SCENES[i].durationSec;
    }
    lastSceneRef.current = targetIdx;
    setElapsedSec(targetSec);
    setIsPlaying(true);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (!nextMuted && isPlaying) {
      soundEngine.startBackgroundMusic();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
      soundEngine.setMuted(false);
      if (isPlaying) soundEngine.startBackgroundMusic();
    }
  };

  const formatTime = (sec: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_DURATION, Math.floor(sec)));
    const mins = Math.floor(clamped / 60);
    const secs = clamped % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderAnimatedSceneStage = () => {
    // SCENE 1: Commercial Intro
    if (sceneIndex === 0) {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 overflow-hidden">
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-3xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl mb-3 sm:mb-4 transition-transform duration-500 scale-105">
            <Palmtree className="w-8 h-8 sm:w-11 sm:h-11 text-emerald-300" />
          </div>

          <div className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-emerald-300 mb-1.5">
            Puerto Princesa · El Nido · Coron · San Vicente · 24 Munisipalidad
          </div>

          <h3 className="text-xl sm:text-4xl font-black text-white tracking-tight max-w-2xl leading-tight mb-2">
            Hanap Palawan Trabaho
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed mb-4">
            Ligtas, beripikado sa BIR at DTI, at real-time na job portal para sa bawat manggagawang Palaweño at lokal na negosyo.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-lg text-left">
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <div className="text-xs sm:text-sm font-black text-emerald-300">100% Verified</div>
              <div className="text-[10px] text-emerald-100">BIR & DTI Checked</div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <div className="text-xs sm:text-sm font-black text-teal-300">Real-Time</div>
              <div className="text-[10px] text-emerald-100">Instant Cloud Sync</div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <div className="text-xs sm:text-sm font-black text-amber-300">Mobile & PWA</div>
              <div className="text-[10px] text-emerald-100">iOS & Android Ready</div>
            </div>
          </div>
        </div>
      );
    }

    // SCENE 2: Step 1 — Sign Up & Sign In (Seeker vs Employer Role Lock)
    if (sceneIndex === 1) {
      const selectedDemoRole = sceneElapsed < 3.8 ? 'seeker' : 'employer';
      const typedEmail = 'juan.delacruz@palawan.ph'.slice(0, Math.min(24, Math.floor(sceneElapsed * 6)));

      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-md bg-slate-900/95 border border-slate-700 rounded-2xl p-3.5 sm:p-5 shadow-2xl space-y-3 text-left relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs sm:text-sm font-extrabold text-white">
                Step 1: Piliin kung Job Seeker o Employer
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                Active: {selectedDemoRole === 'seeker' ? 'Seeker Portal' : 'Employer Portal'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                  selectedDemoRole === 'seeker'
                    ? 'border-emerald-400 bg-emerald-950/80 text-white ring-2 ring-emerald-400/40 scale-[1.02]'
                    : 'border-slate-700 bg-slate-800/60 text-slate-400'
                }`}
              >
                <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Job Seeker</div>
                  <div className="text-[10px] text-slate-400">Maghahanap ng trabaho</div>
                </div>
              </div>

              <div
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                  selectedDemoRole === 'employer'
                    ? 'border-teal-400 bg-teal-950/80 text-white ring-2 ring-teal-400/40 scale-[1.02]'
                    : 'border-slate-700 bg-slate-800/60 text-slate-400'
                }`}
              >
                <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Employer</div>
                  <div className="text-[10px] text-slate-400">Mag-popost ng trabaho</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[10px] text-slate-400 font-semibold">Email Address (Auto-Cleared on Tab Switch)</div>
              <div className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-300 flex items-center justify-between">
                <span>{typedEmail || 'type email...'}</span>
                <span className="text-emerald-400 animate-pulse">|</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400">Supports Email & Google Auth</span>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{selectedDemoRole === 'seeker' ? 'Login as Seeker' : 'Login as Employer'}</span>
              </div>
            </div>

            {/* Animated Tutorial Cursor */}
            <div
              className="absolute pointer-events-none transition-all duration-500 z-20 flex items-center gap-1 bg-amber-400 text-slate-950 px-2 py-1 rounded-full text-[10px] font-black shadow-lg"
              style={{
                top: sceneElapsed < 3.8 ? '32%' : '32%',
                left: sceneElapsed < 3.8 ? '22%' : '68%'
              }}
            >
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>Click Role</span>
            </div>
          </div>
        </div>
      );
    }

    // SCENE 3: Step 2 — Job Seeker Search & 1-Click Apply
    if (sceneIndex === 2) {
      const searchStr = 'El Nido Eco-Tour Guide'.slice(0, Math.min(22, Math.floor(sceneElapsed * 7)));
      const isApplied = sceneElapsed >= 5.2;

      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-lg bg-slate-900/95 border border-slate-700 rounded-2xl p-3.5 sm:p-5 shadow-2xl space-y-3 text-left relative">
            {/* Simulated Search Bar */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-emerald-500/50 text-xs text-white">
              <Search className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-mono text-emerald-200 flex-1 truncate">{searchStr || 'Maghanap ng trabaho sa Palawan...'}</span>
              <span className="text-[10px] text-emerald-400 font-semibold shrink-0">El Nido, Palawan</span>
            </div>

            {/* Simulated Job Card */}
            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <span>Bacuit Bay Eco-Resort</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    Senior Eco-Tour & Marine Guide
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-300 shrink-0">₱35k - ₱48k/mo</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-700/80">
                <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Smart Resume Attached: <strong>Juan_DelaCruz_CV.pdf</strong></span>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isApplied
                      ? 'bg-emerald-500 text-slate-950 scale-105 shadow-lg'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isApplied ? 'Application Sent!' : 'Apply Now'}</span>
                </div>
              </div>
            </div>

            {isApplied && (
              <div className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tagumpay! Naipadala na ang iyong aplikasyon sa Employer!</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    // SCENE 4: Step 3 — Employer BIR & DTI Photo Upload & 1-2 Business Days Status
    if (sceneIndex === 3) {
      const birUploaded = sceneElapsed >= 2.0;
      const dtiUploaded = sceneElapsed >= 3.8;
      const isSubmitted = sceneElapsed >= 5.2;

      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-lg bg-slate-900/95 border border-slate-700 rounded-2xl p-3.5 sm:p-5 shadow-2xl space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-extrabold text-white">
                  Step 3: Employer BIR & DTI Photo Verification
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-300">Anti-Scam Gate</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className={`p-2.5 rounded-xl border transition-all ${birUploaded ? 'border-emerald-500/70 bg-emerald-950/40' : 'border-slate-700 bg-slate-800/70'}`}>
                <div className="text-[10px] text-slate-400 font-bold">1. BIR Form 2303</div>
                <div className="font-mono font-bold text-white text-xs mt-0.5">005-482-910-000</div>
                <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                  <Upload className="w-3 h-3" />
                  <span>{birUploaded ? '✓ BIR Photo Attached' : 'Uploading photo...'}</span>
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border transition-all ${dtiUploaded ? 'border-emerald-500/70 bg-emerald-950/40' : 'border-slate-700 bg-slate-800/70'}`}>
                <div className="text-[10px] text-slate-400 font-bold">2. DTI / SEC Permit</div>
                <div className="font-mono font-bold text-white text-xs mt-0.5">DTI-2026-882910</div>
                <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                  <Upload className="w-3 h-3" />
                  <span>{dtiUploaded ? '✓ DTI Photo Attached' : 'Uploading photo...'}</span>
                </div>
              </div>
            </div>

            {isSubmitted ? (
              <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/60 text-amber-200 text-xs flex items-start gap-2.5 animate-in fade-in">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold">Status: PENDING REVIEW (1–2 Business Days Approval)</div>
                  <div className="text-[11px] text-amber-200/80">
                    Sinusuri na ng Admin ang inyong BIR at DTI photos. Makikita agad dito sa Employer Profile kapag Verified na!
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs flex items-center justify-between">
                <span>I-upload ang malinaw na larawan ng sertipiko</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px]">
                  I-submit ang Requirements
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }

    // SCENE 5: Step 4 — Real-Time Job Posting & Real-Time Job Deletion Sync
    if (sceneIndex === 4) {
      const isDeletedRealtime = sceneElapsed >= 4.8;

      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-xl bg-slate-900/95 border border-slate-700 rounded-2xl p-3.5 sm:p-5 shadow-2xl space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                <span className="text-xs sm:text-sm font-extrabold text-white">
                  Step 4: Real-Time Employer ↔ Seeker Cloud Sync
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">0ms Firestore Live</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Employer Side */}
              <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
                <div className="text-[10px] font-bold uppercase text-teal-400">Employer Job Manager</div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-white text-xs">Resort Front Desk</div>
                    <div className="text-[10px] text-slate-400">Coron, Palawan</div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 ${
                      isDeletedRealtime ? 'bg-rose-600 text-white' : 'bg-rose-950 text-rose-300 border border-rose-700'
                    }`}
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{isDeletedRealtime ? 'Deleted' : 'Delete'}</span>
                  </div>
                </div>
              </div>

              {/* Job Seeker Side */}
              <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
                <div className="text-[10px] font-bold uppercase text-emerald-400">Job Seeker Live Feed</div>
                {!isDeletedRealtime ? (
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">Resort Front Desk</div>
                      <div className="text-[10px] text-emerald-300">Live on Seekers Feed</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-500/50 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Agad na inalis nang real-time sa Seeker Feed!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // SCENE 6: Finale & Interactive Call-To-Action
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 space-y-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-xl">
          <Palmtree className="w-7 h-7 sm:w-9 sm:h-9" />
        </div>

        <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight max-w-xl">
          Simulan na ang Iyong Karera o Pag-Hire sa Palawan!
        </h3>

        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-md">
          Piliin ang iyong account sa ibaba upang magsimula agad:
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-lg pt-1">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClickSfx();
              setIsPlaying(false);
              if (onCloseModal) onCloseModal();
              openAuthModal('signup', 'seeker');
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-emerald-950 font-extrabold text-xs shadow-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sign Up bilang Job Seeker</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClickSfx();
              setIsPlaying(false);
              if (onCloseModal) onCloseModal();
              openAuthModal('signup', 'employer');
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-400/40"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Sign Up bilang Employer</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClickSfx();
              setIsPlaying(false);
              if (onCloseModal) onCloseModal();
              setRole('seeker');
              setSeekerTab('jobs');
              dismissLanding();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-200 font-bold text-xs border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Browse Jobs</span>
          </button>
        </div>
      </div>
    );
  };

  const playerContent = (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white">
      {/* Top Bar of Video Player */}
      <div className="px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Film className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-extrabold text-white truncate">
            Hanap Palawan · Official Video Ad & Step-by-Step App Guide
          </span>
          <span className="hidden md:inline-block text-[11px] text-emerald-400 font-medium">
            · With Tropical BGM & Sound Effects
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Scene Stepper Buttons */}
          <div className="hidden sm:flex items-center gap-1">
            {VIDEO_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => handleJumpToScene(idx)}
                className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                  sceneIndex === idx
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {isModal && onCloseModal ? (
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                onCloseModal();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
            >
              ✕ Isara
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsExpandedModal(prev => !prev)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={isExpandedModal ? 'Minimize Video' : 'Expand Theater View'}
            >
              {isExpandedModal ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Main 16:9 Animated Video Viewport */}
      <div className="relative min-h-[300px] sm:min-h-[380px] md:min-h-[420px] bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 flex flex-col justify-between overflow-hidden select-none">
        {/* Ambient Tropical Glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Scene Header Overlay */}
        <div className="relative z-10 px-4 sm:px-6 pt-4 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 block">
              {activeScene.badge}
            </span>
            <h4 className="text-sm sm:text-lg font-extrabold text-white">
              {activeScene.title}
            </h4>
          </div>

          {/* Audio Visualizer / Status */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleMute}
              className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 border border-white/15 text-[11px] font-semibold text-emerald-200 flex items-center gap-1.5 cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span>Sound Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>BGM & SFX On</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center Animated Stage */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
          {renderAnimatedSceneStage()}

          {/* Big Initial Play Overlay to start Video + Audio */}
          {!isPlaying && !hasStartedOnce && (
            <div
              onClick={handleTogglePlay}
              className="absolute inset-0 z-20 bg-slate-950/65 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4 cursor-pointer group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 group-hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all mb-3">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
              </div>
              <span className="text-sm sm:text-base font-extrabold text-white">
                I-play ang Hanap Palawan Video Ad at Step-by-Step Guide
              </span>
              <span className="text-xs text-emerald-200 mt-1">
                May kasamang Tropical Background Music, Sound Effects, at Animations (0:45)
              </span>
            </div>
          )}
        </div>

        {/* Bottom Caption / Voiceover Subtitle Bar */}
        <div className="relative z-10 px-4 sm:px-6 pb-3 text-center">
          <div className="inline-block max-w-2xl px-3.5 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 text-xs sm:text-sm font-medium text-emerald-100">
            {activeScene.captionTaglish}
          </div>
        </div>

        {/* Scene Progress Bar inside viewport bottom */}
        <div className="w-full h-1 bg-white/10">
          <div
            className="h-full bg-emerald-400 transition-all duration-100"
            style={{ width: `${sceneProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Interactive Video Controls Bar */}
      <div className="px-4 sm:px-6 py-3 bg-slate-900 border-t border-slate-800 space-y-2.5">
        {/* Timeline Scrubber */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tabular-nums text-slate-300 w-9">
            {formatTime(elapsedSec)}
          </span>
          <input
            type="range"
            min={0}
            max={TOTAL_DURATION}
            step={0.1}
            value={elapsedSec}
            onChange={e => {
              setHasStartedOnce(true);
              setElapsedSec(parseFloat(e.target.value));
            }}
            aria-label="Video timeline scrubber"
            className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-[11px] font-mono tabular-nums text-slate-400 w-9 text-right">
            {formatTime(TOTAL_DURATION)}
          </span>
        </div>

        {/* Buttons & Audio Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : elapsedSec >= TOTAL_DURATION ? 'Play Again' : 'Play Video Ad'}</span>
            </button>

            <button
              type="button"
              onClick={handleReplay}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="I-replay mula sa simula"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleJumpToScene(Math.max(0, sceneIndex - 1))}
              disabled={sceneIndex === 0}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleJumpToScene(Math.min(VIDEO_SCENES.length - 1, sceneIndex + 1))}
              disabled={sceneIndex === VIDEO_SCENES.length - 1}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Step Selector & Volume Slider */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleToggleMute}
                className="text-slate-300 hover:text-white cursor-pointer"
                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume control"
                className="w-16 sm:w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isExpandedModal && !isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
        <div className="max-w-4xl w-full">
          {playerContent}
        </div>
      </div>
    );
  }

  return playerContent;
};
