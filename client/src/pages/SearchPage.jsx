import { React, useState } from 'react';
import { Box } from '@mui/material';


import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/ResultCard';
import './search.css'

export default function SearchPage() {
    const drawerWidth = 270;
    const [searchResults, setSearchResults] = useState([
        {
            username: '',
            name: '',
            accountType: '',
            accountStatus: '',
            rating: 0,
            qualification: '',
        },
    ])
  const handleData = (data) => {
    console.log('data: ', data);
    // set search results if data length is not 0
    if (data.length !== 0)
    {
      setSearchResults(data);
    }
    else
    {
        setSearchResults([
            {
                username: '',
                name: '',
                rating: 0,
                qualification: '',
                accountType: '',
                accountStatus: '',
            },
        ]);
    }

  }
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            ml: 3,
            mr: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
            <div className='search-box'>
                <SearchBar onData={handleData} />
            </div>
            {/* render following if searchResults is not empty */}

            {/* re-render the the entire component on each search */}
            { searchResults[0].username !== '' ? (
              <div className='result-box'>

                {searchResults.map((result) => (
                  <div key = {result.username}>
                  <ResultCard
                    user_name={result.username}
                    name={result.name}
                    rating={result.rating}
                    qualification={result.qualification}
                    accountType={result.accType}
                    accountStatus={result.accStatus}
                  />
                  </div>
                ))}
              </div>
            ) : null}
            
        </Box>
      </Box>
    </Box>
  );
}