import { useState, useEffect, useRef, type ReactNode } from 'react';
import {
  Search, ShoppingCart, Menu, X, Star, ChevronRight,
  Truck, Shield, Phone, ArrowRight, Heart, Share2, Check, Minus, Plus,
  Award, Zap, Package, Users, ThumbsUp,
  Mail, CreditCard, Lock, RotateCcw,
  Tag, Trash2, CheckCircle, User, EyeOff, Eye, LogIn
} from 'lucide-react';
import { products, categories, makes, years, getModelsForMake, searchProducts, IMAGES, type Product, type CartItem } from './data/store';
import CRM from './components/CRM';

/* ═══════════════════════════════════════════════════════════════════
   THEME
   ═══════════════════════════════════════════════════════════════════ */
/* Theme colors: gold accent on black */

/* ═══════════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(rating) ? 'fill-yellow-500 text-yellow-500' : 'text-neutral-600'} />
      ))}
    </div>
  );
}

function Badge({ children, color = 'gold' }: { children: ReactNode; color?: 'gold' | 'green' | 'red' | 'blue' | 'gray' }) {
  const colors = { gold: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', red: 'bg-red-500/10 text-red-400 border-red-500/20', blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20', gray: 'bg-neutral-800 text-neutral-400 border-neutral-700' };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors[color]}`}>{children}</span>;
}

function Btn({ children, variant = 'primary', className = '', onClick, size = 'md', disabled = false }: { children: ReactNode; variant?: 'primary' | 'outline' | 'ghost'; className?: string; onClick?: () => void; size?: 'sm' | 'md' | 'lg'; disabled?: boolean }) {
  const base = `inline-flex items-center justify-center gap-2 font-bold rounded-xl btn-press ${size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3.5 text-sm' : 'px-4 py-2.5 text-xs'}`;
  const variants = { primary: 'bg-yellow-500 text-black hover:bg-yellow-400', outline: 'border border-neutral-700 text-neutral-300 hover:border-yellow-500 hover:text-yellow-500', ghost: 'text-neutral-400 hover:text-white hover:bg-neutral-800' };
  return <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>{children}</button>;
}

/* ═══════════════════════════════════════════════════════════════════
   HEADER / NAVBAR with CRM Login
   ═══════════════════════════════════════════════════════════════════ */
