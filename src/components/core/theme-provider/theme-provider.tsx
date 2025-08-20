'use client';

import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  // Get theme customization from Redux slice
  const customization = useSelector((state: any) => state.customization);
  console.log('custommmmm', customization);

  // Create dynamic MUI theme based on Redux state
  const theme: Theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: customization.navType, // 'light' | 'dark'
          primary: { main: customization.presetColor },
        },
        typography: {
          fontFamily: customization.fontFamily,
          fontSize: customization.fontSize || 14,
        },
        shape: {
          borderRadius: customization.borderRadius,
        },
      }),
    []
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
