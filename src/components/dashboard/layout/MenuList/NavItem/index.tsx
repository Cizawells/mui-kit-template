import { forwardRef, useEffect } from 'react';
import Link from 'next/link';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  type Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setIsOpen } from '@/lib/store/features/customization/customizationSlice';
import { type RootState } from '@/lib/store/store';
import { type MenuItemType } from '@/lib/types';

// import { MENU_OPEN, SET_MENU } from 'store/actions';

// ==============================|| NAV ITEM ||============================== //

interface NavItemProps {
  item: MenuItemType;
  level: number;
}

interface ComponentProps {
  item: MenuItemType;
  itemTarget?: string;
}

const Component = forwardRef<HTMLAnchorElement, ComponentProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ item, itemTarget, ...props }, ref) => <Link href={item.url} ref={ref} {...props} />
);
Component.displayName = 'Component';

const NavItem: React.FC<NavItemProps> = ({ item, level }) => {
  console.log('itemmmmm collaposeeee', item);
  const openMenu = useSelector((state: RootState) => state.customization.openMenu);
  const theme: Theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state: RootState) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const componentLink = (item: MenuItemType, target: string) =>
    forwardRef<HTMLAnchorElement, any>((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={target} href={item.url} />
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
    console.log('idddd', id);
    debugger;
    dispatch(setIsOpen(id)); // dispatch action with new state
  };

  useEffect(() => {
    const currentIndex = document.location.pathname.split('/').findIndex((id) => id === item.id);
    // if (currentIndex > -1) dispatch({ type: MENU_OPEN, id: item.id });
  }, [dispatch, item.id]);

  return (
    <ListItemButton
      component={
        // item?.external
        //   ?
        'a'
        // : forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>((props, ref) => (
        //     <Link href={item.url!} ref={ref} {...props} />
        //   ))
      } // pass component type, NOT element
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={customization.isOpen.findIndex((id) => id === item?.id) > -1}
      onClick={() => { itemHandler(item?.id); }}
    >
      <ListItemIcon
        sx={{
          my: 'auto',
          minWidth: !item?.icon ? 18 : 36,
        }}
      >
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 'h5' : 'body1'}
            fontWeight={customization.isOpen.findIndex((id) => id === item?.id) > -1 ? '600' : 'inherit'}
            color="inherit"
          >
            {item?.title}
          </Typography>
        }
        secondary={
          item?.caption ? <Typography
              variant="caption"
              // sx={{ ...theme.typography.subMenuCaption }}
              sx={{ ...(theme.typography as any).subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item?.caption}
            </Typography> : null
        }
      />
      {item?.chip ? <Chip
          color={item?.chip.color}
          variant={item?.chip.variant}
          size={item?.chip.size}
          label={item?.chip.label}
          // avatar={item?.chip.avatar && <Avatar>{item?.chip.avatar}</Avatar>}
        /> : null}
    </ListItemButton>
  );
};

export default NavItem;
