import React, { useState, useEffect } from 'react';
import { IconButton, Box, Rating, TextField } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import WestIcon from '@mui/icons-material/West';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import PageTitle from '../components/PageTitle';
import SubSecHeading from '../components/SubSecHeading';
import ProfileIcon from '../components/ProfileIcon';
import Sidebar from '../components/Sidebar';
import { MyButton } from '../components/MyButton';
import ReviewList from '../components/ReviewList';

import './profile.css';

const drawerWidth = 270;

function CounselorProfile(props) {
  const { counselor } = useParams();
  const [reviewsList, setReviewsList] = useState([]);
  const [newReview, setNewReview] = useState({
    content: '',
    rating: null,
  });
  const [details, setDetails] = useState({
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

  const handleChange = (prop) => (event) => {
    setNewReview({ ...newReview, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        method: 'post',
        url: `http://localhost:3003/api/rate/addreview`,
        withCredentials: true,
        data: JSON.stringify({ ...newReview, counselorusername: counselor }),
        headers: { 'Content-Type': 'application/json' },
      });
      setNewReview({
        content: '',
        rating: null,
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const getData = React.useCallback(async () => {
    try {
      const result = await axios({
        method: 'get',
        withCredentials: true,
        url: `http://localhost:3003/api/profile/users/${counselor}`,
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(result.data);
      setDetails(result.data);
    } catch (err) {
      console.log(err);
    }
  }, [counselor]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
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
              console.log('Clicked!');
            }}
          >
            <WestIcon style={{ fontSize: '2.5rem', color: '#000000' }} />
          </IconButton>
          <div className="user-profile-header">
            <div className="user-profile-icon">
              <ProfileIcon accountName={details.name} />
            </div>
            <div className="user-profile-fields">
              <div className="user-profile-title">
                <PageTitle text={details.name} marginL="0rem" />
              </div>
              <div>{details.qualification}</div>
              <div>
                {details.username} | {details.gender} | {details.experience}
                years
              </div>
              <div>
                {details.rating !== null && (
                  <Rating name="rating" value={details.rating} readOnly />
                )}
              </div>
            </div>
            <MyButton
              newWidth="200px"
              paddingLR="10px"
              paddingTB="10px"
              variant="contained"
              sx={{ mb: 9, ml: 'auto' }}
            >
              Book Appointment
            </MyButton>
          </div>
          <div>
            {/* Change font color of Typography to black.  */}
            <div className="subsections">
              <SubSecHeading text="Availability" />
              <div className="availability">
                <TodayIcon
                  style={{ fontSize: '1.8rem', color: '#000000' }}
                  className="TodayIcon"
                />
                <div className="availability-day-text">
                  {details.availabilityday} | {details.availabilitytime}
                </div>
              </div>

              <SubSecHeading text="Bio" />
              <div className="content">{details.bio}</div>
              <SubSecHeading text="Reviews" />
              <div className="review">
                <div className="review-text">Rate Counselor:</div>
                {/* onChange={(event, newValue) => { }}  */}
                <Rating
                  name="rating"
                  value={newReview.rating}
                  onChange={handleChange('rating')}
                />
              </div>
              <div className="review">
                <TextField
                  id="outlined-multiline-static"
                  label="Write a review"
                  value={newReview.content}
                  multiline
                  rows={4}
                  variant="outlined"
                  style={{ width: '98%' }}
                  onChange={handleChange('content')}
                />
              </div>
              <div className="review-button">
                <MyButton
                  newWidth="100px"
                  paddingLR="5px"
                  paddingTB="5px"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </MyButton>
              </div>

              <div className="review-list">
                <ReviewList reviews={details.revs} />
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default CounselorProfile;
