import { useState, useEffect } from 'react';

interface IProps {
  reg?: RegExp;
  errorText?: string | '';
}

interface IResult {
  value: string;
  errorText: string;
  errorStatus: boolean;
  valid: boolean;
  dropState: () => void;
  setValue: (str: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function useInputText(): IResult;
export function useInputText(props?: IProps): IResult;

export function useInputText(props?: IProps): IResult {
  const [value, setValue] = useState<string>('');
  const [visited, setVisited] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    if (props && props.reg) {
      if (!props.reg.test(value)) {
        setValid(false);
        if (visited) {
          setErrorText(props && props.errorText ? props.errorText : '');
          setErrorStatus(true);
        }
      } else if (props.reg.test(value)) {
        setValid(true);
        setErrorStatus(false);
        setErrorText('');
      }
    } else {
      setValid(true);
      setErrorText('');
      setErrorStatus(false);
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
    setErrorText('');
    setErrorStatus(false);
    setValid(false);
  };

  return {
    value,
    errorStatus,
    errorText,
    valid,

    dropState,
    setValue,

    onChange,
    onBlur,
  };
}
