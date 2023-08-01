import React, { useState } from 'react';
import { SvgEdit, SvgTrash } from '../../../assets';
import { ButtonDefault, ButtonRound, ContextMenu, FormDefault, HeadButtons, Popup } from '../../../componentsNew';
import { collectionService } from '../../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord } from '../../../types/decryptGroupType';
import { decrypt, encrypt } from '../../../utils/crypto';
import './CollectionTable.scss';

// ----------------------------------------------------------------------

interface IProps {
  decryptPassword: string | null;
  group: IGetByIdGroups_Res | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  decryptGroup: IDecryptGrout;
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

const CollectionTable: React.FC<IProps> = ({
  decryptGroup,
  onEdit,
  decryptPassword,
  group,
  setGroup,
  setDecryptGroup,
}) => {
  const [popupWarn, setPopupWarn] = useState<IDecryptGroutRecord | null>(null);

  // delete record
  const deleteRecord = async () => {
    if (!decryptPassword || !decryptGroup || !group) return;
    if (!popupWarn) return;
    try {
      decrypt(group.data, decryptPassword);
      const updateDecryptGroup = {
        ...decryptGroup,
        collectionData: decryptGroup.collectionData.filter((item) => item.id !== popupWarn.id),
      };
      const encryptUpGroup = encrypt(JSON.stringify(updateDecryptGroup), decryptPassword);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(updateDecryptGroup);
      setPopupWarn(null);
    } catch (err) {
      setPopupWarn(null);
      console.error('Error password to decrypt');
    }
  };

  return (
    <>
      <div className="CollectionTable-Container">
        <HeadButtons headerButtons={headerButtons} />

        <div className="CollectionTable">
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
                  <td className="click" onClick={() => navigator.clipboard.writeText(item.url)}>
                    {item.url}
                  </td>
                  <td className="click" onClick={() => navigator.clipboard.writeText(item.email)}>
                    {item.email}
                  </td>
                  <td
                    className="click"
                    onClick={() => navigator.clipboard.writeText(item.password)}
                  >{`••••••••••••`}</td>
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
                          cb: () => setPopupWarn(item),
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

      {popupWarn && (
        <Popup
          title="Delete record"
          message={`Delete '${popupWarn.name}' collection? these actions are irreversible`}
          onClose={() => setPopupWarn(null)}
        >
          <ButtonDefault title="Close" style="border" onClick={() => setPopupWarn(null)} />
          <ButtonDefault title="Delete" style="bg Red" onClick={deleteRecord} />
        </Popup>
      )}
    </>
  );
};

// ----------------------------------------------------------------------

export default CollectionTable;
