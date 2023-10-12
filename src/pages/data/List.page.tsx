import React, { useEffect, useState, useContext } from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { IPassCollection } from '../../types/passCollection.type';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME, PATH_PASS_COLLECTION, PATH_PASS_COLLECTION_DECRYPT } from '../../routes/paths';
import style from './list.page.module.scss';

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
      <div className={style.tableContainer}>
        <div className={style.tableRow_head}>
          <div className={style.tableColumn}>Test</div>
        </div>
        <div className={style.tableRow_body}>
          {dataList &&
            dataList.map((item) => (
              <div key={item.id} className={style.tableColumn_container}>
                <div
                  className={style.tableColumn}
                  onClick={() => {
                    navigate(`${PATH_PASS_COLLECTION_DECRYPT.DECRYPT}/${item.id}`);
                  }}
                >
                  {item.name}
                </div>
                <div className={style.tableColumn}>{formatDate(item.createDate)}</div>
                <div className={style.tableColumn}>{formatDate(item.lastUpdate)}</div>
                <div className={style.tableColumn} onClick={() => deleteData(item.id)}>
                  DELETE
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={style.buttonsBlock}>
        <button onClick={() => navigate(PATH_PASS_COLLECTION.CREATE)}>To create</button>
        <button onClick={() => navigate(PATH_HOME.HOME)}>To home</button>
      </div>
    </>
  );
}
