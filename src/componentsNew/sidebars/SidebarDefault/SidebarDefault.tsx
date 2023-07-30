import React from 'react';
import { SvgPlus } from '../../../assets';
import { IGetAllGroups_Res } from '../../../types/collectionType';
import './SidebarDefault.scss';

// ----------------------------------------------------------------------

interface IProps {
  allGroups: IGetAllGroups_Res[] | [];
  selectedGroup: string | undefined;
  onAddGroup: () => void;
  selectGroup: (data: string) => void;
}

// ----------------------------------------------------------------------

const SidebarDefault: React.FC<IProps> = ({ allGroups, selectedGroup, onAddGroup, selectGroup }) => {
  return (
    <div className="SidebarDefault">
      <div className="addButtonContainer" onClick={onAddGroup}>
        <span className="svgContainer">
          <SvgPlus />
        </span>
      </div>
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
