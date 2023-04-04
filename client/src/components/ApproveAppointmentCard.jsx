import React from 'react';
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Divider,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/system';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
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

function ApproveAppointmentCard({
  appointmentId,
  studentName,
  date,
  time,
  mode,
  status,
  cancelAppointment,
}) {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleClick = () => {
    setIsChecked(true);
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

  const approveColor = () => {
    if (!isChecked) {
      return '#0A7800';
    }

    return 'grey';
  };

  const rejectColor = () => {
    if (!isChecked) {
      return '#FF0000';
    }

    return 'grey';
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
              username={studentName}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              marginTop="3px"
              marginLeft="12px"
            >
              {studentName}
            </Typography>
          </Box>

          <LongMenu counselorName="" cancelAppointment="" entity="counselor" />
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
          <Typography>
            {`${new Date(date).getDate()}${retrieveDaySuffix(
              new Date(date).getDate()
            )} ${convertMonth(new Date(date).getMonth() + 1)} ${new Date(
              date
            ).getFullYear()}`}
          </Typography>
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

        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
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
                <PendingActionsIcon />
              </Typography>
              <Typography
                sx={{ color: getStatusColor(status), fontWeight: 'bold' }}
              >
                {status}
              </Typography>
            </Box>
          </Box>

          <Divider
            orientation="vertical"
            sx={{
              bgcolor: '#000',
              height: '52px',
              width: '1.2px',
              mt: '1.2px',
              borderRadius: '30px',
              mr: '3px',
              ml: '3px',
            }}
          />

          <Box display="flex" flexDirection="column">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={handleClick}
                    disabled={isChecked}
                    sx={{
                      color: 'grey',
                      p: 1.2,
                      py: 0,
                      '& .MuiSvgIcon-root': { fontSize: '1rem' },
                    }}
                  />
                }
                label={<Box sx={{ color: approveColor() }}>Approve</Box>}
                sx={{ mb: 0 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={handleClick}
                    disabled={isChecked}
                    sx={{
                      color: 'grey',
                      p: 1.2,
                      '& .MuiSvgIcon-root': { fontSize: '1rem' },
                    }}
                  />
                }
                label={<Box sx={{ color: rejectColor() }}>Reject</Box>}
                sx={{ mt: 0 }}
              />
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ApproveAppointmentCard;