function Header({ cartCount, onCart, onSearch, onNav, onCrmLogin }: { cartCount: number; onCart: () => void; onSearch: () => void; onNav: (p: string) => void; onCrmLogin: () => void }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState('admin@westarauto.com');
  const [password, setPassword] = useState('admin123');
  const [showPw, setShowPw] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h);
  }, []);

  const handleLogin = () => {
    setError('');
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields'); return; }
    setLoggingIn(true);
    setTimeout(() => {
      setLoggingIn(false);
      setLoginOpen(false);
      onCrmLogin();
    }, 1200);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-yellow-500 text-black text-[11px] font-bold py-1.5 text-center an-down">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1"><Truck size={13} /> FREE Shipping on Orders $50+</span>
          <span className="hidden sm:flex items-center gap-1"><Shield size={13} /> 2-Year Warranty</span>
          <span className="hidden md:flex items-center gap-1"><Phone size={13} /> 1-800-WESTAR-1</span>
        </div>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 glass shadow-2xl shadow-black/50 border-b border-neutral-800' : 'bg-neutral-950/80 glass'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => onNav('home')} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-black" />
              </div>
              <div>
                <h1 className="text-sm font-black text-white tracking-tight">WESTAR</h1>
                <p className="text-[8px] font-bold text-yellow-500 tracking-[.2em] -mt-0.5">AUTO PARTS</p>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {['Shop All', 'Air Suspension', 'Brakes', 'Shocks & Struts'].map(item => (
                <button key={item} onClick={() => onNav(item === 'Shop All' ? 'shop' : 'shop')} className="px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-yellow-500 transition-colors rounded-lg hover:bg-neutral-800/50">{item}</button>
              ))}
              <button onClick={() => onNav('shop')} className="px-3 py-2 text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors flex items-center gap-1">
                <Tag size={12} /> Sale
              </button>
            </nav>

            {/* Search + Cart + CRM Login */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={onSearch} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-all"><Search size={18} /></button>
              <button onClick={onCart} className="relative p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-all">
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-yellow-500 text-black text-[9px] font-black rounded-full flex items-center justify-center an-bounce">{cartCount}</span>}
              </button>

              {/* CRM Login Button */}
              <button onClick={() => setLoginOpen(true)} className="flex items-center gap-1.5 px-2 sm:px-3 py-2 text-neutral-400 hover:text-yellow-500 hover:bg-neutral-800/60 rounded-xl transition-all group" title="CRM Login">
                <User size={18} />
                <span className="hidden sm:inline text-xs font-bold">CRM</span>
              </button>

              <button onClick={() => setMobileMenu(true)} className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl"><Menu size={18} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[60] an-in" onClick={() => setMobileMenu(false)}>
          <div className="absolute inset-0 bg-black/70 glass" />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-neutral-950 border-l border-neutral-800 p-5 an-right" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-white">Menu</span>
              <button onClick={() => setMobileMenu(false)} className="p-1.5 hover:bg-neutral-800 rounded-lg"><X size={18} className="text-neutral-400" /></button>
            </div>
            {['Home', 'Shop All', 'Air Suspension', 'Brakes', 'Shocks & Struts', 'Sale'].map(item => (
              <button key={item} onClick={() => { onNav(item === 'Home' ? 'home' : 'shop'); setMobileMenu(false); }} className="w-full text-left px-3 py-3 text-sm font-semibold text-neutral-300 hover:text-yellow-500 hover:bg-neutral-900 rounded-xl transition-all">{item}</button>
            ))}
            {/* CRM Login in mobile menu */}
            <div className="border-t border-neutral-800 mt-4 pt-4">
              <button onClick={() => { setMobileMenu(false); setLoginOpen(true); }} className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-yellow-500 hover:bg-yellow-500/10 rounded-xl transition-all">
                <User size={18} /> CRM Dashboard Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ CRM LOGIN MODAL ═══ */}
      {loginOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 an-in" onClick={() => setLoginOpen(false)}>
          <div className="absolute inset-0 bg-black/80 glass" />
          <div className="relative w-full max-w-md an-scale" onClick={e => e.stopPropagation()}>
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl shadow-yellow-500/5">

              {/* Header */}
              <div className="relative px-8 pt-8 pb-6 text-center border-b border-neutral-800 bg-gradient-to-b from-yellow-500/5 to-transparent">
                <button onClick={() => setLoginOpen(false)} className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-xl transition-all"><X size={18} /></button>
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/20">
                  <Lock size={24} className="text-black" />
                </div>
                <h2 className="text-xl font-black text-white">CRM Dashboard</h2>
                <p className="text-sm text-neutral-500 mt-1">Sign in to manage your operations</p>
              </div>

              {/* Form */}
              <div className="px-8 py-6 space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 font-medium an-scale">{error}</div>
                )}

                <div>
                  <label className="text-xs font-bold text-neutral-400 mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="admin@westarauto.com"
                      className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-600 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-400 mb-2 block">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-600 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
                    />
                    <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-500 hover:text-neutral-300 transition-colors">
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-neutral-800 border-neutral-600 text-yellow-500 focus:ring-yellow-500/20" />
                    <span className="text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">Remember me</span>
                  </label>
                  <button className="text-xs text-yellow-500 hover:text-yellow-400 font-semibold transition-colors">Forgot password?</button>
                </div>

                <button onClick={handleLogin} disabled={loggingIn}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-xl transition-all disabled:opacity-60 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 hover:-translate-y-0.5 active:translate-y-0">
                  {loggingIn ? (
                    <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Signing in...</>
                  ) : (
                    <><LogIn size={16} /> Sign In to CRM</>
                  )}
                </button>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 border-t border-neutral-800 bg-neutral-950/50">
                <p className="text-xs text-neutral-600 text-center flex items-center justify-center gap-1.5">
                  <Lock size={10} /> Protected by 256-bit SSL encryption
                </p>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <span className="text-[10px] text-neutral-700">Cloudflare</span>
                  <span className="text-[10px] text-neutral-700">•</span>
                  <span className="text-[10px] text-neutral-700">Let's Encrypt</span>
                  <span className="text-[10px] text-neutral-700">•</span>
                  <span className="text-[10px] text-neutral-700">SOC 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   VEHICLE SEARCH
   ═══════════════════════════════════════════════════════════════════ */
