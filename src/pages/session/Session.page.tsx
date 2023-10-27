import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../components';
import { formatDate } from '../../utils/formatDate';
import { sessionService } from '../../services/session.service';
import { ISession } from '../../types/session.type';

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
      <Table
        head={['Number', 'Create date', 'Expire date', '']}
        size={{ width: 'calc(100vw - 300px)', height: '200px' }}
      >
        {sessionList.map((item, i) => (
          <tr key={i}>
            <td data-size="100px">{i + 1}</td>
            <td data-size="200px">{formatDate(item.createDate)}</td>
            <td data-size="200px">{formatDate(item.expDate)}</td>
            <td data-size="100px" onClick={() => close(item.id)}>
              CLOSE
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
