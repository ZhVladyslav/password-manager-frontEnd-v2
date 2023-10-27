import React, { useEffect, useState, useContext } from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { IPassCollection } from '../../types/passCollection.type';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME, PATH_PASS_COLLECTION, PATH_PASS_COLLECTION_DECRYPT } from '../../routes/paths';
import style from './list.page.module.scss';
import { Button, HeaderBlock, RadioButton, Table } from '../../components';
import { SvgTrash } from '../../assets';

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
      <HeaderBlock>
        <Button type="submit" title="To create" onClick={() => navigate(PATH_PASS_COLLECTION.CREATE)} />
        <Button type="submit" title="To home" onClick={() => navigate(PATH_HOME.HOME)} />
      </HeaderBlock>

      <Table
        head={['Number', 'Name', 'Last update', 'Create date', '']}
        size={{ width: 'calc(100vw - 300px)', height: 'calc(100vh - 80px)' }}
      >
        {dataList &&
          dataList.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
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
              <td>
                <RadioButton svg={<SvgTrash />} onClick={() => deleteData(item.id)} />
              </td>
            </tr>
          ))}
      </Table>
    </>
  );
}
