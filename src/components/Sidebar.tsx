import { useState } from 'react';
import { LayoutDashboard, Package, Car, Headphones, Warehouse, ShoppingCart, Settings, Cpu, ChevronDown, Zap, Globe, BarChart3, Menu, X, Palette } from 'lucide-react';
import { useTheme, themes, type ThemeName } from '../context/ThemeContext';

interface SidebarProps { activeSection: string; onNavigate: (s: string) => void; onBack?: () => void; }

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={17} /> },
  { id: 'catalog', label: 'Catalog AI', icon: <Package size={17} />, children: [
    { id: 'catalog-products', label: 'Products (CRUD)' },
    { id: 'catalog-categorization', label: 'Auto-Categorize' },
    { id: 'catalog-enrichment', label: 'Data Enrichment' },
    { id: 'catalog-quality', label: 'Quality Scanner' },
    { id: 'catalog-relationships', label: 'Relationships' },
  ]},
  { id: 'fitment', label: 'Fitment', icon: <Car size={17} />, children: [
    { id: 'fitment-database', label: 'Fitment DB' },
    { id: 'fitment-lookup', label: 'Part Finder AI' },
  ]},
  { id: 'support', label: 'AI Support', icon: <Headphones size={17} />, children: [
    { id: 'support-tickets', label: 'Tickets (CRUD)' },
  ]},
  { id: 'inventory', label: 'Inventory', icon: <Warehouse size={17} />, children: [
    { id: 'inventory-alerts', label: 'Stock Alerts (CRUD)' },
  ]},
  { id: 'orders', label: 'Orders (CRUD)', icon: <ShoppingCart size={17} /> },
  { id: 'automation', label: 'Automation', icon: <Zap size={17} />, children: [
    { id: 'automation-tasks', label: 'AI Tasks' },
    { id: 'automation-feeds', label: 'Vendor Feeds' },
  ]},
  { id: 'marketplace', label: 'Marketplaces', icon: <Globe size={17} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={17} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={17} /> },
];

export default function Sidebar({ activeSection, onNavigate, onBack }: SidebarProps) {
  const { t, themeName, setTheme } = useTheme();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ catalog: true, fitment: true, support: true, automation: true, inventory: true });
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (id: string) => activeSection === id || activeSection.startsWith(id + '-');

  return (
    <>
      <button onClick={() => setMobileOpen(!mobileOpen)} className="fixed top-3 left-3 z-50 lg:hidden p-2.5 rounded-xl"
        style={{ background: t.card, color: t.text, border: `1px solid ${t.border}` }}>
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      {mobileOpen && <div className="fixed inset-0 z-30 lg:hidden an-fade" style={{ background: t.modalOverlay }} onClick={() => setMobileOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-[230px] flex flex-col border-r transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: t.sidebar, borderColor: t.sidebarBorder }}>
        {/* Logo */}
        <div className="px-4 py-4 border-b" style={{ borderColor: t.border }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: t.accent }}>
              <Cpu size={16} style={{ color: '#000' }} />
            </div>
            <div>
              <h1 className="text-sm font-extrabold" style={{ color: t.text }}>Westar Auto</h1>
              <p className="text-[9px] font-bold tracking-[.15em] uppercase" style={{ color: t.accentText }}>AI Platform</p>
            </div>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="px-3 py-2 border-b flex items-center gap-1.5" style={{ borderColor: t.border }}>
          <Palette size={12} style={{ color: t.textMuted }} />
          {(Object.keys(themes) as ThemeName[]).map(tn => (
            <button key={tn} onClick={() => setTheme(tn)} className="flex-1 py-1.5 rounded-lg text-[10px] font-bold text-center transition-all"
              style={{ background: themeName === tn ? t.accent : t.border, color: themeName === tn ? '#000' : t.textMuted }}>
              {themes[tn].label}
            </button>
          ))}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {navItems.map(item => (
            <div key={item.id}>
              <button onClick={() => { if (item.children) { setExpanded(p => ({ ...p, [item.id]: !p[item.id] })); if (!expanded[item.id]) onNavigate(item.children[0].id); } else { onNavigate(item.id); setMobileOpen(false); } }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-semibold"
                style={{ background: isActive(item.id) ? t.accentBg : 'transparent', color: isActive(item.id) ? t.accentText : t.textSecondary }}
                onMouseEnter={e => { if (!isActive(item.id)) { (e.currentTarget).style.background = t.border; (e.currentTarget).style.color = t.text; } }}
                onMouseLeave={e => { if (!isActive(item.id)) { (e.currentTarget).style.background = 'transparent'; (e.currentTarget).style.color = t.textSecondary; } }}>
                <span style={{ color: isActive(item.id) ? t.accent : t.textMuted }}>{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.children && <ChevronDown size={12} style={{ color: t.textMuted, transform: expanded[item.id] ? '' : 'rotate(-90deg)', transition: 'transform .2s' }} />}
              </button>
              {item.children && expanded[item.id] && (
                <div className="ml-5 pl-2.5 border-l mt-0.5 mb-1 space-y-0.5 an-fade" style={{ borderColor: t.border }}>
                  {item.children.map(child => (
                    <button key={child.id} onClick={() => { onNavigate(child.id); setMobileOpen(false); }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium"
                      style={{ background: activeSection === child.id ? t.accentBg : 'transparent', color: activeSection === child.id ? t.accentText : t.textMuted }}
                      onMouseEnter={e => { if (activeSection !== child.id) (e.currentTarget).style.color = t.text; }}
                      onMouseLeave={e => { if (activeSection !== child.id) (e.currentTarget).style.color = t.textMuted; }}>
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Back to Store + Footer */}
        <div className="px-3 py-3 border-t" style={{ borderColor: t.border }}>
          {onBack && (
            <button onClick={onBack} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold mb-2 transition-all"
              style={{ color: t.accentText, background: t.accentBg }}
              onMouseEnter={e => { (e.currentTarget).style.background = t.accent; (e.currentTarget).style.color = '#000'; }}
              onMouseLeave={e => { (e.currentTarget).style.background = t.accentBg; (e.currentTarget).style.color = t.accentText; }}>
              <Globe size={13} /> Back to Storefront
            </button>
          )}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: t.accent, color: '#000' }}>WA</div>
            <div className="flex-1 min-w-0"><p className="text-[11px] font-bold truncate" style={{ color: t.text }}>Admin</p><p className="text-[9px] truncate" style={{ color: t.textMuted }}>admin@westarauto.com</p></div>
          </div>
        </div>
      </aside>
    </>
  );
}
