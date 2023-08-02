import React, { useState } from 'react';
import { Loader } from '../../components';
import { useSelector } from '../../redux/store';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout } from '../../types/decryptGroupType';
import { IStore } from '../../types/storeType';
import './index.scss';
import Sidebar from './Sidebar';
import View from './View';
import DecryptGroupForm from './View/DecryptGroupForm/DecryptGroupForm';
import Plug from './View/plug/Plug';

// ----------------------------------------------------------------------

const Dashboard: React.FC = () => {
  const isLoading = useSelector((state: IStore) => state.user.isLoading);

  const [allGroups, setAllGroups] = useState<IGetAllGroups_Res[]>([]);
  const [groupById, setGroupById] = useState<IGetByIdGroups_Res | null>(null);
  const [decryptGroup, setDecryptGroup] = useState<IDecryptGrout | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const protect = () => {
    setGroupById(null);
    setDecryptGroup(null);
    setPassword(null);
  };

  return (
    <>
      <div className="Dashboard-Container">
        <Sidebar
          allGroups={allGroups}
          setAllGroups={setAllGroups}
          groupById={groupById}
          setGroupById={setGroupById}
          setDecryptGroup={setDecryptGroup}
          protect={protect}
        />
        <div className="View-Container">
          {isLoading && <Loader />}

          {!groupById && !decryptGroup && <Plug />}
          {!decryptGroup && groupById && (
            <DecryptGroupForm setPassword={setPassword} groupById={groupById} setDecryptGroup={setDecryptGroup} />
          )}
          {decryptGroup && <View
          setDecryptGroup={setDecryptGroup}
          password={password}
          decryptGroup={decryptGroup}
          groupById={groupById}
          setGroupById={setGroupById}
          />}
        </div>
      </div>
    </>
  );
};

// ----------------------------------------------------------------------

export default Dashboard;
