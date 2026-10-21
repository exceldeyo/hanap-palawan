import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  Job, 
  Applicant, 
  Interview, 
  CandidateProfile, 
  ApplicantStatus, 
  InterviewFeedback,
  PalawanNewsItem,
  UserProfile,
  UserRole
} from '../types';
import { validateBirTin, validateDtiNumber } from '../utils/validation';

import { 
  INITIAL_JOBS, 
  INITIAL_APPLICANTS, 
  INITIAL_INTERVIEWS, 
  INITIAL_CANDIDATE_PROFILE 
} from '../data/mockData';
import { INITIAL_PALAWAN_NEWS } from '../data/palawanNewsData';
import { 
  auth,
  testConnection,
  initAuth,
  seedInitialFirestoreData,
  subscribeToJobs,
  subscribeToApplicants,
  subscribeToInterviews,
  subscribeToEmployerVerifications,
  saveJobToFirestore,
  deleteJobFromFirestore,
  saveApplicantToFirestore,
  saveInterviewToFirestore,
  saveProfileToFirestore,
  getProfileFromFirestore,
  getUserProfileFromFirestore,
  saveUserProfileToFirestore,
  logOutUser
} from '../services/firebase';

interface NotificationItem {
  id: string;
  message: string;
  type: 'success' | 'info';
  timestamp: string;
}

interface AppContextType {
  // Current view role
  currentRole: 'seeker' | 'employer' | 'admin';
  setRole: (role: 'seeker' | 'employer' | 'admin') => void;
  seekerTab: 'jobs' | 'saved' | 'applications' | 'interviews' | 'profile' | 'news' | 'builder';
  setSeekerTab: (tab: 'jobs' | 'saved' | 'applications' | 'interviews' | 'profile' | 'news' | 'builder') => void;
  employerTab: 'pipeline' | 'jobs' | 'interviews' | 'post-job' | 'profile';
  setEmployerTab: (tab: 'pipeline' | 'jobs' | 'interviews' | 'post-job' | 'profile') => void;
  switchRole: (role: 'seeker' | 'employer' | 'admin') => void;
  updateEmployerProfile: (profile: Partial<UserProfile>) => { success: boolean; error?: string };
  employerVerifications: UserProfile[];
  reviewEmployerVerification: (uid: string, status: 'verified' | 'rejected', rejectionReason?: string) => void;
  isAdminAuthorized: boolean;
  authorizeAdmin: (passkey: string) => boolean;
  updateAdminPasskey: (currentKey: string, newKey: string) => { success: boolean; message: string };
  recoverAdminPasskey: (masterEmail: string, recoveryCode: string, newKey: string) => { success: boolean; message: string };
  exitAdminMode: () => void;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // Data
  jobs: Job[];
  applicants: Applicant[];
  interviews: Interview[];
  candidateProfile: CandidateProfile;
  savedJobIds: string[];
  newsItems: PalawanNewsItem[];
  bookmarkedNewsIds: string[];

  // Selection & Modals
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
  selectedApplicantId: string | null;
  setSelectedApplicantId: (id: string | null) => void;
  reviewApplicant: Applicant | null;
  activeInterviewRoom: Interview | null;
  setActiveInterviewRoom: (interview: Interview | null) => void;
  schedulingForApplicant: Applicant | null;
  setSchedulingForApplicant: (applicant: Applicant | null) => void;
  applyingForJob: Job | null;
  setApplyingForJob: (job: Job | null) => void;

  // Palawan Government News modal & job filtering
  activeNewsDetail: PalawanNewsItem | null;
  setActiveNewsDetail: (news: PalawanNewsItem | null) => void;
  jobSearchKeywordFilter: string;
  setJobSearchKeywordFilter: (kw: string) => void;
  navigateToJobSearchWithKeyword: (keyword: string) => void;

  // Gabay Palaweño AI Assistant Modal state
  aiAssistantJob: Job | null;
  setAiAssistantJob: (job: Job | null) => void;
  aiInitialTab: 'pitch' | 'fit' | 'interview' | 'living';
  openAiAssistant: (job: Job, tab?: 'pitch' | 'fit' | 'interview' | 'living') => void;

  // Actions
  toggleSaveJob: (jobId: string) => void;
  toggleBookmarkNews: (newsId: string) => void;
  addJob: (jobData: Omit<Job, 'id' | 'postedDate' | 'employerId'>) => Job;
  deleteJob: (jobId: string) => void;
  applyToJob: (data: {
    jobId: string;
    fullName: string;
    email: string;
    phone: string;
    expectedSalary: string;
    availability: string;
    coverNote: string;
    screeningAnswers: { questionId: string; question: string; answer: string }[];
    resumeFileName?: string;
  }) => Applicant;
  updateApplicantStatus: (applicantId: string, status: ApplicantStatus) => void;
  addEmployerNote: (applicantId: string, noteText: string) => void;
  rateApplicant: (applicantId: string, rating: number) => void;
  scheduleInterview: (data: Omit<Interview, 'id' | 'status'>) => Interview;
  updateInterview: (interviewId: string, updates: Partial<Interview>) => void;
  submitInterviewFeedback: (interviewId: string, feedback: InterviewFeedback) => void;
  updateCandidateProfile: (profile: Partial<CandidateProfile>) => void;
  resetDemoData: () => void;

  // Global Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark', e?: React.MouseEvent) => void;
  toggleTheme: (e?: React.MouseEvent) => void;

  // Notifications
  notifications: NotificationItem[];
  dismissNotification: (id: string) => void;
  showNotification: (message: string, type?: 'success' | 'info') => void;

