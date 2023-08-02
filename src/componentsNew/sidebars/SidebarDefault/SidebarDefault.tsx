import React from 'react';
import { SvgClose, SvgLogout, SvgPlus, SvgProtect } from '../../../assets';
import { authService } from '../../../services/authServices';
import { IGetAllGroups_Res } from '../../../types/collectionType';
import ButtonRound from '../../buttons/ButtonRound/ButtonRound';
import './SidebarDefault.scss';

// ----------------------------------------------------------------------

interface IProps {
  allGroups: IGetAllGroups_Res[] | [];
  selectedGroup: string | undefined;
  onAddGroup: () => void;
  selectGroup: (data: string) => void;
  protectClick: () => void;
}

// ----------------------------------------------------------------------

const SidebarDefault: React.FC<IProps> = ({ allGroups, selectedGroup, onAddGroup, selectGroup, protectClick }) => {
  const logout = () => {
    console.log(2);
  };

  return (
    <div className="SidebarDefault">
      <div className="addButtonContainer" onClick={onAddGroup}>
        <span className="svgContainer">
          <SvgPlus />
        </span>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="OptionalButtons">
        <ButtonRound onClick={protectClick}>
          <SvgProtect />
        </ButtonRound>
        <ButtonRound onClick={logout}>
          <SvgLogout />
        </ButtonRound>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="inner-Group">
        {/*  */}
        {allGroups.map((item) => (
          <div key={item.id} className="groupButton" onClick={() => selectGroup(item.id)}>
            <div className="dotContainer">
              <span className={selectedGroup === item.id ? 'dotActive' : 'dot'} />
            </div>
            <div className="textContainer">
              <span className={selectedGroup === item.id ? 'textActive' : 'text'}>{item.name}</span>
            </div>
          </div>
        ))}
        {/*  */}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default SidebarDefault;
