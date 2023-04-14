import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Alert,
  Typography,
  Divider,
  InputLabel,
  IconButton,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
} from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MyButton } from '../components/MyButton';
import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';
import { instance } from '../axios';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 270;
function BookAppointment() {
  // get CounselorTime and chooseDateType from backend

  const [counselorNames, setCounselorNames] = useState([]);
  const [chosen, setChosen] = useState(true);
  const [chosenval, setChosenTimeVal] = useState('');
  const [chosenCounselor, setChosenCounselor] = useState('');
  const [counselorTime, setCounselorTime] = useState('12-3AM');
  const [chooseDateType, setDateType] = useState('weekdays');
  const [chooseDate, setDate] = useState(null);
  const [chooseTime, setTime] = useState(null);
  const [meetingMode, setMeetingMode] = useState('');
  const [shareStatus, setShareStatus] = useState('false');
  const [screenSize, setScreenSize] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let buttons = [];

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    const routeRegex = /^\/user\/counselor\//;
    if (routeRegex.test(from)) {
      setChosenCounselor(from.split('/').at(-1));
    } else {
      setChosenCounselor('');
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      instance
        .get('/appointment/get-all-counselors')
        .then((result) => {
          setCounselorNames(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);

  const handleTimeClick = (value) => {
    setChosen(value === chosen ? true : !chosen);
    setChosenTimeVal(value);
    const dateString = value;
    const dateTime = new Date(Date.parse(`01/01/1970 ${dateString}`));
    setTime(dateTime);
  };

  const disableWeekends = (date) => {
    const day = date.$d.getDay();
    return day === 0 || day === 6; // Disable Sundays (0) and Saturdays (6)
  };

  const disableWeekdays = (date) => {
    const day = date.$d.getDay();
    return day > 0 && day < 6; // Disable Sundays (0) and Saturdays (6)
  };

  const handleCounselorSelect = async (e) => {
    console.log(e.target.name, e.target.value);
    setChosenCounselor(e.target.value);
    instance
      .post(
        '/appointment/get-availability',
        JSON.stringify({ counselor: e.target.value })
      )
      .then((result) => {
        console.log(result.data.time);
        console.log(result.data.day_type);
        setCounselorTime(result.data.time);
        setDateType(result.data.day_type);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const submitHandler = async () => {
    if (
      !chosenCounselor ||
      !meetingMode ||
      !chooseDate ||
      !chooseTime
    ) {
      console.log(
        'Booking apnt',
        chosenCounselor,
        meetingMode,
        chooseDate,
        chooseTime,
        shareStatus
      );
      setError(true);
    } else {
      setError(false);
      instance
        .post(
          '/appointment/book',
          JSON.stringify({
            counselorUsername: chosenCounselor,
            meetingMode,
            date: chooseDate,
            time: chooseTime,
            share: shareStatus,
          })
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  if (counselorTime === '12-3AM') {
    buttons = [
      { label: '12:00 AM', value: '12:00 AM' },
      { label: '12:30 AM', value: '12:30 AM' },
      { label: '1:00 AM', value: '1:00 AM' },
      { label: '1:30 AM', value: '1:30 AM' },
      { label: '2:00 AM', value: '2:00 AM' },
      { label: '2:30 AM', value: '2:30 AM' },
    ];
  } else if (counselorTime === '3-6AM') {
    buttons = [
      { label: '3:00 AM', value: '3:00 AM' },
      { label: '3:30 AM', value: '3:30 AM' },
      { label: '4:00 AM', value: '4:00 AM' },
      { label: '4:30 AM', value: '4:30 AM' },
      { label: '5:00 AM', value: '5:00 AM' },
      { label: '5:30 AM', value: '5:30 AM' },
    ];
  } else if (counselorTime === '6-9AM') {
    buttons = [
      { label: '6:00 AM', value: '6:00 AM' },
      { label: '6:30 AM', value: '6:30 AM' },
      { label: '7:00 AM', value: '7:00 AM' },
      { label: '7:30 AM', value: '7:30 AM' },
      { label: '8:00 AM', value: '8:00 AM' },
      { label: '8:30 AM', value: '8:30 AM' },
    ];
  } else if (counselorTime === '9-12AM') {
    buttons = [
      { label: '9:00 AM', value: '9:00 AM' },
      { label: '9:30 AM', value: '9:30 AM' },
      { label: '10:00 AM', value: '10:00 AM' },
      { label: '10:30 AM', value: '10:30 AM' },
      { label: '11:00 AM', value: '11:00 AM' },
      { label: '11:30 AM', value: '11:30 AM' },
    ];
  } else if (counselorTime === '12-3PM') {
    buttons = [
      { label: '12:00 PM', value: '12:00 PM' },
      { label: '12:30 PM', value: '12:30 PM' },
      { label: '1:00 PM', value: '1:00 PM' },
      { label: '1:30 PM', value: '1:30 PM' },
      { label: '2:00 PM', value: '2:00 PM' },
      { label: '2:30 PM', value: '2:30 PM' },
    ];
  } else if (counselorTime === '3-6PM') {
    buttons = [
      { label: '3:00 PM', value: '3:00 PM' },
      { label: '3:30 PM', value: '3:30 PM' },
      { label: '4:00 PM', value: '4:00 PM' },
      { label: '4:30 PM', value: '4:30 PM' },
      { label: '5:00 PM', value: '5:00 PM' },
      { label: '5:30 PM', value: '5:30 PM' },
    ];
  } else if (counselorTime === '6-9PM') {
    buttons = [
      { label: '6:00 PM', value: '6:00 PM' },
      { label: '6:30 PM', value: '6:30 PM' },
      { label: '7:00 PM', value: '7:00 PM' },
      { label: '7:30 PM', value: '7:30 PM' },
      { label: '8:00 PM', value: '8:00 PM' },
      { label: '8:30 PM', value: '8:30 PM' },
    ];
  } else if (counselorTime === '9-12PM') {
    buttons = [
      { label: '9:00 PM', value: '9:00 PM' },
      { label: '9:30 PM', value: '9:30 PM' },
      { label: '10:00 PM', value: '10:00 PM' },
      { label: '10:30 PM', value: '10:30 PM' },
      { label: '11:00 PM', value: '11:00 PM' },
      { label: '11:30 PM', value: '11:30 PM' },
    ];
  }

  const handleResize = useCallback(() => {
    console.log(window.outerWidth);
    if (window.outerWidth <= 280) {
      setScreenSize('small');
    } else if (window.outerWidth <= 500) {
      setScreenSize('medium');
    } else if (window.outerWidth <= 1000) {
      setScreenSize('large');
    } else {
      setScreenSize('xlarge');
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  function responsiveColumn() {
    if (screenSize === 'small') {
      return 'column';
    }
    if (screenSize === 'medium') {
      return 'column';
    }
    if (screenSize === 'large') {
      return 'column';
    }
    return 'row';
  }

  function timeBox() {
    if (screenSize === 'small') {
      return '90vw';
    }
    if (screenSize === 'medium') {
      return '90vw';
    }
    if (screenSize === 'large') {
      return '530px';
    }
    return '530px';
  }

  function timeBoxPadding() {
    if (screenSize === 'small') {
      return '0px';
    }
    if (screenSize === 'medium') {
      return '0px';
    }
    if (screenSize === 'large') {
      return '0px';
    }
    return '170px';
  }

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { xs: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Box sx={{ padding: '12px' }}>
            <IconButton
              sx={{ mt: 0 }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <WestIcon style={{ fontSize: '30px', color: '#000000' }} />
            </IconButton>
            <PageTitle text="Book Appointment" marginB="15px" marginL="20px" />
            <Divider
              variant="middle"
              sx={{ background: '#000', mt: '15px', mb: '15px' }}
            />
            {error === true ? (
              <Alert severity="error" sx={{ mb: 2, ml: 2, mr: 2 }}>
                Please complete all fields to book your appointment!
              </Alert>
            ) : (
              error === false && (
                <Alert severity="success" sx={{ mb: 2, ml: 2, mr: 2 }}>
                  Appointment booked!
                </Alert>
              )
            )}

            <Box display="flex" flexDirection={responsiveColumn()}>
              <Box sx={{ margin: '0px 0px 0px 10px' }}>
                <Box sx={{ margin: '10px 80px 10px 0px' }}>
                  <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel default color="success">
                      Counselor Name
                    </InputLabel>
                    <Select
                      onChange={handleCounselorSelect}
                      defaultValue=""
                      color="success"
                      label="CounselorName"
                    >
                      {counselorNames &&
                        (!chosenCounselor ? (
                          counselorNames.map((counselor) => (
                            <MenuItem
                              key={counselor}
                              value={counselor}
                              sx={{ minWidth: 300 }}
                            >
                              {counselor}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem
                            key={chosenCounselor}
                            value={chosenCounselor}
                            sx={{ minWidth: 300 }}
                          >
                            {chosenCounselor}
                          </MenuItem>
                        ))}
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
                  <RadioGroup onClick={(e) => setMeetingMode(e.target.value)}>
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
                      value="In-Person"
                      control={<Radio color="success" />}
                      label="In-Person"
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
                      shouldDisableDate={
                        chooseDateType === 'weekdays'
                          ? disableWeekends
                          : disableWeekdays
                      }
                      disablePast
                      onChange={(e) => setDate(new Date(e.$d))}
                      sx={{
                        margin: '14px 30px 0px 8px',
                        border: '1px solid grey',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        '& .MuiPickersDay-root': {
                          '&.Mui-selected': {
                            backgroundColor:
                              'rgba(147, 183, 125,0.5) !important',
                            color: '#000',
                          },
                        },
                      }}
                      views={['day']}
                    />
                  </DemoItem>
                </LocalizationProvider>

                <Box display="flex" flexDirection="row">
                  <Checkbox
                    onChange={(e) => setShareStatus(e.target.checked)}
                    {...{ 'aria-label': 'Share status' }}
                    defaultChecked
                    color="success"
                    sx={{ margin: '14px 0px 0px 0px' }}
                  />
                  <Typography variant="h7" sx={{ margin: '18px 40px 0px 0px' }}>
                    I consent to share my medical report with the Counselor.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ margin: '0px 40px 0px 0px', ml: timeBoxPadding() }}>
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
                    width: timeBox(),
                    height: '500px',
                    pt: '15px',
                  }}
                >
                  {buttons.map((button) => (
                    <Button
                      key={button.value}
                      onClick={() => handleTimeClick(button.value)}
                      disableRipple
                      sx={{
                        borderRadius: '12px',
                        backgroundColor:
                          button.value === chosenval ? '#C5C5C5' : '#ffffff',
                        border: '2px solid rgb(147, 183, 125)',
                        boxShadow: '0px 2px 7px grey',
                        width: '90%',
                        height: '60px',
                        alignSelf: 'center',
                        margin: '15px 0px 0px 0px',
                        transition: '0.1s',
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          alignSelf: 'center',
                          fontWeight: 'bold',
                          color: '#000000',
                          fontFamily: 'Calibri',
                        }}
                      >
                        {button.label}
                      </Typography>
                    </Button>
                  ))}
                </Box>

                <MyButton
                  onClick={submitHandler}
                  paddinghorizontal="10px"
                  paddingvertical="15px"
                  sx={{
                    color: '#ffffff',
                    margin: '18px 40px 0px 10px',
                    width: timeBox(),
                  }}
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
