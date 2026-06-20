export interface Customer {
  id: string; name: string; email: string; phone: string; company: string;
  type: 'retail' | 'wholesale' | 'distributor';
  status: 'active' | 'inactive' | 'lead' | 'vip';
  totalOrders: number; totalSpent: number; avgOrder: number;
  lastOrder: string; joinDate: string;
  address: string; city: string; state: string; zip: string;
  notes: string; tags: string[];
  vehicles: string[];
  score: number; // lead score 0-100
}

export interface Deal {
  id: string; title: string; customerId: string; customerName: string;
  value: number; stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  probability: number; closeDate: string; assignedTo: string;
  source: string; notes: string; createdAt: string;
  products: string[];
}

export interface Activity {
  id: string; type: 'call' | 'email' | 'meeting' | 'note' | 'order' | 'ticket' | 'follow-up';
  title: string; description: string; customerId: string; customerName: string;
  date: string; time: string; assignedTo: string;
  completed: boolean; priority: 'high' | 'medium' | 'low';
}

export interface CampaignItem {
  id: string; name: string; type: 'email' | 'sms' | 'retargeting' | 'loyalty';
  status: 'active' | 'draft' | 'paused' | 'completed';
  audience: number; sent: number; opened: number; clicked: number; converted: number;
  revenue: number; startDate: string; endDate: string;
}

export interface Ticket {
  id: string; customerId: string; customerName: string;
  subject: string; category: 'fitment' | 'order' | 'return' | 'warranty' | 'technical' | 'general';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  assignedTo: string; createdAt: string; updatedAt: string;
  messages: { sender: string; body: string; time: string; isAgent: boolean }[];
}

