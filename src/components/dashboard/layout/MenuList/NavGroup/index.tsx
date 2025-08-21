import React, { useState } from 'react';
import { Divider, List, Theme, Typography, useTheme } from '@mui/material';

// import AuthContext from 'contexts/JWTContext';

import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';

// ==============================|| NAV GROUP ||============================== //

interface MenuItemType {
  id: string;
  type: 'group' | 'collapse' | 'item';
  title: React.ReactNode;
  caption?: React.ReactNode;
  icon?: React.ComponentType<any>;
  url?: string;
  roles?: string[];
  children?: MenuItemType[];
}

interface NavGroupProps {
  item: MenuItemType;
}

interface OpenStates {
  [key: string]: boolean;
}

const NavGroup: React.FC<NavGroupProps> = ({ item }) => {
  const theme: Theme = useTheme();
  const [openStates, setOpenStates] = useState<OpenStates>({});
  //   const { currentYear, roles } = useContext(AuthContext);

  const hasRole = (userRoles: string[], menu: MenuItemType) => {
    if (menu.id === 'article') console.log('articleee', menu);
    if (menu.type === 'item' && (!menu.roles || menu.roles.length === 0)) return false;
    return menu.roles?.some((role) => userRoles.includes(role));
  };

  const handleClick = (menuId: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const items = item.children
    // ?.filter((menu) => hasRole(roles, menu)) // Uncomment if role-based filtering is needed
    ?.map((menu) => {
      switch (menu.type) {
        case 'collapse':
          return <NavCollapse key={menu.id} menu={menu} level={1} openStates={openStates} handleClick={handleClick} />;
        case 'item':
          return <NavItem key={menu.id} item={menu} level={1} />;
        default:
          return (
            <Typography key={menu.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{}} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{}} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

export default NavGroup;
