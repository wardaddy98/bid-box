'use client';
import { persistor, store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './loading';

//client side wrapper to provide redux store, persist gate and toast container
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        {children}
      </PersistGate>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="light" />
    </Provider>
  );
};

export default Providers;