export const customers: Customer[] = [
  { id: 'cust-1', name: 'AutoZone Distribution #4521', email: 'orders@autozone.com', phone: '(901) 495-6500', company: 'AutoZone Inc.', type: 'wholesale', status: 'vip', totalOrders: 248, totalSpent: 187450, avgOrder: 755.85, lastOrder: '2025-01-16', joinDate: '2021-03-12', address: '123 Supply Chain Dr', city: 'Memphis', state: 'TN', zip: '38118', notes: 'Top wholesale account. Net 30 terms. Quarterly review scheduled Feb.', tags: ['wholesale', 'vip', 'net-30', 'top-account'], vehicles: [], score: 98 },
  { id: 'cust-2', name: "O'Reilly Auto Parts #789", email: 'purchasing@oreillyauto.com', phone: '(417) 862-6708', company: "O'Reilly Automotive", type: 'wholesale', status: 'vip', totalOrders: 186, totalSpent: 143200, avgOrder: 770.00, lastOrder: '2025-01-15', joinDate: '2021-06-08', address: '233 S Patterson Ave', city: 'Springfield', state: 'MO', zip: '65802', notes: 'Second largest wholesale account. Expanding to 3 more regions Q2.', tags: ['wholesale', 'vip', 'net-30', 'expanding'], vehicles: [], score: 95 },
  { id: 'cust-3', name: 'Mike Johnson', email: 'mike.j@email.com', phone: '(555) 234-5678', company: '', type: 'retail', status: 'active', totalOrders: 7, totalSpent: 842.93, avgOrder: 120.42, lastOrder: '2025-01-16', joinDate: '2024-03-22', address: '456 Oak Lane', city: 'Houston', state: 'TX', zip: '77001', notes: 'Repeat customer. Owns 2008 Ford Expedition. Very satisfied with air suspension products.', tags: ['repeat', 'ford-owner', 'air-suspension'], vehicles: ['2008 Ford Expedition 5.4L V8'], score: 72 },
  { id: 'cust-4', name: 'Sarah Williams', email: 'sarah.w@email.com', phone: '(555) 345-6789', company: '', type: 'retail', status: 'active', totalOrders: 3, totalSpent: 289.97, avgOrder: 96.66, lastOrder: '2025-01-15', joinDate: '2024-08-15', address: '789 Maple St', city: 'Phoenix', state: 'AZ', zip: '85001', notes: 'Amazon customer converted to direct. Bought brake components.', tags: ['amazon-convert', 'brake-customer'], vehicles: ['2010 Nissan Altima 2.5L'], score: 58 },
  { id: 'cust-5', name: 'Robert Chen', email: 'rchen@email.com', phone: '(555) 456-7890', company: 'Chen Auto Repair', type: 'retail', status: 'active', totalOrders: 12, totalSpent: 1847.88, avgOrder: 153.99, lastOrder: '2025-01-15', joinDate: '2023-11-04', address: '321 Workshop Blvd', city: 'San Jose', state: 'CA', zip: '95101', notes: 'Small shop owner. Orders for customer vehicles. Potential wholesale upgrade.', tags: ['shop-owner', 'potential-wholesale', 'repeat'], vehicles: ['Various customer vehicles'], score: 81 },
  { id: 'cust-6', name: 'David Motors LLC', email: 'info@davidmotors.com', phone: '(555) 567-8901', company: 'David Motors LLC', type: 'distributor', status: 'lead', totalOrders: 0, totalSpent: 0, avgOrder: 0, lastOrder: '', joinDate: '2025-01-14', address: '555 Commerce Way', city: 'Atlanta', state: 'GA', zip: '30301', notes: 'Interested in wholesale pricing for strut assemblies. Requested quote for 500+ units.', tags: ['lead', 'high-value', 'struts', 'bulk-inquiry'], vehicles: [], score: 89 },
  { id: 'cust-7', name: 'NAPA Auto Parts #332', email: 'orders@napaonline.com', phone: '(770) 956-2200', company: 'NAPA Auto Parts', type: 'wholesale', status: 'active', totalOrders: 94, totalSpent: 72340, avgOrder: 769.57, lastOrder: '2025-01-14', joinDate: '2022-01-20', address: '2999 Wildwood Pkwy', city: 'Atlanta', state: 'GA', zip: '30339', notes: 'Consistent monthly orders. Primary focus on air suspension components.', tags: ['wholesale', 'monthly-orders', 'air-suspension'], vehicles: [], score: 88 },
  { id: 'cust-8', name: 'Jennifer Martinez', email: 'jen.m@email.com', phone: '(555) 678-9012', company: '', type: 'retail', status: 'active', totalOrders: 2, totalSpent: 344.97, avgOrder: 172.49, lastOrder: '2025-01-14', joinDate: '2024-11-28', address: '876 Cedar Ave', city: 'Denver', state: 'CO', zip: '80201', notes: 'Holiday shopper. Bought conversion kit for Navigator. Left 5-star review.', tags: ['reviewer', 'lincoln-owner'], vehicles: ['2005 Lincoln Navigator 5.4L V8'], score: 65 },
  { id: 'cust-9', name: 'Pep Boys #1245', email: 'orders@pepboys.com', phone: '(215) 430-9000', company: 'Pep Boys', type: 'wholesale', status: 'active', totalOrders: 67, totalSpent: 58900, avgOrder: 879.10, lastOrder: '2025-01-12', joinDate: '2022-05-15', address: '3111 W Allegheny Ave', city: 'Philadelphia', state: 'PA', zip: '19132', notes: 'Growing account. Expanded to brake components in Q4. Discuss Q1 targets.', tags: ['wholesale', 'growing', 'brake-expansion'], vehicles: [], score: 82 },
  { id: 'cust-10', name: 'Tom Baker', email: 'tom.b@email.com', phone: '(555) 789-0123', company: '', type: 'retail', status: 'inactive', totalOrders: 1, totalSpent: 179.99, avgOrder: 179.99, lastOrder: '2024-07-22', joinDate: '2024-07-22', address: '432 Pine Rd', city: 'Portland', state: 'OR', zip: '97201', notes: 'Single purchase 6 months ago. Air compressor for Expedition. Send reactivation offer.', tags: ['at-risk', 'single-purchase', 'reactivation-target'], vehicles: ['2009 Ford Expedition 5.4L V8'], score: 25 },
  { id: 'cust-11', name: 'Karen Smith', email: 'karen.s@email.com', phone: '(555) 890-1234', company: '', type: 'retail', status: 'active', totalOrders: 4, totalSpent: 456.96, avgOrder: 114.24, lastOrder: '2025-01-14', joinDate: '2024-05-10', address: '654 Elm St', city: 'Chicago', state: 'IL', zip: '60601', notes: 'Called about compressor noise (normal). Very satisfied after explanation. Good candidate for referral program.', tags: ['satisfied', 'referral-candidate', 'air-suspension'], vehicles: ['2008 Lincoln Navigator 5.4L V8'], score: 70 },
  { id: 'cust-12', name: 'Auto Solutions Inc', email: 'orders@autosolutions.com', phone: '(555) 901-2345', company: 'Auto Solutions Inc', type: 'distributor', status: 'lead', totalOrders: 0, totalSpent: 0, avgOrder: 0, lastOrder: '', joinDate: '2025-01-12', address: '789 Industrial Pkwy', city: 'Dallas', state: 'TX', zip: '75201', notes: 'Requested API access for inventory sync. B2B e-commerce integration inquiry. High potential.', tags: ['lead', 'api-inquiry', 'b2b', 'high-potential'], vehicles: [], score: 92 },
  { id: 'cust-13', name: 'Kevin Park', email: 'kpark@email.com', phone: '(555) 012-3456', company: '', type: 'retail', status: 'active', totalOrders: 5, totalSpent: 524.95, avgOrder: 104.99, lastOrder: '2025-01-13', joinDate: '2024-06-18', address: '987 Birch Way', city: 'Seattle', state: 'WA', zip: '98101', notes: 'Loyal customer. Toyota Camry owner. Bought struts and shocks. Interested in brake upgrade.', tags: ['loyal', 'toyota-owner', 'upsell-opportunity'], vehicles: ['2014 Toyota Camry 2.5L I4'], score: 74 },
  { id: 'cust-14', name: 'Lisa Anderson', email: 'lisa.a@email.com', phone: '(555) 123-4567', company: '', type: 'retail', status: 'active', totalOrders: 2, totalSpent: 199.98, avgOrder: 99.99, lastOrder: '2025-01-13', joinDate: '2024-12-01', address: '246 Walnut Ct', city: 'Miami', state: 'FL', zip: '33101', notes: 'Walmart marketplace customer. Interested in hub bearing for F-150.', tags: ['walmart-customer', 'ford-owner'], vehicles: ['2012 Ford F-150 5.0L V8 4WD'], score: 52 },
];

