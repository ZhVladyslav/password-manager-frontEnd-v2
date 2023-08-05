import React from 'react';
import Router from './routes';
import './App.scss';
import { useSelector } from './redux/store';
import { IStore } from './types/storeType';
import { Loader } from './components';
import { Block } from './components/@zh';

// ----------------------------------------------------------------------

export default function App() {
  const isLoading = useSelector((state: IStore) => state.utils.isLoading);

  return (
    <>
      {isLoading && <Loader />}
      {/* <Router /> */}
      <Block
        sx={{
          height: 'calc(100% - 240px)',
          margin: '24px',
          borderRadius: '24px',
          horizontalContent: 'center',
          verticalContent: 'center',
          marginContent: 'top',
        }}
      >
        <div>asd</div>
      </Block>
    </>
  );
}
