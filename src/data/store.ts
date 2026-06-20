export interface Product {
  id: string; sku: string; name: string; slug: string; category: string; subcategory: string;
  brand: string; price: number; comparePrice: number; cost: number;
  stock: number; status: 'active' | 'draft';
  images: string[]; description: string; shortDesc: string;
  weight: number; dimensions: string; upc: string;
  fitment: Fitment[]; attributes: Record<string, string>;
  reviews: Review[]; rating: number; reviewCount: number;
  salesCount: number; featured: boolean; onSale: boolean;
  shippingInfo: string; warranty: string;
  relatedIds: string[];
  tags: string[];
}

export interface Fitment {
  yearStart: number; yearEnd: number; make: string; model: string;
  engine?: string; submodel?: string; position?: string;
}

export interface Review {
  id: string; author: string; rating: number; title: string;
  body: string; date: string; verified: boolean; helpful: number;
}

export interface CartItem {
  productId: string; quantity: number;
}

export const IMAGES = {
  hero: 'https://images.pexels.com/photos/34337558/pexels-photo-34337558.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  garage: 'https://images.pexels.com/photos/4489776/pexels-photo-4489776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  spring: 'https://images.pexels.com/photos/10912797/pexels-photo-10912797.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  suspension: 'https://images.pexels.com/photos/34277922/pexels-photo-34277922.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  brake1: 'https://images.pexels.com/photos/34277926/pexels-photo-34277926.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  brake2: 'https://images.pexels.com/photos/4022543/pexels-photo-4022543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  brake3: 'https://images.pexels.com/photos/34277923/pexels-photo-34277923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  mechanic: 'https://images.pexels.com/photos/8478256/pexels-photo-8478256.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  racecar: 'https://images.pexels.com/photos/5330289/pexels-photo-5330289.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  springBW: 'https://images.pexels.com/photos/13393008/pexels-photo-13393008.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
};

const reviews1: Review[] = [
  { id:'r1', author:'Mike J.', rating:5, title:'Perfect fit, great quality', body:'Installed on my 2008 Expedition. Ride height restored immediately. Much better than the OE part.', date:'2025-01-12', verified:true, helpful:24 },
  { id:'r2', author:'Sarah W.', rating:4, title:'Good replacement', body:'Easy install, took about 45 minutes per side. Ride quality is noticeably improved.', date:'2025-01-05', verified:true, helpful:18 },
  { id:'r3', author:'Robert C.', rating:5, title:'Excellent value', body:'At this price point, you can\'t beat it. OE quality without the dealer markup.', date:'2024-12-28', verified:true, helpful:31 },
  { id:'r4', author:'Jennifer L.', rating:3, title:'Decent but slow shipping', body:'Part quality is fine but shipping took 8 days. Expected faster.', date:'2024-12-15', verified:false, helpful:5 },
];

const reviews2: Review[] = [
  { id:'r5', author:'Tom B.', rating:5, title:'Saved me $500 vs dealer', body:'This compressor works perfectly. My Navigator rides like new again.', date:'2025-01-10', verified:true, helpful:42 },
  { id:'r6', author:'David M.', rating:5, title:'OE quality', body:'Runs quiet, maintains proper pressure. Very happy with this purchase.', date:'2025-01-02', verified:true, helpful:28 },
  { id:'r7', author:'Karen S.', rating:4, title:'Good compressor', body:'Works great after initial break-in period. Slight noise for first few minutes is normal.', date:'2024-12-20', verified:true, helpful:15 },
];

const reviews3: Review[] = [
  { id:'r8', author:'Kevin P.', rating:5, title:'Ready to bolt on', body:'No spring compressor needed! Saved hours of labor. Perfect fit for my Camry.', date:'2025-01-14', verified:true, helpful:36 },
  { id:'r9', author:'Lisa A.', rating:5, title:'Incredible value', body:'Complete assembly at this price is unbeatable. Installed in under an hour.', date:'2025-01-08', verified:true, helpful:22 },
  { id:'r10', author:'Carlos R.', rating:4, title:'Good quality strut', body:'Ride is slightly firmer than stock but in a good way. Very stable.', date:'2024-12-30', verified:true, helpful:11 },
];

