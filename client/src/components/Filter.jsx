import { useState } from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';

export default function Filter({ label, value, onChange }) {
  const [filter, setFilter] = useState(value);

  const handleChange = (event) => {
    setFilter(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Grid item xs={5} md={2} lg={2.3}>
      <TextField
        fullWidth
        select
        label={label}
        value={filter}
        size='small'
        variant='outlined'
        onChange={handleChange}
      >
      <MenuItem value="" >No Filter</MenuItem>
      <MenuItem value="Weekdays">Weekdays</MenuItem>
      <MenuItem value="Weekends">Weekends</MenuItem>
    </TextField>
    </Grid >
  );
}