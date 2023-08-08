import React from 'react';
import Router from './routes';
import './App.scss';
import { useSelector } from './redux/store';
import { IStore } from './types/storeType';
import { Loader } from './components';
import { Box, Text } from './components/@zh';

// ----------------------------------------------------------------------

export default function App() {
  const isLoading = useSelector((state: IStore) => state.utils.isLoading);

  return (
    <>
      {isLoading && <Loader />}
      <Router />
    </>
  );
}
