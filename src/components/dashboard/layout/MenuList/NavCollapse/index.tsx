import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Theme, Typography, useTheme } from '@mui/material';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
// import AuthContext from 'contexts/JWTContext';
import { useSelector } from 'react-redux';

import { MenuItemType } from '@/lib/types';

import NavItem from '../NavItem';

// ==============================|| NAV COLLAPSE ||============================== //

interface NavCollapseProps {
  menu: MenuItemType;
  level: number;
  openStates: Record<string, boolean>;
  handleClick: (id: string) => void;
}

const NavCollapse: React.FC<NavCollapseProps> = ({ menu, level, openStates, handleClick }) => {
  const theme: Theme = useTheme();
  const customization = useSelector((state: any) => state.customization);
  //   const { roles } = useContext(AuthContext);

  const isOpen = openStates[menu.id] || false;

  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return (
          <NavCollapse key={item.id} menu={item} level={level + 1} openStates={openStates} handleClick={handleClick} />
        );
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = Icon ? (
    <Icon strokeWidth={1.5} size="1.3rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: isOpen ? 8 : 6,
        height: isOpen ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
        }}
        selected={isOpen}
        onClick={() => handleClick(menu.id)}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={isOpen ? 'body1' : 'body1'}
              color="inherit"
              sx={{ my: 'auto' }}
              fontWeight={isOpen ? 600 : 'inherit'}
            >
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography variant="caption" sx={{}} display="block" gutterBottom>
                {menu.caption}
              </Typography>
            )
          }
        />
        {isOpen ? (
          <IconChevronUp stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        ) : (
          <IconChevronDown stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        )}
      </ListItemButton>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: theme.palette.mode === 'dark' ? 0.2 : 1,
              background: 'white',
            },
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};

export default NavCollapse;
