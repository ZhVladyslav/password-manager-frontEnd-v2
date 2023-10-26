import React, { useEffect, useState } from 'react';
import { useSelector } from '../../redux/store';
import { IStore } from '../../types/store.type';
import { userService } from '../../services/user.service';
import { userActions } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME } from '../../routes/paths';
import { sessionActions } from '../../redux/actions/sessionActions';
import { userSession } from '../../auth/userSession';
import style from './settings.page.module.scss';
import InputText from '../../components/InputText.component';
import { useInputText } from '../../hooks/useInputText.hook';
import Button from '../../components/Button.component';
import Table from '../../components/Table.component';
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
