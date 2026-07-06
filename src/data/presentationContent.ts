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
  budgetMin: 4800,
  budgetMax: 8300,
  internalHours: 89,
  smicGrossHourly: 12.31,
  internalCost: 1096,
  completeBudgetMin: 5896,
  completeBudgetMax: 9396,
  grossMarginAssumption: 35,
  budgetRatioMin: 1.2,
  budgetRatioMax: 2.1
};

export const roiScenarios = [
  { name: 'Conservative', growth: '+5%', additionalRevenue: 20124, projectedRevenue: 422603, additionalMargin: 7043, roiMin: -25.0, roiMax: 19.5 },
  { name: 'Realistic', growth: '+10%', additionalRevenue: 40248, projectedRevenue: 442727, additionalMargin: 14087, roiMin: 49.9, roiMax: 138.9 },
  { name: 'Ambitious', growth: '+20%', additionalRevenue: 80496, projectedRevenue: 482975, additionalMargin: 28174, roiMin: 199.9, roiMax: 377.9 }
];

export const budgetItems = [
  { name: 'Commercial offer portfolio', min: 1300, max: 2000 },
  { name: 'Sales team training', min: 2000, max: 3500 },
  { name: 'Targeted pilot campaign', min: 1500, max: 2300 },
  { name: 'KPI dashboard', min: 0, max: 500 }
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
  { month: 'M1', title: 'Clarify', actions: ['Formalize positioning', 'Create concise sales materials'] },
  { month: 'M2', title: 'Train', actions: ['1-day session', 'Sales scripts', 'Objection handling'] },
  { month: 'M3', title: 'Launch', actions: ['Select 40 clients', 'Segment by offer relevance'] },
  { month: 'M4', title: 'Demonstrate', actions: ['Pilot sessions', 'Quotes', 'Client feedback'] },
  { month: 'M5', title: 'Analyze', actions: ['Review conversion', 'Capture refusal reasons'] },
  { month: 'M6', title: 'Scale', actions: ['Adjust pitch', 'Extend to wider portfolio'] }
];

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
    data: { steps: ['Business issue','Methodology','Diagnosis','Benchmark','Strategic synthesis','Action plan','Budget & ROI','Risks & final recommendation'] },
    note: notes('roadmap','Executive roadmap','Montrer une logique de mission de conseil et rassurer le jury sur la structure.','1 min','Je vais suivre une logique volontairement professionnelle : d’abord le problème business, puis la méthode, le diagnostic, le benchmark, la synthèse stratégique, le plan d’action, le budget, le ROI et enfin les risques et limites.','The structure moves from observation to decision.','Le jury peut demander si la présentation respecte le mémoire.','Oui, la structure reprend le fil du mémoire, mais compressé pour l’oral.')
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
    bullets: ['Literature review', 'Internal diagnosis', 'Analysis of existing offers and commercial proposals', 'Benchmark with four complementary perspectives', 'Strategic synthesis', 'Recommendations', 'Budget, ROI and risk management'],
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
    id: 'budget-baseline', screen: 22, eyebrow: 'Budget & 2025 baseline', title: 'A proportionate commercial structuring investment', kind: 'budget',
    note: notes('budget-baseline','Budget and 2025 baseline','Montrer que le plan est financièrement proportionné et que le temps interne est maintenant valorisé.','2 min 30','Le budget est présenté en deux niveaux. Le budget direct reste compris entre 4 800 et 8 300 euros : il couvre le portefeuille d’offres, la formation commerciale, la campagne pilote et le tableau de bord KPI. Pour renforcer la solidité financière, j’ajoute désormais une valorisation du temps interne : 89 heures estimées, valorisées au SMIC brut horaire de 12,31 euros, soit 1 095,59 euros arrondis à 1 096 euros. Le budget complet atteint donc 5 896 à 9 396 euros. Cela montre que le plan reste proportionné, même quand le temps interne est intégré.','The budget remains proportionate even when internal time is valued.','Le jury peut demander si le coût interne est sous-estimé.','Oui, c’est volontairement conservateur : le temps interne est valorisé au SMIC brut horaire, pas en coût employeur chargé. Pour un suivi définitif, Fiducial FPSG devrait remplacer cette hypothèse par ses coûts horaires internes réels.')
  },
  {
    id: 'roi-break-even', screen: 23, eyebrow: 'ROI scenarios', title: 'Simulated ROI based on a 35% gross margin assumption', kind: 'roi',
    message: 'The realistic scenario makes the action plan financially defendable, even when internal time is included.',
    note: notes('roi-break-even','ROI scenarios','Rendre le ROI concret tout en restant prudent sur l’hypothèse de marge.','2 min 30','Le ROI devient plus concret parce qu’il n’est plus présenté seulement comme un seuil de rentabilité. Je pars d’une hypothèse de marge brute de 35 %. Les scénarios génèrent alors 7 043 euros de marge additionnelle en conservateur, 14 087 euros en réaliste et 28 174 euros en ambitieux. En comparant cette marge au budget complet, le scénario réaliste donne un ROI positif de 49,9 % à 138,9 %. Cela signifie que le plan reste financièrement défendable même en intégrant le temps interne. Je précise toutefois que les 35 % sont une hypothèse de simulation, pas une donnée définitive si elle n’est pas validée par Fiducial FPSG.','The realistic scenario remains profitable even with the complete budget.','Le jury peut demander si la marge de 35 % est validée.','Non : c’est une hypothèse de simulation. Pour un pilotage financier définitif, elle doit être remplacée par les taux de marge réels par offre.')
  },
  {
    id: 'risks-final', screen: 24, eyebrow: 'Risks, limits & final recommendation', title: 'Segment. Enable. Pilot. Measure. Scale.', kind: 'risksFinal',
    data: { risks: ['Weak sales adoption','Price resistance','VR perceived as a gadget','Lack of KPI follow-up','Lack of internal time','Weak client response'], limits: ['Price sensitivity remains','Client resistance may persist','Sales training does not guarantee adoption','VR may require deeper repositioning','ROI cannot be definitive without margin data'], conclusion: 'Fiducial FPSG already has the foundations. The priority is to transform existing innovation into structured, measurable and scalable commercial growth drivers.' },
    note: notes('risks-final','Risks, limits and final recommendation','Conclure avec recul critique, risques et recommandation forte.','2 min 30','Pour conclure, Fiducial FPSG dispose déjà des fondations : crédibilité métier, clients existants et offres innovantes. Le sujet prioritaire est l’exécution commerciale structurée. Il faut segmenter, équiper la force de vente, tester auprès de 40 clients, mesurer les résultats puis scaler progressivement.','The next step is not more innovation; it is disciplined commercialization.','Le jury peut demander la limite principale de ton mémoire.','L’absence de données de marge réelles et de conversion historique spécifique par offre limite le calcul financier définitif.')
  }
];

