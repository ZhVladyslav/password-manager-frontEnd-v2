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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (reg) {
      if (!reg.test(e.target.value)) {
        setValid(false);
        if (visited) setError(errorText);
      } else if (reg.test(e.target.value)) {
        setValid(true);
        setError(null);
      }
    } else {
      setValid(true);
      setError(null);
    }
  };

  const onBlur = () => {
    setVisited(true);
    if (visited) return;
    if (reg) {
      if (!reg.test(value)) {
        setValid(false);
        setError(errorText);
      } else if (reg.test(value)) {
        setValid(true);
        setError(null);
      }
    } else {
      setValid(true);
      setError(null);
    }
  };

  const dropState = () => {
    setValue('');
    setVisited(false);
    setError(null);
    setValid(false);
  };

  return {
    value,
    error,
    valid,

    dropState,

    onChange,
    onBlur,
  };
};

// ----------------------------------------------------------------------

export { useInputText };