export const deals: Deal[] = [
  { id: 'deal-1', title: 'AutoZone Q1 Bulk Order', customerId: 'cust-1', customerName: 'AutoZone Distribution #4521', value: 45000, stage: 'negotiation', probability: 80, closeDate: '2025-02-15', assignedTo: 'Sales Team', source: 'Existing Account', notes: 'Q1 air suspension replenishment. Discussing volume discount.', createdAt: '2025-01-10', products: ['Air Springs', 'Compressors'] },
  { id: 'deal-2', title: 'David Motors Wholesale Agreement', customerId: 'cust-6', customerName: 'David Motors LLC', value: 125000, stage: 'proposal', probability: 60, closeDate: '2025-03-01', assignedTo: 'VP Sales', source: 'Inbound Inquiry', notes: '500+ unit strut order. Sent pricing proposal 01/15. Follow up scheduled.', createdAt: '2025-01-14', products: ['Strut Assemblies', 'Shocks'] },
  { id: 'deal-3', title: 'Auto Solutions API Integration', customerId: 'cust-12', customerName: 'Auto Solutions Inc', value: 200000, stage: 'qualified', probability: 40, closeDate: '2025-04-01', assignedTo: 'Business Dev', source: 'Inbound Inquiry', notes: 'B2B integration with real-time inventory. Annual contract potential.', createdAt: '2025-01-12', products: ['Full Catalog'] },
  { id: 'deal-4', title: "O'Reilly Regional Expansion", customerId: 'cust-2', customerName: "O'Reilly Auto Parts #789", value: 75000, stage: 'won', probability: 100, closeDate: '2025-01-10', assignedTo: 'Sales Team', source: 'Existing Account', notes: 'Expanded to Southeast region. 3 new distribution centers.', createdAt: '2024-12-01', products: ['Air Suspension', 'Brakes', 'Steering'] },
  { id: 'deal-5', title: 'Pep Boys Brake Line Expansion', customerId: 'cust-9', customerName: 'Pep Boys #1245', value: 32000, stage: 'won', probability: 100, closeDate: '2025-01-05', assignedTo: 'Sales Team', source: 'Cross-sell', notes: 'Added brake components to existing air suspension account.', createdAt: '2024-11-20', products: ['Brake Rotors', 'Brake Pads'] },
  { id: 'deal-6', title: 'Robert Chen Wholesale Upgrade', customerId: 'cust-5', customerName: 'Robert Chen', value: 8500, stage: 'lead', probability: 25, closeDate: '2025-03-15', assignedTo: 'Inside Sales', source: 'Customer Upgrade', notes: 'Shop owner ordering regularly. Good candidate for wholesale pricing.', createdAt: '2025-01-15', products: ['Various'] },
  { id: 'deal-7', title: 'NAPA Air Suspension Refresh', customerId: 'cust-7', customerName: 'NAPA Auto Parts #332', value: 28000, stage: 'negotiation', probability: 75, closeDate: '2025-02-01', assignedTo: 'Sales Team', source: 'Existing Account', notes: 'Bi-annual inventory refresh for air suspension line.', createdAt: '2025-01-08', products: ['Air Springs', 'Compressors', 'Conversion Kits'] },
  { id: 'deal-8', title: 'New Fleet Account - City Motors', customerId: 'cust-6', customerName: 'City Motors Fleet', value: 55000, stage: 'lead', probability: 20, closeDate: '2025-05-01', assignedTo: 'Business Dev', source: 'Cold Outreach', notes: 'Fleet of 200+ Ford trucks. Needs hub bearings and suspension parts.', createdAt: '2025-01-16', products: ['Hub Assemblies', 'Shocks', 'Control Arms'] },
];

