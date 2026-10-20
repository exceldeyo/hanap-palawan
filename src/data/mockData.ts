import { Job, Applicant, Interview, CandidateProfile } from '../types';

export const INITIAL_CANDIDATE_PROFILE: CandidateProfile = {
  fullName: 'Maria Alyssa Rodriguez',
  email: 'alyssa.rodriguez@palawandev.ph',
  phone: '+63 917 582 4119',
  headline: 'Full-Stack Software Engineer & UI Specialist · Proud Palaweña',
  location: 'Puerto Princesa City, Palawan (Open to Remote & Hybrid)',
  summary: 'Passionate Palaweña software engineer with 5+ years building modern web applications, eco-tourism booking portals, and distributed tools. Alumna of Palawan State University (PSU). Dedicated to using technology to empower local Palawan communities and businesses while collaborating with international engineering teams.',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'REST APIs', 'UI/UX Design'],
  portfolioUrl: 'https://alyssarodriguez.dev',
  githubUrl: 'https://github.com/alyssa-palawandev',
  linkedinUrl: 'https://linkedin.com/in/alyssa-rodriguez-palawan',
  resumeFileName: 'Alyssa_Rodriguez_Software_Engineer_Palawan_CV.pdf',
  resumeLastUpdated: 'October 19, 2026',
  experience: [
    {
      id: 'exp-1',
      role: 'Lead Frontend Developer',
      company: 'Palawan Tech Innovation Hub',
      duration: '2023 - Present · 3 yrs (Puerto Princesa)',
      highlights: [
        'Built real-time eco-tourism dispatch and booking engine used by 40+ licensed island tour operators across El Nido and Coron.',
        'Led frontend architecture using React, Next.js, and TypeScript, achieving sub-second load times on 4G island networks.',
        'Mentored 6 IT graduates from Palawan State University and Western Philippines University in modern web engineering.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Full Stack Web Developer',
      company: 'IslandLink Digital Solutions',
      duration: '2021 - 2023 · 2 yrs (Remote Palawan)',
      highlights: [
        'Developed internal guest management tools and automated reservation systems for luxury sustainable eco-resorts.',
        'Integrated multi-currency payment gateways and SMS notifications for local booking confirmations.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Information Technology (Cum Laude)',
      school: 'Palawan State University (PSU) - Main Campus, Puerto Princesa',
      year: '2017 - 2021'
    }
  ]
};

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-101',
    title: 'Senior Frontend & Mobile Developer',
    company: 'Palawan Tech Innovation Hub',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&auto=format&fit=crop&q=80',
    location: 'Puerto Princesa City, Palawan',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryMin: 95000,
    salaryMax: 145000,
    currency: 'PHP',
    salaryPeriod: 'month',
    department: 'Software Engineering',
    urgency: 'Featured',
    description: 'We are expanding our software engineering group in Puerto Princesa City. We build digital infrastructure for Palawan eco-tourism operators, municipal services, and international remote clients. We are looking for a skilled Palaweño senior frontend developer who loves building fast, accessible web and mobile experiences.',
    responsibilities: [
      'Lead architecture and code quality of our responsive React and Next.js applications.',
      'Optimize web performance for varied island network conditions across Palawan.',
      'Collaborate directly with local stakeholders and international product partners.',
      'Mentor junior Palaweño software engineers and interns from local universities.'
    ],
    qualifications: [
      '4+ years experience with React, TypeScript, and modern CSS frameworks (Tailwind).',
      'Strong problem-solving skills and understanding of state management and API integration.',
      'Passion for contributing to the burgeoning tech ecosystem in Palawan.',
      'Resident of Palawan or open to hybrid work in Puerto Princesa.'
    ],
    benefits: [
      'Competitive compensation with 14th-month pay & performance bonuses',
      'Comprehensive HMO coverage for employee + 2 dependents (Maxicare Palawan)',
      '₱35,000 annual equipment & high-speed fiber internet stipend',
      'Flexible hybrid arrangement (2 days office in Rizal Ave / 3 days home)',
      'Paid eco-leave for environmental conservation activities in Palawan'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'REST APIs', 'UI/UX'],
    screeningQuestions: [
      { id: 'q-1', question: 'Are you currently based in Palawan or willing to relocate to Puerto Princesa City?', required: true },
      { id: 'q-2', question: 'How many years of experience do you have with React and TypeScript?', required: true }
    ],
    postedDate: '2026-10-18T08:00:00Z',
    employerId: 'emp-palawantech'
  },
  {
    id: 'job-102',
    title: 'Eco-Resort Operations & Guest Experience Lead',
    company: 'Bacuit Bay Sustainable Resorts',
    companyLogo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&auto=format&fit=crop&q=80',
    location: 'El Nido, Palawan',
    workplaceType: 'Onsite',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryMin: 75000,
    salaryMax: 110000,
    currency: 'PHP',
    salaryPeriod: 'month',
    department: 'Hospitality & Operations',
    urgency: 'Urgent',
    description: 'Join Bacuit Bay Sustainable Resorts in El Nido, Palawan. We manage award-winning luxury eco-villas dedicated to zero-waste, coral reef preservation, and authentic Palaweño hospitality. We are looking for an operations leader to manage guest relations, concierge, and eco-tours.',
    responsibilities: [
      'Oversee daily villa operations, guest arrivals, and personalized island itineraries.',
      'Maintain strict environmental compliance standards (zero single-use plastics, solar energy use).',
      'Lead and inspire a team of 25+ hospitality staff, emphasizing warm Palaweño hospitality.',
      'Coordinate with the El Nido Protected Area Management Office (PAMBO) for conservation tours.'
    ],
    qualifications: [
      '3+ years managerial experience in high-end hospitality, boutique resort, or luxury travel.',
      'Deep knowledge of El Nido attractions, marine sanctuaries, and local regulatory guidelines.',
      'Excellent leadership and interpersonal communication in English and Tagalog.'
    ],
    benefits: [
      'Full accommodation and daily meals provided on-site in El Nido',
      'Service charge share + annual performance incentives',
      'Comprehensive medical insurance (HMO)',
      'Free island hopping and diving certifications'
    ],
    skills: ['Hospitality Management', 'Guest Experience', 'Eco-Tourism', 'Team Leadership', 'Operations'],
    screeningQuestions: [
      { id: 'q-1', question: 'Do you have experience managing resort operations or guest services in Palawan or island destinations?', required: true },
      { id: 'q-2', question: 'Are you ready to live and work on-site in El Nido, Palawan?', required: true }
    ],
    postedDate: '2026-10-17T11:00:00Z',
    employerId: 'emp-bacuit'
  },
  {
    id: 'job-103',
    title: 'Marine Conservation & Dive Operations Coordinator',
    company: 'Calamianes Marine Sanctuary & Eco-Ventures',
    companyLogo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&auto=format&fit=crop&q=80',
    location: 'Coron, Palawan',
    workplaceType: 'Onsite',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salaryMin: 55000,
    salaryMax: 80000,
    currency: 'PHP',
    salaryPeriod: 'month',
    department: 'Marine Science & Eco-Tours',
    urgency: 'New',
    description: 'Based in picturesque Coron, Palawan, our center conducts reef monitoring, crown-of-thorns eradication, and guided educational dives across historical shipwrecks and coral gardens. We are seeking a passionate Palaweño marine coordinator to guide dive safety and conservation education.',
    responsibilities: [
      'Coordinate daily dive schedules, vessel dispatch, and safety briefings in Coron Bay.',
      'Lead coral reef monitoring surveys and enter biological data for municipal coastal registries.',
      'Conduct educational orientations for visiting scientific researchers and eco-tourists.',
      'Maintain SCUBA equipment, compressor logs, and first-aid readiness.'
    ],
    qualifications: [
      'Certified Divemaster or PADI/SSI Instructor certification.',
      'Background in Marine Biology, Environmental Science, or extensive marine tourism experience.',
      'Strong swimming ability, rescue diver competence, and familiarity with Coron reefs.'
    ],
    benefits: [
      'Subsidized staff housing in Coron town proper',
      'Free unlimited diving and gear allowance',
      'Government benefits (SSS, PhilHealth, Pag-IBIG) + private HMO',
      'Continuing education grant for marine conservation courses'
    ],
    skills: ['SCUBA Diving', 'Marine Biology', 'Reef Conservation', 'Tour Coordination', 'First Aid / CPR'],
    screeningQuestions: [
      { id: 'q-1', question: 'What is your current diving certification level (e.g. Divemaster, Instructor) and total logged dives?', required: true }
    ],
    postedDate: '2026-10-18T14:30:00Z',
    employerId: 'emp-coron'
  },
  {
    id: 'job-104',
    title: 'Solar Microgrid & Energy Systems Engineer',
    company: 'Palawan Sustainable Renewable Energy Corp',
    companyLogo: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80',
    location: 'Narra & Brooke\'s Point, Palawan',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salaryMin: 65000,
    salaryMax: 90000,
    currency: 'PHP',
    salaryPeriod: 'month',
    department: 'Renewable Power & Grid Infrastructure',
    description: 'Palawan is rapidly transitioning toward 100% renewable energy microgrids. We design, install, and monitor hybrid solar-battery installations across central and southern Palawan municipalities. We are looking for an electrical engineer to supervise microgrid operations.',
    responsibilities: [
      'Monitor and diagnose solar PV inverter arrays and lithium battery storage systems.',
      'Perform field inspections and scheduled maintenance at solar power stations in Narra and Brooke\'s Point.',
      'Coordinate with the Palawan Electric Cooperative (PALECO) on grid synchronization.',
      'Prepare technical generation reports and optimize battery discharge cycles.'
    ],
    qualifications: [
      'Licensed Electrical Engineer (REE) or Electronics Engineer (ECE).',
      'Experience with solar photovoltaic design, inverters, and battery energy storage systems (BESS).',
      'Valid driver\'s license and willingness to travel across Palawan project sites.'
    ],
    benefits: [
      'Company vehicle provided for site visits + gas allowance',
      'HMO with dependent coverage on Day 1',
      '14th month pay and field hazard allowance',
      'Training on utility-scale solar microgrid architectures'
    ],
    skills: ['Solar PV', 'Electrical Engineering', 'Microgrids', 'Inverter Systems', 'PALECO Grid Codes'],
    screeningQuestions: [
      { id: 'q-1', question: 'Are you a Registered Electrical Engineer (REE) or have equivalent renewable energy credentials?', required: true }
    ],
    postedDate: '2026-10-16T09:15:00Z',
    employerId: 'emp-palawanenergy'
  },
  {
    id: 'job-105',
    title: 'Remote Executive Assistant & Digital Operations Lead',
    company: 'Horizon Global Partners (Palawan Remote Squad)',
    companyLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80',
    location: 'Remote (Home-based Palawan)',
    workplaceType: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salaryMin: 50000,
    salaryMax: 75000,
    currency: 'PHP',
    salaryPeriod: 'month',
    department: 'Digital Operations & Executive Support',
    urgency: 'New',
    description: 'Work from home in Palawan while earning competitive global rates! Horizon Global Partners is hiring remote Palaweños to support international executives in Australia and the US. Manage calendars, handle email communication, digital research, and client onboarding.',
    responsibilities: [
      'Manage executive calendars, schedule multi-timezone Zoom meetings, and coordinate travel.',
      'Draft professional email correspondence and summarize business meetings.',
      'Conduct market research and organize documentation in Notion and Google Workspace.',
      'Handle confidential client communications with high discretion.'
    ],
    qualifications: [
      '2+ years experience in virtual assistance, executive support, or client operations.',
      'Stable fiber or Starlink internet connection in Palawan with power backup (UPS).',
      'Flawless written and verbal English communication.',
      'Proficiency in Google Workspace, Slack, Notion, and project management tools.'
    ],
    benefits: [
      '100% work from anywhere in Palawan (Puerto Princesa, El Nido, Roxas, etc.)',
      '₱15,000 home office & solar generator backup subsidy',
      'Paid time off on Philippine and Australian holidays',
      'Annual Palaweño remote team meetups in Puerto Princesa'
    ],
    skills: ['Virtual Assistance', 'Executive Support', 'Google Workspace', 'Calendar Management', 'Communication'],
    screeningQuestions: [
      { id: 'q-1', question: 'Where in Palawan are you based, and what is your primary and backup internet connection?', required: true }
    ],
    postedDate: '2026-10-19T07:00:00Z',
    employerId: 'emp-horizon'
  },
  {
    id: 'job-106',
    title: 'Clinical Healthcare Supervisor (Staff Nurse / Clinic Lead)',
    company: 'Palawan Community Wellness Hospital',
    companyLogo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=200&auto=format&fit=crop&q=80',
    location: 'Puerto Princesa City, Palawan',
    workplaceType: 'Onsite',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryMin: 45000,
    salaryMax: 65000,
    currency: 'PHP',
    salaryPeriod: 'month',
    department: 'Healthcare & Nursing Administration',
    description: 'Palawan Community Wellness Hospital is expanding its outpatient and diagnostic specialty wing. We are seeking a compassionate, licensed Registered Nurse to serve as Clinic Supervisor, coordinating patient triage, nursing staff rotations, and health outreach programs.',
    responsibilities: [
      'Supervise clinical nursing staff and oversee quality patient triage in outpatient care.',
      'Ensure compliance with Department of Health (DOH) clinical standards and patient safety.',
      'Coordinate municipal medical mission programs across northern and southern Palawan communities.',
      'Manage clinic inventory, pharmaceuticals, and patient record workflows.'
    ],
    qualifications: [
      'Licensed Registered Nurse (RN) with active PRC license.',
      'At least 3 years clinical hospital or medical center experience in Palawan.',
      'Strong leadership skills and genuine dedication to community healthcare.'
    ],
    benefits: [
      'Comprehensive hospital healthcare benefits for employee and immediate family',
      'Government mandatory benefits (SSS, PhilHealth, Pag-IBIG) + hospital hazard pay',
      'Continuing professional education (CPD) units sponsored by the hospital'
    ],
    skills: ['Nursing Care', 'Clinical Supervision', 'Patient Triage', 'Healthcare Administration', 'DOH Standards'],
    screeningQuestions: [
      { id: 'q-1', question: 'What is your PRC Nursing license registration status and validity?', required: true }
    ],
    postedDate: '2026-10-17T15:20:00Z',
    employerId: 'emp-palawanhealth'
  },
  {
    id: 'job-107',
    title: 'Golden South Sea Pearl Oyster Marine Biologist',
    company: 'Jewelmer & Calamianes Marine Bio-Ventures',
    companyLogo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&auto=format&fit=crop&q=80',
    location: 'Taytay & Coron, Palawan',
    workplaceType: 'Onsite',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salaryMin: 70000,
    salaryMax: 98000,
    currency: 'PHP',
    salaryPeriod: 'month',
    department: 'Marine Science & Aquaculture',
    urgency: 'Featured',
    description: 'Palawan is globally renowned for the rare Golden South Sea Pearl (Pinctada maxima). Join our pearl farm team in Taytay and Coron to oversee oyster hatchery breeding, plankton density testing, and benthic biodiversity monitoring.',
    responsibilities: [
      'Monitor oyster conditioning, spat rearing, and water salinity/temperature in Taytay Bay.',
      'Conduct regular SCUBA transect surveys to monitor coral reef health around farm zones.',
      'Partner with indigenous Tagbanua coastal communities on livelihood initiatives.',
      'Maintain scientific hatchery records and compile research for environmental audits.'
    ],
    qualifications: [
      'B.S. or M.S. in Marine Biology, Fisheries, or Aquaculture (WPU / UP MSI graduates welcome).',
      'Certified SCUBA Diver with open water comfort in varied tidal conditions.',
      'Deep passion for sustainable mariculture and Palawan marine ecosystems.'
    ],
    benefits: [
      'Full accommodation and chef-prepared meals at farm quarters',
      'Medical insurance (HMO) + annual ocean travel stipends',
      'Free diving equipment allowance and continuing scientific training'
    ],
    skills: ['Marine Biology', 'Aquaculture', 'Pinctada Maxima', 'SCUBA Diving', 'Water Quality'],
    screeningQuestions: [
      { id: 'q-1', question: 'Do you have experience in shellfish aquaculture, oyster hatchery, or marine fieldwork?', required: true }
    ],
    postedDate: '2026-10-19T10:00:00Z',
    employerId: 'emp-jewelmer'
  },
  {
    id: 'job-108',
    title: 'San Vicente Eco-Town Master Planning Architect',
    company: 'San Vicente Sustainable Tourism Authority',
    companyLogo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&auto=format&fit=crop&q=80',
    location: 'San Vicente, Palawan',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryMin: 85000,
    salaryMax: 125000,
    currency: 'PHP',
    salaryPeriod: 'month',
    department: 'Sustainable Architecture & Urban Design',
    urgency: 'New',
    description: 'San Vicente boasts the longest white sand beach in the Philippines (14km Long Beach). We are seeking a licensed Architect to supervise sustainable resort guidelines, rainwater harvesting design standards, and bamboo/timber building compliance.',
    responsibilities: [
      'Review architectural plans for hotels and eco-villas against San Vicente Master Plan codes.',
      'Promote solar orientation, natural ventilation, and low-embodied carbon materials.',
      'Liaise with the Palawan Council for Sustainable Development (PCSD) on SEP clearance.',
      'Conduct site inspections across beachfront clusters from Alimanguan to Port Barton.'
    ],
    qualifications: [
      'Licensed Architect (UAP) with portfolio in tropical or sustainable architecture.',
      'Familiarity with LEED, EDGE, or BERDE green building rating systems.',
      'Commitment to preserving San Vicente’s pristine coastal ridge-to-reef ecology.'
    ],
    benefits: [
      'Government standard benefits + competitive municipal authority executive stipend',
      'Subsidized staff villa near Long Beach',
      'Flexible hybrid schedule (office in San Vicente Poblacion / remote drafting days)'
    ],
    skills: ['Sustainable Architecture', 'Urban Planning', 'Tropical Design', 'AutoCAD / Revit', 'BERDE / LEED'],
    screeningQuestions: [
      { id: 'q-1', question: 'Are you a licensed PRC Architect with green building or tropical resort design experience?', required: true }
    ],
    postedDate: '2026-10-19T11:30:00Z',
    employerId: 'emp-sanvicente'
  }
];

