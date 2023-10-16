import React, { useEffect, useContext } from 'react';
import { PassCollectionContext } from '../../layouts/Collection.layout';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH_PASS_COLLECTION, PATH_PASS_COLLECTION_DECRYPT, PATH_ERROR, PATH_HOME } from '../../routes/paths';
import { passCollectionService } from '../../services/passCollection.service';
import { uuid } from '../../utils/uuid';
import Button from '../../components/Button.component';
import style from './list.page.module.scss';

export default function DataViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passCollectionContext = useContext(PassCollectionContext);

  useEffect(() => {
    if (!id || !uuid.check(id)) {
      navigate(PATH_ERROR[404]);
      return;
    }
  }, []);

  if (!passCollectionContext || !passCollectionContext.decryptCollectionData || !passCollectionContext.collectionInDb)
    return <Navigate to={PATH_PASS_COLLECTION.LIST} />;

  const deleteData = async () => {
    if (!id) return;
    const res = await passCollectionService.delete({ id });
    passCollectionContext.clearContext();
  };

  return (
    <>
      <div className={style.contentContainer}>
        <div className={style.buttonContainer}>
          <Button type="submit" title="To list" onClick={() => passCollectionContext.clearContext()} />
          <Button type="submit" title="Delete collection" onClick={() => deleteData()} />
          <Button type="submit" title="Edit" onClick={() => navigate(`${PATH_PASS_COLLECTION_DECRYPT.EDIT}/${id}`)} />
          <Button type="submit" title="Lock" onClick={() => passCollectionContext.clearContext()} />
        </div>

        <div className={style.tableContainer}>
          <table>
            {/* HEAD */}
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>
            {/* BODY */}
            <tbody>
              {passCollectionContext.decryptCollectionData.collectionData.map((item, i) => (
                <>
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
