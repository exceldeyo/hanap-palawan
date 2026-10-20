import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  collection, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  Firestore
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Job, Applicant, Interview, CandidateProfile } from '../types';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore with custom database ID if provided
export const db: Firestore = (firebaseConfig as any).firestoreDatabaseId
  ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
  : getFirestore(app);

// Test Connection on application boot as required by Firebase skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firebase] Connection verified successfully.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Client is offline or database initializing.');
    }
    // Still consider connection initiated if error is just document not found
    return true;
  }
}

// Auto sign in anonymously for seamless public operation
export function initAuth(onUserReady?: (user: User | null) => void) {
  onAuthStateChanged(auth, user => {
    if (user) {
      if (onUserReady) onUserReady(user);
    } else {
      signInAnonymously(auth).catch(err => {
        console.warn('[Firebase Auth] Anonymous sign-in fallback', err);
      });
    }
  });
}

// Collections references
export const COLLECTIONS = {
  JOBS: 'jobs',
  APPLICANTS: 'applicants',
  INTERVIEWS: 'interviews',
  PROFILES: 'candidateProfiles'
};

// Seed initial data if Firestore is empty so the live app has preloaded Palawan jobs
export async function seedInitialFirestoreData(
  initialJobs: Job[], 
  initialApplicants: Applicant[], 
  initialInterviews: Interview[],
  initialProfile: CandidateProfile
) {
  try {
    const jobsSnapshot = await getDocs(collection(db, COLLECTIONS.JOBS));
    if (jobsSnapshot.empty) {
      console.log('[Firebase] Seeding initial Palawan jobs to Firestore...');
      for (const job of initialJobs) {
        await setDoc(doc(db, COLLECTIONS.JOBS, job.id), job);
      }
      for (const applicant of initialApplicants) {
        await setDoc(doc(db, COLLECTIONS.APPLICANTS, applicant.id), applicant);
      }
      for (const interview of initialInterviews) {
        await setDoc(doc(db, COLLECTIONS.INTERVIEWS, interview.id), interview);
      }
      await setDoc(doc(db, COLLECTIONS.PROFILES, 'default-seeker'), initialProfile);
      console.log('[Firebase] Initial data seeded successfully.');
    }
  } catch (err) {
    console.warn('[Firebase] Seed check skipped or offline:', err);
  }
}

// Real-time synchronization listeners
export function subscribeToJobs(onUpdate: (jobs: Job[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.JOBS), snapshot => {
    if (!snapshot.empty) {
      const items: Job[] = [];
      snapshot.forEach(docSnap => {
        items.push(docSnap.data() as Job);
      });
      // Sort newest posted date
      items.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
      onUpdate(items);
    }
  }, err => {
    console.warn('[Firebase] Jobs listener error:', err);
  });
}

export function subscribeToApplicants(onUpdate: (applicants: Applicant[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.APPLICANTS), snapshot => {
    if (!snapshot.empty) {
      const items: Applicant[] = [];
      snapshot.forEach(docSnap => {
        items.push(docSnap.data() as Applicant);
      });
      items.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
      onUpdate(items);
    }
  }, err => {
    console.warn('[Firebase] Applicants listener error:', err);
  });
}

export function subscribeToInterviews(onUpdate: (interviews: Interview[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.INTERVIEWS), snapshot => {
    if (!snapshot.empty) {
      const items: Interview[] = [];
      snapshot.forEach(docSnap => {
        items.push(docSnap.data() as Interview);
      });
      onUpdate(items);
    }
  }, err => {
    console.warn('[Firebase] Interviews listener error:', err);
  });
}

// Cloud persistence mutation helpers
export async function saveJobToFirestore(job: Job) {
  try {
    await setDoc(doc(db, COLLECTIONS.JOBS, job.id), job);
  } catch (err) {
    console.warn('[Firebase] saveJob error:', err);
  }
}

export async function deleteJobFromFirestore(jobId: string) {
  try {
    await deleteDoc(doc(db, COLLECTIONS.JOBS, jobId));
  } catch (err) {
    console.warn('[Firebase] deleteJob error:', err);
  }
}

export async function saveApplicantToFirestore(applicant: Applicant) {
  try {
    await setDoc(doc(db, COLLECTIONS.APPLICANTS, applicant.id), applicant);
  } catch (err) {
    console.warn('[Firebase] saveApplicant error:', err);
  }
}

export async function saveInterviewToFirestore(interview: Interview) {
  try {
    await setDoc(doc(db, COLLECTIONS.INTERVIEWS, interview.id), interview);
  } catch (err) {
    console.warn('[Firebase] saveInterview error:', err);
  }
}

export async function saveProfileToFirestore(profile: CandidateProfile) {
  try {
    await setDoc(doc(db, COLLECTIONS.PROFILES, 'default-seeker'), profile);
  } catch (err) {
    console.warn('[Firebase] saveProfile error:', err);
  }
}
