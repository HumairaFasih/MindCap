import { React, useState, useContext } from 'react';
import { TextField, Box, IconButton, Grid, MenuItem, InputAdornment } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

import { AuthContext } from '../context/AuthContext';
import { MyButton } from './MyButton';
import Filter from './Filter';

const menuItemsDay = [
    { label: 'No Filter', value: '' },
    { label: 'Weekdays', value: 'Weekdays' },
    { label: 'Weekends', value: 'Weekends' },
];

const menuItemsGender = [
    { label: 'No Filter', value: '' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];

const menuItemsAccountType = [
    { label: 'No Filter', value: '' },
    { label: 'Student', value: 'Student' },
    { label: 'Counselor', value: 'Counselor' },
];
function SearchBar({ onData }) {
    const [query, setQuery] = useState('');
    const [day, setDay] = useState('');
    const [gender, setGender] = useState('');
    const [accountType, setAccountType] = useState('');

    const user = useContext(AuthContext);
    const { usertype, username } = user;

    const handleChangeDay = (value) => {
        setDay(value);
    };
    const handleChangeGender = (value) => {
        setGender(value);
    };
    const handleChangeAccountType = (value) => {
        setAccountType(value);
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            let searchType = '';
            let searchData = '';
            if (usertype === 'Student') {
                searchType = 'search-counselors';
                searchData = JSON.stringify({ query, day, gender });
            } else if (usertype === 'Admin') {
                searchType = 'search-accounts';
                searchData = JSON.stringify({ query, accountType });
            }
            const result = await axios({
                method: 'POST',
                url: `http://localhost:3003/api/search/${searchType}`,
                withCredentials: true,
                data: searchData,
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Hello:', result.data)
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
                        label={`Search ${usertype === 'Student' ? 'Counselor' : 'Student/Counselor'}`}
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
            {
                usertype === 'Student' ? (
                    <Grid container spacing={2}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* show the following two filters (on Day and Gender) if usertype is student otherwise show a single new filter on Account Type */}
                    <Grid item xs={5} md={2} lg={2.3}>
                        <Filter label='Select Day' value={day} onChange={handleChangeDay} menuItems={menuItemsDay} />
                    </Grid>
                    <Grid item xs={5} md={2} lg={2.3}>
                        <Filter label='Select Day' value={day} onChange={handleChangeGender} menuItems={menuItemsGender} />
                    </Grid>
                    <Grid item>
                        <MyButton width='135px' onClick={handleSearch}>
                            Apply Filter
                        </MyButton>
                    </Grid>
                </Grid>
                ) : usertype === 'Admin' ?
                (
                    <Grid container spacing={2}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Grid item xs={6} md={2.6} lg={2.6}>
                        <Filter label='Select Account Type' value={accountType} onChange={handleChangeAccountType} menuItems={menuItemsAccountType} />
                    </Grid>
                    <Grid item>
                        {/* 150px in rem is 9.375rem */}
                        <MyButton width='9' onClick={handleSearch}>
                            Apply Filter
                        </MyButton>
                    </Grid>
                </Grid>
                ) : null

            }
            
        </Box>

    );
}


export default SearchBar;