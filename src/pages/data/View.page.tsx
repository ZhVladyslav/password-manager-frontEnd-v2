import React, { useEffect, useContext, useState } from 'react';
import { PassCollectionContext } from '../../layouts/Collection.layout';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH_PASS_COLLECTION, PATH_PASS_COLLECTION_DECRYPT, PATH_ERROR } from '../../routes/paths';
import { passCollectionService } from '../../services/passCollection.service';
import { uuid } from '../../utils/uuid';
import { Button, HeaderBlock, Table } from '../../components';
import style from './view.page.module.scss';
import { SvgHiddenPassword } from '../../assets';

export default function DataViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passCollectionContext = useContext(PassCollectionContext);

  const [viewIndex, setViewIndex] = useState<number | null>(null);

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

  const viewRecord = (id: string) => {
    if (!passCollectionContext.decryptCollectionData) return;
    const index = passCollectionContext.decryptCollectionData.collectionData.findIndex((item) => item.id === id);
    setViewIndex(index);
  };

  return (
    <>
      <div className={style.contentContainer}>
        <HeaderBlock leftSpace={<h2>{passCollectionContext.collectionInDb.name}</h2>}>
          <Button type="submit" title="To list" onClick={() => passCollectionContext.clearContext()} />
          <Button type="submit" title="Delete collection" onClick={() => deleteData()} />
          <Button type="submit" title="Edit" onClick={() => navigate(`${PATH_PASS_COLLECTION_DECRYPT.EDIT}/${id}`)} />
          <Button type="submit" title="Lock" onClick={() => passCollectionContext.clearContext()} />
        </HeaderBlock>

        <div className={style.main}>
          <Table
            head={['Number', 'Name', 'Email', 'Password', '']}
            size={{ width: 'calc(100vw - 410px)', height: 'calc(100vh - 90px)' }}
          >
            {passCollectionContext.decryptCollectionData.collectionData.map((item, i) => (
              <tr key={item.id}>
                <td data-size="100px">{i + 1}</td>
                <td data-size="200px" onClick={() => viewRecord(item.id)}>
                  {item.name}
                </td>
                <td data-size="200px">{item.email}</td>
                <td data-size="150px">{item.password}</td>
                <td></td>
              </tr>
            ))}
          </Table>

          <div className={style.sidebar}>
            {viewIndex === null && (
              <div className={style.notSetIndexCollection}>
                <div className={style.svgContainer}>
                  <SvgHiddenPassword />
                </div>
                <span>Select your record to view it content</span>
              </div>
            )}

            {viewIndex !== null && passCollectionContext.decryptCollectionData && (
              <div className={style.sidebar_container}>
                <h2>{passCollectionContext.decryptCollectionData.collectionData[viewIndex].name}</h2>

                <span>{`Url: ${passCollectionContext.decryptCollectionData.collectionData[viewIndex].url}`}</span>
                <span>{`Email: ${passCollectionContext.decryptCollectionData.collectionData[viewIndex].email}`}</span>
                <span>{`Password: ${passCollectionContext.decryptCollectionData.collectionData[viewIndex].password}`}</span>
                <span>{`Description: ${passCollectionContext.decryptCollectionData.collectionData[viewIndex].description}`}</span>

                {Object.keys(passCollectionContext.decryptCollectionData.collectionData[viewIndex]).map(
                  (itemKeys, i) => {
                    if (!passCollectionContext.decryptCollectionData) return null;
                    if (itemKeys === 'id') return null;
                    if (itemKeys === 'name') return null;
                    if (itemKeys === 'url') return null;
                    if (itemKeys === 'email') return null;
                    if (itemKeys === 'password') return null;
                    if (itemKeys === 'description') return null;

                    return (
                      <span key={i}>
                        {`${itemKeys}: ${passCollectionContext.decryptCollectionData.collectionData[viewIndex][itemKeys]}`}
                      </span>
                    );
                  },
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
