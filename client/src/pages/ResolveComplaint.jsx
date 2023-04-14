import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton, Box, Rating, Typography } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EventIcon from '@mui/icons-material/Event';
import Loading from '../components/LoadingScreen';

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
  useEffect(() => {
    if(usertype) {
      console.log('here')
    }
  }, [usertype])
  
  const location = useLocation();
  const [apptId, setID] = useState('');
  const [counselorDetails, setCounselorDetails] = useState({
    username: '',
    fname: '',
    lname: '',
    gender: '',
    experience: '',
    qualification: '',
    rating: 0,
  });
  const [loaded, setLoaded] = useState(false);

  const [complaint, setComplaint] = useState({
    counselor_username: '',
    type: '',
    details: '',
    filed_date: null,
  });

  const [status, setStatus] = useState('');

  const [complaintId, setComlaintId] = useState('');

  useEffect(() => {
    setID(location.pathname.split('/')[2]);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await instance.post(
          `/complaint/view-one`,
          JSON.stringify({ apptId: location.pathname.split('/')[2] })
        );
        setComplaint(result.data);
        setStatus(result.data.status)
        setComlaintId(result.data._id)
        const result2 = await instance.get(
          `user/counselor/${result.data.counselor_username}`
        );
        setCounselorDetails({
          username: result2.data.username,
          fname: result2.data.fname,
          lname: result2.data.lname,
          gender: result2.data.gender,
          experience: result2.data.experience,
          qualification: result2.data.qualification,
          rating: result2.data.rating,
        });
      } catch (err) {
        console.log(err);
      }
    };
    const getDataHandler = async () => {
        await getData();
        setLoaded(true);
    }
    getDataHandler()
  }, []);

  const handleResolution = async () => {
    const result = await instance.post(
      `/complaint/resolve`,
      JSON.stringify({ complaintId })
    );
    if(result.data == 'Complaint Resolved!'){
        setStatus('Resolved');
    }
  }

  if (!loaded) {
    return <Loading />;
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
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
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
                <Typography>{complaint.type}</Typography>
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
                  <Typography>{complaint.filed_date.substring(0, 10)}</Typography>
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
                {complaint.details}
                </Typography>
              </Box>
              </Box>

              <Box className='review-button'>
                <MyButton
                  width='100px'
                  paddinghorizontal='5px'
                  paddingvertical='5px'
                  variant='contained'
                  onClick={handleResolution}
                >
                {status}
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
