'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Drawer, type Theme, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
// third-party
import { BrowserView, MobileView } from 'react-device-detect';

import { useAppSelector } from '@/lib/store/hoooks';

import MenuList from './MenuList';

// Dynamically import PerfectScrollbar only on client-side
const PerfectScrollbar = dynamic(() => import('react-perfect-scrollbar'), {
  ssr: false,
});

// project imports
// import LogoSection from '../LogoSection';

// Static value instead of imported constant
const DRAWER_WIDTH = 240;

// ==============================|| SIDEBAR DRAWER ||============================== //

interface SidebarProps {
  window?: () => Window;
}

const Sidebar: React.FC<SidebarProps> = ({ window }) => {
  const openMenu = useAppSelector((state) => state.customization.openMenu);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const drawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const theme: Theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawerContent = (
    <>
      {/* Logo only on mobile */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>ITAS</Box>
      </Box>

      {/* Scrollable menu for browser */}
      <BrowserView>
        <Scrollbars style={{ height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)' }}>
          <MenuList />
        </Scrollbars>
      </BrowserView>

      {/* Menu for mobile view */}
      <MobileView>
        <Box sx={{ px: 2 }}>{/* <MenuList /> */}</Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    // <Box
    //   component="nav"
    //   sx={{ flexShrink: { md: 0 }, width: matchUpMd ? DRAWER_WIDTH : 'auto', backgroundColor: 'red' }}
    //   aria-label="sidebar navigation"
    // >
    <Drawer
      container={container}
      variant={matchUpMd ? 'persistent' : 'temporary'}
      anchor="left"
      open={openMenu}
      onClose={drawerToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          background: 'white',
          color: theme.palette.text.primary,
          borderRight: 'none',
          [theme.breakpoints.up('md')]: {
            // top: '50px',
          },
        },
      }}
      ModalProps={{ keepMounted: true }}
      color="inherit"
    >
      {drawerContent}
    </Drawer>
    // </Box>
  );
};

export default Sidebar;
