import React, { useState, useEffect } from 'react';
import { Box, color, display, styled } from '@mui/system';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import WestIcon from '@mui/icons-material/West';
import { Typography } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';

import TextField from '@mui/material/TextField';


import axios from 'axios';
import { useParams } from 'react-router-dom';

import PageTitle from '../components/PageTitle';
import SubSecHeading from '../components/SubSecHeading';
import ProfileIcon from '../components/ProfileIcon';
import Sidebar from '../components/SidebarStudent';
import MyRating from '../components/Rating';
// import { SignInButton } from '../components/SignInButton';
import { MyButton } from '../components/MyButton';
import ReviewList from '../components/ReviewList';

import './profile.css';

const drawerWidth = 270;

function CounselorProfile(props) {
    // const { counselor } = props.location.state;
    const [rating, setRating] = useState(null);
    const [reviewsList, setReviewsList] = useState([]);
    const { counselor } = useParams();
    const [details, setDetails] = useState({
        username: '',
        firstName: '',
        lastName: '',
        gender : '',
        experience: '',
        qualification: '',
      });

    useEffect(() => {
       
        const getData = async () => {
            try {
                // const result = await axios({
                //     method: 'get',
                //     url: `http://localhost:3003/api/rate/${counselor}/rating`,
                //     headers: { 'Content-Type': 'application/json' },
                // });
                // setRating(result.data.rating);
                // setReviewsList(result.data.reviews);

                const counselorDetails = await axios({
                    method: 'get',
                    url: `http://localhost:3003/api/profile/users/${counselor}`,
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log('DATA:', counselorDetails);
                
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, [counselor]);
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box
                    component='main'
                    sx={{
                        flexGrow: 1,
                        ml: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` }
                    }}
                >
                    <IconButton onClick={() => { console.log('Clicked!') }}>
                        <WestIcon style={{ fontSize: '2.5rem', color: '#000000' }} />
                    </IconButton>
                    <div className="user-profile-header">

                        <div className="user-profile-icon">
                            <ProfileIcon accountName="Counselor" />
                        </div>
                        <div className="user-profile-fields">
                            <div className="user-profile-title">
                                <PageTitle text="Counselor Profile" marginL="0rem" />
                            </div>
                            <div>Psychologist</div>
                            <div>Username | Gender | Experience</div>
                            <div>
                                {rating !== null && <MyRating name="rating" value={rating} readOnly />}
                            </div>

                        </div>
                        <MyButton newWidth='200px' paddingLR='10px' paddingTB='10px' variant='contained' sx={{ mb: 10, ml: 50, mt: 1 }}>
                            Book Appointment
                        </MyButton>
                    </div>
                    <div>
                        {/* Change font color of Typography to black.  */}
                        <div className="subsections">
                            <SubSecHeading text="Availability" />
                            <div className="availability">
                                <TodayIcon style={{ fontSize: '1.8rem', color: '#000000' }} className="TodayIcon" />
                                <div className="availability-day-text">
                                    Weekdays | 9:00 AM - 5:00 PM
                                </div>
                            </div>

                            <SubSecHeading text="Bio" />
                            <div className="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel
                                tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl et nisl.
                            </div>
                            <SubSecHeading text="Reviews" />
                            <div className="review">
                                <div className="review-text">
                                    Rate Counselor:
                                </div>
                                <MyRating name="rating" value={0} readOnly={false} onChange={(event, newValue) => { }} />
                            </div>
                            <div className="review">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Write a review"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    style={{ width: '98%' }} />
                            </div>
                            <div className="review-button">
                                <MyButton newWidth='100px' paddingLR='5px' paddingTB='5px' variant='contained' >
                                    Submit
                                </MyButton>
                            </div>

                            <div className="review-list">
                                <ReviewList reviews={reviewsList} />
                            </div>



                        </div>

                    </div>

                </Box>
            </Box>
        </div>
    );
}

export default CounselorProfile;