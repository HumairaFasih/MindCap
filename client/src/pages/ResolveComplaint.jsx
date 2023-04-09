import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton, Box, Rating, Typography } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EventIcon from '@mui/icons-material/Event';

import PageTitle from '../components/PageTitle';
import SubSecHeading from '../components/SubSecHeading';
import ProfileIcon from '../components/ProfileIcon';
import Sidebar from '../components/Sidebar';
import { MyButton } from '../components/MyButton';
import { AuthContext } from '../context/AuthContext';
import { instance } from '../axios';

import './profile.css';

const drawerWidth = 270;

function ResolveComplaint() {
  const {
    auth: {
      authDetails: { usertype, username },
    },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [counselorDetails, setCounselorDetails] = useState({
    username: '',
    fname: '',
    lname: '',
    gender: '',
    experience: '',
    qualification: '',
    bio: '',
    day: '',
    time: '',
    rating: 0,
    revs: [],
  });

  const handleSubmit = async (e) => {   /* Has to shows snackbar at dashboard screen + resolve complaint in DB  */
    e.preventDefault();
    navigate('/')
  };

  useEffect(() => {
    instance
      .get(`user/counselor/${username}`)
      .then((result) => {
        setCounselorDetails(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            ml: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <WestIcon style={{ fontSize: '2.5rem', color: '#000000' }} />
          </IconButton>
          <Box className='user-profile-header'>
            <Box className='user-profile-icon'>
              <ProfileIcon accountName={counselorDetails.fname} />
            </Box>
            <Box className='user-profile-fields'>
              <Box className='user-profile-title'>
                <PageTitle
                  text={`${counselorDetails.fname} ${counselorDetails.lname}`}
                  marginL='0rem'
                />
              </Box>
              <Box>{counselorDetails.qualification}</Box>
              <Box>
                {counselorDetails.username} | {counselorDetails.gender} |{' '}
                {counselorDetails.experience} years
              </Box>
              <Box>
                {counselorDetails.rating !== null && (
                  <Rating
                    name='rating'
                    value={counselorDetails.rating}
                    readOnly
                  />
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: '3.5rem' }}>
            {/* Change font color of Typography to black.  */}
            <Box className='subsections'>
              <SubSecHeading text='Complaint Type' />
              <Box
                display='flex'
                flexDirection='row'
                sx={{
                  marginTop: '1.2rem',
                  marginBottom: '1.2rem',
                  marginLeft: '0.5rem',
                }}
              >
                <ErrorOutlineIcon sx={{ marginRight: '0.8rem' }} />
                <Typography>Behavioral Misconduct</Typography>
              </Box>

              <Box marginTop='2.5rem'>
                <SubSecHeading text='Complaint Lodged Date' />
                <Box
                  display='flex'
                  flexDirection='row'
                  sx={{
                    marginTop: '1.2rem',
                    marginBottom: '1.2rem',
                    marginLeft: '0.5rem',
                  }}
                >
                  <EventIcon sx={{ marginRight: '0.8rem' }} />
                  <Typography>22-February-2023</Typography>
                </Box>
              </Box>

              <Box marginTop='2.5rem'>
              <SubSecHeading text='Complaint Details' />
              <Box
                sx={{
                  marginTop: '1.2rem',
                  marginBottom: '1.2rem',
                  marginLeft: '0.5rem',
                  marginRight: '1.5rem',
                  padding: '1rem',
                  borderRadius: '7px',
                  border: '2px solid grey',
                }}
              >
                <Typography>
                  Hello World Hello World Hello World Hello World Hello World Hello
                  World Hello World Hello World Hello World Hello World Hello
                  World Hello World Hello World Hello World Hello World Hello
                  World Hello World Hello World Hello World Hello World Hello
                  World Hello World Hello World Hello World Hello World Hello
                  World Hello World Hello World
                </Typography>
              </Box>
              </Box>

              <Box className='review-button'>
                <MyButton
                  width='100px'
                  paddinghorizontal='5px'
                  paddingvertical='5px'
                  variant='contained'
                  onClick={handleSubmit}
                >
                  Resolve
                </MyButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ResolveComplaint;
