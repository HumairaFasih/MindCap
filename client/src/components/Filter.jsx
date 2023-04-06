import { useState } from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';

export default function Filter({ label, value, onChange,  menuItems}) {
  const [filter, setFilter] = useState(value);

  const handleChange = (event) => {
    setFilter(event.target.value);
    onChange(event.target.value);
  };

  return (

    <TextField
      fullWidth
      select
      label={label}
      value={filter}
      size='small'
      variant='outlined'
      onChange={handleChange}
    >
      {menuItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
}