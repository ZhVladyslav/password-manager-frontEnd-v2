import React from 'react';
import { SvgEdit, SvgTrash } from '../../../assets';
import { IDecryptGrout } from '../../../types/decryptGroupType';
import ButtonRound from '../../buttons/ButtonRound/ButtonRound';
import HeadButtons from '../../buttons/HeadButtons/HeadButtons';
import ContextMenu from '../../ContextMenu/ContextMenu';
import './TableDefault.scss';

// ----------------------------------------------------------------------

interface IProps {
  decryptGroup: IDecryptGrout;
  onDelete: (data: string) => void;
  onEdit: (data: string) => void;
}

// ----------------------------------------------------------------------

const headerButtons = ['All', 'Main', 'Other'];

const headerTable = [
  { width: 100, title: 'Name' },
  { width: 100, title: 'URL' },
  { width: 100, title: 'Email' },
  { width: 100, title: 'Password' },
  {},
  { width: 88 },
];

// ----------------------------------------------------------------------

const TableDefault: React.FC<IProps> = ({ decryptGroup, onDelete, onEdit }) => {
  return (
    <div className="TableDefault-Container">
      <HeadButtons headerButtons={headerButtons} />

      <div className="TableDefault">
        <table>
          <thead>
            <tr>
              {headerTable.map((item, i) => (
                <th key={i} style={{ width: item.width }}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {decryptGroup.collectionData.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.url}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td></td>
                <td className="buttonContainer">
                  <ButtonRound onClick={() => onEdit(item.id)}>
                    <SvgEdit />
                  </ButtonRound>
                  <ContextMenu
                    buttons={[
                      {
                        cb: () => onEdit(item.id),
                        title: 'Edit',
                        svg: <SvgEdit />,
                      },
                      {
                        cb: () => onDelete(item.id),
                        title: 'Delete',
                        color: 'red',
                        svg: <SvgTrash />,
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default TableDefault;
