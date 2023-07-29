import { useState } from 'react';

interface IProps {
  reg?: RegExp;
  errorText?: string;
}

// ----------------------------------------------------------------------

const useInputText = ({ reg, errorText = '' }: IProps) => {
  const [value, setValue] = useState<string>('');
  const [visited, setVisited] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [valid, setValid] = useState<boolean>(false);

  const validation = (str: string) => {
    if (reg) {
      if (!reg.test(str)) {
        setValid(false);
        setError(errorText);
      } else if (reg.test(str)) {
        setValid(true);
        setError(null);
      }
    } else {
      setValid(true);
      setError(null);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (visited) validation(e.target.value);
  };

  const onBlur = () => {
    setVisited(true);
    if (!visited) validation(value);
  };

  return {
    value,
    error,
    valid,

    onChange,
    onBlur,
  };
};

// ----------------------------------------------------------------------

export { useInputText };
