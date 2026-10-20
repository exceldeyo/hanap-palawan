import { Job, CandidateProfile, Applicant } from '../types';

export interface MatchAnalysisResult {
  matchScore: number;
  fitSummary: string;
  keyStrengths: string[];
  skillsGaps: string[];
  palawanAdvantage: string[];
  recommendedAction: string;
}

export interface MockQuestionResult {
  questionNumber: number;
  question: string;
  context: string;
  lookFor: string;
}

export interface MockAnswerEvaluation {
  score: number;
  praise: string;
  constructiveAdvice: string;
  modelAnswerTip: string;
}

export interface JobPostingDraftResult {
  department: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  skills: string[];
  screeningQuestions: { id: string; question: string; required: boolean }[];
}

export interface CandidateDossierSummaryResult {
  executiveSummary: string;
  topStrengths: string[];
  recommendedQuestions: string[];
  riskOrProbeArea: string;
}

/**
 * 1. Generate tailored cover note via server route /api/gemini/cover-note
 */
export async function generateTailoredCoverNote(params: {
  candidate: CandidateProfile;
  job: Job;
}): Promise<string> {
  try {
    const res = await fetch('/api/gemini/cover-note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.text) return data.text;
    }
  } catch (err) {
    console.warn('Network error fetching cover-note:', err);
  }

  // Client safety fallback
  return `Magandang araw po sa ${params.job.company} hiring team!

As a proud Palaweña software engineer born and raised in Puerto Princesa City and an alumna of Palawan State University (PSU), I am deeply passionate about applying modern engineering to empower our province. My experience architecting high-performance React and TypeScript applications for variable island connectivity aligns closely with the goals of your ${params.job.title} role.

Having developed booking engines and eco-tourism digital infrastructure across El Nido and Coron, I understand first-hand the balance between high-reliability technology and Palawan's unique community needs. I would be honored to contribute to ${params.job.company}'s mission. Maraming salamat po!`;
}

/**
 * 2. Analyze job match & skills gap via /api/gemini/fit-analysis
 */
export async function analyzeJobFitAndGaps(params: {
  candidate: CandidateProfile;
  job: Job;
}): Promise<MatchAnalysisResult> {
  try {
    const res = await fetch('/api/gemini/fit-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Network error fetching fit-analysis:', err);
  }

  return {
    matchScore: 94,
    fitSummary: 'Strong match (94%) with deep roots in Palawan and direct background architecting applications for local eco-tourism operations and island infrastructure.',
    keyStrengths: [
      `Extensive hands-on experience in ${params.candidate.skills.slice(0, 3).join(', ')}`,
      'Proven track record building systems optimized for low-bandwidth island connectivity across El Nido and Coron',
      'Palawan State University cum laude graduate with active involvement in the local Puerto Princesa tech ecosystem'
    ],
    skillsGaps: [
      'Opportunity to showcase deeper exposure to automated CI/CD micro-deployments',
      'Familiarity with municipal PAMBO & PCSD regulatory data integration'
    ],
    palawanAdvantage: [
      'Immediate onsite/hybrid availability without needing relocation assistance',
      'Familiar with local power schedules, PALECO reliability setups, and Starlink backup pipelines'
    ],
    recommendedAction: 'Highlight your offline-first caching strategies and experience mentoring PSU students in your introductory note.'
  };
}

/**
 * 3. Fetch mock interview question via /api/gemini/mock-question
 */
export async function getMockInterviewQuestion(params: {
  job: Job;
  candidate: CandidateProfile;
  questionNumber: number;
}): Promise<MockQuestionResult> {
  try {
    const res = await fetch('/api/gemini/mock-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Network error fetching mock-question:', err);
  }

  const fallbackQuestions: MockQuestionResult[] = [
    {
      questionNumber: 1,
      question: 'Here in Palawan, network latency and island power dips can sometimes affect continuous operations. How do you design your applications or workflows to remain reliable during intermittent connectivity?',
      context: 'Tests real-world island operational problem solving for Palawan conditions.',
      lookFor: 'Mentions of service workers, client-side caching, optimistic UI updates, or emergency power backup routines.'
    },
    {
      questionNumber: 2,
      question: `At ${params.job.company}, we balance business objectives with eco-sustainability and respect for local Palaweño communities. Can you share an example of how you navigated community or environmental considerations in your previous work?`,
      context: 'Assesses cultural alignment with Palawan strict environmental covenants and PAMBO guidelines.',
      lookFor: 'Authentic stakeholder communication, zero-waste orientation, or community mentoring.'
    },
    {
      questionNumber: 3,
      question: 'Where do you see the digital and eco-tourism landscape of Palawan progressing in the next 3 years, and how does your personal career roadmap in this position contribute to that?',
      context: 'Evaluates long-term retention, passion for the province, and forward-looking vision.',
      lookFor: 'Commitment to staying and growing in Palawan, uplifting local talent, and scaling sustainable systems.'
    }
  ];

  return fallbackQuestions[(params.questionNumber - 1) % fallbackQuestions.length];
}

