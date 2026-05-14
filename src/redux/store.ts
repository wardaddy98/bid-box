import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootApi } from './rootApi';
import AuthReducer, { AUTH_SLICE_KEY } from './slices/auth.slice';

export const combinedReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  [AUTH_SLICE_KEY]: AuthReducer,
});

//root reducer is defined separately as a wrapper to combineReducers to implement RESET_STORE functionality
export const rootReducer = (
  rootState: ReturnType<typeof combinedReducer> | undefined,
  action: Action,
) => {
  if (action.type === 'RESET_STORE') {
    // Redux reducers initialize default state when state is undefined
    rootState = undefined;
  }

  return combinedReducer(rootState, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [AUTH_SLICE_KEY],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        //Ignore redux-persist actions, redux expects actions to be JSON,
        //  but redux-persists dispatches actions with functions, which redux shows warnings about
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rootApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

//to enable auto-refetch in case of window focus, network reconnect, and polling
setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
