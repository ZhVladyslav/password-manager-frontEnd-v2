import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Block, RadioButton, Table } from '../../components';
import { formatDate } from '../../utils/formatDate';
import { sessionService } from '../../services/session.service';
import { ISession } from '../../types/session.type';
import { SvgTrash } from '../../assets';

export default function UserSessionPage() {
  const navigate = useNavigate();

  const [sessionList, setSessionList] = useState<ISession[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await sessionService.getAll();
    if (!res) return;
    setSessionList(res);
  };

  const close = async (id: string) => {
    await sessionService.delete({ id });
  };

  return (
    <>
      <Block m="10px 0 0 0">
        <Table
          head={['Number', 'Create date', 'Expire date', '']}
          size={{ width: 'calc(100vw - 300px)', height: 'calc(100vh - 20px)' }}
        >
          {sessionList.map((item, i) => (
            <tr key={i}>
              <td data-size="100px">{i + 1}</td>
              <td data-size="200px">{formatDate(item.createDate)}</td>
              <td data-size="200px">{formatDate(item.expDate)}</td>
              <td data-position="end">
                <RadioButton svg={<SvgTrash />} onClick={() => close(item.id)} />
              </td>
            </tr>
          ))}
        </Table>
      </Block>
    </>
  );
}
