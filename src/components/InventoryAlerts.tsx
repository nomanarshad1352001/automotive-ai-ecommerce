import { useState } from 'react';
import { AlertTriangle, Package, TrendingDown, TrendingUp, ShoppingCart, CheckCircle2, XCircle, RefreshCw, Plus, Edit, Trash2, Save } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { inventoryAlerts as initialAlerts, products, type InventoryAlert } from '../data/products';
import { Card, Btn, Input, Select, Modal, Badge, PageHeader, StatCard } from './ui';

const emptyAlert: Omit<InventoryAlert, 'id'> = { sku: '', productName: '', alertType: 'low-stock', currentStock: 0, threshold: 50, suggestedAction: '', priority: 'medium', estimatedCost: 0 };

export default function InventoryAlerts() {
  const { t } = useTheme();
  const [alerts, setAlerts] = useState(initialAlerts);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [editData, setEditData] = useState<Omit<InventoryAlert, 'id'>>({ ...emptyAlert });
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  const openCreate = () => { setEditData({ ...emptyAlert }); setEditId(null); setModalMode('create'); };
  const openEdit = (a: InventoryAlert) => { const { id, ...rest } = a; setEditData(rest); setEditId(id); setModalMode('edit'); };
  const handleSave = () => { if (modalMode === 'create') setAlerts(prev => [{ ...editData, id: `ia-${Date.now()}` } as InventoryAlert, ...prev]); else if (editId) setAlerts(prev => prev.map(a => a.id === editId ? { ...a, ...editData } : a)); setModalMode(null); };
  const handleDelete = (id: string) => { setAlerts(prev => prev.filter(a => a.id !== id)); setDeleteConfirm(null); };
  const handleResolve = (id: string) => setResolved(prev => new Set(prev).add(id));

  const oos = products.filter(p => p.stock === 0).length;
  const low = products.filter(p => p.stock > 0 && p.stock < 50).length;

  return (
    <div className="space-y-5">
      <PageHeader title="Inventory & Stock Alerts" subtitle={`${alerts.length} active alerts · CRUD enabled`}>
        <Btn onClick={openCreate} variant="primary"><Plus size={14} /> New Alert</Btn>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<XCircle size={18} style={{ color: t.danger }} />} label="Out of Stock" value={oos} delay={1} />
        <StatCard icon={<AlertTriangle size={18} style={{ color: t.warning }} />} label="Low Stock" value={low} delay={2} />
        <StatCard icon={<CheckCircle2 size={18} style={{ color: t.success }} />} label="Healthy" value={products.filter(p => p.stock >= 50).length} delay={3} />
        <StatCard icon={<ShoppingCart size={18} style={{ color: t.accent }} />} label="Inventory" value="$1.24M" delay={4} />
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`p-4 ${resolved.has(alert.id) ? 'opacity-40' : ''}`} style={alert.priority === 'high' ? { borderColor: t.danger + '44' } : {}}>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: alert.alertType === 'out-of-stock' ? t.dangerBg : alert.alertType === 'low-stock' ? t.warningBg : alert.alertType === 'overstock' ? t.infoBg : t.successBg }}>
                  {alert.alertType === 'out-of-stock' ? <XCircle size={16} style={{ color: t.danger }} /> : alert.alertType === 'low-stock' ? <TrendingDown size={16} style={{ color: t.warning }} /> : alert.alertType === 'overstock' ? <TrendingUp size={16} style={{ color: t.info }} /> : <RefreshCw size={16} style={{ color: t.success }} />}
                </div>
                <div>
                  <h3 className="text-xs font-bold flex items-center gap-2 flex-wrap" style={{ color: t.text }}>
                    {alert.productName}
                    <Badge color={alert.priority === 'high' ? 'danger' : alert.priority === 'medium' ? 'warning' : 'default'}>{alert.priority}</Badge>
                  </h3>
                  <p className="text-[10px] font-mono mt-0.5" style={{ color: t.textMuted }}>{alert.sku}</p>
                  <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
                    <span className="text-[10px]" style={{ color: t.textMuted }}>Current: <b style={{ color: alert.currentStock === 0 ? t.danger : t.text }}>{alert.currentStock}</b></span>
                    <span className="text-[10px]" style={{ color: t.textMuted }}>Threshold: <b style={{ color: t.text }}>{alert.threshold}</b></span>
                    {alert.estimatedCost > 0 && <span className="text-[10px]" style={{ color: t.textMuted }}>Est: ${alert.estimatedCost.toLocaleString()}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {!resolved.has(alert.id) && <Btn onClick={() => handleResolve(alert.id)} variant="primary" size="sm"><Package size={11} /> Resolve</Btn>}
                {resolved.has(alert.id) && <Badge color="success">✓ Resolved</Badge>}
                <button onClick={() => openEdit(alert)} className="p-1.5 rounded-lg" style={{ color: t.accent }} onMouseEnter={e=>(e.currentTarget).style.background=t.accentBg} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Edit size={12} /></button>
                <button onClick={() => setDeleteConfirm(alert.id)} className="p-1.5 rounded-lg" style={{ color: t.danger }} onMouseEnter={e=>(e.currentTarget).style.background=t.dangerBg} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Trash2 size={12} /></button>
              </div>
            </div>
            <div className="mt-2.5 rounded-lg px-3 py-2" style={{ background: t.accentBg, border: `1px solid ${t.border}` }}>
              <p className="text-[10px]" style={{ color: t.textSecondary }}>💡 {alert.suggestedAction}</p>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modalMode === 'create' || modalMode === 'edit'} onClose={() => setModalMode(null)} title={modalMode === 'create' ? 'New Alert' : 'Edit Alert'} width={480}>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Product Name</label><Input value={editData.productName} onChange={v => setEditData(p => ({ ...p, productName: v }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>SKU</label><Input value={editData.sku} onChange={v => setEditData(p => ({ ...p, sku: v }))} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Type</label><Select value={editData.alertType} onChange={v => setEditData(p => ({ ...p, alertType: v as InventoryAlert['alertType'] }))} options={['low-stock','out-of-stock','overstock','reorder','expiring','damaged'].map(a => ({ value: a, label: a }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Priority</label><Select value={editData.priority} onChange={v => setEditData(p => ({ ...p, priority: v as InventoryAlert['priority'] }))} options={['high','medium','low'].map(p => ({ value: p, label: p }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Stock</label><Input value={editData.currentStock.toString()} onChange={v => setEditData(p => ({ ...p, currentStock: parseInt(v) || 0 }))} type="number" /></div>
          </div>
          <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Suggested Action</label><Input value={editData.suggestedAction} onChange={v => setEditData(p => ({ ...p, suggestedAction: v }))} /></div>
          <div className="flex justify-end gap-2 pt-3" style={{ borderTop: `1px solid ${t.border}` }}>
            <Btn onClick={() => setModalMode(null)} variant="ghost">Cancel</Btn>
            <Btn onClick={handleSave} variant="primary"><Save size={12} /> {modalMode === 'create' ? 'Create' : 'Save'}</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Alert?" width={380}>
        <p className="text-sm mb-4" style={{ color: t.textSecondary }}>Remove this inventory alert?</p>
        <div className="flex justify-end gap-2"><Btn onClick={() => setDeleteConfirm(null)} variant="ghost">Cancel</Btn><Btn onClick={() => deleteConfirm && handleDelete(deleteConfirm)} variant="danger"><Trash2 size={12} /> Delete</Btn></div>
      </Modal>
    </div>
  );
}
