import React from 'react';
import Router from './routes';
import './App.scss';
import { useSelector } from './redux/store';
import { IStore } from './types/storeType';
import { Loader } from './components';
import { Box } from './components/@zh';

// ----------------------------------------------------------------------

export default function App() {
  const isLoading = useSelector((state: IStore) => state.utils.isLoading);

  return (
    <>
      {isLoading && <Loader />}
      {/* <Router /> */}
      <Box
        sx={{
          bgColor: 'Grey 700',
          h: '400px',
          // py: '10px',
          p: 10,
          m: 10,
          contentX: 'bottom',
          contentY: 'right',
          mlContent: '10px',
          // mx: 10,
        }}
      >
        <div>asd</div>
        <div>asd</div>
      </Box>
    </>
  );
}
