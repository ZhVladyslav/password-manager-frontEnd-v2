import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types/store.type';

export default function UserViewPage() {
  const store = useSelector((state: IStore) => state.user);

  return (
    <>
      <div>
        <span>User View</span> <br />
        <span>User name: {store.name}</span>
      </div>
    </>
  );
}
