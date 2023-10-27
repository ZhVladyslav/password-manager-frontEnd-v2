import React from 'react';
import { ErrorComponent } from '../../components';

export default function Error403Page() {
  return (
    <ErrorComponent
      code="403"
      title="No permission"
      description="The page you're trying access has restricted access.
  Please refer to your system administrator"
    />
  );
}