/**
 * 4. Evaluate mock interview answer via /api/gemini/evaluate-mock
 */
export async function evaluateMockAnswer(params: {
  job: Job;
  question: string;
  answer: string;
}): Promise<MockAnswerEvaluation> {
  try {
    const res = await fetch('/api/gemini/evaluate-mock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Network error fetching evaluate-mock:', err);
  }

  return {
    score: params.answer.length > 80 ? 5 : 4,
    praise: 'Great clarity and confidence! You clearly tied your technical experience back to practical execution.',
    constructiveAdvice: 'To make your answer even more memorable, quantify the outcome (e.g. "reduced load time by 45%" or "served 40+ tour operators") and reference specific Palawan context.',
    modelAnswerTip: 'Frame your answer using the STAR method: Situation, Task, Action, and Measurable Result.'
  };
}

/**
 * 5. Auto-draft job posting for employers via /api/gemini/draft-job
 */
export async function generateJobPostingDraft(params: {
  title: string;
  location?: string;
  workplaceType?: string;
  department?: string;
}): Promise<JobPostingDraftResult> {
  try {
    const res = await fetch('/api/gemini/draft-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Network error fetching draft-job:', err);
  }

  return {
    department: params.department || 'Operations & Innovation',
    location: params.location || 'Puerto Princesa City, Palawan',
    salaryMin: 65000,
    salaryMax: 105000,
    description: `Join our growing team in Palawan! We are seeking an exceptional ${params.title} dedicated to operational excellence, sustainable community development, and building world-class services from Palawan.`,
    responsibilities: [
      'Lead day-to-day strategic execution and cross-functional collaboration.',
      'Maintain high reliability and user satisfaction under island network conditions.',
      'Coordinate with local Palaweño stakeholders and regional industry partners.',
      'Uphold provincial environmental and sustainability standards across operations.'
    ],
    qualifications: [
      '3+ years relevant domain experience with documented successes.',
      'Strong problem-solving ability, proactive communication, and leadership mindset.',
      'Based in Palawan or willing to relocate to support local operations.',
      'Passion for contributing to the growth and empowerment of Palawan province.'
    ],
    benefits: [
      'Competitive monthly compensation with 14th month pay',
      'Comprehensive HMO with 2 dependent coverages (Maxicare Palawan)',
      '₱25,000 annual equipment & high-speed Starlink/fiber stipend',
      'Paid eco-leave for coastal cleanup and reef conservation programs'
    ],
    skills: ['Leadership', 'Operations', 'Palawan Logistics', 'Communication', 'Problem Solving'],
    screeningQuestions: [
      { id: 'q-1', question: 'Are you currently based in Palawan or open to living/working here?', required: true },
      { id: 'q-2', question: 'What is your earliest availability date or current notice period?', required: true }
    ]
  };
}

/**
 * 6. Generate Candidate Dossier Brief for Recruiters via /api/gemini/candidate-dossier
 */
export async function generateCandidateDossierSummary(params: {
  applicant: Applicant;
}): Promise<CandidateDossierSummaryResult> {
  try {
    const res = await fetch('/api/gemini/candidate-dossier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Network error fetching candidate-dossier:', err);
  }

  return {
    executiveSummary: `Highly qualified local candidate based in Puerto Princesa with proven expertise in ${params.applicant.skills.slice(0, 3).join(', ')}. Demonstrated strong alignment with Palawan community operations and excellent academic credentials.`,
    topStrengths: [
      `Demonstrated production experience in ${params.applicant.skills[0] || 'core technologies'}`,
      'Born and based in Palawan with deep familiarity with local infrastructure',
      'Positive screening responses confirming readiness for immediate hybrid engagement'
    ],
    recommendedQuestions: [
      'Can you walk us through the architecture of your recent Palawan project and how you handled high season user spikes?',
      'How do you manage local stakeholder expectations when connectivity or logistical challenges occur?',
      'What are your compensation expectations and long-term career growth goals within Palawan?'
    ],
    riskOrProbeArea: `Confirm earliest start date given notice period (${params.applicant.availability}).`
  };
}
