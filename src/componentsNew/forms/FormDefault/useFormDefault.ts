import { useState, useEffect } from 'react';

interface IProps {
  inputs: boolean[];
}

// ----------------------------------------------------------------------

const useFormDefault = ({ inputs }: IProps) => {
  const [valid, setValid] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const inputsIsValid = inputs.every((item) => item);

  useEffect(() => {
    if (inputsIsValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [inputsIsValid]);

  return { valid, setErrorText, errorText };
};

// ----------------------------------------------------------------------

export { useFormDefault };
