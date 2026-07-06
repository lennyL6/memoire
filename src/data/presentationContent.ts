export type SlideKind =
  | 'opening'
  | 'roadmap'
  | 'issue'
  | 'problem'
  | 'methodology'
  | 'benchmarkLogic'
  | 'offersSnapshot'
  | 'elearning'
  | 'ar'
  | 'vr'
  | 'internalDiagnosis'
  | 'externalDiagnosis'
  | 'benchmarkSynthesis'
  | 'strategicSynthesis'
  | 'segmentation'
  | 'positioning'
  | 'actionOverview'
  | 'portfolio'
  | 'training'
  | 'pilot'
  | 'kpi'
  | 'budget'
  | 'roi'
  | 'risksFinal'
  | 'thankYou'
  | 'annex';

export type Note = {
  slideId: string;
  title: string;
  purpose: string;
  duration: string;
  scriptFR: string;
  keySentence: string;
  juryRisk: string;
  shortAnswer: string;
};

export type Slide = {
  id: string;
  screen: number | string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  kind: SlideKind;
  note: Note;
  bullets?: string[];
  message?: string;
  data?: Record<string, unknown>;
};

export type SlideBrief = {
  keyMessage: string;
  proof: string;
  conclusion: string;
  transition: string;
  usefulDetail?: string;
};

export const brand = {
  company: 'Fiducial FPSG',
  website: 'https://www.fiducial-fpsg.fr/',
  colors: {
    deep: '#007A3D',
    mint: '#DFF3EA',
    anthracite: '#2F3A3A',
    offwhite: '#F7FAF8',
    light: '#E8ECEA',
    accent: '#00A86B'
  }
};

export const financialBaseline = {
  ar: 347705,
  elearning: 48974,
  vr: 5800,
  total: 402479,
  directCostTotal: 8300,
  internalHours: 89,
  internalHourlyRate: 12.31,
  internalTimeCost: 1096,
  budgetTotal: 9396,
  grossMarginRate: 0.35
};

export const roiScenarios = [
  { name: 'Conservative', growth: '+5%', additionalRevenue: 20124, additionalMargin: 7043, roi: -25.0 },
  { name: 'Realistic', growth: '+10%', additionalRevenue: 40248, additionalMargin: 14087, roi: 49.9 },
  { name: 'Ambitious', growth: '+20%', additionalRevenue: 80496, additionalMargin: 28174, roi: 199.9 }
];

export const budgetItems = [
  { name: 'Commercial offer portfolio', directCost: 2000 },
  { name: 'Sales team training', directCost: 3500 },
  { name: 'Targeted pilot campaign', directCost: 2300 },
  { name: 'KPI dashboard', directCost: 500 }
];

export const benchmarkActors = [
  {
    actor: 'Apave Formation',
    perspective: 'Direct competitor perspective',
    insight: 'Sell operational solutions, not technology.',
    application: 'Strengthen arguments around compliance, safety, time savings and learner engagement.'
  },
  {
    actor: 'École Rockefeller Lyon',
    perspective: 'Pedagogical innovation perspective',
    insight: 'Innovation must be pedagogically credible.',
    application: 'Connect each offer to learning objectives, realistic scenarios, trainer support and evaluation.'
  },
  {
    actor: 'OCP Répartition',
    perspective: 'Key account client perspective',
    insight: 'Key accounts need reliability, proof and simplicity.',
    application: 'Use demonstrations, pilots and concrete use cases before broader deployment.'
  },
  {
    actor: 'Axe Capital Lyon',
    perspective: 'B2B sales strategy perspective',
    insight: 'High-value offers require value-based selling and sales enablement.',
    application: 'Train salespeople, clarify the offer portfolio and implement dedicated KPIs.'
  }
];

export const offerMaturity = [
  {
    offer: 'Customized e-learning',
    maturity: 'High-value potential',
    target: 'Large accounts / multi-site clients',
    issue: 'Too dependent on senior sales profiles',
    score: 72
  },
  {
    offer: 'Augmented reality',
    maturity: 'Most accessible offer',
    target: 'Existing fire safety clients / SMEs',
    issue: 'Needs stronger commercial structuring and monitoring',
    score: 84
  },
  {
    offer: 'Virtual reality',
    maturity: 'Pedagogically relevant',
    target: 'Vehicle fleets / mobile employees',
    issue: 'Commercially underactivated and exposed to gadget perception',
    score: 45
  }
];

export const segmentation = [
  {
    offer: 'E-learning',
    targets: ['Large accounts', 'Multi-site clients', 'Specific internal processes'],
    logic: 'Customization / standardization / scalability'
  },
  {
    offer: 'AR',
    targets: ['Existing fire safety clients', 'SMEs', 'Recurring B2B clients'],
    logic: 'Upsell / visual impact / operational realism'
  },
  {
    offer: 'VR',
    targets: ['Vehicle fleets', 'Logistics', 'Field teams', 'Mobile employees'],
    logic: 'Road risk prevention / realistic simulation'
  }
];

export const kpis = [
  { kpi: 'Offers presented', type: 'Recommended KPI', value: 'Track' },
  { kpi: 'Demonstrations', type: 'Recommended KPI', value: 'Track' },
  { kpi: 'Quotes issued', type: 'Recommended KPI', value: 'Track' },
  { kpi: 'Quote value', type: 'Recommended KPI', value: 'Track' },
  { kpi: 'Conversion rate', type: 'Recommended KPI', value: 'Track' },
  { kpi: 'Signed revenue', type: 'Recommended KPI', value: 'Track' },
  { kpi: 'Gross margin', type: 'Recommended KPI', value: 'Track' },
  { kpi: 'Average deal value', type: 'Recommended KPI', value: 'Track' },
  { kpi: 'Client satisfaction', type: 'Recommended KPI', value: 'Track' },
  { kpi: 'Refusal reasons', type: 'Recommended KPI', value: 'Track' }
];

export const timeline = [
  { week: 'W1', title: 'Clarify', actions: ['Formalize positioning', 'Create concise sales materials'] },
  { week: 'W2', title: 'Train', actions: ['1-day session', 'Sales scripts', 'Objection handling'] },
  { week: 'W3', title: 'Launch', actions: ['Select 40 clients', 'Segment by offer relevance'] },
  { week: 'W4', title: 'Demonstrate', actions: ['Pilot sessions', 'Quotes', 'Client feedback'] },
  { week: 'W5', title: 'Analyze', actions: ['Review conversion', 'Capture refusal reasons'] },
  { week: 'W6', title: 'Scale', actions: ['Adjust pitch', 'Extend to wider portfolio'] }
];

