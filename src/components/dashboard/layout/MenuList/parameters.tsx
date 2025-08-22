import {
  IconArchive,
  IconBrandChrome,
  IconBread,
  IconBuilding,
  IconBuildingStore,
  IconCashBanknote,
  IconChartBar,
  IconCircle,
  IconCurrency,
  IconFileInvoice,
  IconFiles,
  IconHelp,
  IconKey,
  IconMessageReport,
  IconNews,
  IconReport,
  IconReportAnalytics,
  IconSettings,
  IconSitemap,
  IconTableImport,
  IconUserCheck,
  IconWallet,
} from '@tabler/icons-react';

import { MenuItemType } from '@/lib/types';

// // Define types for menu items
// interface BaseMenuItem {
//   id: string;
//   title: ReactNode;
//   type: 'group' | 'collapse' | 'item';
//   children?: MenuItem[];
//   icon?: React.ComponentType<any>;
//   url?: string;
// }

const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap,
  IconMessageReport,
  IconWallet,
  IconBread,
  IconTableImport,
  IconNews,
  IconBuilding,
  IconSettings,
  IconCurrency,
  IconCashBanknote,
  IconUserCheck,
  IconCircle,
  IconFileInvoice,
  IconReportAnalytics,
  IconReport,
  IconFiles,
  IconChartBar,
  IconBuildingStore,
  IconArchive,
  IconKey,
};

const parameter: MenuItemType = {
  id: 'parameter-settings',
  title: 'Parametres',
  type: 'group',
  url: '/zones-geographiques/pays',
  children: [
    {
      id: 'global-settings',
      title: 'Globale',
      type: 'collapse',
      url: '/zones-geographiques/pays',
      icon: icons.IconSettings,
      children: [
        {
          id: 'zones-geographiques',
          title: 'zones-geographiques',
          type: 'collapse',
          url: '/zones-geographiques/pays',
          children: [
            {
              id: 'pays',
              title: 'Pays',
              type: 'item',
              url: '/zones-geographiques/pays',
            },
            {
              id: 'commune',
              title: 'Commune',
              type: 'item',
              url: '/zones-geographiques/commune',
            },
          ],
        },
        {
          id: 'activites',
          title: 'activites',
          type: 'collapse',
          url: '/zones-geographiques/pays',
          children: [
            {
              id: 'secteur-activites',
              title: 'Secteurs activites',
              type: 'item',
              url: '/zones-geographiques/pays',
            },
            {
              id: 'commune',
              title: 'Commune',
              type: 'item',
              url: '/zones-geographiques/commune',
            },
          ],
        },
      ],
    },
  ],
};

const menuItems = {
  items: [parameter],
};

export default menuItems;
