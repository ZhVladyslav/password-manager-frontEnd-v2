import React, { useEffect, useState } from 'react';
import { collectionService } from '../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';

// ----------------------------------------------------------------------

interface IProps {
  allGroups: IGetAllGroups_Res[] | null;
  setAllGroups: (data: IGetAllGroups_Res[] | []) => void;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
}

// ----------------------------------------------------------------------

export default function ViewAllGroup({ allGroups, setAllGroups, setGroup }: IProps) {
  const [nameNewGroup, setNameNewGroup] = useState('');
  const [addGroup, setAddGroup] = useState(false);
  // Get user groups when loading component
  useEffect(() => {
    getAllGroups();
  }, []);

  /* ----------------  Component logic  ---------------- */

  // Get all user groups
  const getAllGroups = async () => {
    const result = await collectionService.getAll();
    if (result.err) return;
    setAllGroups(result.res);
  };

  // Get group by id
  const getGroupById = async (id: string) => {
    const result = await collectionService.getById(id);
    if (result.err) return;
    setGroup(result.res);
  };

  const clickOnGroup = async (id: string) => {
    setGroup(null);
    getGroupById(id);
  };

  const createGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await collectionService.create({ name: nameNewGroup });
    if (result.err) return;
    setAddGroup(false);
    getAllGroups();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameNewGroup(e.target.value);
  };

  const createGroupForm = () => {
    return (
      <form onSubmit={createGroup}>
        <label>
          name:
          <input type="text" name="name" value={nameNewGroup} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  };

  return (
    <>
      <div className="listGroups">
        <div className="inner-listGroups">
          {!addGroup && <div onClick={() => setAddGroup(!addGroup)}>Add</div>}
          {addGroup && createGroupForm()}
          {allGroups &&
            !addGroup &&
            allGroups.map((item) => (
              <div key={item.id} onClick={() => clickOnGroup(item.id)} className="groupButton">
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
