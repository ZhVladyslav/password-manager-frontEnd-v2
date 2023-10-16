import React, { useEffect, useState, useContext } from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { IPassCollection } from '../../types/passCollection.type';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME, PATH_PASS_COLLECTION, PATH_PASS_COLLECTION_DECRYPT } from '../../routes/paths';
import style from './list.page.module.scss';
import Button from '../../components/Button.component';

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

        <div className={style.tableContainer}>
          <table>
            {/* HEAD */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Last update</th>
                <th>Create date</th>
                <th></th>
              </tr>
            </thead>
            {/* BODY */}
            <tbody>
              {dataList &&
                dataList.map((item) => (
                  <tr key={item.id}>
                    <td
                      onClick={() => {
                        navigate(`${PATH_PASS_COLLECTION_DECRYPT.DECRYPT}/${item.id}`);
                      }}
                    >
                      {item.name}
                    </td>
                    <td>{formatDate(item.lastUpdate)}</td>
                    <td>{formatDate(item.createDate)}</td>
                    <td onClick={() => deleteData(item.id)}>DELETE</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
