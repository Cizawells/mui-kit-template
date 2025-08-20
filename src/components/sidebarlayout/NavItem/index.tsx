// 'use client';

// import { forwardRef, useEffect } from 'react';
// import Link, { LinkProps } from 'next/link';
// // assets
// // import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import { useDispatch, useSelector } from 'react-redux';
// // project imports
// // import { MENU_OPEN, SET_MENU } from 'store/actions';

// // ==============================|| TYPES ||============================== //
// export type NavItemType = {
//   id: string;
//   title: string;
//   url?: string;
//   icon?: React.ElementType;
//   target?: boolean;
//   external?: boolean;
//   disabled?: boolean;
//   caption?: string;
//   chip?: {
//     color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
//     variant?: 'filled' | 'outlined';
//     size?: 'small' | 'medium';
//     label: string;
//     avatar?: string;
//   };
// };

// type NavItemProps = {
//   item: NavItemType;
//   level: number;
// };

// // ==============================|| NAV ITEM COMPONENT ||============================== //

// // Helper: Wrap Next.js Link in forwardRef for MUI
// const NextLink = forwardRef<HTMLAnchorElement, LinkProps & { target?: string }>(function NextLink(props, ref) {
//   const { href, target, ...other } = props;
//   return <Link ref={ref} href={href} target={target} {...other} />;
// });

// const NavItem: React.FC<NavItemProps> = ({ item, level }) => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const customization = useSelector((state: any) => state.customization); // ❗ Type your redux state if you have types
//   const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

//   const Icon = item.icon;
//   const isOpen = customization.isOpen.findIndex((id: string) => id === item?.id) > -1;

//   const itemIcon = item?.icon ? (
//     <Icon stroke={isOpen ? 2.5 : 1.5} size="1.3rem" />
//   ) : (
//     <FiberManualRecordIcon
//       sx={{
//         width: isOpen ? 8 : 6,
//         height: isOpen ? 8 : 6,
//       }}
//       fontSize={level > 0 ? 'inherit' : 'medium'}
//     />
//   );

//   const itemTarget = item.target ? '_blank' : '_self';

//   const itemHandler = (id: string) => {
//     dispatch({ type: MENU_OPEN, id });
//     if (matchesSM) dispatch({ type: SET_MENU, opened: false });
//   };

//   // active menu item on page load
//   useEffect(() => {
//     const currentIndex = document.location.pathname
//       .toString()
//       .split('/')
//       .findIndex((id) => id === item.id);
//     if (currentIndex > -1) {
//       dispatch({ type: MENU_OPEN, id: item.id });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <ListItemButton
//       component={
//         item?.external
//           ? 'a'
//           : item.url
//             ? (props: any) => <NextLink {...props} href={item.url!} target={itemTarget} />
//             : 'div'
//       }
//       href={item?.external ? item.url : undefined}
//       target={itemTarget}
//       disabled={item.disabled}
//       sx={{
//         borderRadius: `${customization.borderRadius}px`,
//         mb: 0.5,
//         alignItems: 'flex-start',
//         backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
//         py: level > 1 ? 1 : 1.25,
//         pl: `${level * 24}px`,
//       }}
//       selected={isOpen}
//       onClick={() => itemHandler(item?.id)}
//     >
//       <ListItemIcon
//         sx={{
//           my: 'auto',
//           minWidth: !item?.icon ? 18 : 36,
//         }}
//       >
//         {itemIcon}
//       </ListItemIcon>
//       <ListItemText
//         primary={
//           <Typography variant={isOpen ? 'h5' : 'body1'} fontWeight={isOpen ? '600' : 'inherit'} color="inherit">
//             {item?.title}
//           </Typography>
//         }
//         secondary={
//           item?.caption && (
//             <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
//               {item?.caption}
//             </Typography>
//           )
//         }
//       />
//       {item?.chip && (
//         <Chip
//           color={item?.chip.color}
//           variant={item?.chip.variant}
//           size={item?.chip.size}
//           label={item?.chip.label}
//           avatar={item?.chip.avatar && <Avatar>{item?.chip.avatar}</Avatar>}
//         />
//       )}
//     </ListItemButton>
//   );
// };

// export default NavItem;
