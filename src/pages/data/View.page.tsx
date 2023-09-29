import React, { useContext } from 'react';
import { PassCollectionContext } from '../../layouts/Collection.layout';

export default function DataViewPage() {
  const passCollectionContext = useContext(PassCollectionContext);

  if (!passCollectionContext || !passCollectionContext.decryptCollectionData || !passCollectionContext.collectionInDb)
    return <></>;

  return (
    <>
      <div>
        <span>{passCollectionContext.collectionInDb.name}</span>
      </div>
      <div>
        {passCollectionContext.decryptCollectionData.collectionData.map((item, i) => (
          <div key={item.id}>
            {Object.keys(item).map((itemKeys) => (
              <div key={`${item.id}_${itemKeys}`}>{`${itemKeys}: ${item[itemKeys]}`}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
