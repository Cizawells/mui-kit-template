import colors from '@/themes/theme.module.scss';
import { type Direction, experimental_extendTheme } from '@mui/material/styles';

import { type CustomizationState } from '@/lib/store/features/customization/customizationSlice';

import componentStyleOverrides from './compStyleOverrides';
import customShadows from './shadows';
import themePalette from './theme.palette';
import type { Theme } from './types';
import themeTypography from './typography';

declare module '@mui/material/styles/createPalette' {
  interface PaletteRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  }

  interface Palette {
    neutral: PaletteRange;
  }

  interface PaletteOptions {
    neutral?: PaletteRange;
  }

  interface TypeBackground {
    level1: string;
    level2: string;
    level3: string;
  }
}

export function createTheme(customization: CustomizationState): Theme {
  const themeOption = {
    colors,
    heading: colors.grey900,
    paper: colors.paper,
    backgroundDefault: colors.paper,
    background: colors.darkBackground,
    darkTextPrimary: colors.grey700,
    darkTextSecondary: colors.grey500,
    textDark: colors.grey900,
    menuSelected: colors.secondaryDark,
    menuSelectedBack: colors.secondaryLight,
    divider: colors.grey200,
    customization,
  };
  const themeOptions = {
    direction: customization.rtlLayout ? 'rtl' : ('ltr' as Direction),
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '28px',
        padding: '1px',
        '@media (min-width: 600px)': {
          minHeight: '28px',
        },
      },
    },
    typography: themeTypography(themeOption),
    customShadows: customShadows(customization.navType, themeOption),
  };
  const theme = experimental_extendTheme(themeOptions);
  theme.components = componentStyleOverrides(themeOption);

  return theme;
}
