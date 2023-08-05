import React, { useEffect, useState } from 'react';
import { SvgEdit, SvgLogout, SvgMenu, SvgPlus, SvgProtect, SvgTrash } from '../../assets';
import { jwtAuth } from '../../auth/jwtAuth';
import { ButtonRound, ContextMenu, Loader } from '../../components';
import { Header } from '../../modules';
import { useSelector } from '../../redux/store';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord } from '../../types/decryptGroupType';
import { IStore } from '../../types/storeType';
import Create from './Create/Create';
import Delete from './Delete/Delete';
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

  const [sidebarActive, setSidebarActive] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [addRecord, setAddRecord] = useState<IDecryptGroutRecord | null>(null);
  const [deleteWarn, setDeleteWarn] = useState<{
    name: string;
    id: string;
    type: 'record' | 'group';
  } | null>(null);

  const protect = () => {
    setGroupById(null);
    setDecryptGroup(null);
    setPassword(null);
  };

  useEffect(() => {
    const checkCombination = (event: KeyboardEvent) => {
      if (/^[qQйЙ]$/.test(event.key) && event.ctrlKey) {
        protect();
      }
      if (/^[lLдД]$/.test(event.key) && event.ctrlKey) {
        jwtAuth.logout();
      }
    };

    //
    //
    //

    // key down
    const handleKeyDown = (event: KeyboardEvent) => {
      checkCombination(event);
    };

    // resize window
    function handleResize() {
      setWindowSize(window.innerWidth);
      if (window.innerWidth > 700) setSidebarActive(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="Dashboard-Container">
        <Sidebar
          allGroups={allGroups}
          setAllGroups={setAllGroups}
          groupById={groupById}
          setGroupById={setGroupById}
          setDecryptGroup={setDecryptGroup}
          windowSize={windowSize}
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
        />
        <div className="View-Container">
          <Header
            title={groupById?.name}
            menuButton={
              windowSize < 700 && (
                <ButtonRound onClick={() => setSidebarActive(true)}>
                  <SvgMenu />
                </ButtonRound>
              )
            }
            buttonBlock={
              <>
                {groupById && !decryptGroup && (
                  <ContextMenu
                    position="top"
                    buttons={[
                      // {
                      //   cb: () => console.log('edit name'),
                      //   title: 'Edit name',
                      //   svg: <SvgEdit />,
                      // },
                      {
                        cb: () => setDeleteWarn({ id: groupById.id, name: groupById.name, type: 'group' }),
                        color: 'red',
                        title: 'Delete collection',
                        svg: <SvgTrash />,
                      },
                    ]}
                  />
                )}
                {groupById && decryptGroup && (
                  <ContextMenu
                    position="top"
                    buttons={[
                      {
                        cb: () => setAddRecord({ id: '', name: '', email: '', password: '', url: '', description: '' }),
                        title: 'Add record',
                        svg: <SvgPlus />,
                      },
                      // {
                      //   cb: () => console.log(1),
                      //   title: 'Edit name',
                      //   svg: <SvgEdit />,
                      // },
                      {
                        cb: () => setDeleteWarn({ id: groupById.id, name: groupById.name, type: 'group' }),
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
              setDeleteWarn={setDeleteWarn}
              setAddRecord={setAddRecord}
            />
          )}
        </div>

        {addRecord && (
          <Create
            addRecord={addRecord}
            onClose={() => setAddRecord(null)}
            decryptGroup={decryptGroup}
            password={password}
            groupById={groupById}
            setDecryptGroup={setDecryptGroup}
            setGroupById={setGroupById}
          />
        )}

        {deleteWarn && (
          <Delete
            onClose={() => setDeleteWarn(null)}
            deleteWarn={deleteWarn}
            password={password}
            decryptGroup={decryptGroup}
            setDecryptGroup={setDecryptGroup}
            groupById={groupById}
            setGroupById={setGroupById}
            protect={protect}
            allGroups={allGroups}
            setAllGroups={setAllGroups}
          />
        )}
      </div>
    </>
  );
};

// ----------------------------------------------------------------------

export default Dashboard;
