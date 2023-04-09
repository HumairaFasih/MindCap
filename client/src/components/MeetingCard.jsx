/* eslint-disable camelcase */
import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LongMenu from './Menu';
import LetterAvatar from './LetterAvatar';
import {
  retrieveDaySuffix,
  convertMonth,
  getTime,
} from '../utilities/date_functions';
import { instance } from '../axios';

function MeetingCard({
  appointment_id,
  counselorName,
  date,
  time,
  mode,
  status,
}) {
  const [isCancelled, setIsCancelled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const counselorProfileRoute = `${location.pathname
    .split('/')
    .slice(0, -1)
    .join('/')}/user/counselor/${counselorName}`;

  const handleNavigation = () => {
    navigate(counselorProfileRoute);
  };

  const cancelAppointment = useCallback(() => {
    instance
      .post(
        '/appointment/cancel',
        JSON.stringify({
          appointmentId: appointment_id,
        })
      )
      .then((result) => {
        if (result.status === 200) {
          setIsCancelled(true);
          console.log('Successfully cancelled appointment');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [appointment_id]);

  const handleMeetingCardMenu = (value) => {
    if (value === 'Cancel Appointment') {
      console.log(
        `The following appointment is being cancelled: ${appointment_id}`
      );
      cancelAppointment();
    } else if (value === 'View Counselor Profile') {
      console.log('In counselor profile view');
      handleNavigation();
    } else if (value === 'View Medical Report') {
      console.log('In view medical profile');
    } else {
      console.log(`You selected option ${value}, no such option exists.`);
    }
  };

  const getIcon = (statusIcon) => {
    switch (statusIcon) {
      case 'Approved':
        return <EventAvailableIcon />;
      case 'Pending':
        return <PendingActionsIcon />;
      default:
        return <PendingActionsIcon />;
    }
  };

  const getStatusColor = (statusColour) => {
    switch (statusColour) {
      case 'Approved':
        return '#0A7800';
      case 'Pending':
        return '#F3A705';
      default:
        return '#000';
    }
  };

  const displayDate = `${new Date(date).getDate()}${retrieveDaySuffix(
    new Date(date).getDate()
  )} ${convertMonth(new Date(date).getMonth() + 1)} ${new Date(
    date
  ).getFullYear()}`;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '250px',
          height: '180px',
          bgcolor: '#D6E0CE',
          borderRadius: '10px',
          p: '10px',
          m: '15px',
          border: '2px solid #B0C9A1',
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ marginBottom: '7px' }}
        >
          <Box display="flex" flexDirection="row">
            <LetterAvatar
              fontSize={20}
              height={36}
              width={36}
              username={counselorName}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              marginTop="3px"
              marginLeft="12px"
            >
              {counselorName}
            </Typography>
          </Box>

          <LongMenu handleMeetingCardMenu={handleMeetingCardMenu} />
        </Box>

        <Box display="flex" flexDirection="row">
          <Typography
            sx={{
              marginLeft: '5px',
              marginRight: '20px',
              marginBottom: '-2px',
            }}
          >
            <DateRangeIcon />
          </Typography>
          <Typography>{displayDate}</Typography>
        </Box>

        <Box display="flex" flexDirection="row">
          <Typography
            sx={{
              marginLeft: '5px',
              marginRight: '20px',
              marginBottom: '-2px',
            }}
          >
            <AccessTimeIcon />
          </Typography>
          <Typography>{`${getTime(new Date(time))}`}</Typography>
        </Box>

        <Box display="flex" flexDirection="row">
          <Typography
            sx={{
              marginLeft: '5px',
              marginRight: '20px',
              marginBottom: '-2px',
            }}
          >
            <InterpreterModeIcon />
          </Typography>
          <Typography>{mode}</Typography>
        </Box>

        <Box display="flex" flexDirection="row">
          <Typography
            sx={{
              marginLeft: '5px',
              marginRight: '20px',
              marginBottom: '-2px',
            }}
          >
            {getIcon(isCancelled ? 'Cancelled' : status)}
          </Typography>
          <Typography
            sx={{
              color: getStatusColor(isCancelled ? 'Cancelled' : status),
              fontWeight: 'bold',
            }}
          >
            {isCancelled ? 'Cancelled' : status}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MeetingCard;
