import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { IconButton, Box, Rating, TextField } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import WestIcon from '@mui/icons-material/West';
import axios from 'axios';
import { padding } from '@mui/system';
import PageTitle from '../components/PageTitle';
import SubSecHeading from '../components/SubSecHeading';
import ProfileIcon from '../components/ProfileIcon';
import Sidebar from '../components/Sidebar';
import { MyButton } from '../components/MyButton';
import ReviewList from '../components/ReviewList';
import { AuthContext } from '../context/AuthContext';

import './profile.css';


const drawerWidth = 270;

function CounselorProfile() {
  const { usertype, user_name } = useContext(AuthContext);
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editProfileRoute = `${location.pathname
    .split('/')
    .slice(0, -1)
    .join('/')}/edit-profile`;

  const conditionalNavigate = () => {
    if (usertype === 'Student') {
      navigate('/book-appointment');
    } else if (usertype === 'Counselor') {
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
    status: '',
    revs: [],
  });

  const handleDeactive = (userName, accType, accountStatus) => {
    console.log(userName, accType, accountStatus);
    let accStatus;
    if (accountStatus === true) {
      accStatus = false;
    } else {
      accStatus = true;
    }
    const result = axios({
      method: 'POST',
      url: `http://localhost:3003/api/admin/change-status`,
      withCredentials: true,
      data: JSON.stringify({ username: userName, accType, accStatus }),
      headers: { 'Content-Type': 'application/json' },
    });
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

  useEffect(() => {
    if (username) {
      getCounselorData();
    }
  }, [getCounselorData, username]);

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
            {/* if account type is admin then render two buttons: Deactivate Account and Delete Account */}
            {/* if account type is counselor then render one buttons: Edit Profile */}
            {/* if account type is student then render one buttons: Book Appointment */}
            {
              usertype === 'Admin' ? (
                <Box sx= {{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}>  
                  <MyButton
                  // 200px in rem are 12.5rem
                    width="12.5rem"
                    variant="contained"
                    sx={{ mb:1, ml: 'auto', padding: '10px'}}
                    onClick={() => {
                      handleDeactive(
                        counselorDetails.username,
                        'Counselor',
                        counselorDetails.status
                      );
                    }}
                  >
                    Deactivate Account
                  </MyButton>
                  <MyButton
                    width="12.5rem"
                    variant="contained"
                    sx={{ mt: 2, ml: 'auto', padding: '10px'  }}
                    onClick={() => {
                      handleClick(counselorDetails.username, 'Counselor');
                    }}
                  >
                    Delete Account
                  </MyButton>
                </Box>
              ) : (
                <Box sx = {{ marginLeft: 'auto' }}>
                  <MyButton
                    width="200px"
                    paddinghorizontal="10px"
                    paddingvertical="10px"
                    variant="contained"
                    sx={{ mb: 9, ml: 'auto' }}
                    onClick={conditionalNavigate}
                  >
                    {usertype === 'Student'
                      ? 'Book Appointment'
                      : 'Edit Profile'}
                  </MyButton>
                </Box>
              )
            }
           
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
              {usertype !== 'Student' ? null : (
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
