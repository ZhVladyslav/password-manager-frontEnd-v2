import React, { useState } from 'react';
import { SvgEdit, SvgLogout, SvgPlus, SvgProtect, SvgTrash } from '../../assets';
import { jwtAuth } from '../../auth/jwtAuth';
import { ButtonRound, ContextMenu, Loader } from '../../components';
import { Header } from '../../modules';
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
        />
        <div className="View-Container">
          <Header
            title={groupById?.name}
            buttonBlock={
              <>
                {decryptGroup && (
                  <ContextMenu
                    position="top"
                    buttons={[
                      {
                        cb: () => console.log(1),
                        title: 'Add',
                        svg: <SvgPlus />,
                      },
                      {
                        cb: () => console.log(1),
                        title: 'Edit name',
                        svg: <SvgEdit />,
                      },
                      {
                        cb: () => console.log(1),
                        color: 'red',
                        title: 'Delete collection',
                        svg: <SvgTrash />,
                      },
                    ]}
                  />
                )}
                <ButtonRound>
                  <SvgProtect onClick={protect} />
                </ButtonRound>
                <ButtonRound>
                  <SvgLogout onClick={() => jwtAuth.logout()} />
                </ButtonRound>
              </>
            }
          />

          {isLoading && <Loader />}

          {!groupById && !decryptGroup && <Plug />}

          {!decryptGroup && groupById && (
            <DecryptGroupForm setPassword={setPassword} groupById={groupById} setDecryptGroup={setDecryptGroup} />
          )}

          {decryptGroup && (
            <View
              setDecryptGroup={setDecryptGroup}
              password={password}
              decryptGroup={decryptGroup}
              groupById={groupById}
              setGroupById={setGroupById}
            />
          )}
        </div>
      </div>
    </>
  );
};

// ----------------------------------------------------------------------

export default Dashboard;
