// store/slices/customizationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CustomizationState {
  basename: string;
  defaultPath: string;
  fontFamily: string;
  fontSize?: number; // optional since it's missing in initialState
  borderRadius: number;
  outlinedFilled: boolean;
  theme: 'light' | 'dark';
  presetColor: string;
  i18n: 'en' | 'fr' | 'ro' | 'zh';
  rtlLayout: boolean;
  openMenu: boolean; // optional, not in initialState
  navType: string;
  isOpen: string[];
}

const initialState: CustomizationState = {
  basename: '',
  defaultPath: '/',
  // fontFamily: `Helvetica Neue Light`,
  fontFamily: `'Inter','Roboto', sans-serif`,

  borderRadius: 5,
  outlinedFilled: false,
  theme: 'light', // light, dark
  presetColor: 'theme5', // default, theme1, theme2, theme3, theme4, theme5, theme6
  i18n: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  rtlLayout: false,
  navType: 'light',
  isOpen: [],
  openMenu: true,
};

const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    setBorderRadius: (state, action: PayloadAction<number>) => {
      state.borderRadius = action.payload;
    },
    setNavType: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.navType = action.payload;
    },
    setPresetColor: (state, action: PayloadAction<string>) => {
      state.presetColor = action.payload;
    },
    setOpenMenu: (state, action: PayloadAction<boolean>) => {
      console.log('dispatchinnnng', action.payload);
      state.openMenu = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<string>) => {
      console.log('dispatchinnnng', action.payload);
      state.isOpen = [action.payload];
    },
  },
});

export const { setFontFamily, setFontSize, setBorderRadius, setNavType, setPresetColor, setOpenMenu, setIsOpen } =
  customizationSlice.actions;

export default customizationSlice.reducer;
