import { React, useContext, useState } from 'react';
import { Box } from '@mui/system';
import { Rating, IconButton, FormControlLabel, Switch } from '@mui/material';
import RightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import DeletePopup from './DeletePopup';

import { MyButton } from './MyButton';
import { AuthContext } from '../context/AuthContext';
import { instance } from '../axios';

import ProfileIcon from './ProfileIcon';
import './ResultCard.css';

export default function ResultCard({
  name,
  username,
  rating,
  qualification,
  accountType,
  accountStatus,
  onDelete,
}) {
  const navigate = useNavigate();
  const {
    auth: {
      authDetails: { usertype },
    },
  } = useContext(AuthContext);
  const [accStatus, setAccStatus] = useState(accountStatus);

  const handleSwitch = (prop) => (event) => {
    console.log(event.target.checked);
    instance
      .post(
        `admin/change-status`,
        JSON.stringify({
          username: event.target.name,
          accType: prop,
          accStatus: event.target.checked,
        })
      )
      .then((result) => {
        console.log('Statusyay');
      })
      .catch((err) => {
        console.log(err.message);
      });
    setAccStatus(event.target.checked);
  };
  const handleClick = (userName, accType) => (event) => {
    event.preventDefault();
    instance
      .post(
        `admin/delete-account`,
        JSON.stringify({ username: userName, accType })
      )
      .then((result) => {
        console.log('Deleteyay');
      })
      .catch((err) => {
        console.log(err.message);
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
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <div className="profile-icon-card">
            <ProfileIcon accountName={name} />
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className="account-name">{name}</h2>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <p className="account-type">{accountType}</p> |{' '}
              <p className="account-username">{username}</p>
              {accountType === 'Counselor' ? (
                <>
                  {' '}
                  |{' '}
                  <p className="account-rating">
                    <Rating name="rating" value={rating} readOnly />
                  </p>{' '}
                </>
              ) : null}
            </Box>
          </Box>
        </Box>
        {usertype === 'Student' ? (
          <MyButton
            width="12.5rem"
            backgroundcolor="rgba(0, 0, 0, 0.8)"
            variant="contained"
            sx={{ mr: 3, mt: 2, height: '4rem' }}
            onClick={() => navigate(`/user/counselor/${username}`)}
          >
            Book Appointment
          </MyButton>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={handleSwitch(accountType)}
                      name={username}
                      checked={accStatus}
                    />
                  }
                  label={<span style={{ color: '#61665e' }}>Deactivate</span>}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '10px',
                }}
                className="delete-account"
              >
                <DeleteIcon sx={{ color: '#61665e', m: 'auto' }} />
                <DeletePopup
                  userName={username}
                  accType={accountType}
                  onDelete={onDelete}
                />
              </Box>
            </Box>

            <IconButton
              onClick={() => navigate(`/user/${accountType}/${username}`)}
              sx={{ color: '#00000', fontSize: '40px', m: 'auto' }}
            >
              <RightIcon
                sx={{ color: '#00000', fontSize: '40px', m: 'auto' }}
              />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
