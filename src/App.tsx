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
      <Box
        sx={{
          h: 200,
          w: '100%',
          bgColor: 'Grey 700',
          opacity: 0.4,
          contentX: 'center',
          contentY: 'center',
          px: 20,
          mxContent: 10,
        }}
      >
        <Box
          sx={{
            h: 100,
            w: 100,
            bgColor: 'Grey 600',
            borderRadius: '24px',
            contentX: 'center',
            p: 10,
            contentY: 'center',
          }}
        >
          <Text
            content="testsssssss ssssssssssads dsdddddddddddddddd"
            sx={{
              color: 'Primary Light',
              h: 70,
              w: 70,
              textOverflow: 'ellipsis',
              fontSize: '1rem',
            }}
          />
        </Box>
      </Box>
    </>
  );
}
