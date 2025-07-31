import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import clientReducer from './slices/clientSlice';
import vendorReducer from './slices/vendorSlice';
import adminReducer from './slices/adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    client: clientReducer,
    vendor: vendorReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Optional: Global logoutAll action
export const logoutAll = () => (dispatch) => {
  dispatch({ type: 'auth/logout' });
  dispatch({ type: 'ui/clearUI' });
  dispatch({ type: 'client/clearClient' });
  dispatch({ type: 'vendor/clearVendor' });
  dispatch({ type: 'admin/clearAdmin' });
};

export default store;
