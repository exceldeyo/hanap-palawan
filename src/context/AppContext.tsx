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
  saveJobToFirestore,
  deleteJobFromFirestore,
  saveApplicantToFirestore,
  saveInterviewToFirestore,
  saveProfileToFirestore,
  getProfileFromFirestore,
  getUserProfileFromFirestore,
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
  currentRole: 'seeker' | 'employer';
  setRole: (role: 'seeker' | 'employer') => void;
  seekerTab: 'jobs' | 'saved' | 'applications' | 'interviews' | 'profile' | 'news';
  setSeekerTab: (tab: 'jobs' | 'saved' | 'applications' | 'interviews' | 'profile' | 'news') => void;
  employerTab: 'pipeline' | 'jobs' | 'interviews' | 'post-job';
  setEmployerTab: (tab: 'pipeline' | 'jobs' | 'interviews' | 'post-job') => void;

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

  // Auth & User Accounts
  currentUser: User | null;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  authModalTargetRole: 'seeker' | 'employer';
  openAuthModal: (mode?: 'signin' | 'signup', targetRole?: 'seeker' | 'employer') => void;
  closeAuthModal: () => void;
  signOut: () => Promise<void>;
  showLanding: boolean;
  setShowLanding: React.Dispatch<React.SetStateAction<boolean>>;
  dismissLanding: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  JOBS: 'hanap_palawan_jobs_v5',
  APPLICANTS: 'hanap_palawan_applicants_v5',
  INTERVIEWS: 'hanap_palawan_interviews_v5',
  PROFILE: 'hanap_palawan_profile_v5',
  SAVED_JOBS: 'hanap_palawan_saved_jobs_v5',
  ROLE: 'hanap_palawan_role_v5',
  BOOKMARKED_NEWS: 'hanap_palawan_bookmarked_news_v5',
  THEME: 'hanap_palawan_theme_v5',
  USER_PROFILE: 'hanap_palawan_user_profile_v5'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('hanap_palawan_user_profile_v4');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showLanding, setShowLanding] = useState<boolean>(() => {
    try {
      const savedUser = localStorage.getItem('hanap_palawan_user_profile_v4');
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
  const [authModalTargetRole, setAuthModalTargetRole] = useState<'seeker' | 'employer'>('seeker');

  // Role & Navigation
  const [currentRole, setRoleState] = useState<'seeker' | 'employer'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
      return saved === 'employer' ? 'employer' : 'seeker';
    } catch {
      return 'seeker';
    }
  });

  // Theme state with localStorage persistence & system preference detection
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch {
      return 'light';
    }
  });

  const [seekerTab, setSeekerTab] = useState<'jobs' | 'saved' | 'applications' | 'interviews' | 'profile' | 'news'>('jobs');
  const [employerTab, setEmployerTab] = useState<'pipeline' | 'jobs' | 'interviews' | 'post-job'>('pipeline');

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

  // Firebase Auth, Connection Validation, Seeding & Real-time Synchronization
  useEffect(() => {
    // 1. Connection check as required by Firebase skill
    testConnection();

    // 2. Initialize Anonymous Auth for instant public usage
    initAuth();

    // 3. Real-time subscription to cloud jobs
    const unsubJobs = subscribeToJobs(remoteJobs => {
      setJobs(remoteJobs || []);
    });

    // 5. Real-time subscription to cloud applicants
    const unsubApplicants = subscribeToApplicants(remoteApplicants => {
      if (remoteApplicants && remoteApplicants.length > 0) {
        setApplicants(remoteApplicants);
      }
    });

    // 6. Real-time subscription to cloud interviews
    const unsubInterviews = subscribeToInterviews(remoteInterviews => {
      if (remoteInterviews && remoteInterviews.length > 0) {
        setInterviews(remoteInterviews);
      }
    });

    return () => {
      if (typeof unsubJobs === 'function') unsubJobs();
      if (typeof unsubApplicants === 'function') unsubApplicants();
      if (typeof unsubInterviews === 'function') unsubInterviews();
    };
  }, []);

  // Auth Modal Controls
  const openAuthModal = (mode: 'signin' | 'signup' = 'signin', targetRole: 'seeker' | 'employer' = currentRole) => {
    setAuthModalMode(mode);
    setAuthModalTargetRole(targetRole);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signOut = async () => {
    try {
      await logOutUser();
      setCurrentUser(null);
      setUserProfile(null);
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      showNotification('Naka-sign out ka na.', 'info');
    } catch (err) {
      console.warn('Sign out error', err);
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
          const profile = await getUserProfileFromFirestore(user.uid);
          if (profile) {
            setUserProfile(profile);
            if (profile.role) {
              setRoleState(profile.role);
            }
            if (profile.role === 'seeker') {
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

  const setRole = (role: 'seeker' | 'employer') => {
    setRoleState(role);
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
    } catch (e) {
      console.warn('Storage sync error', e);
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
    setJobs(prev => prev.filter(j => j.id !== jobId));
    setApplicants(prev => prev.filter(a => a.jobId !== jobId));
    deleteJobFromFirestore(jobId);
    if (selectedJobId === jobId) {
      setSelectedJobId(jobs.find(j => j.id !== jobId)?.id || null);
    }
    showNotification('Tinanggal ang job posting', 'info');
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
        currentUser,
        userProfile,
        setUserProfile,
        isAuthModalOpen,
        authModalMode,
        authModalTargetRole,
        openAuthModal,
        closeAuthModal,
        signOut,
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
