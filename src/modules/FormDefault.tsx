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
    <Box
      sx={{
        minW: 300,
        maxW: 400,
        borderRadius: '24px',
        w: '100%',
        overflowY: 'auto',
        p: 24,
        bgColor: 'Grey 800',
      }}
    >
      <form onSubmit={submit} className="FormDefault-Container">
        <Text
          content={title}
          sx={{
            d: 'block',
            w: '100%',
            mb: 10,
            fontWeight: 700,
            lineHeight: '1.5rem',
            fontSize: '1.125rem',
            textAlign: titlePosition,
          }}
        />

        <Box
          sx={{
            d: 'grid',
            pb: 12,
            custom: `
            grid-template-columns: repeat(1, 1fr);
            gap: 24px 16px;
          `,
          }}
        >
          {children}
        </Box>
        {to && (
          <Box
            sx={{
              d: 'flex',
              w: '100%',
              my: 10,
              contentY: 'right',
              custom: `
            & > a {
              color: rgb(255, 255, 255);
              &:hover {
                text-decoration: underline;
              }
            }
            `,
            }}
          >
            <Link to={to}>{toText}</Link>
          </Box>
        )}
        <div>{buttons}</div>
        {form.errorText && <Text content={form.errorText} sx={{ color: 'Error Main', fontSize: '0.875rem', mt: 10 }} />}
      </form>
    </Box>
  );
};

// ----------------------------------------------------------------------

export default FormDefault;
