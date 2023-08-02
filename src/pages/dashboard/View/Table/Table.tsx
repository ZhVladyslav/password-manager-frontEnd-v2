import React from 'react';
import { SvgEdit, SvgTrash } from '../../../../assets';
import { ButtonRound, ContextMenu } from '../../../../components';
import { collectionService } from '../../../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord } from '../../../../types/decryptGroupType';
import { decrypt, encrypt } from '../../../../utils/crypto';
import './Table.scss';

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

interface IProps {
  password: string | null;
  setEditId: (data: string) => void;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setGroupById: (data: IGetByIdGroups_Res | null) => void;
  groupById: IGetByIdGroups_Res | null;
  decryptGroup: IDecryptGrout | null;
  setWarn: (data: IDecryptGroutRecord | null) => void;
  warn: IDecryptGroutRecord | null;
}

// ----------------------------------------------------------------------

const Table: React.FC<IProps> = ({
  setWarn,
  decryptGroup,
  groupById,
  password,
  warn,
  setEditId,
  setGroupById,
  setDecryptGroup,
}) => {
  // delete record
  const deleteRecord = async () => {
    if (!decryptGroup || !groupById || !password || !warn) return;
    try {
      decrypt(groupById.data, password);
      const updateDecryptGroup = {
        ...decryptGroup,
        collectionData: decryptGroup.collectionData.filter((item) => item.id !== warn.id),
      };
      const encryptUpGroup = encrypt(JSON.stringify(updateDecryptGroup), password);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroupById({ ...groupById, data: encryptUpGroup });
      setDecryptGroup(updateDecryptGroup);
      setWarn(null);
    } catch (err) {
      setWarn(null);
      console.error('Error password to decrypt');
    }
  };

  return (
    <>
      <div className="CollectionTable-Container">
        {/* <HeadButtons headerButtons={headerButtons} /> */}

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
              {decryptGroup &&
                decryptGroup.collectionData.map((item, i) => (
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
                      <ButtonRound onClick={() => setEditId(item.id)}>
                        <SvgEdit />
                      </ButtonRound>
                      <ContextMenu
                        buttons={[
                          {
                            cb: () => setEditId(item.id),
                            title: 'Edit',
                            svg: <SvgEdit />,
                          },
                          {
                            cb: () => setWarn(item),
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
    </>
  );
};

// ----------------------------------------------------------------------

export default Table;
