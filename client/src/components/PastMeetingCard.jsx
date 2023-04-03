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

function PastMeetingCard({
  appointmentId,
  counselorName,
  date,
  time,
  mode,
  status,
}) {
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
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            sx={{ marginBottom: '7px' }}
          >
            <Box display='flex' flexDirection='row'>
              <LetterAvatar
                fontSize={20}
                height={36}
                width={36}
                username={counselorName}
              />
              <Typography
                variant='h5'
                fontWeight='bold'
                marginTop='3px'
                marginLeft='12px'
              >
                {counselorName}
              </Typography>
            </Box>
          </Box>

          <Box display='flex' flexDirection='row'>
            <Typography
              sx={{
                marginLeft: '5px',
                marginRight: '20px',
                marginBottom: '-2px',
              }}
            >
              <DateRangeIcon />
            </Typography>
            <Typography>{date}</Typography>
          </Box>

          <Box display='flex' flexDirection='row'>
            <Typography
              sx={{
                marginLeft: '5px',
                marginRight: '20px',
                marginBottom: '-2px',
              }}
            >
              <AccessTimeIcon />
            </Typography>
            <Typography>{time}</Typography>
          </Box>

          <Box display='flex' flexDirection='row'>
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

          <Box display='flex' flexDirection='row'>
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
