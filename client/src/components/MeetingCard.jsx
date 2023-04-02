import * as React from 'react';
import { Box, Typography} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import LongMenu from './Menu';
import LetterAvatar from './LetterAvatar';


function MeetingCard({
  appointmentId,
  counselorName,
  date,
  time,
  mode,
  status,
  cancelAppointment,
}) {
  
const getStatusColor = statusColour => {
    switch (statusColour) {
        case 'Approved':
        return '#0A7800';
        case 'Pending':
        return '#F3A705'
        default:
        return '#000'
    }   
    };

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
        <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{ marginBottom: '7px' }}>
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

          <LongMenu counselorName={counselorName} cancelAppointment={cancelAppointment} entity='student'/>
        </Box>

        <Box display='flex' flexDirection='row'>
          <Typography sx={{ marginLeft: '5px', marginRight: '20px', marginBottom:'-2px'}}>
            <DateRangeIcon />
          </Typography>
          <Typography>{date}</Typography>
        </Box>

        <Box display='flex' flexDirection='row'>
          <Typography sx={{ marginLeft: '5px', marginRight: '20px', marginBottom:'-2px' }}>
            <AccessTimeIcon />
          </Typography>
          <Typography>{time}</Typography>
        </Box>

        <Box display='flex' flexDirection='row'>
          <Typography sx={{ marginLeft: '5px', marginRight: '20px', marginBottom:'-2px' }}>
            <InterpreterModeIcon />
          </Typography>
          <Typography>{mode}</Typography>
        </Box>

        <Box display='flex' flexDirection='row'>
          <Typography sx={{ marginLeft: '5px', marginRight: '20px', marginBottom:'-2px' }}>
            <EventAvailableIcon />
          </Typography>
          <Typography sx={{ color: getStatusColor(status), fontWeight:'bold'}}>{status}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MeetingCard;
