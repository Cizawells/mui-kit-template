import React, { useState } from 'react';
import { Divider, List, type Theme, Typography, useTheme } from '@mui/material';

// import AuthContext from 'contexts/JWTContext';

import { type MenuItemType } from '@/lib/types';

import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';

// ==============================|| NAV GROUP ||============================== //

type OpenStates = Record<string, boolean>;

const NavGroup: React.FC<{ item: MenuItemType }> = ({ item }: { item: MenuItemType }) => {
  const theme: Theme = useTheme();
  console.log('themeeeeee navgroupp', theme);
  const [openStates, setOpenStates] = useState<OpenStates>({});
  //   const { currentYear, roles } = useContext(AuthContext);

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
          item.title ? <Typography
              variant="caption"
              sx={{ ...(theme.typography as any).menuCaption }}
              display="block"
              gutterBottom
            >
              {item.title}
              {item.caption ? <Typography
                  variant="caption"
                  sx={{ ...(theme.typography as any).subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography> : null}
            </Typography> : null
        }
      >
        {items}
      </List>
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

export default NavGroup;
