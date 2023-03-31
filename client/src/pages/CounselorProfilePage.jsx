import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { IconButton, Box, Rating, TextField } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import WestIcon from '@mui/icons-material/West';
import axios from 'axios';

import PageTitle from '../components/PageTitle';
import SubSecHeading from '../components/SubSecHeading';
import ProfileIcon from '../components/ProfileIcon';
import Sidebar from '../components/Sidebar';
import { MyButton } from '../components/MyButton';
import ReviewList from '../components/ReviewList';

import './profile.css';

const drawerWidth = 270;

function CounselorProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editProfileRoute = `${location.pathname
    .split('/')
    .slice(0, -1)
    .join('/')}/edit-profile`;

  const conditionalNavigate = () => {
    if (userTypeAndName.usertype === 'Student') {
      navigate('/book-appointment');
    } else if (userTypeAndName.usertype === 'Counselor') {
      navigate(editProfileRoute);
    }
  };

  const [review, setNewReview] = useState({
    content: '',
    rating: null,
  });

  const [counselorDetails, setCounselorDetails] = useState({
    username: '',
    name: '',
    gender: '',
    experience: '',
    qualification: '',
    bio: '',
    availabilityday: '',
    availabilitytime: '',
    rating: 0,
    revs: [],
  });

  const [userTypeAndName, setUserTypeAndName] = useState({
    usertype: '',
    username: '',
  });

  const handleChange = (prop) => (event) => {
    setNewReview({ ...review, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const _ = await axios({
        method: 'post',
        url: `http://localhost:3003/api/rate/add-review`,
        withCredentials: true,
        data: JSON.stringify({ ...review, username }),
        headers: { 'Content-Type': 'application/json' },
      });
      setNewReview({
        content: '',
        rating: null,
      });
      getCounselorData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCounselorData = useCallback(async () => {
    try {
      const result = await axios({
        method: 'get',
        withCredentials: true,
        url: `http://localhost:3003/api/user/counselor/${username}`,
        headers: { 'Content-Type': 'application/json' },
      });
      setCounselorDetails(result.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [username]);

  const getUserTypeAndName = useCallback(async () => {
    try {
      const result = await axios({
        method: 'get',
        withCredentials: true,
        url: `http://localhost:3003/api/profile/currentuser`,
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(result.data);
      console.log('hello i am in getusertype');
      if (result.data) {
        setUserTypeAndName(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getCounselorData();
    getUserTypeAndName();
  }, [getCounselorData, getUserTypeAndName]);

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
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
          <Box className="user-profile-header">
            <Box className="user-profile-icon">
              <ProfileIcon accountName={counselorDetails.name} />
            </Box>
            <Box className="user-profile-fields">
              <Box className="user-profile-title">
                <PageTitle text={counselorDetails.name} marginL="0rem" />
              </Box>
              <Box>{counselorDetails.qualification}</Box>
              <Box>
                {counselorDetails.username} | {counselorDetails.gender} |{' '}
                {counselorDetails.experience} years
              </Box>
              <Box>
                {counselorDetails.rating !== null && (
                  <Rating
                    name="rating"
                    value={counselorDetails.rating}
                    readOnly
                  />
                )}
              </Box>
            </Box>

            <MyButton
              width="200px"
              paddinghorizontal="10px"
              paddingvertical="10px"
              variant="contained"
              sx={{ mb: 9, ml: 'auto' }}
              onClick={conditionalNavigate}
            >
              {userTypeAndName.usertype === 'Student'
                ? 'Book Appointment'
                : 'Edit Profile'}
            </MyButton>
          </Box>
          <Box>
            {/* Change font color of Typography to black.  */}
            <Box className="subsections">
              <SubSecHeading text="Availability" />
              <Box className="availability">
                <TodayIcon
                  style={{ fontSize: '1.8rem', color: '#000000' }}
                  className="TodayIcon"
                />
                <Box className="availability-day-text">
                  {counselorDetails.availabilityday} |{' '}
                  {counselorDetails.availabilitytime}
                </Box>
              </Box>

              <SubSecHeading text="Bio" />
              <Box className="content">{counselorDetails.bio}</Box>
              <SubSecHeading text="Reviews" />
              {userTypeAndName.usertype !== 'Student' ? null : (
                <Box>
                  <Box className="review">
                    <Box className="review-text">Rate Counselor:</Box>
                    <Rating
                      name="rating"
                      value={review.rating}
                      onChange={handleChange('rating')}
                    />
                  </Box>
                  <Box className="review">
                    <TextField
                      id="outlined-multiline-static"
                      label="Write a review"
                      value={review.content}
                      multiline
                      rows={4}
                      variant="outlined"
                      style={{ width: '98%' }}
                      onChange={handleChange('content')}
                    />
                  </Box>
                  <Box className="review-button">
                    <MyButton
                      width="100px"
                      paddinghorizontal="5px"
                      paddingvertical="5px"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Submit
                    </MyButton>
                  </Box>
                </Box>
              )}
              <Box className="review-list">
                <ReviewList reviews={counselorDetails.revs} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CounselorProfile;
