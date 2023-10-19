import React, { useEffect, useState, useContext } from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { IPassCollection } from '../../types/passCollection.type';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME, PATH_PASS_COLLECTION, PATH_PASS_COLLECTION_DECRYPT } from '../../routes/paths';
import style from './list.page.module.scss';
import Button from '../../components/Button.component';
import Table from '../../components/Table.component';

export default function DataListPage() {
  const navigate = useNavigate();

  const [dataList, setDataList] = useState<IPassCollection[] | null>(null);

  const getDataList = async () => {
    const res = await passCollectionService.getAll();
    if (!res) return;
    setDataList(res);
  };

  const deleteData = async (id: string) => {
    const res = await passCollectionService.delete({ id });
    if (!res) return;
    setDataList((prev) => prev && prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <>
      <div className={style.contentContainer}>
        <div className={style.buttonContainer}>
          <Button type="submit" title="To create" onClick={() => navigate(PATH_PASS_COLLECTION.CREATE)} />
          <Button type="submit" title="To home" onClick={() => navigate(PATH_HOME.HOME)} />
        </div>

        <Table head={['Name', 'Last update', 'Create date', '']} size={{ width: 'calc(100vw - 300px)', height: 'calc(100vh - 90px)' }}>
          {dataList &&
            dataList.map((item) => (
              <tr key={item.id}>
                <td>
                  <span
                    className={style.tableRowName}
                    onClick={() => {
                      navigate(`${PATH_PASS_COLLECTION_DECRYPT.DECRYPT}/${item.id}`);
                    }}
                  >
                    {item.name}
                  </span>
                </td>
                <td>{formatDate(item.lastUpdate)}</td>
                <td>{formatDate(item.createDate)}</td>
                <td onClick={() => deleteData(item.id)}>DELETE</td>
              </tr>
            ))}
        </Table>
      </div>
    </>
  );
}
