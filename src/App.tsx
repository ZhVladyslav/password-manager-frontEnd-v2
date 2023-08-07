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
      {/* <Router /> */}
      <Box sx={{ h: 200, w: '100%', bgColor: 'Grey 700', opacity: '0.5', contentX: 'center', px: 20, mxContent: 10 }}>
        <Box
          sx={{
            bgColor: 'Error Dark',
            h: 100,
            w: 100,
            p: 10,
            contentX: 'center',
            contentY: 'center',
            borderRadius: '24px',
          }}
        >
          <Text content="test" variant="h1" />
        </Box>
        <Box
          sx={{
            bgColor: 'Error Dark',
            h: 100,
            w: 100,
            p: 10,
            contentX: 'center',
            contentY: 'center',
            borderRadius: '24px',
          }}
        >
          фі
        </Box>
        <Box
          sx={{
            bgColor: 'Error Dark',
            h: 100,
            w: 100,
            p: 10,
            contentX: 'center',
            contentY: 'center',
            borderRadius: '24px',
          }}
        >
          фі
        </Box>
      </Box>
    </>
  );
}