export const slideBriefs: Record<string, SlideBrief> = {
  opening: {
    keyMessage: 'Mission de conseil sur la transformation d’offres innovantes en croissance commerciale.',
    proof: '3 offres étudiées : e-learning, réalité augmentée incendie, réalité virtuelle risque routier.',
    conclusion: 'Le sujet n’est pas technologique, il est commercial.',
    transition: 'Je vais suivre une logique de consultant : problème, diagnostic, recommandations, ROI.'
  },
  roadmap: {
    keyMessage: 'La présentation suit une logique de mission de conseil, du diagnostic à la décision.',
    proof: '8 blocs : business issue, methodology, diagnosis, benchmark, strategic synthesis, action plan, budget & ROI, final recommendation.',
    conclusion: 'L’objectif est de passer d’un constat à un plan exploitable par Fiducial FPSG.',
    transition: 'Je commence par le problème business central.'
  },
  'core-issue': {
    keyMessage: 'Fiducial FPSG already has innovative offers; the real issue is commercial scalability.',
    proof: 'Main barriers: unclear positioning, uneven sales appropriation, and lack of dedicated monitoring.',
    conclusion: 'The issue is not available innovation, but the commercial system around it.',
    transition: 'This leads to a strategic, commercial and operational problem statement.'
  },
  'problem-statement': {
    keyMessage: 'The problem statement focuses on turning high-value offers into real commercial potential.',
    proof: 'Central question: how to enhance and commercialize e-learning, AR and VR for professional clients.',
    conclusion: 'The answer must cover strategy, sales execution and operational implementation.',
    transition: 'To answer this properly, I used a mixed methodology.'
  },
  methodology: {
    keyMessage: 'The methodology avoids a purely theoretical or intuitive recommendation.',
    proof: 'Literature review, internal diagnosis, offer analysis, benchmark, strategic synthesis, recommendations, budget and ROI.',
    conclusion: 'The recommendations are based on theory, field observation, commercial evidence and external comparison.',
    transition: 'The benchmark was built around four complementary perspectives.'
  },
  'benchmark-logic': {
    keyMessage: 'The benchmark does not only compare competitors; it covers four angles of the commercial issue.',
    proof: 'Apave = competitor; Rockefeller = pedagogy; OCP = key account client; Axe Capital = B2B sales.',
    conclusion: 'Each actor provides a useful lesson for Fiducial FPSG.',
    transition: 'Before presenting the benchmark lessons, I first need to explain the maturity of the three offers.',
    usefulDetail: 'The benchmark criteria are perceived value, adoption barriers, target clients, sales tools and lessons for Fiducial FPSG.'
  },
  'offers-snapshot': {
    keyMessage: 'The three offers do not have the same level of commercial maturity.',
    proof: 'E-learning = high potential; AR = most accessible offer; VR = relevant but underactivated.',
    conclusion: 'A single generic strategy for the three offers would not be effective.',
    transition: 'I will start with e-learning, which has the strongest key account potential.'
  },
  'elearning-diagnosis': {
    keyMessage: 'E-learning is a high-value offer, but its internal commercial scalability is limited.',
    proof: 'Decathlon €4,500, Paris La Défense €5,720, IBM €13,560 excluding tax.',
    conclusion: 'The offer must be sold as a reusable digital asset, not as a simple online module.',
    transition: 'Augmented reality is different because it is more immediately accessible commercially.',
    usefulDetail: 'The client buys a customized project: client process, tailored content, SCORM delivery and reuse.'
  },
  'ar-diagnosis': {
    keyMessage: 'Augmented reality is the most mature short-term commercial lever.',
    proof: 'Familiar need: fire safety; demonstrable value; visual impact; upsell potential.',
    conclusion: 'AR is already understandable for clients, but it still needs stronger commercial structuring and monitoring.',
    transition: 'Virtual reality is different: it is pedagogically relevant, but commercially more fragile.'
  },
  'vr-diagnosis': {
    keyMessage: 'Virtual reality is relevant, but still commercially underactivated.',
    proof: 'Professional road risk, mobile workers, realistic scenarios, and gadget perception risk.',
    conclusion: 'VR must be sold as road risk prevention, not as a technological experience.',
    transition: 'These offer-level findings are confirmed by the broader internal diagnosis.'
  },
  'internal-diagnosis': {
    keyMessage: 'The assets are real, but the commercial system is incomplete.',
    proof: 'Strengths: existing offers, safety credibility, B2B client base, e-learning capability, positive AR feedback.',
    conclusion: 'The problem is not the quality of the offers, but their commercial structuring.',
    transition: 'The external diagnosis shows that the market is favorable, but adoption is not automatic.',
    usefulDetail: 'Main weaknesses: no dedicated objectives, insufficient internal training, limited sales materials and no specific KPI dashboard.'
  },
  'external-diagnosis': {
    keyMessage: 'Demand is evolving, but adoption of innovative offers is not automatic.',
    proof: 'Opportunities: flexibility, scalability, modernization, upselling and differentiation.',
    conclusion: 'The market can be receptive if the value is clear, simple and proven.',
    transition: 'The benchmark confirms the need to transform innovation into perceived value.',
    usefulDetail: 'Threats: price sensitivity, resistance to change, attachment to face-to-face training, gadget perception and difficult short-term ROI proof.'
  },
  'benchmark-synthesis': {
    keyMessage: 'The benchmark confirms that innovation must become perceived value.',
    proof: 'Apave = operational solution; Rockefeller = pedagogical credibility; OCP = proof and simplicity; Axe = value-based selling.',
    conclusion: 'Fiducial FPSG must better package, prove, sell and monitor its offers.',
    transition: 'These lessons lead to the strategic shift from available innovation to commercial scalability.'
  },
  'strategic-synthesis': {
    keyMessage: 'The strategy is to move from innovation availability to commercial scalability.',
    proof: 'Chain: value proposition → sales appropriation → client understanding → adoption → performance.',
    conclusion: 'Performance depends on a structured commercial system, not only on the quality of the offers.',
    transition: 'This system starts with clear target segmentation.'
  },
  segmentation: {
    keyMessage: 'Fiducial FPSG should not sell every offer to every client.',
    proof: 'E-learning = large accounts/multi-site clients; AR = fire safety clients/SMEs/recurring clients; VR = fleets/logistics/mobile teams.',
    conclusion: 'Good segmentation reduces price resistance because each offer answers a real client problem.',
    transition: 'This segmentation must be supported by a clear positioning.'
  },
  positioning: {
    keyMessage: 'Fiducial FPSG should remain a safety training expert using digital and immersive solutions as levers.',
    proof: 'The company should not become a technology provider; credibility comes from safety, compliance and prevention.',
    conclusion: 'Digital and immersive solutions reinforce the expertise; they do not replace it.',
    transition: 'This positioning is translated into four operational actions.'
  },
  'action-overview': {
    keyMessage: 'The action plan structures commercial scalability through four levers.',
    proof: 'Commercial portfolio, sales training, 40-client pilot campaign, KPI dashboard.',
    conclusion: 'The first two actions prepare the system; the last two test and monitor it.',
    transition: 'The first action is to clarify the commercial offer portfolio.'
  },
  'rec-portfolio': {
    keyMessage: 'The first recommendation is to create a clear commercial offer portfolio.',
    proof: 'One sales sheet per offer with targets, client problem, benefits, pricing logic, use cases, objections and proof.',
    conclusion: 'The objective is to give salespeople a common and usable commercial language.',
    transition: 'But sales materials are not enough; salespeople must also appropriate the offers.'
  },
  'rec-training': {
    keyMessage: 'The second recommendation is to train salespeople in value-based selling.',
    proof: '4 salespeople, 1 day, demonstrations, objection handling and discovery questionnaire.',
    conclusion: 'The goal is to move from product description to client value explanation.',
    transition: 'Once the sales force is equipped, the approach must be tested on a pilot portfolio.',
    usefulDetail: 'Internal cost formula = 4 salespeople × 7 hours × loaded hourly cost.'
  },
  'rec-pilot': {
    keyMessage: 'The third recommendation is to launch a 40-client pilot campaign before scaling.',
    proof: 'Selection, segmentation, email, phone follow-up, demonstration, refusal analysis.',
    conclusion: 'The pilot is not only a sales action; it is also a market learning mechanism.',
    transition: 'To make this learning useful, the company needs KPI monitoring.',
    usefulDetail: 'Six-week timeline: clarify, train, launch, demonstrate, analyze and scale.'
  },
  'rec-kpi': {
    keyMessage: 'The fourth recommendation is to install a dedicated KPI dashboard.',
    proof: 'These indicators are recommended management indicators; they are not existing results.',
    conclusion: 'The dashboard turns isolated opportunities into a managed commercial priority.',
    transition: 'These four actions are then translated into a complete budget.',
    usefulDetail: 'Activation + performance: offers presented, demonstrations, quotes, conversion, revenue, margin, satisfaction and refusal reasons.'
  },
  'budget-baseline': {
    keyMessage: 'The budget is controlled and includes both direct costs and internal time.',
    proof: 'Direct costs €8,300; internal time €1,096; total budget €9,396.',
    conclusion: 'Compared with the 2025 baseline of €402,479, the budget remains proportionate.',
    transition: 'The next question is whether this budget can generate profitable growth.',
    usefulDetail: 'Internal time = 89 hours × €12.31 gross/hour.'
  },
  'roi-break-even': {
    keyMessage: 'The realistic scenario makes the plan profitable.',
    proof: '35% margin assumption; realistic scenario +10% = +49.9% ROI.',
    conclusion: 'The plan does not need an extreme growth scenario to become financially defendable.',
    transition: 'The final recommendation is therefore to structure, activate and scale the offers.',
    usefulDetail: 'Conservative +5% = negative ROI; ambitious +20% = highly favorable ROI.'
  },
  'risks-final': {
    keyMessage: 'The final recommendation is to structure, activate and scale the existing offers.',
    proof: 'Fiducial FPSG already has the offers, the credibility and the client base.',
    conclusion: 'The priority is to transform these offers into structured, measurable and profitable growth drivers.',
    transition: 'Success will depend on sales appropriation, targeted client selection and monthly KPI monitoring.'
  },
  'thank-you': {
    keyMessage: 'Thank you for listening.',
    proof: 'No additional detail; keep the closing clean.',
    conclusion: 'Ready to answer your questions.',
    transition: 'Move to jury questions.'
  }
};

