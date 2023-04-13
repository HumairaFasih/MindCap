import React from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Divider,
  Checkbox,
} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import LongMenu from './Menu';
import LetterAvatar from './LetterAvatar';
import {
  retrieveDaySuffix,
  convertMonth,
  getTime,
  getDate,
} from '../utilities/date_functions';

import { instance } from '../axios';

function ApproveAppointmentCard({
  appointmentId,
  studentName,
  date,
  time,
  mode,
  status,
  onStatusChange,
}) {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleClick = (value) => {
    setIsChecked(true);
    onStatusChange(value);
  };

  const handleMeetingCardMenu = async (value) => {
    if (value === 'View Medical Report') {
      const result = await axios({
        method: 'get',
        url: `/user/medical-record?name=${studentName}`,
        withCredentials: true,
        responseType: 'blob',
      });
      const blob = new Blob([result.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank').focus();
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

          <LongMenu
            handleMeetingCardMenu={handleMeetingCardMenu}
            counselorName=""
            cancelAppointment=""
            entity="counselor"
          />
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
            {getDate(date)}
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
          <Typography> {`${getTime(time)}`}</Typography>
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

          {status === 'Pending' ? (
            <Box display="flex" flexDirection="column">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => handleClick('Approved')}
                      disabled={isChecked}
                      value="Approved"
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
                      onClick={() => handleClick('Rejected')}
                      disabled={isChecked}
                      value="Rejected"
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
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

export default ApproveAppointmentCard;