export const products: Product[] = [
  {
    id:'p1', sku:'WA-AS-4228', name:'Premium Air Spring Assembly - Rear', slug:'air-spring-assembly-rear',
    category:'Air Suspension', subcategory:'Air Springs', brand:'Westar',
    price:89.99, comparePrice:149.99, cost:34, stock:234, status:'active',
    images:[IMAGES.suspension, IMAGES.spring, IMAGES.mechanic],
    description:'Premium rear air spring assembly engineered for a perfect OE fit. Features heavy-duty rubber bellows with reinforced steel end caps for superior durability. This air spring restores factory ride height, eliminates rear-end sag, and provides a smooth comfortable ride. Direct replacement for OE part number 7L1Z5A891B.\n\nIncludes all necessary mounting hardware and detailed installation instructions. Backed by our industry-leading 2-year warranty.',
    shortDesc:'Direct OE replacement rear air spring. Restores ride height & eliminates sag.',
    weight:4.2, dimensions:'12 × 8 × 8 in', upc:'812345678901',
    fitment:[
      { yearStart:2007, yearEnd:2010, make:'Ford', model:'Expedition', engine:'5.4L V8' },
      { yearStart:2007, yearEnd:2010, make:'Ford', model:'Expedition', engine:'5.4L V8', submodel:'EL' },
      { yearStart:2007, yearEnd:2009, make:'Lincoln', model:'Navigator', engine:'5.4L V8' },
      { yearStart:2007, yearEnd:2009, make:'Lincoln', model:'Navigator', engine:'5.4L V8', submodel:'L' },
    ],
    attributes:{ Position:'Rear', Material:'Rubber/Steel', Type:'Air Spring', 'OE Part':'7L1Z5A891B', Warranty:'2 Year', 'Spring Rate':'Variable' },
    reviews:reviews1, rating:4.3, reviewCount:127, salesCount:1842, featured:true, onSale:true,
    shippingInfo:'FREE shipping on orders over $50. Ships within 1-2 business days via UPS Ground.', warranty:'2-Year Limited Warranty',
    relatedIds:['p2','p3','p5'], tags:['air suspension','air spring','rear','ford expedition','lincoln navigator','ride height'],
  },
  {
    id:'p2', sku:'WA-AC-5501', name:'Air Suspension Compressor Assembly', slug:'air-suspension-compressor',
    category:'Air Suspension', subcategory:'Compressors', brand:'Westar',
    price:179.99, comparePrice:299.99, cost:68, stock:87, status:'active',
    images:[IMAGES.mechanic, IMAGES.suspension, IMAGES.racecar],
    description:'Complete air suspension compressor assembly with integrated dryer and relay. This high-output 12V compressor restores proper air suspension operation by maintaining correct system pressure. Features thermal overload protection and includes all mounting hardware.\n\nDirect plug-and-play replacement — no modifications needed. Pre-filled with proper lubricant for immediate operation.',
    shortDesc:'Complete compressor with dryer & relay. Plug-and-play replacement.',
    weight:8.5, dimensions:'10 × 6 × 7 in', upc:'812345678902',
    fitment:[
      { yearStart:2007, yearEnd:2011, make:'Ford', model:'Expedition', engine:'5.4L V8' },
      { yearStart:2007, yearEnd:2011, make:'Lincoln', model:'Navigator', engine:'5.4L V8' },
    ],
    attributes:{ Voltage:'12V', Amperage:'20A', Type:'Compressor', Includes:'Dryer, Relay, Hardware', Warranty:'2 Year' },
    reviews:reviews2, rating:4.7, reviewCount:89, salesCount:1245, featured:true, onSale:true,
    shippingInfo:'FREE shipping. Ships same day if ordered before 2PM EST.', warranty:'2-Year Limited Warranty',
    relatedIds:['p1','p3','p5'], tags:['compressor','air suspension','ford expedition','lincoln navigator'],
  },
  {
    id:'p3', sku:'WA-SA-7712', name:'Complete Front Strut Assembly', slug:'front-strut-assembly',
    category:'Shock Absorbers', subcategory:'Strut Assemblies', brand:'Westar',
    price:124.99, comparePrice:199.99, cost:47, stock:312, status:'active',
    images:[IMAGES.springBW, IMAGES.spring, IMAGES.suspension],
    description:'Ready-to-install complete front strut assembly including coil spring, strut mount, bearing plate, and boot. Eliminates the need for a spring compressor — simply unbolt the old strut and bolt on the new assembly.\n\nPrecision-tuned valving delivers optimal ride quality and handling. Pre-assembled and tested for immediate installation.',
    shortDesc:'Complete strut with spring, mount & bearing. No spring compressor needed.',
    weight:11.5, dimensions:'22 × 8 × 8 in', upc:'812345678904',
    fitment:[
      { yearStart:2012, yearEnd:2017, make:'Toyota', model:'Camry', engine:'2.5L I4' },
      { yearStart:2012, yearEnd:2017, make:'Toyota', model:'Camry', engine:'3.5L V6' },
    ],
    attributes:{ Position:'Front Left', Type:'Complete Strut', Includes:'Spring, Mount, Bearing, Boot', Warranty:'3 Year' },
    reviews:reviews3, rating:4.7, reviewCount:198, salesCount:2890, featured:true, onSale:true,
    shippingInfo:'FREE shipping. Ships within 1 business day.', warranty:'3-Year / 50,000 Mile Warranty',
    relatedIds:['p4','p7'], tags:['strut','front','toyota camry','complete assembly'],
  },
  {
    id:'p4', sku:'WA-SA-7713', name:'Rear Shock Absorber', slug:'rear-shock-absorber',
    category:'Shock Absorbers', subcategory:'Rear Shocks', brand:'Westar',
    price:49.99, comparePrice:79.99, cost:18.5, stock:445, status:'active',
    images:[IMAGES.springBW, IMAGES.racecar],
    description:'Premium rear shock absorber with precision-tuned valving for optimal ride quality. Gas-charged for consistent performance under all conditions. Direct OE replacement with no modifications required.',
    shortDesc:'Gas-charged rear shock. Precision-tuned for optimal ride.',
    weight:3.8, dimensions:'18 × 4 × 4 in', upc:'812345678905',
    fitment:[
      { yearStart:2012, yearEnd:2017, make:'Toyota', model:'Camry', engine:'2.5L I4' },
      { yearStart:2012, yearEnd:2017, make:'Toyota', model:'Camry', engine:'3.5L V6' },
    ],
    attributes:{ Position:'Rear', Type:'Shock Absorber', 'Gas Charged':'Yes', Warranty:'2 Year' },
    reviews:[{ id:'r11', author:'Amanda F.', rating:5, title:'Great shocks', body:'Smooth ride, easy install. Much better than the worn-out originals.', date:'2025-01-11', verified:true, helpful:14 }],
    rating:4.5, reviewCount:156, salesCount:2340, featured:false, onSale:true,
    shippingInfo:'FREE shipping on orders over $50.', warranty:'2-Year Warranty',
    relatedIds:['p3','p7'], tags:['shock','rear','toyota camry'],
  },
  {
    id:'p5', sku:'WA-AS-CK01', name:'Air-to-Coil Spring Conversion Kit', slug:'air-to-coil-conversion-kit',
    category:'Air Suspension', subcategory:'Conversion Kits', brand:'Westar',
    price:289.99, comparePrice:449.99, cost:110, stock:34, status:'active',
    images:[IMAGES.spring, IMAGES.suspension, IMAGES.mechanic, IMAGES.racecar],
    description:'Complete air-to-coil spring conversion kit that permanently replaces your troublesome air suspension with reliable passive coil springs and shock absorbers. Kit includes 2 coil springs, 2 shock absorbers, and all necessary mounting hardware.\n\nEliminates the need for expensive air suspension repairs. Provides a firm, controlled ride that many drivers prefer over air suspension.',
    shortDesc:'Complete conversion from air to coil springs. Eliminates air suspension issues.',
    weight:24.5, dimensions:'28 × 14 × 14 in', upc:'812345678915',
    fitment:[
      { yearStart:2003, yearEnd:2006, make:'Lincoln', model:'Navigator', engine:'5.4L V8' },
      { yearStart:2003, yearEnd:2006, make:'Ford', model:'Expedition', engine:'5.4L V8' },
    ],
    attributes:{ Type:'Conversion Kit', Includes:'2 Springs, 2 Shocks, Hardware', Warranty:'3 Year', 'Spring Type':'Progressive Rate' },
    reviews:[
      { id:'r12', author:'Brian T.', rating:5, title:'Best decision ever', body:'Tired of dealing with air suspension failures. This kit solved everything permanently. Ride is firm but comfortable.', date:'2025-01-09', verified:true, helpful:52 },
      { id:'r13', author:'Patricia D.', rating:5, title:'No more compressor worries', body:'Easy weekend install. The ride quality is actually better than the worn air suspension.', date:'2024-12-22', verified:true, helpful:38 },
    ],
    rating:4.8, reviewCount:64, salesCount:890, featured:true, onSale:true,
    shippingInfo:'FREE shipping. Ships within 1-2 business days.', warranty:'3-Year Limited Warranty',
    relatedIds:['p1','p2'], tags:['conversion kit','air to coil','lincoln navigator','ford expedition'],
  },
  {
    id:'p6', sku:'WA-BC-9902', name:'Drilled & Slotted Brake Rotor - Front', slug:'drilled-slotted-brake-rotor',
    category:'Brake Components', subcategory:'Brake Rotors', brand:'Westar',
    price:54.99, comparePrice:89.99, cost:20.5, stock:356, status:'active',
    images:[IMAGES.brake1, IMAGES.brake2, IMAGES.brake3],
    description:'High-performance drilled and slotted brake rotor with advanced heat dissipation design. The precision-drilled holes and machined slots channel away heat, gas, and water for consistent braking performance in all conditions.\n\nE-coated surface prevents corrosion and maintains a clean appearance. Meets or exceeds OE specifications.',
    shortDesc:'Performance drilled & slotted rotor. Superior heat dissipation & stopping power.',
    weight:14.2, dimensions:'13 × 13 × 1 in', upc:'812345678921',
    fitment:[
      { yearStart:2008, yearEnd:2013, make:'Nissan', model:'Altima', engine:'2.5L I4' },
      { yearStart:2008, yearEnd:2013, make:'Nissan', model:'Altima', engine:'3.5L V6' },
      { yearStart:2009, yearEnd:2014, make:'Nissan', model:'Maxima', engine:'3.5L V6' },
    ],
    attributes:{ Position:'Front', Type:'Drilled & Slotted', Material:'Cast Iron', Diameter:'12.6 in', 'E-Coated':'Yes', Warranty:'2 Year' },
    reviews:[
      { id:'r14', author:'James W.', rating:5, title:'Incredible stopping power', body:'Night and day difference from stock rotors. No more pulsing or vibration.', date:'2025-01-13', verified:true, helpful:19 },
    ],
    rating:4.6, reviewCount:178, salesCount:2560, featured:false, onSale:true,
    shippingInfo:'FREE shipping.', warranty:'2-Year / 30,000 Mile Warranty',
    relatedIds:['p7'], tags:['brake rotor','drilled','slotted','front','nissan altima','nissan maxima'],
  },
  {
    id:'p7', sku:'WA-BC-9903', name:'Ceramic Brake Pad Set - Front', slug:'ceramic-brake-pads-front',
    category:'Brake Components', subcategory:'Brake Pads', brand:'Westar',
    price:39.99, comparePrice:64.99, cost:14.5, stock:534, status:'active',
    images:[IMAGES.brake3, IMAGES.brake1],
    description:'Premium ceramic brake pad set with advanced friction formula for smooth, quiet braking. Low-dust compound keeps your wheels clean. Features chamfered edges, slotted backing plates, and OE-style shims for noise-free operation.\n\nScorched and burnished at the factory — ready to install with no bed-in period required.',
    shortDesc:'Low-dust ceramic pads. Quiet braking with factory-ready scorched surface.',
    weight:2.1, dimensions:'6 × 4 × 3 in', upc:'812345678922',
    fitment:[
      { yearStart:2008, yearEnd:2013, make:'Nissan', model:'Altima', engine:'2.5L I4' },
      { yearStart:2008, yearEnd:2013, make:'Nissan', model:'Altima', engine:'3.5L V6' },
      { yearStart:2009, yearEnd:2014, make:'Nissan', model:'Maxima', engine:'3.5L V6' },
    ],
    attributes:{ Position:'Front', Type:'Ceramic', Quantity:'4 Pads', Material:'Ceramic', Warranty:'50,000 Miles', 'Low Dust':'Yes' },
    reviews:[
      { id:'r15', author:'Nancy W.', rating:5, title:'No more brake dust!', body:'Finally, pads that keep my wheels clean. Stopping power is excellent too.', date:'2025-01-06', verified:true, helpful:27 },
      { id:'r16', author:'Marcus B.', rating:4, title:'Good pads, quiet braking', body:'Installed easily and completely eliminated the squeal from my old pads.', date:'2024-12-18', verified:true, helpful:12 },
    ],
    rating:4.7, reviewCount:267, salesCount:3890, featured:false, onSale:false,
    shippingInfo:'FREE shipping on orders over $50.', warranty:'50,000 Mile Warranty',
    relatedIds:['p6'], tags:['brake pads','ceramic','front','nissan altima','low dust'],
  },
  {
    id:'p8', sku:'WA-WB-6601', name:'Front Wheel Hub & Bearing Assembly', slug:'front-wheel-hub-bearing',
    category:'Wheel Bearings', subcategory:'Hub Assemblies', brand:'Westar',
    price:89.99, comparePrice:139.99, cost:33.5, stock:167, status:'active',
    images:[IMAGES.mechanic, IMAGES.racecar],
    description:'Premium front wheel hub and bearing assembly with integrated ABS sensor. Pre-greased and sealed for maintenance-free operation. Features 6 pre-installed wheel studs for easy installation.\n\nPrecision-ground bearings ensure smooth, quiet wheel rotation. Designed and tested to meet or exceed OE quality standards.',
    shortDesc:'Complete hub assembly with ABS sensor & pre-installed studs.',
    weight:6.3, dimensions:'8 × 8 × 6 in', upc:'812345678910',
    fitment:[
      { yearStart:2009, yearEnd:2014, make:'Ford', model:'F-150', engine:'5.0L V8', submodel:'4WD' },
      { yearStart:2009, yearEnd:2014, make:'Ford', model:'F-150', engine:'3.5L V6 EcoBoost', submodel:'4WD' },
    ],
    attributes:{ Position:'Front', Type:'Hub Assembly', ABS:'Included', Studs:'6', Warranty:'3 Year' },
    reviews:[
      { id:'r17', author:'Kevin P.', rating:5, title:'Perfect replacement', body:'Eliminated the grinding noise completely. ABS sensor plugged right in.', date:'2025-01-07', verified:true, helpful:33 },
    ],
    rating:4.5, reviewCount:145, salesCount:1670, featured:false, onSale:true,
    shippingInfo:'FREE shipping.', warranty:'3-Year / 50,000 Mile Warranty',
    relatedIds:[], tags:['wheel bearing','hub assembly','ford f-150','4wd','front'],
  },
  {
    id:'p9', sku:'WA-EM-1101', name:'Engine Mount - Front Right', slug:'engine-mount-front-right',
    category:'Engine Mounts', subcategory:'Motor Mounts', brand:'Westar',
    price:34.99, comparePrice:59.99, cost:13, stock:523, status:'active',
    images:[IMAGES.mechanic, IMAGES.spring],
    description:'Premium hydraulic engine mount designed to isolate engine vibrations and reduce NVH (noise, vibration, harshness). Features advanced rubber compound for long service life. Direct OE replacement with exact mounting points.',
    shortDesc:'Hydraulic engine mount. Reduces vibration & noise. Direct OE fit.',
    weight:2.1, dimensions:'6 × 5 × 4 in', upc:'812345678909',
    fitment:[
      { yearStart:2010, yearEnd:2015, make:'Honda', model:'Civic', engine:'1.8L I4' },
      { yearStart:2010, yearEnd:2015, make:'Honda', model:'Civic', engine:'2.0L I4', submodel:'Si' },
    ],
    attributes:{ Position:'Front Right', Type:'Hydraulic', Material:'Rubber/Steel', Warranty:'1 Year' },
    reviews:[],
    rating:4.3, reviewCount:212, salesCount:4560, featured:false, onSale:true,
    shippingInfo:'Ships FREE with any other item.', warranty:'1-Year Warranty',
    relatedIds:[], tags:['engine mount','motor mount','honda civic','vibration'],
  },
  {
    id:'p10', sku:'WA-SC-8801', name:'Outer Tie Rod End - Front', slug:'outer-tie-rod-end',
    category:'Steering', subcategory:'Tie Rod Ends', brand:'Westar',
    price:29.99, comparePrice:49.99, cost:11, stock:612, status:'active',
    images:[IMAGES.mechanic, IMAGES.racecar],
    description:'Premium outer tie rod end with precision ball-and-socket joint. Greaseable design allows periodic lubrication for maximum service life. Forged steel construction with protective dust boot.\n\nNote: Alignment recommended after installation.',
    shortDesc:'Greaseable tie rod end. Forged steel with dust boot included.',
    weight:1.4, dimensions:'8 × 3 × 3 in', upc:'812345678911',
    fitment:[
      { yearStart:2014, yearEnd:2019, make:'Chevrolet', model:'Malibu', engine:'2.5L I4' },
      { yearStart:2014, yearEnd:2019, make:'Chevrolet', model:'Malibu', engine:'2.0L Turbo' },
    ],
    attributes:{ Position:'Front Left Outer', Type:'Tie Rod End', Greaseable:'Yes', Material:'Forged Steel', Warranty:'2 Year' },
    reviews:[],
    rating:4.4, reviewCount:234, salesCount:5120, featured:false, onSale:true,
    shippingInfo:'Ships FREE with any other item.', warranty:'2-Year Warranty',
    relatedIds:[], tags:['tie rod','steering','chevrolet malibu','outer'],
  },
  {
    id:'p11', sku:'WA-EX-0101', name:'Direct-Fit Catalytic Converter', slug:'catalytic-converter-direct-fit',
    category:'Exhaust', subcategory:'Catalytic Converters', brand:'Westar',
    price:249.99, comparePrice:399.99, cost:94, stock:56, status:'active',
    images:[IMAGES.mechanic, IMAGES.racecar, IMAGES.garage],
    description:'EPA-compliant direct-fit catalytic converter with stainless steel construction. Features precision-loaded catalyst substrate for optimal emission control and long service life. Includes all gaskets, hardware, and O2 sensor ports.\n\nDesigned to clear check engine light codes related to catalyst efficiency. 5-Year / 50,000 mile warranty for peace of mind.',
    shortDesc:'EPA-compliant direct-fit cat. Stainless steel with 5-year warranty.',
    weight:12.4, dimensions:'24 × 8 × 6 in', upc:'812345678924',
    fitment:[
      { yearStart:2010, yearEnd:2016, make:'Toyota', model:'Corolla', engine:'1.8L I4' },
      { yearStart:2014, yearEnd:2018, make:'Toyota', model:'Corolla', engine:'1.8L I4', submodel:'LE/SE' },
    ],
    attributes:{ Type:'Catalytic Converter', Compliance:'EPA', Material:'Stainless Steel', 'O2 Ports':'2', Warranty:'5 Year / 50K Miles' },
    reviews:[
      { id:'r18', author:'Sandra L.', rating:5, title:'Cleared my CEL immediately', body:'Check engine light was off within 20 miles of installation. Great quality stainless steel construction.', date:'2025-01-04', verified:true, helpful:44 },
    ],
    rating:4.6, reviewCount:23, salesCount:340, featured:true, onSale:true,
    shippingInfo:'FREE shipping. Oversized item ships via FedEx Ground.', warranty:'5-Year / 50,000 Mile Warranty',
    relatedIds:[], tags:['catalytic converter','exhaust','toyota corolla','epa'],
  },
  {
    id:'p12', sku:'WA-CA-2201', name:'Lower Control Arm with Ball Joint', slug:'lower-control-arm-ball-joint',
    category:'Suspension', subcategory:'Control Arms', brand:'Westar',
    price:109.99, comparePrice:179.99, cost:41, stock:78, status:'active',
    images:[IMAGES.racecar, IMAGES.mechanic],
    description:'Complete lower control arm assembly with pre-installed ball joint and bushings. Stamped steel construction for OE-equivalent strength. Ready to install — no pressing of ball joints or bushings required.\n\nPrecision-engineered mounting points ensure proper alignment geometry.',
    shortDesc:'Complete control arm with ball joint & bushings pre-installed.',
    weight:9.2, dimensions:'24 × 8 × 6 in', upc:'812345678908',
    fitment:[
      { yearStart:2011, yearEnd:2018, make:'Chevrolet', model:'Silverado 1500', engine:'5.3L V8' },
      { yearStart:2011, yearEnd:2018, make:'GMC', model:'Sierra 1500', engine:'5.3L V8' },
    ],
    attributes:{ Position:'Front Left Lower', Type:'Control Arm Assembly', Includes:'Ball Joint, Bushings', Material:'Stamped Steel', Warranty:'2 Year' },
    reviews:[],
    rating:4.5, reviewCount:56, salesCount:780, featured:false, onSale:true,
    shippingInfo:'FREE shipping.', warranty:'2-Year Warranty',
    relatedIds:[], tags:['control arm','ball joint','chevrolet silverado','gmc sierra'],
  },
];

