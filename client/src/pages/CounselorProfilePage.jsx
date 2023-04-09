import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation , useParams } from 'react-router-dom';
import { IconButton, Box, Rating, TextField } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import WestIcon from '@mui/icons-material/West';

import PageTitle from '../components/PageTitle';
import SubSecHeading from '../components/SubSecHeading';
import ProfileIcon from '../components/ProfileIcon';
import Sidebar from '../components/Sidebar';
import { MyButton } from '../components/MyButton';
import ReviewList from '../components/ReviewList';
import { AuthContext } from '../context/AuthContext';
import { instance } from '../axios';

import './profile.css';

const drawerWidth = 270;

function CounselorProfile() {
  const {
    auth: {
      authDetails: { usertype, username },
    },
  } = useContext(AuthContext);
  const { user_name }  = useParams();
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
  const handleDeactive = (userName, accType, accountStatus) => {
    console.log(userName, accType, accountStatus);
    let accStatus;
    if (accountStatus === true) {
      accStatus = false;
    } else {
      accStatus = true;
    }
    instance.post(`admin/change-status`, JSON.stringify({ username: userName, accType, accStatus })).then((result) => {
      console.log('yay');
    }
    ).catch((err) => {
      console.log(err.message);
    }
    );

  };

  const handleClick = (userName, accType) => {
    // change the following format to instance format
    instance.post(`admin/delete-account`, JSON.stringify({ username: userName, accType })).then((result) => {
      console.log('yay');
    }
    ).catch((err) => {
      console.log(err.message);
    }
    );
  };


  const [review, setNewReview] = useState({
    content: '',
    rating: null,
  });

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

  const handleChange = (prop) => (event) => {
    setNewReview({ ...review, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    instance
      .post('rate/add-review', JSON.stringify({ ...review, user_name }))
      .then((result) => {
        setNewReview({
          content: '',
          rating: null,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    instance
      .get(`user/counselor/${user_name}`)
      .then((result) => {
        setCounselorDetails(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_name]);

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
              <ProfileIcon accountName={counselorDetails.fname} />
            </Box>
            <Box className="user-profile-fields">
              <Box className="user-profile-title">
                <PageTitle
                  text={`${counselorDetails.fname} ${counselorDetails.lname}`}
                  marginL="0rem"
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
                    name="rating"
                    value={counselorDetails.rating}
                    readOnly
                  />
                )}
              </Box>
            </Box>

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
                  {counselorDetails.day} | {counselorDetails.time}
                </Box>
              </Box>

              <SubSecHeading text="Bio" />
              <Box className="content">{counselorDetails.bio}</Box>
              <SubSecHeading text="Reviews" />
              {usertype === 'Student' && (
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
