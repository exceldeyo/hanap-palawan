import { Job, Applicant, Interview, CandidateProfile } from '../types';

export const INITIAL_CANDIDATE_PROFILE: CandidateProfile = {
  fullName: '',
  email: '',
  phone: '',
  headline: 'Job Seeker · Palawan',
  location: 'Palawan, Philippines',
  summary: '',
  avatarUrl: '',
  skills: [],
  portfolioUrl: '',
  githubUrl: '',
  linkedinUrl: '',
  resumeFileName: '',
  resumeLastUpdated: new Date().toLocaleDateString(),
  experience: [],
  education: []
};

export const INITIAL_JOBS: Job[] = [];

export const INITIAL_APPLICANTS: Applicant[] = [];

export const INITIAL_INTERVIEWS: Interview[] = [];
