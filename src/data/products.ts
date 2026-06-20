export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  wholesalePrice: number;
  cost: number;
  stock: number;
  status: 'active' | 'draft' | 'discontinued';
  aiScore: number;
  missingFields: string[];
  attributes: Record<string, string>;
  fitment: VehicleApplication[];
  relatedProducts: string[];
  description: string;
  weight: number;
  dimensions: string;
  upc: string;
  lastUpdated: string;
  salesLast30: number;
  views: number;
  conversionRate: number;
}

export interface VehicleApplication {
  year: number;
  make: string;
  model: string;
  engine: string;
  submodel?: string;
  position?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  subcategories: string[];
  icon: string;
}

export interface VendorFeed {
  id: string;
  vendor: string;
  lastSync: string;
  nextSync: string;
  status: 'synced' | 'pending' | 'error' | 'syncing';
  itemCount: number;
  newItems: number;
  updatedItems: number;
  errorCount: number;
  format: string;
  frequency: string;
}

export interface Order {
  id: string;
  channel: 'westarauto.com' | 'wholesale' | 'amazon' | 'ebay' | 'walmart';
  customer: string;
  email: string;
  total: number;
  items: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  date: string;
  trackingNumber?: string;
  shippingMethod: string;
  paymentMethod: string;
}

export interface SupportTicket {
  id: string;
  customer: string;
  email: string;
  subject: string;
  category: 'fitment' | 'order' | 'return' | 'product-info' | 'technical' | 'warranty' | 'shipping';
  status: 'open' | 'ai-resolved' | 'escalated' | 'closed' | 'waiting';
  aiConfidence: number;
  aiResponse?: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  responseTime?: string;
}

export interface InventoryAlert {
  id: string;
  sku: string;
  productName: string;
  alertType: 'low-stock' | 'out-of-stock' | 'overstock' | 'reorder' | 'expiring' | 'damaged';
  currentStock: number;
  threshold: number;
  suggestedAction: string;
  priority: 'high' | 'medium' | 'low';
  estimatedCost: number;
  daysUntilStockout?: number;
}

export interface AITask {
  id: string;
  type: string;
  description: string;
  status: 'running' | 'completed' | 'queued' | 'failed' | 'paused';
  progress: number;
  itemsProcessed: number;
  totalItems: number;
  startedAt: string;
  completedAt?: string;
  eta?: string;
  errorMessage?: string;
  triggeredBy: string;
}

export const categories: Category[] = [
  { id: 'cat-1', name: 'Air Suspension', count: 342, subcategories: ['Air Springs', 'Compressors', 'Leveling Kits', 'Control Modules', 'Air Lines & Fittings', 'Conversion Kits', 'Solenoid Valves'], icon: '🔧' },
  { id: 'cat-2', name: 'Shock Absorbers', count: 518, subcategories: ['Front Shocks', 'Rear Shocks', 'Struts', 'Strut Assemblies', 'Mounting Hardware', 'Electronic Shocks'], icon: '⚡' },
  { id: 'cat-3', name: 'Coil Springs', count: 276, subcategories: ['Front Coil Springs', 'Rear Coil Springs', 'Lowering Springs', 'Heavy Duty Springs', 'Variable Rate Springs'], icon: '🔩' },
  { id: 'cat-4', name: 'Control Arms', count: 189, subcategories: ['Upper Control Arms', 'Lower Control Arms', 'Control Arm Assemblies', 'Bushings', 'Ball Joints'], icon: '🦾' },
  { id: 'cat-5', name: 'Steering Components', count: 234, subcategories: ['Tie Rod Ends', 'Ball Joints', 'Idler Arms', 'Pitman Arms', 'Steering Racks', 'Power Steering Pumps'], icon: '🎯' },
  { id: 'cat-6', name: 'Brake Components', count: 421, subcategories: ['Brake Pads', 'Brake Rotors', 'Calipers', 'Brake Lines', 'Master Cylinders', 'Brake Drums'], icon: '🛑' },
  { id: 'cat-7', name: 'Engine Mounts', count: 156, subcategories: ['Motor Mounts', 'Transmission Mounts', 'Torque Struts', 'Insert Mounts'], icon: '⚙️' },
  { id: 'cat-8', name: 'Wheel Bearings', count: 198, subcategories: ['Front Wheel Bearings', 'Rear Wheel Bearings', 'Hub Assemblies', 'Bearing Kits', 'Wheel Seals'], icon: '🎡' },
  { id: 'cat-9', name: 'CV Joints & Axles', count: 145, subcategories: ['CV Axles', 'CV Joint Kits', 'Boots', 'U-Joints'], icon: '🔄' },
  { id: 'cat-10', name: 'Exhaust Components', count: 87, subcategories: ['Catalytic Converters', 'Mufflers', 'Exhaust Pipes', 'Gaskets'], icon: '💨' },
];

