import { useState, useEffect } from 'react';

interface IProps {
  inputs: boolean[];
}

// ----------------------------------------------------------------------

const useForm = ({ inputs }: IProps) => {
  const [valid, setValid] = useState<boolean>(false);
  const inputsIsValid = inputs.every((item) => item);

  useEffect(() => {
    if (inputsIsValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [inputsIsValid]);

  return valid;
};

// ----------------------------------------------------------------------

export { useForm };
