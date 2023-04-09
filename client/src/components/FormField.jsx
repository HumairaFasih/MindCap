import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

export default function FormField({ id, label, value, onChange, width, type }) {
  return (
    <FormControl
      fullWidth
      required
      sx={{ mb: 2, width: width || undefined }}
      variant="outlined"
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        // if type is defined then we need   type={values.showPassword ? "text" : "password"} otherwise set it to undefined
        type={type || undefined}
      />
    </FormControl>
  );
}
