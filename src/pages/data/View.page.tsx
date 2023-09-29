import React, { useContext } from 'react';
import { PassCollectionContext } from '../../layouts/Collection.layout';
import { useNavigate } from 'react-router-dom';
import { PATH_DATA } from '../../routes/paths';

export default function DataViewPage() {
  const navigate = useNavigate();
  const passCollectionContext = useContext(PassCollectionContext);

  if (!passCollectionContext || !passCollectionContext.decryptCollectionData || !passCollectionContext.collectionInDb)
    return <></>;

  return (
    <>
      <div>
        <button onClick={() => navigate(PATH_DATA.LIST)}>To list</button>
        <button>DELETE</button>
        <button>EDIT</button>
        <button>LOCK</button>
      </div>
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