export const activities: Activity[] = [
  { id: 'act-1', type: 'call', title: 'Follow up on Q1 pricing', description: 'Call AutoZone purchasing to finalize Q1 volume discount terms.', customerId: 'cust-1', customerName: 'AutoZone Distribution', date: '2025-01-17', time: '10:00 AM', assignedTo: 'Sales Team', completed: false, priority: 'high' },
  { id: 'act-2', type: 'email', title: 'Send wholesale proposal', description: 'Email David Motors the wholesale pricing proposal for 500+ strut units.', customerId: 'cust-6', customerName: 'David Motors LLC', date: '2025-01-16', time: '2:00 PM', assignedTo: 'VP Sales', completed: true, priority: 'high' },
  { id: 'act-3', type: 'meeting', title: 'API integration discovery call', description: 'Zoom call with Auto Solutions technical team to discuss API requirements.', customerId: 'cust-12', customerName: 'Auto Solutions Inc', date: '2025-01-18', time: '11:00 AM', assignedTo: 'Business Dev', completed: false, priority: 'medium' },
  { id: 'act-4', type: 'follow-up', title: 'Reactivation offer for Tom Baker', description: 'Send 15% off coupon code for air suspension products.', customerId: 'cust-10', customerName: 'Tom Baker', date: '2025-01-17', time: '9:00 AM', assignedTo: 'Marketing', completed: false, priority: 'low' },
  { id: 'act-5', type: 'note', title: 'Review call notes', description: 'Karen Smith called about compressor noise. Normal break-in period explained. Very satisfied.', customerId: 'cust-11', customerName: 'Karen Smith', date: '2025-01-14', time: '3:30 PM', assignedTo: 'Support', completed: true, priority: 'medium' },
  { id: 'act-6', type: 'order', title: 'Process wholesale order', description: "O'Reilly Q1 initial order received. 96 units across 8 SKUs.", customerId: 'cust-2', customerName: "O'Reilly Auto Parts", date: '2025-01-15', time: '8:00 AM', assignedTo: 'Fulfillment', completed: true, priority: 'high' },
  { id: 'act-7', type: 'email', title: 'Brake upgrade recommendation', description: 'Send Kevin Park personalized recommendation for ceramic brake pads based on purchase history.', customerId: 'cust-13', customerName: 'Kevin Park', date: '2025-01-17', time: '1:00 PM', assignedTo: 'Inside Sales', completed: false, priority: 'medium' },
  { id: 'act-8', type: 'ticket', title: 'Warranty claim processing', description: 'Process warranty replacement for hub assembly. Customer submitted photos.', customerId: 'cust-14', customerName: 'Lisa Anderson', date: '2025-01-16', time: '4:00 PM', assignedTo: 'Support', completed: false, priority: 'high' },
  { id: 'act-9', type: 'call', title: 'Quarterly business review', description: 'Schedule QBR with NAPA to discuss H1 targets and new product launches.', customerId: 'cust-7', customerName: 'NAPA Auto Parts', date: '2025-01-20', time: '2:00 PM', assignedTo: 'Sales Team', completed: false, priority: 'medium' },
  { id: 'act-10', type: 'meeting', title: 'Pep Boys product training', description: 'On-site training for new brake product line at Pep Boys HQ.', customerId: 'cust-9', customerName: 'Pep Boys', date: '2025-01-22', time: '10:00 AM', assignedTo: 'Product Team', completed: false, priority: 'medium' },
];

