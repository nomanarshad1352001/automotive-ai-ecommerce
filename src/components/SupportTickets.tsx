import { useState } from 'react';
import { Bot, UserCheck, Clock, AlertCircle, MessageCircle, Sparkles, Send, Plus, Edit, Trash2, Save, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { supportTickets as initialTickets, type SupportTicket } from '../data/products';
import { Card, Btn, Input, Select, Modal, Badge, PageHeader, StatCard } from './ui';

const emptyTicket: Omit<SupportTicket, 'id'> = { customer: '', email: '', subject: '', category: 'fitment', status: 'open', aiConfidence: 0, date: new Date().toISOString().split('T')[0], priority: 'medium' };

export default function SupportTickets() {
  const { t } = useTheme();
  const [tickets, setTickets] = useState(initialTickets);
  const [filter, setFilter] = useState('all');
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | null>(null);
  const [editData, setEditData] = useState<Omit<SupportTicket, 'id'>>({ ...emptyTicket });
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = tickets.filter(tk => filter === 'all' || tk.status === filter);
  const detail = selectedId ? tickets.find(tk => tk.id === selectedId) : null;

  const openCreate = () => { setEditData({ ...emptyTicket }); setEditId(null); setModalMode('create'); };
  const openEdit = (tk: SupportTicket) => { const { id, ...rest } = tk; setEditData(rest); setEditId(id); setModalMode('edit'); };
  const handleSave = () => {
    if (modalMode === 'create') setTickets(prev => [{ ...editData, id: `TKT-${Date.now()}` } as SupportTicket, ...prev]);
    else if (editId) setTickets(prev => prev.map(tk => tk.id === editId ? { ...tk, ...editData } : tk));
    setModalMode(null);
  };
  const handleDelete = (id: string) => { setTickets(prev => prev.filter(tk => tk.id !== id)); setDeleteConfirm(null); setSelectedId(null); };

  return (
    <div className="space-y-5">
      <PageHeader title="AI Support Tickets" subtitle={`${tickets.length} tickets · CRUD enabled`}>
        <Btn onClick={openCreate} variant="primary"><Plus size={14} /> New Ticket</Btn>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Bot size={18} style={{ color: t.accent }} />} label="AI Resolved" value={tickets.filter(tk => tk.status === 'ai-resolved').length} delay={1} />
        <StatCard icon={<UserCheck size={18} style={{ color: t.warning }} />} label="Escalated" value={tickets.filter(tk => tk.status === 'escalated').length} delay={2} />
        <StatCard icon={<Sparkles size={18} style={{ color: t.info }} />} label="Avg Confidence" value={`${Math.round(tickets.reduce((s, tk) => s + tk.aiConfidence, 0) / tickets.length)}%`} delay={3} />
        <StatCard icon={<Clock size={18} style={{ color: t.success }} />} label="Avg Response" value="2.3m" delay={4} />
      </div>

      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-1.5 an-fade min-w-max pb-2 sm:pb-0 sm:flex-wrap">
          {['all', 'open', 'ai-resolved', 'escalated', 'waiting', 'closed'].map(f => (
            <Btn key={f} onClick={() => setFilter(f)} variant={filter === f ? 'primary' : 'ghost'} size="sm">{f === 'all' ? 'All' : f === 'ai-resolved' ? 'AI Resolved' : f.charAt(0).toUpperCase() + f.slice(1)}</Btn>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className={`${detail ? 'flex-1' : 'w-full'} space-y-2`}>
          {filtered.map(tk => (
            <Card key={tk.id} onClick={() => setSelectedId(tk.id === selectedId ? null : tk.id)}
              className={`p-3.5 ${tk.id === selectedId ? '' : ''}`}
              style={tk.id === selectedId ? { borderColor: t.accent } : {}}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: tk.status === 'ai-resolved' ? t.successBg : tk.status === 'escalated' ? t.warningBg : t.border }}>
                    {tk.status === 'ai-resolved' ? <Bot size={13} style={{ color: t.success }} /> : tk.status === 'escalated' ? <UserCheck size={13} style={{ color: t.warning }} /> : <MessageCircle size={13} style={{ color: t.textMuted }} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: t.text }}>{tk.subject}</p>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-[9px] font-mono" style={{ color: t.textMuted }}>{tk.id}</span>
                      <span style={{ color: t.textMuted }}>·</span>
                      <span className="text-[9px]" style={{ color: t.textMuted }}>{tk.customer}</span>
                      <span style={{ color: t.textMuted }}>·</span>
                      <span className="text-[9px]" style={{ color: t.textMuted }}>{tk.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Badge color={tk.category === 'fitment' ? 'info' : tk.category === 'order' ? 'accent' : tk.category === 'technical' ? 'warning' : 'default'}>{tk.category}</Badge>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-extrabold" style={{ background: tk.aiConfidence >= 80 ? t.successBg : tk.aiConfidence >= 50 ? t.warningBg : t.dangerBg, color: tk.aiConfidence >= 80 ? t.success : tk.aiConfidence >= 50 ? t.warning : t.danger }}>{tk.aiConfidence}</div>
                  <div className="flex gap-0.5" onClick={e => e.stopPropagation()}>
                    <button onClick={() => openEdit(tk)} className="p-1 rounded" style={{ color: t.accent }} onMouseEnter={e=>(e.currentTarget).style.background=t.accentBg} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Edit size={11} /></button>
                    <button onClick={() => setDeleteConfirm(tk.id)} className="p-1 rounded" style={{ color: t.danger }} onMouseEnter={e=>(e.currentTarget).style.background=t.dangerBg} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Trash2 size={11} /></button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {detail && (
          <div className="fixed inset-0 z-40 lg:static lg:z-auto lg:w-[320px] xl:w-[360px] flex-shrink-0">
            <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={() => setSelectedId(null)} />
            <div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-[360px] lg:static lg:w-auto an-slide overflow-y-auto" style={{ background: t.card }}>
            <Card className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div><span className="text-[9px] font-mono" style={{ color: t.textMuted }}>{detail.id}</span><h3 className="text-sm font-bold mt-1" style={{ color: t.text }}>{detail.subject}</h3><p className="text-[10px] mt-1" style={{ color: t.textMuted }}>{detail.customer} · {detail.email}</p></div>
                <button onClick={() => setSelectedId(null)} className="text-xs" style={{ color: t.textMuted }}>✕</button>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                <Badge color={detail.status === 'ai-resolved' ? 'success' : detail.status === 'escalated' ? 'warning' : 'info'}>{detail.status}</Badge>
                <Badge color={detail.aiConfidence >= 80 ? 'success' : detail.aiConfidence >= 50 ? 'warning' : 'danger'}>AI: {detail.aiConfidence}%</Badge>
                <Badge color={detail.priority === 'high' ? 'danger' : detail.priority === 'medium' ? 'warning' : 'default'}>{detail.priority}</Badge>
              </div>
              {detail.aiResponse && (
                <div className="rounded-xl p-3 an-scale" style={{ background: t.accentBg, border: `1px solid ${t.border}` }}>
                  <div className="flex items-center gap-1.5 mb-1.5"><Bot size={12} style={{ color: t.accent }} /><span className="text-[10px] font-bold" style={{ color: t.accent }}>AI Response</span></div>
                  <p className="text-[11px] leading-relaxed" style={{ color: t.textSecondary }}>{detail.aiResponse}</p>
                </div>
              )}
              {!detail.aiResponse && <div className="rounded-xl p-3" style={{ background: t.warningBg, border: `1px solid ${t.border}` }}><div className="flex items-center gap-1.5 mb-1"><AlertCircle size={12} style={{ color: t.warning }} /><span className="text-[10px] font-bold" style={{ color: t.warning }}>Needs Review</span></div><p className="text-[10px]" style={{ color: t.textMuted }}>AI confidence below threshold.</p></div>}
              <div className="flex gap-2 pt-2" style={{ borderTop: `1px solid ${t.border}` }}>
                <Btn variant="success" className="flex-1"><Send size={11} /> Approve</Btn>
                <Btn variant="secondary" className="flex-1"><ArrowUpRight size={11} /> Escalate</Btn>
              </div>
            </Card>
            </div>
          </div>
        )}
      </div>

      <Modal open={modalMode === 'create' || modalMode === 'edit'} onClose={() => setModalMode(null)} title={modalMode === 'create' ? 'New Ticket' : 'Edit Ticket'} width={480}>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Customer</label><Input value={editData.customer} onChange={v => setEditData(p => ({ ...p, customer: v }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Email</label><Input value={editData.email} onChange={v => setEditData(p => ({ ...p, email: v }))} /></div>
          </div>
          <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Subject</label><Input value={editData.subject} onChange={v => setEditData(p => ({ ...p, subject: v }))} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Category</label><Select value={editData.category} onChange={v => setEditData(p => ({ ...p, category: v as SupportTicket['category'] }))} options={['fitment','order','return','product-info','technical','warranty','shipping'].map(c => ({ value: c, label: c }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Status</label><Select value={editData.status} onChange={v => setEditData(p => ({ ...p, status: v as SupportTicket['status'] }))} options={['open','ai-resolved','escalated','waiting','closed'].map(s => ({ value: s, label: s }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Priority</label><Select value={editData.priority} onChange={v => setEditData(p => ({ ...p, priority: v as SupportTicket['priority'] }))} options={['high','medium','low'].map(p => ({ value: p, label: p }))} /></div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3" style={{ borderTop: `1px solid ${t.border}` }}>
            <Btn onClick={() => setModalMode(null)} variant="ghost" className="w-full sm:w-auto">Cancel</Btn>
            <Btn onClick={handleSave} variant="primary" className="w-full sm:w-auto"><Save size={12} /> {modalMode === 'create' ? 'Create' : 'Save'}</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Ticket?" width={380}>
        <p className="text-sm mb-4" style={{ color: t.textSecondary }}>This will permanently remove this ticket.</p>
        <div className="flex justify-end gap-2"><Btn onClick={() => setDeleteConfirm(null)} variant="ghost">Cancel</Btn><Btn onClick={() => deleteConfirm && handleDelete(deleteConfirm)} variant="danger"><Trash2 size={12} /> Delete</Btn></div>
      </Modal>
    </div>
  );
}