const notes = (slideId: string, title: string, purpose: string, duration: string, scriptFR: string, keySentence: string, juryRisk: string, shortAnswer: string): Note => ({
  slideId,
  title,
  purpose,
  duration,
  scriptFR,
  keySentence,
  juryRisk,
  shortAnswer
});

export const slides: Slide[] = [
  {
    id: 'opening',
    screen: 1,
    eyebrow: 'MBA defense - Mission d’expertise',
    title: 'Enhancing the Commercial Development of High-Value Training Offers at Fiducial FPSG',
    subtitle: 'E-learning, Augmented Reality & Virtual Reality - Mission d’expertise',
    kind: 'opening',
    data: { author: 'Lenny Lanfrey', programme: 'MBA Management International Business', school: 'MBway Lyon', company: 'Fiducial FPSG', year: '2026' },
    note: notes('opening','Opening','Ouvrir avec une posture professionnelle et poser le cadre immédiatement.','1 min','Bonjour, je vais vous présenter ma mission d’expertise sur le développement commercial des offres à forte valeur ajoutée chez Fiducial FPSG. L’objectif est de montrer comment transformer des offres déjà existantes en vrais leviers de croissance structurés.','The subject is not technology for technology’s sake; it is commercial scalability.','Le jury peut demander pourquoi avoir choisi ce sujet.','Parce que le terrain montre que les offres existent déjà, mais que leur activation commerciale reste inégale.')
  },
  {
    id: 'roadmap', screen: 2, eyebrow: 'Executive roadmap', title: 'A consulting logic, from issue to recommendation', kind: 'roadmap',
    data: { steps: ['Business issue','Methodology','Diagnosis','Benchmark','Strategic synthesis','Action plan','Budget & ROI','Final recommendation'] },
    note: notes('roadmap','Executive roadmap','Montrer une logique de mission de conseil et rassurer le jury sur la structure.','1 min','Je vais suivre une logique volontairement professionnelle : d’abord le problème business, puis la méthode, le diagnostic, le benchmark, la synthèse stratégique, le plan d’action, le budget, le ROI et enfin la recommandation finale.','The structure moves from observation to decision.','Le jury peut demander si la présentation respecte le mémoire.','Oui, la structure reprend le fil du mémoire, mais compressé pour l’oral.')
  },
  {
    id: 'core-issue', screen: 3, eyebrow: 'Core business issue', title: 'Innovation exists. Scalability is the issue.', kind: 'issue',
    message: 'Fiducial FPSG does not lack innovation. The challenge is commercial scalability.',
    bullets: ['Existing high-value offers', 'Uneven sales force appropriation', 'Unclear positioning for some offers', 'Lack of dedicated monitoring'],
    note: notes('core-issue','Core business issue','Poser le vrai problème : pas un manque d’innovation, mais un manque de structuration commerciale.','1 min 30','Le point central de mon mémoire est volontairement simple. Fiducial FPSG ne part pas de zéro : il existe déjà des offres innovantes. Le problème est que leur développement reste trop dépendant des personnes, des opportunités et du niveau d’appropriation commerciale.','The issue is not availability; it is structured commercialization.','Le jury peut demander si ce n’est pas juste un problème de communication.','La communication est une partie du problème, mais le sujet est plus large : segmentation, argumentaire, formation commerciale, pilotage et ROI.')
  },
  {
    id: 'problem-statement', screen: 4, eyebrow: 'Problem statement', title: 'A strategic, commercial and operational question', kind: 'problem',
    message: 'How can Fiducial FPSG enhance and commercialize its high-value training offers: e-learning, augmented reality and virtual reality for professional clients, considering their commercial development potential?',
    data: { dimensions: ['Strategic issue', 'Commercial issue', 'Operational issue'] },
    note: notes('problem-statement','Problem statement','Cadrer académiquement et commercialement la problématique exacte.','1 min 30','La problématique relie trois dimensions : stratégique, car ces offres peuvent différencier Fiducial FPSG ; commerciale, car il faut savoir les vendre ; opérationnelle, car il faut des actions, un budget, des KPI et une mise en œuvre réaliste.','The problem statement links strategy, sales execution and operational control.','Le jury peut demander pourquoi la problématique est en anglais.','Le mémoire et le programme sont orientés business international ; la formulation reste simple, claire et directement exploitable.')
  },
  {
    id: 'methodology', screen: 5, eyebrow: 'Methodology', title: 'A mixed approach to avoid a purely theoretical answer', kind: 'methodology',
    bullets: ['Literature review', 'Internal diagnosis', 'Analysis of existing offers and commercial proposals', 'Benchmark with four complementary perspectives', 'Strategic synthesis', 'Recommendations', 'Budget, ROI and execution priorities'],
    note: notes('methodology','Methodology','Prouver la rigueur et montrer que les recommandations ne sortent pas de nulle part.','1 min 45','La méthode combine une revue de littérature, un diagnostic interne, l’analyse d’offres réelles et de propositions commerciales, puis un benchmark. L’objectif était de croiser théorie, terrain et pratiques externes avant de recommander des actions.','The recommendations are built from converging evidence, not intuition.','Le jury peut demander comment tu limites le biais d’observation terrain.','Je l’ai limité en croisant observation interne, documents commerciaux, benchmark et littérature.')
  },
  {
    id: 'benchmark-logic', screen: 6, eyebrow: 'Benchmark logic', title: 'Four perspectives, one commercial question', kind: 'benchmarkLogic',
    data: { criteria: ['Perceived value', 'Adoption barriers', 'Target clients', 'Sales tools', 'Lessons for Fiducial FPSG'] },
    note: notes('benchmark-logic','Benchmark logic','Justifier les quatre acteurs du benchmark et éviter l’impression d’un choix arbitraire.','1 min 45','Le benchmark ne cherche pas seulement à comparer des concurrents. Il combine quatre angles : concurrent direct, innovation pédagogique, client grand compte et stratégie commerciale B2B. Cette grille permet de comprendre comment une offre innovante devient réellement vendable.','The benchmark is not a list of companies; it is a set of perspectives.','Le jury peut demander pourquoi ces quatre acteurs.','Parce qu’ils couvrent quatre dimensions complémentaires : concurrence, pédagogie, achat client et vente B2B.')
  },
  {
    id: 'offers-snapshot', screen: 7, eyebrow: 'Diagnosis entry point', title: 'Three offers, three levels of commercial maturity', kind: 'offersSnapshot',
    note: notes('offers-snapshot','Three offers maturity snapshot','Présenter les trois offres sans faire catalogue et installer le diagnostic.','1 min 30','Les trois offres n’ont pas le même niveau de maturité commerciale. L’e-learning a un fort potentiel grands comptes, la réalité augmentée est la plus accessible commercialement, et la réalité virtuelle est pertinente pédagogiquement mais encore sous-activée commercialement.','The three offers must not be managed as one generic innovation category.','Le jury peut demander pourquoi ne pas traiter les trois de la même manière.','Parce qu’elles n’ont ni les mêmes cibles, ni les mêmes freins, ni le même niveau d’appropriation commerciale.')
  },
  {
    id: 'elearning-diagnosis', screen: 8, eyebrow: 'E-learning diagnosis', title: 'High value, but limited internal scalability', kind: 'elearning',
    message: 'Strong key account potential, but too dependent on senior sales profiles.',
    bullets: ['Relevant for large accounts and multi-site clients', 'Customization, standardization and long-term reuse', 'Commercial issue: complex consultative selling'],
    data: { examples: [{ label: 'Decathlon proposal', value: 4500 }, { label: 'Paris La Défense proposal', value: 5720 }, { label: 'IBM project', value: 13560 }] },
    note: notes('elearning-diagnosis','E-learning diagnosis','Montrer le potentiel économique et la limite de scalabilité commerciale.','2 min','L’e-learning sur mesure est une offre à forte valeur. Les exemples Decathlon, Paris La Défense et IBM montrent des montants significatifs. Mais l’offre nécessite une vente plus consultative : cadrage, personnalisation, SCORM, réutilisation. Cela explique pourquoi elle dépend davantage de profils commerciaux expérimentés.','E-learning is not a cheap online substitute; it is a reusable training asset.','Le jury peut demander si ces montants suffisent à prouver un potentiel marché.','Ils ne prouvent pas le marché complet, mais ils prouvent que l’offre peut générer du revenu significatif quand elle est bien positionnée.')
  },
  {
    id: 'ar-diagnosis', screen: 9, eyebrow: 'Augmented reality diagnosis', title: 'The most mature short-term lever', kind: 'ar',
    message: 'The most mature and commercially accessible offer.',
    bullets: ['Directly linked to familiar fire safety needs', 'Easy to demonstrate', 'Visual and engaging', 'Strong upsell potential', 'Issue: stronger structuring and dedicated monitoring needed'],
    note: notes('ar-diagnosis','Augmented reality diagnosis','Expliquer pourquoi la RA est le levier court terme prioritaire.','1 min 45','La réalité augmentée est la plus accessible car elle améliore un besoin déjà connu : la sensibilisation incendie. Le client comprend le sujet, la démonstration est concrète et l’upsell est logique auprès des clients incendie existants.','AR upgrades a familiar need instead of creating a new one.','Le jury peut demander si la RA est déjà suffisamment vendue.','Elle fonctionne mieux que les autres offres, mais sans objectifs dédiés ni pilotage spécifique, son développement reste insuffisamment industrialisé.')
  },
  {
    id: 'vr-diagnosis', screen: 10, eyebrow: 'Virtual reality diagnosis', title: 'Relevant, but commercially underactivated', kind: 'vr',
    message: 'Pedagogically relevant, but commercially underactivated.',
    bullets: ['Road risk as professional risk', 'Targets: vehicle fleets, logistics, field teams, mobile employees', 'Issue: unclear positioning', 'Risk: perceived as a gadget'],
    note: notes('vr-diagnosis','Virtual reality diagnosis','Montrer la lucidité : potentiel réel, mais maturité commerciale faible.','1 min 45','La réalité virtuelle a une vraie cohérence pédagogique pour le risque routier. Mais commercialement, elle doit être mieux repositionnée. Si on vend seulement une expérience VR, le risque est d’être perçu comme gadget. Il faut vendre une solution de prévention du risque routier professionnel.','VR must be sold as risk prevention, not as an immersive experience.','Le jury peut demander pourquoi ne pas abandonner la VR.','Parce que le besoin existe pour les salariés mobiles et les flottes, mais il faut un ciblage plus sélectif et un discours plus clair.')
  },
  {
    id: 'internal-diagnosis', screen: 11, eyebrow: 'Internal diagnosis', title: 'Assets are real. Commercial system is incomplete.', kind: 'internalDiagnosis',
    data: { strengths: ['Existing innovative offer portfolio', 'Credibility in safety and risk prevention', 'Existing B2B client base', 'Ability to design customized e-learning', 'Positive learner feedback for AR'], weaknesses: ['No dedicated commercial objectives', 'Insufficient internal training', 'Uneven sales knowledge', 'Limited sales materials', 'Weak structured communication', 'No specific KPI dashboard'] },
    note: notes('internal-diagnosis','Internal diagnosis','Synthétiser les forces et faiblesses internes.','2 min','Le diagnostic interne montre un paradoxe : les actifs sont là, mais le système commercial n’est pas complet. Fiducial FPSG dispose d’une crédibilité métier, d’une base client et d’offres réelles. En revanche, les objectifs, outils, formations et KPI dédiés sont insuffisants.','The company has the ingredients, but not yet the operating system.','Le jury peut demander quelle faiblesse est prioritaire.','L’appropriation commerciale, parce qu’elle conditionne la présentation des offres, les démonstrations, les devis et le suivi.')
  },
  {
    id: 'external-diagnosis', screen: 12, eyebrow: 'External diagnosis', title: 'Demand is evolving, but adoption is not automatic', kind: 'externalDiagnosis',
    data: { opportunities: ['Flexible and scalable training demand', 'Modernization of safety training', 'Upsell among existing clients', 'Differentiation from traditional providers'], threats: ['Price sensitivity', 'Resistance to change', 'Attachment to face-to-face training', 'AR/VR perceived as gadgets', 'Difficulty proving short-term ROI'] },
    note: notes('external-diagnosis','External diagnosis','Montrer les opportunités marché et les freins d’adoption.','2 min','L’environnement est favorable parce que les clients cherchent plus de flexibilité, de traçabilité, d’engagement et de formats modernes. Mais l’adoption n’est pas automatique : les prix, l’habitude du présentiel et la difficulté à prouver le ROI peuvent bloquer la décision.','Innovation creates interest; proof creates adoption.','Le jury peut demander comment lever la résistance au changement.','Par des démonstrations, des pilotes, des preuves concrètes et un discours centré sur la valeur opérationnelle.')
  },
  {
    id: 'benchmark-synthesis', screen: 13, eyebrow: 'Benchmark synthesis', title: 'Innovation must become perceived value', kind: 'benchmarkSynthesis',
    note: notes('benchmark-synthesis','Benchmark synthesis','Transformer le benchmark en enseignements actionnables.','2 min','Les quatre perspectives convergent vers un même enseignement : les clients n’achètent pas la technologie. Ils achètent une solution fiable, simple, crédible et utile. Fiducial FPSG doit donc renforcer la proposition de valeur, les preuves, les supports et la capacité commerciale.','Clients do not buy innovation; they buy operational value.','Le jury peut demander ce que le benchmark change concrètement dans tes recommandations.','Il justifie la vente par la valeur, les pilotes, la formation commerciale et les KPI dédiés.')
  },
  {
    id: 'strategic-synthesis', screen: 14, eyebrow: 'Strategic synthesis', title: 'From innovation availability to commercial scalability', kind: 'strategicSynthesis',
    data: { flow: ['Clear value proposition', 'Sales force appropriation', 'Client understanding', 'Adoption', 'Commercial performance'] },
    note: notes('strategic-synthesis','Strategic synthesis','Faire la transition entre diagnostic et stratégie.','2 min','La synthèse stratégique repose sur une chaîne simple. D’abord clarifier la valeur. Ensuite faire approprier les offres par les commerciaux. Puis rendre la valeur compréhensible pour le client. Cela réduit les freins, augmente l’adoption et améliore la performance commerciale.','Commercial performance starts before the client meeting.','Le jury peut demander si ce modèle est trop linéaire.','Il simplifie la logique, mais il reste opérationnel : chaque étape correspond à un levier d’action concret.')
  },
  {
    id: 'segmentation', screen: 15, eyebrow: 'Target segmentation', title: 'Do not sell everything to everyone', kind: 'segmentation',
    note: notes('segmentation','Target segmentation by offer','Montrer que la stratégie est ciblée et non générique.','2 min','La segmentation est essentielle. L’e-learning vise surtout les grands comptes et multisites. La RA vise les clients incendie existants, PME et clients récurrents. La VR doit viser les entreprises réellement exposées au risque routier : flottes, logistique, équipes terrain et salariés mobiles.','Relevance comes from matching the offer with the right client situation.','Le jury peut demander pourquoi ne pas pousser la VR partout.','Parce que sans besoin routier professionnel identifié, la VR risque d’être perçue comme coûteuse ou gadget.')
  },
  {
    id: 'positioning', screen: 16, eyebrow: 'Recommended positioning', title: 'A safety training expert using digital and immersive levers', kind: 'positioning',
    message: 'Fiducial FPSG should not become a technology provider. It should remain a safety training expert using digital and immersive solutions to improve compliance, prevention and learner engagement.',
    note: notes('positioning','Recommended positioning','Sécuriser le positionnement stratégique.','1 min 30','Le positionnement recommandé est volontairement prudent. Fiducial FPSG ne doit pas se présenter comme un provider technologique. Sa légitimité vient de la sécurité, de la prévention et de la formation réglementaire. Le digital et l’immersif doivent renforcer cette expertise, pas la remplacer.','Technology is the lever; safety expertise is the credibility.','Le jury peut demander pourquoi ne pas assumer un positionnement tech.','Parce que cela déplacerait Fiducial FPSG hors de sa zone de légitimité et renforcerait le risque de gadget.')
  },
  {
    id: 'action-overview', screen: 17, eyebrow: 'Action plan overview', title: 'Four actions to structure commercial scalability', kind: 'actionOverview',
    data: { recommendations: ['Create a clear commercial offer portfolio', 'Train salespeople in value-based selling', 'Launch a 40-client pilot campaign', 'Implement dedicated KPIs and monthly monitoring'] },
    note: notes('action-overview','Action plan overview','Présenter le plan d’action global avant le détail.','1 min','Les recommandations sont volontairement limitées à quatre actions. Elles se complètent : clarifier l’offre, former les commerciaux, tester sur 40 clients prioritaires, puis piloter avec des KPI mensuels.','The plan is realistic because it starts small and measures fast.','Le jury peut demander pourquoi seulement quatre recommandations.','Parce que l’enjeu est l’exécution. Quatre actions ciblées sont plus réalistes qu’un plan trop large impossible à piloter.')
  },
  {
    id: 'rec-portfolio', screen: 18, eyebrow: 'Recommendation 1', title: 'Create a clear commercial offer portfolio', kind: 'portfolio',
    bullets: ['One sales sheet per offer', 'Target clients', 'Client problem solved', 'Key benefits', 'Price logic', 'Use cases', 'Objections', 'Proof elements'],
    note: notes('rec-portfolio','Recommendation 1','Standardiser le discours commercial.','1 min 45','La première action est la base : créer des supports commerciaux courts et directement utilisables. Chaque fiche doit expliquer la cible, le problème client, les bénéfices, la logique de prix, les cas d’usage, les objections et les preuves disponibles.','Sales materials turn knowledge into repeatable execution.','Le jury peut demander si une fiche commerciale suffit.','Non, seule elle ne suffit pas. Mais elle est indispensable pour standardiser le discours avant la formation et la campagne pilote.')
  },
  {
    id: 'rec-training', screen: 19, eyebrow: 'Recommendation 2', title: 'Train salespeople in value-based selling', kind: 'training',
    bullets: ['First group of 4 salespeople', '1-day session', 'Value-based selling', 'Demonstrations', 'Objection handling', 'Discovery questionnaire'],
    message: 'Internal training cost = 4 salespeople × 7 hours × loaded hourly cost',
    note: notes('rec-training','Recommendation 2','Renforcer l’appropriation commerciale.','2 min','La deuxième action vise un premier groupe de quatre commerciaux sur une journée. L’objectif n’est pas seulement de présenter les offres, mais de les rendre vendables : démonstrations, vente par la valeur, objections, questionnaire de découverte et jeux de rôle.','Salespeople cannot scale offers they do not fully understand.','Le jury peut demander pourquoi seulement quatre commerciaux.','C’est un pilote réaliste : on teste la formation, on mesure l’impact, puis on élargit si les résultats sont concluants.')
  },
  {
    id: 'rec-pilot', screen: 20, eyebrow: 'Recommendation 3', title: 'Launch a 40-client pilot campaign', kind: 'pilot',
    bullets: ['40 priority clients', 'Existing portfolio first', 'Segment by offer relevance', 'Targeted email', 'Phone follow-up', 'Demonstrations / pilot sessions', 'Refusal reasons tracked'],
    note: notes('rec-pilot','Recommendation 3','Tester avant de généraliser.','2 min','La campagne pilote doit cibler 40 clients prioritaires, surtout dans le portefeuille existant. Chaque client doit être associé à l’offre la plus pertinente. L’objectif n’est pas uniquement de vendre, mais aussi de comprendre les réactions, objections et segments les plus réceptifs.','A pilot campaign reduces commercial risk before scaling.','Le jury peut demander pourquoi 40 clients.','C’est assez large pour obtenir des retours exploitables, mais assez limité pour rester pilotable par l’équipe commerciale.')
  },
  {
    id: 'rec-kpi', screen: 21, eyebrow: 'Recommendation 4', title: 'Install a dedicated KPI dashboard', kind: 'kpi',
    note: notes('rec-kpi','Recommendation 4','Passer d’opportunités isolées à une priorité pilotée.','1 min 45','Le dashboard est indispensable. Il doit suivre les offres présentées, démonstrations, devis, valeur des devis, conversion, chiffre d’affaires signé, marge, panier moyen, satisfaction et motifs de refus. Ces KPI sont recommandés : ils ne doivent pas être présentés comme des résultats déjà obtenus.','What is not measured is rarely managed effectively.','Le jury peut demander quel KPI est le plus important.','Au départ : offres présentées et devis émis, car ils mesurent l’activation commerciale avant même les ventes.')
  },
  {
    id: 'budget-baseline', screen: 22, eyebrow: 'Budget & 2025 baseline', title: 'A complete action budget, including internal time', kind: 'budget',
    note: notes('budget-baseline','Budget and 2025 baseline','Montrer un budget unique, complet et défendable.','2 min 30','J’ai retenu un budget prudent et complet. Il intègre les coûts directs du plan d’action, soit 8 300 euros, ainsi que la valorisation du temps interne. Les 89 heures internes estimées sont valorisées au taux de 12,31 euros brut par heure, soit 1 096 euros arrondis. Le budget total à défendre est donc de 9 396 euros. Cette approche rend l’analyse plus complète, plus réaliste et plus professionnelle.','This budget includes direct costs and internal time valuation.','Le jury peut demander pourquoi intégrer le temps interne.','Parce que le temps mobilisé a une valeur économique : l’intégrer donne un budget total plus complet et plus crédible.')
  },
  {
    id: 'roi-break-even', screen: 23, eyebrow: 'ROI scenarios', title: 'The realistic scenario delivers profitable growth', kind: 'roi',
    message: 'The realistic scenario generates a positive ROI of +49.9%, with internal time included.',
    note: notes('roi-break-even','ROI scenarios','Défendre un ROI calculé sur la marge additionnelle.','2 min 30','La marge brute retenue pour le calcul est de 35 %. Le ROI est calculé sur la marge additionnelle, et non sur le chiffre d’affaires. Le scénario conservateur à +5 % reste insuffisant, avec un ROI de -25 %. En revanche, le scénario réaliste à +10 % rend le plan rentable avec un ROI de +49,9 %, en incluant le temps interne. Le scénario ambitieux à +20 % montre le potentiel de scalabilité commerciale, avec un ROI proche de +200 %.','At +10% additional signed revenue, the action plan becomes financially profitable.','Le jury peut demander pourquoi raisonner sur la marge et non le chiffre d’affaires.','Parce qu’un ROI financier doit comparer le budget engagé à la marge additionnelle générée, pas au chiffre d’affaires brut.')
  },
  {
    id: 'risks-final', screen: 24, eyebrow: 'Final recommendation', title: 'Final recommendation: structure, activate and scale', kind: 'risksFinal',
    data: { path: ['Segment','Equip','Pilot','Measure','Scale'], successConditions: ['Sales team appropriation','Targeted client selection','Monthly KPI monitoring'], conclusion: 'Fiducial FPSG already has the offers, the credibility and the client base. The priority is now to transform high-value training offers into structured, measurable and profitable commercial growth drivers.', finalMessage: 'By structuring the go-to-market approach, Fiducial FPSG can turn existing innovation into profitable commercial scalability.' },
    note: notes('risks-final','Final recommendation','Terminer sur une recommandation positive, décisionnelle et rentable.','2 min 30','Pour conclure, Fiducial FPSG n’a pas besoin de créer une nouvelle innovation. L’entreprise dispose déjà des offres, de la crédibilité et de la base client. L’enjeu est de mieux structurer la commercialisation des offres existantes. Le plan est réaliste, mesurable et rentable dès le scénario réaliste. Les priorités d’exécution sont claires : segmentation, appropriation commerciale, pilote client et suivi mensuel des KPI.','By structuring the go-to-market approach, Fiducial FPSG can turn existing innovation into profitable commercial scalability.','Le jury peut demander quelle décision prendre après la soutenance.','Lancer le plan en séquence : segmenter, équiper les commerciaux, piloter sur 40 clients, mesurer mensuellement, puis scaler.')
  },
  {
    id: 'thank-you', screen: 25, eyebrow: 'Q&A', title: 'Thank you for listening', subtitle: 'Ready to answer your questions.', kind: 'thankYou',
    note: notes('thank-you','Thank you','Clore proprement et ouvrir la discussion avec le jury.','30 sec','Merci pour votre attention. Je suis maintenant prêt à répondre à vos questions.','Ready to answer your questions.','Le jury peut démarrer directement sur une question financière ou opérationnelle.','Revenir calmement aux chiffres clés, au plan d’action et à la logique de scalabilité.')
  }
];

