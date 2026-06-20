import { useState } from 'react';
import { Search, Package, ArrowUpDown, Plus, Edit, Trash2, Eye, X, CheckCircle2, Copy, Save } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { products as initialProducts, categories, type Product } from '../data/products';
import { Card, Btn, Input, Select, Modal, Badge, PageHeader, ProgressBar } from './ui';

const emptyProduct: Omit<Product, 'id'> = {
  sku: '', name: '', category: 'Air Suspension', subcategory: '', brand: 'Westar', price: 0, wholesalePrice: 0, cost: 0, stock: 0, status: 'draft',
  aiScore: 50, missingFields: [], attributes: {}, fitment: [], relatedProducts: [], description: '', weight: 0, dimensions: '', upc: '', lastUpdated: new Date().toISOString().split('T')[0], salesLast30: 0, views: 0, conversionRate: 0,
};

export default function CatalogProducts() {
  const { t } = useTheme();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | null>(null);
  const [editData, setEditData] = useState<Omit<Product, 'id'>>({ ...emptyProduct });
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'price' | 'stock' | 'aiScore'>('aiScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [copiedSku, setCopiedSku] = useState<string | null>(null);

  const filtered = products.filter(p => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const mc = catFilter === 'all' || p.category === catFilter;
    const mst = statusFilter === 'all' || p.status === statusFilter;
    return ms && mc && mst;
  }).sort((a, b) => {
    const m = sortDir === 'asc' ? 1 : -1;
    if (sortField === 'name') return a.name.localeCompare(b.name) * m;
    return ((a[sortField] as number) - (b[sortField] as number)) * m;
  });

  const toggleSort = (f: typeof sortField) => { if (sortField === f) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortField(f); setSortDir('desc'); } };
  const detail = selectedId ? products.find(p => p.id === selectedId) : null;
  const openCreate = () => { setEditData({ ...emptyProduct }); setEditId(null); setModalMode('create'); };
  const openEdit = (p: Product) => { setEditData({ ...p }); setEditId(p.id); setModalMode('edit'); };
  const openView = (p: Product) => { setEditData({ ...p }); setEditId(p.id); setModalMode('view'); };
  const handleSave = () => {
    if (modalMode === 'create') { setProducts(prev => [{ ...editData as Product, id: `prod-${Date.now()}` }, ...prev]); }
    else if (modalMode === 'edit' && editId) { setProducts(prev => prev.map(p => p.id === editId ? { ...p, ...editData } : p)); }
    setModalMode(null);
  };
  const handleDelete = (id: string) => { setProducts(prev => prev.filter(p => p.id !== id)); setDeleteConfirm(null); setSelectedId(null); };

  return (
    <div className="space-y-4 sm:space-y-5">
      <PageHeader title="Product Catalog" subtitle={`${products.length} products · CRUD enabled`}>
        <Btn onClick={openCreate} variant="primary" size="md"><Plus size={14} /> <span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span></Btn>
      </PageHeader>

      {/* Filters — wrap on small screens */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 an-fade">
        <div className="relative flex-1 min-w-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: t.textMuted }} />
          <Input value={search} onChange={setSearch} placeholder="Search products, SKUs..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select value={catFilter} onChange={setCatFilter} options={[{ value: 'all', label: 'All Categories' }, ...categories.map(c => ({ value: c.name, label: `${c.name} (${c.count})` }))]} className="flex-1 sm:flex-none sm:w-auto" />
          <Select value={statusFilter} onChange={setStatusFilter} options={[{ value: 'all', label: 'All Status' }, { value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }, { value: 'discontinued', label: 'Discontinued' }]} className="flex-1 sm:flex-none sm:w-auto" />
        </div>
        <span className="text-[11px] font-bold hidden sm:inline" style={{ color: t.textMuted }}>{filtered.length} results</span>
      </div>

      {/* Table + Detail — detail becomes modal overlay on mobile */}
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1 min-w-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead><tr style={{ borderBottom: `1px solid ${t.border}` }}>
                {[
                  { key: 'name' as const, label: 'Product', align: 'left' },
                  { key: null, label: 'SKU', align: 'left' },
                  { key: 'price' as const, label: 'Price', align: 'right' },
                  { key: 'stock' as const, label: 'Stock', align: 'right' },
                  { key: 'aiScore' as const, label: 'Score', align: 'center' },
                  { key: null, label: 'Status', align: 'center' },
                  { key: null, label: '', align: 'center' },
                ].map((h, i) => (
                  <th key={i} onClick={() => h.key && toggleSort(h.key)} className={`px-2 sm:px-3 py-3 text-xs font-bold uppercase tracking-wider ${h.key ? 'cursor-pointer' : ''}`}
                    style={{ color: t.textMuted, textAlign: h.align as 'left' | 'right' | 'center' }}>
                    <span className="inline-flex items-center gap-1">{h.label}{h.key && <ArrowUpDown size={8} />}</span>
                  </th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} onClick={() => setSelectedId(p.id === selectedId ? null : p.id)}
                    className="cursor-pointer"
                    style={{ borderBottom: `1px solid ${t.border}`, background: p.id === selectedId ? t.accentBg : 'transparent' }}
                    onMouseEnter={e => { if (p.id !== selectedId) (e.currentTarget).style.background = t.tableRowHover; }}
                    onMouseLeave={e => { if (p.id !== selectedId) (e.currentTarget).style.background = 'transparent'; }}>
                    <td className="px-2 sm:px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: t.border }}><Package size={14} style={{ color: t.textMuted }} /></div>
                        <div className="min-w-0"><p className="text-sm font-bold truncate max-w-[120px] sm:max-w-[200px]" style={{ color: t.text }}>{p.name}</p><p className="text-xs truncate" style={{ color: t.textMuted }}>{p.brand}</p></div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3 py-2"><button onClick={e => { e.stopPropagation(); setCopiedSku(p.sku); setTimeout(() => setCopiedSku(null), 1200); }} className="flex items-center gap-1">
                      <span className="text-xs font-mono" style={{ color: t.textMuted }}>{p.sku}</span>{copiedSku === p.sku ? <CheckCircle2 size={11} style={{ color: t.success }} /> : <Copy size={11} style={{ color: t.textMuted }} />}
                    </button></td>
                    <td className="px-2 sm:px-3 py-2.5 text-right"><span className="text-sm font-bold" style={{ color: t.text }}>${p.price}</span></td>
                    <td className="px-2 sm:px-3 py-2.5 text-right"><span className="text-sm font-bold" style={{ color: p.stock === 0 ? t.danger : p.stock < 50 ? t.warning : t.text }}>{p.stock}</span></td>
                    <td className="px-2 sm:px-3 py-2.5"><div className="flex items-center justify-center gap-1.5"><div className="w-10 sm:w-12"><ProgressBar value={p.aiScore} color={p.aiScore >= 90 ? t.success : p.aiScore >= 75 ? t.warning : t.danger} /></div><span className="text-xs font-bold" style={{ color: p.aiScore >= 90 ? t.success : p.aiScore >= 75 ? t.warning : t.danger }}>{p.aiScore}</span></div></td>
                    <td className="px-2 sm:px-3 py-2 text-center"><Badge color={p.status === 'active' ? 'success' : p.status === 'draft' ? 'warning' : 'danger'}>{p.status}</Badge></td>
                    <td className="px-2 sm:px-3 py-2">
                      <div className="flex items-center justify-center gap-0.5" onClick={e => e.stopPropagation()}>
                        <button onClick={() => openView(p)} className="p-1 rounded-lg" style={{ color: t.textMuted }} onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Eye size={12} /></button>
                        <button onClick={() => openEdit(p)} className="p-1 rounded-lg" style={{ color: t.accent }} onMouseEnter={e=>(e.currentTarget).style.background=t.accentBg} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Edit size={12} /></button>
                        <button onClick={() => setDeleteConfirm(p.id)} className="p-1 rounded-lg" style={{ color: t.danger }} onMouseEnter={e=>(e.currentTarget).style.background=t.dangerBg} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detail Sidebar — hidden on mobile, shown as overlay or inline on lg+ */}
        {detail && (
          <div className="fixed inset-0 z-40 lg:static lg:z-auto lg:w-[320px] xl:w-[340px] flex-shrink-0">
            <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={() => setSelectedId(null)} />
            <div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-[340px] lg:static lg:w-auto an-slide overflow-y-auto" style={{ background: t.card }}>
              <Card className="p-4 space-y-4 h-full lg:max-h-[calc(100vh-180px)] overflow-y-auto border-0 lg:border rounded-none lg:rounded-2xl">
                <div className="flex items-start justify-between">
                  <div className="min-w-0"><h3 className="text-base font-bold truncate" style={{ color: t.text }}>{detail.name}</h3><p className="text-xs font-mono mt-0.5" style={{ color: t.textMuted }}>{detail.sku}</p></div>
                  <button onClick={() => setSelectedId(null)} className="p-1.5 rounded-lg flex-shrink-0" style={{ color: t.textMuted }} onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}><X size={14} /></button>
                </div>
                <div className="rounded-xl p-3" style={{ background: t.accentBg, border: `1px solid ${t.border}` }}>
                  <div className="flex items-center justify-between mb-1.5"><span className="text-xs font-bold" style={{ color: t.textSecondary }}>AI Quality</span><span className="text-xl font-extrabold" style={{ color: t.accent }}>{detail.aiScore}<span className="text-sm" style={{ color: t.textMuted }}>/100</span></span></div>
                  <ProgressBar value={detail.aiScore} color={detail.aiScore >= 90 ? t.success : detail.aiScore >= 75 ? t.warning : t.danger} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[{ l: 'Retail', v: `$${detail.price}` }, { l: 'Wholesale', v: `$${detail.wholesalePrice}` }, { l: 'Cost', v: `$${detail.cost}` }].map(x => (
                    <div key={x.l} className="rounded-lg p-2.5 text-center" style={{ background: t.border }}><p className="text-sm font-bold" style={{ color: t.text }}>{x.v}</p><p className="text-xs" style={{ color: t.textMuted }}>{x.l}</p></div>
                  ))}
                </div>
                <div><h4 className="text-xs font-bold uppercase mb-2" style={{ color: t.textMuted }}>Fitment ({detail.fitment.length})</h4>
                  <div className="space-y-0.5 max-h-28 overflow-y-auto">
                    {detail.fitment.map((f, i) => <p key={i} className="text-xs py-1 px-2 rounded" style={{ color: t.textSecondary }}>{f.year} {f.make} {f.model} {f.engine}</p>)}
                  </div>
                </div>
                <div className="flex gap-2 pt-2" style={{ borderTop: `1px solid ${t.border}` }}>
                  <Btn onClick={() => openEdit(detail)} variant="primary" className="flex-1"><Edit size={11} /> Edit</Btn>
                  <Btn onClick={() => setDeleteConfirm(detail.id)} variant="danger" className="flex-1"><Trash2 size={11} /> Delete</Btn>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal — responsive grids */}
      <Modal open={modalMode === 'create' || modalMode === 'edit'} onClose={() => setModalMode(null)} title={modalMode === 'create' ? 'Create New Product' : 'Edit Product'} width={560}>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Product Name *</label><Input value={editData.name} onChange={v => setEditData(p => ({ ...p, name: v }))} placeholder="e.g. Air Spring Assembly" /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>SKU *</label><Input value={editData.sku} onChange={v => setEditData(p => ({ ...p, sku: v }))} placeholder="e.g. WA-AS-4228" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Category</label><Select value={editData.category} onChange={v => setEditData(p => ({ ...p, category: v }))} options={categories.map(c => ({ value: c.name, label: c.name }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Status</label><Select value={editData.status} onChange={v => setEditData(p => ({ ...p, status: v as Product['status'] }))} options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }, { value: 'discontinued', label: 'Discontinued' }]} /></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Price ($)</label><Input value={editData.price.toString()} onChange={v => setEditData(p => ({ ...p, price: parseFloat(v) || 0 }))} type="number" /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Wholesale</label><Input value={editData.wholesalePrice.toString()} onChange={v => setEditData(p => ({ ...p, wholesalePrice: parseFloat(v) || 0 }))} type="number" /></div>
            <div className="col-span-2 sm:col-span-1"><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Stock</label><Input value={editData.stock.toString()} onChange={v => setEditData(p => ({ ...p, stock: parseInt(v) || 0 }))} type="number" /></div>
          </div>
          <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Description</label><textarea value={editData.description} onChange={e => setEditData(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none" style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.text }} /></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Brand</label><Input value={editData.brand} onChange={v => setEditData(p => ({ ...p, brand: v }))} /></div>
            <div><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>UPC</label><Input value={editData.upc} onChange={v => setEditData(p => ({ ...p, upc: v }))} /></div>
            <div className="col-span-2 sm:col-span-1"><label className="text-[10px] font-bold mb-1 block" style={{ color: t.textMuted }}>Weight (lbs)</label><Input value={editData.weight.toString()} onChange={v => setEditData(p => ({ ...p, weight: parseFloat(v) || 0 }))} type="number" /></div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3" style={{ borderTop: `1px solid ${t.border}` }}>
            <Btn onClick={() => setModalMode(null)} variant="ghost" className="w-full sm:w-auto">Cancel</Btn>
            <Btn onClick={handleSave} variant="primary" className="w-full sm:w-auto"><Save size={12} /> {modalMode === 'create' ? 'Create Product' : 'Save Changes'}</Btn>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal open={modalMode === 'view'} onClose={() => setModalMode(null)} title="Product Details" width={520}>
        <div className="space-y-3">
          {[
            { l: 'Name', v: editData.name }, { l: 'SKU', v: editData.sku }, { l: 'Category', v: editData.category },
            { l: 'Brand', v: editData.brand }, { l: 'Price', v: `$${editData.price}` }, { l: 'Wholesale', v: `$${editData.wholesalePrice}` },
            { l: 'Cost', v: `$${editData.cost}` }, { l: 'Stock', v: editData.stock.toString() }, { l: 'Status', v: editData.status },
            { l: 'UPC', v: editData.upc || '—' }, { l: 'Weight', v: `${editData.weight} lbs` }, { l: 'Description', v: editData.description || '—' },
          ].map(r => (
            <div key={r.l} className="flex items-start justify-between py-1.5 px-2 rounded-lg" onMouseEnter={e=>(e.currentTarget).style.background=t.border} onMouseLeave={e=>(e.currentTarget).style.background='transparent'}>
              <span className="text-[11px] font-bold flex-shrink-0 mr-3" style={{ color: t.textMuted }}>{r.l}</span>
              <span className="text-[11px] text-right break-words min-w-0" style={{ color: t.text }}>{r.v}</span>
            </div>
          ))}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3" style={{ borderTop: `1px solid ${t.border}` }}>
            <Btn onClick={() => setModalMode(null)} variant="ghost" className="w-full sm:w-auto">Close</Btn>
            <Btn onClick={() => { setModalMode('edit'); }} variant="primary" className="w-full sm:w-auto"><Edit size={12} /> Edit</Btn>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" width={400}>
        <p className="text-sm mb-4" style={{ color: t.textSecondary }}>Are you sure you want to delete this product? This action cannot be undone.</p>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
          <Btn onClick={() => setDeleteConfirm(null)} variant="ghost" className="w-full sm:w-auto">Cancel</Btn>
          <Btn onClick={() => deleteConfirm && handleDelete(deleteConfirm)} variant="danger" className="w-full sm:w-auto"><Trash2 size={12} /> Delete</Btn>
        </div>
      </Modal>
    </div>
  );
}
