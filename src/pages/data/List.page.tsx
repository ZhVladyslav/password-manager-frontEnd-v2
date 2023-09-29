import React, { useEffect, useState } from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { IPassCollection } from '../../types/passCollection.type';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { PATH_DATA } from '../../routes/paths';

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
    setDataList((prom) => prom && prom.filter((item) => item.id !== id));
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <>
      {dataList &&
        dataList.map((item) => (
          <div key={item.id} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
            <span
              onClick={() => {
                navigate(PATH_DATA.VIEW(item.id));
              }}
            >
              {item.name}
            </span>
            <span>{formatDate(item.createDate)}</span>
            <span>{formatDate(item.lastUpdate)}</span>
            <span onClick={() => deleteData(item.id)}>DELETE</span>
          </div>
        ))}
    </>
  );
}