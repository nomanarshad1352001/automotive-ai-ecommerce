import { useTheme } from '../context/ThemeContext';
import { Package, ShoppingCart, Headphones, Warehouse, AlertTriangle, Cpu, DollarSign, Zap, Car, TrendingUp, ExternalLink } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { dashboardStats, revenueData, dataQualityByCategory, aiTasks, inventoryAlerts, orders } from '../data/products';
import { StatCard, Card } from './ui';

export default function Dashboard({ onNavigate }: { onNavigate?: (s: string) => void }) {
  const { t } = useTheme();
  return (
    <div className="space-y-5">
      <div className="an-fade">
        <h1 className="text-2xl font-extrabold" style={{ color: t.text }}>Operations Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: t.textMuted }}>Westar Auto AI Platform — Real-time overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Package size={18} style={{ color: t.accent }} />} label="Total Products" value={dashboardStats.totalProducts.toLocaleString()} change="+24" onClick={() => onNavigate?.('catalog-products')} delay={1} />
        <StatCard icon={<DollarSign size={18} style={{ color: t.success }} />} label="Revenue Today" value={`$${dashboardStats.revenueToday.toLocaleString()}`} change="+12.5%" onClick={() => onNavigate?.('analytics')} delay={2} />
        <StatCard icon={<ShoppingCart size={18} style={{ color: t.info }} />} label="Orders Today" value={dashboardStats.ordersToday.toString()} change="+8" onClick={() => onNavigate?.('orders')} delay={3} />
        <StatCard icon={<Headphones size={18} style={{ color: t.warning }} />} label="AI Resolution" value={`${dashboardStats.aiResolutionRate}%`} change="+3.2%" onClick={() => onNavigate?.('support-tickets')} delay={4} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Cpu size={18} style={{ color: t.accent }} />} label="Catalog Complete" value={`${dashboardStats.catalogCompleteness}%`} onClick={() => onNavigate?.('catalog-quality')} delay={5} />
        <StatCard icon={<Car size={18} style={{ color: t.success }} />} label="Fitment Coverage" value={`${dashboardStats.fitmentCoverage}%`} onClick={() => onNavigate?.('fitment-database')} delay={6} />
        <StatCard icon={<Warehouse size={18} style={{ color: t.warning }} />} label="Inventory Value" value={`$${(dashboardStats.inventoryValue / 1000).toFixed(0)}K`} onClick={() => onNavigate?.('inventory-alerts')} delay={7} />
        <StatCard icon={<AlertTriangle size={18} style={{ color: t.danger }} />} label="Low Stock" value={dashboardStats.lowStockItems.toString()} onClick={() => onNavigate?.('inventory-alerts')} delay={8} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-3 sm:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-bold flex items-center gap-2" style={{ color: t.text }}><TrendingUp size={14} style={{ color: t.accent }} /> Revenue by Channel</h3>
          </div>
          <ResponsiveContainer width="100%" height={200} className="sm:!h-[260px]">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.border} />
              <XAxis dataKey="month" stroke={t.textMuted} fontSize={11} tickLine={false} />
              <YAxis stroke={t.textMuted} fontSize={11} tickFormatter={v => `$${v/1000}K`} tickLine={false} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, fontSize: 12, color: t.text }} formatter={(v: unknown) => [`$${Number(v).toLocaleString()}`,'']} />
              <Area type="monotone" dataKey="wholesale" stroke={t.accent} fill={t.accentBg} strokeWidth={2} name="Wholesale" />
              <Area type="monotone" dataKey="dtc" stroke={t.info} fill={t.infoBg} strokeWidth={2} name="DTC" />
              <Area type="monotone" dataKey="amazon" stroke={t.success} fill={t.successBg} strokeWidth={2} name="Amazon" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-bold mb-4" style={{ color: t.text }}>Data Quality</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dataQualityByCategory} layout="vertical" margin={{ left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.border} horizontal={false} />
              <XAxis type="number" domain={[0, 100]} stroke={t.textMuted} fontSize={10} tickLine={false} />
              <YAxis type="category" dataKey="category" stroke={t.textMuted} fontSize={9} width={70} tickLine={false} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, fontSize: 11, color: t.text }} />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={12}>
                {dataQualityByCategory.map((e, i) => <Cell key={i} fill={e.score >= 85 ? t.success : e.score >= 75 ? t.warning : t.danger} fillOpacity={.8} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: t.text }}><Zap size={15} style={{ color: t.accent }} /> AI Tasks</h3>
            <button onClick={() => onNavigate?.('automation-tasks')} className="text-xs font-bold flex items-center gap-1" style={{ color: t.accent }}><ExternalLink size={11} /> All</button>
          </div>
          {aiTasks.slice(0, 5).map(task => (
            <div key={task.id} className="flex items-center gap-3 py-2 px-2 rounded-lg cursor-pointer" onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}>
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${task.status==='running'?'an-pulse':''}`} style={{ background: task.status==='running'?t.info:task.status==='completed'?t.success:task.status==='failed'?t.danger:t.textMuted }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: t.textSecondary }}>{task.type}</p>
                <div className="flex items-center gap-2 mt-1.5"><div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: t.border }}><div className="h-full rounded-full" style={{ width: `${task.progress}%`, background: task.status==='completed'?t.success:task.status==='failed'?t.danger:t.accent }} /></div><span className="text-xs font-bold" style={{ color: t.textMuted }}>{task.progress}%</span></div>
              </div>
            </div>
          ))}
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: t.text }}><ShoppingCart size={15} style={{ color: t.accent }} /> Recent Orders</h3>
            <button onClick={() => onNavigate?.('orders')} className="text-xs font-bold flex items-center gap-1" style={{ color: t.accent }}><ExternalLink size={11} /> All</button>
          </div>
          {orders.slice(0, 6).map(o => (
            <div key={o.id} className="flex items-center justify-between py-2 px-2 rounded-lg cursor-pointer" onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}>
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: t.accentBg, color: t.accentText }}>{o.channel==='westarauto.com'?'DTC':o.channel.slice(0,3).toUpperCase()}</span>
                <span className="text-sm truncate" style={{ color: t.textSecondary }}>{o.customer}</span>
              </div>
              <span className="text-sm font-bold" style={{ color: t.text }}>${o.total.toLocaleString()}</span>
            </div>
          ))}
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: t.text }}><AlertTriangle size={15} style={{ color: t.danger }} /> Alerts</h3>
            <button onClick={() => onNavigate?.('inventory-alerts')} className="text-xs font-bold flex items-center gap-1" style={{ color: t.accent }}><ExternalLink size={11} /> All</button>
          </div>
          {inventoryAlerts.slice(0, 5).map(a => (
            <div key={a.id} className="flex items-start gap-3 py-2 px-2 rounded-lg cursor-pointer" onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}>
              <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.priority==='high'?t.danger:a.priority==='medium'?t.warning:t.info }} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate" style={{ color: t.textSecondary }}>{a.productName}</p>
                <p className="text-xs mt-0.5" style={{ color: t.textMuted }}>{a.alertType} · {a.currentStock} units</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
