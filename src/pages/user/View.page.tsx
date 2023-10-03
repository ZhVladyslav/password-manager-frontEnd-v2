import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types/store.type';

export default function UserViewPage() {
  const store = useSelector((state: IStore) => state);
  console.log(store);
  
  return (
    <>
      <div>
        <span>User View</span>
      </div>
    </>
  );
}