export const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: 'app-201',
    jobId: 'job-101',
    jobTitle: 'Senior Frontend & Mobile Developer',
    company: 'Palawan Tech Innovation Hub',
    fullName: 'Maria Alyssa Rodriguez',
    email: 'alyssa.rodriguez@palawandev.ph',
    phone: '+63 917 582 4119',
    headline: 'Full-Stack Software Engineer & UI Specialist · Proud Palaweña',
    location: 'Puerto Princesa City, Palawan',
    summary: '5+ years building modern web applications, eco-tourism booking portals, and distributed tools. Alumna of Palawan State University. Dedicated to using technology to empower local Palawan communities and businesses while working with global engineering teams.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'REST APIs', 'UI/UX Design', 'Node.js'],
    experience: INITIAL_CANDIDATE_PROFILE.experience,
    education: INITIAL_CANDIDATE_PROFILE.education,
    portfolioUrl: 'https://alyssarodriguez.dev',
    githubUrl: 'https://github.com/alyssa-palawandev',
    linkedinUrl: 'https://linkedin.com/in/alyssa-rodriguez-palawan',
    resumeFileName: 'Alyssa_Rodriguez_Software_Engineer_Palawan_CV.pdf',
    appliedAt: '2026-10-18T10:45:00Z',
    expectedSalary: '₱120,000 / month',
    availability: '30 days notice',
    coverNote: 'Magandang araw po! As a proud Palaweña based in Puerto Princesa, I have been following Palawan Tech Hub\'s initiatives to elevate our local digital economy. My background architecting React and Next.js applications for island connectivity fits your mission perfectly. Excited to contribute to our home province!',
    screeningAnswers: [
      {
        questionId: 'q-1',
        question: 'Are you currently based in Palawan or willing to relocate to Puerto Princesa City?',
        answer: 'Yes! Born and raised in Puerto Princesa City (Barangay San Pedro), currently living here.'
      },
      {
        questionId: 'q-2',
        question: 'How many years of experience do you have with React and TypeScript?',
        answer: 'Over 4 years actively developing production React and TypeScript applications.'
      }
    ],
    status: 'interview_scheduled',
    matchScore: 98,
    rating: 5,
    employerNotes: [
      {
        id: 'note-1',
        author: 'Elena Cruz (Engineering Director - Palawan Tech)',
        text: 'Exceptional local candidate. PSU graduate with impressive open-source work on tour booking components. Technical screen confirmed for Thursday.',
        createdAt: '2026-10-18T14:20:00Z'
      }
    ]
  },
  {
    id: 'app-202',
    jobId: 'job-102',
    jobTitle: 'Eco-Resort Operations & Guest Experience Lead',
    company: 'Bacuit Bay Sustainable Resorts',
    fullName: 'Christian Dave Villagracia',
    email: 'dave.villagracia@hospitality.ph',
    phone: '+63 920 881 2944',
    headline: 'Boutique Resort Manager · El Nido Hospitality Veteran',
    location: 'El Nido, Palawan',
    summary: 'Hospitality professional with 6 years experience running eco-villas and island hopping fleets in El Nido. Passionate about sustainable tourism and PAMBO environmental guidelines.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    skills: ['Hospitality Management', 'Guest Experience', 'Eco-Tourism', 'Team Leadership', 'Operations'],
    experience: [
      {
        id: 'exp-d1',
        role: 'Assistant Resort Manager',
        company: 'Cadlao View Eco-Villas',
        duration: '2022 - Present · 4 yrs (El Nido)',
        highlights: [
          'Managed 18 beach villas and supervised front office, housekeeping, and boat crew.',
          'Maintained 9.4/10 guest satisfaction score across TripAdvisor and Booking.com.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-d1',
        degree: 'B.S. Hospitality & Tourism Management',
        school: 'Palawan State University - El Nido Campus',
        year: '2016 - 2020'
      }
    ],
    portfolioUrl: 'https://davevillagracia.com',
    resumeFileName: 'Dave_Villagracia_Resort_Manager_CV.pdf',
    appliedAt: '2026-10-18T16:10:00Z',
    expectedSalary: '₱85,000 / month',
    availability: '2 weeks notice',
    coverNote: 'Warm greetings from El Nido! I have dedicated my career to sustainable hospitality in Bacuit Bay. I understand the operational challenges of island logistics and would be thrilled to lead guest experiences at your eco-resorts.',
    screeningAnswers: [
      {
        questionId: 'q-1',
        question: 'Do you have experience managing resort operations or guest services in Palawan or island destinations?',
        answer: 'Yes, 4 continuous years operating beachfront eco-villas right here in El Nido.'
      },
      {
        questionId: 'q-2',
        question: 'Are you ready to live and work on-site in El Nido, Palawan?',
        answer: 'Already living in El Nido town proper.'
      }
    ],
    status: 'reviewing',
    matchScore: 94,
    rating: 4,
    employerNotes: [
      {
        id: 'note-d1',
        author: 'Marc Serrano (General Manager)',
        text: 'Strong candidate with deep roots in El Nido. Previous experience with local boat crews and municipal permits is a big plus.',
        createdAt: '2026-10-19T09:15:00Z'
      }
    ]
  },
  {
    id: 'app-203',
    jobId: 'job-103',
    jobTitle: 'Marine Conservation & Dive Operations Coordinator',
    company: 'Calamianes Marine Sanctuary & Eco-Ventures',
    fullName: 'Jasmine Camille Flores',
    email: 'jasmine.flores@marinepalawan.org',
    phone: '+63 918 442 8110',
    headline: 'PADI Master Scuba Diver Trainer & Marine Biologist',
    location: 'Coron, Palawan',
    summary: 'Marine biologist from Western Philippines University with 800+ logged dives in Calamianes and Tubbataha. Expert in benthic reef surveys and shipwreck dive safety.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    skills: ['SCUBA Diving', 'Marine Biology', 'Reef Conservation', 'Tour Coordination', 'First Aid / CPR'],
    experience: [
      {
        id: 'exp-j1',
        role: 'Senior Dive Instructor & Reef Monitor',
        company: 'Coron Divers Collective',
        duration: '2021 - Present · 5 yrs (Coron)',
        highlights: [
          'Led scientific monitoring of 12 coral transects in Coron Bay and Siete Pecados.',
          'Conducted over 350 guided wreck and reef dives with zero safety incidents.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-j1',
        degree: 'B.S. in Marine Biology',
        school: 'Western Philippines University (WPU) - Puerto Princesa',
        year: '2015 - 2019'
      }
    ],
    portfolioUrl: 'https://jasmineflores-dive.org',
    resumeFileName: 'Jasmine_Flores_Marine_Biologist_CV.pdf',
    appliedAt: '2026-10-18T18:00:00Z',
    expectedSalary: '₱68,000 / month',
    availability: 'Immediate availability',
    coverNote: 'Hello Calamianes team! Protecting the waters of Palawan is my life mission. As a WPU Marine Biology graduate and active PADI Instructor in Coron, I am eager to lead your conservation diving programs.',
    screeningAnswers: [
      {
        questionId: 'q-1',
        question: 'What is your current diving certification level (e.g. Divemaster, Instructor) and total logged dives?',
        answer: 'PADI Master Scuba Diver Trainer (MSDT) with 840 logged dives in Coron, Tubbataha, and Apo Reef.'
      }
    ],
    status: 'interview_scheduled',
    matchScore: 97,
    rating: 5,
    employerNotes: [
      {
        id: 'note-j1',
        author: 'Capt. Raul Sandoval (Operations Director)',
        text: 'Top tier candidate. Impressive scientific and technical dive credentials. Scheduled technical & safety interview.',
        createdAt: '2026-10-18T19:00:00Z'
      }
    ]
  }
];

export const INITIAL_INTERVIEWS: Interview[] = [
  {
    id: 'int-301',
    applicantId: 'app-201',
    applicantName: 'Maria Alyssa Rodriguez',
    applicantEmail: 'alyssa.rodriguez@palawandev.ph',
    jobId: 'job-101',
    jobTitle: 'Senior Frontend & Mobile Developer',
    company: 'Palawan Tech Innovation Hub',
    date: '2026-10-21',
    time: '14:00',
    durationMinutes: 45,
    format: 'video',
    stage: 'Technical Evaluation',
    interviewerName: 'Elena Cruz',
    interviewerRole: 'Engineering Director · Palawan Tech Hub',
    meetingLink: 'https://hanap.app/meet/hn-plwn-9281-cruz',
    locationOrDetails: 'Hanap Virtual Video Room #9281 (Palawan Server)',
    notesOrAgenda: '1. Introductions & candidate background in Puerto Princesa (10 mins)\n2. Architecture walkthrough of the eco-tourism booking engine (20 mins)\n3. Technical scenario: Low-bandwidth offline-first component design for island connectivity (10 mins)\n4. Candidate Q&A regarding Palawan Tech team growth and projects (5 mins)',
    status: 'scheduled'
  },
  {
    id: 'int-302',
    applicantId: 'app-203',
    applicantName: 'Jasmine Camille Flores',
    applicantEmail: 'jasmine.flores@marinepalawan.org',
    jobId: 'job-103',
    jobTitle: 'Marine Conservation & Dive Operations Coordinator',
    company: 'Calamianes Marine Sanctuary & Eco-Ventures',
    date: '2026-10-22',
    time: '10:30',
    durationMinutes: 45,
    format: 'video',
    stage: 'Technical Evaluation',
    interviewerName: 'Capt. Raul Sandoval',
    interviewerRole: 'Operations Director · Calamianes Marine Ventures',
    meetingLink: 'https://hanap.app/meet/hn-coron-4421-sandoval',
    locationOrDetails: 'Hanap Virtual Video Room #4421',
    notesOrAgenda: 'Deep dive into candidate marine survey methodology, emergency dive response protocols, and community engagement in Coron.',
    status: 'scheduled'
  }
];
