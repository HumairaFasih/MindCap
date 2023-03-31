import React from 'react';
import {
  Box,
  Typography,
  Divider,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,
  Radio,
  RadioGroup,
  Checkbox,
} from '@mui/material';

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MyButton } from '../components/MyButton';
import Sidebar from '../components/Sidebar';

const drawerWidth = 270;
function BookAppointment() {
  // const buttonWidth = 528;
  // const paddingLR = 10;
  // const paddingTB = 15;
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Box sx={{ padding: '12px' }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', mb: '15px', ml: '20px' }}
            >
              Book Appointment with Counselor
            </Typography>

            <Divider
              variant="middle"
              sx={{ background: '#000', mt: '15px', mb: '15px' }}
            />
            <Box display="flex" flexDirection="row">
              <Box sx={{ margin: '0px 0px 0px 10px' }}>
                <Box sx={{ margin: '10px 80px 10px 0px' }}>
                  <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel default color="success">
                      Counselor Name
                    </InputLabel>
                    <Select
                      // labelId="demo-simple-select-autowidth-label"
                      // id="demo-simple-select-autowidth"
                      // value={counselorName}
                      // onChange={handleChange}
                      // autoWidth
                      default
                      color="success"
                      label="CounselorName"
                    >
                      <MenuItem value={10} sx={{ minWidth: 300 }}>
                        Counselor 1
                      </MenuItem>
                      <MenuItem value={21} sx={{ minWidth: 300 }}>
                        Counselor 2
                      </MenuItem>
                      <MenuItem value={22} sx={{ minWidth: 300 }}>
                        Counselor 3
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', margin: '7px 0px 0px 10px' }}
                >
                  Meeting Mode
                </Typography>
                <FormControl>
                  <RadioGroup
                  // aria-labelledby="demo-controlled-radio-buttons-group"
                  // name="controlled-radio-buttons-group"
                  // value={value}
                  // onChange={handleChange}
                  // sx={{margin: '100px 100px 100px 100px'}}
                  >
                    <FormControlLabel
                      className="radioGroup"
                      sx={{ margin: '6px 0px 0px 6px' }}
                      value="online"
                      control={<Radio color="success" />}
                      label="Online"
                    />
                    <FormControlLabel
                      className="radioGroup"
                      sx={{ margin: '6px 0px 0px 6px' }}
                      value="inPerson"
                      control={<Radio color="success" />}
                      label="In-person"
                    />
                  </RadioGroup>
                </FormControl>

                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', margin: '12px 0px 0px 10px' }}
                >
                  Select a Date and Time:
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem>
                    <DateCalendar
                      sx={{
                        margin: '14px 30px 0px 8px',
                        border: '1px solid grey',
                        borderRadius: '20px',
                      }}
                      views={['day']}
                    />
                  </DemoItem>
                </LocalizationProvider>
                <Box display="flex" flexDirection="row">
                  <Checkbox
                    {...{ 'aria-label': 'Checkbox demo' }}
                    defaultChecked
                    color="success"
                    sx={{ margin: '14px 0px 0px 0px' }}
                  />
                  <Typography variant="h7" sx={{ margin: '18px 40px 0px 0px' }}>
                    I consent to share my medical report with the Counselor.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ margin: '0px 40px 0px 170px' }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', margin: '20px 0px 0px 10px' }}
                >
                  Time
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{
                    margin: '30px 80px 10px 10px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(147, 183, 125,0.5)',
                    width: '530px',
                    height: '500px',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#ffff',
                      border: '2px solid rgb(147, 183, 125)',
                      boxShadow: '0px 2px 7px grey',
                      width: '470px',
                      height: '60px',
                      alignSelf: 'center',
                      margin: '30px 0px 0px 0px',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        margin: '15px 0px 15px 187px',
                        fontWeight: 'bold',
                        color: '#000000',
                        fontFamily: 'Calibri',
                      }}
                    >
                      6:00 PM
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#ffff',
                      border: '2px solid rgb(147, 183, 125)',
                      boxShadow: '0px 2px 7px grey',
                      width: '470px',
                      height: '60px',
                      alignSelf: 'center',
                      margin: '15px 0px 0px 0px',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        margin: '15px 0px 15px 187px',
                        fontWeight: 'bold',
                        color: '#000000',
                        fontFamily: 'Calibri',
                      }}
                    >
                      6:30 PM
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#ffff',
                      border: '2px solid rgb(147, 183, 125)',
                      boxShadow: '0px 2px 7px grey',
                      width: '470px',
                      height: '60px',
                      alignSelf: 'center',
                      margin: '15px 0px 0px 0px',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        margin: '15px 0px 15px 187px',
                        fontWeight: 'bold',
                        color: '#000000',
                        fontFamily: 'Calibri',
                      }}
                    >
                      7:00 PM
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#ffff',
                      border: '2px solid rgb(147, 183, 125)',
                      boxShadow: '0px 2px 7px grey',
                      width: '470px',
                      height: '60px',
                      alignSelf: 'center',
                      margin: '15px 0px 0px 0px',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        margin: '15px 0px 15px 187px',
                        fontWeight: 'bold',
                        color: '#000000',
                        fontFamily: 'Calibri',
                      }}
                    >
                      7:30 PM
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#ffff',
                      border: '2px solid rgb(147, 183, 125)',
                      boxShadow: '0px 2px 7px grey',
                      width: '470px',
                      height: '60px',
                      alignSelf: 'center',
                      margin: '15px 0px 0px 0px',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        margin: '15px 0px 15px 187px',
                        fontWeight: 'bold',
                        color: '#000000',
                        fontFamily: 'Calibri',
                      }}
                    >
                      8:00 PM
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#ffff',
                      border: '2px solid rgb(147, 183, 125)',
                      boxShadow: '0px 2px 7px grey',
                      width: '470px',
                      height: '60px',
                      alignSelf: 'center',
                      margin: '15px 0px 0px 0px',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        margin: '15px 0px 15px 187px',
                        fontWeight: 'bold',
                        color: '#000000',
                        fontFamily: 'Calibri',
                      }}
                    >
                      8:30 PM
                    </Typography>
                  </Box>
                </Box>
                <MyButton
                  width="528px"
                  paddinghorizontal="10px"
                  paddingvertical="15px"
                  sx={{ color: '#ffffff', margin: '18px 40px 0px 10px' }}
                >
                  Book Now
                </MyButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default BookAppointment;
