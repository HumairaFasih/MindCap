import * as React from 'react';
import { Box, Typography, Link } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GridViewIcon from '@mui/icons-material/GridView';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LetterAvatar from './LetterAvatar';
import { retrieveDaySuffix, convertMonth } from '../utilities/date_functions';

function ComplaintCard({
  complaintId,
  counselorName,
  date,
  type,
  details,
  status,
}) {
  const getStatusColor = (statusColour) => {
    switch (statusColour) {
      case 'Resolved':
        return '#0A7800';
      case 'Pending':
        return '#F3A705';
      default:
        return '#000';
    }
  };

  const getCardColor = (cardColor) => {
    switch (cardColor) {
      case 'Resolved':
        return '#F8EDE8';
      case 'Pending':
        return '#D6E0CE';
      default:
        return '#000';
    }
  };

  const getCardBorder = (border) => {
    switch (border) {
      case 'Resolved':
        return '2px solid #FCD5CB';
      case 'Pending':
        return '2px solid #B0C9A1';
      default:
        return '#000';
    }
  };

  const getIcon = (curStatus) => {
    switch (curStatus) {
      case 'Resolved':
        return <EventAvailableIcon />;
      case 'Pending':
        return <PendingActionsIcon />;
      default:
        return <EventAvailableIcon />;
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
          bgcolor: getCardColor(status),
          borderRadius: '10px',
          p: '10px',
          m: '15px',
          border: getCardBorder(status),
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
        </Box>

        <Box display="flex" flexDirection="row" sx={{ marginTop: '7px' }}>
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
            <GridViewIcon />
          </Typography>
          <Typography>{type}</Typography>
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

        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Link
            href=""
            underline="always"
            sx={{
              color: '#000000 !important',
              textDecorationColor: '#000000 !important',
            }}
          >
            View Details
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default ComplaintCard;
