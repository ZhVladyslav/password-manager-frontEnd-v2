import React, { useState, useEffect } from 'react';
import { ButtonDefault, ButtonSidebar } from '../../../components';
import { userActions } from '../../../redux/actions/userActions';
import { utilsActions } from '../../../redux/actions/utilsActions';
import { collectionService } from '../../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../../types/collectionType';
import { IDecryptGrout } from '../../../types/decryptGroupType';
import CreateGroupForm from './CreateGroupForm/CreateGroupForm';
import './index.scss';
import Logo from '../../../assets/logo.png';

// ----------------------------------------------------------------------

interface IProps {
  groupById: IGetByIdGroups_Res | null;
  allGroups: IGetAllGroups_Res[] | [];
  windowSize: number;
  sidebarActive: boolean;
  setSidebarActive: (data: boolean) => void;

  setAllGroups: (data: IGetAllGroups_Res[] | []) => void;
  setGroupById: (data: IGetByIdGroups_Res | null) => void;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
}

// ----------------------------------------------------------------------

const Sidebar: React.FC<IProps> = ({
  setAllGroups,
  allGroups,
  groupById,
  setGroupById,
  setDecryptGroup,
  windowSize,
  sidebarActive,
  setSidebarActive,
}) => {
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    getAllGroups();
  }, []);

  /* ----------------  Requests  ---------------- */

  // get All groups
  const getAllGroups = async () => {
    utilsActions.loading(true);
    const result = await collectionService.getAll();
    utilsActions.loading(false);
    if (result.err) return;
    setAllGroups(result.res);
  };

  // get group by id
  const getGroupById = async (id: string) => {
    userActions.loading(true);
    setDecryptGroup(null);
    const result = await collectionService.getById(id);
    userActions.loading(false);
    if (result.err) return;
    setGroupById(result.res);
  };

  function sortByName() {
    return allGroups.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  }

  const desktopUI = () => {
    return (
      <div className="Dashboard-Sidebar-Container">
        <div className="logo">
          <img src={Logo} />
        </div>
        <div className="buttonContainer">
          {sortByName().map((item) => (
            <ButtonSidebar
              key={item.id}
              title={item.name}
              onClick={() => {
                getGroupById(item.id);
                if (windowSize <= 700) setSidebarActive(false);
              }}
              isActive={groupById?.id === item.id}
            />
          ))}
          <ButtonDefault
            title="Add group"
            onClick={() => {
              setIsCreate(true);
              if (windowSize <= 700) setSidebarActive(false);
            }}
            foolSize
            style="border"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {windowSize > 700 && desktopUI()}

      {windowSize <= 700 && sidebarActive && (
        <div className="SidebarMobileContainer" onClick={() => setSidebarActive(false)}>
          <div className="inner-SidebarMobileContainer" onClick={(e) => e.stopPropagation()}>
            {desktopUI()}
          </div>
        </div>
      )}

      {isCreate && (
        <CreateGroupForm getAllGroups={getAllGroups} getGroupById={getGroupById} setIsCreate={setIsCreate} />
      )}
    </>
  );
};

// ----------------------------------------------------------------------

export default Sidebar;
