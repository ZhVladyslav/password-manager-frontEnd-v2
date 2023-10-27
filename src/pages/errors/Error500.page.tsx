import React from 'react';
import { ErrorComponent } from '../../components';

export default function Error500Page() {
  return (
    <ErrorComponent
      code="500"
      title="500 Internal Server Error"
      description="There was an error, please try again later."
    />
  );
}
