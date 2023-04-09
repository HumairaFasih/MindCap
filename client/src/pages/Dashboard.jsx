import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
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
import { AuthContext } from '../context/AuthContext';
import '../components/CardSlider.css';
import Loading from '../components/LoadingScreen';
import { instance } from '../axios';
import ComplaintCard from '../components/ComplaintCard';

const drawerWidth = 270;

function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const {
    auth: {
      authDetails: { usertype, username },
    },
  } = useContext(AuthContext);

  const getFutureMeetings = (sortedMeetings) => {
    const future = sortedMeetings.filter((item) => {
      const meetingDateTime = new Date(
        `${item.date.split('T')[0]}T${item.time.split('T')[1]}`
      );
      if (
        item.status === 'Cancelled' ||
        item.status === 'Rejected' ||
        meetingDateTime <= new Date()
      ) {
        return false;
      }
      return true;
    });

    return future;
  };

  const getPastMeetings = (sortedMeetings) => {
    const past = sortedMeetings.filter((item) => {
      const meetingDateTime = new Date(
        `${item.date.split('T')[0]}T${item.time.split('T')[1]}`
      );
      if (
        item.status !== 'Cancelled' &&
        item.status !== 'Rejected' &&
        meetingDateTime > new Date()
      ) {
        return false;
      }
      return true;
    });

    return past;
  };

  // sort complaints
  const getPendingComplaints = (sortedComplaints) => {
    const pendings = sortedComplaints.filter((item) => {
      if (item.status === 'Pending') {
        return true;
      }
      return false;
    });

    return pendings;
  };

  const getResolvedComplaints = (sortedComplaints) => {
    const past = sortedComplaints.filter((item) => {
      if (item.status === 'Pending') {
        return false;
      }
      return true;
    });

    return past;
  };

  // connect to backend to get all the meetings and divide them based on time
  useEffect(() => {
    instance
      .get('appointment/view')
      .then((result) => {
        const sortedMeetings =
          result.data.length > 0 &&
          [...result.data].sort((a, b) => new Date(a.date) - new Date(b.date));
        setMeetings(sortedMeetings);

        console.log('Printing loaded data for meeting');
        console.log(result.data);
        setLoaded(true);
        // console.log(`SORTEDD: ${meetings}`);
      })
      .catch((error) => {
        console.log('Error getting meeting data', error);
      });
  }, []);

  // load the complaints
  useEffect(() => {
    instance.get('complaint/view').then((result) => {
      const sortedComplaints =
        result.data.length > 0 &&
        [...result.data].sort((a, b) => new Date(a.date) - new Date(b.date));
      setComplaints(sortedComplaints);
      console.log('Printing loaded data for complaints');
      console.log(result.data);
      setLoaded(true);
    });
  }, []);

  // change meeting status for the meeting
  const handleAppointmentStatus = (id, status) => {
    const updatedMeetings = meetings.map((item) => {
      if (item._id === id) {
        instance
          .post(
            `/appointment/set-status`,
            JSON.stringify({
              appointmentId: id,
              studentUsername: item.student_id,
              userChoice: status,
            })
          )
          .then((result) => ({ ...item, status }))
          .catch((err) => {
            console.log(err.message);
          });
        return { ...item, status };
      }
      return item;
    });
    setMeetings(updatedMeetings);
  };

  // used to make the slider responsive
  const [screenSize, setScreenSize] = useState('');

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 850) {
      setScreenSize('small');
    } else if (window.innerWidth <= 1130) {
      setScreenSize('medium');
    } else if (window.innerWidth <= 1400) {
      setScreenSize('large');
    } else if (window.innerWidth <= 1700) {
      setScreenSize('very large');
    } else {
      setScreenSize('Big boi');
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const numSlides = (size) => {
    switch (size) {
      case 'small':
        return 1;
      case 'medium':
        return 2;
      case 'large':
        return 3;
      case 'very large':
        return 4;
      default:
        return 5;
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: numSlides(screenSize),
    slidesToScroll: numSlides(screenSize),
    centerMode: false,
  };

  // design
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
            p: 3,
            width: { xs: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Box sx={{ mt: '30px' }}>
            <PageTitle
              text={`Welcome ${username}`}
              marginB="15px"
              marginL="20px"
            />
            <Box sx={{ ml: '20px' }}>
              <SubSecHeading text="We hope you are well" />
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: '#F5F5F5',
                borderRadius: '10px',
                p: '15px',
                marginTop: '45px',
              }}
            >
              <Typography
                sx={{ fontSize: '30px', fontWeight: 'bold', ml: '15px' }}
              >
                {usertype === 'Admin'
                  ? 'New Complaints'
                  : 'Upcoming Appointments'}
              </Typography>
              <Box>
                <Slider {...settings}>
                  {usertype === 'Student' ? <BookAppointmentCard /> : null}
                  {/* render future meetings based on usertype */}
                  {usertype === 'Student'
                    ? getFutureMeetings(meetings).map((item) => (
                        <MeetingCard
                          key={item._id}
                          appointmentId={item._id}
                          counselorName={item.counselor_id}
                          date={new Date(item.date).toLocaleDateString()}
                          time={item.time}
                          mode={item.mode}
                          status={item.status}
                        />
                      ))
                    : usertype === 'Counselor'
                    ? getFutureMeetings(meetings).map((item) => (
                        <ApproveAppointmentCard
                          key={item._id}
                          appointmentId={item._id}
                          studentName={item.student_id}
                          date={new Date(item.date).toLocaleDateString()}
                          time={item.time}
                          mode={item.mode}
                          status={item.status}
                          onStatusChange={(status) =>
                            handleAppointmentStatus(item._id, status)
                          }
                        />
                      ))
                    : usertype === 'Admin' &&
                      getPendingComplaints(complaints).map((item) => (
                        <ComplaintCard
                          key={item._id}
                          complaintId={item._id}
                          counselorName={item.counselor_username}
                          date={new Date(item.filed_date).toLocaleDateString()}
                          type={item.type}
                          details={item.details}
                          status={item.status}
                        />
                      ))}
                </Slider>
              </Box>
            </Box>

            <Box
              sx={{
                width: '100%',
                height: '100%',
                minHeight: '250px',
                bgcolor: '#F5F5F5',
                borderRadius: '10px',
                p: '15px',
                mt: '20px',
              }}
            >
              <Typography
                sx={{ fontSize: '30px', fontWeight: 'bold', ml: '15px' }}
              >
                Past Appointments
              </Typography>
              <Box>
                <Slider {...settings}>
                  {/* render past meetings */}
                  {meetings.length > 0 &&
                    getPastMeetings(meetings).map((item) => (
                      <PastMeetingCard
                        key={item._id}
                        appointmentId={item._id}
                        name={
                          usertype === 'Student'
                            ? item.counselor_id
                            : item.student_id
                        }
                        date={new Date(item.date).toLocaleDateString()}
                        time={item.time}
                        mode={item.mode}
                        status={
                          item.status === 'Pending' ? 'Cancelled' : item.status
                        }
                      />
                    ))}
                  {complaints.length > 0 &&
                    getResolvedComplaints(complaints).map((item) => (
                      <ComplaintCard
                        key={item._id}
                        complaintId={item._id}
                        counselorName={item.counselor_username}
                        date={new Date(item.filed_date).toLocaleDateString()}
                        type={item.type}
                        details={item.details}
                        status={item.status}
                      />
                    ))}
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
