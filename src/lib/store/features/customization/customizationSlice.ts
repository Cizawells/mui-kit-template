// store/slices/customizationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CustomizationState {
  fontFamily: string;
  fontSize: number;
  borderRadius: number;
  navType: 'light' | 'dark';
  presetColor: string;
  openMenu: boolean;
}

const initialState: CustomizationState = {
  fontFamily: 'Roboto, sans-serif',
  fontSize: 14,
  borderRadius: 8,
  navType: 'light',
  presetColor: '#1976d2', // default primary color
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
  },
});

export const { setFontFamily, setFontSize, setBorderRadius, setNavType, setPresetColor, setOpenMenu } =
  customizationSlice.actions;

export default customizationSlice.reducer;
