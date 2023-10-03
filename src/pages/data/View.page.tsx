import React, { useEffect, useContext } from 'react';
import { PassCollectionContext } from '../../layouts/Collection.layout';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH_DATA, PATH_ERROR } from '../../routes/paths';
import { passCollectionService } from '../../services/passCollection.service';
import { uuid } from '../../utils/uuid';

export default function DataViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passCollectionContext = useContext(PassCollectionContext);

  useEffect(() => {
    if (id) {
      const checkId = uuid.check(id);
      if (!checkId) navigate(PATH_ERROR[404]);
    }
  }, [id]);

  if (!passCollectionContext || !passCollectionContext.decryptCollectionData || !passCollectionContext.collectionInDb)
    return <Navigate to={PATH_DATA.LIST} />;

  const deleteData = async () => {
    if (!id) return;
    const res = await passCollectionService.delete({ id });
    passCollectionContext.clearContext();
  };
  
  return (
    <>
      <div>
        <button onClick={() => passCollectionContext.clearContext()}>To list</button>
        <button onClick={() => deleteData()}>DELETE</button>
        <button onClick={() => navigate(`${PATH_DATA.EDIT}/${id}`)}>EDIT</button>
        <button onClick={() => passCollectionContext.clearContext()}>LOCK</button>
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
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
