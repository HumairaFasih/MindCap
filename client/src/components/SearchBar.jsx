import React from 'react';
import { TextField, Box, IconButton, Grid, MenuItem, InputAdornment } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { MyButton } from './MyButton';


function SearchBar({ onData}) {
    const [query, setQuery] = React.useState('');
    const [day, setDay] = React.useState('');
    const [gender, setGender] = React.useState('');

    const handleSearch = async (e) => {
        // Send query to server with filters
        e.preventDefault();
        try {
            const result = await axios({
                method: 'POST',
                url: `http://localhost:3003/api/search/search-counselors`,
                withCredentials: true,
                data: JSON.stringify({ query, day, gender }),
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(result.data)
            onData(result.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    marginTop: '5px',
                    marginBottom: '20px',
                }}
            >
                <Grid item xs={10} md={6} lg={6}>
                    <TextField
                        fullWidth
                        label="Search Counselors"
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
                            style: { boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.5)' } // The first 0 is for the horizontal offset, the second 0 is for the vertical offset, the third 0 is for the blur radius, and the last 0 is for the spread radius.
                        }}
                    />
                </Grid>

            </Grid>
            <Grid container spacing={2}
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}
            >
                <Grid item xs={5} md={2} lg={2.3}>
                    <TextField
                        fullWidth
                        select
                        label="Select Day"
                        value={day}
                        onChange={(event) => setDay(event.target.value)}
                        size='small'
                        variant='outlined'
                    >
                        <MenuItem value="" >No Filter</MenuItem>
                        <MenuItem value="Weekdays">Weekdays</MenuItem>
                        <MenuItem value="Weekends">Weekends</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={5} md={2} lg={2.3}>
                    <TextField
                        fullWidth
                        select
                        label="Select Gender"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                        size='small'
                        variant='outlined'
                    >
                        <MenuItem value="" >No Filter</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </TextField>
                </Grid>
                <Grid item>
                    <MyButton onClick={handleSearch}>
                        Apply Filter
                    </MyButton>
                </Grid>
            </Grid>
        </Box>

    );
}


export default SearchBar;