export const campaigns: CampaignItem[] = [
  { id: 'camp-1', name: 'January Clearance Sale', type: 'email', status: 'active', audience: 12450, sent: 12450, opened: 4230, clicked: 1890, converted: 342, revenue: 28450, startDate: '2025-01-10', endDate: '2025-01-31' },
  { id: 'camp-2', name: 'Abandoned Cart Recovery', type: 'email', status: 'active', audience: 856, sent: 856, opened: 412, clicked: 234, converted: 89, revenue: 8920, startDate: '2025-01-01', endDate: '2025-12-31' },
  { id: 'camp-3', name: 'VIP Early Access', type: 'email', status: 'completed', audience: 450, sent: 450, opened: 312, clicked: 198, converted: 67, revenue: 14500, startDate: '2025-01-05', endDate: '2025-01-09' },
  { id: 'camp-4', name: 'Reactivation - 90 Day', type: 'email', status: 'active', audience: 2340, sent: 2340, opened: 678, clicked: 234, converted: 45, revenue: 4230, startDate: '2025-01-01', endDate: '2025-03-31' },
  { id: 'camp-5', name: 'New Product Launch: Ceramic Pads', type: 'sms', status: 'draft', audience: 5600, sent: 0, opened: 0, clicked: 0, converted: 0, revenue: 0, startDate: '2025-02-01', endDate: '2025-02-14' },
  { id: 'camp-6', name: 'Google Retargeting - Cart', type: 'retargeting', status: 'active', audience: 3200, sent: 45000, opened: 0, clicked: 1230, converted: 156, revenue: 12800, startDate: '2025-01-01', endDate: '2025-01-31' },
  { id: 'camp-7', name: 'Loyalty Points Double Weekend', type: 'loyalty', status: 'paused', audience: 8900, sent: 8900, opened: 3450, clicked: 1200, converted: 234, revenue: 19500, startDate: '2025-01-18', endDate: '2025-01-19' },
];

