'use client';

import { Breadcrumbs } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useAppSelector } from '@/lib/store/hoooks';
import { RootState } from '@/lib/store/store';

const drawerWidth = 240;

const StyledMain = styled('main')<{ open: boolean }>(({ open }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontSize: '1rem',
  lineHeight: 1.5,
  fontWeight: 400,
  transition: 'margin 225ms cubic-bezier(0.4, 0, 0.6, 1)',
  width: '100%',
  marginLeft: 0,
  marginTop: '45px',
  height: 'calc(100vh)',

  backgroundColor: '#EEF2F6',

  ...(open && {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
  }),

  '@media (max-width: 960px)': {
    width: '100%',
    marginLeft: 0, // drawer overlays on mobile
  },

  '@media (max-width: 600px)': {
    padding: '16px',
  },
}));

const Main = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const openMenu = useAppSelector((state: RootState) => state.customization.openMenu);

  return (
    <StyledMain open={openMenu} className={className}>
      <Breadcrumbs />

      {children}
    </StyledMain>
  );
};

export default Main;
