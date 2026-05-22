import { logout } from '@/utils/authUtils';
import {
  Action,
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
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
import AuctionReducer, { AUCTION_SLICE_KEY } from './slices/auction.slice';
import AuthReducer, { AUTH_SLICE_KEY } from './slices/auth.slice';
import ProductReducer, { PRODUCT_SLICE_KEY } from './slices/product.slice';

export const combinedReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  [AUTH_SLICE_KEY]: AuthReducer,
  [PRODUCT_SLICE_KEY]: ProductReducer,
  [AUCTION_SLICE_KEY]: AuctionReducer,
});

export const rootReducer = (
  rootState: ReturnType<typeof combinedReducer> | undefined,
  action: Action & { payload: unknown },
) => {
  // Redux reducers automatically initialize default state when state is undefined
  if (action.type === 'RESET_STORE') {
    rootState = undefined;
    //reducer cannot perform side effects such as persistor.purge
    //so i have created a listener middleware to do it.
    //logout action is dispatched from rootApi, listener middleware listens to it then dispatched RESET_STORE
    //exporting normal function with persistor.purge from here, then calling it in rootApi did not work, as it caused a circular dependency
  }

  if (action.type === 'SET_AUTH_TOKEN' && rootState) {
    rootState = {
      ...rootState,

      [AUTH_SLICE_KEY]: {
        ...rootState[AUTH_SLICE_KEY],
        authToken: action.payload as string,
        user: rootState[AUTH_SLICE_KEY].user,
      },
    };
  }

  return combinedReducer(rootState, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [AUTH_SLICE_KEY],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        //Ignore redux-persist actions, redux expects actions to be JSON,
        //  but redux-persists dispatches actions with functions, which redux shows warnings about
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat(rootApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

//to enable auto-refetch in case of window focus, network reconnect, and polling
setupListeners(store.dispatch);

export const persistor = persistStore(store);

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: async (_action, api) => {
    api.dispatch({ type: 'RESET_STORE' });
    await persistor.purge();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
