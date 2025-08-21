import { forwardRef, useEffect } from 'react';
import Link from 'next/link';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// import { MENU_OPEN, SET_MENU } from 'store/actions';

// ==============================|| NAV ITEM ||============================== //

interface MenuItemType {
  id: string;
  title: React.ReactNode;
  caption?: React.ReactNode;
  icon?: React.ComponentType<any>;
  url?: string;
  external?: boolean;
  target?: string;
  disabled?: boolean;
  chip?: {
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    variant?: 'filled' | 'outlined';
    size?: 'small' | 'medium';
    label: React.ReactNode;
    avatar?: React.ReactNode;
  };
}

interface NavItemProps {
  item: MenuItemType;
  level: number;
}

const NavItem: React.FC<NavItemProps> = ({ item, level }) => {
  const theme: Theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state: any) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const componentLink = (item: MenuItemType, target: string) =>
    forwardRef<HTMLAnchorElement, any>((props, ref) => (
      <Link ref={ref} {...props} to={item.url!} target={target} href={item.url!} />
    ));

  const Icon = item.icon;
  const isOpen = false;
  const itemIcon = Icon ? (
    <Icon stroke={isOpen ? 2.5 : 1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{ width: isOpen ? 8 : 6, height: isOpen ? 8 : 6 }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  const itemTarget = item.target || '_self';

  const itemHandler = (id: string) => {
    // dispatch({ type: MENU_OPEN, id });
    // if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  useEffect(() => {
    const currentIndex = document.location.pathname.split('/').findIndex((id) => id === item.id);
    // if (currentIndex > -1) dispatch({ type: MENU_OPEN, id: item.id });
  }, [dispatch, item.id]);

  return (
    <ListItemButton
      component={item.external ? 'a' : componentLink(item, itemTarget)}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={isOpen}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={isOpen ? 'h5' : 'h5'} fontWeight={isOpen ? 600 : 'inherit'} color="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography sx={{}} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          //   avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
