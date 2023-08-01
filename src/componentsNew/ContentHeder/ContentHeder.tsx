import React from 'react';
import ButtonDefault from '../buttons/ButtonDefault/ButtonDefault';
import './ContentHeder.scss';

// ----------------------------------------------------------------------

interface IProps {
  title: string;
  onClick: () => void;
  onDelete: () => void;
}

// ----------------------------------------------------------------------

const ContentHeder: React.FC<IProps> = ({ title, onClick, onDelete }) => {
  return (
    <div className="ContentHeder-Container">
      <div className="ContentHeder">
        <div className="title">
          <h4>{title}</h4>
        </div>
        <div className="buttons">
          <ButtonDefault title="Delete group" style="bg Red" onClick={onDelete} />
          <ButtonDefault title="Add record" style="bg White" onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default ContentHeder;
