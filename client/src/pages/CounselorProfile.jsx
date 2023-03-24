import React, { useState, useEffect } from 'react';
import { Box, styled } from '@mui/system';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import WestIcon from '@mui/icons-material/West';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import PageTitle from '../components/PageTitle';
import ProfileIcon from '../components/ProfileIcon';
import Sidebar from '../components/SidebarStudent';
import MyRating from '../components/Rating';

import './profile.css';

const drawerWidth = 270;

function CounselorProfile(props) {
    // const { counselor } = props.location.state;
    const [rating, setRating] = useState(null);
    const { counselor } = useParams();

    useEffect(() => {
        const getRating = async () => {
            try {
                const result = await axios({
                    method: 'get',
                    url: `http://localhost:3003/api/rate/${counselor}/rating`,
                    headers: { 'Content-Type': 'application/json' },
                });
                setRating(result.data.rating);
            } catch (err) {
                console.log(err);
            }
        };
        getRating();
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
                                <PageTitle text="Counselor Profile"  marginL="0rem" />
                            </div>
                            <div>Psychologist</div>
                            <div>Username | Gender | Experience</div>
                            <div>

                            {rating !== null && <MyRating rating={rating} />}
                            </div>
                        </div>
                    </div>

                </Box>
            </Box>
        </div>
    );
}

export default CounselorProfile;