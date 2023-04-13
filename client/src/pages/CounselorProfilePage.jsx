import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, Alert, Box, Rating, TextField } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import WestIcon from '@mui/icons-material/West';
import PageTitle from '../components/PageTitle';
import SubSecHeading from '../components/SubSecHeading';
import ProfileIcon from '../components/ProfileIcon';
import Sidebar from '../components/Sidebar';
import { MyButton } from '../components/MyButton';
import ReviewList from '../components/ReviewList';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/LoadingScreen';
import { instance } from '../axios';
import './profile.css';

const drawerWidth = 270;

function CounselorProfile() {
  const {
    auth: {
      authDetails: { usertype },
    },
  } = useContext(AuthContext);
  const { username } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [rateError, setRateError] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const navigate = useNavigate();

  const conditionalNavigate = () => {
    if (usertype === 'Student') {
      navigate('/book-appointment');
    } else if (usertype === 'Counselor') {
      navigate('/user/counselor/edit-profile', { replace: true });
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
    instance
      .post(
        `/admin/change-status`,
        JSON.stringify({ username: userName, accType, accStatus })
      )
      .then((result) => {
        console.log('yay');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleClick = (userName, accType) => {
    instance
      .post(
        `admin/delete-account`,
        JSON.stringify({ username: userName, accType })
      )
      .then((result) => {
        console.log('yay');
      })
      .catch((err) => {
        console.log(err.message);
      });
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
    if (prop === 'rating' && event.target.value !== '' && rateError) {
      setRateError(false);
    }
    if (prop === 'review' && event.target.value !== '' && reviewError) {
      setReviewError(false);
    }
    setNewReview({ ...review, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.rating) {
      setRateError(true);
    }
    if (review.content === '') {
      setReviewError(true);
    } else {
      instance
        .post('/rate/add-review', JSON.stringify({ ...review, username }))
        .then((result) => {
          getCounselorData();
          setNewReview({
            content: '',
            rating: null,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const getCounselorData = useCallback(() => {
    instance
      .get(`user/counselor/${username}`)
      .then((result) => {
        setCounselorDetails(result.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    getCounselorData();
  }, [username]);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: 5,
            ml: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {/* <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            {/* <WestIcon style={{ fontSize: '2.5rem', color: '#000000' }} />
          </IconButton> */}
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
                {counselorDetails.rating && (
                  <Rating
                    name="rating"
                    value={counselorDetails.rating}
                    readOnly
                  />
                )}
              </Box>
            </Box>

            {usertype === 'Admin' ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 'auto',
                }}
              >
                <MyButton
                  // 200px in rem are 12.5rem
                  width="12.5rem"
                  variant="contained"
                  sx={{ mb: 1, ml: 'auto', padding: '10px' }}
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
                  sx={{ mt: 2, ml: 'auto', padding: '10px' }}
                  onClick={() => {
                    handleClick(counselorDetails.username, 'Counselor');
                  }}
                >
                  Delete Account
                </MyButton>
              </Box>
            ) : (
              <Box sx={{ marginLeft: 'auto' }}>
                <MyButton
                  width="200px"
                  paddinghorizontal="10px"
                  paddingvertical="10px"
                  variant="contained"
                  sx={{ mb: 9, ml: 'auto' }}
                  onClick={conditionalNavigate}
                >
                  {usertype === 'Student' ? 'Book Appointment' : 'Edit Profile'}
                </MyButton>
              </Box>
            )}
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
                  {rateError && (
                    <Alert severity="error" sx={{ width: '16rem', mb: 2 }}>
                      Please enter a rating.
                    </Alert>
                  )}
                  <Box className="review">
                    <Box className="review-text">Rate Counselor:</Box>
                    <Rating
                      name="rating"
                      value={review.rating}
                      onChange={handleChange('rating')}
                    />
                  </Box>
                  <Box className="review" sx={{ flexDirection: 'column' }}>
                    {reviewError && (
                      <Alert severity="error" sx={{ width: '16rem', mb: 2 }}>
                        Please enter a review.
                      </Alert>
                    )}
                    <TextField
                      id="review"
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
