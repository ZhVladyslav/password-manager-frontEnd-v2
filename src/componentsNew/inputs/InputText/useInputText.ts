import { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (reg) {
      if (!reg.test(value)) {
        setValid(false);
        if (visited) setError(errorText);
      } else if (reg.test(value)) {
        setValid(true);
        setError(null);
      }
    } else {
      setValid(true);
      setError(null);
    }
  }, [value, visited]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setVisited(true);
    if (visited) return;
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
    setValue,

    onChange,
    onBlur,
  };
};

// ----------------------------------------------------------------------

export { useInputText };
