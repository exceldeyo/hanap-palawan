import { PalawanNewsItem } from '../types';

export const INITIAL_PALAWAN_NEWS: PalawanNewsItem[] = [
  {
    id: 'news-1',
    title: 'Palawan Provincial Government Accelerates Island-Wide Solar Hybrid Microgrid Infrastructure Across Calamianes and Cuyo',
    headlineTagalog: 'Pinasibilis ng Pamahalaang Panlalawigan ang Solar Microgrids sa mga Isla ng Calamianes at Cuyo',
    category: 'Infrastructure & Energy',
    publishedDate: 'October 16, 2026',
    relativeTime: '3 days ago',
    municipality: 'Coron, Culion, Linapacan & Cuyo Islands',
    source: 'Palawan Provincial Government',
    sourceDepartment: 'Provincial Planning and Development Office (PPDO) & Palawan Energy Division',
    sourceUrl: 'https://palawan.gov.ph/news/provincial-energy-solar-microgrid-expansion',
    snippet: 'The Palawan Provincial Government has greenlit Phase 3 of the Provincial Renewable Energy Masterplan, allocating ₱1.4B for 12 utility-scale solar-diesel-battery hybrid microgrids to guarantee uninterrupted 24/7 power to off-grid island communities and coastal ecotourism clusters.',
    fullBriefing: [
      'Provincial Governor and Sangguniang Panlalawigan members approved the capital expenditure framework in coordination with the National Electrification Administration (NEA) and local electric cooperatives (BISELCO and PALECO).',
      'The project will deploy 28 MW of distributed solar photovoltaic arrays integrated with high-capacity lithium iron phosphate (LFP) energy storage systems across off-grid island municipalities.',
      'Stable electrical supply is targeted to eliminate rolling blackouts for coastal community clinics, municipal cold storage, remote broadband towers, and 120+ island eco-lodges.'
    ],
    economicImpact: '₱1.4 Billion clean energy capital investment; anticipated 35% reduction in commercial diesel fuel expenditures across North Palawan island enterprises.',
    jobMarketImplications: {
      estimatedJobs: '380+ technical, engineering, and maintenance roles',
      demandSectors: ['Electrical Engineering', 'Solar PV Installation', 'Substation Technicians', 'Battery Storage Systems', 'Heavy Logistics'],
      actionableAdvice: 'Local electricians and electrical engineering graduates with TESDA Solar PV Installation NC II or PRC licenses are prioritized for provincial sub-contracting panels.'
    },
    relatedSearchKeywords: ['Solar', 'Engineer', 'Electrician', 'Technician', 'Coron'],
    isFeatured: true
  },
  {
    id: 'news-2',
    title: 'Coron-Culion Marine Causeway & Busuanga Deepwater Seaport Upgrade Breaks Ground',
    headlineTagalog: 'Pinasinayaan ang Bagong Causeway at Deepwater Seaport sa Hilagang Palawan',
    category: 'Infrastructure & Energy',
    publishedDate: 'October 14, 2026',
    relativeTime: '5 days ago',
    municipality: 'Coron & Culion',
    source: 'Palawan Provincial Government',
    sourceDepartment: 'Provincial Engineering Office (PEO) & DPWH 1st District Engineering Office',
    sourceUrl: 'https://palawan.gov.ph/infrastructure/coron-culion-causeway-seaport',
    snippet: 'Civil works have commenced on the new multi-span Roll-on/Roll-off (RoRo) port terminal and coastal causeway linking Coron proper to western Calamian trade routes, cutting inter-island travel times by 60% and enabling direct containerized agricultural transport.',
    fullBriefing: [
      'The multi-year transport infrastructure project features a 1.8-kilometer storm-resilient coastal causeway, modernized RoRo ramp, and automated passenger terminal building.',
      'Designed to accommodate larger domestic passenger ferries and inter-island supply vessels, significantly easing seasonal logistics bottlenecks in northern Palawan.',
      'Environmental safeguards including mangrove buffer zones and siltation curtains are closely monitored by the Provincial Environment and Natural Resources Office (PGENRO).'
    ],
    economicImpact: '₱2.1 Billion total infrastructure package; projected to reduce local inter-island food transport overhead by 40% while expanding direct tourist ferry connectivity.',
    jobMarketImplications: {
      estimatedJobs: '520+ civil engineering, maritime logistics, and trade positions',
      demandSectors: ['Civil Engineering', 'Port Logistics', 'Heavy Equipment Operators', 'Surveyors', 'Safety & Environmental Officers'],
      actionableAdvice: 'Civil engineers, safety officers (BOSH/COSH certified), and heavy equipment operators can apply directly to provincial infrastructure contractors.'
    },
    relatedSearchKeywords: ['Civil Engineer', 'Logistics', 'Construction', 'Safety Officer', 'Coron'],
    isFeatured: true
  },
  {
    id: 'news-3',
    title: 'San Vicente Tourism Enterprise Zone (TEZ) Secures ₱4.8B in Sustainable Boutique Resort Commitments',
    headlineTagalog: '₱4.8B Pamumuhunan sa Eco-Resorts at Boutique Hotels Pumasok sa San Vicente TEZ',
    category: 'Tourism & Hospitality',
    publishedDate: 'October 12, 2026',
    relativeTime: '1 week ago',
    municipality: 'San Vicente',
    source: 'Palawan Provincial Government',
    sourceDepartment: 'Palawan Provincial Tourism Promotions and Development Office (PTPDO)',
    sourceUrl: 'https://palawan.gov.ph/tourism/san-vicente-long-beach-investment-update',
    snippet: 'Four major sustainable hospitality consortia have secured development endorsements from the Palawan Provincial Government to establish carbon-neutral boutique resorts along San Vicente’s 14-kilometer Long Beach, synchronized with the completion of the airport passenger terminal expansion.',
    fullBriefing: [
      'The investments conform strictly to the Palawan Comprehensive Land Use Plan (CLUP) requiring low-density, high-value eco-tourism standards and mandatory solar architecture.',
      'The San Vicente Airport runway extension to 2,400 meters will now facilitate direct jet flights from Manila, Cebu, and international regional hubs.',
      'Under the provincial local employment covenant, at least 70% of hospitality and operations personnel must be recruited from Palawan residents.'
    ],
    economicImpact: '₱4.8 Billion private capital commitments; estimated ₱600 Million annual local supply-chain purchase from Palawan farmers, fisherfolk, and transport operators.',
    jobMarketImplications: {
      estimatedJobs: '1,200+ direct hospitality, culinary, front office, and management openings',
      demandSectors: ['Resort Management', 'Executive Chefs & F&B', 'Front Office Staff', 'Eco-Tour Guides', 'Landscape Architects', 'Guest Relations'],
      actionableAdvice: 'Hospitality professionals and bilingual customer service staff with resort experience or graduates of Palawan hospitality programs are in high demand for pre-opening hiring teams.'
    },
    relatedSearchKeywords: ['Hospitality', 'Resort', 'Chef', 'Manager', 'San Vicente', 'Tourism'],
    isFeatured: true
  },
  {
    id: 'news-4',
    title: 'Provincial PESO Palawan Unveils "Trabaho sa Isla" Livelihood Caravan & Free Tech Skills Certifications',
    headlineTagalog: 'Inilunsad ng PESO Palawan ang "Trabaho sa Isla" Caravan at Libreng Skills Training',
    category: 'Employment & Skills',
    publishedDate: 'October 9, 2026',
    relativeTime: '10 days ago',
    municipality: 'Puerto Princesa & 18 Municipalities',
    source: 'Palawan Provincial Government',
    sourceDepartment: 'Provincial Employment Service Office (PESO) Palawan & Capitol Information Office',
    sourceUrl: 'https://palawan.gov.ph/peso/trabaho-sa-isla-caravan-announcement',
    snippet: 'Governor Victorino Dennis Socrates and PESO Palawan, in partnership with DOLE and TESDA Provincial Training Center, kicked off the province-wide mobile employment caravan offering over 2,500 active job openings, on-site interviews, and free tech-voc certification vouchers.',
    fullBriefing: [
      'The caravan will tour all mainland and island municipalities through December 2026, offering fast-track processing for NBI clearances, PhilHealth, SSS, and Cedula.',
      'Free training vouchers for high-demand tracks: Digital Virtual Assistance & Remote Bookkeeping, Solar PV Maintenance NC II, Eco-Tour Guiding NC II, and Commercial Baking.',
      'Over 60 accredited local employers—ranging from eco-resorts and IT outsourcing companies to construction firms—are participating in direct on-site job matches.'
    ],
    economicImpact: 'Over 2,500 local job matches facilitated; ₱18 Million allocated by the Provincial Government for worker skills development and youth apprentice stipends.',
    jobMarketImplications: {
      estimatedJobs: '2,500+ vacancies across private employers and provincial LGU departments',
      demandSectors: ['Administrative & VA', 'Hospitality & Tourism', 'IT Support', 'Skilled Construction', 'Bookkeeping'],
      actionableAdvice: 'Job seekers on Hanap Palawan can take advantage of employer fast-track verification badges and submit their digital CVs directly.'
    },
    relatedSearchKeywords: ['Admin', 'Virtual Assistant', 'Customer Support', 'IT Support', 'Puerto Princesa'],
    isFeatured: false
  },
  {
    id: 'news-5',
    title: 'Bataraza & Narra Agro-Industrial Eco-Zone Framework Ratified by Sangguniang Panlalawigan',
    headlineTagalog: 'Pinagtibay ang Agro-Industrial Corridor sa Timog Palawan para sa Lokal na Industriya',
    category: 'Economic Development',
    publishedDate: 'October 6, 2026',
    relativeTime: '2 weeks ago',
    municipality: 'Bataraza & Narra',
    source: 'Palawan Provincial Government',
    sourceDepartment: 'Provincial Economic Enterprise and Investment Development Office (PEEIDO)',
    sourceUrl: 'https://palawan.gov.ph/economic-development/southern-palawan-agro-industrial-park',
    snippet: 'The Sangguniang Panlalawigan has formally approved the operational guidelines for the 250-hectare Southern Palawan Special Agro-Industrial & Green Mineral Beneficiation Park, offering pioneering fiscal incentives for value-adding export facilities.',
    fullBriefing: [
      'The enterprise zone focuses on domestic value addition: commercial virgin coconut oil refining, cashew kernel processing plants, and modern high-purity mineral downstream plants.',
      'A dedicated commercial deep-water wharf and renewable biomass cogeneration facility are integrated into the master plan to provide clean, self-sustaining industrial operations.',
      'Local cooperative farm unions in Narra, Brooke’s Point, and Bataraza will serve as contracted raw material suppliers under guaranteed floor-price agreements.'
    ],
    economicImpact: '₱3.5 Billion targeted investment in manufacturing and value-addition; estimated 45% uplift in gross farm-gate revenue for South Palawan coconut and cashew farmers.',
    jobMarketImplications: {
      estimatedJobs: '650+ industrial, QA/QC, agronomy, and supply-chain positions',
      demandSectors: ['Industrial Engineering', 'Plant Operations', 'Food Technology & Chemistry', 'Warehouse Logistics', 'Agronomists'],
      actionableAdvice: 'Chemical engineers, industrial technicians, quality inspectors, and logistics specialists will see sustained hiring through 2026-2027.'
    },
    relatedSearchKeywords: ['Quality Assurance', 'Supply Chain', 'Logistics', 'Operations', 'Narra'],
    isFeatured: false
  },
  {
    id: 'news-6',
    title: 'Provincial Agriculture Office Completes 5 Solar-Powered Cold Storage Network for Coastal Fisherfolk',
    headlineTagalog: 'Naitayo ang 5 Solar Cold Storage Hubs para sa mga Mangingisda sa Narra, Roxas, at Brooke’s Point',
    category: 'Agriculture & Fisheries',
    publishedDate: 'October 2, 2026',
    relativeTime: '2 weeks ago',
    municipality: 'Narra, Roxas, Brooke’s Point & Taytay',
    source: 'Palawan Provincial Government',
    sourceDepartment: 'Office of the Provincial Agriculturist (OPA) - Fisheries Division',
    sourceUrl: 'https://palawan.gov.ph/agriculture/solar-cold-storage-facilities-turnover',
    snippet: 'To curb post-harvest marine product losses and stabilize market pricing for coastal communities, the Palawan Provincial Government completed the turnover of five 50-metric-ton solar-powered cold storage and blast freezing units along Palawan’s key fishing bays.',
    fullBriefing: [
      'Each facility utilizes rooftop 45 kW solar arrays with intelligent micro-inverters, lowering operational refrigeration electricity overhead by 70%.',
      'The facilities are operated collaboratively by accredited local fishermen cooperatives and the municipal agriculture offices under Provincial Government supervision.',
      'Stabilized cold chain infrastructure enables Palawan fishermen to supply fresh tuna, Spanish mackerel, and dried seafood directly to top-tier island resorts and export distributors in Metro Manila.'
    ],
    economicImpact: 'Reduces seasonal marine catch spoilage from 32% to below 5%; strengthens food security and income stability for over 4,200 municipal registered fisherfolk.',
    jobMarketImplications: {
      estimatedJobs: '180+ refrigeration, cold-chain logistics, and cooperative management roles',
      demandSectors: ['HVAC & Refrigeration Technicians', 'Cold Chain Logistics', 'Cooperative Managers', 'Fishery Inspectors', 'Fleet Drivers'],
      actionableAdvice: 'Technicians with refrigeration (RAC NC II) and cooperative management experience can connect directly with municipal agriculture programs.'
    },
    relatedSearchKeywords: ['Technician', 'Logistics', 'Agriculture', 'Fleet', 'Taytay'],
    isFeatured: false
  },
  {
    id: 'news-7',
    title: 'Puerto Princesa International Cruise Wharf Phase 3 Reaches 85% Completion',
    headlineTagalog: 'Puerto Princesa Cruise Wharf Phase 3 Halos Tapos Na: Pagdagsa ng mga Turista Inihahanda',
    category: 'Infrastructure & Energy',
    publishedDate: 'September 28, 2026',
    relativeTime: '3 weeks ago',
    municipality: 'Puerto Princesa City',
    source: 'Palawan Provincial Government',
    sourceDepartment: 'Provincial Information Office (PIO) & City Tourism Council',
    sourceUrl: 'https://palawan.gov.ph/infrastructure/puerto-princesa-cruise-port-expansion',
    snippet: 'The expanded Puerto Princesa Cruise Port Terminal, engineered to dock world-class cruise liners carrying up to 4,500 international passengers, is on schedule for final commissioning ahead of the peak cruise season, integrating green passenger promenades and Palawan artisan pavilions.',
    fullBriefing: [
      'The 350-meter deep-draft berthing quay accommodates the latest generation of eco-friendly cruise vessels with onshore shore-power capability to reduce harbor emissions.',
      'Integrated transport dispatch hub will manage dispatch for 150+ tourist vans and accredited tour operators connecting guests to the Puerto Princesa Underground River and Honda Bay.',
      'The terminal features designated exhibition halls showcasing Palawan indigenous weaving, pearl jewelry, and locally processed agricultural specialties.'
    ],
    economicImpact: '₱850 Million in projected annual tourist passenger shore expenditures; direct revenue growth for 450+ micro-retailers, cultural performers, and tour guides.',
    jobMarketImplications: {
      estimatedJobs: '420+ passenger handling, accredited guiding, and retail positions',
      demandSectors: ['Accredited Tour Guides', 'Guest Services', 'Shuttle Transport Fleet', 'Port Operations', 'Security & Safety'],
      actionableAdvice: 'DOT-accredited tour guides, multilingual guest relations agents, and transport coordinators are actively being recruited for the 2026-2027 season.'
    },
    relatedSearchKeywords: ['Tour Guide', 'Guest Relations', 'Driver', 'Hospitality', 'Puerto Princesa'],
    isFeatured: false
  },
  {
    id: 'news-8',
    title: 'El Nido Bacuit Bay Ecological Wastewater Treatment & Clean Water Pipeline Phase 2 Expands Coverage',
    headlineTagalog: 'Pinalawak ang Clean Water Pipeline at Ecological Sewage System sa El Nido',
    category: 'Infrastructure & Energy',
    publishedDate: 'September 24, 2026',
    relativeTime: '3 weeks ago',
    municipality: 'El Nido',
    source: 'Palawan Provincial Government',
    sourceDepartment: 'Provincial Environment and Natural Resources Office (PGENRO)',
    sourceUrl: 'https://palawan.gov.ph/environment/el-nido-bacuit-bay-water-treatment',
    snippet: 'The Palawan Provincial Government, in close collaboration with the Municipality of El Nido and DENR, has extended the centralized ecological wastewater interceptor network to six coastal barangays, guaranteeing Bacuit Bay’s Class SB marine water quality standards.',
    fullBriefing: [
      'The Phase 2 expansion connects over 220 beachfront commercial hotels, dive centers, and residential clusters to the centralized biological nutrient removal wastewater facility.',
      'A parallel 18-kilometer potable water transmission pipeline fed by protected watershed springs in northern El Nido was laid to guarantee potable drinking water supplies year-round.',
      'Water quality monitoring data will be publicly accessible via the provincial environmental open-data dashboard to maintain transparency with eco-travelers.'
    ],
    economicImpact: 'Protects the multi-billion peso natural asset value of Bacuit Bay; guarantees compliance with sustainable UNESCO Biosphere Reserve criteria.',
    jobMarketImplications: {
      estimatedJobs: '210+ environmental engineers, treatment plant operators, and field inspectors',
      demandSectors: ['Environmental Engineering', 'Water Quality Analysts', 'Pipeline Maintenance', 'Wastewater Plant Operators', 'Compliance Officers'],
      actionableAdvice: 'Environmental science graduates and certified wastewater treatment plant operators are in critical demand across local resorts and utility consortiums.'
    },
    relatedSearchKeywords: ['Environmental', 'Engineer', 'Water', 'Technician', 'El Nido'],
    isFeatured: false
  }
];