export const annexes: Slide[] = [
  {
    id: 'a1-budget', screen: 'A1', eyebrow: 'Annex', title: 'Detailed budget table', kind: 'annex',
    data: { type: 'budget' },
    note: notes('a1-budget','Detailed budget table','Répondre à une question jury sur la construction du budget.','Backup','Utiliser uniquement si le jury demande le détail des coûts : budget direct, valorisation du temps interne et budget complet.','Internal time is valued conservatively at French gross hourly SMIC.','Pourquoi ne pas utiliser un coût employeur chargé ?','Parce que le coût horaire chargé réel doit être validé par Fiducial FPSG ; le SMIC brut donne une valorisation conservatrice et transparente.')
  },
  {
    id: 'a2-roi', screen: 'A2', eyebrow: 'Annex', title: 'Detailed ROI calculation', kind: 'annex', data: { type: 'roi' },
    note: notes('a2-roi','Detailed ROI calculation','Répondre à une question sur la simulation de ROI.','Backup','Montrer le calcul : chiffre d’affaires additionnel, marge simulée à 35 %, puis ROI sur budget complet.','The 35% margin is a simulation assumption, not a definitive company margin.','Pourquoi ne pas donner un ROI définitif ?','Parce que les marges réelles par offre doivent être validées par Fiducial FPSG avant un pilotage financier définitif.')
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

export const presenterScriptsEN: Record<string, string> = {
  opening: `Good morning. My defense focuses on a concrete business issue for Fiducial FPSG: how to enhance and commercialize high-value training offers such as customized e-learning, augmented reality and virtual reality. The point is not to present innovation as a nice extra feature, but to show how existing offers can become structured, measurable and scalable commercial growth drivers. I will therefore approach the subject as a consulting mission: first the issue, then the diagnosis, then recommendations, budget, ROI logic and implementation risks.`,
  roadmap: `I will follow a clear consulting sequence. I start with the business issue and the exact problem statement, then explain the methodology used to avoid a purely theoretical answer. After that, I move into the internal and external diagnosis of the three offers, the benchmark, and the strategic synthesis. The second half is operational: recommendations, pilot campaign, KPI dashboard, budget, ROI scenarios, limits and final recommendation.`,
  'core-issue': `The central finding is simple: Fiducial FPSG does not lack innovation. The company already has credible high-value offers. The real challenge is commercial scalability. These offers are not yet supported by a fully structured commercial system: sales appropriation is uneven, positioning can be unclear, tools are limited, and performance is not monitored with dedicated indicators. So the issue is less about inventing new solutions and more about turning existing innovation into repeatable sales execution.`,
  'problem-statement': `The dissertation problem statement is: how can Fiducial FPSG enhance and commercialize its high-value training offers, namely e-learning, augmented reality and virtual reality for professional clients, considering their commercial development potential? This question has three dimensions. It is strategic because these offers can differentiate Fiducial FPSG. It is commercial because sales teams need clear arguments, targets and proof. It is operational because the answer must include actions, budget, KPIs and realistic implementation.`,
  methodology: `The methodology combines several sources of evidence. I used a literature review to frame digital learning, immersive training, value-based selling and adoption barriers. I also analyzed internal diagnosis elements, existing commercial offers and proposals, including concrete e-learning proposals. Finally, I used a benchmark with complementary perspectives. This mixed approach makes the recommendations more robust because they are not based only on opinion, but on a crossing of theory, field observations and commercial documents.`,
  'benchmark-logic': `The benchmark was designed to answer one question: how does an innovative training offer become commercially sellable? I did not only compare competitors. I combined four perspectives: a direct competitor perspective, a pedagogical innovation perspective, a key account client perspective and a B2B sales strategy perspective. This helps identify what Fiducial FPSG needs to strengthen: perceived value, proof, demonstrations, sales tools and a clearer link between technology and operational client benefits.`,
  'offers-snapshot': `The three offers should not be managed as one generic innovation category. Customized e-learning has strong key account potential, especially for large or multi-site clients, but it requires consultative selling. Augmented reality is the most mature short-term commercial lever because it upgrades familiar safety training needs. Virtual reality is pedagogically relevant, especially for road risk prevention, but commercially underactivated and exposed to a gadget perception if the positioning is not precise.`,
  'elearning-diagnosis': `Customized e-learning is a high-value offer because it can transform client-specific training needs into reusable digital assets. The analyzed proposals show this potential: Decathlon at 4,500 euros excluding tax, Paris La Defense at 5,720 euros, and IBM at 13,560 euros. However, the offer is harder to scale internally because it requires needs analysis, customization, technical understanding and a value-based sales discussion. This is why it cannot rely only on a few experienced salespeople.`,
  'ar-diagnosis': `Augmented reality appears as the most accessible short-term lever. It is linked to a familiar client need, especially fire safety awareness, so the sales discussion starts from something clients already understand. The solution is visual, easy to demonstrate and suitable for upselling within the existing portfolio. The main issue is not the relevance of AR, but the need for stronger commercial structuring: clear materials, dedicated objectives, systematic demonstrations and specific monitoring.`,
  'vr-diagnosis': `Virtual reality is relevant from a learning perspective, especially for professional road risk prevention. It can target companies with fleets, logistics activities, field teams or mobile employees. But the commercial challenge is stronger than for AR: if Fiducial FPSG sells VR as an immersive experience, the client may see it as a gadget. The positioning must therefore shift toward prevention of professional road risk, behavior awareness and realistic simulation, with selective targeting rather than broad promotion.`,
  'internal-diagnosis': `The internal diagnosis reveals a useful paradox. Fiducial FPSG has real strengths: credibility in safety and prevention, an existing B2B client base, innovative offers and the ability to design customized e-learning. But the commercial operating system remains incomplete. There are no sufficiently dedicated objectives, sales knowledge is uneven, sales materials are limited, internal training is insufficient and there is no specific KPI dashboard. The assets exist, but the system to scale them is still underdeveloped.`,
  'external-diagnosis': `The external environment is favorable but not automatic. Clients increasingly look for flexible, scalable and engaging training formats, and this creates opportunities for digital and immersive solutions. At the same time, several barriers remain: price sensitivity, resistance to change, attachment to face-to-face training, difficulty proving short-term ROI and the risk that AR or VR is perceived as a gadget. This means Fiducial FPSG must not only create interest; it must provide proof and reduce adoption risk.`,
  'benchmark-synthesis': `The benchmark leads to one major lesson: clients do not buy technology itself. They buy operational value, reliability, simplicity and proof. For Fiducial FPSG, this means the offers must be translated into client benefits: compliance, prevention, learner engagement, traceability, time savings or risk reduction. The benchmark also supports the need for demonstrations, pilot phases, clear sales materials and sales enablement. Innovation becomes valuable only when the client understands how it solves a concrete problem.`,
  'strategic-synthesis': `The strategic synthesis can be summarized as a chain. First, Fiducial FPSG needs a clear value proposition for each offer. Then salespeople must appropriate that value through training and tools. Once the sales force can explain and demonstrate the offers, clients can understand them more easily, adoption barriers decrease and commercial performance can improve. This is not a purely theoretical model: each step corresponds to an action in the recommendations.`,
  segmentation: `Segmentation is essential because relevance depends on matching each offer with the right client situation. E-learning should primarily target large accounts, multi-site organizations and clients with specific internal processes that justify customization and reuse. Augmented reality should target existing fire safety clients, SMEs and recurring B2B clients because the upsell logic is immediate. Virtual reality should be more selective, focusing on vehicle fleets, logistics, field teams and mobile employees exposed to road risk.`,
  positioning: `The recommended positioning is deliberately clear: Fiducial FPSG should not try to become a technology provider. Its credibility comes from safety training, prevention and regulatory expertise. Digital and immersive formats should be presented as levers that strengthen this expertise, not as the core identity. This positioning reduces the gadget risk and keeps the commercial message anchored in client outcomes such as prevention, compliance, engagement and operational risk management.`,
  'action-overview': `The action plan is built around four recommendations, each solving a specific weakness identified in the diagnosis. First, create a clear commercial offer portfolio. Second, train salespeople in value-based selling. Third, launch a 40-client pilot campaign. Fourth, implement a dedicated KPI dashboard with monthly monitoring. The logic is progressive: clarify, enable, test, measure and then scale. This keeps the plan realistic while making the commercial development measurable.`,
  'rec-portfolio': `The first recommendation is to create a clear commercial offer portfolio. Each offer should have a concise sales sheet covering target clients, the client problem solved, key benefits, price logic, use cases, objections and proof elements. This is not enough by itself, but it is the foundation for repeatable execution. Without standardized materials, the commercial message depends too much on individual knowledge and becomes difficult to scale across the sales force.`,
  'rec-training': `The second recommendation is to train a first group of four salespeople during a one-day session. The goal is not simply to explain the offers, but to make them commercially usable. The training should include value-based selling, demonstrations, objection handling, a discovery questionnaire and role plays. This matters because high-value offers require a consultative conversation. Salespeople need to identify the right client pain, connect it to the right offer and defend the value beyond the technology itself.`,
  'rec-pilot': `The third recommendation is to launch a 40-client pilot campaign. The campaign should start with the existing portfolio because these clients already know Fiducial FPSG and can be easier to approach. Each client should be segmented by offer relevance: e-learning for large or multi-site needs, AR for familiar fire safety upsell, and VR for road risk exposure. The objective is not only to sell. It is also to collect objections, refusal reasons, demonstration feedback and early conversion signals before scaling wider.`,
  'rec-kpi': `The fourth recommendation is to install a dedicated KPI dashboard. This is important because without measurement, innovative offers remain isolated opportunities rather than a managed commercial priority. The dashboard should track offers presented, demonstrations, quotes issued, quote value, conversion rate, signed revenue, gross margin, average deal value, client satisfaction and refusal reasons. These are recommended indicators, not existing results. Their role is to make sales activation visible and manageable month after month.`,
  'budget-baseline': `The budget is deliberately proportionate and now includes two levels. The direct investment is estimated between 4,800 and 8,300 euros, covering the offer portfolio, sales training, pilot campaign and KPI dashboard. Internal time is also valued: 89 estimated hours at the French gross hourly SMIC of 12.31 euros, or 1,096 euros after rounding. The complete budget is therefore 5,896 to 9,396 euros. This makes the financial plan more concrete while remaining conservative.`,
  'roi-break-even': `The ROI is now simulated with a 35 percent gross margin assumption. The additional signed revenue scenarios become additional margin: 7,043 euros in the conservative case, 14,087 euros in the realistic case and 28,174 euros in the ambitious case. Compared with the complete budget, the realistic scenario remains profitable, with a simulated ROI between 49.9 and 138.9 percent. The 35 percent margin remains an assumption and must be replaced by actual margin rates by offer for definitive monitoring.`,
  'risks-final': `To conclude, Fiducial FPSG already has important foundations: a credible safety expertise, an existing B2B portfolio and innovative training offers. The next step is disciplined commercialization. The recommendation is to segment targets, equip the sales force, test the approach with 40 clients, measure results with dedicated KPIs and scale only after learning from the pilot. The main limits remain price sensitivity, adoption resistance, internal time, VR positioning and the absence of exact margin data for a definitive ROI.`,
  'a1-budget': `This annex supports the budget discussion. If the jury asks for details, I can explain the two levels: the 4,800 to 8,300 euro direct budget, then the internal time valuation of 89 hours at 12.31 euros per hour, or 1,096 euros after rounding. This gives a complete budget of 5,896 to 9,396 euros. The internal time valuation is conservative because it uses French gross hourly SMIC, not a fully loaded employer cost.`,
  'a2-roi': `This annex supports the ROI calculation. The key point is that the scenarios are not promised results. They translate plus 5, plus 10 and plus 20 percent growth into additional signed revenue, then into additional margin using a 35 percent gross margin assumption. The ROI is calculated against the complete budget including internal time. The financial conclusion must remain cautious until real margin rates by offer are available.`,
  'a3-kpi-template': `This annex shows the recommended dashboard logic. I would use it to explain that the KPIs measure activation before final sales performance. At the beginning, offers presented, demonstrations and quotes issued are especially important because they reveal whether the sales force is actually using the offer portfolio. Refusal reasons are also strategic because they help adjust the pitch and targeting.`,
  'a4-benchmark-grid': `This annex gives detail on the benchmark. I would use it if the jury asks why the selected actors are relevant. The purpose was not to create a classic competitor table, but to combine perspectives: market competition, pedagogical innovation, key account purchasing expectations and B2B value-based selling. This supports the recommendations on positioning, proof, pilot and sales enablement.`,
  'a5-jury-questions': `This annex is a preparation tool. If a question is difficult, the answer should always come back to evidence from the dissertation: existing offers, commercial proposals, benchmark lessons, 2025 signed revenue, budget range, ROI limits and recommended KPIs. The safest posture is to be precise on what is proven and careful on what remains a scenario.`,
  'a6-offer-definitions': `This annex clarifies the three offers if needed. E-learning is not just online training; in this case it is customized digital training for client-specific processes. Augmented reality enriches familiar safety training with a visual and engaging format. Virtual reality creates simulated situations, especially relevant for road risk prevention. In all cases, the client value matters more than the technology label.`,
  'a7-timing': `This annex is only for time control. The target is around 34 to 38 minutes. If I am late, I should shorten the detailed diagnosis slides and protect the action plan, budget, ROI and risks, because those slides show the consulting value of the work. The priority is to keep the final recommendation clear and credible.`,
  'a8-static-summary': `This annex provides a one-minute backup summary. The mission shows that Fiducial FPSG already has innovative offers, but needs a stronger commercial system to scale them. The proposed path is to clarify the offer portfolio, train a first sales group, test with 40 targeted clients, monitor dedicated KPIs, and scale progressively based on evidence.`
};

const presenterScriptDetailsEN: Record<string, string> = {
  opening: `I can say this in a calm but assertive way: the subject may look technological at first, because it mentions e-learning, augmented reality and virtual reality, but my real angle is commercial development. I am not trying to prove that these technologies are modern or attractive. I am trying to show how Fiducial FPSG can turn them into offers that salespeople understand, clients value, and managers can monitor.

I should briefly position myself as someone who worked from the company context and from a consulting logic. The mission is about moving from existing innovation to a commercial system. So I can introduce the red thread immediately: diagnose the current maturity of the offers, identify adoption and sales barriers, compare with external practices, then recommend a realistic plan. The sentence to keep in mind is: the next growth lever is not more technology, it is disciplined commercialization of offers that already exist.`,
  roadmap: `Here, I should reassure the jury about the structure. I can explain that the presentation follows the same logic as the dissertation, but compressed for an oral defense. First, I will define the business issue and the exact problem statement. Then I will explain the methodology, because the recommendations need to be grounded in evidence rather than intuition.

After that, I move into the diagnosis: first by offer, then internally and externally. The benchmark then helps me avoid looking only at Fiducial FPSG from the inside. Finally, the last part is where the defense becomes operational: four recommendations, a pilot campaign, KPIs, budget, ROI scenarios and risks. I should make clear that the order matters: I do not jump directly to ROI before proving that the commercial system needs to be structured.`,
  'core-issue': `This is one of the most important slides. I should not speak too fast. The central idea is that Fiducial FPSG already has the ingredients: a safety training expertise, a B2B client base, and existing high-value offers. So the issue is not a lack of innovation. The issue is that these offers are not yet industrialized commercially.

I can detail what "commercial scalability" means in this case. It means that the sales force should know when to present the offer, to whom, with which argument, with which proof, and how to follow the opportunity. Today, the development remains too dependent on individual knowledge, isolated opportunities and uneven appropriation. That creates a gap between the potential of the offers and their actual commercial activation. This slide sets up the whole defense: the mission is to build a repeatable commercial logic.`,
  'problem-statement': `I should read or paraphrase the problem statement clearly, because it is the academic anchor of the defense. The question is how Fiducial FPSG can enhance and commercialize its high-value training offers, namely e-learning, augmented reality and virtual reality, for professional clients, while considering their commercial development potential.

Then I can unpack the three dimensions. Strategically, these offers can help Fiducial FPSG differentiate itself in a market where traditional safety training can be perceived as standardized. Commercially, differentiation is not enough: salespeople need a clear portfolio, arguments, target segments and proof. Operationally, the answer must be feasible: a budget, a pilot, KPIs and risk control. I should emphasize that the dissertation is not just about analyzing technologies. It is about connecting strategy, sales execution and measurable implementation.`,
  methodology: `On this slide, I should show rigor. I can explain that I deliberately avoided a purely theoretical answer. The literature review helped frame the key concepts: digital learning, immersive learning, adoption barriers, value-based selling, and the need to prove value to B2B clients. But the field dimension was equally important, because the offers already exist inside Fiducial FPSG.

I can mention that I analyzed internal diagnosis elements, existing offers and concrete commercial proposals, especially for customized e-learning. Then I used a benchmark to compare several perspectives, not only competitors. This matters because recommendations are stronger when several sources converge. The transition sentence is: once the method is clear, I can now move from the research approach to the actual diagnosis of the three offers.`,
  'benchmark-logic': `The point here is to explain why the benchmark is not random. I can say: I did not choose actors only because they are similar to Fiducial FPSG. I chose them because each one brings a useful perspective on the same commercial question: how does an innovative training offer become credible and sellable?

The direct competitor angle helps understand how safety and compliance offers are packaged. The pedagogical innovation angle shows that technology must remain connected to learning objectives. The key account client angle shows that large clients need reliability, proof and simplicity before adopting. The B2B sales strategy angle highlights sales enablement and value-based selling. This benchmark therefore supports the recommendations: clarify value, prove usefulness, train salespeople, use pilots and monitor performance.`,
  'offers-snapshot': `This slide is the entry point of the diagnosis. I should make clear that e-learning, AR and VR cannot be managed with the same generic message. They have different targets, different maturity levels and different sales barriers. If Fiducial FPSG sells them all under the label "innovation", the commercial message becomes too vague.

E-learning is high value because it can be customized and reused, especially for large accounts and multi-site clients. AR is the easiest short-term lever because it improves a familiar fire safety need and is easy to demonstrate. VR is pedagogically interesting, especially for road risk prevention, but commercially more fragile because it can be perceived as a gadget. The key idea is segmentation by offer maturity.`,
  'elearning-diagnosis': `For e-learning, I should insist on the difference between a cheap online module and a customized training asset. Fiducial FPSG's customized e-learning can respond to specific client processes, standardize training across sites, and create long-term reuse. This explains why the offer can create value for large accounts.

I should cite the examples carefully: Decathlon at 4,500 euros excluding tax, Paris La Defense at 5,720 euros, and IBM at 13,560 euros. These figures do not prove the whole market size, but they prove that meaningful revenue is possible when the offer is correctly positioned. The limit is scalability: customized e-learning requires discovery, scoping, technical explanation and value justification. So the recommendation will be to make the offer easier to explain and easier to sell beyond only senior commercial profiles.`,
  'ar-diagnosis': `For augmented reality, I can take a more positive tone because it is the most mature short-term lever. The reason is simple: AR is connected to an existing client need, especially fire safety awareness. The client does not need to be convinced that fire safety matters. The commercial job is to show that AR makes the training more engaging, concrete and memorable.

I should explain that AR is also easier to demonstrate than e-learning customization or VR road risk prevention. A good demonstration can reduce uncertainty quickly. It also fits an upsell logic inside the existing client portfolio. But I must avoid saying that everything is already solved. The offer still needs clearer sales materials, dedicated objectives and specific tracking. The diagnosis is therefore: strong commercial accessibility, but insufficient structuring.`,
  'vr-diagnosis': `For virtual reality, I should be balanced. I should not dismiss it, but I should not oversell it either. Pedagogically, VR can be relevant because it creates a realistic simulation environment, especially for road risk prevention. This can speak to companies with fleets, logistics operations, field employees or mobile staff.

The commercial risk is the perception of VR as a gadget. If the sales pitch starts with the headset or the immersive experience, the client may focus on novelty and cost. The pitch should start from the professional risk: road accidents, prevention, employee behavior, awareness and safety culture. Then VR becomes a means, not the subject. This slide prepares the positioning recommendation: Fiducial FPSG should sell prevention outcomes, not immersive technology for its own sake.`,
  'internal-diagnosis': `This slide is important because it shows that the company is not starting from weakness. Fiducial FPSG has strong internal assets: expertise in safety and prevention, legitimacy with professional clients, an existing B2B portfolio, and the capacity to design customized or immersive formats. These are real foundations.

But the internal weaknesses explain why the offers do not scale naturally. There are no sufficiently dedicated commercial objectives, sales knowledge is uneven, materials are limited, internal training is not strong enough, communication is not structured enough, and there is no KPI dashboard dedicated to these offers. I should phrase the diagnosis clearly: the company has the ingredients, but not yet the complete commercial operating system. That is exactly what the action plan will address.`,
  'external-diagnosis': `Here, I should show that the market context creates both opportunity and resistance. On the opportunity side, professional clients increasingly need flexible, scalable, traceable and engaging training formats. Digital and immersive formats can answer these needs, especially when they reduce logistical constraints or improve learner engagement.

But adoption is not automatic. Clients may be price-sensitive, attached to face-to-face training, or skeptical about digital and immersive tools. They may also ask for proof of ROI, which is difficult to provide immediately. This means Fiducial FPSG must reduce perceived risk through demonstration, pilot phases and clear value arguments. The transition is: because the external environment is mixed, the company needs a commercial approach based on proof, not only on innovation.`,
  'benchmark-synthesis': `On this slide, I should translate the benchmark into one clear lesson: clients do not buy innovation as an abstract promise. They buy operational value. In the context of Fiducial FPSG, operational value means better prevention, compliance, learner engagement, traceability, time savings, standardization or risk reduction.

I can explain that the benchmark confirms several choices. First, sales materials should focus on client problems and benefits. Second, demonstrations and pilots are necessary because they make the offer tangible. Third, salespeople need to be trained in value-based selling, because high-value offers are harder to sell than standard training sessions. Fourth, dedicated KPIs are required to know whether the offers are actually being activated. This slide is the bridge from diagnosis to strategy.`,
  'strategic-synthesis': `This slide summarizes the strategic logic. I can walk through the chain step by step. First, Fiducial FPSG clarifies the value proposition: what problem does each offer solve, for which client, and with which proof? Second, salespeople appropriate the offer through training, scripts and demonstrations. Third, clients understand the offer because the pitch is clearer and more concrete.

Once the client understands the value, adoption barriers decrease. That can lead to more demonstrations, more quotes, better conversion and better commercial performance. I should acknowledge that the model is simplified, but useful because every step can be translated into an action. The message is: commercial performance starts before the client meeting, with the way the offer is packaged and enabled internally.`,
  segmentation: `Segmentation is where the strategy becomes practical. I should say clearly that Fiducial FPSG should not sell everything to everyone. If the same message is used for all clients, the perceived relevance will be weak. Each offer needs a target logic.

For e-learning, the priority should be large accounts, multi-site organizations and clients with specific internal procedures, because the value comes from customization and reuse. For AR, the priority should be existing fire safety clients, SMEs and recurring clients, because the need is familiar and the upsell is natural. For VR, the targeting must be more selective: vehicle fleets, logistics, field teams and mobile employees exposed to road risk. This segmentation reduces wasted commercial effort and strengthens the pitch.`,
  positioning: `This slide is a strategic safeguard. I should explain that Fiducial FPSG should not reposition itself as a technology provider. That would be risky because it would move the company away from its main legitimacy: safety training, prevention and regulatory expertise.

The recommended positioning is stronger: Fiducial FPSG remains a safety training expert that uses digital and immersive levers when they improve prevention, compliance and learner engagement. This wording keeps the technology in the right place. It is a means to create value, not the value itself. I can connect this to VR specifically: if the company sells a headset, it risks gadget perception; if it sells professional road risk prevention, VR becomes credible.`,
  'action-overview': `This is the transition into recommendations. I should say that the action plan is deliberately limited to four actions because execution is the priority. A very broad plan would look ambitious but would be difficult to implement and monitor.

The first action is to create a clear commercial offer portfolio. The second is to train salespeople in value-based selling. The third is to launch a 40-client pilot campaign. The fourth is to install a dedicated KPI dashboard with monthly monitoring. The logic is sequential: clarify the offer, enable the sales force, test on a controlled perimeter, measure the results, then scale. This gives Fiducial FPSG a realistic path rather than a theoretical recommendation.`,
  'rec-portfolio': `For recommendation one, I should present the offer portfolio as the foundation of the whole plan. The objective is to make the offers easier to understand and easier to sell. Each offer should have a concise sales sheet with the target client, the client problem solved, the key benefits, pricing logic, use cases, common objections and proof elements.

I can explain why this matters operationally. If a salesperson has to reconstruct the argument from memory every time, the offer will not scale. A good sales sheet standardizes the commercial message without making it rigid. It also prepares the training session and the pilot campaign. I should be clear: a sales sheet alone does not sell the offer, but without it the following actions become weaker.`,
  'rec-training': `For recommendation two, I should insist that training is not a product presentation. The salespeople do not only need to know that e-learning, AR and VR exist. They need to know when to propose them, how to qualify the client need, how to demonstrate value, and how to answer objections.

The proposed format is a first group of four salespeople during one day. This is realistic and limited, which makes it easier to test before expanding. The session should include value-based selling, demonstrations, objection handling, a discovery questionnaire and role plays. I can use the formula on the slide to explain that internal cost should be calculated with loaded hourly costs, but the main point is capability building. Salespeople cannot scale offers they do not fully understand.`,
  'rec-pilot': `For recommendation three, I should explain the pilot logic carefully. The goal is not to immediately launch a large commercial campaign. The goal is to test the pitch, the targeting and the sales process on a controlled sample of 40 priority clients.

I should specify that the existing portfolio comes first because these clients already know Fiducial FPSG, which lowers the access barrier. Each client should be matched with the most relevant offer: e-learning for complex or multi-site needs, AR for familiar safety training upsell, and VR for road risk exposure. The pilot should include targeted email, phone follow-up, demonstrations or pilot sessions, quotes, client feedback and refusal reasons. The key sentence is: the pilot reduces commercial risk before scaling.`,
  'rec-kpi': `For recommendation four, I should make clear that KPIs are not administrative decoration. They are the mechanism that transforms isolated opportunities into a managed commercial priority. Without a dashboard, Fiducial FPSG may know that some offers exist, but not whether they are actually presented, demonstrated, quoted and converted.

The dashboard should track offers presented, demonstrations, quotes issued, quote value, conversion rate, signed revenue, gross margin, average deal value, satisfaction and refusal reasons. I must say that these are recommended KPIs, not existing results. At the beginning, the most useful indicators are activation indicators: offers presented, demos and quotes. Later, the company can focus more on conversion, margin and scaling decisions.`,
  'budget-baseline': `Sur la slide budget, je dois montrer que le plan est plus solide financièrement qu’un simple budget direct. Je présente d’abord le budget direct : 4 800 à 8 300 euros, construit à partir de quatre postes précis — portefeuille d’offres commerciales, formation de l’équipe commerciale, campagne pilote ciblée et tableau de bord KPI.

Ensuite, je valorise le temps interne. L’estimation est de 89 heures. En utilisant le SMIC brut horaire français de 12,31 euros, cela donne 89 multiplié par 12,31, soit 1 095,59 euros, arrondi à 1 096 euros. Le budget complet devient donc 5 896 à 9 396 euros. Le message à faire passer est simple : même en intégrant le temps interne, le budget reste proportionné par rapport au chiffre d’affaires signé 2025 des offres, qui atteint 402 479 euros. Je dois aussi préciser que cette valorisation est conservatrice : ce n’est pas un coût employeur complet chargé.`,
  'roi-break-even': `Sur la slide ROI, je dois expliquer que le raisonnement devient plus concret. Je ne présente plus seulement un seuil de rentabilité : je simule un ROI avec une hypothèse de marge brute de 35 %. Les revenus additionnels deviennent donc de la marge additionnelle : 7 043 euros pour le scénario conservateur, 14 087 euros pour le scénario réaliste et 28 174 euros pour le scénario ambitieux.

Ensuite, je compare cette marge au budget complet, qui inclut le temps interne. Le scénario conservateur reste fragile, ce qui est normal. Mais le scénario réaliste devient clairement défendable avec un ROI simulé de 49,9 % à 138,9 %. C’est le point clé devant le jury : même en intégrant le temps interne, le plan peut être rentable avec une progression réaliste de 10 %. Je dois rester prudent : la marge de 35 % est une hypothèse de simulation, pas une donnée définitive si elle n’est pas validée par Fiducial FPSG.`,
  'risks-final': `For the conclusion, I should bring together the whole logic. Fiducial FPSG already has the foundations: safety expertise, existing clients, and innovative training offers. The priority is not to invent more technologies, but to transform existing offers into structured, measurable and scalable commercial growth drivers.

I should also show critical distance. The plan has risks: weak sales adoption, price resistance, VR being perceived as a gadget, lack of KPI follow-up, lack of internal time and possible weak client response. The limits are also clear: no definitive ROI without margin data, sales training does not guarantee adoption, and VR may need deeper repositioning. My final recommendation is therefore progressive: segment, enable, pilot, measure and scale only after learning from evidence.`,
  'a1-budget': `Si j’ouvre cette annexe, je dois l’utiliser uniquement pour détailler le budget. Je peux rappeler les quatre postes directs, puis montrer le calcul du temps interne : 89 heures multipliées par 12,31 euros de SMIC brut horaire, soit 1 095,59 euros arrondis à 1 096 euros. Le budget complet est donc de 5 896 à 9 396 euros.

Si le jury challenge ce choix, je dois répondre que c’est une valorisation conservatrice et transparente. Elle ne prétend pas remplacer un coût employeur chargé. Pour un pilotage définitif, Fiducial FPSG devrait utiliser ses propres coûts horaires internes validés.`,
  'a2-roi': `Cette annexe sert à détailler le calcul du ROI. Je dois rappeler la formule : marge additionnelle égale chiffre d’affaires additionnel multiplié par 35 %, puis ROI égal marge additionnelle moins budget total, divisé par budget total.

Je peux ensuite montrer que le scénario réaliste est le point clé : avec 40 248 euros de chiffre d’affaires additionnel et 14 087 euros de marge simulée, le ROI reste positif même avec le budget complet. Mais je dois rester prudent : les 35 % de marge brute sont une hypothèse de simulation. Les marges réelles par offre devront remplacer cette hypothèse pour un suivi financier définitif.`,
  'a3-kpi-template': `If I use this annex, I should explain the dashboard as a management routine. The first question is not only "how much revenue did we sign?" It is also "are salespeople presenting the offers?", "are clients accepting demonstrations?", "are quotes being issued?", and "why do some clients refuse?"

The dashboard therefore combines activity, conversion, financial and qualitative indicators. Refusal reasons are especially useful after the pilot because they help adjust targeting, wording, pricing logic and proof elements.`,
  'a4-benchmark-grid': `This annex supports the benchmark methodology. I should explain that the benchmark compares perspectives rather than simply listing competitors. The goal was to learn from different angles: safety training competition, pedagogical innovation, key account expectations and B2B sales strategy.

If challenged on the selection of actors, I can answer that each actor was chosen for what it teaches Fiducial FPSG: how to package value, how to make innovation credible, how clients evaluate adoption risk, and how sales teams sell high-value offers.`,
  'a5-jury-questions': `This annex is a backup for Q&A. I should not read it as a slide during the main flow. If I need it, the posture is simple: answer with evidence and stay careful on uncertain points.

For example, if asked whether the ROI is reliable, I should say it is reliable as a decision framework but not as a guaranteed financial result without margin data. If asked whether the numbers are invented, I should refer to the analyzed commercial proposals, 2025 signed revenue and the dissertation material.`,
  'a6-offer-definitions': `This annex helps if the jury wants clarification on the offers. I should define each offer through client value. E-learning means customized digital training that can be reused and standardized. AR means augmenting a familiar safety training need with visual and interactive learning. VR means simulation, especially useful for road risk prevention.

The key is to avoid technology-first definitions. I should always connect the format to prevention, compliance, engagement or operational risk management.`,
  'a7-timing': `This annex is a private time-management support. If I am late during the defense, I should shorten the detailed diagnosis and preserve the action plan, budget, ROI and risks, because those slides prove the operational value of the mission.

The target is about 34 to 38 minutes. I should keep a steady pace: concise opening, rigorous methodology, clear diagnosis, and enough time for recommendations and financial reasoning.`,
  'a8-static-summary': `This annex can be used as a final backup summary. In one minute, I can say: Fiducial FPSG has existing high-value offers and credible expertise, but the commercial system is not structured enough to scale them consistently.

The recommended answer is to clarify the commercial portfolio, train a first group of salespeople, run a 40-client pilot campaign, monitor dedicated KPIs and scale progressively. The final message is simple: innovation exists; commercial scalability must be built.`
};

export const getPresenterScriptEN = (slide: Slide) => {
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
  { phase: 'Budget / ROI / risks / conclusion', screens: '22-24', duration: '8-10 min' }
];

export const coherenceChecklist = [
  'Problem statement identical to the dissertation',
  '2025 signed revenue: AR €347,705; e-learning €48,974; VR €5,800; total €402,479',
  'Direct budget total: €4,800-€8,300',
  'Complete budget including internal time: €5,896-€9,396',
  'Internal time valuation: 89 hours × €12.31 = €1,095.59, rounded to €1,096',
  'Four recommendations: commercial offer portfolio, sales training, 40-client pilot campaign, KPI dashboard and monthly monitoring',
  'Sales training: first group of 4 salespeople, 1 day',
  'ROI simulated with a 35% gross margin assumption and the complete budget, not guaranteed ROI',
  'KPIs are clearly presented as recommended indicators, not existing results',
  'Fiducial FPSG remains a safety training expert using digital and immersive solutions as levers'
];
