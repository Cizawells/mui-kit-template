import React from 'react';
import Typography from '@mui/material/Typography';

import { MenuItemType } from '@/lib/types';

import NavGroup from './NavGroup';
import menuItem from './parameters';

// ==============================|| SIDEBAR MENU LIST ||============================== //

// Type for a menu item (matches the structure in menu-items)

const MenuList: React.FC = () => {
  const navItems = menuItem?.items?.map((item: MenuItemType) => {
    switch (item.type) {
      case 'group':
        return <NavGroup item={item} />;
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
