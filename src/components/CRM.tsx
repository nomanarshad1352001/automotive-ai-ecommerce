import { useState } from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import CRMSidebar from './Sidebar';
import CRMDashboard from './Dashboard';
import CatalogProducts from './CatalogProducts';
import SupportTickets from './SupportTickets';
import InventoryAlerts from './InventoryAlerts';
import OrdersView from './OrdersView';
import {
  AutoCategorizationView, CatalogEnrichment, CatalogQuality, ProductRelationships,
  FitmentDatabase, PartFinderAI, AutomationTasks, VendorFeedsView,
  MarketplaceView, AnalyticsView, SettingsView, PlaceholderSection,
} from './SimplePages';

function CRMInner({ onBack }: { onBack: () => void }) {
  const { t } = useTheme();
  const [section, setSection] = useState('dashboard');

  const render = () => {
    switch (section) {
      case 'dashboard': return <CRMDashboard onNavigate={setSection} />;
      case 'catalog-products': return <CatalogProducts />;
      case 'catalog-categorization': return <AutoCategorizationView />;
      case 'catalog-enrichment': return <CatalogEnrichment />;
      case 'catalog-quality': return <CatalogQuality />;
      case 'catalog-relationships': return <ProductRelationships />;
      case 'fitment-database': return <FitmentDatabase />;
      case 'fitment-lookup': return <PartFinderAI />;
      case 'support-tickets': return <SupportTickets />;
      case 'inventory-alerts': return <InventoryAlerts />;
      case 'inventory-purchasing': return <PlaceholderSection title="AI Purchasing" subtitle="Auto purchase orders" features={['Smart reorders','Vendor compare','Lead time','Demand forecast']} />;
      case 'orders': return <OrdersView />;
      case 'automation-tasks': return <AutomationTasks />;
      case 'automation-feeds': return <VendorFeedsView />;
      case 'automation-batch': return <PlaceholderSection title="Batch Operations" subtitle="Bulk transformations" features={['Price updates','Attribute changes','Image processing','Data transforms']} />;
      case 'marketplace': return <MarketplaceView />;
      case 'analytics': return <AnalyticsView />;
      case 'settings': return <SettingsView />;
      default: return <CRMDashboard onNavigate={setSection} />;
    }
  };

  return (
    <div className="crm-scale flex h-screen overflow-hidden" style={{ background: t.bg, color: t.text }}>
      <CRMSidebar activeSection={section} onNavigate={setSection} onBack={onBack} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-5 lg:p-7 max-w-[1400px]" key={section}>
          {render()}
        </div>
      </main>
    </div>
  );
}

export default function CRM({ onBack }: { onBack: () => void }) {
  return (
    <ThemeProvider>
      <CRMInner onBack={onBack} />
    </ThemeProvider>
  );
}
