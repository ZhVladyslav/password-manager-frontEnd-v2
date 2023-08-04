import React, { useEffect } from 'react';
import { ButtonDefault, InputText, useInputText } from '../../../../components';
import { useForm } from '../../../../hooks/useForm';
import { FormDefault } from '../../../../modules';
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

  useEffect(() => {
    passwordInput.dropState();
    form.setErrorText(null);
  }, [groupById]);

  const submit = () => {
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

  return (
    <div className="DecryptGroupForm-Container">
      <FormDefault
        form={form}
        titlePosition="left"
        onSubmit={submit}
        title="Decrypt"
        buttons={<ButtonDefault title="Decrypt" style="bg White" foolSize />}
      >
        <InputText
          title="Password"
          error={passwordInput.error}
          onBlur={passwordInput.onBlur}
          onChange={passwordInput.onChange}
          value={passwordInput.value}
        />
      </FormDefault>
    </div>
  );
};

// ----------------------------------------------------------------------

export default DecryptGroupForm;
