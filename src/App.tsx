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
          bColor: 'Grey 800',
          h: '400px',
          py: '10px',
          contentX: 'center',
          contentY: 'right',
          mlContent: '10px',
        }}
      >
        <div>asd</div>
      </Box>
    </>
  );
}
