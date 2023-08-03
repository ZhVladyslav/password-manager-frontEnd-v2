import React, { useEffect, useRef, useState } from 'react';
import { SvgEdit, SvgTrash } from '../../../../assets';
import { ButtonRound, ButtonsTableHead, ContextMenu } from '../../../../components';
import { IDecryptGrout, IDecryptGroutRecord } from '../../../../types/decryptGroupType';
import './Table.scss';

// ----------------------------------------------------------------------

const headerButtons = ['All', 'Main', 'Other'];

const headerTable = [
  { width: 150, title: 'Name' },
  { width: 150, title: 'URL' },
  { width: 200, title: 'Email' },
  { width: 100, title: 'Password' },
  {},
  { width: 88 },
];

// ----------------------------------------------------------------------

interface IProps {
  setEditId: (data: string) => void;
  decryptGroup: IDecryptGrout | null;
  setWarn: (data: IDecryptGroutRecord | null) => void;
}

// ----------------------------------------------------------------------

const Table: React.FC<IProps> = ({ setWarn, decryptGroup, setEditId }) => {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const tableSizeRef = useRef<HTMLDivElement>(null);
  const scrollHorizontalContainerRef = useRef<HTMLDivElement>(null);

  const [scrollSize, setScrollSize] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [tableSize, setTableSize] = useState({ height: 0, width: 0 });

  //
  const getSizes = () => {
    if (!tableSizeRef.current) return;
    if (!scrollHorizontalContainerRef.current) return;
    if (!scrollableContainerRef.current) return;

    const tableSize = tableSizeRef.current.getBoundingClientRect();
    const scrollSize = scrollHorizontalContainerRef.current.getBoundingClientRect();

    setTableSize({ height: tableSize.height, width: scrollableContainerRef.current.clientWidth });

    const scrollWidth = scrollSize.width;
    const tableWidth = tableSize.width;

    const a = tableWidth - scrollableContainerRef.current.clientWidth;
    const b = scrollWidth - a;

    if (
      b < 0 ||
      scrollableContainerRef.current.clientWidth < 0 ||
      scrollHorizontalContainerRef.current.scrollWidth + 20 === scrollableContainerRef.current.scrollWidth
    ) {
      setScrollSize(0);
      return;
    }
    setScrollSize(b);
  };

  //
  const scroll = () => {
    if (!scrollableContainerRef.current) return;
    setScrollPosition(scrollableContainerRef.current.scrollLeft);
  };

  //
  useEffect(() => {
    getSizes();

    window.addEventListener('resize', getSizes);
    return () => {
      window.removeEventListener('resize', getSizes);
    };
  }, []);

  // delete record
  // const deleteRecord = async () => {
  //   if (!decryptGroup || !groupById || !password || !warn) return;
  //   try {
  //     decrypt(groupById.data, password);
  //     const updateDecryptGroup = {
  //       ...decryptGroup,
  //       collectionData: decryptGroup.collectionData.filter((item) => item.id !== warn.id),
  //     };
  //     const encryptUpGroup = encrypt(JSON.stringify(updateDecryptGroup), password);
  //     const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
  //     if (result.err) return;
  //     setGroupById({ ...groupById, data: encryptUpGroup });
  //     setDecryptGroup(updateDecryptGroup);
  //     setWarn(null);
  //   } catch (err) {
  //     setWarn(null);
  //     console.error('Error password to decrypt');
  //   }
  // };

  return (
    <>
      <div className="CollectionTable-Container">
        <ButtonsTableHead buttons={headerButtons} />

        <div className="scrolls">
          <div className="CollectionTable-Content" onScroll={scroll} ref={scrollableContainerRef}>
            <div ref={tableSizeRef} className="CollectionTable">
              <table style={{ width: tableSize.width }}>
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

          <div className="scrollVertical"></div>
          <div className="scrollHorizontal" ref={scrollHorizontalContainerRef}>
            <div className="scroll" style={{ width: scrollSize, left: scrollPosition }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

// ----------------------------------------------------------------------

export default Table;
