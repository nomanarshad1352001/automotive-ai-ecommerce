import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card, Btn, PageHeader, StatCard, Badge, ProgressBar, Input, Select } from './ui';
import { categories, products, vendorFeeds, aiTasks, fitmentCoverageData, revenueData } from '../data/products';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, PieChart, Pie } from 'recharts';
import {
  Tags, Sparkles, CheckCircle2, XCircle, ArrowRight, Brain, FolderTree, Link2, Package, Plus,
  Search, Car, Database, Filter, AlertCircle, Play, Pause, RotateCcw, Clock, Cpu, RefreshCw, Settings,
  ArrowDownToLine, Globe, ShoppingBag, ArrowUpRight, DollarSign, ShoppingCart, Users,
  BarChart3, Construction, FileText, Image, Wand2, Eye, Trash2, Save
} from 'lucide-react';

// ─── AUTO CATEGORIZATION ─────────────────────────────────────────────
export function AutoCategorizationView() {
  const { t } = useTheme();
  const items: { id: string; name: string; sku: string; from: string; to: string; conf: number; status: 'pending' | 'accepted' | 'rejected'; reason: string }[] = [
    { id: '1', name: 'Electronic Active Suspension Module', sku: 'WA-ESM-001', from: 'Uncategorized', to: 'Air Suspension > Control Modules', conf: 94, status: 'pending', reason: 'Keyword match: suspension module' },
    { id: '2', name: 'Rear Leveling Shock Kit', sku: 'WA-RLS-002', from: 'Uncategorized', to: 'Shock Absorbers > Rear Shocks', conf: 88, status: 'pending', reason: 'Name includes "shock", rear position' },
    { id: '3', name: 'Front Sway Bar End Link', sku: 'WA-SBL-003', from: 'Uncategorized', to: 'Steering > Ball Joints', conf: 72, status: 'pending', reason: 'Sway bar link may need review' },
    { id: '4', name: 'Air Line Repair Kit', sku: 'WA-ALK-004', from: 'Uncategorized', to: 'Air Suspension > Air Lines', conf: 96, status: 'pending', reason: 'Direct keyword match' },
    { id: '5', name: 'Heavy Duty Rear Coil Spring', sku: 'WA-HCS-005', from: 'Uncategorized', to: 'Coil Springs > Heavy Duty', conf: 98, status: 'pending', reason: 'Direct match: heavy duty + coil spring' },
  ];
  const [data, setData] = useState(items);
  const accept = (id: string) => setData(p => p.map(i => i.id === id ? { ...i, status: 'accepted' as const } : i));
  const reject = (id: string) => setData(p => p.map(i => i.id === id ? { ...i, status: 'rejected' as const } : i));

  return (
    <div className="space-y-5">
      <PageHeader title="Auto-Categorization" subtitle="AI product classification">
        <Btn variant="secondary"><Brain size={13} /> Retrain</Btn>
        <Btn variant="primary" onClick={() => data.filter(i=>i.status==='pending'&&i.conf>=85).forEach(i=>accept(i.id))}><CheckCircle2 size={13} /> Accept High</Btn>
      </PageHeader>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<FolderTree size={18} style={{ color: t.accent }} />} label="Categories" value={categories.length} delay={1} />
        <StatCard icon={<Tags size={18} style={{ color: t.info }} />} label="Subcategories" value={categories.reduce((s,c) => s+c.subcategories.length, 0)} delay={2} />
        <StatCard icon={<Sparkles size={18} style={{ color: t.warning }} />} label="Pending" value={data.filter(i=>i.status==='pending').length} delay={3} />
        <StatCard icon={<CheckCircle2 size={18} style={{ color: t.success }} />} label="Accuracy" value="92%" delay={4} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-xs font-bold mb-3" style={{ color: t.text }}>Taxonomy</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {categories.map(c => (
              <div key={c.id} className="p-2 rounded-lg cursor-pointer" onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}>
                <div className="flex justify-between"><span className="text-[11px] font-bold" style={{ color: t.textSecondary }}>{c.icon} {c.name}</span><Badge>{c.count}</Badge></div>
                <div className="flex flex-wrap gap-1 mt-1">{c.subcategories.map(s => <span key={s} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: t.border, color: t.textMuted }}>{s}</span>)}</div>
              </div>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-2">
          {data.map(item => (
            <Card key={item.id} className={`p-3.5 ${item.status !== 'pending' ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between">
                <div><p className="text-xs font-bold" style={{ color: t.text }}>{item.name}</p><p className="text-[9px] font-mono" style={{ color: t.textMuted }}>{item.sku}</p></div>
                <Badge color={item.conf >= 90 ? 'success' : item.conf >= 75 ? 'warning' : 'danger'}>{item.conf}%</Badge>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: t.border, color: t.textMuted }}>{item.from}</span>
                <ArrowRight size={10} style={{ color: t.accent }} />
                <span className="text-[10px] px-2 py-0.5 rounded font-bold" style={{ background: t.accentBg, color: t.accentText }}>{item.to}</span>
              </div>
              <p className="text-[9px] mt-1.5 italic" style={{ color: t.textMuted }}>💡 {item.reason}</p>
              {item.status === 'pending' && <div className="flex gap-1.5 mt-2"><Btn onClick={() => accept(item.id)} variant="success" size="sm"><CheckCircle2 size={10} /> Accept</Btn><Btn onClick={() => reject(item.id)} variant="danger" size="sm"><XCircle size={10} /> Reject</Btn></div>}
              {item.status === 'accepted' && <p className="text-[9px] mt-1.5 font-bold" style={{ color: t.success }}>✓ Accepted</p>}
              {item.status === 'rejected' && <p className="text-[9px] mt-1.5 font-bold" style={{ color: t.danger }}>✗ Rejected</p>}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CATALOG ENRICHMENT ──────────────────────────────────────────────
export function CatalogEnrichment() {
  const { t } = useTheme();
  const jobs = [
    { id: '1', type: 'Description Gen', icon: <FileText size={15} />, desc: 'AI-generate missing descriptions', affected: 4, status: 'completed' as const, progress: 100 },
    { id: '2', type: 'Attribute Extract', icon: <Tags size={15} />, desc: 'Extract missing attributes from data', affected: 8, status: 'running' as const, progress: 67 },
    { id: '3', type: 'Image Processing', icon: <Image size={15} />, desc: 'Optimize & resize product images', affected: 30, status: 'ready' as const, progress: 0 },
    { id: '4', type: 'Content Quality', icon: <Wand2 size={15} />, desc: 'Fix grammar, standardize formatting', affected: products.length, status: 'ready' as const, progress: 0 },
  ];
  const needsEnrich = products.filter(p => p.missingFields.length > 0);

  return (
    <div className="space-y-5">
      <PageHeader title="AI Data Enrichment" subtitle="Enhance product data quality" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<AlertCircle size={18} style={{ color: t.warning }} />} label="Need Enrichment" value={needsEnrich.length} delay={1} />
        <StatCard icon={<FileText size={18} style={{ color: t.info }} />} label="Missing Desc" value={products.filter(p=>!p.description).length} delay={2} />
        <StatCard icon={<Tags size={18} style={{ color: t.accent }} />} label="Missing Attrs" value={products.reduce((s,p)=>s+p.missingFields.length,0)} delay={3} />
        <StatCard icon={<CheckCircle2 size={18} style={{ color: t.success }} />} label="Complete" value={products.filter(p=>p.missingFields.length===0).length} delay={4} />
      </div>
      {jobs.map(j => (
        <Card key={j.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: j.status === 'completed' ? t.successBg : j.status === 'running' ? t.accentBg : t.border, color: j.status === 'completed' ? t.success : j.status === 'running' ? t.accent : t.textMuted }}>{j.icon}</div>
              <div><h3 className="text-xs font-bold flex items-center gap-2" style={{ color: t.text }}>{j.type}<Badge color={j.status === 'completed' ? 'success' : j.status === 'running' ? 'accent' : 'default'}>{j.status}</Badge></h3><p className="text-[10px] mt-0.5" style={{ color: t.textMuted }}>{j.desc} · {j.affected} products</p></div>
            </div>
            <Btn variant={j.status === 'completed' ? 'success' : j.status === 'running' ? 'secondary' : 'primary'} size="sm" disabled={j.status === 'completed'}>{j.status === 'completed' ? '✓ Done' : j.status === 'running' ? 'Pause' : 'Start'}</Btn>
          </div>
          {j.progress > 0 && <div className="mt-3"><ProgressBar value={j.progress} color={j.status === 'completed' ? t.success : t.accent} /></div>}
        </Card>
      ))}
    </div>
  );
}

// ─── CATALOG QUALITY ─────────────────────────────────────────────────
export function CatalogQuality() {
  const { t } = useTheme();
  const avg = Math.round(products.reduce((s,p)=>s+p.aiScore,0)/products.length);
  const issues = [
    { id:'1', sev:'critical' as const, desc:'Empty descriptions', count:3, fixable:true },
    { id:'2', sev:'critical' as const, desc:'No UPC code', count:5, fixable:false },
    { id:'3', sev:'warning' as const, desc:'Missing weight', count:8, fixable:true },
    { id:'4', sev:'warning' as const, desc:'Missing dimensions', count:5, fixable:true },
    { id:'5', sev:'info' as const, desc:'Short descriptions', count:2, fixable:true },
    { id:'6', sev:'info' as const, desc:'Missing images', count:30, fixable:false },
  ];
  const [fixed, setFixed] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-5">
      <PageHeader title="Data Quality Scanner" subtitle="AI catalog quality analysis" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Eye size={18} style={{ color: t.accent }} />} label="Overall Score" value={`${avg}/100`} delay={1} />
        <StatCard icon={<XCircle size={18} style={{ color: t.danger }} />} label="Critical" value={issues.filter(i=>i.sev==='critical').length} delay={2} />
        <StatCard icon={<AlertCircle size={18} style={{ color: t.warning }} />} label="Warnings" value={issues.filter(i=>i.sev==='warning').length} delay={3} />
        <StatCard icon={<CheckCircle2 size={18} style={{ color: t.success }} />} label="Auto-Fixable" value={issues.filter(i=>i.fixable).length} delay={4} />
      </div>
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3"><h3 className="text-xs font-bold" style={{ color: t.text }}>Issues</h3><Btn variant="primary" size="sm" onClick={() => issues.filter(i=>i.fixable).forEach(i=>setFixed(p=>new Set(p).add(i.id)))}>Auto-Fix All</Btn></div>
        {issues.map(issue => (
          <div key={issue.id} className={`flex items-center justify-between py-2.5 px-2 rounded-lg ${fixed.has(issue.id)?'opacity-40':''}`} style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e=>(e.currentTarget).style.background=t.tableRowHover} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}>
            <div className="flex items-center gap-2.5">
              {issue.sev === 'critical' ? <XCircle size={14} style={{ color: t.danger }} /> : issue.sev === 'warning' ? <AlertCircle size={14} style={{ color: t.warning }} /> : <Eye size={14} style={{ color: t.info }} />}
              <div><p className="text-[11px] font-bold" style={{ color: t.textSecondary }}>{issue.desc}</p><p className="text-[9px]" style={{ color: t.textMuted }}>{issue.count} products</p></div>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge color={issue.sev==='critical'?'danger':issue.sev==='warning'?'warning':'info'}>{issue.sev}</Badge>
              {issue.fixable && !fixed.has(issue.id) && <Btn onClick={() => setFixed(p => new Set(p).add(issue.id))} variant="success" size="sm"><CheckCircle2 size={10} /> Fix</Btn>}
              {fixed.has(issue.id) && <span className="text-[10px] font-bold" style={{ color: t.success }}>✓ Fixed</span>}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── PRODUCT RELATIONSHIPS ───────────────────────────────────────────
export function ProductRelationships() {
  const { t } = useTheme();
  const rels = [
    { id:'1', s:'Air Spring Assembly', ss:'WA-AS-4228', tg:'Compressor', ts:'WA-AC-5501', type:'accessory', conf:96 },
    { id:'2', s:'Strut Assembly', ss:'WA-SA-7712', tg:'Shock Absorber', ts:'WA-SA-7713', type:'similar', conf:89 },
    { id:'3', s:'Brake Rotor', ss:'WA-BC-9902', tg:'Brake Pads', ts:'WA-BC-9903', type:'kit-component', conf:99 },
    { id:'4', s:'Engine Mount', ss:'WA-EM-1101', tg:'Trans Mount', ts:'WA-EM-1102', type:'similar', conf:95 },
    { id:'5', s:'Coil Spring Front', ss:'WA-CS-3301', tg:'Coil Spring Rear', ts:'WA-CS-3302', type:'kit-component', conf:94 },
  ];
  const [approved, setApproved] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-5">
      <PageHeader title="Product Relationships" subtitle="AI-detected associations">
        <Btn variant="primary"><Sparkles size={13} /> Discover</Btn><Btn variant="ghost"><Plus size={13} /> Add</Btn>
      </PageHeader>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Link2 size={18} style={{ color: t.accent }} />} label="Relations" value={rels.length} delay={1} />
        <StatCard icon={<Sparkles size={18} style={{ color: t.info }} />} label="AI Generated" value={rels.length} delay={2} />
        <StatCard icon={<CheckCircle2 size={18} style={{ color: t.success }} />} label="Avg Confidence" value={`${Math.round(rels.reduce((s,r)=>s+r.conf,0)/rels.length)}%`} delay={3} />
        <StatCard icon={<Package size={18} style={{ color: t.warning }} />} label="With Relations" value={products.filter(p=>p.relatedProducts.length>0).length} delay={4} />
      </div>
      {rels.map(r => (
        <Card key={r.id} className={`p-4 ${approved.has(r.id)?'opacity-50':''}`}>
          <div className="flex items-center gap-3">
            <div className="flex-1 p-2.5 rounded-lg" style={{ background: t.border }}><p className="text-[11px] font-bold" style={{ color: t.text }}>{r.s}</p><p className="text-[9px] font-mono" style={{ color: t.textMuted }}>{r.ss}</p></div>
            <div className="text-center flex-shrink-0"><Badge color="accent">{r.type}</Badge><div className="my-1"><ArrowRight size={14} style={{ color: t.textMuted }} /></div><span className="text-[10px] font-extrabold" style={{ color: r.conf >= 85 ? t.success : t.warning }}>{r.conf}%</span></div>
            <div className="flex-1 p-2.5 rounded-lg" style={{ background: t.border }}><p className="text-[11px] font-bold" style={{ color: t.text }}>{r.tg}</p><p className="text-[9px] font-mono" style={{ color: t.textMuted }}>{r.ts}</p></div>
            <div className="flex-shrink-0">
              {!approved.has(r.id) ? <Btn onClick={() => setApproved(p => new Set(p).add(r.id))} variant="primary" size="sm"><CheckCircle2 size={10} /> Approve</Btn> : <Badge color="success">✓</Badge>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── FITMENT DB ──────────────────────────────────────────────────────
export function FitmentDatabase() {
  const { t } = useTheme();
  const [make, setMake] = useState(''); const [year, setYear] = useState(''); const [search, setSearch] = useState('');
  const allMakes = [...new Set(products.flatMap(p => p.fitment.map(f => f.make)))].sort();
  const allYears = [...new Set(products.flatMap(p => p.fitment.map(f => f.year)))].sort((a,b) => b-a);
  const fits = products.flatMap(p => p.fitment.map(f => ({ ...f, product: p.name, sku: p.sku }))).filter(f => (!make||f.make===make) && (!year||f.year===parseInt(year)) && (!search||f.model.toLowerCase().includes(search.toLowerCase())||f.product.toLowerCase().includes(search.toLowerCase())));
  const total = products.reduce((s,p) => s+p.fitment.length, 0);

  return (
    <div className="space-y-5">
      <PageHeader title="Vehicle Fitment Database" subtitle={`${total} applications`} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Database size={18} style={{ color: t.accent }} />} label="Applications" value={total} delay={1} />
        <StatCard icon={<Car size={18} style={{ color: t.info }} />} label="Makes" value={allMakes.length} delay={2} />
        <StatCard icon={<CheckCircle2 size={18} style={{ color: t.success }} />} label="Coverage" value="89%" delay={3} />
        <StatCard icon={<AlertCircle size={18} style={{ color: t.warning }} />} label="Pending" value={47} delay={4} />
      </div>
      <Card className="p-5">
        <h3 className="text-xs font-bold mb-3" style={{ color: t.text }}>Coverage by Make</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={fitmentCoverageData}>
            <CartesianGrid strokeDasharray="3 3" stroke={t.border} />
            <XAxis dataKey="make" stroke={t.textMuted} fontSize={10} tickLine={false} />
            <YAxis stroke={t.textMuted} fontSize={10} domain={[0,100]} tickLine={false} />
            <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, fontSize: 11, color: t.text }} />
            <Bar dataKey="coverage" radius={[4,4,0,0]} barSize={16}>
              {fitmentCoverageData.map((e,i) => <Cell key={i} fill={e.coverage>=85?t.success:e.coverage>=75?t.warning:t.danger} fillOpacity={.8} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-4">
        <h3 className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: t.text }}><Filter size={12} /> Lookup</h3>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mb-3">
          <Select value={year} onChange={setYear} options={[{ value: '', label: 'All Years' }, ...allYears.map(y => ({ value: y.toString(), label: y.toString() }))]} />
          <Select value={make} onChange={setMake} options={[{ value: '', label: 'All Makes' }, ...allMakes.map(m => ({ value: m, label: m }))]} />
          <div className="relative col-span-2 sm:flex-1 sm:min-w-[150px]"><Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: t.textMuted }} /><Input value={search} onChange={setSearch} placeholder="Search..." className="pl-8" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]"><thead><tr style={{ borderBottom: `1px solid ${t.border}` }}>
            {['Year','Make','Model','Engine','Product','SKU'].map(h => <th key={h} className="text-left px-3 py-2 text-[10px] font-bold uppercase" style={{ color: t.textMuted }}>{h}</th>)}
          </tr></thead><tbody>
            {fits.slice(0,15).map((f,i) => (
              <tr key={i} className="cursor-pointer" style={{ borderBottom: `1px solid ${t.border}` }} onMouseEnter={e=>(e.currentTarget).style.background=t.tableRowHover} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}>
                <td className="px-3 py-2 text-[11px] font-bold" style={{ color: t.text }}>{f.year}</td>
                <td className="px-3 py-2 text-[11px] font-bold" style={{ color: t.textSecondary }}>{f.make}</td>
                <td className="px-3 py-2 text-[11px]" style={{ color: t.textSecondary }}>{f.model}</td>
                <td className="px-3 py-2 text-[11px]" style={{ color: t.textMuted }}>{f.engine}</td>
                <td className="px-3 py-2 text-[11px] font-bold" style={{ color: t.accent }}>{f.product}</td>
                <td className="px-3 py-2 text-[11px] font-mono" style={{ color: t.textMuted }}>{f.sku}</td>
              </tr>
            ))}
          </tbody></table>
          {fits.length > 15 && <p className="text-[10px] text-center py-2" style={{ color: t.textMuted }}>Showing 15 of {fits.length}</p>}
        </div>
      </Card>
    </div>
  );
}

// ─── PART FINDER AI ──────────────────────────────────────────────────
export function PartFinderAI() {
  const { t } = useTheme();
  const [year, setYear] = useState(''); const [make, setMake] = useState(''); const [model, setModel] = useState(''); const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]); const [searched, setSearched] = useState(false);
  const allMakes = [...new Set(products.flatMap(p => p.fitment.map(f => f.make)))].sort();
  const allYears = [...new Set(products.flatMap(p => p.fitment.map(f => f.year)))].sort((a,b)=>b-a);
  const allModels = [...new Set(products.flatMap(p => p.fitment.filter(f => (!make||f.make===make)).map(f => f.model)))].sort();
  const handleSearch = () => { setResults(products.filter(p => { const hf = p.fitment.some(f => (!year||f.year===parseInt(year))&&(!make||f.make===make)&&(!model||f.model===model)); const mq = !query||p.name.toLowerCase().includes(query.toLowerCase()); return (hf||(!year&&!make&&!model))&&mq; })); setSearched(true); };

  return (
    <div className="space-y-5">
      <PageHeader title="Part Finder AI" subtitle="Vehicle-to-part matching" />
      <Card className="p-5">
        <h3 className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: t.text }}><Car size={14} style={{ color: t.accent }} /> Select Vehicle</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <Select value={year} onChange={setYear} options={[{ value: '', label: 'Year' }, ...allYears.map(y=>({ value: y.toString(), label: y.toString() }))]} />
          <Select value={make} onChange={v => { setMake(v); setModel(''); }} options={[{ value: '', label: 'Make' }, ...allMakes.map(m=>({ value: m, label: m }))]} />
          <Select value={model} onChange={setModel} options={[{ value: '', label: 'Model' }, ...allModels.map(m=>({ value: m, label: m }))]} />
          <Input value={query} onChange={setQuery} placeholder="Part type..." />
        </div>
        <Btn onClick={handleSearch} variant="primary" className="mt-3"><Sparkles size={13} /> Find Parts</Btn>
      </Card>
      {searched && (
        <div className="an-fade">
          <p className="text-sm font-bold mb-3" style={{ color: t.text }}>{results.length} results</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map(p => (
              <Card key={p.id} className="p-4 cursor-pointer" onClick={() => {}}>
                <div className="flex items-start justify-between"><div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: t.border }}><Package size={16} style={{ color: t.textMuted }} /></div><Badge color="success">{Math.round(85+Math.random()*15)}%</Badge></div>
                <h4 className="text-xs font-bold mt-2" style={{ color: t.text }}>{p.name}</h4>
                <p className="text-[9px] font-mono" style={{ color: t.textMuted }}>{p.sku}</p>
                <p className="text-lg font-extrabold mt-2" style={{ color: t.text }}>${p.price}</p>
                <p className="text-[9px] mt-1" style={{ color: p.stock > 0 ? t.success : t.danger }}>{p.stock > 0 ? `✓ ${p.stock} in stock` : '✗ Out of stock'}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AUTOMATION TASKS ────────────────────────────────────────────────
export function AutomationTasks() {
  const { t } = useTheme();
  const [tasks, setTasks] = useState(aiTasks);
  const toggle = (id: string) => setTasks(p => p.map(tk => tk.id === id ? { ...tk, status: tk.status === 'running' ? 'paused' as const : tk.status === 'queued' || tk.status === 'paused' || tk.status === 'failed' ? 'running' as const : tk.status } : tk));
  const remove = (id: string) => setTasks(p => p.filter(tk => tk.id !== id));

  return (
    <div className="space-y-5">
      <PageHeader title="AI Automation Tasks" subtitle="Manage processing jobs"><Btn variant="primary"><Play size={13} /> New Task</Btn></PageHeader>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { icon: <Cpu size={16} style={{ color: t.accent }} />, l: 'Running', v: tasks.filter(x=>x.status==='running').length },
          { icon: <Clock size={16} style={{ color: t.warning }} />, l: 'Queued', v: tasks.filter(x=>x.status==='queued').length },
          { icon: <Pause size={16} style={{ color: t.info }} />, l: 'Paused', v: tasks.filter(x=>x.status==='paused').length },
          { icon: <CheckCircle2 size={16} style={{ color: t.success }} />, l: 'Done', v: tasks.filter(x=>x.status==='completed').length },
          { icon: <XCircle size={16} style={{ color: t.danger }} />, l: 'Failed', v: tasks.filter(x=>x.status==='failed').length },
        ].map((s,i) => <StatCard key={s.l} icon={s.icon} label={s.l} value={s.v} delay={i+1} />)}
      </div>
      {tasks.map(tk => (
        <Card key={tk.id} className="p-4" style={tk.status==='failed'?{borderColor:t.danger+'44'}:{}}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: tk.status==='running'?t.accentBg:tk.status==='completed'?t.successBg:tk.status==='failed'?t.dangerBg:t.border }}>
                {tk.status==='running'?<RefreshCw size={14} className="an-spin" style={{ color: t.accent }} />:tk.status==='completed'?<CheckCircle2 size={14} style={{ color: t.success }} />:tk.status==='failed'?<XCircle size={14} style={{ color: t.danger }} />:<Clock size={14} style={{ color: t.textMuted }} />}
              </div>
              <div><h3 className="text-xs font-bold flex items-center gap-1.5 flex-wrap" style={{ color: t.text }}>{tk.type}<Badge color={tk.status==='running'?'accent':tk.status==='completed'?'success':tk.status==='failed'?'danger':'default'}>{tk.status}</Badge></h3><p className="text-[10px] mt-0.5" style={{ color: t.textMuted }}>{tk.description}</p>
              <p className="text-[9px] mt-1" style={{ color: t.textMuted }}>{tk.itemsProcessed.toLocaleString()}/{tk.totalItems.toLocaleString()} · {tk.eta||''}</p></div>
            </div>
            <div className="flex gap-1.5">
              {tk.status!=='completed'&&<Btn onClick={() => toggle(tk.id)} variant={tk.status==='running'?'secondary':'primary'} size="sm">{tk.status==='running'?<><Pause size={10}/> Pause</>:tk.status==='failed'?<><RotateCcw size={10}/> Retry</>:<><Play size={10}/> Start</>}</Btn>}
              <button onClick={() => remove(tk.id)} className="p-1.5 rounded-lg" style={{ color: t.danger }} onMouseEnter={e=>(e.currentTarget).style.background=t.dangerBg} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Trash2 size={12} /></button>
            </div>
          </div>
          <div className="mt-3"><ProgressBar value={tk.progress} color={tk.status==='completed'?t.success:tk.status==='failed'?t.danger:t.accent} /></div>
        </Card>
      ))}
    </div>
  );
}

// ─── VENDOR FEEDS ────────────────────────────────────────────────────
export function VendorFeedsView() {
  const { t } = useTheme();
  const [syncing, setSyncing] = useState<string|null>(null);
  const sync = (id: string) => { setSyncing(id); setTimeout(() => setSyncing(null), 2000); };

  return (
    <div className="space-y-5">
      <PageHeader title="Vendor Feeds" subtitle={`${vendorFeeds.length} supplier feeds`}><Btn variant="primary" onClick={() => vendorFeeds.forEach(f => sync(f.id))}><RefreshCw size={13} /> Sync All</Btn></PageHeader>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Database size={18} style={{ color: t.accent }} />} label="Feeds" value={vendorFeeds.length} delay={1} />
        <StatCard icon={<ArrowDownToLine size={18} style={{ color: t.success }} />} label="New Items" value={vendorFeeds.reduce((s,f)=>s+f.newItems,0)} delay={2} />
        <StatCard icon={<RefreshCw size={18} style={{ color: t.info }} />} label="Updated" value={vendorFeeds.reduce((s,f)=>s+f.updatedItems,0)} delay={3} />
        <StatCard icon={<AlertCircle size={18} style={{ color: t.danger }} />} label="Errors" value={vendorFeeds.reduce((s,f)=>s+f.errorCount,0)} delay={4} />
      </div>
      {vendorFeeds.map(f => (
        <Card key={f.id} className="p-4" style={f.status==='error'?{borderColor:t.danger+'44'}:{}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: f.status==='synced'?t.successBg:f.status==='error'?t.dangerBg:f.status==='syncing'?t.accentBg:t.warningBg }}>
                {f.status==='synced'?<CheckCircle2 size={15} style={{ color: t.success }} />:f.status==='error'?<XCircle size={15} style={{ color: t.danger }} />:f.status==='syncing'?<RefreshCw size={15} className="an-spin" style={{ color: t.accent }} />:<Clock size={15} style={{ color: t.warning }} />}
              </div>
              <div><h3 className="text-xs font-bold" style={{ color: t.text }}>{f.vendor}</h3><p className="text-[9px]" style={{ color: t.textMuted }}>Last: {f.lastSync} · {f.itemCount.toLocaleString()} items · {f.format}</p></div>
            </div>
            <div className="flex items-center gap-3">
              {f.newItems > 0 && <span className="text-[10px] font-bold" style={{ color: t.success }}>+{f.newItems}</span>}
              {f.errorCount > 0 && <span className="text-[10px] font-bold" style={{ color: t.danger }}>{f.errorCount} err</span>}
              <button onClick={() => sync(f.id)} className="p-2 rounded-lg" style={{ color: syncing===f.id?t.accent:t.textMuted, background: syncing===f.id?t.accentBg:'transparent' }}><RefreshCw size={13} className={syncing===f.id?'an-spin':''} /></button>
              <button className="p-2 rounded-lg" style={{ color: t.textMuted }} onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Settings size={13} /></button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── MARKETPLACE ─────────────────────────────────────────────────────
export function MarketplaceView() {
  const { t } = useTheme();
  const mps = [
    { id:'1', name:'WestarAuto.com', status:'connected' as const, listings:2156, rev:55000, orders:312 },
    { id:'2', name:'Wholesale Portal', status:'connected' as const, listings:1890, rev:220000, orders:156 },
    { id:'3', name:'Amazon', status:'syncing' as const, listings:1245, rev:34000, orders:198 },
    { id:'4', name:'eBay Motors', status:'connected' as const, listings:987, rev:14000, orders:89 },
    { id:'5', name:'Walmart', status:'error' as const, listings:456, rev:13000, orders:67 },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Marketplaces" subtitle="Multi-channel management"><Btn variant="primary"><Globe size={13} /> Add Channel</Btn></PageHeader>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Globe size={18} style={{ color: t.accent }} />} label="Channels" value={mps.length} delay={1} />
        <StatCard icon={<ShoppingBag size={18} style={{ color: t.success }} />} label="Total Listings" value={mps.reduce((s,m)=>s+m.listings,0).toLocaleString()} delay={2} />
        <StatCard icon={<CheckCircle2 size={18} style={{ color: t.info }} />} label="Connected" value={mps.filter(m=>m.status==='connected').length} delay={3} />
        <StatCard icon={<DollarSign size={18} style={{ color: t.accent }} />} label="Revenue 30d" value={`$${(mps.reduce((s,m)=>s+m.rev,0)/1000).toFixed(0)}K`} delay={4} />
      </div>
      {mps.map(mp => (
        <Card key={mp.id} className="p-4" style={mp.status==='error'?{borderColor:t.danger+'44'}:{}}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: mp.status==='connected'?t.successBg:mp.status==='syncing'?t.accentBg:t.dangerBg }}>
                {mp.status==='connected'?<CheckCircle2 size={16} style={{ color: t.success }} />:mp.status==='syncing'?<RefreshCw size={16} className="an-spin" style={{ color: t.accent }} />:<AlertCircle size={16} style={{ color: t.danger }} />}
              </div>
              <div><h3 className="text-xs font-bold flex items-center gap-1.5" style={{ color: t.text }}>{mp.name}<Badge color={mp.status==='connected'?'success':mp.status==='syncing'?'accent':'danger'}>{mp.status}</Badge></h3></div>
            </div>
            <div className="flex items-center gap-6">
              {[{ l:'Listings', v:mp.listings.toLocaleString() }, { l:'Revenue', v:`$${(mp.rev/1000).toFixed(0)}K` }, { l:'Orders', v:mp.orders }].map(s => (
                <div key={s.l} className="text-center"><p className="text-xs font-extrabold" style={{ color: t.text }}>{s.v}</p><p className="text-[9px]" style={{ color: t.textMuted }}>{s.l}</p></div>
              ))}
              <button className="p-2 rounded-lg" style={{ color: t.textMuted }} onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><ArrowUpRight size={13} /></button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── ANALYTICS ───────────────────────────────────────────────────────
export function AnalyticsView() {
  const { t } = useTheme();
  const channelPie = [{ name:'Wholesale', value:62, color:t.accent }, { name:'DTC', value:18, color:t.info }, { name:'Amazon', value:11, color:t.success }, { name:'eBay', value:5, color:t.warning }, { name:'Walmart', value:4, color:t.danger }];
  const topProds = [{ n:'Ceramic Brake Pads', rev:53460 },{ n:'Outer Tie Rod', rev:46780 },{ n:'Engine Mount', rev:44100 },{ n:'Front Strut', rev:42500 },{ n:'Air Spring', rev:38250 }];

  return (
    <div className="space-y-5">
      <PageHeader title="Analytics" subtitle="Business intelligence" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<DollarSign size={18} style={{ color: t.success }} />} label="Monthly Revenue" value="$842K" change="+14.2%" delay={1} />
        <StatCard icon={<ShoppingCart size={18} style={{ color: t.accent }} />} label="Monthly Orders" value="1,247" change="+8.7%" delay={2} />
        <StatCard icon={<Users size={18} style={{ color: t.info }} />} label="Customers" value="3,891" change="+5.3%" delay={3} />
        <StatCard icon={<Package size={18} style={{ color: t.warning }} />} label="Avg Order" value="$675" change="+2.1%" delay={4} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <h3 className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: t.text }}><BarChart3 size={13} style={{ color: t.accent }} /> Revenue</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.border} />
              <XAxis dataKey="month" stroke={t.textMuted} fontSize={10} tickLine={false} />
              <YAxis stroke={t.textMuted} fontSize={10} tickFormatter={v=>`$${v/1000}K`} tickLine={false} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, fontSize: 11, color: t.text }} formatter={(v:unknown)=>[`$${Number(v).toLocaleString()}`,'']} />
              <Area type="monotone" dataKey="wholesale" stroke={t.accent} fill={t.accentBg} strokeWidth={2} name="Wholesale" />
              <Area type="monotone" dataKey="dtc" stroke={t.info} fill={t.infoBg} strokeWidth={2} name="DTC" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <h3 className="text-xs font-bold mb-3" style={{ color: t.text }}>Channel Split</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart><Pie data={channelPie} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
              {channelPie.map((e,i)=><Cell key={i} fill={e.color} />)}
            </Pie></PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">{channelPie.map(c=>(
            <div key={c.name} className="flex items-center justify-between px-2 py-1 rounded cursor-pointer" onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} /><span className="text-[10px]" style={{ color: t.textMuted }}>{c.name}</span></div>
              <span className="text-[10px] font-bold" style={{ color: t.text }}>{c.value}%</span>
            </div>
          ))}</div>
        </Card>
      </div>
      <Card className="p-5">
        <h3 className="text-xs font-bold mb-4" style={{ color: t.text }}>Top Products</h3>
        {topProds.map((p,i) => (
          <div key={i} className="flex items-center gap-3 mb-3 cursor-pointer group">
            <span className="text-sm font-extrabold w-5" style={{ color: t.textMuted }}>{i+1}</span>
            <div className="flex-1"><p className="text-[11px] font-bold" style={{ color: t.textSecondary }}>{p.n}</p><div className="mt-1 h-2 rounded-full overflow-hidden" style={{ background: t.border }}><div className="h-full rounded-full" style={{ width:`${(p.rev/topProds[0].rev)*100}%`, background: t.accent }} /></div></div>
            <span className="text-xs font-extrabold" style={{ color: t.text }}>${p.rev.toLocaleString()}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────────────
export function SettingsView() {
  const { t, themeName, setTheme } = useTheme();
  return (
    <div className="space-y-5">
      <PageHeader title="Settings" subtitle="Platform configuration" />
      <Card className="p-6">
        <h3 className="text-sm font-bold mb-4" style={{ color: t.text }}>🎨 Theme Selection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
          <div onClick={() => setTheme('cyber')} className="p-5 rounded-2xl cursor-pointer border-2 transition-all" style={{ background: '#141414', borderColor: themeName === 'cyber' ? '#eab308' : '#333', boxShadow: themeName === 'cyber' ? '0 0 20px rgba(234,179,8,.2)' : 'none' }}
            onMouseEnter={e => { if (themeName !== 'cyber') (e.currentTarget).style.borderColor = '#555'; }} onMouseLeave={e => { if (themeName !== 'cyber') (e.currentTarget).style.borderColor = '#333'; }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg" style={{ background: '#eab308' }} />
              <div><p className="text-sm font-extrabold" style={{ color: '#f5f5f5' }}>Cyber Gold</p><p className="text-[10px]" style={{ color: '#777' }}>Black & Yellow</p></div>
            </div>
            <div className="flex gap-1.5">{['#0a0a0a','#eab308','#fde047','#22c55e','#ef4444'].map(c => <div key={c} className="w-6 h-6 rounded-full" style={{ background: c }} />)}</div>
            {themeName === 'cyber' && <p className="text-[10px] font-bold mt-2" style={{ color: '#eab308' }}>✓ Active</p>}
          </div>
          <div onClick={() => setTheme('mono')} className="p-5 rounded-2xl cursor-pointer border-2 transition-all" style={{ background: '#111', borderColor: themeName === 'mono' ? '#fff' : '#333', boxShadow: themeName === 'mono' ? '0 0 20px rgba(255,255,255,.1)' : 'none' }}
            onMouseEnter={e => { if (themeName !== 'mono') (e.currentTarget).style.borderColor = '#555'; }} onMouseLeave={e => { if (themeName !== 'mono') (e.currentTarget).style.borderColor = '#333'; }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg" style={{ background: '#fff' }} />
              <div><p className="text-sm font-extrabold" style={{ color: '#e5e5e5' }}>Mono Chrome</p><p className="text-[10px]" style={{ color: '#777' }}>Black & White</p></div>
            </div>
            <div className="flex gap-1.5">{['#000','#fff','#999','#4ade80','#f87171'].map(c => <div key={c} className="w-6 h-6 rounded-full border border-gray-700" style={{ background: c }} />)}</div>
            {themeName === 'mono' && <p className="text-[10px] font-bold mt-2" style={{ color: '#fff' }}>✓ Active</p>}
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-bold mb-3" style={{ color: t.text }}>⚙️ General</h3>
        <div className="space-y-2.5 max-w-md">
          {['Company Name', 'Admin Email', 'API Key', 'Webhook URL'].map(label => (
            <div key={label}><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>{label}</label><Input value={label === 'Company Name' ? 'Westar Auto' : label === 'Admin Email' ? 'admin@westarauto.com' : '••••••••'} onChange={() => {}} /></div>
          ))}
          <Btn variant="primary" className="mt-3"><Save size={12} /> Save Settings</Btn>
        </div>
      </Card>
    </div>
  );
}

// ─── PLACEHOLDER ─────────────────────────────────────────────────────
export function PlaceholderSection({ title, subtitle, features }: { title: string; subtitle: string; features?: string[] }) {
  const { t } = useTheme();
  return (
    <div className="space-y-5">
      <PageHeader title={title} subtitle={subtitle} />
      <Card className="p-16 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: t.accentBg }}><Construction size={28} style={{ color: t.accent }} /></div>
        <h3 className="text-lg font-extrabold mb-2" style={{ color: t.text }}>In Development</h3>
        <p className="text-sm max-w-md mx-auto" style={{ color: t.textMuted }}>Building AI capabilities for {title.toLowerCase()}.</p>
        {features && <div className="mt-6 grid grid-cols-2 gap-2 max-w-md mx-auto">{features.map(f => <div key={f} className="flex items-center gap-2 p-2.5 rounded-lg text-left" style={{ background: t.border }}><Sparkles size={10} style={{ color: t.accent }} /><span className="text-[11px]" style={{ color: t.textMuted }}>{f}</span></div>)}</div>}
      </Card>
    </div>
  );
}