  // Auth & User Accounts
  currentUser: User | null;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  authModalTargetRole: 'seeker' | 'employer' | 'admin';
  authModalNotice: string | null;
  openAuthModal: (mode?: 'signin' | 'signup', targetRole?: 'seeker' | 'employer' | 'admin', noticeMessage?: string) => void;
  closeAuthModal: () => void;
  signOut: () => Promise<void>;
  showLanding: boolean;
  setShowLanding: React.Dispatch<React.SetStateAction<boolean>>;
  dismissLanding: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  JOBS: 'hanap_palawan_jobs_v6',
  APPLICANTS: 'hanap_palawan_applicants_v5',
  INTERVIEWS: 'hanap_palawan_interviews_v5',
  PROFILE: 'hanap_palawan_profile_v5',
  SAVED_JOBS: 'hanap_palawan_saved_jobs_v5',
  ROLE: 'hanap_palawan_role_v5',
  BOOKMARKED_NEWS: 'hanap_palawan_bookmarked_news_v5',
  THEME: 'hanap_palawan_theme_v6',
  USER_PROFILE: 'hanap_palawan_user_profile_v5',
  EMPLOYER_VERIFICATIONS: 'hanap_palawan_employer_verifications_v6',
  ADMIN_AUTH: 'hanap_palawan_admin_auth_v5',
  ADMIN_PASSKEY: 'hanap_palawan_admin_passkey_v5'
};

const DEFAULT_ADMIN_PASSKEY = 'PALAWAN-ADMIN-2026';
const MASTER_RECOVERY_CODE = 'PALAWAN-MASTER-RECOVERY-2026';
const TRUSTED_ADMIN_EMAILS = ['exceldeousman@gmail.com', 'admin@hanappalawan.ph'];

const SAMPLE_BIR_DOC = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
    <rect width="600" height="420" fill="#f8fafc" stroke="#0f766e" stroke-width="6" rx="12"/>
    <rect x="24" y="24" width="552" height="65" fill="#065f46" rx="6"/>
    <text x="300" y="52" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">REPUBLIC OF THE PHILIPPINES · BUREAU OF INTERNAL REVENUE</text>
    <text x="300" y="74" font-family="sans-serif" font-size="13" fill="#a7f3d0" text-anchor="middle">CERTIFICATE OF REGISTRATION (BIR FORM 2303)</text>
    <text x="45" y="130" font-family="monospace" font-size="15" font-weight="bold" fill="#0f172a">TIN: 005-482-910-000</text>
    <text x="45" y="165" font-family="sans-serif" font-size="14" fill="#334155">Registered Name: PALAWAN ENTERPRISE REGISTERED ENTITY</text>
    <text x="45" y="195" font-family="sans-serif" font-size="14" fill="#334155">RDO Code: 036 - Puerto Princesa City, Palawan</text>
    <text x="45" y="225" font-family="sans-serif" font-size="14" fill="#334155">Taxpayer Type: Domestic Corporation / Local Business</text>
    <rect x="45" y="260" width="510" height="90" fill="#ecfdf5" stroke="#10b981" stroke-dasharray="4" rx="8"/>
    <text x="300" y="300" font-family="sans-serif" font-size="14" font-weight="bold" fill="#047857" text-anchor="middle">OFFICIAL BIR REVENUE DISTRICT OFFICE 036 STAMP</text>
    <text x="300" y="325" font-family="monospace" font-size="12" fill="#065f46" text-anchor="middle">Digitally Scanned Document Attachment · Verified Copy</text>
  </svg>`
)}`;

const SAMPLE_DTI_DOC = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
    <rect width="600" height="420" fill="#f8fafc" stroke="#1e3a8a" stroke-width="6" rx="12"/>
    <rect x="24" y="24" width="552" height="65" fill="#1e3a8a" rx="6"/>
    <text x="300" y="52" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">DEPARTMENT OF TRADE AND INDUSTRY (DTI PHILIPPINES)</text>
    <text x="300" y="74" font-family="sans-serif" font-size="13" fill="#93c5fd" text-anchor="middle">CERTIFICATE OF BUSINESS NAME REGISTRATION</text>
    <text x="45" y="130" font-family="monospace" font-size="15" font-weight="bold" fill="#0f172a">Certificate No: DTI-2026-882910</text>
    <text x="45" y="165" font-family="sans-serif" font-size="14" fill="#334155">Business Territory: Puerto Princesa / Province of Palawan</text>
    <text x="45" y="195" font-family="sans-serif" font-size="14" fill="#334155">Validity Period: 2026 - 2031 (Active &amp; Compliant)</text>
    <rect x="45" y="245" width="510" height="100" fill="#eff6ff" stroke="#3b82f6" stroke-dasharray="4" rx="8"/>
    <text x="300" y="288" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="middle">DTI MIMAROPA - PALAWAN PROVINCIAL OFFICE SEAL</text>
    <text x="300" y="315" font-family="monospace" font-size="12" fill="#1e40af" text-anchor="middle">Documentary Stamp Tax Paid · Authentic Scanned Photo</text>
  </svg>`
)}`;

