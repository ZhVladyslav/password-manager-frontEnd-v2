import React, { useState } from 'react';
import { createModuleResolutionCache } from 'typescript';
import { SvgPlus } from '../../assets';
import { ButtonDefault, InputText, useInputText } from '../../componentsNew';
import FormDefault from '../../componentsNew/forms/FormDefault/FormDefault';
import { useForm } from '../../hooks/useForm';
import { IGetAllGroups_Res } from '../../types/collectionType';
import './Group.scss';

// ----------------------------------------------------------------------

interface IProps {
  allGroups: IGetAllGroups_Res[] | [];
  selectGroup: string | undefined;
  getGroupById: (data: string) => void;
}

// ----------------------------------------------------------------------

export default function Group({ allGroups, selectGroup, getGroupById }: IProps) {
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [isDeleteGroup, setIsDeleteGroup] = useState(false);

  const test = useInputText({ reg: /^[0-9]+$/, errorText: 'Error' });
  const formTest = useForm({ inputs: [test.valid] });

  return (
    <>
      <div className="Group">
        <div className="addButtonContainer" onClick={() => setIsCreateGroup(true)}>
          <span className="svgContainer">
            <SvgPlus />
          </span>
        </div>
        <div className="inner-Group">
          {/*  */}
          {allGroups.map((item) => (
            <div key={item.id} className="groupButton" onClick={() => getGroupById(item.id)}>
              <div className="dotContainer">
                <span className={selectGroup === item.id ? 'dotActive' : 'dot'} />
              </div>
              <div className="textContainer">
                <span className={selectGroup === item.id ? 'textActive' : 'text'}>{item.name}</span>
              </div>
            </div>
          ))}
          {/*  */}
        </div>
      </div>

      {/*  */}
      {/*  */}
      {/*  */}

      {isCreateGroup && (
        <>
          <FormDefault
            title="Create group"
            onSubmit={() => console.log(2)}
            formValid={formTest}
            onCloseForm={() => setIsCreateGroup(false)}
          >
            <InputText
              title="Name"
              error={test.error}
              onChange={test.onChange}
              value={test.value}
              onBlur={test.onBlur}
            />
          </FormDefault>
        </>
      )}
    </>
  );
}