export const annexes: Slide[] = [
  {
    id: 'a1-budget', screen: 'A1', eyebrow: 'Annex', title: 'Detailed budget table', kind: 'annex',
    data: { type: 'budget' },
    note: notes('a1-budget','Detailed budget table','Répondre à une question jury sur la construction du budget.','Backup','Utiliser uniquement si le jury demande le détail des coûts : 8 300 euros de coûts directs et 1 096 euros de temps interne valorisé, soit 9 396 euros au total.','The action budget includes direct costs and internal time valuation.','Pourquoi les coûts internes sont-ils intégrés ?','Parce que le plan mobilise du temps opérationnel et que sa valorisation rend le budget plus complet.')
  },
  {
    id: 'a2-roi', screen: 'A2', eyebrow: 'Annex', title: 'Detailed ROI calculation', kind: 'annex', data: { type: 'roi' },
    note: notes('a2-roi','Detailed ROI calculation','Répondre à une question sur le calcul du ROI.','Backup','Montrer que le ROI est calculé sur la marge additionnelle, avec une marge brute de 35 % et un budget total de 9 396 euros.','ROI is based on additional margin, not revenue.','Pourquoi le scénario réaliste est-il rentable ?','Parce que 40 248 euros de revenu additionnel génèrent 14 087 euros de marge, soit un ROI de +49,9 %.')
  },
  {
    id: 'a3-kpi-template', screen: 'A3', eyebrow: 'Annex', title: 'KPI dashboard template', kind: 'annex', data: { type: 'kpi' },
    note: notes('a3-kpi-template','KPI dashboard template','Montrer le modèle de pilotage.','Backup','Afficher les KPI recommandés et préciser qu’ils ne sont pas des résultats réels.','Recommended KPIs are management tools.','Quels KPI suivre au démarrage ?','Offres présentées, démonstrations, devis émis, conversion et motifs de refus.')
  },
  {
    id: 'a4-benchmark-grid', screen: 'A4', eyebrow: 'Annex', title: 'Benchmark detailed grid', kind: 'annex', data: { type: 'benchmark' },
    note: notes('a4-benchmark-grid','Benchmark detailed grid','Soutenir la méthodologie benchmark.','Backup','Revenir sur les quatre perspectives et les critères utilisés.','The benchmark compares perspectives, not only competitors.','Pourquoi OCP ou Axe Capital ?','Pour intégrer l’angle client grand compte et l’angle vente B2B.')
  },
  {
    id: 'a5-jury-questions', screen: 'A5', eyebrow: 'Annex', title: 'Potential jury questions', kind: 'annex', data: { type: 'questions' },
    note: notes('a5-jury-questions','Potential jury questions','Préparer les réponses courtes.','Backup','Utiliser comme antisèche si besoin.','Answer with evidence, not opinion.','Question piège : as-tu inventé les chiffres ?','Non, les chiffres proviennent du mémoire et des propositions commerciales analysées.')
  },
  {
    id: 'a6-offer-definitions', screen: 'A6', eyebrow: 'Annex', title: 'Offer definitions', kind: 'annex', data: { type: 'definitions' },
    note: notes('a6-offer-definitions','Offer definitions','Clarifier les offres si le jury le demande.','Backup','Expliquer simplement e-learning, RA et RV.','The offer definition must remain client-value oriented.','La RA et la RV sont-elles des formations obligatoires ?','Non, ce sont des modalités pédagogiques appliquées à des besoins de sécurité et prévention.')
  },
  {
    id: 'a7-timing', screen: 'A7', eyebrow: 'Annex', title: 'Oral timing plan', kind: 'annex', data: { type: 'timing' },
    note: notes('a7-timing','Oral timing plan','Gérer le temps de soutenance.','Backup','Se servir de ce plan pour contrôler le rythme.','The target duration is 34 to 38 minutes.','Que faire si je suis en retard ?','Accélérer sur les slides 7 à 12 et garder budget/ROI/risques.')
  },
  {
    id: 'a8-static-summary', screen: 'A8', eyebrow: 'Annex', title: 'Static backup summary', kind: 'annex', data: { type: 'summary' },
    note: notes('a8-static-summary','Static backup summary','Donner une synthèse complète en cas de bug ou question large.','Backup','Reprendre le fil rouge en 60 secondes.','Innovation exists; scalability must be built.','Quel est le message final en une phrase ?','Segmenter, équiper, tester, mesurer, puis scaler.')
  }
];

