import React from 'react';
import { Box } from '@mui/material';


import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/ResultCard';
import './search.css'

export default function SearchPage() {
    const drawerWidth = 270;
    const [searchResults, setSearchResults] = React.useState([
        {
            username: '',
            name: '',
            rating: 0,
            qualification: '',
        },
    ])
  const handleData = (data) => {
    console.log('data: ', data);
    setSearchResults(data);

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

            { searchResults[0].username !== '' ? (
              <div className='result-box'>
                {searchResults.map((result) => (
                  <ResultCard
                    username={result.username}
                    name={result.name}
                    rating={result.rating}
                    qualification={result.qualification}
                  />
                ))}
              </div>
            ) : null}
            
        </Box>
      </Box>
    </Box>
  );
}