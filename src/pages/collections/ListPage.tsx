import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH_COLLECTION, PATH_MAIN } from '../../routes/paths';
import { collectionService } from '../../services/collectionServices';
import { IEditInfoCollection, IGetAllCollectionsRes } from '../../types/collectionType';

// ----------------------------------------------------------------------

export default function CollectionListPage() {
  const [collectionList, setCollectionList] = useState<IGetAllCollectionsRes[]>([]);

  const getCollections = async () => {
    const data = await collectionService.getAll();
    if (data.err) return;
    setCollectionList(data.res);
  };

  const setStar = async (collection: any /* IEditInfoCollection */, id: number) => {
    const data = await collectionService.editInfo({
      passCollectionId: collection.id,
      name: collection.name,
      star: !collection.star,
    });
    if (data.err) return;
    setCollectionList(
      collectionList.map((item, i) => {
        if (i === id) {
          return { id: collection.id, name: collection.name, star: !collection.star };
        }
        return item;
      }),
    );
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <>
      <Link to={PATH_MAIN.home}>To home</Link> <br />
      <hr />
      {collectionList.map((item, i) => (
        <div key={item.id}>
          <span>
            <b>{`id: `}</b>
            <Link to={`${PATH_COLLECTION.view}/${item.id}`}>{`${item.id}`}</Link>
          </span>
          <br />
          <span>
            <b>{`name: `}</b>
            {`${item.name}`}
          </span>
          <br />
          <span>
            <b>{`star: `}</b>
            <button onClick={() => setStar(item, i)}>{`${item.star}`}</button>
          </span>
          <br />
          <br />
          <br />
        </div>
      ))}
    </>
  );
}
