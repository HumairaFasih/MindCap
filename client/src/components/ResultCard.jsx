import { React, useContext, useState } from 'react';
import { Box } from '@mui/system';
import { Rating, IconButton, FormGroup, FormControlLabel, Switch, Typography } from '@mui/material';
import RightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { MyButton } from './MyButton';
import { AuthContext } from '../context/AuthContext';
import ProfileIcon from './ProfileIcon';
import './ResultCard.css';

export default function ResultCard({ name, user_name, rating, qualification, accountType, accountStatus }) {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const { username, usertype } = user;
  const [accStatus, setAccStatus] = useState(accountStatus);

  const handleSwitch = (prop) => (event) => {
    const result = axios({
      method: 'POST',
      url: `http://localhost:3003/api/admin/change-status`,
      withCredentials: true,
      data: JSON.stringify({ username: event.target.name, accType: prop, accStatus: event.target.checked, }),
      headers: { 'Content-Type': 'application/json' },
    });
    setAccStatus(event.target.checked);
  };

  const handleClick = (userName, accType) => {
    const result = axios({
      method: 'POST',
      url: `http://localhost:3003/api/admin/delete-account`,
      withCredentials: true,
      data: JSON.stringify({ username: userName, accType }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

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
              <p className='account-type'>{accountType}</p> | <p className='account-username'>{user_name}</p>

              {
                accountType === 'Counselor' ? (<> | <p className='account-rating'><Rating
                  name="rating"
                  value={rating}
                  readOnly
                /></p> </>) : null}
            </Box>
          </Box>
        </Box>
        {usertype === 'Student' ? (
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <MyButton
              width="12.5rem"
              backgroundColor="rgba(0, 0, 0, 0.8)"
              variant="contained"
              sx={{ m: 'auto' }}
              onClick={() => navigate(`/user/counselor/${user_name}`)}
            >
              Book Appointment
            </MyButton>
            <RightIcon sx={{ color: '#00000', fontSize: '40px', m: 'auto' }} />
          </Box>
        ) :
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <FormControlLabel
                  control={<Switch onChange={handleSwitch(accountType)} name={user_name} checked={accStatus} />}
                  label={<span style={{ color: '#61665e' }}>Deactivate</span>}
                />

              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <DeleteIcon sx={{ color: '#61665e',  m: 'auto' }} />
              <a href='' onClick={() => handleClick(user_name, accountType)} style={{ fontFamily: 'sans-serif', color: '#61665e', marginTop: '3px' }}>Delete Account</a>
              </Box>
            </Box>

            <IconButton onClick={() => navigate(`/user/${accountType}/${user_name}`)} sx={{ color: '#00000', fontSize: '40px', m: 'auto' }}>
              <RightIcon sx={{ color: '#00000', fontSize: '40px', m: 'auto' }} />
            </IconButton>
          </Box>

        }
      </Box>
    </Box>
  );
}