export const tickets: Ticket[] = [
  { id: 'tkt-1', customerId: 'cust-3', customerName: 'Mike Johnson', subject: 'Air spring fitment question for 2010 Expedition', category: 'fitment', status: 'resolved', priority: 'medium', assignedTo: 'Support', createdAt: '2025-01-16 09:30', updatedAt: '2025-01-16 09:45', messages: [
    { sender: 'Mike Johnson', body: 'Will the WA-AS-4228 fit my 2010 Expedition EL model?', time: '09:30', isAgent: false },
    { sender: 'AI Agent', body: 'Yes! The WA-AS-4228 fits 2007-2010 Ford Expedition including EL models. This part replaces OE# 7L1Z5A891B.', time: '09:31', isAgent: true },
    { sender: 'Mike Johnson', body: 'Perfect, ordering now. Thanks!', time: '09:45', isAgent: false },
  ]},
  { id: 'tkt-2', customerId: 'cust-14', customerName: 'Lisa Anderson', subject: 'Warranty claim - Hub bearing grinding noise', category: 'warranty', status: 'in-progress', priority: 'high', assignedTo: 'Support', createdAt: '2025-01-15 14:20', updatedAt: '2025-01-16 10:00', messages: [
    { sender: 'Lisa Anderson', body: 'My hub bearing started grinding after 2 months. I need a warranty replacement.', time: '14:20', isAgent: false },
    { sender: 'Support Agent', body: 'I\'m sorry to hear that. Can you please send photos of the part and your installation receipt?', time: '14:35', isAgent: true },
    { sender: 'Lisa Anderson', body: 'Photos attached. It was installed by my local mechanic.', time: '15:00', isAgent: false },
    { sender: 'Support Agent', body: 'Thank you. Your warranty claim has been approved. Replacement will ship today via UPS 2-Day.', time: '10:00', isAgent: true },
  ]},
  { id: 'tkt-3', customerId: 'cust-4', customerName: 'Sarah Williams', subject: 'Return request - ordered wrong brake pads', category: 'return', status: 'open', priority: 'medium', assignedTo: 'Support', createdAt: '2025-01-16 11:00', updatedAt: '2025-01-16 11:00', messages: [
    { sender: 'Sarah Williams', body: 'I ordered brake pads for Altima but I need them for Maxima. Can I exchange?', time: '11:00', isAgent: false },
  ]},
  { id: 'tkt-4', customerId: 'cust-12', customerName: 'Auto Solutions Inc', subject: 'API documentation request', category: 'technical', status: 'open', priority: 'high', assignedTo: 'Business Dev', createdAt: '2025-01-12 16:00', updatedAt: '2025-01-14 09:00', messages: [
    { sender: 'Auto Solutions Inc', body: 'We need API documentation for real-time inventory and pricing integration.', time: '16:00', isAgent: false },
    { sender: 'Business Dev', body: 'Our API documentation is being prepared. We\'ll schedule a discovery call to discuss your integration needs.', time: '09:00', isAgent: true },
  ]},
];

export const crmStats = {
  totalCustomers: 14,
  activeCustomers: 10,
  newThisMonth: 3,
  totalRevenue: 842300,
  avgLifetimeValue: 4280,
  churnRate: 3.2,
  openDeals: 6,
  pipelineValue: 493500,
  wonThisMonth: 107000,
  openTickets: 4,
  avgResponseTime: '2.3 min',
  csat: 94,
  activeCampaigns: 4,
  campaignRevenue: 88400,
  conversionRate: 3.8,
};

export const pipelineStages = [
  { name: 'Lead', count: 2, value: 63500 },
  { name: 'Qualified', count: 1, value: 200000 },
  { name: 'Proposal', count: 1, value: 125000 },
  { name: 'Negotiation', count: 2, value: 73000 },
  { name: 'Won', count: 2, value: 107000 },
];
