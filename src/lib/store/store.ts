import { configureStore } from '@reduxjs/toolkit';

import CustomizationReducer from './features/customization/customizationSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      customization: CustomizationReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
