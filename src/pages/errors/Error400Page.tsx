import React from 'react';

// ----------------------------------------------------------------------

interface iError400 {
  test?: boolean;
}

// ----------------------------------------------------------------------

export default function Error400Page(props: iError400) {
  return <>Error 400 {`${props.test}`}</>;
}
