import React, { useEffect, useState } from 'react';
import { collectionService } from '../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord, IUserFields } from '../../types/decryptGroupType';
import CryptoJS from 'crypto-js';
import { Header2 } from '../headers';
import Input, { EnumTypes } from '../Input';
import Form from '../Form';
import './ViewRecordInGroup.scss';
import { ButtonSvg } from '../buttons';
import { SvgClose, SvgPlus } from '../../assets';

// ----------------------------------------------------------------------

interface IProps {
  viewDecryptData: IDecryptGroutRecord | null;
  decryptGroup: IDecryptGrout | null;
  group: IGetByIdGroups_Res | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setViewDecryptData: (data: IDecryptGroutRecord | null) => void;
  decryptPassword: string;
  setDecryptPassword: (data: string) => void;
  popupStatus: boolean;
  setPopupStatus: (data: boolean) => void;
}

// ----------------------------------------------------------------------

export default function ViewRecordData({
  viewDecryptData,
  decryptGroup,
  group,
  setViewDecryptData,
  setDecryptGroup,
  decryptPassword,
  setDecryptPassword,
  popupStatus,
  setPopupStatus,
}: IProps) {
  const [addRecord, setAddRecord] = useState(false);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

  const [newRecordName, setNewRecordName] = useState('');
  const [newRecordData, setNewRecordData] = useState('');

  // change
  const changeNameNewNewRecord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecordName(e.target.value);
  };

  // change
  const changeNameToCreateNewRecord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecordData(e.target.value);
  };

  // change password
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDecryptPassword(e.target.value);
  };

  // ----------------------------------------------------------------------

  // Encrypt data
  const encrypt = (text: string, key: string) => {
    return CryptoJS.AES.encrypt(text, key).toString();
  };

  //
  const clickAddRecord = async () => {
    if (!group || !decryptGroup || !viewDecryptData || decryptPassword === '') return;
    try {
      CryptoJS.AES.decrypt(group.data, decryptPassword).toString(CryptoJS.enc.Utf8);
      const upUserFields: IUserFields[] = [
        ...viewDecryptData.userFields,
        { name: newRecordName, text: newRecordData, visible: false },
      ];
      const upDate: IDecryptGrout = {
        ...decryptGroup,
        collectionData: decryptGroup.collectionData.map((item) => {
          if (item.name === viewDecryptData.name) return { name: item.name, userFields: upUserFields };
          return item;
        }),
      };
      const encryptUpGroup: string = encrypt(JSON.stringify(upDate), decryptPassword);
      const result = await collectionService.editData(group.id, encryptUpGroup);
      if (result.err) return;
      setDecryptPassword('');
      setViewDecryptData({ name: viewDecryptData.name, userFields: upUserFields });
      setDecryptGroup(upDate);
      setAddRecord(false);
    } catch (err) {
      console.error('error decrypt');
    }
  };

  useEffect(() => {
    function handleResize() {
      setWindowInnerWidth(window.innerWidth);
      if (window.innerWidth > 700) setPopupStatus(false);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ----------------------------------------------------------------------

  const JsxAddRecord = () => (
    <Form submit={clickAddRecord}>
      <Input
        type={EnumTypes.text}
        name={'FieldName'}
        onChange={changeNameNewNewRecord}
        value={newRecordName}
        label={'Name'}
      />
      <Input
        type={EnumTypes.password}
        name={'FieldPassword'}
        onChange={changeNameToCreateNewRecord}
        value={newRecordData}
        label={'Data'}
      />
      <Input
        type={EnumTypes.password}
        name={'GroupPassword'}
        onChange={changePassword}
        value={decryptPassword}
        label={'Password to group'}
      />
    </Form>
  );

  const desktopUI = () => (
    <div className="viewRecordInGroup-desktop">
      <div className="inner-viewRecordInGroup">
        <Header2
          name={viewDecryptData ? viewDecryptData.name : 'Decrypt to view'}
          buttons={[
            viewDecryptData && <ButtonSvg key={1} svg={<SvgPlus />} onClick={() => setAddRecord(!addRecord)} />,
          ]}
        />

        {addRecord && JsxAddRecord()}

        {viewDecryptData &&
          !addRecord &&
          viewDecryptData.userFields.map((item, i) => (
            <div key={i}>
              <div className="recordName">
                <span>{item.name}</span>
              </div>
              <div className="recordData" onClick={() => navigator.clipboard.writeText(item.text)}>
                {item.text}
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const mobileUI = () => {
    if (!popupStatus) return <></>;

    return (
      <>
        <div className="viewRecordInGroupContainer-mobile" onClick={() => setPopupStatus(false)}>
          <div
            className="viewRecordInGroup-mobile"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <div className="inner-viewRecordInGroup">
              <Header2
                name={viewDecryptData ? viewDecryptData.name : 'Decrypt to view'}
                buttons={[
                  viewDecryptData && <ButtonSvg key={1} svg={<SvgPlus />} onClick={() => setAddRecord(!addRecord)} />,
                  <ButtonSvg key={2} svg={<SvgClose />} onClick={() => setPopupStatus(false)} />,
                ]}
              />

              {addRecord && JsxAddRecord()}

              {viewDecryptData &&
                !addRecord &&
                viewDecryptData.userFields.map((item, i) => (
                  <div key={i}>
                    <div className="recordName">
                      <span>{item.name}</span>
                    </div>
                    <div className="recordData" onClick={() => navigator.clipboard.writeText(item.text)}>
                      {item.text}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{windowInnerWidth <= 700 ? mobileUI() : desktopUI()}</>;
}
