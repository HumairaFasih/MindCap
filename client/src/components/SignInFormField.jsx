import React from 'react';
import { TextField } from '@mui/material';

function SignInFormField({
  id,
  width,
  label,
  name,
  type,
  error,
  value,
  onChangeHandler,
}) {
  return (
    <TextField
      sx={{
        '& > :not(style)': { my: 1, width: { width }, height: '60px' },
      }}
      key={id}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
      variant="outlined"
      required
      error={error || undefined}
    />
  );
}

export default SignInFormField;
