import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  // {
  //   type: 'group',
  //   title: 'Settings',
  //   key: 'settings',
  //   items: [
  //     {
  //       type: 'item',
  //       title: 'Settings',
  //       key: 'settings',
  //     },
  //   ],
  // },
  { type: 'item', key: 'pays', title: 'pays', href: paths.pays, icon: 'chart-pie' },
  // { type: 'item', key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  // {
  //   type: 'item',
  //   key: 'integrations',
  //   title: 'Integrations',
  //   href: paths.dashboard.integrations,
  //   icon: 'plugs-connected',
  // },
  // { type: 'item', key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { type: 'item', key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { type: 'item', key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
