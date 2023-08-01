import { useState, useEffect } from 'react';

interface IProps {
  inputs: boolean[];
}

// ----------------------------------------------------------------------

const useFormLogin = ({ inputs }: IProps) => {
  const [valid, setValid] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    const inputsIsValid = inputs.every((item) => item);

    if (inputsIsValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [inputs]);

  return { valid, setErrorText, errorText };
};

// ----------------------------------------------------------------------

export { useFormLogin };
