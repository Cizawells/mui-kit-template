import React from 'react';
import Typography from '@mui/material/Typography';

import NavGroup from './NavGroup';
import menuItem from './parameters';

// ==============================|| SIDEBAR MENU LIST ||============================== //

// Type for a menu item (matches the structure in menu-items)
interface MenuItemType {
  id: string;
  type: 'group' | 'collapse' | 'item';
  title: React.ReactNode;
  icon?: React.ComponentType<any>;
  url?: string;
  children?: MenuItemType[];
}

const MenuList: React.FC = () => {
  const navItems = menuItem?.items?.map((item: MenuItemType) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <div>{navItems}</div>;
};

export default MenuList;
