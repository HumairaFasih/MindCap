import React from 'react';
import { Box, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LongMenu from './Menu';
import LetterAvatar from './LetterAvatar';

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

function getDate(t) {
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

function PastMeetingCard({ appointmentId, name, date, time, mode, status }) {
  const getIcon = (statusIcon) => {
    switch (statusIcon) {
      case 'Attended':
        return <EventAvailableIcon />;
      case 'Cancelled':
        return <EventBusyIcon />;
      case 'Rejected':
        return <EventBusyIcon />;
      default:
        return <PendingActionsIcon />;
    }
  };
  const getStatusColor = (statusColour) => {
    switch (statusColour) {
      case 'Attended':
        return '#0A7800';
      case 'Cancelled':
        return '#FF0000';
      case 'Rejected':
        return '#FF0000';
      default:
        return '#000';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '250px',
            height: '180px',
            bgcolor: '#F8EDE8',
            borderRadius: '10px',
            p: '10px',
            m: '15px',
            border: '2px solid #FCD5CB',
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
                username={name}
              />
              <Typography
                variant="h5"
                fontWeight="bold"
                marginTop="3px"
                marginLeft="12px"
              >
                {name}
              </Typography>
            </Box>
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
            <Typography>{`${new Date(date).getDate()}${retrieveDaySuffix(
              new Date(date).getDate()
            )} ${convertMonth(new Date(date).getMonth() + 1)} ${new Date(
              date
            ).getFullYear()}`}</Typography>
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
            <Typography> {`${getDate(new Date(time))}`}</Typography>
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
              {getIcon(status)}
            </Typography>
            <Typography
              sx={{ color: getStatusColor(status), fontWeight: 'bold' }}
            >
              {status}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PastMeetingCard;
