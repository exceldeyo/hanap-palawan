export type WorkplaceType = 'Remote' | 'Hybrid' | 'Onsite';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior' | 'Lead / Director';
export type ApplicantStatus = 'applied' | 'reviewing' | 'interview_scheduled' | 'offered' | 'rejected';

export interface ScreeningQuestion {
  id: string;
  question: string;
  required: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workplaceType: WorkplaceType;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: 'PHP' | 'USD';
  salaryPeriod: 'month' | 'year' | 'hour';
  department: string;
  urgency?: 'Urgent' | 'Featured' | 'New';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  skills: string[];
  screeningQuestions: ScreeningQuestion[];
  postedDate: string;
  employerId: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface CandidateProfile {
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  location: string;
  summary: string;
  avatarUrl?: string;
  skills: string[];
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeFileName: string;
  resumeLastUpdated: string;
  experience: ExperienceItem[];
  education: EducationItem[];
}

export interface EmployerNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface ScreeningAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export interface Applicant {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  location: string;
  summary: string;
  avatarUrl?: string;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeFileName: string;
  appliedAt: string;
  expectedSalary: string;
  availability: string;
  coverNote?: string;
  screeningAnswers: ScreeningAnswer[];
  status: ApplicantStatus;
  matchScore: number;
  rating?: number;
  employerNotes: EmployerNote[];
}

export interface InterviewFeedback {
  ratings: {
    technical: number;
    communication: number;
    cultureFit: number;
    islandReadiness: number;
  };
  notes: string;
  recommendation: 'strong_hire' | 'hire' | 'hold' | 'no_hire';
  submittedAt: string;
}

export interface Interview {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  jobId: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  durationMinutes: number;
  format: 'video' | 'phone' | 'onsite';
  stage: string;
  interviewerName: string;
  interviewerRole: string;
  meetingLink?: string;
  locationOrDetails: string;
  notesOrAgenda: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback?: InterviewFeedback;
}

export type PalawanNewsCategory = 
  | 'Economic Development' 
  | 'Infrastructure & Energy' 
  | 'Tourism & Hospitality' 
  | 'Agriculture & Fisheries' 
  | 'Employment & Skills';

export interface PalawanNewsItem {
  id: string;
  title: string;
  headlineTagalog?: string;
  category: PalawanNewsCategory;
  publishedDate: string;
  relativeTime: string;
  municipality: string;
  source: string;
  sourceDepartment: string;
  sourceUrl: string;
  snippet: string;
  fullBriefing: string[];
  economicImpact: string;
  jobMarketImplications: {
    estimatedJobs: string;
    demandSectors: string[];
    actionableAdvice: string;
  };
  relatedSearchKeywords: string[];
  isFeatured?: boolean;
}

export type UserRole = 'seeker' | 'employer';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  municipality?: string;
  companyName?: string;
  phone?: string;
  createdAt: string;
}