const lines = (...items: string[]) => items.map((item) => `- ${item}`).join('\n\n');

export const presenterScriptVersion = 'jury-cues-2026-07-07-v4';

export const presenterScriptsEN: Record<string, string> = {
  opening: lines(
    'Bonjour à toutes et à tous, je vais vous présenter une mission de conseil portant sur le développement commercial des offres à forte valeur ajoutée de Fiducial FPSG.',
    'Le sujet ne consiste pas à présenter un catalogue, mais à comprendre comment transformer trois offres existantes — e-learning, réalité augmentée et réalité virtuelle — en leviers de croissance structurés.',
    'La logique de la présentation sera celle d’un consultant externe : diagnostic, benchmark, recommandations, budget, ROI, puis décision finale.'
  ),
  roadmap: lines(
    'La présentation suit une logique progressive, depuis l’identification du problème business jusqu’à la recommandation finale.',
    'La première partie sert à comprendre la situation : problématique, méthodologie, diagnostic et benchmark.',
    'La seconde partie est orientée décision : synthèse stratégique, plan d’action, budget, ROI et recommandation finale pour Fiducial FPSG.'
  ),
  'core-issue': lines(
    'The starting point of the diagnosis is that Fiducial FPSG already has high-value training offers; the issue is not product creation.',
    'The main gap is between offer availability and commercial scalability: the offers exist, but they are not yet systematically positioned, sold and monitored.',
    'The strategic bridge on the slide shows the logic of the mission: clear value proposition, sales appropriation, client understanding, adoption and performance.'
  ),
  'problem-statement': lines(
    'The problem statement focuses on how Fiducial FPSG can enhance and commercialize its high-value offers for professional clients.',
    'The question is strategic because these offers must reinforce Fiducial FPSG’s positioning in safety training and risk prevention.',
    'The question is also commercial and operational because the offers must be better targeted, easier to sell and supported by measurable actions.'
  ),
  methodology: lines(
    'The methodology was designed to avoid a purely theoretical answer and to build recommendations from several sources of evidence.',
    'The analysis combines literature review, internal diagnosis, existing commercial proposals, benchmark, strategic synthesis and operational recommendations.',
    'This mixed approach makes the recommendation more credible because it connects theory, field observation, real business cases and external comparison.'
  ),
  'benchmark-logic': lines(
    'The benchmark was structured around four perspectives because the issue is not only competitive, but also pedagogical, client-oriented and commercial.',
    'Apave Formation brings the direct competitor view, École Rockefeller Lyon the pedagogical innovation view, OCP Répartition the key account client view, and Axe Capital Lyon the B2B sales strategy view.',
    'The benchmark criteria are practical: perceived value, adoption barriers, target clients, sales tools and concrete lessons for Fiducial FPSG.'
  ),
  'offers-snapshot': lines(
    'The diagnosis starts with one key observation: the three offers do not have the same commercial maturity.',
    'Customized e-learning has high-value potential but remains too dependent on senior sales profiles.',
    'Augmented reality is the most accessible offer commercially, while virtual reality is pedagogically relevant but still commercially underactivated.'
  ),
  'elearning-diagnosis': lines(
    'Customized e-learning should be presented as a custom project that becomes a reusable training asset, not as a simple online course.',
    'The process on the left is important because it shows the client buys a tailored solution: client process, tailored content, SCORM delivery and reuse.',
    'The three commercial examples confirm the value level: Decathlon at €4,500, Paris La Défense at €5,720 and IBM at €13,560, excluding tax.',
    'The main limit is internal scalability: this offer is valuable, but it needs stronger sales tools to become easier to detect, explain and sell beyond senior profiles.'
  ),
  'ar-diagnosis': lines(
    'Augmented reality is the most mature short-term lever because it improves a training need that clients already understand: fire safety.',
    'The commercial strength of this offer is that the value can be demonstrated through visual, practical and realistic scenarios.',
    'The offer has strong upsell potential with existing fire safety clients, but it still needs stronger structuring and dedicated monitoring to scale properly.'
  ),
  'vr-diagnosis': lines(
    'Virtual reality is relevant because it addresses road risk as a professional risk for mobile employees, field teams, logistics or vehicle fleets.',
    'The value of immersion only exists if it proves prevention value through realistic scenarios and safer learning conditions.',
    'The commercial risk is gadget perception, which means the offer must be positioned as professional road risk prevention, not as a VR experience.'
  ),
  'internal-diagnosis': lines(
    'The internal diagnosis shows a clear contrast: the assets are real, but the commercial system is incomplete.',
    'Fiducial FPSG already has innovative offers, safety credibility, an existing B2B client base, e-learning design capability and positive learner feedback for augmented reality.',
    'The weaknesses are mainly execution-related: no dedicated commercial objectives, uneven sales knowledge, insufficient training, limited sales materials and no specific KPI dashboard.'
  ),
  'external-diagnosis': lines(
    'The external diagnosis shows that demand is evolving, especially toward flexible, scalable and more engaging training formats.',
    'This creates opportunities for Fiducial FPSG: modernization of safety training, upselling among existing clients and differentiation from traditional providers.',
    'However, adoption is not automatic because clients may remain price-sensitive, attached to face-to-face training or skeptical toward AR and VR.'
  ),
  'benchmark-synthesis': lines(
    'The benchmark confirms that innovation must become perceived value before it can become commercial performance.',
    'Apave shows that the offer must be sold as an operational solution; Rockefeller shows that innovation must remain pedagogically credible.',
    'OCP shows that key accounts need reliability, proof and simplicity before broader deployment.',
    'Axe Capital confirms that high-value B2B offers require value-based selling, sales enablement and dedicated KPIs.'
  ),
  'strategic-synthesis': lines(
    'The strategic shift is from innovation availability to commercial scalability.',
    'The sequence is clear: value proposition first, then sales force appropriation, then client understanding, adoption and commercial performance.',
    'This slide connects the diagnosis to the action plan because it shows that performance depends on a structured commercial system, not only on the quality of the offers.'
  ),
  segmentation: lines(
    'The segmentation principle is simple: Fiducial FPSG should not sell everything to everyone.',
    'E-learning should target large accounts, multi-site clients and companies with specific internal processes because the value is customization, standardization and scalability.',
    'Augmented reality should target existing fire safety clients, SMEs and recurring B2B clients, while virtual reality should focus on vehicle fleets, logistics, field teams and mobile employees.',
    'Good segmentation reduces price resistance because each offer is connected to a real operational problem.'
  ),
  positioning: lines(
    'The recommended positioning is that Fiducial FPSG should remain a safety training expert using digital and immersive levers.',
    'The company should not become a technology provider because its credibility comes from safety, compliance, prevention and training expertise.',
    'The decision view is important: evidence must lead to recommendation, recommendation must lead to action, and action must be controlled through KPIs.'
  ),
  'action-overview': lines(
    'The action plan is built around four actions that structure commercial scalability.',
    'The first two actions prepare the system: clarify the commercial offer portfolio and train salespeople.',
    'The last two actions test and control the system: launch a 40-client pilot campaign and install a dedicated KPI dashboard.'
  ),
  'rec-portfolio': lines(
    'The first recommendation is to create a clear commercial offer portfolio because the sales message is not yet standardized enough.',
    'One sales sheet per offer would give salespeople a common commercial language and make the offers easier to activate.',
    'Each sheet should clarify the target clients, the problem solved, the benefits, the price logic, the use cases, the objections and the proof elements.'
  ),
  'rec-training': lines(
    'The second recommendation is to train salespeople in value-based selling, starting with a realistic first group of four salespeople.',
    'The training should combine offer appropriation, demonstrations, objection handling and a discovery questionnaire.',
    'The purpose is to move salespeople from product description to value explanation, so they can defend the offers confidently in front of clients.'
  ),
  'rec-pilot': lines(
    'The third recommendation is to launch a 40-client pilot campaign before scaling the approach more broadly.',
    'The campaign sequence is simple: select the clients, segment them by offer relevance, contact them, follow up, propose demonstrations and learn from refusal reasons.',
    'The six-week execution timeline makes the plan operational: clarify in week one, train in week two, launch in week three, demonstrate in week four, analyze in week five, then scale in week six.'
  ),
  'rec-kpi': lines(
    'The fourth recommendation is to install a dedicated KPI dashboard to move from isolated opportunities to a managed commercial priority.',
    'These KPIs are recommended management indicators, not existing results, which is important to avoid any confusion.',
    'The dashboard should track both activation and performance: offers presented, demonstrations, quotes, quote value, conversion, revenue, margin, satisfaction and refusal reasons.'
  ),
  'budget-baseline': lines(
    'The action plan represents a controlled investment, with €8,300 in direct costs and a total budget of €9,396 when internal time is included.',
    'Internal time is included because the plan requires sales training, preparation, follow-up, coordination and monthly monitoring.',
    'Compared with the 2025 signed revenue baseline of €402,479 for AR, e-learning and VR, this budget remains proportionate for a commercial structuring project.'
  ),
  'roi-break-even': lines(
    'The ROI calculation uses a 35% margin assumption to move from additional revenue to additional margin.',
    'The conservative scenario remains negative, but the realistic scenario at +10% additional revenue generates a positive ROI of +49.9%.',
    'The ambitious scenario reaches a much higher ROI, but the key point is that the plan becomes profitable in the realistic scenario, not only in an extreme growth case.',
    'This makes the action plan financially defendable, while still requiring internal validation of the real margin assumption.'
  ),
  'risks-final': lines(
    'La recommandation finale consiste à structurer, activer et faire monter en puissance les offres existantes, plutôt qu’à chercher à créer davantage d’innovation.',
    'Fiducial FPSG possède déjà les offres, la crédibilité et la base client ; la priorité est maintenant de les transformer en leviers de croissance structurés, mesurables et rentables.',
    'Le chemin de décision est progressif : segmenter les bons clients, équiper la force commerciale, tester l’approche, mesurer les résultats, puis déployer après validation.',
    'Les conditions de réussite sont l’appropriation par l’équipe commerciale, la sélection ciblée des clients et le suivi mensuel des KPI.'
  ),
  'thank-you': lines(
    'Merci pour votre écoute.',
    'Je suis prêt à répondre à vos questions.'
  ),
  'a1-budget': `This annex supports the budget discussion. The total action budget is 9,396 euros. It includes 8,300 euros of direct costs and 1,096 euros of internal time valuation. The direct costs cover the commercial offer portfolio, sales training, the pilot campaign and the KPI dashboard. The internal time is based on 89 estimated hours valued at 12.31 euros per hour.`,
  'a2-roi': `This annex supports the ROI calculation. The formula is clear: additional margin equals additional signed revenue multiplied by 35 percent. ROI equals additional margin minus 9,396 euros, divided by 9,396 euros. At plus 10 percent additional signed revenue, the plan generates 14,087 euros of additional margin and becomes financially profitable with a plus 49.9 percent ROI.`,
  'a3-kpi-template': `This annex shows the recommended dashboard logic. I would use it to explain that the KPIs measure activation before final sales performance. At the beginning, offers presented, demonstrations and quotes issued are especially important because they reveal whether the sales force is actually using the offer portfolio. Refusal reasons are also strategic because they help adjust the pitch and targeting.`,
  'a4-benchmark-grid': `This annex gives detail on the benchmark. I would use it if the jury asks why the selected actors are relevant. The purpose was not to create a classic competitor table, but to combine perspectives: market competition, pedagogical innovation, key account purchasing expectations and B2B value-based selling. This supports the recommendations on positioning, proof, pilot and sales enablement.`,
  'a5-jury-questions': `This annex is a preparation tool. If a question is difficult, the answer should always come back to evidence from the dissertation: existing offers, commercial proposals, benchmark lessons, 2025 signed revenue, the 9,396 euro action budget, ROI calculation on margin and recommended KPIs. The safest posture is to be precise, business-oriented and connected to the operational plan.`,
  'a6-offer-definitions': `This annex clarifies the three offers if needed. E-learning is not just online training; in this case it is customized digital training for client-specific processes. Augmented reality enriches familiar safety training with a visual and engaging format. Virtual reality creates simulated situations, especially relevant for road risk prevention. In all cases, the client value matters more than the technology label.`,
  'a7-timing': `This annex is only for time control. The target is around 34 to 38 minutes. If I am late, I should shorten the detailed diagnosis slides and protect the action plan, budget, ROI and conclusion, because those slides show the consulting value of the work. The priority is to keep the final recommendation clear and credible.`,
  'a8-static-summary': `This annex provides a one-minute backup summary. The mission shows that Fiducial FPSG already has innovative offers, but needs a stronger commercial system to scale them. The proposed path is to clarify the offer portfolio, train a first sales group, test with 40 targeted clients, monitor dedicated KPIs, and scale progressively based on evidence.`
};

