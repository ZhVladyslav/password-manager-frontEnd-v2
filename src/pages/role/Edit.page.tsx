import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RoleEditPage() {
  const { id } = useParams();

  return (
    <>
      <div>
        <span>RoleEditPage</span>
      </div>
    </>
  );
}
