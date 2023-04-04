/* eslint-disable camelcase */
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LongMenu from './Menu';
import LetterAvatar from './LetterAvatar';
// import {
//   retrieveDaySuffix,
//   convertMonth,
//   getDate,
// } from '../utilities/date_functions';

function retrieveDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function convertMonth(m) {
  console.log(m);
  if (m === 1) {
    return 'January';
  }
  if (m === 2) {
    return 'February';
  }
  if (m === 3) {
    return 'March';
  }
  if (m === 4) {
    return 'April';
  }
  if (m === 5) {
    return 'May';
  }
  if (m === 6) {
    return 'June';
  }
  if (m === 7) {
    return 'July';
  }
  if (m === 8) {
    return 'August';
  }
  if (m === 9) {
    return 'September';
  }
  if (m === 10) {
    return 'October';
  }
  if (m === 11) {
    return 'November';
  }
  if (m === 12) {
    return 'December';
  }
}

function getTime(t) {
  const date = new Date(t);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const meridian = hours < 12 ? 'AM' : 'PM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12 < 10 ? '0' : ''}${hour12}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${meridian} - ${hour12 < 10 ? '0' : ''}${hour12 + 1}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${meridian}`;
}

function MeetingCard({
  appointment_id,
  counselorName,
  date,
  time,
  mode,
  status,
}) {
  const [isCancelled, setIsCancelled] = useState(false);
  const cancelAppointment = useCallback(async () => {
    try {
      const result = await axios({
        method: 'post',
        url: 'http://localhost:3003/api/appointment/cancel',
        data: JSON.stringify({ appointmentId: appointment_id }),
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      if (result.status === 200) {
        setIsCancelled(true);
        console.log('Successfully cancelled appointment');
      } else {
        console.log('error cancelling appointment');
      }
    } catch (error) {
      console.log(error);
    }
  }, [appointment_id]);

  const handleMeetingCardMenu = (value) => {
    if (value === 'Cancel Appointment') {
      console.log(
        `The following appointment is being cancelled: ${appointment_id}`
      );
      cancelAppointment();
    } else if (value === 'View Counselor Profile') {
      console.log('In counselor profile view');
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

  useEffect(() => {
    if (date) {
       console.log(`Printing formatted date: ${displayDate}`);
       console.log(`Print coming date: ${date}`);
    }
  }, [date, displayDate]);

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
