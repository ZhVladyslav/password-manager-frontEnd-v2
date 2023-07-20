import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_COLLECTION, PATH_MAIN } from '../../routes/paths';
import { collectionService } from '../../services/collectionServices';
import { ICreateCollectionReq } from '../../types/collectionType';

// ----------------------------------------------------------------------

export default function CollectionCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ICreateCollectionReq>({
    name: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form validation or other checks here
    const data = await collectionService.create(formData);
    if (data.err) return;
    navigate(PATH_COLLECTION.list);
  };

  return (
    <>
      <Link to={PATH_MAIN.home}>To home</Link> <br />
      <Link to={PATH_COLLECTION.list}>Go to list collection</Link> <br />
      <hr />
      <form onSubmit={handleSubmit}>
        <label>
          name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
