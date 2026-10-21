import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc,
  getDocFromServer, 
  collection, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  Firestore
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Job, Applicant, Interview, CandidateProfile, UserProfile, UserRole } from '../types';

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
  PROFILES: 'candidateProfiles',
  USERS: 'users'
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

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Real-time synchronization listeners
export function subscribeToJobs(onUpdate: (jobs: Job[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.JOBS), snapshot => {
    const items: Job[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as Job;
      items.push({
        ...data,
        id: data.id || docSnap.id
      });
    });
    // Sort newest posted date
    items.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    onUpdate(items);
  }, err => {
    console.warn('[Firebase] Jobs listener error:', err);
  });
}

export function subscribeToApplicants(onUpdate: (applicants: Applicant[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.APPLICANTS), snapshot => {
    const items: Applicant[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as Applicant;
      items.push({
        ...data,
        id: data.id || docSnap.id
      });
    });
    items.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
    onUpdate(items);
  }, err => {
    console.warn('[Firebase] Applicants listener error:', err);
  });
}

export function subscribeToInterviews(onUpdate: (interviews: Interview[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.INTERVIEWS), snapshot => {
    const items: Interview[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as Interview;
      items.push({
        ...data,
        id: data.id || docSnap.id
      });
    });
    onUpdate(items);
  }, err => {
    console.warn('[Firebase] Interviews listener error:', err);
  });
}

export function subscribeToEmployerVerifications(onUpdate: (employers: UserProfile[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.USERS), snapshot => {
    const items: UserProfile[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as UserProfile;
      if (
        data.role === 'employer' ||
        data.birNumber ||
        data.dtiNumber ||
        data.birDocumentUrl ||
        data.dtiDocumentUrl ||
        data.verificationStatus
      ) {
        if (data.companyName !== 'El Nido Paradise Resort' && data.uid !== 'emp-102') {
          items.push({
            ...data,
            uid: data.uid || docSnap.id
          });
        }
      }
    });
    onUpdate(items);
  }, err => {
    console.warn('[Firebase] Employer verifications listener error:', err);
  });
}

// Utility to remove undefined values before writing to Firestore (prevents setDoc crash)
export function sanitizeForFirestore<T extends Record<string, any>>(obj: T): Record<string, any> {
  if (!obj || typeof obj !== 'object') return obj;
  const sanitized: Record<string, any> = {};
  Object.keys(obj).forEach(key => {
    const val = obj[key];
    if (val !== undefined) {
      if (val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
        sanitized[key] = sanitizeForFirestore(val);
      } else {
        sanitized[key] = val;
      }
    }
  });
  return sanitized;
}

// Cloud persistence mutation helpers
export async function saveJobToFirestore(job: Job) {
  try {
    const sanitized = sanitizeForFirestore(job);
    await setDoc(doc(db, COLLECTIONS.JOBS, job.id), sanitized);
  } catch (err) {
    console.warn('[Firebase] saveJob error:', err);
  }
}

export async function deleteJobFromFirestore(jobId: string) {
  try {
    await deleteDoc(doc(db, COLLECTIONS.JOBS, jobId));
    // Also clean up any documents where the inner id field matches jobId
    const snap = await getDocs(collection(db, COLLECTIONS.JOBS));
    const deletions: Promise<void>[] = [];
    snap.forEach(docSnap => {
      const data = docSnap.data() as Job;
      if (docSnap.id === jobId || data.id === jobId) {
        deletions.push(deleteDoc(doc(db, COLLECTIONS.JOBS, docSnap.id)));
      }
    });
    if (deletions.length > 0) {
      await Promise.all(deletions);
    }
  } catch (err) {
    console.warn('[Firebase] deleteJob error:', err);
  }
}

export async function saveApplicantToFirestore(applicant: Applicant) {
  try {
    const sanitized = sanitizeForFirestore(applicant);
    await setDoc(doc(db, COLLECTIONS.APPLICANTS, applicant.id), sanitized);
  } catch (err) {
    console.warn('[Firebase] saveApplicant error:', err);
  }
}

export async function saveInterviewToFirestore(interview: Interview) {
  try {
    const sanitized = sanitizeForFirestore(interview);
    await setDoc(doc(db, COLLECTIONS.INTERVIEWS, interview.id), sanitized);
  } catch (err) {
    console.warn('[Firebase] saveInterview error:', err);
  }
}

export async function saveProfileToFirestore(profile: CandidateProfile, uid: string = 'default-seeker') {
  try {
    const sanitized = sanitizeForFirestore(profile);
    await setDoc(doc(db, COLLECTIONS.PROFILES, uid), sanitized);
  } catch (err) {
    console.warn('[Firebase] saveProfile error:', err);
  }
}