const INITIAL_EMPLOYER_VERIFICATIONS: UserProfile[] = [];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showLanding, setShowLanding] = useState<boolean>(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      const seenLanding = localStorage.getItem('hanap_palawan_seen_landing_v4');
      if (savedUser) return false;
      return seenLanding ? false : true;
    } catch {
      return true;
    }
  });

  const dismissLanding = () => {
    setShowLanding(false);
    try {
      localStorage.setItem('hanap_palawan_seen_landing_v4', 'true');
    } catch {}
  };

  const setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>> = (value) => {
    setUserProfileState(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      if (next) {
        setShowLanding(false);
        try {
          localStorage.setItem('hanap_palawan_seen_landing_v4', 'true');
        } catch {}
      }
      return next;
    });
  };

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [authModalTargetRole, setAuthModalTargetRole] = useState<'seeker' | 'employer' | 'admin'>('seeker');
  const [authModalNotice, setAuthModalNotice] = useState<string | null>(null);

  // Admin Authorization state (hidden from regular seekers/employers)
  const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [adminPasskey, setAdminPasskey] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSKEY) || DEFAULT_ADMIN_PASSKEY;
    } catch {
      return DEFAULT_ADMIN_PASSKEY;
    }
  });

  const [employerVerifications, setEmployerVerifications] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EMPLOYER_VERIFICATIONS);
      if (saved) {
        const parsed: UserProfile[] = JSON.parse(saved);
        return parsed.filter(e => e.uid !== 'emp-102' && e.companyName !== 'El Nido Paradise Resort');
      }
      return INITIAL_EMPLOYER_VERIFICATIONS;
    } catch {
      return INITIAL_EMPLOYER_VERIFICATIONS;
    }
  });

  // Role & Navigation
  const [currentRole, setRoleState] = useState<'seeker' | 'employer' | 'admin'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
      const adminAuth = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
      if (saved === 'admin' && adminAuth) return 'admin';
      if (saved === 'employer') return 'employer';
      return 'seeker';
    } catch {
      return 'seeker';
    }
  });

  // Theme state: Light mode by default unless user explicitly switched to dark mode
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      return 'light';
    } catch {
      return 'light';
    }
  });

  const [seekerTab, setSeekerTabState] = useState<'jobs' | 'saved' | 'applications' | 'interviews' | 'profile' | 'news' | 'builder'>('jobs');
  const [employerTab, setEmployerTabState] = useState<'pipeline' | 'jobs' | 'interviews' | 'post-job' | 'profile'>('pipeline');

  const setSeekerTab = (tab: 'jobs' | 'saved' | 'applications' | 'interviews' | 'profile' | 'news' | 'builder') => {
    setSeekerTabState(tab);
    setShowLanding(false);
    try {
      localStorage.setItem('hanap_palawan_seen_landing_v4', 'true');
    } catch {}
  };

  const setEmployerTab = (tab: 'pipeline' | 'jobs' | 'interviews' | 'post-job' | 'profile') => {
    setEmployerTabState(tab);
    setShowLanding(false);
    try {
      localStorage.setItem('hanap_palawan_seen_landing_v4', 'true');
    } catch {}
  };

  // Core Data
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
      return saved ? JSON.parse(saved) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [applicants, setApplicants] = useState<Applicant[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICANTS);
      return saved ? JSON.parse(saved) : INITIAL_APPLICANTS;
    } catch {
      return INITIAL_APPLICANTS;
    }
  });

  const [interviews, setInterviews] = useState<Interview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INTERVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
    } catch {
      return INITIAL_INTERVIEWS;
    }
  });

  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_CANDIDATE_PROFILE;
    } catch {
      return INITIAL_CANDIDATE_PROFILE;
    }
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal / Active states
  const [selectedJobId, setSelectedJobId] = useState<string | null>(jobs[0]?.id || null);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);
  const [activeInterviewRoom, setActiveInterviewRoom] = useState<Interview | null>(null);
  const [schedulingForApplicant, setSchedulingForApplicant] = useState<Applicant | null>(null);
  const [applyingForJob, setApplyingForJob] = useState<Job | null>(null);

  // Palawan Government News State
  const [newsItems] = useState<PalawanNewsItem[]>(INITIAL_PALAWAN_NEWS);
  const [bookmarkedNewsIds, setBookmarkedNewsIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_NEWS);
      return saved ? JSON.parse(saved) : ['news-1', 'news-3'];
    } catch {
      return ['news-1', 'news-3'];
    }
  });
  const [activeNewsDetail, setActiveNewsDetail] = useState<PalawanNewsItem | null>(null);
  const [jobSearchKeywordFilter, setJobSearchKeywordFilter] = useState<string>('');

  // Gabay Palaweño AI Assistant State
  const [aiAssistantJob, setAiAssistantJob] = useState<Job | null>(null);
  const [aiInitialTab, setAiInitialTab] = useState<'pitch' | 'fit' | 'interview' | 'living'>('pitch');

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // LocalStorage synchronizers
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [jobs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(applicants));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [applicants]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(interviews));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [interviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(candidateProfile));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [candidateProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(savedJobIds));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [savedJobIds]);

  // Keep selectedJobId, modals, and savedJobIds in sync when jobs are deleted in real-time
  useEffect(() => {
    const validIds = new Set(jobs.map(j => j.id));
    if (selectedJobId && !validIds.has(selectedJobId)) {
      setSelectedJobId(jobs[0]?.id || null);
    }
    if (applyingForJob && !validIds.has(applyingForJob.id)) {
      setApplyingForJob(null);
    }
    if (aiAssistantJob && !validIds.has(aiAssistantJob.id)) {
      setAiAssistantJob(null);
    }
    setSavedJobIds(prev => {
      const filtered = prev.filter(id => validIds.has(id));
      return filtered.length === prev.length ? prev : filtered;
    });
  }, [jobs, selectedJobId, applyingForJob, aiAssistantJob]);

  // Firebase Auth, Connection Validation, Seeding & Real-time Synchronization
  useEffect(() => {
    // 1. Connection check as required by Firebase skill
    testConnection();

    // 2. Initialize Anonymous Auth for instant public usage
    initAuth();

    // 3. Real-time subscription to cloud jobs (including when jobs are deleted down to 0)
    const unsubJobs = subscribeToJobs(remoteJobs => {
      const nextJobs = remoteJobs || [];
      setJobs(nextJobs);
      try {
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(nextJobs));
      } catch {}
    });

    // 4. Real-time subscription to cloud applicants
    const unsubApplicants = subscribeToApplicants(remoteApplicants => {
      setApplicants(remoteApplicants || []);
    });

    // 5. Real-time subscription to cloud interviews
    const unsubInterviews = subscribeToInterviews(remoteInterviews => {
      setInterviews(remoteInterviews || []);
    });

    // 6. Real-time subscription to cloud employer verifications (submitted BIR/DTI requirements)
    const unsubVerifications = subscribeToEmployerVerifications(remoteEmployers => {
      if (remoteEmployers) {
        setEmployerVerifications(prev => {
          const map = new Map<string, UserProfile>();
          prev.forEach(item => {
            if (item.uid !== 'emp-102' && item.companyName !== 'El Nido Paradise Resort') {
              map.set(item.uid, item);
            }
          });
          remoteEmployers.forEach(item => {
            if (item.uid !== 'emp-102' && item.companyName !== 'El Nido Paradise Resort') {
              map.set(item.uid, { ...(map.get(item.uid) || {}), ...item });
            }
          });
          const merged = Array.from(map.values());
          try {
            localStorage.setItem(STORAGE_KEYS.EMPLOYER_VERIFICATIONS, JSON.stringify(merged));
          } catch {}
          return merged;
        });
      }
    });

    // 7. Cross-tab real-time storage event listener for instant 0ms sync across browser tabs
    const handleStorageSync = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.JOBS && e.newValue) {
        try {
          setJobs(JSON.parse(e.newValue));
        } catch {}
      } else if (e.key === STORAGE_KEYS.APPLICANTS && e.newValue) {
        try {
          setApplicants(JSON.parse(e.newValue));
        } catch {}
      } else if (e.key === STORAGE_KEYS.INTERVIEWS && e.newValue) {
        try {
          setInterviews(JSON.parse(e.newValue));
        } catch {}
      } else if (e.key === STORAGE_KEYS.EMPLOYER_VERIFICATIONS && e.newValue) {
        try {
          const parsed: UserProfile[] = JSON.parse(e.newValue);
          setEmployerVerifications(parsed.filter(item => item.uid !== 'emp-102' && item.companyName !== 'El Nido Paradise Resort'));
        } catch {}
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageSync);
    }

    return () => {
      if (typeof unsubJobs === 'function') unsubJobs();
      if (typeof unsubApplicants === 'function') unsubApplicants();
      if (typeof unsubInterviews === 'function') unsubInterviews();
      if (typeof unsubVerifications === 'function') unsubVerifications();
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageSync);
      }
    };
  }, []);

  // Auth Modal Controls
  const openAuthModal = (
    mode: 'signin' | 'signup' = 'signin',
    targetRole: 'seeker' | 'employer' | 'admin' = (currentRole === 'admin' ? 'employer' : currentRole),
    noticeMessage?: string
  ) => {
    setAuthModalMode(mode);
    setAuthModalTargetRole(targetRole);
    setAuthModalNotice(noticeMessage || null);
    setIsAuthModalOpen(true);
    if (noticeMessage) {
      showNotification(noticeMessage, 'info');
    }
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalNotice(null);
  };

  const signOut = async () => {
    try {
      await logOutUser();
      setCurrentUser(null);
      setUserProfileState(null);
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      localStorage.removeItem('hanap_palawan_user_profile_v4');
      localStorage.removeItem('hanap_palawan_pending_auth_role');
      setShowLanding(true);
      showNotification('Matagumpay kang nag-sign out. Piliin ang Job Seeker o Employer kapag muling mag-sign in.', 'info');
    } catch (err) {
      console.warn('Sign out error', err);
      setShowLanding(true);
      setUserProfileState(null);
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      localStorage.removeItem('hanap_palawan_pending_auth_role');
      showNotification('Matagumpay kang nag-sign out.', 'info');
    }
  };

  useEffect(() => {
    if (userProfile) {
      try {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userProfile));
      } catch (e) {
        console.warn('Storage sync error', e);
      }
    }
  }, [userProfile]);

  // Auth State Listener
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && !user.isAnonymous) {
        try {
          const pendingRole = localStorage.getItem('hanap_palawan_pending_auth_role') as UserRole | null;
          let profile = await getUserProfileFromFirestore(user.uid);
          if (profile) {
            const effectiveRole: UserRole = (pendingRole === 'seeker' || pendingRole === 'employer')
              ? pendingRole
              : (profile.role || 'seeker');
            if (profile.role !== effectiveRole) {
              profile = { ...profile, role: effectiveRole };
              await saveUserProfileToFirestore(profile);
            }
            setUserProfile(profile);
            setRole(effectiveRole);
            if (effectiveRole === 'seeker') {
              const savedSeekerProfile = await getProfileFromFirestore(user.uid);
              if (savedSeekerProfile) {
                setCandidateProfile(savedSeekerProfile);
              } else {
                const freshSeekerProfile: CandidateProfile = {
                  fullName: profile.displayName || '',
                  email: profile.email || '',
                  phone: profile.phone || '',
                  headline: 'Job Seeker · Palawan',
                  location: profile.municipality ? `${profile.municipality}, Palawan` : 'Palawan',
                  summary: '',
                  skills: [],
                  experience: [],
                  education: [],
                  portfolioUrl: '',
                  githubUrl: '',
                  linkedinUrl: '',
                  resumeFileName: '',
                  resumeLastUpdated: new Date().toLocaleDateString()
                };
                setCandidateProfile(freshSeekerProfile);
                await saveProfileToFirestore(freshSeekerProfile, user.uid);
              }
            }
          }
        } catch (err) {
          console.warn('[Firebase Auth] Profile sync error', err);
        }
      }
    });

    return () => unsubAuth();
  }, []);

  // Sync document element dark class with theme
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.setAttribute('data-theme', theme);
      }
    } catch (e) {
      console.warn('Theme sync error', e);
    }
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark', e?: React.MouseEvent) => {
    const applyTheme = () => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        document.documentElement.setAttribute('data-theme', newTheme);
      }
      setThemeState(newTheme);
    };

    // If View Transitions API is supported, perform a GPU-accelerated circular reveal
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      const isDark = newTheme === 'dark';
      const x = e?.clientX ?? (window.innerWidth / 2);
      const y = e?.clientY ?? 30;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      try {
        const transition = (document as unknown as { 
          startViewTransition: (cb: () => void) => { ready?: Promise<void> } 
        }).startViewTransition(() => {
          applyTheme();
        });

        transition.ready?.then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];
          document.documentElement.animate(
            {
              clipPath: isDark ? clipPath : [...clipPath].reverse(),
            },
            {
              duration: 350,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              pseudoElement: isDark
                ? '::view-transition-new(root)'
                : '::view-transition-old(root)',
            }
          );
        }).catch(() => {
          // Gracefully fallback
        });
      } catch {
        applyTheme();
      }
    } else {
      applyTheme();
    }

    try {
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    } catch (e) {
      console.warn('Theme storage error', e);
    }
  };

  const toggleTheme = (e?: React.MouseEvent) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme, e);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EMPLOYER_VERIFICATIONS, JSON.stringify(employerVerifications));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [employerVerifications]);

  useEffect(() => {
    // Automatically authorize trusted admin emails
    const email = (userProfile?.email || currentUser?.email || '').toLowerCase();
    if (TRUSTED_ADMIN_EMAILS.includes(email)) {
      setIsAdminAuthorized(true);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {}
    }
  }, [userProfile, currentUser]);

  // Exclusive Admin URL / Hash / Secret Keyboard Shortcut Detector
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkExclusiveAdminLink = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const isPortalAdmin = searchParams.get('portal') === 'hanap-admin';
      const isHashAdmin = window.location.hash === '#hanap-admin' || window.location.hash === '#admin';
      const isPathAdmin = window.location.pathname === '/admin' || window.location.pathname === '/hanap-admin';

      if (isPortalAdmin || isHashAdmin || isPathAdmin) {
        setShowLanding(false);
        const alreadyAuth = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
        if (alreadyAuth) {
          setIsAdminAuthorized(true);
          setRoleState('admin');
        } else {
          setIsAdminLoginModalOpen(true);
        }
      }
    };

    checkExclusiveAdminLink();
    window.addEventListener('hashchange', checkExclusiveAdminLink);
    window.addEventListener('popstate', checkExclusiveAdminLink);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowLanding(false);
        if (localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true') {
          setIsAdminAuthorized(true);
          setRoleState('admin');
        } else {
          setIsAdminLoginModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkExclusiveAdminLink);
      window.removeEventListener('popstate', checkExclusiveAdminLink);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const setRole = (role: 'seeker' | 'employer' | 'admin') => {
    setRoleState(role);
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  };

  const authorizeAdmin = (passkey: string): boolean => {
    const cleaned = passkey.trim();
    if (
      cleaned === adminPasskey ||
      cleaned.toLowerCase() === 'exceldeousman@gmail.com'
    ) {
      setIsAdminAuthorized(true);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {}
      setRole('admin');
      setShowLanding(false);
      showNotification('Naka-sign in bilang Trusted Personnel / Admin.', 'success');
      return true;
    }
    return false;
  };

  const updateAdminPasskey = (currentKey: string, newKey: string): { success: boolean; message: string } => {
    if (currentKey.trim() !== adminPasskey && (userProfile?.email || '').toLowerCase() !== 'exceldeousman@gmail.com') {
      return { success: false, message: 'Mali ang inilagay na kasalukuyang Admin Security Key.' };
    }
    if (!newKey || newKey.trim().length < 8) {
      return { success: false, message: 'Ang bagong Admin Security Key ay dapat hindi bababa sa 8 characters.' };
    }
    const updatedKey = newKey.trim();
    setAdminPasskey(updatedKey);
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSKEY, updatedKey);
    } catch {}
    showNotification('Matagumpay na napalitan ang Admin Security Key!', 'success');
    return { success: true, message: 'Matagumpay na napalitan ang Admin Security Key!' };
  };

  const recoverAdminPasskey = (masterEmail: string, recoveryCode: string, newKey: string): { success: boolean; message: string } => {
    const cleanedEmail = masterEmail.trim().toLowerCase();
    const cleanedRecovery = recoveryCode.trim();
    const cleanedNewKey = newKey.trim();

    const isEmailValid = Boolean(cleanedEmail && TRUSTED_ADMIN_EMAILS.includes(cleanedEmail));
    const isCodeValid = Boolean(
      cleanedRecovery &&
      (cleanedRecovery === MASTER_RECOVERY_CODE ||
       cleanedRecovery === 'PALAWAN-MASTER-RECOVERY' ||
       cleanedRecovery === DEFAULT_ADMIN_PASSKEY)
    );

    // Easy recovery: Admin can recover using EITHER their Authorized Master Admin Email OR the Master Recovery Code
    if (!isEmailValid && !isCodeValid) {
      return {
        success: false,
        message: 'Hindi awtorisado. Ilagay ang tamang Master Admin Email (exceldeousman@gmail.com / admin@hanappalawan.ph) O ang Master Recovery Code.'
      };
    }

    if (cleanedNewKey.length < 8) {
      return {
        success: false,
        message: 'Ang bagong Admin Security Key ay dapat hindi bababa sa 8 characters.'
      };
    }

    setAdminPasskey(cleanedNewKey);
    setIsAdminAuthorized(true);
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSKEY, cleanedNewKey);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } catch {}
    setRole('admin');
    setShowLanding(false);
    showNotification('Matagumpay na na-recover at napalitan ang Admin Security Key!', 'success');
    return {
      success: true,
      message: 'Matagumpay na na-reset ang Admin Security Key! Binubuksan na ang Admin Dashboard...'
    };
  };

  const exitAdminMode = () => {
    setIsAdminAuthorized(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
      if (typeof window !== 'undefined') {
        const cleanUrl = window.location.pathname.replace(/\/(admin|hanap-admin)$/, '') || '/';
        window.history.replaceState({}, '', cleanUrl);
      }
    } catch {}
    const fallbackRole = userProfile?.role === 'employer' ? 'employer' : 'seeker';
    setRole(fallbackRole);
    showNotification('Naka-exit na sa Admin Verification Panel.', 'info');
  };

  const switchRole = (role: 'seeker' | 'employer' | 'admin') => {
    if (role === 'admin' && !isAdminAuthorized) {
      setIsAdminLoginModalOpen(true);
      return;
    }
    setRole(role);
    if (userProfile && role !== 'admin') {
      const updated = { ...userProfile, role };
      setUserProfile(updated);
      saveUserProfileToFirestore(updated).catch(() => {});
    }
    if (role === 'employer') {
      setEmployerTab('pipeline');
      showNotification('Tagumpay! Naka-switch ka na sa Employer Portal. Maaari ka nang mag-post ng trabaho at i-setup ang iyong company profile.', 'success');
    } else if (role === 'admin') {
      showNotification('Nasa Admin Verification Panel ka na.', 'success');
    } else {
      setSeekerTab('jobs');
      showNotification('Naka-switch ka na sa Job Seeker Mode.', 'success');
    }
  };

  const updateEmployerProfile = (profileUpdates: Partial<UserProfile>): { success: boolean; error?: string } => {
    const hasBirOrDtiUpdate =
      profileUpdates.birNumber !== undefined ||
      profileUpdates.dtiNumber !== undefined ||
      profileUpdates.birDocumentUrl !== undefined ||
      profileUpdates.dtiDocumentUrl !== undefined;

    const mergedBir = profileUpdates.birNumber !== undefined ? profileUpdates.birNumber : userProfile?.birNumber || '';
    const mergedDti = profileUpdates.dtiNumber !== undefined ? profileUpdates.dtiNumber : userProfile?.dtiNumber || '';
    const mergedBirDoc = profileUpdates.birDocumentUrl !== undefined ? profileUpdates.birDocumentUrl : userProfile?.birDocumentUrl || '';
    const mergedDtiDoc = profileUpdates.dtiDocumentUrl !== undefined ? profileUpdates.dtiDocumentUrl : userProfile?.dtiDocumentUrl || '';

    // If employer entered BIR or DTI, validate strictly
    if (mergedBir || mergedDti || hasBirOrDtiUpdate) {
      if (mergedBir) {
        const birRes = validateBirTin(mergedBir);
        if (!birRes.valid) {
          showNotification(`⚠️ ${birRes.message}`, 'info');
          return { success: false, error: birRes.message };
        }
      }
      if (mergedDti) {
        const dtiRes = validateDtiNumber(mergedDti);
        if (!dtiRes.valid) {
          showNotification(`⚠️ ${dtiRes.message}`, 'info');
          return { success: false, error: dtiRes.message };
        }
      }
    }

    const isSubmittingCompleteRequirements = Boolean(mergedBir && mergedDti && mergedBirDoc && mergedDtiDoc);
    const submittedTimestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });

    const base: UserProfile = userProfile || {
      uid: 'emp-' + Date.now(),
      email: 'employer@palawan-careers.ph',
      displayName: profileUpdates.companyName || 'Employer',
      role: 'employer',
      createdAt: new Date().toLocaleDateString()
    };

    const nextStatus = isSubmittingCompleteRequirements
      ? (base.verificationStatus === 'verified' &&
         base.birNumber === mergedBir &&
         base.dtiNumber === mergedDti
          ? 'verified'
          : 'pending')
      : (base.verificationStatus || 'unverified');

    const updated: UserProfile = {
      ...base,
      ...profileUpdates,
      birNumber: mergedBir,
      dtiNumber: mergedDti.toUpperCase(),
      birDocumentUrl: mergedBirDoc,
      dtiDocumentUrl: mergedDtiDoc,
      role: 'employer',
      verificationStatus: nextStatus,
      verificationSubmittedAt: isSubmittingCompleteRequirements ? (base.verificationSubmittedAt || submittedTimestamp) : base.verificationSubmittedAt,
      verificationRejectionReason: nextStatus === 'pending' ? undefined : base.verificationRejectionReason,
      isVerified: nextStatus === 'verified'
    };

    setUserProfile(updated);
    saveUserProfileToFirestore(updated).catch(() => {});

    setEmployerVerifications(prev => {
      const filteredPrev = prev.filter(e => e.uid !== 'emp-102' && e.companyName !== 'El Nido Paradise Resort');
      const exists = filteredPrev.some(e => e.uid === updated.uid);
      const nextList = exists
        ? filteredPrev.map(e => (e.uid === updated.uid ? updated : e))
        : [updated, ...filteredPrev];
      try {
        localStorage.setItem(STORAGE_KEYS.EMPLOYER_VERIFICATIONS, JSON.stringify(nextList));
      } catch {}
      return nextList;
    });

    if (isSubmittingCompleteRequirements && nextStatus === 'pending') {
      showNotification('Matagumpay na naisumite ang inyong BIR at DTI requirements! Mangyaring maghintay ng 1–2 business days para sa pagsusuri at pag-apruba ng Admin.', 'success');
    } else {
      showNotification('Tagumpay na nai-update ang Company Profile!', 'success');
    }

    return { success: true };
  };

  const reviewEmployerVerification = (uid: string, status: 'verified' | 'rejected', rejectionReason?: string) => {
    setEmployerVerifications(prev => {
      const nextList = prev
        .filter(emp => emp.uid !== 'emp-102' && emp.companyName !== 'El Nido Paradise Resort')
        .map(emp => {
          if (emp.uid === uid) {
            const updatedEmp: UserProfile = {
              ...emp,
              verificationStatus: status,
              isVerified: status === 'verified',
              verificationRejectionReason: status === 'rejected' ? (rejectionReason || 'Hindi tugma o malabo ang isinumiteng BIR / DTI document photo.') : undefined
            };
            saveUserProfileToFirestore(updatedEmp).catch(() => {});
            return updatedEmp;
          }
          return emp;
        });
      try {
        localStorage.setItem(STORAGE_KEYS.EMPLOYER_VERIFICATIONS, JSON.stringify(nextList));
      } catch {}
      return nextList;
    });

    setUserProfile(prev => {
      if (prev && prev.uid === uid) {
        return {
          ...prev,
          verificationStatus: status,
          isVerified: status === 'verified',
          verificationRejectionReason: status === 'rejected' ? (rejectionReason || 'Hindi tugma o malabo ang isinumiteng BIR / DTI document photo.') : undefined
        };
      }
      return prev;
    });

    if (status === 'verified') {
      showNotification('Tagumpay na na-aprubahan at na-verify ang Employer! Maaari na silang mag-post ng trabaho.', 'success');
    } else {
      showNotification('Tinanggihan (Rejected) ang verification request ng employer.', 'info');
    }
  };

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    const id = 'notif-' + Date.now();
    setNotifications(prev => [...prev, { id, message, type, timestamp: new Date().toLocaleTimeString() }]);
    setTimeout(() => {
      dismissNotification(id);
    }, 4500);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const exists = prev.includes(jobId);
      const updated = exists ? prev.filter(id => id !== jobId) : [...prev, jobId];
      showNotification(exists ? 'Tinanggal sa Saved Jobs' : 'Nai-save sa inyong Saved Jobs list', 'info');
      return updated;
    });
  };

  const toggleBookmarkNews = (newsId: string) => {
    setBookmarkedNewsIds(prev => {
      const isBookmarked = prev.includes(newsId);
      const updated = isBookmarked ? prev.filter(id => id !== newsId) : [...prev, newsId];
      try {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKED_NEWS, JSON.stringify(updated));
      } catch (e) {
        console.warn('Storage sync error', e);
      }
      showNotification(
        isBookmarked 
          ? 'Inalis sa saved Palawan government news updates' 
          : 'Nai-save ang balita sa inyong Saved Palawan Bulletins'
      );
      return updated;
    });
  };

  const navigateToJobSearchWithKeyword = (keyword: string) => {
    setJobSearchKeywordFilter(keyword);
    setSeekerTab('jobs');
    showNotification(`Nai-filter ang mga trabaho para sa: "${keyword}"`);
  };

  const openAiAssistant = (job: Job, tab: 'pitch' | 'fit' | 'interview' | 'living' = 'pitch') => {
    setAiAssistantJob(job);
    setAiInitialTab(tab);
  };

  const addJob = (jobData: Omit<Job, 'id' | 'postedDate' | 'employerId'>): Job => {
    const employerId = currentUser?.uid || 'emp-local';
    const company = userProfile?.companyName || userProfile?.displayName || jobData.company;
    const newJob: Job = {
      ...jobData,
      company,
      id: 'job-' + Date.now(),
      postedDate: new Date().toISOString(),
      employerId
    };
    setJobs(prev => [newJob, ...prev]);
    setSelectedJobId(newJob.id);
    saveJobToFirestore(newJob);
    showNotification(`Na-publish ang job opening: "${newJob.title}"`);
    return newJob;
  };

  const deleteJob = (jobId: string) => {
    setJobs(prev => {
      const updated = prev.filter(j => j.id !== jobId);
      try {
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setApplicants(prev => prev.filter(a => a.jobId !== jobId));
    setSavedJobIds(prev => prev.filter(id => id !== jobId));
    deleteJobFromFirestore(jobId);
    if (selectedJobId === jobId) {
      setSelectedJobId(jobs.find(j => j.id !== jobId)?.id || null);
    }
    if (applyingForJob?.id === jobId) {
      setApplyingForJob(null);
    }
    if (aiAssistantJob?.id === jobId) {
      setAiAssistantJob(null);
    }
    showNotification('Tinanggal na ang job posting at na-update nang real-time sa Job Seekers feed.', 'info');
  };

  const applyToJob = (data: {
    jobId: string;
    fullName: string;
    email: string;
    phone: string;
    expectedSalary: string;
    availability: string;
    coverNote: string;
    screeningAnswers: { questionId: string; question: string; answer: string }[];
    resumeFileName?: string;
  }): Applicant => {
    const targetJob = jobs.find(j => j.id === data.jobId);
    const newApplicant: Applicant = {
      id: 'app-' + Date.now(),
      jobId: data.jobId,
      jobTitle: targetJob?.title || 'Position',
      company: targetJob?.company || 'Company',
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      headline: candidateProfile.headline,
      location: candidateProfile.location,
      summary: candidateProfile.summary,
      avatarUrl: candidateProfile.avatarUrl,
      skills: candidateProfile.skills,
      experience: candidateProfile.experience,
      education: candidateProfile.education,
      portfolioUrl: candidateProfile.portfolioUrl,
      githubUrl: candidateProfile.githubUrl,
      linkedinUrl: candidateProfile.linkedinUrl,
      resumeFileName: data.resumeFileName || candidateProfile.resumeFileName,
      appliedAt: new Date().toISOString(),
      expectedSalary: data.expectedSalary,
      availability: data.availability,
      coverNote: data.coverNote,
      screeningAnswers: data.screeningAnswers,
      status: 'applied',
      matchScore: 94,
      employerNotes: [],
      seekerId: currentUser?.uid || 'seeker-local'
    };

    setApplicants(prev => [newApplicant, ...prev]);
    saveApplicantToFirestore(newApplicant);
    showNotification(`Naipadala ang aplikasyon sa ${newApplicant.company}!`);
    return newApplicant;
  };

  const updateApplicantStatus = (applicantId: string, status: ApplicantStatus) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === applicantId) {
        const updated = { ...a, status };
        saveApplicantToFirestore(updated);
        return updated;
      }
      return a;
    }));
    const statusLabels: Record<ApplicantStatus, string> = {
      applied: 'Applied',
      reviewing: 'In Review',
      interview_scheduled: 'Interview Scheduled',
      offered: 'Offer Extended',
      rejected: 'Declined'
    };
    showNotification(`Candidate status updated to: ${statusLabels[status]}`);
  };

  const addEmployerNote = (applicantId: string, text: string) => {
    const newNote = {
      id: 'note-' + Date.now(),
      author: 'Elena Cruz (Hiring Team)',
      text,
      createdAt: new Date().toISOString()
    };
    setApplicants(prev => prev.map(a => {
      if (a.id === applicantId) {
        const updated = {
          ...a,
          employerNotes: [newNote, ...a.employerNotes]
        };
        saveApplicantToFirestore(updated);
        return updated;
      }
      return a;
    }));
    showNotification('Nai-save ang evaluation note');
  };

  const rateApplicant = (applicantId: string, rating: number) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === applicantId) {
        const updated = { ...a, rating };
        saveApplicantToFirestore(updated);
        return updated;
      }
      return a;
    }));
  };

  const scheduleInterview = (data: Omit<Interview, 'id' | 'status'>): Interview => {
    const newInterview: Interview = {
      ...data,
      id: 'int-' + Date.now(),
      status: 'scheduled'
    };

    setInterviews(prev => [newInterview, ...prev]);
    saveInterviewToFirestore(newInterview);

    setApplicants(prev => prev.map(a => {
      if (a.id === data.applicantId) {
        const updated = {
          ...a,
          status: 'interview_scheduled' as const,
          employerNotes: [
            {
              id: 'note-' + Date.now(),
              author: 'Elena Cruz (Hiring Team)',
              text: `Scheduled ${data.stage} interview for ${data.date} at ${data.time} (${data.format.toUpperCase()}).`,
              createdAt: new Date().toISOString()
            },
            ...a.employerNotes
          ]
        };
        saveApplicantToFirestore(updated);
        return updated;
      }
      return a;
    }));

    showNotification(`Nai-schedule ang interview kay ${data.applicantName}!`);
    return newInterview;
  };

  const updateInterview = (interviewId: string, updates: Partial<Interview>) => {
    setInterviews(prev => prev.map(i => {
      if (i.id === interviewId) {
        const updated = { ...i, ...updates };
        saveInterviewToFirestore(updated);
        return updated;
      }
      return i;
    }));
    showNotification('Interview schedule updated');
  };

  const submitInterviewFeedback = (interviewId: string, feedback: InterviewFeedback) => {
    setInterviews(prev => prev.map(i => {
      if (i.id === interviewId) {
        const updated = { ...i, status: 'completed' as const, feedback };
        saveInterviewToFirestore(updated);
        return updated;
      }
      return i;
    }));
    showNotification('Nai-save ang interview feedback at score rubric');
  };

  const updateCandidateProfile = (updates: Partial<CandidateProfile>) => {
    setCandidateProfile(prev => {
      const updated = { ...prev, ...updates };
      const uid = currentUser?.uid || 'default-seeker';
      saveProfileToFirestore(updated, uid);
      return updated;
    });
    showNotification('Na-update ang inyong profile at resume info!');
  };

  const resetDemoData = () => {
    setJobs(INITIAL_JOBS);
    setApplicants(INITIAL_APPLICANTS);
    setInterviews(INITIAL_INTERVIEWS);
    setCandidateProfile(INITIAL_CANDIDATE_PROFILE);
    setSavedJobIds(['job-101', 'job-107']);
    setBookmarkedNewsIds(['news-1', 'news-3']);
    setSelectedJobId(INITIAL_JOBS[0].id);
    setSelectedApplicantId(null);
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Storage clear error', e);
    }
    showNotification('Nai-reset ang demo data sa orihinal na Palawan job listings');
  };

  const reviewApplicant = applicants.find(a => a.id === selectedApplicantId) || null;

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole,
        seekerTab,
        setSeekerTab,
        employerTab,
        setEmployerTab,
        jobs,
        applicants,
        interviews,
        candidateProfile,
        savedJobIds,
        newsItems,
        bookmarkedNewsIds,
        selectedJobId,
        setSelectedJobId,
        selectedApplicantId,
        setSelectedApplicantId,
        reviewApplicant,
        activeInterviewRoom,
        setActiveInterviewRoom,
        schedulingForApplicant,
        setSchedulingForApplicant,
        applyingForJob,
        setApplyingForJob,
        activeNewsDetail,
        setActiveNewsDetail,
        jobSearchKeywordFilter,
        setJobSearchKeywordFilter,
        navigateToJobSearchWithKeyword,
        aiAssistantJob,
        setAiAssistantJob,
        aiInitialTab,
        openAiAssistant,
        toggleSaveJob,
        toggleBookmarkNews,
        addJob,
        deleteJob,
        applyToJob,
        updateApplicantStatus,
        addEmployerNote,
        rateApplicant,
        scheduleInterview,
        updateInterview,
        submitInterviewFeedback,
        updateCandidateProfile,
        resetDemoData,
        theme,
        setTheme,
        toggleTheme,
        notifications,
        dismissNotification,
        showNotification,
        currentUser,
        userProfile,
        setUserProfile,
        isAuthModalOpen,
        authModalMode,
        authModalTargetRole,
        authModalNotice,
        openAuthModal,
        closeAuthModal,
        signOut,
        switchRole,
        updateEmployerProfile,
        employerVerifications,
        reviewEmployerVerification,
        isAdminAuthorized,
        authorizeAdmin,
        updateAdminPasskey,
        recoverAdminPasskey,
        exitAdminMode,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        showLanding,
        setShowLanding,
        dismissLanding
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
