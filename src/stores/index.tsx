import { configureStore } from '@reduxjs/toolkit';
// 引入主题换肤store分库
import themeReducer from './slices/theme';
import authReducer from './slices/auth';
import modalSlice from './slices/modal';
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    modal: modalSlice,
  },
});