function VehicleSearch({ onSearch }: { onSearch: (y?: number, m?: string, md?: string) => void }) {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const models = make ? getModelsForMake(make) : [];

  return (
    <div className="an-up d2">
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 sm:p-6 glass">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Search size={15} className="text-yellow-500" /> Find Parts for Your Vehicle</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <select value={year} onChange={e => setYear(e.target.value)} className="bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-yellow-500 focus:outline-none cursor-pointer">
            <option value="">Year</option>{years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={make} onChange={e => { setMake(e.target.value); setModel(''); }} className="bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-yellow-500 focus:outline-none cursor-pointer">
            <option value="">Make</option>{makes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={model} onChange={e => setModel(e.target.value)} className="bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-yellow-500 focus:outline-none cursor-pointer" disabled={!make}>
            <option value="">Model</option>{models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <Btn onClick={() => onSearch(year ? parseInt(year) : undefined, make || undefined, model || undefined)} variant="primary" size="md" className="w-full"><Search size={14} /> Search</Btn>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PRODUCT CARD
   ═══════════════════════════════════════════════════════════════════ */
function ProductCard({ product, onView, onAdd, delay = 0 }: { product: Product; onView: () => void; onAdd: () => void; delay?: number }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => { onAdd(); setAdded(true); setTimeout(() => setAdded(false), 1500); };

  return (
    <div className={`group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover-lift cursor-pointer an-up d${delay}`} onClick={onView}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        {product.onSale && <div className="absolute top-3 left-3"><Badge color="red">SALE</Badge></div>}
        {product.featured && <div className="absolute top-3 right-3"><Badge color="gold">⭐ FEATURED</Badge></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <button onClick={e => { e.stopPropagation(); }} className="absolute bottom-3 right-3 p-2 bg-black/60 glass rounded-full text-neutral-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
          <Heart size={14} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider">{product.brand} · {product.category}</p>
        <h3 className="text-sm font-bold text-white mt-1 line-clamp-2 group-hover:text-yellow-500 transition-colors">{product.name}</h3>
        <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">{product.shortDesc}</p>

        <div className="flex items-center gap-2 mt-2">
          <Stars rating={product.rating} size={12} />
          <span className="text-[10px] text-neutral-500">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-black text-white">${product.price}</span>
            {product.comparePrice > product.price && <span className="text-xs text-neutral-500 line-through ml-1.5">${product.comparePrice}</span>}
          </div>
          <button onClick={e => { e.stopPropagation(); handleAdd(); }} className={`px-3 py-2 rounded-xl text-xs font-bold btn-press ${added ? 'bg-emerald-500 text-white' : 'bg-yellow-500 text-black hover:bg-yellow-400'}`}>
            {added ? <><Check size={12} /> Added</> : <><ShoppingCart size={12} /> Add</>}
          </button>
        </div>

        {product.stock > 0 ? (
          <p className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1"><Check size={10} /> In Stock · {product.shippingInfo.includes('FREE') ? 'FREE Shipping' : 'Ships Fast'}</p>
        ) : (
          <p className="text-[10px] text-red-400 mt-2">Out of Stock</p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PRODUCT DETAIL PAGE
   ═══════════════════════════════════════════════════════════════════ */
function ProductDetail({ product, onBack, onAdd, onViewProduct }: { product: Product; onBack: () => void; onAdd: (id: string, qty: number) => void; onViewProduct: (id: string) => void }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'fitment' | 'reviews'>('desc');
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const handleAdd = () => { onAdd(product.id, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); };
  const relatedProducts = product.relatedIds.map(id => products.find(p => p.id === id)!).filter(Boolean);
  const savings = product.comparePrice - product.price;
  const savingsPercent = Math.round((savings / product.comparePrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-5 an-in">
        <button onClick={onBack} className="hover:text-yellow-500 transition-colors">Home</button>
        <ChevronRight size={12} />
        <span className="hover:text-yellow-500 cursor-pointer transition-colors">{product.category}</span>
        <ChevronRight size={12} />
        <span className="text-neutral-300">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="an-left">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            {product.onSale && <div className="absolute top-4 left-4"><span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">SAVE {savingsPercent}%</span></div>}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto scroll-snap pb-1">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${i === selectedImage ? 'border-yellow-500' : 'border-neutral-800 hover:border-neutral-600'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="an-right">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge color="gold">{product.brand}</Badge>
            <Badge color="gray">{product.sku}</Badge>
            {product.onSale && <Badge color="red">SALE</Badge>}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mt-3 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-3 mt-3">
            <Stars rating={product.rating} size={16} />
            <span className="text-sm text-neutral-400">{product.rating} ({product.reviewCount} reviews)</span>
            <span className="text-xs text-neutral-600">|</span>
            <span className="text-xs text-neutral-500">{product.salesCount.toLocaleString()} sold</span>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-4xl font-black text-white">${product.price}</span>
            {savings > 0 && <>
              <span className="text-xl text-neutral-500 line-through">${product.comparePrice}</span>
              <Badge color="green">Save ${savings.toFixed(2)}</Badge>
            </>}
          </div>

          <p className="text-sm text-neutral-400 mt-4 leading-relaxed">{product.shortDesc}</p>

          {/* Quantity + Add to Cart */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center border border-neutral-700 rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"><Minus size={14} /></button>
              <span className="px-4 py-2.5 text-sm font-bold text-white min-w-[40px] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"><Plus size={14} /></button>
            </div>
            <Btn onClick={handleAdd} variant="primary" size="lg" className="flex-1 sm:flex-none">
              {added ? <><CheckCircle size={16} /> Added to Cart!</> : <><ShoppingCart size={16} /> Add to Cart — ${(product.price * qty).toFixed(2)}</>}
            </Btn>
            <button onClick={() => setWishlist(!wishlist)} className={`p-3 rounded-xl border transition-all ${wishlist ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-neutral-700 text-neutral-500 hover:border-red-500 hover:text-red-400'}`}>
              <Heart size={18} className={wishlist ? 'fill-current' : ''} />
            </button>
            <button className="p-3 rounded-xl border border-neutral-700 text-neutral-500 hover:border-yellow-500 hover:text-yellow-500 transition-all">
              <Share2 size={18} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
            {[
              { icon: <Truck size={16} />, text: 'Free Shipping' },
              { icon: <Shield size={16} />, text: product.warranty },
              { icon: <RotateCcw size={16} />, text: '30-Day Returns' },
              { icon: <Lock size={16} />, text: 'Secure Checkout' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5">
                <span className="text-yellow-500">{b.icon}</span>
                <span className="text-[10px] font-bold text-neutral-400">{b.text}</span>
              </div>
            ))}
          </div>

          {/* Quick fitment check */}
          <div className="mt-5 bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5"><Check size={13} className="text-emerald-400" /> Vehicle Compatibility</h4>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {product.fitment.map((f, i) => (
                <p key={i} className="text-[11px] text-neutral-400 flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <Check size={10} className="text-emerald-400 flex-shrink-0" />
                  {f.yearStart}–{f.yearEnd} {f.make} {f.model} {f.engine || ''} {f.submodel || ''}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 an-up d4">
        <div className="flex border-b border-neutral-800 gap-1 overflow-x-auto">
          {(['desc', 'specs', 'fitment', 'reviews'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${activeTab === tab ? 'text-yellow-500 border-yellow-500' : 'text-neutral-500 border-transparent hover:text-white'}`}>
              {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specifications' : tab === 'fitment' ? `Fitment (${product.fitment.length})` : `Reviews (${product.reviewCount})`}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {activeTab === 'desc' && (
            <div className="prose prose-sm prose-invert max-w-none an-in">
              {product.description.split('\n\n').map((p, i) => <p key={i} className="text-sm text-neutral-400 leading-relaxed mb-3">{p}</p>)}
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 an-in">
              {Object.entries(product.attributes).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2.5 border-b border-neutral-800/50">
                  <span className="text-xs text-neutral-500">{k}</span>
                  <span className="text-xs font-bold text-neutral-300">{v}</span>
                </div>
              ))}
              <div className="flex items-center justify-between py-2.5 border-b border-neutral-800/50"><span className="text-xs text-neutral-500">Weight</span><span className="text-xs font-bold text-neutral-300">{product.weight} lbs</span></div>
              <div className="flex items-center justify-between py-2.5 border-b border-neutral-800/50"><span className="text-xs text-neutral-500">Dimensions</span><span className="text-xs font-bold text-neutral-300">{product.dimensions}</span></div>
              <div className="flex items-center justify-between py-2.5 border-b border-neutral-800/50"><span className="text-xs text-neutral-500">UPC</span><span className="text-xs font-bold text-neutral-300">{product.upc}</span></div>
            </div>
          )}
          {activeTab === 'fitment' && (
            <div className="overflow-x-auto an-in">
              <table className="w-full min-w-[500px]">
                <thead><tr className="border-b border-neutral-800">
                  {['Years','Make','Model','Engine','Submodel','Position'].map(h => <th key={h} className="text-left px-2 sm:px-3 py-2.5 text-[10px] font-bold text-neutral-500 uppercase">{h}</th>)}
                </tr></thead>
                <tbody>{product.fitment.map((f, i) => (
                  <tr key={i} className="border-b border-neutral-800/30 hover:bg-neutral-900 transition-colors">
                    <td className="px-3 py-2.5 text-xs font-bold text-white">{f.yearStart}–{f.yearEnd}</td>
                    <td className="px-3 py-2.5 text-xs text-neutral-300">{f.make}</td>
                    <td className="px-3 py-2.5 text-xs text-neutral-300">{f.model}</td>
                    <td className="px-3 py-2.5 text-xs text-neutral-400">{f.engine || '—'}</td>
                    <td className="px-3 py-2.5 text-xs text-neutral-400">{f.submodel || '—'}</td>
                    <td className="px-3 py-2.5 text-xs text-neutral-400">{f.position || '—'}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4 an-in">
              {/* Rating summary */}
              <div className="flex items-center gap-6 p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
                <div className="text-center">
                  <p className="text-4xl font-black text-white">{product.rating}</p>
                  <Stars rating={product.rating} size={14} />
                  <p className="text-[10px] text-neutral-500 mt-1">{product.reviewCount} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(star => {
                    const count = product.reviews.filter(r => r.rating === star).length;
                    const pct = product.reviews.length > 0 ? (count / product.reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[10px] text-neutral-500 w-3">{star}</span>
                        <Star size={10} className="text-yellow-500 fill-yellow-500" />
                        <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 rounded-full" style={{ width: `${pct}%` }} /></div>
                        <span className="text-[10px] text-neutral-500 w-6 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Individual reviews */}
              {product.reviews.map(r => (
                <div key={r.id} className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Stars rating={r.rating} size={12} />
                      <span className="text-xs font-bold text-white">{r.title}</span>
                    </div>
                    {r.verified && <Badge color="green">✓ Verified</Badge>}
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{r.body}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-neutral-500">{r.author} · {r.date}</span>
                    <button className="text-[10px] text-neutral-500 hover:text-yellow-500 flex items-center gap-1 transition-colors"><ThumbsUp size={10} /> Helpful ({r.helpful})</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 an-up d6">
          <h2 className="text-xl font-black text-white mb-5">Customers Also Bought</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProducts.map((rp, i) => (
              <ProductCard key={rp.id} product={rp} onView={() => onViewProduct(rp.id)} onAdd={() => onAdd(rp.id, 1)} delay={Math.min(i + 1, 6)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CART DRAWER
   ═══════════════════════════════════════════════════════════════════ */
function CartDrawer({ items, onClose, onUpdateQty, onRemove, onCheckout }: {
  items: (CartItem & { product: Product })[];
  onClose: () => void; onUpdateQty: (id: string, qty: number) => void; onRemove: (id: string) => void; onCheckout: () => void;
}) {
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const savings = items.reduce((s, i) => s + (i.product.comparePrice - i.product.price) * i.quantity, 0);

  return (
    <div className="fixed inset-0 z-[70] an-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 glass" />
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-neutral-950 border-l border-neutral-800 flex flex-col an-right" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2"><ShoppingCart size={16} className="text-yellow-500" /> Cart ({items.length})</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-neutral-800 rounded-lg"><X size={18} className="text-neutral-400" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && <p className="text-sm text-neutral-500 text-center py-10">Your cart is empty</p>}
          {items.map(item => (
            <div key={item.productId} className="flex gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-xl an-in">
              <img src={item.product.images[0]} alt="" className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{item.product.name}</p>
                <p className="text-[10px] text-neutral-500">{item.product.sku}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden">
                    <button onClick={() => onUpdateQty(item.productId, Math.max(1, item.quantity - 1))} className="px-2 py-1 text-neutral-400 hover:text-white hover:bg-neutral-800"><Minus size={10} /></button>
                    <span className="px-2 py-1 text-[11px] font-bold text-white">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.productId, item.quantity + 1)} className="px-2 py-1 text-neutral-400 hover:text-white hover:bg-neutral-800"><Plus size={10} /></button>
                  </div>
                  <span className="text-xs font-bold text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => onRemove(item.productId)} className="text-neutral-600 hover:text-red-400 transition-colors self-start"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-neutral-800 space-y-3">
            {savings > 0 && <div className="flex justify-between text-xs"><span className="text-emerald-400">You save</span><span className="text-emerald-400 font-bold">−${savings.toFixed(2)}</span></div>}
            <div className="flex justify-between text-xs"><span className="text-neutral-400">Shipping</span><span className="text-emerald-400 font-bold">{total >= 50 ? 'FREE' : '$7.99'}</span></div>
            <div className="flex justify-between text-sm border-t border-neutral-800 pt-3"><span className="font-bold text-white">Total</span><span className="font-black text-xl text-white">${(total + (total >= 50 ? 0 : 7.99)).toFixed(2)}</span></div>
            <Btn onClick={onCheckout} variant="primary" size="lg" className="w-full"><Lock size={14} /> Secure Checkout</Btn>
            <p className="text-[10px] text-neutral-500 text-center flex items-center justify-center gap-1"><CreditCard size={10} /> We accept all major credit cards</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SEARCH OVERLAY
   ═══════════════════════════════════════════════════════════════════ */
function SearchOverlay({ onClose, onResult }: { onClose: () => void; onResult: (q: string) => void }) {
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);

  const results = query.length >= 2 ? searchProducts(undefined, undefined, undefined, query).slice(0, 5) : [];

  return (
    <div className="fixed inset-0 z-[70] an-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 glass" />
      <div className="relative max-w-2xl mx-auto mt-20 px-4 an-down" onClick={e => e.stopPropagation()}>
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-800">
            <Search size={18} className="text-neutral-500" />
            <input ref={ref} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && query) { onResult(query); onClose(); } }}
              placeholder="Search parts, SKUs, vehicles..." className="flex-1 bg-transparent text-white text-sm outline-none placeholder-neutral-500" />
            <button onClick={onClose} className="text-neutral-500 hover:text-white"><X size={18} /></button>
          </div>
          {results.length > 0 && (
            <div className="p-2 max-h-80 overflow-y-auto">
              {results.map(p => (
                <button key={p.id} onClick={() => { onResult(p.id); onClose(); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-800 transition-all text-left">
                  <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-neutral-500">{p.sku} · {p.category}</p>
                  </div>
                  <span className="text-sm font-bold text-white">${p.price}</span>
                </button>
              ))}
            </div>
          )}
          {query.length >= 2 && results.length === 0 && <p className="p-5 text-sm text-neutral-500 text-center">No results for "{query}"</p>}
          <div className="px-5 py-3 border-t border-neutral-800 flex flex-wrap gap-2">
            <span className="text-[10px] text-neutral-600">Popular:</span>
            {['Air Spring', 'Brake Pads', 'Strut Assembly', 'Hub Bearing'].map(t => (
              <button key={t} onClick={() => { setQuery(t); }} className="text-[10px] text-neutral-400 hover:text-yellow-500 bg-neutral-800 px-2 py-0.5 rounded-full transition-colors">{t}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════════════ */
function HomePage({ onSearch, onViewProduct, onAdd, onShop }: { onSearch: (y?: number, m?: string, md?: string) => void; onViewProduct: (id: string) => void; onAdd: (id: string) => void; onShop: () => void }) {
  const featured = products.filter(p => p.featured);

  return (
    <div>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0"><img src={IMAGES.hero} alt="" className="w-full h-full object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" /><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" /></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="max-w-2xl">
            <div className="an-up">
              <Badge color="gold">🏆 #1 Rated Automotive Parts Supplier</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4 leading-[1.1] an-up d1">
              Premium Auto Parts.<br /><span className="text-gold-gradient">Factory Quality.</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 mt-4 max-w-lg an-up d2">
              Over 2,300 OE-quality suspension, brake, and drivetrain parts. Free shipping on orders over $50.
            </p>
            <div className="flex items-center gap-3 mt-6 flex-wrap an-up d3">
              <Btn onClick={onShop} variant="primary" size="lg"><Package size={16} /> Shop All Parts</Btn>
              <Btn onClick={() => document.getElementById('vehicle-search')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" size="lg"><Search size={16} /> Find My Parts</Btn>
            </div>
            <div className="flex items-center gap-6 mt-8 an-up d4">
              {[
                { icon: <Truck size={16} />, text: 'Free Shipping $50+' },
                { icon: <Shield size={16} />, text: '2-Year Warranty' },
                { icon: <RotateCcw size={16} />, text: '30-Day Returns' },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2">
                  <span className="text-yellow-500">{b.icon}</span>
                  <span className="text-xs text-neutral-400 font-semibold">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Search */}
      <div id="vehicle-search" className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 mb-12">
        <VehicleSearch onSearch={onSearch} />
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Package size={20} />, value: '2,300+', label: 'Products' },
            { icon: <Users size={20} />, value: '50,000+', label: 'Happy Customers' },
            { icon: <Star size={20} />, value: '4.8★', label: 'Average Rating' },
            { icon: <Award size={20} />, value: '10+', label: 'Years in Business' },
          ].map((s, i) => (
            <div key={s.label} className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-center hover-lift cursor-pointer an-up d${i + 1}`}>
              <div className="text-yellow-500 flex justify-center mb-2">{s.icon}</div>
              <p className="text-2xl font-black text-white an-count">{s.value}</p>
              <p className="text-xs text-neutral-500 font-semibold mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-black text-white mb-6 an-up">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((cat, i) => (
            <button key={cat.id} onClick={onShop} className={`group relative aspect-[3/2] rounded-2xl overflow-hidden hover-lift an-up d${i + 1}`}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm font-bold text-white">{cat.icon} {cat.name}</p>
                <p className="text-[10px] text-neutral-400">{cat.count} products</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-white an-up">Featured Products</h2>
          <Btn onClick={onShop} variant="outline" size="sm">View All <ArrowRight size={12} /></Btn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} onView={() => onViewProduct(p.id)} onAdd={() => onAdd(p.id)} delay={Math.min(i + 1, 8)} />
          ))}
        </div>
      </div>

      {/* Sale Banner */}
      <div className="max-w-7xl mx-auto px-4 mb-16 an-up">
        <div className="relative rounded-2xl overflow-hidden">
          <img src={IMAGES.garage} alt="" className="w-full h-48 sm:h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent flex items-center">
            <div className="p-6 sm:p-10">
              <Badge color="red">LIMITED TIME</Badge>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">Up to 40% Off</h3>
              <p className="text-sm text-neutral-400 mt-1">On all air suspension & brake components</p>
              <Btn onClick={onShop} variant="primary" size="md" className="mt-4">Shop Sale <ArrowRight size={14} /></Btn>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 mb-16 an-up">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
          <Mail size={28} className="text-yellow-500 mx-auto mb-3" />
          <h3 className="text-xl font-black text-white">Get 10% Off Your First Order</h3>
          <p className="text-sm text-neutral-400 mt-1">Subscribe for exclusive deals and new product alerts</p>
          <div className="flex max-w-md mx-auto mt-4 gap-2">
            <input placeholder="Enter your email" className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-yellow-500 focus:outline-none" />
            <Btn variant="primary">Subscribe</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SHOP PAGE
   ═══════════════════════════════════════════════════════════════════ */
function ShopPage({ results, query, onViewProduct, onAdd, onSearch }: { results: Product[]; query: string; onViewProduct: (id: string) => void; onAdd: (id: string) => void; onSearch: (y?: number, m?: string, md?: string, q?: string) => void }) {
  const [sort, setSort] = useState('popular');
  const [catFilter, setCatFilter] = useState('all');

  const cats = [...new Set(results.map(p => p.category))];
  let filtered = catFilter === 'all' ? results : results.filter(p => p.category === catFilter);
  if (sort === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else filtered = [...filtered].sort((a, b) => b.salesCount - a.salesCount);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <VehicleSearch onSearch={(y, m, md) => onSearch(y, m, md)} />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 mb-5 an-in">
        <div>
          <h1 className="text-xl font-black text-white">{query || 'All Products'}</h1>
          <p className="text-xs text-neutral-500">{filtered.length} results</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:border-yellow-500 focus:outline-none cursor-pointer">
            <option value="all">All Categories</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className="bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:border-yellow-500 focus:outline-none cursor-pointer">
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p, i) => <ProductCard key={p.id} product={p} onView={() => onViewProduct(p.id)} onAdd={() => onAdd(p.id)} delay={Math.min(i + 1, 10)} />)}
      </div>
      {filtered.length === 0 && <div className="text-center py-16"><Package size={40} className="text-neutral-700 mx-auto mb-3" /><p className="text-neutral-500">No products found. Try adjusting your search.</p></div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CHECKOUT SUCCESS
   ═══════════════════════════════════════════════════════════════════ */
function CheckoutSuccess({ onHome }: { onHome: () => void }) {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center an-scale">
      <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-5 an-glow">
        <CheckCircle size={40} className="text-emerald-400" />
      </div>
      <h1 className="text-3xl font-black text-white">Order Confirmed!</h1>
      <p className="text-neutral-400 mt-3">Thank you for your order. You'll receive a confirmation email shortly with tracking information.</p>
      <p className="text-xs text-neutral-500 mt-2">Order #WA-{Date.now().toString().slice(-6)}</p>
      <Btn onClick={onHome} variant="primary" size="lg" className="mt-6">Continue Shopping</Btn>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════ */
function Footer({ onNav }: { onNav: (p: string) => void }) {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-yellow-500 rounded-lg flex items-center justify-center"><Zap size={14} className="text-black" /></div>
              <span className="text-sm font-black text-white">WESTAR AUTO</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">Premium automotive parts manufacturer & distributor. Serving the industry since 2013.</p>
            <div className="flex gap-3 mt-4">
              {['FB', 'TW', 'IG'].map((label, i) => <button key={i} className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-[10px] font-bold text-neutral-500 hover:text-yellow-500 hover:border-yellow-500 transition-all">{label}</button>)}
            </div>
          </div>
          {[
            { title: 'Shop', items: ['All Products', 'Air Suspension', 'Brakes', 'Shocks & Struts', 'Sale'] },
            { title: 'Support', items: ['Contact Us', 'Shipping Info', 'Returns', 'Warranty', 'FAQ'] },
            { title: 'Company', items: ['About Us', 'Wholesale', 'CRM Dashboard', 'Blog', 'Privacy Policy'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">{col.title}</h4>
              <div className="space-y-2">{col.items.map(item => <button key={item} onClick={() => onNav(item === 'CRM Dashboard' ? 'crm' : 'shop')} className="block text-xs text-neutral-500 hover:text-yellow-500 transition-colors">{item}</button>)}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] text-neutral-600">© 2025 Westar Auto. All rights reserved. Powered by Cloudflare · Secured by Let's Encrypt</p>
          <div className="flex items-center gap-2 text-[10px] text-neutral-600">
            <Lock size={10} /> SSL Secured · Google Analytics · GTM Enabled
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState<'home' | 'shop' | 'product' | 'checkout-success' | 'crm'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<string | null>(null);
  const [shopResults, setShopResults] = useState<Product[]>(products);
  const [shopQuery, setShopQuery] = useState('');

  const addToCart = (id: string, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(c => c.productId === id);
      if (existing) return prev.map(c => c.productId === id ? { ...c, quantity: c.quantity + qty } : c);
      return [...prev, { productId: id, quantity: qty }];
    });
  };

  const updateQty = (id: string, qty: number) => setCart(prev => prev.map(c => c.productId === id ? { ...c, quantity: qty } : c));
  const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.productId !== id));
  const cartItems = cart.map(c => ({ ...c, product: products.find(p => p.id === c.productId)! })).filter(c => c.product);
  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  const viewProduct = (id: string) => { setCurrentProduct(id); setPage('product'); window.scrollTo(0, 0); };
  const goShop = () => { setShopResults(products); setShopQuery(''); setPage('shop'); window.scrollTo(0, 0); };

  const handleSearch = (year?: number, make?: string, model?: string, query?: string) => {
    const results = searchProducts(year, make, model, query);
    setShopResults(results);
    const parts = [year, make, model, query].filter(Boolean);
    setShopQuery(parts.length > 0 ? `Results for: ${parts.join(' ')}` : '');
    setPage('shop');
    window.scrollTo(0, 0);
  };

  const handleSearchResult = (idOrQuery: string) => {
    const p = products.find(pr => pr.id === idOrQuery);
    if (p) { viewProduct(p.id); } else { handleSearch(undefined, undefined, undefined, idOrQuery); }
  };

  const nav = (target: string) => {
    if (target === 'home') { setPage('home'); window.scrollTo(0, 0); }
    else if (target === 'shop') { goShop(); }
    else if (target === 'crm') { setPage('crm'); window.scrollTo(0, 0); }
  };

  const handleCheckout = () => { setCartOpen(false); setCart([]); setPage('checkout-success'); window.scrollTo(0, 0); };

  const product = currentProduct ? products.find(p => p.id === currentProduct) : null;

  if (page === 'crm') {
    return <CRM onBack={() => nav('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <Header cartCount={cartCount} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} onNav={nav} onCrmLogin={() => nav('crm')} />

      {page === 'home' && <HomePage onSearch={(y, m, md) => handleSearch(y, m, md)} onViewProduct={viewProduct} onAdd={id => { addToCart(id); setCartOpen(true); }} onShop={goShop} />}
      {page === 'shop' && <ShopPage results={shopResults} query={shopQuery} onViewProduct={viewProduct} onAdd={id => { addToCart(id); setCartOpen(true); }} onSearch={(y, m, md, q) => handleSearch(y, m, md, q)} />}
      {page === 'product' && product && <ProductDetail product={product} onBack={() => { setPage('shop'); window.scrollTo(0, 0); }} onAdd={addToCart} onViewProduct={viewProduct} />}
      {page === 'checkout-success' && <CheckoutSuccess onHome={() => nav('home')} />}

      <Footer onNav={nav} />

      {cartOpen && <CartDrawer items={cartItems} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={handleCheckout} />}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} onResult={handleSearchResult} />}
    </div>
  );
}