export const products: Product[] = [
  {
    id: 'prod-001', sku: 'WA-AS-4228', name: 'Air Spring Assembly - Rear', category: 'Air Suspension', subcategory: 'Air Springs', brand: 'Westar', price: 89.99, wholesalePrice: 52.50, cost: 34.00, stock: 234, status: 'active', aiScore: 94, missingFields: [],
    attributes: { position: 'Rear', type: 'Air Spring', material: 'Rubber/Steel', warranty: '2 Year', oem: '7L1Z5A891B' },
    fitment: [
      { year: 2007, make: 'Ford', model: 'Expedition', engine: '5.4L V8', submodel: 'Eddie Bauer' },
      { year: 2008, make: 'Ford', model: 'Expedition', engine: '5.4L V8', submodel: 'XLT' },
      { year: 2009, make: 'Ford', model: 'Expedition', engine: '5.4L V8' },
      { year: 2010, make: 'Ford', model: 'Expedition', engine: '5.4L V8', submodel: 'Limited' },
      { year: 2007, make: 'Lincoln', model: 'Navigator', engine: '5.4L V8' },
      { year: 2008, make: 'Lincoln', model: 'Navigator', engine: '5.4L V8' },
      { year: 2009, make: 'Lincoln', model: 'Navigator', engine: '5.4L V8', submodel: 'L' },
    ],
    relatedProducts: ['prod-002', 'prod-003', 'prod-015'], description: 'Premium air spring assembly for rear suspension. Direct OE replacement with improved durability. Restores factory ride height and eliminates sagging.', weight: 4.2, dimensions: '12 x 8 x 8 in', upc: '812345678901', lastUpdated: '2025-01-15', salesLast30: 127, views: 3420, conversionRate: 3.7,
  },
  {
    id: 'prod-002', sku: 'WA-AC-5501', name: 'Air Suspension Compressor', category: 'Air Suspension', subcategory: 'Compressors', brand: 'Westar', price: 179.99, wholesalePrice: 105.00, cost: 68.00, stock: 87, status: 'active', aiScore: 88, missingFields: ['weight'],
    attributes: { type: 'Compressor', voltage: '12V', warranty: '2 Year', amperage: '20A' },
    fitment: [
      { year: 2007, make: 'Ford', model: 'Expedition', engine: '5.4L V8' },
      { year: 2008, make: 'Ford', model: 'Expedition', engine: '5.4L V8' },
      { year: 2009, make: 'Ford', model: 'Expedition', engine: '5.4L V8' },
      { year: 2010, make: 'Ford', model: 'Expedition', engine: '5.4L V8' },
      { year: 2011, make: 'Ford', model: 'Expedition', engine: '5.4L V8' },
    ],
    relatedProducts: ['prod-001', 'prod-003'], description: 'OE-quality air suspension compressor. Restores proper ride height and leveling functionality. Includes mounting hardware and relay.', weight: 0, dimensions: '10 x 6 x 7 in', upc: '812345678902', lastUpdated: '2025-01-14', salesLast30: 89, views: 2890, conversionRate: 3.1,
  },
  {
    id: 'prod-003', sku: 'WA-AS-4229', name: 'Air Spring Kit (Pair) - Rear', category: 'Air Suspension', subcategory: 'Air Springs', brand: 'Westar', price: 159.99, wholesalePrice: 94.00, cost: 61.00, stock: 156, status: 'active', aiScore: 91, missingFields: ['upc'],
    attributes: { position: 'Rear', type: 'Air Spring Kit', quantity: '2', material: 'Rubber/Steel', warranty: '2 Year' },
    fitment: [
      { year: 2003, make: 'Mercury', model: 'Grand Marquis', engine: '4.6L V8' },
      { year: 2004, make: 'Mercury', model: 'Grand Marquis', engine: '4.6L V8' },
      { year: 2005, make: 'Mercury', model: 'Grand Marquis', engine: '4.6L V8' },
      { year: 2003, make: 'Ford', model: 'Crown Victoria', engine: '4.6L V8' },
      { year: 2004, make: 'Ford', model: 'Crown Victoria', engine: '4.6L V8' },
      { year: 2003, make: 'Lincoln', model: 'Town Car', engine: '4.6L V8' },
      { year: 2004, make: 'Lincoln', model: 'Town Car', engine: '4.6L V8' },
    ],
    relatedProducts: ['prod-001', 'prod-002'], description: 'Complete rear air spring kit with pair of air springs. Direct OE replacement for reliable air suspension performance.', weight: 8.1, dimensions: '14 x 10 x 10 in', upc: '', lastUpdated: '2025-01-13', salesLast30: 64, views: 1980, conversionRate: 3.2,
  },
  {
    id: 'prod-004', sku: 'WA-SA-7712', name: 'Front Strut Assembly - Complete', category: 'Shock Absorbers', subcategory: 'Strut Assemblies', brand: 'Westar', price: 124.99, wholesalePrice: 73.50, cost: 47.00, stock: 312, status: 'active', aiScore: 96, missingFields: [],
    attributes: { position: 'Front Left', type: 'Complete Strut Assembly', warranty: '3 Year', includes: 'Strut, Spring, Mount, Bearing' },
    fitment: [
      { year: 2012, make: 'Toyota', model: 'Camry', engine: '2.5L I4' },
      { year: 2013, make: 'Toyota', model: 'Camry', engine: '2.5L I4' },
      { year: 2014, make: 'Toyota', model: 'Camry', engine: '2.5L I4' },
      { year: 2012, make: 'Toyota', model: 'Camry', engine: '3.5L V6' },
      { year: 2013, make: 'Toyota', model: 'Camry', engine: '3.5L V6' },
      { year: 2014, make: 'Toyota', model: 'Camry', engine: '3.5L V6' },
    ],
    relatedProducts: ['prod-005', 'prod-017'], description: 'Complete front strut assembly with coil spring, strut mount, and bearing plate. Ready to install — no spring compressor needed.', weight: 11.5, dimensions: '22 x 8 x 8 in', upc: '812345678904', lastUpdated: '2025-01-16', salesLast30: 198, views: 5670, conversionRate: 3.5,
  },
  {
    id: 'prod-005', sku: 'WA-SA-7713', name: 'Rear Shock Absorber', category: 'Shock Absorbers', subcategory: 'Rear Shocks', brand: 'Westar', price: 49.99, wholesalePrice: 29.00, cost: 18.50, stock: 445, status: 'active', aiScore: 82, missingFields: ['dimensions', 'description'],
    attributes: { position: 'Rear', type: 'Shock Absorber', warranty: '2 Year' },
    fitment: [
      { year: 2012, make: 'Toyota', model: 'Camry', engine: '2.5L I4' },
      { year: 2013, make: 'Toyota', model: 'Camry', engine: '2.5L I4' },
      { year: 2014, make: 'Toyota', model: 'Camry', engine: '2.5L I4' },
    ],
    relatedProducts: ['prod-004'], description: '', weight: 3.8, dimensions: '', upc: '812345678905', lastUpdated: '2025-01-10', salesLast30: 156, views: 4120, conversionRate: 3.8,
  },
  {
    id: 'prod-006', sku: 'WA-CS-3301', name: 'Front Coil Spring - Standard', category: 'Coil Springs', subcategory: 'Front Coil Springs', brand: 'Westar', price: 64.99, wholesalePrice: 38.00, cost: 24.00, stock: 198, status: 'active', aiScore: 75, missingFields: ['weight', 'upc', 'attributes.springRate'],
    attributes: { position: 'Front', type: 'Coil Spring', material: 'Chrome Silicon Steel' },
    fitment: [
      { year: 2015, make: 'Honda', model: 'Accord', engine: '2.4L I4' },
      { year: 2016, make: 'Honda', model: 'Accord', engine: '2.4L I4' },
      { year: 2017, make: 'Honda', model: 'Accord', engine: '2.4L I4' },
      { year: 2015, make: 'Honda', model: 'Accord', engine: '3.5L V6' },
    ],
    relatedProducts: ['prod-007'], description: 'Premium front coil spring. Precision-wound for consistent spring rate and long service life.', weight: 0, dimensions: '14 x 6 x 6 in', upc: '', lastUpdated: '2025-01-08', salesLast30: 78, views: 2340, conversionRate: 3.3,
  },
  {
    id: 'prod-007', sku: 'WA-CS-3302', name: 'Rear Coil Spring - Standard', category: 'Coil Springs', subcategory: 'Rear Coil Springs', brand: 'Westar', price: 59.99, wholesalePrice: 35.00, cost: 22.00, stock: 0, status: 'active', aiScore: 68, missingFields: ['weight', 'upc', 'description', 'attributes.springRate'],
    attributes: { position: 'Rear', type: 'Coil Spring' },
    fitment: [
      { year: 2015, make: 'Honda', model: 'Accord', engine: '2.4L I4' },
      { year: 2016, make: 'Honda', model: 'Accord', engine: '2.4L I4' },
    ],
    relatedProducts: ['prod-006'], description: '', weight: 0, dimensions: '13 x 6 x 6 in', upc: '', lastUpdated: '2025-01-05', salesLast30: 45, views: 1560, conversionRate: 2.9,
  },
  {
    id: 'prod-008', sku: 'WA-CA-2201', name: 'Lower Control Arm w/ Ball Joint', category: 'Control Arms', subcategory: 'Lower Control Arms', brand: 'Westar', price: 109.99, wholesalePrice: 64.00, cost: 41.00, stock: 78, status: 'active', aiScore: 90, missingFields: [],
    attributes: { position: 'Front Left Lower', type: 'Control Arm Assembly', includes: 'Ball Joint, Bushings', material: 'Stamped Steel' },
    fitment: [
      { year: 2011, make: 'Chevrolet', model: 'Silverado 1500', engine: '5.3L V8' },
      { year: 2012, make: 'Chevrolet', model: 'Silverado 1500', engine: '5.3L V8' },
      { year: 2013, make: 'Chevrolet', model: 'Silverado 1500', engine: '5.3L V8' },
      { year: 2011, make: 'GMC', model: 'Sierra 1500', engine: '5.3L V8' },
      { year: 2012, make: 'GMC', model: 'Sierra 1500', engine: '5.3L V8' },
      { year: 2013, make: 'GMC', model: 'Sierra 1500', engine: '5.3L V8' },
    ],
    relatedProducts: ['prod-009', 'prod-016'], description: 'Complete lower control arm assembly with ball joint and bushings pre-installed. Precision-engineered for exact OE fit.', weight: 9.2, dimensions: '24 x 8 x 6 in', upc: '812345678908', lastUpdated: '2025-01-12', salesLast30: 56, views: 1890, conversionRate: 3.0,
  },
  {
    id: 'prod-009', sku: 'WA-EM-1101', name: 'Engine Mount - Front Right', category: 'Engine Mounts', subcategory: 'Motor Mounts', brand: 'Westar', price: 34.99, wholesalePrice: 20.50, cost: 13.00, stock: 523, status: 'active', aiScore: 85, missingFields: ['dimensions'],
    attributes: { position: 'Front Right', type: 'Engine Mount', material: 'Rubber/Steel', warranty: '1 Year' },
    fitment: [
      { year: 2010, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
      { year: 2011, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
      { year: 2012, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
      { year: 2013, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
    ],
    relatedProducts: ['prod-018'], description: 'Premium engine mount for vibration-free performance. Direct OE replacement with enhanced rubber compound.', weight: 2.1, dimensions: '', upc: '812345678909', lastUpdated: '2025-01-11', salesLast30: 212, views: 5890, conversionRate: 3.6,
  },
  {
    id: 'prod-010', sku: 'WA-WB-6601', name: 'Front Wheel Hub Assembly', category: 'Wheel Bearings', subcategory: 'Hub Assemblies', brand: 'Westar', price: 89.99, wholesalePrice: 52.00, cost: 33.50, stock: 167, status: 'active', aiScore: 92, missingFields: [],
    attributes: { position: 'Front', type: 'Hub Assembly', abs: 'Yes', studs: '6', warranty: '3 Year' },
    fitment: [
      { year: 2009, make: 'Ford', model: 'F-150', engine: '5.4L V8', submodel: '4WD' },
      { year: 2010, make: 'Ford', model: 'F-150', engine: '5.4L V8', submodel: '4WD' },
      { year: 2009, make: 'Ford', model: 'F-150', engine: '4.6L V8', submodel: '4WD' },
      { year: 2010, make: 'Ford', model: 'F-150', engine: '4.6L V8', submodel: '4WD' },
      { year: 2011, make: 'Ford', model: 'F-150', engine: '5.0L V8', submodel: '4WD' },
    ],
    relatedProducts: ['prod-019'], description: 'Premium front wheel hub assembly with ABS sensor and pre-installed studs. Pre-greased bearings for easy installation.', weight: 6.3, dimensions: '8 x 8 x 6 in', upc: '812345678910', lastUpdated: '2025-01-16', salesLast30: 145, views: 4230, conversionRate: 3.4,
  },
  {
    id: 'prod-011', sku: 'WA-SC-8801', name: 'Outer Tie Rod End', category: 'Steering Components', subcategory: 'Tie Rod Ends', brand: 'Westar', price: 29.99, wholesalePrice: 17.50, cost: 11.00, stock: 612, status: 'active', aiScore: 78, missingFields: ['weight', 'attributes.threadSize'],
    attributes: { position: 'Front Left Outer', type: 'Tie Rod End', greaseable: 'Yes' },
    fitment: [
      { year: 2014, make: 'Chevrolet', model: 'Malibu', engine: '2.5L I4' },
      { year: 2015, make: 'Chevrolet', model: 'Malibu', engine: '2.5L I4' },
      { year: 2016, make: 'Chevrolet', model: 'Malibu', engine: '2.5L I4' },
      { year: 2014, make: 'Chevrolet', model: 'Malibu', engine: '2.0L Turbo' },
    ],
    relatedProducts: ['prod-020'], description: 'Premium outer tie rod end with greaseable design for extended life. Forged steel construction with protective boot.', weight: 0, dimensions: '8 x 3 x 3 in', upc: '812345678911', lastUpdated: '2025-01-09', salesLast30: 234, views: 6780, conversionRate: 3.5,
  },
  {
    id: 'prod-012', sku: 'WA-BC-9901', name: 'Front Brake Caliper - Remanufactured', category: 'Brake Components', subcategory: 'Calipers', brand: 'Westar', price: 74.99, wholesalePrice: 44.00, cost: 28.50, stock: 23, status: 'active', aiScore: 71, missingFields: ['weight', 'upc', 'attributes.pistonCount', 'description'],
    attributes: { position: 'Front Left', type: 'Brake Caliper', condition: 'Remanufactured' },
    fitment: [
      { year: 2008, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2009, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2010, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2011, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
    ],
    relatedProducts: ['prod-021'], description: '', weight: 0, dimensions: '10 x 8 x 6 in', upc: '', lastUpdated: '2025-01-07', salesLast30: 34, views: 1230, conversionRate: 2.8,
  },
  {
    id: 'prod-013', sku: 'WA-AS-4230', name: 'Air Suspension Solenoid Valve', category: 'Air Suspension', subcategory: 'Solenoid Valves', brand: 'Westar', price: 45.99, wholesalePrice: 27.00, cost: 17.50, stock: 189, status: 'active', aiScore: 87, missingFields: ['attributes.voltage'],
    attributes: { type: 'Solenoid Valve', material: 'Brass/Plastic' },
    fitment: [
      { year: 2003, make: 'Lincoln', model: 'Town Car', engine: '4.6L V8' },
      { year: 2004, make: 'Lincoln', model: 'Town Car', engine: '4.6L V8' },
      { year: 2005, make: 'Lincoln', model: 'Town Car', engine: '4.6L V8' },
      { year: 2006, make: 'Lincoln', model: 'Town Car', engine: '4.6L V8' },
    ],
    relatedProducts: ['prod-001', 'prod-002'], description: 'OE-spec air suspension solenoid valve for precise air pressure control. Controls individual air spring inflation.', weight: 0.8, dimensions: '4 x 3 x 3 in', upc: '812345678913', lastUpdated: '2025-01-14', salesLast30: 67, views: 1890, conversionRate: 3.5,
  },
  {
    id: 'prod-014', sku: 'WA-SA-7714', name: 'Electronic Shock Absorber - Rear', category: 'Shock Absorbers', subcategory: 'Electronic Shocks', brand: 'Westar', price: 199.99, wholesalePrice: 117.00, cost: 75.00, stock: 45, status: 'active', aiScore: 93, missingFields: [],
    attributes: { position: 'Rear', type: 'Electronic Shock', connector: '2-Pin', warranty: '2 Year' },
    fitment: [
      { year: 2015, make: 'Cadillac', model: 'Escalade', engine: '6.2L V8' },
      { year: 2016, make: 'Cadillac', model: 'Escalade', engine: '6.2L V8' },
      { year: 2017, make: 'Cadillac', model: 'Escalade', engine: '6.2L V8' },
      { year: 2015, make: 'Chevrolet', model: 'Tahoe', engine: '5.3L V8' },
      { year: 2016, make: 'Chevrolet', model: 'Tahoe', engine: '5.3L V8' },
    ],
    relatedProducts: ['prod-004', 'prod-005'], description: 'Premium electronic shock absorber with magnetic ride control compatibility. Plug-and-play 2-pin connector for easy installation.', weight: 5.4, dimensions: '20 x 5 x 5 in', upc: '812345678914', lastUpdated: '2025-01-15', salesLast30: 28, views: 980, conversionRate: 2.9,
  },
  {
    id: 'prod-015', sku: 'WA-AS-CK01', name: 'Air-to-Coil Conversion Kit', category: 'Air Suspension', subcategory: 'Conversion Kits', brand: 'Westar', price: 289.99, wholesalePrice: 170.00, cost: 110.00, stock: 34, status: 'active', aiScore: 95, missingFields: [],
    attributes: { type: 'Conversion Kit', includes: 'Coil Springs, Shocks, Hardware', warranty: '3 Year' },
    fitment: [
      { year: 2003, make: 'Lincoln', model: 'Navigator', engine: '5.4L V8' },
      { year: 2004, make: 'Lincoln', model: 'Navigator', engine: '5.4L V8' },
      { year: 2005, make: 'Lincoln', model: 'Navigator', engine: '5.4L V8' },
      { year: 2006, make: 'Lincoln', model: 'Navigator', engine: '5.4L V8' },
    ],
    relatedProducts: ['prod-001', 'prod-003'], description: 'Complete air-to-coil spring conversion kit. Eliminates expensive air suspension system with reliable coil springs and shocks.', weight: 24.5, dimensions: '28 x 14 x 14 in', upc: '812345678915', lastUpdated: '2025-01-16', salesLast30: 19, views: 780, conversionRate: 2.4,
  },
  {
    id: 'prod-016', sku: 'WA-CA-2202', name: 'Upper Control Arm Assembly', category: 'Control Arms', subcategory: 'Upper Control Arms', brand: 'Westar', price: 89.99, wholesalePrice: 52.50, cost: 34.00, stock: 112, status: 'active', aiScore: 89, missingFields: ['attributes.material'],
    attributes: { position: 'Front Right Upper', type: 'Control Arm Assembly', includes: 'Ball Joint, Bushings' },
    fitment: [
      { year: 2011, make: 'Chevrolet', model: 'Silverado 1500', engine: '5.3L V8' },
      { year: 2012, make: 'Chevrolet', model: 'Silverado 1500', engine: '5.3L V8' },
      { year: 2011, make: 'GMC', model: 'Sierra 1500', engine: '5.3L V8' },
      { year: 2012, make: 'GMC', model: 'Sierra 1500', engine: '5.3L V8' },
    ],
    relatedProducts: ['prod-008'], description: 'Front upper control arm assembly with pre-installed ball joint. Precision-cast for optimal alignment geometry.', weight: 6.8, dimensions: '18 x 6 x 5 in', upc: '812345678916', lastUpdated: '2025-01-13', salesLast30: 43, views: 1450, conversionRate: 3.0,
  },
  {
    id: 'prod-017', sku: 'WA-SA-7715', name: 'Front Strut Mount & Bearing Kit', category: 'Shock Absorbers', subcategory: 'Mounting Hardware', brand: 'Westar', price: 39.99, wholesalePrice: 23.50, cost: 15.00, stock: 287, status: 'active', aiScore: 86, missingFields: ['weight'],
    attributes: { position: 'Front', type: 'Strut Mount Kit', includes: 'Mount, Bearing, Hardware' },
    fitment: [
      { year: 2012, make: 'Toyota', model: 'Camry', engine: '2.5L I4' },
      { year: 2013, make: 'Toyota', model: 'Camry', engine: '2.5L I4' },
      { year: 2014, make: 'Toyota', model: 'Camry', engine: '2.5L I4' },
      { year: 2012, make: 'Toyota', model: 'Avalon', engine: '3.5L V6' },
      { year: 2013, make: 'Toyota', model: 'Avalon', engine: '3.5L V6' },
    ],
    relatedProducts: ['prod-004'], description: 'Complete strut mount and bearing kit for noise-free suspension operation. Includes all mounting hardware.', weight: 0, dimensions: '6 x 6 x 4 in', upc: '812345678917', lastUpdated: '2025-01-11', salesLast30: 98, views: 2870, conversionRate: 3.4,
  },
  {
    id: 'prod-018', sku: 'WA-EM-1102', name: 'Transmission Mount', category: 'Engine Mounts', subcategory: 'Transmission Mounts', brand: 'Westar', price: 42.99, wholesalePrice: 25.00, cost: 16.00, stock: 345, status: 'active', aiScore: 84, missingFields: ['dimensions'],
    attributes: { position: 'Rear', type: 'Transmission Mount', material: 'Rubber/Steel' },
    fitment: [
      { year: 2010, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
      { year: 2011, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
      { year: 2012, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
      { year: 2010, make: 'Honda', model: 'Civic', engine: '2.0L I4', submodel: 'Si' },
    ],
    relatedProducts: ['prod-009'], description: 'OE-replacement transmission mount. Reduces vibration and noise from drivetrain.', weight: 3.1, dimensions: '', upc: '812345678918', lastUpdated: '2025-01-10', salesLast30: 167, views: 4560, conversionRate: 3.7,
  },
  {
    id: 'prod-019', sku: 'WA-WB-6602', name: 'Rear Wheel Bearing & Hub', category: 'Wheel Bearings', subcategory: 'Rear Wheel Bearings', brand: 'Westar', price: 79.99, wholesalePrice: 46.50, cost: 30.00, stock: 203, status: 'active', aiScore: 90, missingFields: [],
    attributes: { position: 'Rear', type: 'Wheel Bearing Hub', abs: 'Yes', studs: '5', warranty: '3 Year' },
    fitment: [
      { year: 2012, make: 'Ford', model: 'Focus', engine: '2.0L I4' },
      { year: 2013, make: 'Ford', model: 'Focus', engine: '2.0L I4' },
      { year: 2014, make: 'Ford', model: 'Focus', engine: '2.0L I4' },
      { year: 2012, make: 'Ford', model: 'Focus', engine: '2.0L Turbo', submodel: 'ST' },
    ],
    relatedProducts: ['prod-010'], description: 'Premium rear wheel bearing and hub assembly with integrated ABS sensor. Sealed design for maintenance-free operation.', weight: 4.8, dimensions: '7 x 7 x 4 in', upc: '812345678919', lastUpdated: '2025-01-14', salesLast30: 112, views: 3340, conversionRate: 3.4,
  },
  {
    id: 'prod-020', sku: 'WA-SC-8802', name: 'Inner Tie Rod End', category: 'Steering Components', subcategory: 'Tie Rod Ends', brand: 'Westar', price: 34.99, wholesalePrice: 20.50, cost: 13.00, stock: 478, status: 'active', aiScore: 81, missingFields: ['weight'],
    attributes: { position: 'Front Left Inner', type: 'Tie Rod End', greaseable: 'No' },
    fitment: [
      { year: 2014, make: 'Chevrolet', model: 'Malibu', engine: '2.5L I4' },
      { year: 2015, make: 'Chevrolet', model: 'Malibu', engine: '2.5L I4' },
      { year: 2016, make: 'Chevrolet', model: 'Malibu', engine: '2.5L I4' },
    ],
    relatedProducts: ['prod-011'], description: 'Premium inner tie rod end with rack boot. Precision-ground threads for exact steering geometry.', weight: 0, dimensions: '10 x 2 x 2 in', upc: '812345678920', lastUpdated: '2025-01-09', salesLast30: 189, views: 5120, conversionRate: 3.7,
  },
  {
    id: 'prod-021', sku: 'WA-BC-9902', name: 'Front Brake Rotor - Drilled & Slotted', category: 'Brake Components', subcategory: 'Brake Rotors', brand: 'Westar', price: 54.99, wholesalePrice: 32.00, cost: 20.50, stock: 356, status: 'active', aiScore: 93, missingFields: [],
    attributes: { position: 'Front', type: 'Brake Rotor', style: 'Drilled & Slotted', material: 'Cast Iron', diameter: '12.6 in' },
    fitment: [
      { year: 2008, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2009, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2010, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2008, make: 'Nissan', model: 'Altima', engine: '3.5L V6' },
      { year: 2009, make: 'Nissan', model: 'Altima', engine: '3.5L V6' },
    ],
    relatedProducts: ['prod-012', 'prod-022'], description: 'Performance drilled and slotted brake rotor. Improved heat dissipation and wet weather braking. E-coated for corrosion resistance.', weight: 14.2, dimensions: '13 x 13 x 1 in', upc: '812345678921', lastUpdated: '2025-01-15', salesLast30: 178, views: 4890, conversionRate: 3.6,
  },
  {
    id: 'prod-022', sku: 'WA-BC-9903', name: 'Ceramic Brake Pad Set - Front', category: 'Brake Components', subcategory: 'Brake Pads', brand: 'Westar', price: 39.99, wholesalePrice: 23.00, cost: 14.50, stock: 534, status: 'active', aiScore: 97, missingFields: [],
    attributes: { position: 'Front', type: 'Brake Pads', material: 'Ceramic', quantity: '4 pads', warranty: '50,000 miles' },
    fitment: [
      { year: 2008, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2009, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2010, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2011, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2012, make: 'Nissan', model: 'Altima', engine: '2.5L I4' },
      { year: 2008, make: 'Nissan', model: 'Maxima', engine: '3.5L V6' },
    ],
    relatedProducts: ['prod-021', 'prod-012'], description: 'Premium ceramic brake pad set with chamfered edges and slotted backing plates. Low dust formula for clean wheels.', weight: 2.1, dimensions: '6 x 4 x 3 in', upc: '812345678922', lastUpdated: '2025-01-16', salesLast30: 267, views: 7340, conversionRate: 3.6,
  },
  {
    id: 'prod-023', sku: 'WA-CV-1201', name: 'Front CV Axle Assembly', category: 'CV Joints & Axles', subcategory: 'CV Axles', brand: 'Westar', price: 84.99, wholesalePrice: 49.50, cost: 32.00, stock: 134, status: 'active', aiScore: 88, missingFields: ['attributes.splineCount'],
    attributes: { position: 'Front Left', type: 'CV Axle', warranty: '2 Year' },
    fitment: [
      { year: 2012, make: 'Honda', model: 'CR-V', engine: '2.4L I4' },
      { year: 2013, make: 'Honda', model: 'CR-V', engine: '2.4L I4' },
      { year: 2014, make: 'Honda', model: 'CR-V', engine: '2.4L I4' },
    ],
    relatedProducts: [], description: 'New CV axle assembly with precision-ground joints. Includes new boots, clamps, and grease. Ready to install.', weight: 7.8, dimensions: '32 x 4 x 4 in', upc: '812345678923', lastUpdated: '2025-01-13', salesLast30: 89, views: 2670, conversionRate: 3.3,
  },
  {
    id: 'prod-024', sku: 'WA-EX-0101', name: 'Catalytic Converter - Direct Fit', category: 'Exhaust Components', subcategory: 'Catalytic Converters', brand: 'Westar', price: 249.99, wholesalePrice: 146.00, cost: 94.00, stock: 56, status: 'active', aiScore: 91, missingFields: [],
    attributes: { type: 'Catalytic Converter', compliance: 'EPA', material: 'Stainless Steel', warranty: '5 Year/50K Miles' },
    fitment: [
      { year: 2010, make: 'Toyota', model: 'Corolla', engine: '1.8L I4' },
      { year: 2011, make: 'Toyota', model: 'Corolla', engine: '1.8L I4' },
      { year: 2012, make: 'Toyota', model: 'Corolla', engine: '1.8L I4' },
      { year: 2013, make: 'Toyota', model: 'Corolla', engine: '1.8L I4' },
    ],
    relatedProducts: [], description: 'EPA-compliant direct-fit catalytic converter. Stainless steel construction with precision-loaded catalyst for optimal performance.', weight: 12.4, dimensions: '24 x 8 x 6 in', upc: '812345678924', lastUpdated: '2025-01-16', salesLast30: 23, views: 890, conversionRate: 2.6,
  },
  {
    id: 'prod-025', sku: 'WA-CS-3303', name: 'Heavy Duty Coil Spring Set', category: 'Coil Springs', subcategory: 'Heavy Duty Springs', brand: 'Westar', price: 149.99, wholesalePrice: 88.00, cost: 56.50, stock: 67, status: 'draft', aiScore: 62, missingFields: ['upc', 'description', 'weight', 'attributes.loadRating'],
    attributes: { position: 'Rear', type: 'Heavy Duty Coil Spring', quantity: '2' },
    fitment: [
      { year: 2014, make: 'Ram', model: '1500', engine: '5.7L V8' },
      { year: 2015, make: 'Ram', model: '1500', engine: '5.7L V8' },
      { year: 2016, make: 'Ram', model: '1500', engine: '5.7L V8' },
    ],
    relatedProducts: [], description: '', weight: 0, dimensions: '16 x 12 x 12 in', upc: '', lastUpdated: '2025-01-04', salesLast30: 0, views: 340, conversionRate: 0,
  },
  {
    id: 'prod-026', sku: 'WA-SC-8803', name: 'Power Steering Pump', category: 'Steering Components', subcategory: 'Power Steering Pumps', brand: 'Westar', price: 119.99, wholesalePrice: 70.00, cost: 45.00, stock: 89, status: 'active', aiScore: 86, missingFields: ['weight'],
    attributes: { type: 'Power Steering Pump', condition: 'New', reservoir: 'Included', warranty: '2 Year' },
    fitment: [
      { year: 2005, make: 'Chevrolet', model: 'Impala', engine: '3.8L V6' },
      { year: 2006, make: 'Chevrolet', model: 'Impala', engine: '3.8L V6' },
      { year: 2007, make: 'Chevrolet', model: 'Impala', engine: '3.8L V6' },
      { year: 2005, make: 'Buick', model: 'LaCrosse', engine: '3.8L V6' },
    ],
    relatedProducts: ['prod-011'], description: 'New power steering pump with integrated reservoir. Delivers consistent hydraulic pressure for smooth steering.', weight: 0, dimensions: '8 x 6 x 6 in', upc: '812345678926', lastUpdated: '2025-01-12', salesLast30: 41, views: 1340, conversionRate: 3.1,
  },
  {
    id: 'prod-027', sku: 'WA-WB-6603', name: 'Wheel Bearing Kit - Press-In', category: 'Wheel Bearings', subcategory: 'Bearing Kits', brand: 'Westar', price: 34.99, wholesalePrice: 20.50, cost: 13.00, stock: 423, status: 'active', aiScore: 79, missingFields: ['dimensions', 'attributes.bearingType'],
    attributes: { position: 'Front', type: 'Wheel Bearing Kit', includes: 'Bearing, Seal, Snap Ring' },
    fitment: [
      { year: 2006, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
      { year: 2007, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
      { year: 2008, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
      { year: 2009, make: 'Honda', model: 'Civic', engine: '1.8L I4' },
    ],
    relatedProducts: ['prod-010', 'prod-019'], description: 'Complete wheel bearing kit with seal and snap ring. Precision ground for smooth, quiet operation.', weight: 1.2, dimensions: '', upc: '812345678927', lastUpdated: '2025-01-08', salesLast30: 156, views: 4210, conversionRate: 3.7,
  },
  {
    id: 'prod-028', sku: 'WA-EM-1103', name: 'Torque Strut Mount', category: 'Engine Mounts', subcategory: 'Torque Struts', brand: 'Westar', price: 54.99, wholesalePrice: 32.00, cost: 20.50, stock: 178, status: 'active', aiScore: 83, missingFields: ['upc'],
    attributes: { position: 'Upper', type: 'Torque Strut', material: 'Aluminum/Rubber' },
    fitment: [
      { year: 2008, make: 'Ford', model: 'Escape', engine: '2.3L I4' },
      { year: 2009, make: 'Ford', model: 'Escape', engine: '2.5L I4' },
      { year: 2010, make: 'Ford', model: 'Escape', engine: '2.5L I4' },
      { year: 2008, make: 'Mazda', model: 'Tribute', engine: '2.3L I4' },
    ],
    relatedProducts: ['prod-009', 'prod-018'], description: 'Premium torque strut mount to reduce engine movement during acceleration. Aluminum bracket with bonded rubber.', weight: 1.8, dimensions: '10 x 4 x 4 in', upc: '', lastUpdated: '2025-01-10', salesLast30: 78, views: 2190, conversionRate: 3.6,
  },
  {
    id: 'prod-029', sku: 'WA-BC-9904', name: 'Brake Master Cylinder', category: 'Brake Components', subcategory: 'Master Cylinders', brand: 'Westar', price: 89.99, wholesalePrice: 52.50, cost: 34.00, stock: 98, status: 'active', aiScore: 87, missingFields: ['dimensions'],
    attributes: { type: 'Master Cylinder', bore: '1 inch', reservoir: 'Included', warranty: '2 Year' },
    fitment: [
      { year: 2006, make: 'Toyota', model: 'RAV4', engine: '2.4L I4' },
      { year: 2007, make: 'Toyota', model: 'RAV4', engine: '2.4L I4' },
      { year: 2008, make: 'Toyota', model: 'RAV4', engine: '2.4L I4' },
      { year: 2006, make: 'Toyota', model: 'RAV4', engine: '3.5L V6' },
    ],
    relatedProducts: ['prod-012', 'prod-022'], description: 'New brake master cylinder with integrated reservoir and cap. Bench-bled and ready to install.', weight: 4.5, dimensions: '', upc: '812345678929', lastUpdated: '2025-01-14', salesLast30: 52, views: 1780, conversionRate: 2.9,
  },
  {
    id: 'prod-030', sku: 'WA-AS-4231', name: 'Air Suspension Control Module', category: 'Air Suspension', subcategory: 'Control Modules', brand: 'Westar', price: 159.99, wholesalePrice: 94.00, cost: 60.50, stock: 12, status: 'active', aiScore: 76, missingFields: ['weight', 'attributes.partNumber'],
    attributes: { type: 'Control Module', compatibility: 'OE Systems' },
    fitment: [
      { year: 2007, make: 'Ford', model: 'Expedition', engine: '5.4L V8' },
      { year: 2008, make: 'Ford', model: 'Expedition', engine: '5.4L V8' },
      { year: 2007, make: 'Lincoln', model: 'Navigator', engine: '5.4L V8' },
    ],
    relatedProducts: ['prod-001', 'prod-002', 'prod-013'], description: 'Replacement air suspension control module. Manages compressor operation and ride height leveling system.', weight: 0, dimensions: '6 x 4 x 3 in', upc: '812345678930', lastUpdated: '2025-01-06', salesLast30: 8, views: 560, conversionRate: 1.4,
  },
];

export const vendorFeeds: VendorFeed[] = [
  { id: 'vf-1', vendor: 'Dorman Products', lastSync: '2025-01-16 08:30', nextSync: '2025-01-16 14:30', status: 'synced', itemCount: 12450, newItems: 34, updatedItems: 187, errorCount: 0, format: 'ACES XML', frequency: 'Every 6 hours' },
  { id: 'vf-2', vendor: 'Monroe Shocks & Struts', lastSync: '2025-01-16 06:15', nextSync: '2025-01-16 12:15', status: 'synced', itemCount: 3890, newItems: 12, updatedItems: 45, errorCount: 2, format: 'CSV', frequency: 'Every 6 hours' },
  { id: 'vf-3', vendor: 'Moog Chassis Parts', lastSync: '2025-01-15 22:00', nextSync: '2025-01-16 10:00', status: 'pending', itemCount: 5670, newItems: 0, updatedItems: 0, errorCount: 0, format: 'PIES XML', frequency: 'Every 12 hours' },
  { id: 'vf-4', vendor: 'Gabriel Shocks', lastSync: '2025-01-14 14:20', nextSync: 'Paused', status: 'error', itemCount: 2340, newItems: 0, updatedItems: 0, errorCount: 156, format: 'CSV', frequency: 'Daily' },
  { id: 'vf-5', vendor: 'ACDelco', lastSync: '2025-01-16 07:45', nextSync: '2025-01-16 13:45', status: 'synced', itemCount: 18920, newItems: 67, updatedItems: 312, errorCount: 5, format: 'ACES XML', frequency: 'Every 6 hours' },
  { id: 'vf-6', vendor: 'Cardone Industries', lastSync: '2025-01-16 09:00', nextSync: '2025-01-16 21:00', status: 'synced', itemCount: 8450, newItems: 23, updatedItems: 89, errorCount: 1, format: 'PIES XML', frequency: 'Every 12 hours' },
  { id: 'vf-7', vendor: 'KYB Americas', lastSync: '2025-01-16 10:15', nextSync: '2025-01-17 10:15', status: 'syncing', itemCount: 4560, newItems: 18, updatedItems: 67, errorCount: 0, format: 'CSV', frequency: 'Daily' },
  { id: 'vf-8', vendor: 'SKF Bearings', lastSync: '2025-01-16 05:00', nextSync: '2025-01-17 05:00', status: 'synced', itemCount: 6780, newItems: 8, updatedItems: 34, errorCount: 0, format: 'ACES XML', frequency: 'Daily' },
  { id: 'vf-9', vendor: 'TRW Automotive', lastSync: '2025-01-15 18:00', nextSync: '2025-01-16 18:00', status: 'pending', itemCount: 3210, newItems: 0, updatedItems: 0, errorCount: 0, format: 'CSV', frequency: 'Daily' },
  { id: 'vf-10', vendor: 'Raybestos Brakes', lastSync: '2025-01-16 03:00', nextSync: '2025-01-16 15:00', status: 'synced', itemCount: 5430, newItems: 15, updatedItems: 78, errorCount: 3, format: 'PIES XML', frequency: 'Every 12 hours' },
];

export const orders: Order[] = [
  { id: 'ORD-10451', channel: 'westarauto.com', customer: 'Mike Johnson', email: 'mike.j@email.com', total: 269.97, items: 3, status: 'processing', date: '2025-01-16', trackingNumber: undefined, shippingMethod: 'UPS Ground', paymentMethod: 'Credit Card' },
  { id: 'ORD-10450', channel: 'wholesale', customer: 'AutoZone #4521', email: 'orders@autozone.com', total: 4250.00, items: 48, status: 'shipped', date: '2025-01-16', trackingNumber: '1Z999AA10123456784', shippingMethod: 'Freight', paymentMethod: 'Net 30' },
  { id: 'ORD-10449', channel: 'amazon', customer: 'Sarah Williams', email: 'sarah.w@email.com', total: 89.99, items: 1, status: 'delivered', date: '2025-01-15', trackingNumber: '1Z999AA10123456785', shippingMethod: 'FBA', paymentMethod: 'Amazon Pay' },
  { id: 'ORD-10448', channel: 'westarauto.com', customer: 'Robert Chen', email: 'rchen@email.com', total: 159.98, items: 2, status: 'processing', date: '2025-01-15', trackingNumber: undefined, shippingMethod: 'USPS Priority', paymentMethod: 'PayPal' },
  { id: 'ORD-10447', channel: 'ebay', customer: 'david_motors_2024', email: 'david.m@email.com', total: 124.99, items: 1, status: 'shipped', date: '2025-01-15', trackingNumber: '9400111899223100012', shippingMethod: 'USPS Priority', paymentMethod: 'PayPal' },
  { id: 'ORD-10446', channel: 'wholesale', customer: "O'Reilly Auto #789", email: 'purchasing@oreillyauto.com', total: 8730.50, items: 96, status: 'processing', date: '2025-01-15', trackingNumber: undefined, shippingMethod: 'Freight', paymentMethod: 'Net 30' },
  { id: 'ORD-10445', channel: 'westarauto.com', customer: 'Jennifer Martinez', email: 'jen.m@email.com', total: 344.97, items: 3, status: 'pending', date: '2025-01-14', trackingNumber: undefined, shippingMethod: 'FedEx Home', paymentMethod: 'Credit Card' },
  { id: 'ORD-10444', channel: 'amazon', customer: 'Tom Baker', email: 'tom.b@email.com', total: 179.99, items: 1, status: 'delivered', date: '2025-01-14', trackingNumber: '1Z999AA10123456790', shippingMethod: 'FBA', paymentMethod: 'Amazon Pay' },
  { id: 'ORD-10443', channel: 'wholesale', customer: 'NAPA Auto Parts #332', email: 'orders@napaonline.com', total: 6120.00, items: 72, status: 'delivered', date: '2025-01-14', trackingNumber: 'PRO-2025-7892', shippingMethod: 'Freight', paymentMethod: 'Net 30' },
  { id: 'ORD-10442', channel: 'westarauto.com', customer: 'Kevin Park', email: 'kpark@email.com', total: 64.99, items: 1, status: 'shipped', date: '2025-01-13', trackingNumber: '9400111899223100015', shippingMethod: 'USPS First Class', paymentMethod: 'Credit Card' },
  { id: 'ORD-10441', channel: 'walmart', customer: 'Lisa Anderson', email: 'lisa.a@email.com', total: 199.98, items: 2, status: 'processing', date: '2025-01-13', trackingNumber: undefined, shippingMethod: 'WFS', paymentMethod: 'Walmart Pay' },
  { id: 'ORD-10440', channel: 'ebay', customer: 'parts_warehouse_llc', email: 'sales@partswarehouse.com', total: 539.94, items: 6, status: 'delivered', date: '2025-01-13', trackingNumber: '1Z999AA10123456795', shippingMethod: 'UPS Ground', paymentMethod: 'PayPal' },
  { id: 'ORD-10439', channel: 'amazon', customer: 'Carlos Rivera', email: 'carlos.r@email.com', total: 289.99, items: 1, status: 'returned', date: '2025-01-12', trackingNumber: '1Z999AA10123456796', shippingMethod: 'FBA', paymentMethod: 'Amazon Pay' },
  { id: 'ORD-10438', channel: 'westarauto.com', customer: 'Amanda Foster', email: 'amanda.f@email.com', total: 74.99, items: 1, status: 'cancelled', date: '2025-01-12', trackingNumber: undefined, shippingMethod: 'UPS Ground', paymentMethod: 'Credit Card' },
  { id: 'ORD-10437', channel: 'wholesale', customer: 'Pep Boys #1245', email: 'orders@pepboys.com', total: 12450.00, items: 134, status: 'shipped', date: '2025-01-12', trackingNumber: 'PRO-2025-7891', shippingMethod: 'Freight', paymentMethod: 'Net 30' },
  { id: 'ORD-10436', channel: 'westarauto.com', customer: 'Brian Thompson', email: 'brian.t@email.com', total: 154.98, items: 2, status: 'delivered', date: '2025-01-11', trackingNumber: '1Z999AA10123456800', shippingMethod: 'FedEx Home', paymentMethod: 'PayPal' },
];

export const supportTickets: SupportTicket[] = [
  { id: 'TKT-3301', customer: 'Mike Johnson', email: 'mike.j@email.com', subject: 'Will WA-AS-4228 fit my 2010 Expedition?', category: 'fitment', status: 'ai-resolved', aiConfidence: 95, aiResponse: 'Yes, the WA-AS-4228 Air Spring Assembly fits the 2007-2010 Ford Expedition (all submodels). This part replaces OE# 7L1Z5A891B. Installation requires basic hand tools and approximately 1 hour per side.', date: '2025-01-16', priority: 'medium', responseTime: '< 1 min' },
  { id: 'TKT-3300', customer: 'Lisa Park', email: 'lisa.p@email.com', subject: 'Need complete air suspension conversion kit for Navigator', category: 'product-info', status: 'ai-resolved', aiConfidence: 88, aiResponse: 'For a complete air-to-coil conversion on your 2005 Lincoln Navigator, I recommend our Kit WA-AS-CK01 ($289.99). It includes coil springs, shocks, and all necessary hardware. This eliminates the expensive air suspension system entirely.', date: '2025-01-16', priority: 'low', responseTime: '< 1 min' },
  { id: 'TKT-3299', customer: 'James Wilson', email: 'james.w@email.com', subject: 'Order ORD-10438 missing parts from shipment', category: 'order', status: 'escalated', aiConfidence: 32, date: '2025-01-15', priority: 'high', responseTime: '5 min' },
  { id: 'TKT-3298', customer: 'Amy Chen', email: 'amy.c@email.com', subject: 'Return request - ordered wrong engine mount', category: 'return', status: 'open', aiConfidence: 72, aiResponse: 'I can process a return for order ORD-10412. Based on your vehicle (2016 Honda Civic 2.0L), the correct part is WA-EM-1102 (Transmission Mount) instead of WA-EM-1101 (Engine Mount). Would you like me to arrange an exchange?', date: '2025-01-15', priority: 'medium', responseTime: '2 min' },
  { id: 'TKT-3297', customer: 'David Motors LLC', email: 'info@davidmotors.com', subject: 'Wholesale pricing request for bulk strut assemblies', category: 'product-info', status: 'escalated', aiConfidence: 45, date: '2025-01-14', priority: 'high', responseTime: '8 min' },
  { id: 'TKT-3296', customer: 'Karen Smith', email: 'karen.s@email.com', subject: 'Air compressor making noise after installation', category: 'technical', status: 'ai-resolved', aiConfidence: 91, aiResponse: 'Brief noise during initial operation is normal as the system pressurizes (typically 2-3 minutes). If noise persists: 1) Check mounting bolts for proper torque (18 ft-lbs), 2) Inspect all air line connections for leaks using soapy water, 3) Verify relay connections are secure. If the issue continues, contact us for warranty support.', date: '2025-01-14', priority: 'medium', responseTime: '< 1 min' },
  { id: 'TKT-3295', customer: 'Robert Taylor', email: 'rob.t@email.com', subject: 'Warranty claim on brake caliper WA-BC-9901', category: 'warranty', status: 'open', aiConfidence: 65, aiResponse: 'Your brake caliper WA-BC-9901 purchased on 2024-08-15 is within the warranty period. To process this claim, please provide: 1) Photos of the defective caliper, 2) Your vehicle mileage at time of failure, 3) Installation details (professional or DIY).', date: '2025-01-14', priority: 'medium', responseTime: '3 min' },
  { id: 'TKT-3294', customer: 'Sandra Lee', email: 'sandra.l@email.com', subject: 'Where is my order ORD-10442?', category: 'shipping', status: 'ai-resolved', aiConfidence: 98, aiResponse: 'Your order ORD-10442 (Front Coil Spring) shipped via USPS Priority on Jan 13. Tracking: 9400111899223100015. Current status: In Transit — estimated delivery Jan 16-17. You can track it at usps.com.', date: '2025-01-15', priority: 'low', responseTime: '< 1 min' },
  { id: 'TKT-3293', customer: 'Marcus Brown', email: 'marcus.b@email.com', subject: 'Do you have struts for 2020 Toyota RAV4?', category: 'fitment', status: 'ai-resolved', aiConfidence: 87, aiResponse: 'We currently don\'t have strut assemblies specifically for the 2020 Toyota RAV4 in our catalog. However, I\'ve flagged this as a product gap for our catalog team. In the meantime, I can recommend checking with our partners Monroe (Part# 172953) or KYB (Part# 339364).', date: '2025-01-13', priority: 'low', responseTime: '< 1 min' },
  { id: 'TKT-3292', customer: 'Patricia Davis', email: 'pat.d@email.com', subject: 'Hub assembly making grinding noise after 2 months', category: 'technical', status: 'waiting', aiConfidence: 78, aiResponse: 'Grinding noise from a hub assembly can indicate: 1) Incorrect torque on axle nut (spec: 177 ft-lbs), 2) Damaged ABS sensor during installation, 3) Potential manufacturing defect. Since this is within warranty, I recommend having a mechanic verify the torque spec first, then contact us for warranty replacement if needed.', date: '2025-01-13', priority: 'high', responseTime: '2 min' },
  { id: 'TKT-3291', customer: 'Auto Solutions Inc', email: 'orders@autosolutions.com', subject: 'API access for real-time inventory checking', category: 'technical', status: 'escalated', aiConfidence: 15, date: '2025-01-12', priority: 'medium', responseTime: '15 min' },
  { id: 'TKT-3290', customer: 'Nancy White', email: 'nancy.w@email.com', subject: 'Difference between WA-BC-9901 and WA-BC-9902?', category: 'product-info', status: 'ai-resolved', aiConfidence: 96, aiResponse: 'Great question! WA-BC-9901 is a remanufactured front brake caliper ($74.99) while WA-BC-9902 is a drilled & slotted brake rotor ($54.99). They\'re complementary parts — the caliper squeezes the pads against the rotor. For a complete brake job on your 2009 Nissan Altima, I\'d recommend both along with our ceramic brake pads WA-BC-9903 ($39.99).', date: '2025-01-12', priority: 'low', responseTime: '< 1 min' },
];

export const inventoryAlerts: InventoryAlert[] = [
  { id: 'ia-1', sku: 'WA-CS-3302', productName: 'Rear Coil Spring - Standard', alertType: 'out-of-stock', currentStock: 0, threshold: 25, suggestedAction: 'Reorder 100 units from supplier. Lead time: 14 days. Estimated cost: $2,200.', priority: 'high', estimatedCost: 2200, daysUntilStockout: 0 },
  { id: 'ia-2', sku: 'WA-BC-9901', productName: 'Front Brake Caliper - Remanufactured', alertType: 'low-stock', currentStock: 23, threshold: 50, suggestedAction: 'Reorder 75 units. Current sell-through: 12/week. ~13 days until stockout.', priority: 'high', estimatedCost: 2138, daysUntilStockout: 13 },
  { id: 'ia-3', sku: 'WA-AS-4231', productName: 'Air Suspension Control Module', alertType: 'low-stock', currentStock: 12, threshold: 30, suggestedAction: 'Reorder 50 units. Slow mover but high margin ($99.49/unit). Lead time: 21 days.', priority: 'high', estimatedCost: 3025, daysUntilStockout: 45 },
  { id: 'ia-4', sku: 'WA-CA-2201', productName: 'Lower Control Arm w/ Ball Joint', alertType: 'low-stock', currentStock: 78, threshold: 100, suggestedAction: 'Reorder 150 units. Seasonal demand increase expected in spring.', priority: 'medium', estimatedCost: 6150, daysUntilStockout: 42 },
  { id: 'ia-5', sku: 'WA-SC-8801', productName: 'Outer Tie Rod End', alertType: 'overstock', currentStock: 612, threshold: 300, suggestedAction: 'Consider promotional pricing (-15%) or expanding marketplace listings to move excess.', priority: 'low', estimatedCost: 0 },
  { id: 'ia-6', sku: 'WA-AC-5501', productName: 'Air Suspension Compressor', alertType: 'reorder', currentStock: 87, threshold: 100, suggestedAction: 'Place reorder for 200 units. Vendor has 3-week lead time. Bundle with air springs for promotion.', priority: 'medium', estimatedCost: 13600, daysUntilStockout: 29 },
  { id: 'ia-7', sku: 'WA-AS-CK01', productName: 'Air-to-Coil Conversion Kit', alertType: 'low-stock', currentStock: 34, threshold: 50, suggestedAction: 'Reorder 40 units. High margin item ($179.99 profit/unit). Lead time: 28 days.', priority: 'medium', estimatedCost: 4400, daysUntilStockout: 54 },
  { id: 'ia-8', sku: 'WA-BC-9903', productName: 'Ceramic Brake Pad Set - Front', alertType: 'overstock', currentStock: 534, threshold: 250, suggestedAction: 'Run Amazon Lightning Deal or eBay promotion to reduce excess. 267 units above target.', priority: 'low', estimatedCost: 0 },
  { id: 'ia-9', sku: 'WA-SA-7714', productName: 'Electronic Shock Absorber - Rear', alertType: 'low-stock', currentStock: 45, threshold: 60, suggestedAction: 'Reorder 100 units. Premium product with growing Escalade/Tahoe demand.', priority: 'medium', estimatedCost: 7500, daysUntilStockout: 48 },
  { id: 'ia-10', sku: 'WA-CS-3303', productName: 'Heavy Duty Coil Spring Set', alertType: 'damaged', currentStock: 67, threshold: 100, suggestedAction: '3 units reported damaged in warehouse. Remove from sellable inventory and file damage claim.', priority: 'low', estimatedCost: 170 },
];

export const aiTasks: AITask[] = [
  { id: 'at-1', type: 'Catalog Enrichment', description: 'Generating missing product descriptions using GPT-4', status: 'running', progress: 67, itemsProcessed: 201, totalItems: 300, startedAt: '2025-01-16 09:00', eta: '12 min remaining', triggeredBy: 'Scheduled' },
  { id: 'at-2', type: 'Fitment Validation', description: 'Cross-referencing fitment data with ACES 4.2 database', status: 'running', progress: 34, itemsProcessed: 816, totalItems: 2400, startedAt: '2025-01-16 08:30', eta: '45 min remaining', triggeredBy: 'Manual' },
  { id: 'at-3', type: 'Image Processing', description: 'Optimizing product images: resize, compress, background removal', status: 'completed', progress: 100, itemsProcessed: 450, totalItems: 450, startedAt: '2025-01-16 07:00', completedAt: '2025-01-16 08:15', triggeredBy: 'Scheduled' },
  { id: 'at-4', type: 'Competitive Pricing', description: 'Scraping competitor prices on Amazon, eBay, Walmart', status: 'queued', progress: 0, itemsProcessed: 0, totalItems: 1200, startedAt: '', triggeredBy: 'Scheduled' },
  { id: 'at-5', type: 'Category Mapping', description: 'Auto-categorizing 156 new vendor products into taxonomy', status: 'completed', progress: 100, itemsProcessed: 156, totalItems: 156, startedAt: '2025-01-16 06:00', completedAt: '2025-01-16 06:28', triggeredBy: 'Vendor Feed' },
  { id: 'at-6', type: 'Data Quality Scan', description: 'Detecting missing fields, duplicates, and inconsistencies', status: 'failed', progress: 45, itemsProcessed: 1080, totalItems: 2400, startedAt: '2025-01-15 23:00', errorMessage: 'Database connection timeout after processing 1080 items', triggeredBy: 'Scheduled' },
  { id: 'at-7', type: 'SEO Optimization', description: 'Generating meta titles, descriptions, and keywords', status: 'paused', progress: 55, itemsProcessed: 660, totalItems: 1200, startedAt: '2025-01-16 04:00', triggeredBy: 'Manual' },
  { id: 'at-8', type: 'Relationship Discovery', description: 'AI detecting product accessories, kits, and replacements', status: 'queued', progress: 0, itemsProcessed: 0, totalItems: 2400, startedAt: '', triggeredBy: 'Scheduled' },
  { id: 'at-9', type: 'Marketplace Sync', description: 'Pushing updated listings to Amazon, eBay, Walmart', status: 'completed', progress: 100, itemsProcessed: 890, totalItems: 890, startedAt: '2025-01-16 05:00', completedAt: '2025-01-16 05:45', triggeredBy: 'Scheduled' },
  { id: 'at-10', type: 'UPC Lookup', description: 'Auto-filling missing UPC codes from GS1 database', status: 'running', progress: 82, itemsProcessed: 164, totalItems: 200, startedAt: '2025-01-16 09:30', eta: '4 min remaining', triggeredBy: 'Manual' },
];

export const dashboardStats = {
  totalProducts: 2334,
  activeListings: 2156,
  draftProducts: 142,
  discontinuedProducts: 36,
  avgDataQuality: 84,
  ordersToday: 47,
  revenueToday: 28450,
  revenueMonth: 842300,
  revenueLastMonth: 738200,
  ticketsOpen: 12,
  ticketsAiResolved: 156,
  ticketsTotal: 214,
  aiResolutionRate: 73,
  inventoryValue: 1245000,
  lowStockItems: 34,
  outOfStockItems: 8,
  vendorFeedsActive: 10,
  fitmentCoverage: 89,
  catalogCompleteness: 78,
  avgResponseTime: '2.3 min',
  customerSatisfaction: 94,
  returnRate: 3.2,
};

export const revenueData = [
  { month: 'Jul', dtc: 42000, wholesale: 185000, amazon: 28000, ebay: 12000, walmart: 5000 },
  { month: 'Aug', dtc: 48000, wholesale: 192000, amazon: 31000, ebay: 14000, walmart: 7000 },
  { month: 'Sep', dtc: 45000, wholesale: 198000, amazon: 29000, ebay: 11000, walmart: 8500 },
  { month: 'Oct', dtc: 52000, wholesale: 210000, amazon: 35000, ebay: 15000, walmart: 11000 },
  { month: 'Nov', dtc: 61000, wholesale: 245000, amazon: 42000, ebay: 18000, walmart: 14000 },
  { month: 'Dec', dtc: 58000, wholesale: 232000, amazon: 38000, ebay: 16000, walmart: 12000 },
  { month: 'Jan', dtc: 55000, wholesale: 220000, amazon: 34000, ebay: 14000, walmart: 13000 },
];

export const dataQualityByCategory = [
  { category: 'Air Suspension', score: 88, products: 342 },
  { category: 'Shock Absorbers', score: 85, products: 518 },
  { category: 'Coil Springs', score: 72, products: 276 },
  { category: 'Control Arms', score: 90, products: 189 },
  { category: 'Steering', score: 78, products: 234 },
  { category: 'Brakes', score: 71, products: 421 },
  { category: 'Engine Mounts', score: 85, products: 156 },
  { category: 'Wheel Bearings', score: 92, products: 198 },
  { category: 'CV Joints', score: 88, products: 145 },
  { category: 'Exhaust', score: 91, products: 87 },
];

export const fitmentCoverageData = [
  { make: 'Ford', coverage: 94, models: 28, applications: 3420 },
  { make: 'Chevrolet', coverage: 91, models: 24, applications: 2890 },
  { make: 'Toyota', coverage: 87, models: 18, applications: 2340 },
  { make: 'Honda', coverage: 85, models: 16, applications: 2120 },
  { make: 'Nissan', coverage: 82, models: 14, applications: 1890 },
  { make: 'GMC', coverage: 90, models: 12, applications: 1560 },
  { make: 'Lincoln', coverage: 93, models: 8, applications: 1230 },
  { make: 'Dodge/Ram', coverage: 79, models: 20, applications: 2670 },
  { make: 'Jeep', coverage: 76, models: 10, applications: 890 },
  { make: 'BMW', coverage: 68, models: 15, applications: 780 },
  { make: 'Mercedes', coverage: 64, models: 12, applications: 650 },
  { make: 'Cadillac', coverage: 88, models: 6, applications: 540 },
];
