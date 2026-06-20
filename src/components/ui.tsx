import { useTheme } from '../context/ThemeContext';
import { X } from 'lucide-react';
import type { ReactNode, CSSProperties } from 'react';

// Themed Card
export function Card({ children, className = '', style, onClick }: { children: ReactNode; className?: string; style?: CSSProperties; onClick?: () => void }) {
  const { t } = useTheme();
  return (
    <div onClick={onClick}
      className={`rounded-2xl border an-fade ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ background: t.card, borderColor: t.cardBorder, ...style }}
      onMouseEnter={e => { if (onClick) { (e.currentTarget as HTMLElement).style.background = t.cardHover; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,.3)'; } }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = t.card; (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
    >
      {children}
    </div>
  );
}

// Stat Card
export function StatCard({ icon, label, value, change, onClick, delay = 0 }: { icon: ReactNode; label: string; value: string | number; change?: string; onClick?: () => void; delay?: number }) {
  const { t } = useTheme();
  return (
    <Card onClick={onClick} className={`p-3 sm:p-4 d${delay}`}>
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ background: t.accentBg }}>{icon}</div>
        {change && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden sm:inline-flex" style={{ background: t.successBg, color: t.success }}>{change}</span>}
      </div>
      <p className="mt-2 sm:mt-3 text-lg sm:text-2xl font-extrabold" style={{ color: t.text }}>{value}</p>
      <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 font-medium truncate" style={{ color: t.textMuted }}>{label}</p>
    </Card>
  );
}

// Themed Button
export function Btn({ children, variant = 'primary', className = '', onClick, disabled = false, size = 'md' }: {
  children: ReactNode; variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  className?: string; onClick?: () => void; disabled?: boolean; size?: 'sm' | 'md' | 'lg';
}) {
  const { t } = useTheme();
  const base = `inline-flex items-center justify-center gap-1.5 font-bold rounded-xl whitespace-nowrap ${size === 'sm' ? 'px-2.5 py-1.5 text-[11px]' : size === 'lg' ? 'px-5 py-3 text-sm' : 'px-3.5 py-2 text-xs'}`;
  const variants: Record<string, CSSProperties> = {
    primary: { background: t.accent, color: '#000' },
    secondary: { background: t.border, color: t.textSecondary },
    danger: { background: t.dangerBg, color: t.danger },
    ghost: { background: 'transparent', color: t.textSecondary, border: `1px solid ${t.border}` },
    success: { background: t.successBg, color: t.success },
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${className}`}
      style={{ ...variants[variant], opacity: disabled ? .5 : 1 }}
      onMouseEnter={e => { if (variant === 'primary') (e.currentTarget).style.background = t.accentHover; (e.currentTarget).style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { if (variant === 'primary') (e.currentTarget).style.background = t.accent; (e.currentTarget).style.transform = ''; }}
    >
      {children}
    </button>
  );
}

// Input
export function Input({ value, onChange, placeholder, className = '', type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; className?: string; type?: string;
}) {
  const { t } = useTheme();
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className={`w-full px-3 py-2 sm:py-2.5 rounded-xl text-sm outline-none ${className}`}
      style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.text }}
      onFocus={e => (e.currentTarget).style.borderColor = t.inputFocus}
      onBlur={e => (e.currentTarget).style.borderColor = t.inputBorder}
    />
  );
}

// Select
export function Select({ value, onChange, options, className = '' }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; className?: string;
}) {
  const { t } = useTheme();
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className={`w-full px-3 py-2 sm:py-2.5 rounded-xl text-sm outline-none cursor-pointer ${className}`}
      style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.text }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

// Badge
export function Badge({ children, color = 'default' }: { children: ReactNode; color?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent' }) {
  const { t } = useTheme();
  const colors: Record<string, CSSProperties> = {
    default: { background: t.border, color: t.textSecondary },
    success: { background: t.successBg, color: t.success },
    warning: { background: t.warningBg, color: t.warning },
    danger: { background: t.dangerBg, color: t.danger },
    info: { background: t.infoBg, color: t.info },
    accent: { background: t.accentBg, color: t.accentText },
  };
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 whitespace-nowrap" style={colors[color]}>{children}</span>;
}

// Modal — fully responsive
export function Modal({ open, onClose, title, children, width = 480 }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; width?: number;
}) {
  const { t } = useTheme();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: t.modalOverlay }} onClick={onClose}>
      <div className="rounded-t-2xl sm:rounded-2xl border an-scale max-h-[90vh] sm:max-h-[85vh] overflow-y-auto w-full"
        style={{ background: t.card, borderColor: t.border, maxWidth: typeof window !== 'undefined' && window.innerWidth < 640 ? '100%' : width }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 sm:p-5 border-b sticky top-0 z-10 rounded-t-2xl" style={{ borderColor: t.border, background: t.card }}>
          <h2 className="text-sm sm:text-base font-bold" style={{ color: t.text }}>{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:rotate-90 transition-all" style={{ color: t.textMuted }}
            onMouseEnter={e => (e.currentTarget).style.background = t.border} onMouseLeave={e => (e.currentTarget).style.background = 'transparent'}>
            <X size={16} />
          </button>
        </div>
        <div className="p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

// Progress Bar
export function ProgressBar({ value, color }: { value: number; color?: string }) {
  const { t } = useTheme();
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: t.border }}>
      <div className={`h-full rounded-full transition-all duration-700 ${value > 0 && value < 100 ? 'an-stripe' : ''}`}
        style={{ width: `${value}%`, background: color || t.accent }} />
    </div>
  );
}

// Page Header — responsive
export function PageHeader({ title, subtitle, children }: { title: string; subtitle: string; children?: ReactNode }) {
  const { t } = useTheme();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 an-fade">
      <div className="min-w-0">
        <h1 className="text-lg sm:text-2xl font-extrabold truncate" style={{ color: t.text }}>{title}</h1>
        <p className="text-xs sm:text-sm mt-0.5" style={{ color: t.textMuted }}>{subtitle}</p>
      </div>
      {children && <div className="flex items-center gap-2 flex-shrink-0">{children}</div>}
    </div>
  );
}
