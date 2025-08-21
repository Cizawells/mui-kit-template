'use client';

import * as React from 'react';
import { AppBar, Avatar, Badge, ButtonBase, IconButton, Stack, Toolbar, Tooltip, useTheme } from '@mui/material';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { IconMenu2 } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '@/lib/store/hoooks';
import { usePopover } from '@/hooks/use-popover';

import { setOpenMenu } from '../../../lib/store/features/customization/customizationSlice';
import { MobileNav } from './mobile-nav';
import { UserPopover } from './user-popover';

const drawerWidth = 240; // must match your SideNav width

export function MainNav(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const openMenu = useAppSelector((state) => state.customization.openMenu);
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const theme = useTheme();
  const userPopover = usePopover<HTMLDivElement>();

  const handleLeftDrawerToggle = () => {
    dispatch(setOpenMenu(!openMenu));
  };

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          color: 'white',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#08569e',
          borderBottom: '1px solid var(--mui-palette-divider)',
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(openMenu && {
            marginLeft: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme) =>
              theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
        }}
      >
        <Toolbar sx={{ minHeight: '64px', justifyContent: 'space-between' }}>
          {/* Left side */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Tooltip title="Menu">
              <ButtonBase>
                <Avatar
                  variant="rounded"
                  sx={{
                    transition: 'all .2s ease-in-out',
                    color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                    '&:hover': {
                      background:
                        theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                      color:
                        theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light,
                    },
                  }}
                  onClick={handleLeftDrawerToggle}
                >
                  <IconMenu2 stroke={1.5} size="1.3rem" />
                </Avatar>
              </ButtonBase>
            </Tooltip>
          </Stack>

          {/* Right side */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Tooltip title="Contacts">
              <IconButton>
                <UsersIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <Badge badgeContent={4} color="success" variant="dot">
                <IconButton>
                  <BellIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src="/assets/avatar.png"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Toolbar>
      </AppBar>

      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />

      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