export const categories = [
  { id:'c1', name:'Air Suspension', icon:'💨', count:342, image: IMAGES.suspension },
  { id:'c2', name:'Shock Absorbers', icon:'⚡', count:518, image: IMAGES.springBW },
  { id:'c3', name:'Brake Components', icon:'🛑', count:421, image: IMAGES.brake1 },
  { id:'c4', name:'Wheel Bearings', icon:'🎡', count:198, image: IMAGES.mechanic },
  { id:'c5', name:'Steering', icon:'🎯', count:234, image: IMAGES.racecar },
  { id:'c6', name:'Engine Mounts', icon:'⚙️', count:156, image: IMAGES.mechanic },
  { id:'c7', name:'Suspension', icon:'🔧', count:189, image: IMAGES.spring },
  { id:'c8', name:'Exhaust', icon:'💨', count:87, image: IMAGES.garage },
];

export const makes = ['Chevrolet','Ford','GMC','Honda','Lincoln','Nissan','Toyota'];
export const years = Array.from({ length: 20 }, (_, i) => 2025 - i);

export function getModelsForMake(make: string): string[] {
  const models = new Set<string>();
  products.forEach(p => p.fitment.forEach(f => { if (f.make === make) models.add(f.model); }));
  return [...models].sort();
}

export function searchProducts(year?: number, make?: string, model?: string, query?: string, category?: string): Product[] {
  return products.filter(p => {
    if (category && p.category !== category) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q) && !p.tags.some(t => t.includes(q)) && !p.sku.toLowerCase().includes(q)) return false;
    }
    if (year || make || model) {
      const hasFit = p.fitment.some(f =>
        (!year || (year >= f.yearStart && year <= f.yearEnd)) &&
        (!make || f.make === make) &&
        (!model || f.model === model)
      );
      if (!hasFit) return false;
    }
    return true;
  });
}