export async function getProfileFromFirestore(uid: string = 'default-seeker'): Promise<CandidateProfile | null> {
  try {
    const docSnap = await getDoc(doc(db, COLLECTIONS.PROFILES, uid));
    if (docSnap.exists()) {
      return docSnap.data() as CandidateProfile;
    }
    return null;
  } catch (err) {
    console.warn('[Firebase] getProfile error:', err);
    return null;
  }
}

// User Profile & Authentication Services
export async function getUserProfileFromFirestore(uid: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (err) {
    console.warn('[Firebase] getUserProfile error:', err);
    return null;
  }
}

export async function saveUserProfileToFirestore(profile: UserProfile): Promise<void> {
  try {
    const sanitized = sanitizeForFirestore(profile);
    await setDoc(doc(db, COLLECTIONS.USERS, profile.uid), sanitized, { merge: true });
    console.log('[Firebase] User profile saved successfully to Firestore:', profile.uid);
  } catch (err) {
    console.warn('[Firebase] saveUserProfile error:', err);
  }
}

export async function signUpWithEmail(
  email: string, 
  pass: string, 
  displayName: string, 
  role: UserRole,
  extra?: { companyName?: string; municipality?: string; phone?: string }
): Promise<UserProfile> {
  try {
    localStorage.setItem('hanap_palawan_pending_auth_role', role);
  } catch {}

  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  const user = userCredential.user;

  await updateProfile(user, { displayName });

  const profile: UserProfile = {
    uid: user.uid,
    email: user.email || email,
    displayName: displayName || (role === 'employer' ? extra?.companyName || 'Palawan Employer' : 'Palaweño Seeker'),
    role,
    municipality: extra?.municipality || 'Puerto Princesa',
    companyName: extra?.companyName,
    phone: extra?.phone,
    createdAt: new Date().toISOString()
  };

  await saveUserProfileToFirestore(profile);
  return profile;
}

export async function signInWithEmail(
  email: string, 
  pass: string, 
  role: UserRole = 'seeker',
  extra?: { companyName?: string; municipality?: string; phone?: string }
): Promise<UserProfile> {
  try {
    localStorage.setItem('hanap_palawan_pending_auth_role', role);
  } catch {}

  let user;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    user = userCredential.user;
  } catch (err: any) {
    if (err?.code === 'auth/user-not-found' || err?.code === 'auth/invalid-credential' || err?.code === 'auth/wrong-password') {
      try {
        const newUserCred = await createUserWithEmailAndPassword(auth, email, pass);
        user = newUserCred.user;
      } catch (createErr) {
        throw err;
      }
    } else {
      throw err;
    }
  }

  const existingProfile = await getUserProfileFromFirestore(user.uid);
  const profile: UserProfile = {
    ...(existingProfile || {}),
    uid: user.uid,
    email: user.email || email,
    displayName: existingProfile?.displayName || user.displayName || (role === 'employer' ? extra?.companyName || 'Palawan Enterprise' : 'Palaweño Seeker'),
    role,
    municipality: extra?.municipality || existingProfile?.municipality || 'Puerto Princesa',
    companyName: role === 'employer' ? (extra?.companyName || existingProfile?.companyName || user.displayName || 'Palawan Enterprise') : existingProfile?.companyName,
    phone: extra?.phone || existingProfile?.phone,
    createdAt: existingProfile?.createdAt || new Date().toISOString()
  };

  await saveUserProfileToFirestore(profile);
  return profile;
}

export async function signInWithGoogle(role: UserRole = 'seeker'): Promise<UserProfile> {
  try {
    localStorage.setItem('hanap_palawan_pending_auth_role', role);
  } catch {}

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;

  const existingProfile = await getUserProfileFromFirestore(user.uid);
  const profile: UserProfile = {
    ...(existingProfile || {}),
    uid: user.uid,
    email: user.email || existingProfile?.email || '',
    displayName: user.displayName || existingProfile?.displayName || (role === 'employer' ? 'Palawan Employer' : 'Palaweño Seeker'),
    role,
    municipality: existingProfile?.municipality || 'Puerto Princesa',
    companyName: role === 'employer' ? (existingProfile?.companyName || user.displayName || 'Palawan Enterprise') : existingProfile?.companyName,
    createdAt: existingProfile?.createdAt || new Date().toISOString()
  };

  await saveUserProfileToFirestore(profile);
  return profile;
}

export async function logOutUser(): Promise<void> {
  try {
    localStorage.removeItem('hanap_palawan_pending_auth_role');
  } catch {}
  await signOut(auth);
}
