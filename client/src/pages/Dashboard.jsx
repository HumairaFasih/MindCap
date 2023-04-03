/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
} from '@mui/material';
import './EditCounselorProfilePage.css';
import Slider from 'react-slick';
import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';
import SubSecHeading from '../components/SubSecHeading';
import BookAppointmentCard from '../components/BookAppointmentCard';
import MeetingCard from '../components/MeetingCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PastMeetingCard from '../components/PastMeetingCard';
import ApproveAppointmentCard from '../components/ApproveAppointmentCard';

const drawerWidth = 270;

function Dashboard() {
  
  // used to make the slider responsive, don't touch
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 850) {
        setScreenSize('small');
      } else if (window.innerWidth <= 1130) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numSlides = (size) => {
    switch (size) {
      case 'small':
        return 1;
      case 'medium':
        return 2;
      case 'large':
        return 3;
      default:
        return 3;
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: numSlides(screenSize),
    slidesToScroll: numSlides(screenSize),
  };
  
  // design
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            width: {xs: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Box sx={{ mt: '30px' }}>
            <PageTitle text='Welcome Summer Ijaz!' marginB='15px' marginL='20px' />
            <Box sx={{ml:'20px'}}><SubSecHeading text='We hope you are well'/></Box>
          </Box>

          <Box>
            <Box sx={{ width: '100%', height: '100%', bgcolor: '#F5F5F5', borderRadius: '10px', p:'15px', marginTop: '45px'}}>
              <Typography sx={{fontSize:'30px', fontWeight:'bold', ml: '15px'}}>Upcoming Meetings</Typography>
              <Box>
                <Slider {...settings}>
                  <BookAppointmentCard/>
                  <ApproveAppointmentCard appointmentId='123' studentName='Ahmed' date='28th February' time='3:00 PM' mode='In-person' status='Pending'/>
                  <MeetingCard appointmentId='123' counselorName='Ahmed' date='25th February' time='12:00 PM' mode='In-person' status='Approved'/>
                  <MeetingCard appointmentId='123' counselorName='Ahmed' date='28th February' time='3:00 PM' mode='In-person' status='Pending'/>
                </Slider>
              </Box>
            </Box>

            <Box sx={{ width: '100%', height: '100%', minHeight:'250px', bgcolor: '#F5F5F5', borderRadius: '10px', p:'15px', mt:'20px'}}>
              <Typography sx={{fontSize:'30px', fontWeight:'bold', ml: '15px'}}>Past Meetings</Typography>
              <Box>
                <Slider {...settings}>
                  <PastMeetingCard appointmentId='123' counselorName='Ahmed' date='25th February' time='12:00 PM' mode='In-person' status='Attended'/>
                  <PastMeetingCard appointmentId='123' counselorName='Ahmed' date='28th February' time='3:00 PM' mode='In-person' status='Rejected'/>
                  <PastMeetingCard appointmentId='123' counselorName='Ahmed' date='28th February' time='3:00 PM' mode='In-person' status='Cancelled'/>
                </Slider>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;