import React from 'react';
import Router from './routes';
import './App.scss';
import { useSelector } from './redux/store';
import { IStore } from './types/storeType';
import { Loader } from './components';
import { Box, Button, Text } from './components/@zh';
import { SvgClose } from './assets';

// ----------------------------------------------------------------------

export default function App() {
  const isLoading = useSelector((state: IStore) => state.utils.isLoading);

  return (
    <>
      {isLoading && <Loader />}
      {/* <Router /> */}
      <div className="flex">
        <div className="space-y-4 space-x-4">
          <div></div>
          <Button svg={<SvgClose />} size="large" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="large" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} svgPosition="right"></Button>
          <Button svg={<SvgClose />} variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} size="small" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="small" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" variant="soft" svgPosition="left"></Button>
        </div>
        <div className="space-y-4 space-x-4">
          <div></div>
          <Button svg={<SvgClose />} size="large" color="error" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="large" color="error" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" color="error" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" color="error" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} color="error" svgPosition="right"></Button>
          <Button svg={<SvgClose />} color="error" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} color="error" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} color="error" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} size="small" color="error" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="small" color="error" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" color="error" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" color="error" variant="soft" svgPosition="left"></Button>
        </div>
        <div className="space-y-4 space-x-4">
          <div></div>
          <Button svg={<SvgClose />} size="large" color="info" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="large" color="info" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" color="info" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" color="info" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} color="info" svgPosition="right"></Button>
          <Button svg={<SvgClose />} color="info" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} color="info" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} color="info" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} size="small" color="info" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="small" color="info" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" color="info" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" color="info" variant="soft" svgPosition="left"></Button>
        </div>
        <div className="space-y-4 space-x-4">
          <div></div>
          <Button svg={<SvgClose />} size="large" color="primary" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="large" color="primary" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" color="primary" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" color="primary" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} color="primary" svgPosition="right"></Button>
          <Button svg={<SvgClose />} color="primary" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} color="primary" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} color="primary" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} size="small" color="primary" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="small" color="primary" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" color="primary" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" color="primary" variant="soft" svgPosition="left"></Button>
        </div>
        <div className="space-y-4 space-x-4">
          <div></div>
          <Button svg={<SvgClose />} size="large" color="success" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="large" color="success" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" color="success" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" color="success" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} color="success" svgPosition="right"></Button>
          <Button svg={<SvgClose />} color="success" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} color="success" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} color="success" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} size="small" color="success" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="small" color="success" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" color="success" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" color="success" variant="soft" svgPosition="left"></Button>
        </div>
        <div className="space-y-4 space-x-4">
          <div></div>
          <Button svg={<SvgClose />} size="large" color="warn" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="large" color="warn" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" color="warn" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="large" color="warn" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} color="warn" svgPosition="right"></Button>
          <Button svg={<SvgClose />} color="warn" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} color="warn" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} color="warn" variant="soft" svgPosition="left"></Button>
          <hr />
          <Button svg={<SvgClose />} size="small" color="warn" svgPosition="right"></Button>
          <Button svg={<SvgClose />} size="small" color="warn" variant="outlined" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" color="warn" variant="text" svgPosition="left"></Button>
          <Button svg={<SvgClose />} size="small" color="warn" variant="soft" svgPosition="left"></Button>
        </div>
      </div>
    </>
  );
}
