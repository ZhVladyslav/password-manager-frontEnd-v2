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
          h: 'calc(100% - 240px)',
          mg: '24px',
          borderRadius: '24px',
          horizontalContent: 'center',
          verticalContent: 'center',
          mgContent: 'top',
        }}
      >
        <div>asd</div>
      </Block>
    </>
  );
}