const presenterScriptDetailsEN: Record<string, string> = {};

export const getPresenterScriptEN = (slide: Slide) => {
  const brief = slideBriefs[slide.id];
  if (brief) {
    return [
      `🟢 Message clé : ${brief.keyMessage}`,
      `🟢 Preuve à ne pas oublier : ${brief.proof}`,
      `🟢 Conclusion de la slide : ${brief.conclusion}`,
      `🟢 Transition : ${brief.transition}`,
      brief.usefulDetail ? `🔵 Useful detail if time : ${brief.usefulDetail}` : ''
    ].filter(Boolean).join('\n\n');
  }
  const base = presenterScriptsEN[slide.id] ?? slide.note.scriptFR;
  const detail = presenterScriptDetailsEN[slide.id];
  return [base, detail].filter(Boolean).join('\n\n');
};

export const timingPlan = [
  { phase: 'Opening / framing', screens: '1-4', duration: '5-6 min' },
  { phase: 'Methodology', screens: '5-6', duration: '3-4 min' },
  { phase: 'Diagnosis', screens: '7-12', duration: '10-12 min' },
  { phase: 'Benchmark / synthesis', screens: '13-16', duration: '6-7 min' },
  { phase: 'Action plan', screens: '17-21', duration: '8-10 min' },
  { phase: 'Budget / ROI / conclusion', screens: '22-25', duration: '8-10 min' }
];

export const coherenceChecklist = [
  'Problem statement identical to the dissertation',
  '2025 signed revenue: AR €347,705; e-learning €48,974; VR €5,800; total €402,479',
  'Total action budget: €9,396, including direct costs and internal time valuation',
  'Four recommendations: commercial offer portfolio, sales training, 40-client pilot campaign, KPI dashboard and monthly monitoring',
  'Sales training: first group of 4 salespeople, 1 day',
  'ROI calculated on additional margin with a 35% gross margin rate and €9,396 action budget',
  'KPIs are clearly presented as recommended indicators, not existing results',
  'Fiducial FPSG remains a safety training expert using digital and immersive solutions as levers'
];
