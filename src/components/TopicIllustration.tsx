import {
  AlertTriangle,
  BadgeEuro,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  ChartColumnIncreasing,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Eye,
  FileText,
  Gauge,
  GraduationCap,
  Handshake,
  Headset,
  Laptop,
  Layers,
  LineChart,
  Mail,
  MessageSquareText,
  MonitorPlay,
  MousePointer2,
  PackageCheck,
  PhoneCall,
  Presentation,
  Rocket,
  Route,
  ScanLine,
  Search,
  Send,
  ShieldCheck,
  Target,
  TimerReset,
  TrendingUp,
  UsersRound
} from 'lucide-react';

export type TopicVariant =
  | 'opening'
  | 'roadmap'
  | 'issue'
  | 'problem'
  | 'methodology'
  | 'benchmark'
  | 'competitor'
  | 'pedagogy'
  | 'keyAccount'
  | 'sales'
  | 'elearning'
  | 'ar'
  | 'vr'
  | 'strength'
  | 'weakness'
  | 'opportunity'
  | 'threat'
  | 'strategy'
  | 'segmentation'
  | 'positioning'
  | 'portfolio'
  | 'training'
  | 'pilot'
  | 'client'
  | 'email'
  | 'call'
  | 'demo'
  | 'feedback'
  | 'kpi'
  | 'quote'
  | 'conversion'
  | 'revenue'
  | 'margin'
  | 'satisfaction'
  | 'budget'
  | 'roi'
  | 'risk'
  | 'timing'
  | 'definition'
  | 'summary';

type Props = {
  variant: TopicVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'light' | 'deep' | 'ghost';
  mode?: 'auto' | 'image' | 'icon';
  className?: string;
};

type TopicAsset = {
  label: string;
  detail: string;
  asset: string;
  Icon: typeof Laptop;
};

const img = (name: string) => `/illustrations/${name}.png`;

const config: Record<TopicVariant, TopicAsset> = {
  opening: { Icon: Rocket, label: 'Growth', detail: 'innovation to sales', asset: img('strategy') },
  roadmap: { Icon: Route, label: 'Plan', detail: 'structured flow', asset: img('strategy') },
  issue: { Icon: AlertTriangle, label: 'Gap', detail: 'scalability', asset: img('risk') },
  problem: { Icon: Target, label: 'Question', detail: 'strategy + sales', asset: img('risk') },
  methodology: { Icon: Search, label: 'Method', detail: 'evidence cross-check', asset: img('benchmark') },
  benchmark: { Icon: BarChart3, label: 'Benchmark', detail: 'market lessons', asset: img('benchmark') },
  competitor: { Icon: ShieldCheck, label: 'Market', detail: 'direct competitor', asset: img('benchmark') },
  pedagogy: { Icon: BookOpenCheck, label: 'Learning', detail: 'pedagogy proof', asset: img('elearning') },
  keyAccount: { Icon: Building2, label: 'Key account', detail: 'client adoption', asset: img('segmentation') },
  sales: { Icon: Handshake, label: 'B2B sales', detail: 'value selling', asset: img('training') },
  elearning: { Icon: MonitorPlay, label: 'E-learning', detail: 'custom module', asset: img('elearning') },
  ar: { Icon: ScanLine, label: 'AR', detail: 'augmented layer', asset: img('ar') },
  vr: { Icon: Headset, label: 'VR', detail: 'risk simulation', asset: img('vr') },
  strength: { Icon: CheckCircle2, label: 'Asset', detail: 'internal strength', asset: img('strategy') },
  weakness: { Icon: AlertTriangle, label: 'Friction', detail: 'system gap', asset: img('risk') },
  opportunity: { Icon: TrendingUp, label: 'Opening', detail: 'market demand', asset: img('roi') },
  threat: { Icon: ShieldCheck, label: 'Risk', detail: 'adoption barrier', asset: img('risk') },
  strategy: { Icon: BrainCircuit, label: 'Strategy', detail: 'value chain', asset: img('strategy') },
  segmentation: { Icon: Target, label: 'Target fit', detail: 'right offer', asset: img('segmentation') },
  positioning: { Icon: BriefcaseBusiness, label: 'Positioning', detail: 'safety expert', asset: img('portfolio') },
  portfolio: { Icon: FileText, label: 'Offer sheet', detail: 'sales material', asset: img('portfolio') },
  training: { Icon: GraduationCap, label: 'Enable', detail: 'sales training', asset: img('training') },
  pilot: { Icon: Send, label: 'Pilot', detail: '40 clients', asset: img('pilot') },
  client: { Icon: UsersRound, label: 'Clients', detail: 'priority portfolio', asset: img('segmentation') },
  email: { Icon: Mail, label: 'Email', detail: 'targeted outreach', asset: img('pilot') },
  call: { Icon: PhoneCall, label: 'Call', detail: 'follow-up', asset: img('pilot') },
  demo: { Icon: Presentation, label: 'Demo', detail: 'proof session', asset: img('pilot') },
  feedback: { Icon: MessageSquareText, label: 'Learn', detail: 'refusal reasons', asset: img('pilot') },
  kpi: { Icon: Gauge, label: 'KPI', detail: 'monthly tracking', asset: img('kpi') },
  quote: { Icon: ClipboardList, label: 'Quote', detail: 'commercial proof', asset: img('portfolio') },
  conversion: { Icon: MousePointer2, label: 'Convert', detail: 'deal movement', asset: img('kpi') },
  revenue: { Icon: BadgeEuro, label: 'Revenue', detail: 'signed sales', asset: img('roi') },
  margin: { Icon: CircleDollarSign, label: 'Margin', detail: 'profit logic', asset: img('budget') },
  satisfaction: { Icon: Eye, label: 'Satisfaction', detail: 'client signal', asset: img('kpi') },
  budget: { Icon: BadgeEuro, label: 'Budget', detail: 'controlled spend', asset: img('budget') },
  roi: { Icon: LineChart, label: 'ROI', detail: 'break-even', asset: img('roi') },
  risk: { Icon: AlertTriangle, label: 'Limit', detail: 'mitigation', asset: img('risk') },
  timing: { Icon: TimerReset, label: 'Timing', detail: 'oral rhythm', asset: img('strategy') },
  definition: { Icon: Layers, label: 'Define', detail: 'offer meaning', asset: img('portfolio') },
  summary: { Icon: PackageCheck, label: 'Summary', detail: 'final logic', asset: img('strategy') }
};

export default function TopicIllustration({ variant, size = 'md', tone = 'light', mode = 'auto', className = '' }: Props) {
  const item = config[variant];
  const Icon = item.Icon;
  const useGeneratedImage = mode === 'image' || (mode === 'auto' && (size === 'md' || size === 'lg' || size === 'xl'));

  return (
    <div className={`topic-illustration ${useGeneratedImage ? 'topic-has-image' : 'topic-has-icon'} topic-${variant} topic-${size} topic-${tone} ${className}`} aria-hidden="true">
      {useGeneratedImage ? (
        <div className="topic-art">
          <img src={item.asset} alt="" loading="eager" draggable="false" />
        </div>
      ) : (
        <div className="topic-icon">
          <Icon size={size === 'xs' ? 18 : 22} strokeWidth={2.35} />
        </div>
      )}
      <div className="topic-copy">
        <span>{item.label}</span>
        <small>{item.detail}</small>
      </div>
    </div>
  );
}
