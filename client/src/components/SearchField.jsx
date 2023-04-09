import { useState } from 'react';
import { Grid, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchField(props) {
  const [query, setQuery] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.handleSearch(query);
    }
  };

  const handleSearch = () => {
    props.handleSearch(query);
  };

  return (
    <Grid item xs={10} md={6} lg={6}>
      <TextField
        fullWidth
        label={props.label}
        value={query}
        onKeyPress={handleKeyPress}
        onChange={(event) => setQuery(event.target.value)}
        size='medium'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          style: { boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.5)' }
        }}
      />
    </Grid>
  );
}