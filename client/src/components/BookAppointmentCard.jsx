import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function BookAppointmentCard() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '250px',
            height: '180px',
            bgcolor: '#D6E0CE',
            borderRadius: '10px',
            p: '15px',
            m: '15px',
            border: '2px solid #B0C9A1',
          }}
        >
          <Button
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              bgcolor: '#93B77D',
              width: '70px',
              height: '70px',
              color: 'white',
              fontSize: '40px',
              fontWeight: 'bold',
              textAlign: 'center',
              ':hover': {bgcolor: '#739D68'},
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => navigate('/book-appointment', { replace: true })}
          >
            +
          </Button>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', p: '10px' }}>
            Book Appointment
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default BookAppointmentCard;
