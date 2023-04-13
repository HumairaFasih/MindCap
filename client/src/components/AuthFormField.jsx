import React from 'react';
import { TextField } from '@mui/material';

function AuthFormField({
  id,
  width,
  label,
  name,
  type,
  value,
  error,
  helperText,
  onChangeHandler,
}) {
  return (
    <TextField
      sx={{
        '& > :not(style)': { my: 1, width: { width } },
      }}
      key={id}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={(e) => {
        onChangeHandler(e.target.name, e.target.value);
      }}
      variant="outlined"
      error={error}
      helperText={
        error && (helperText ? helperText : 'Please fill in this field')
      }
      FormHelperTextProps={{
        style: { lineHeight: 0.7, marginLeft: 0, marginRight: 0 },
      }}
    />
  );
}

export default AuthFormField;
