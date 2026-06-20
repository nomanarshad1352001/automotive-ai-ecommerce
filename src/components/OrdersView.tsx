import { useState } from 'react';
import { ShoppingCart, Package, Truck, CheckCircle2, Clock, DollarSign, Plus, Edit, Trash2, Eye, Save, XCircle, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { orders as initialOrders, type Order } from '../data/products';
import { Card, Btn, Input, Select, Modal, Badge, PageHeader, StatCard } from './ui';

const emptyOrder: Omit<Order, 'id'> = { channel: 'westarauto.com', customer: '', email: '', total: 0, items: 1, status: 'pending', date: new Date().toISOString().split('T')[0], shippingMethod: 'UPS Ground', paymentMethod: 'Credit Card' };

export default function OrdersView() {
  const { t } = useTheme();
  const [orders, setOrders] = useState(initialOrders);
  const [channelF, setChannelF] = useState('all');
  const [statusF, setStatusF] = useState('all');
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | null>(null);
  const [editData, setEditData] = useState<Omit<Order, 'id'>>({ ...emptyOrder });
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = orders.filter(o => (channelF === 'all' || o.channel === channelF) && (statusF === 'all' || o.status === statusF));
  const totalRev = orders.reduce((s, o) => s + o.total, 0);

  const openCreate = () => { setEditData({ ...emptyOrder }); setEditId(null); setModalMode('create'); };
  const openEdit = (o: Order) => { const { id, ...rest } = o; setEditData(rest); setEditId(id); setModalMode('edit'); };
  const openView = (o: Order) => { const { id, ...rest } = o; setEditData(rest); setEditId(id); setModalMode('view'); };
  const handleSave = () => {
    if (modalMode === 'create') setOrders(prev => [{ ...editData, id: `ORD-${Date.now()}` } as Order, ...prev]);
    else if (editId) setOrders(prev => prev.map(o => o.id === editId ? { ...o, ...editData } : o));
    setModalMode(null);
  };
  const handleDelete = (id: string) => { setOrders(prev => prev.filter(o => o.id !== id)); setDeleteConfirm(null); };

  const statusIcon = (s: string) => s === 'delivered' ? <CheckCircle2 size={10} /> : s === 'shipped' ? <Truck size={10} /> : s === 'processing' ? <Package size={10} /> : s === 'cancelled' ? <XCircle size={10} /> : s === 'returned' ? <RotateCcw size={10} /> : <Clock size={10} />;
  const statusColor = (s: string): 'success' | 'info' | 'warning' | 'danger' | 'default' => s === 'delivered' ? 'success' : s === 'shipped' ? 'info' : s === 'processing' ? 'warning' : s === 'cancelled' || s === 'returned' ? 'danger' : 'default';

  return (
    <div className="space-y-5">
      <PageHeader title="Order Management" subtitle={`${orders.length} orders · Multi-channel CRUD`}>
        <Btn onClick={openCreate} variant="primary"><Plus size={14} /> New Order</Btn>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<ShoppingCart size={18} style={{ color: t.accent }} />} label="Total Orders" value={orders.length} delay={1} />
        <StatCard icon={<DollarSign size={18} style={{ color: t.success }} />} label="Total Revenue" value={`$${totalRev.toLocaleString()}`} delay={2} />
        <StatCard icon={<Clock size={18} style={{ color: t.warning }} />} label="Pending" value={orders.filter(o => o.status === 'pending' || o.status === 'processing').length} delay={3} />
        <StatCard icon={<CheckCircle2 size={18} style={{ color: t.success }} />} label="Delivered" value={orders.filter(o => o.status === 'delivered').length} delay={4} />
      </div>

      {/* Filters — scrollable on mobile */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-1.5 an-fade min-w-max pb-2 sm:pb-0 sm:flex-wrap">
          {['all', 'westarauto.com', 'wholesale', 'amazon', 'ebay', 'walmart'].map(ch => (
            <Btn key={ch} onClick={() => setChannelF(ch)} variant={channelF === ch ? 'primary' : 'ghost'} size="sm">
              {ch === 'all' ? 'All' : ch === 'westarauto.com' ? 'DTC' : ch.charAt(0).toUpperCase() + ch.slice(1)}
            </Btn>
          ))}
          <div className="w-px mx-0.5" style={{ background: t.border }} />
          {['all', 'pending', 'processing', 'shipped', 'delivered'].map(s => (
            <Btn key={s} onClick={() => setStatusF(s)} variant={statusF === s ? 'primary' : 'ghost'} size="sm">{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</Btn>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead><tr style={{ borderBottom: `1px solid ${t.border}` }}>
            {['Order ID','Channel','Customer','Items','Total','Status','Date','Actions'].map((h, i) => (
              <th key={i} className={`px-3 py-2.5 text-[10px] font-bold uppercase ${['Items','Total'].includes(h)?'text-right':h==='Status'||h==='Actions'?'text-center':'text-left'}`} style={{ color: t.textMuted }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="cursor-pointer" style={{ borderBottom: `1px solid ${t.border}` }}
                onMouseEnter={e=>(e.currentTarget).style.background=t.tableRowHover} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}>
                <td className="px-3 py-2.5"><span className="text-xs font-bold" style={{ color: t.accent }}>{o.id}</span></td>
                <td className="px-3 py-2.5"><Badge color="accent">{o.channel === 'westarauto.com' ? 'DTC' : o.channel}</Badge></td>
                <td className="px-3 py-2.5 text-xs" style={{ color: t.textSecondary }}>{o.customer}</td>
                <td className="px-3 py-2.5 text-xs text-right" style={{ color: t.textMuted }}>{o.items}</td>
                <td className="px-3 py-2.5 text-xs font-bold text-right" style={{ color: t.text }}>${o.total.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-center"><Badge color={statusColor(o.status)}>{statusIcon(o.status)} {o.status}</Badge></td>
                <td className="px-3 py-2.5 text-xs" style={{ color: t.textMuted }}>{o.date}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => openView(o)} className="p-1.5 rounded-lg" style={{ color: t.textMuted }} onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Eye size={12} /></button>
                    <button onClick={() => openEdit(o)} className="p-1.5 rounded-lg" style={{ color: t.accent }} onMouseEnter={e=>(e.currentTarget).style.background=t.accentBg} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Edit size={12} /></button>
                    <button onClick={() => setDeleteConfirm(o.id)} className="p-1.5 rounded-lg" style={{ color: t.danger }} onMouseEnter={e=>(e.currentTarget).style.background=t.dangerBg} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Card>

      <Modal open={modalMode === 'create' || modalMode === 'edit'} onClose={() => setModalMode(null)} title={modalMode === 'create' ? 'Create Order' : 'Edit Order'} width={500}>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Customer *</label><Input value={editData.customer} onChange={v => setEditData(p => ({ ...p, customer: v }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Email</label><Input value={editData.email} onChange={v => setEditData(p => ({ ...p, email: v }))} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Channel</label><Select value={editData.channel} onChange={v => setEditData(p => ({ ...p, channel: v as Order['channel'] }))} options={['westarauto.com','wholesale','amazon','ebay','walmart'].map(c => ({ value: c, label: c }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Status</label><Select value={editData.status} onChange={v => setEditData(p => ({ ...p, status: v as Order['status'] }))} options={['pending','processing','shipped','delivered','cancelled','returned'].map(s => ({ value: s, label: s }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Total ($)</label><Input value={editData.total.toString()} onChange={v => setEditData(p => ({ ...p, total: parseFloat(v) || 0 }))} type="number" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Items</label><Input value={editData.items.toString()} onChange={v => setEditData(p => ({ ...p, items: parseInt(v) || 0 }))} type="number" /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Shipping</label><Input value={editData.shippingMethod} onChange={v => setEditData(p => ({ ...p, shippingMethod: v }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Payment</label><Input value={editData.paymentMethod} onChange={v => setEditData(p => ({ ...p, paymentMethod: v }))} /></div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3" style={{ borderTop: `1px solid ${t.border}` }}>
            <Btn onClick={() => setModalMode(null)} variant="ghost" className="w-full sm:w-auto">Cancel</Btn>
            <Btn onClick={handleSave} variant="primary" className="w-full sm:w-auto"><Save size={12} /> {modalMode === 'create' ? 'Create' : 'Save'}</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={modalMode === 'view'} onClose={() => setModalMode(null)} title="Order Details">
        <div className="space-y-2">
          {[{ l: 'Customer', v: editData.customer }, { l: 'Email', v: editData.email }, { l: 'Channel', v: editData.channel }, { l: 'Total', v: `$${editData.total}` }, { l: 'Items', v: editData.items.toString() }, { l: 'Status', v: editData.status }, { l: 'Shipping', v: editData.shippingMethod }, { l: 'Payment', v: editData.paymentMethod }, { l: 'Date', v: editData.date }].map(r => (
            <div key={r.l} className="flex justify-between py-1.5 px-2 rounded-lg" onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}>
              <span className="text-[11px] font-bold" style={{ color: t.textMuted }}>{r.l}</span><span className="text-[11px]" style={{ color: t.text }}>{r.v}</span>
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-3" style={{ borderTop: `1px solid ${t.border}` }}><Btn onClick={() => setModalMode(null)} variant="ghost">Close</Btn><Btn onClick={() => setModalMode('edit')} variant="primary"><Edit size={12} /> Edit</Btn></div>
        </div>
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Order?" width={380}>
        <p className="text-sm mb-4" style={{ color: t.textSecondary }}>This will permanently remove this order.</p>
        <div className="flex justify-end gap-2"><Btn onClick={() => setDeleteConfirm(null)} variant="ghost">Cancel</Btn><Btn onClick={() => deleteConfirm && handleDelete(deleteConfirm)} variant="danger"><Trash2 size={12} /> Delete</Btn></div>
      </Modal>
    </div>
  );
}
