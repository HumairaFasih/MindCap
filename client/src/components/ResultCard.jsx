import React from 'react';
import { Box } from '@mui/system';
import { Rating } from '@mui/material';
import RightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { MyButton } from './MyButton';
import ProfileIcon from './ProfileIcon';
import './ResultCard.css';

export default function ResultCard({ name, username, rating, qualification }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '10px',
        border: '2px solid rgba(147, 183, 125, 0.7)',
        backgroundColor: 'rgba(147, 183, 125, 0.32)',
        mb: '20px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <div className='profile-icon-card'>
            <ProfileIcon accountName={name} />
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className='account-name'>{name}</h2>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <p className='account-type'>Counselor</p> | <p className='account-username'>{username}</p> | <p className='account-rating'><Rating
                    name="rating"
                    value={rating}
                    readOnly
                  /></p>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right'}}>
           <MyButton
              width="12.5rem"
              paddinghorizontal="10px"
              paddingvertical="10px"
              backgroundColor="rgba(0, 0, 0, 0.8)"
              variant="contained"
              sx={{m: 'auto' }}
              onClick={() => navigate(`/user/counselor/${username}`)}
            >
              Book Appointment
            </MyButton>
            <RightIcon sx={{ color: '#00000', fontSize: '40px', m: 'auto' }} />
        </Box>
      </Box>
    </Box>
  );
}
