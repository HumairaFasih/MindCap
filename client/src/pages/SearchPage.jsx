import { React, useState } from 'react';
import { Box, Typography } from '@mui/material';

import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/ResultCard';
import './search.css';

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
  ]);
  const handleDeleteCard = (id) => {
    const updatedCards = searchResults.filter(
      
      (searchResults) => searchResults.username !== id
    );
    setSearchResults(updatedCards);
  };
  const handleData = (data) => {
    console.log('data: ', data);
    // set search results if data length is not 0
    if (data.length !== 0) {
      setSearchResults(data);
    } else {
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
  };
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: 3,
            mr: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <div className="search-box">
            <SearchBar onData={handleData} />
          </div>
          {/* render following if searchResults is not empty */}

          {/* re-render the the entire component on each search */}
          <div className="result-box">
            {searchResults[0].username !== '' ? (
              searchResults.map((result) => (
                <ResultCard
                  username={result.username}
                  name={result.name}
                  rating={result.rating}
                  qualification={result.qualification}
                  accountType={result.accType}
                  accountStatus={result.accStatus}
                  key={result.username}
                  onDelete={handleDeleteCard}
                />
              ))
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 5,
                }}
              >
                <Typography
                  sx={{ color: 'grey', fontWeight: 'bold', fontSize: 24 }}
                >
                  No matching results found
                </Typography>
              </Box>
            )}
          </div>
        </Box>
      </Box>
    </Box>
  );
}
