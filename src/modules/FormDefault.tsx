import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from '../components/@zh';

// ----------------------------------------------------------------------

type titlePositionType = 'center' | 'start' | 'end';

interface IProps {
  title: string;
  titlePosition?: titlePositionType;
  children: React.ReactNode;
  buttons: React.ReactNode;
  to?: string;
  toText?: string;
  form: {
    valid: boolean;
    errorText: string | null;
  };
  onSubmit: () => void;
}

// ----------------------------------------------------------------------

const FormDefault: React.FC<IProps> = ({
  children,
  to,
  titlePosition = 'center',
  toText,
  onSubmit,
  buttons,
  form,
  title,
}) => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.valid) return;
    onSubmit();
  };

  return (
    <Box>
      <form onSubmit={submit} className="FormDefault-Container">
        {/* <Text content={title} /> */}

        <Box>{children}</Box>
        {to && (
          <Box>
            <Link to={to}>{toText}</Link>
          </Box>
        )}
        <div>{buttons}</div>
        {/* {form.errorText && <Text content={form.errorText} />} */}
      </form>
    </Box>
  );
};

// ----------------------------------------------------------------------

export default FormDefault;
