import React from 'react';
import { ErrorComponent } from '../../components';

export default function Error404Page() {
  return (
    <ErrorComponent
      code="404"
      title="Sorry, Page Not Found!"
      description="Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling."
    />
  );
}
