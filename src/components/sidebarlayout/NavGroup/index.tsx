// 'use client';

// import { useState } from 'react';
// import { Divider, List, Typography } from '@mui/material';
// import useTheme from '@mui/material/styles/useTheme';

// import NavCollapse from '../NavCollapse';
// import NavItem from '../NavItem';

// // ---- Define menu item types ----
// export type MenuItemType = {
//   id: string;
//   type: 'collapse' | 'item' | string;
//   title?: string;
//   caption?: string;
//   roles?: string[];
//   children?: MenuItemType[];
//   [key: string]: any; // fallback for extra fields
// };

// export type NavGroupProps = {
//   item: MenuItemType;
// };

// // ---- NavGroup Component ----
// const NavGroup: React.FC<NavGroupProps> = ({ item }) => {
//   const theme = useTheme();
//   const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
//   // const { currentYear, roles = [] } = useContext(AuthContext);

//   const hasRole = (userRoles: string[], menu: MenuItemType) => {
//     if (menu.type === 'item' && (!menu.roles || menu.roles?.length === 0)) return false;
//     return menu.roles?.some((role) => userRoles.includes(role));
//   };

//   const handleClick = (menuId: string) => {
//     setOpenStates((prev) => ({
//       ...prev,
//       [menuId]: !prev[menuId],
//     }));
//   };

//   const items = item.children
//     // If you want to filter menus by role, uncomment the line below
//     // ?.filter((menu) => hasRole(roles, menu))
//     ?.map((menu) => {
//       switch (menu.type) {
//         case 'collapse':
//           return <NavCollapse key={menu.id} menu={menu} level={1} openStates={openStates} handleClick={handleClick} />;
//         case 'item':
//           return <NavItem key={menu.id} item={menu} level={1} />;
//         default:
//           return (
//             <Typography key={menu.id} variant="h6" color="error" align="center">
//               Menu Items Error
//             </Typography>
//           );
//       }
//     });

//   return (
//     <>
//       <List
//         subheader={
//           item.title && (
//             <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
//               {item.title}
//               {item.caption && (
//                 <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
//                   {item.caption}
//                 </Typography>
//               )}
//             </Typography>
//           )
//         }
//       >
//         {items}
//       </List>
//       <Divider sx={{ mt: 0.25, mb: 1.25 }} />
//     </>
//   );
// };

// export default NavGroup;
