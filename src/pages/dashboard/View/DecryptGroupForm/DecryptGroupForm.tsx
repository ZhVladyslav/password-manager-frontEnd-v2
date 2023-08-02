import React from 'react';
import { ButtonDefault, InputText, useInputText } from '../../../../components';
import { useForm } from '../../../../hooks/useForm';
import { IGetByIdGroups_Res } from '../../../../types/collectionType';
import { IDecryptGrout } from '../../../../types/decryptGroupType';
import { decrypt } from '../../../../utils/crypto';
import './DecryptGroupForm.scss';

// ----------------------------------------------------------------------

interface IProps {
  groupById: IGetByIdGroups_Res | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setPassword: (data: string | null) => void;
}

// ----------------------------------------------------------------------

const DecryptGroupForm: React.FC<IProps> = ({ groupById, setDecryptGroup, setPassword }) => {
  const passwordInput = useInputText({ reg: /^[0-9A-Za-z @]*$/, errorText: 'Invalid password' });
  const form = useForm({ inputs: [passwordInput.valid] });

  const decryptCollection = () => {
    if (!groupById) return;
    try {
      const decryptDataInText = decrypt(groupById.data, passwordInput.value, true);
      const decryptData: IDecryptGrout = JSON.parse(decryptDataInText);
      setPassword(passwordInput.value);
      setDecryptGroup(decryptData);
      form.setErrorText(null);
    } catch (err) {
      form.setErrorText('Error password to decrypt');
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    decryptCollection();
  };

  return (
    <div className="DecryptGroupForm-Container">
      <form onSubmit={submit}>
        <span className="title">{`${groupById?.name}`}</span>
        <div className="inputBlock">
          <InputText
            title="Password"
            error={passwordInput.error}
            onBlur={passwordInput.onBlur}
            onChange={passwordInput.onChange}
            value={passwordInput.value}
          />
        </div>

        <div className="buttonBlock">
          <ButtonDefault title="Decrypt" style="bg White" foolSize />
        </div>
        {form.errorText && <span className="error">{form.errorText}</span>}
      </form>
    </div>
  );
};

// ----------------------------------------------------------------------

export default DecryptGroupForm;
