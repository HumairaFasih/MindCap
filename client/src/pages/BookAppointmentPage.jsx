import * as React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
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
  Button
} from '@mui/material';

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MyButton } from '../components/MyButton';
import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';

const drawerWidth = 270;
function BookAppointment() {
 
  // get CounselorTime and chooseDateType from backend

  const [counselorNames, setCounselorNames] = useState([]);
  const [chosen, setChosen] = React.useState(true);
  const [chosenval, setChosenTimeVal]=React.useState('')
  const [chosenCounselor, setChosenCounselor] = useState('');
  const [counselorTime, setCounselorTime] = useState('12-3AM');
  const [chooseDateType, setDateType] =useState('weekdays');
  const [chooseDate, setDate]= useState(null);
  const [chooseTime, setTime] = useState(null);
  const [meetingMode, setMeetingMode] = useState('');
  const [shareStatus, setShareStatus] = useState('false');

  let buttons=[]


  useEffect(() => {
    async function fetchData(){
    const result = await axios.get('http://localhost:3003/api/appointment/get-all-counselors');
    setCounselorNames(result.data);
    }
    fetchData();
  }, [])

  const handleTimeClick=(value)=>{
    setChosen(value===chosen? true: !chosen)
    setChosenTimeVal(value)
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
    setChosenCounselor(e.target.value);
    const result = await axios({
      method: 'post',
      url: 'http://localhost:3003/api/appointment/get-availability',
      withCredentials: true,
      data: JSON.stringify( {counselor: e.target.value}),
      headers: { 'Content-Type': 'application/json' },
    });
    setCounselorTime(result.data.time);
    setDateType(result.data.day_type)
  }

  const submitHandler = async () => {
    const result = await axios({
      method: 'post', 
      url: 'http://localhost:3003/api/appointment/book',
      withCredentials: true,
      data: JSON.stringify({
        counselorUsername: chosenCounselor,
        meetingMode,
        date: chooseDate, 
        time: chooseTime, 
        share: shareStatus
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(result);
  }

  if (counselorTime==='12-3AM') {
    buttons=[
      {label: '12:00 AM', value: '12:00 AM'},
      {label: '12:30 AM', value: '12:30 AM'},
      {label: '1:00 AM', value: '1:00 AM'},
      {label: '1:30 AM', value: '1:30 AM'},
      {label: '2:00 AM', value: '2:00 AM'},
      {label: '2:30 AM', value: '2:30 AM'},
    ]
  }
  else if (counselorTime==='3-6AM') {
    buttons=[
      {label: '3:00 AM', value: '3:00 AM'},
      {label: '3:30 AM', value: '3:30 AM'},
      {label: '4:00 AM', value: '4:00 AM'},
      {label: '4:30 AM', value: '4:30 AM'},
      {label: '5:00 AM', value: '5:00 AM'},
      {label: '5:30 AM', value: '5:30 AM'},
    ]
  }
  else if (counselorTime==='6-9AM') {
    buttons=[
      {label: '6:00 AM', value: '6:00 AM'},
      {label: '6:30 AM', value: '6:30 AM'},
      {label: '7:00 AM', value: '7:00 AM'},
      {label: '7:30 AM', value: '7:30 AM'},
      {label: '8:00 AM', value: '8:00 AM'},
      {label: '8:30 AM', value: '8:30 AM'},
    ]
  }
  else if (counselorTime==='9-12PM') {
    buttons=[
      {label: '9:00 AM', value: '9:00 AM'},
      {label: '9:30 AM', value: '9:30 AM'},
      {label: '10:00 AM', value: '10:00 AM'},
      {label: '10:30 AM', value: '10:30 AM'},
      {label: '11:00 AM', value: '11:00 AM'},
      {label: '11:30 AM', value: '11:30 AM'},
    ]
  }
  else if (counselorTime==='12-3PM') {
    buttons=[
      {label: '12:00 PM', value: '12:00 PM'},
      {label: '12:30 PM', value: '12:30 PM'},
      {label: '1:00 PM', value: '1:00 PM'},
      {label: '1:30 PM', value: '1:30 PM'},
      {label: '2:00 PM', value: '2:00 PM'},
      {label: '2:30 PM', value: '2:30 PM'},
    ]
  }
  else if (counselorTime==='3-6PM') {
    buttons=[
      {label: '3:00 PM', value: '3:00 PM'},
      {label: '3:30 PM', value: '3:30 PM'},
      {label: '4:00 PM', value: '4:00 PM'},
      {label: '4:30 PM', value: '4:30 PM'},
      {label: '5:00 PM', value: '5:00 PM'},
      {label: '5:30 PM', value: '5:30 PM'},
    ]

  }
  else if (counselorTime==='6-9PM') {
    buttons=[
      {label: '6:00 PM', value: '6:00 PM'},
      {label: '6:30 PM', value: '6:30 PM'},
      {label: '7:00 PM', value: '7:00 PM'},
      {label: '7:30 PM', value: '7:30 PM'},
      {label: '8:00 PM', value: '8:00 PM'},
      {label: '8:30 PM', value: '8:30 PM'},
    ]
  }
  else if (counselorTime==='9-12AM') {
    buttons=[
      {label: '9:00 PM', value: '9:00 PM'},
      {label: '9:30 PM', value: '9:30 PM'},
      {label: '10:00 PM', value: '10:00 PM'},
      {label: '10:30 PM', value: '10:30 PM'},
      {label: '11:00 PM', value: '11:00 PM'},
      {label: '11:30 PM', value: '11:30 PM'},
    ]
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
                    <Select onChange={handleCounselorSelect}
                      default
                      color="success"
                      label="CounselorName"
                    >
                      { counselorNames.length !== 0 ?
                    counselorNames.map((counselor) => (
                      <MenuItem value={counselor} sx={{minWidth: 300}}>{counselor}</MenuItem>
                    )):null
                  }
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
                  <RadioGroup onClick={(e) => setMeetingMode(e.target.value)}
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
                      shouldDisableDate={chooseDateType==='weekdays'? disableWeekends: disableWeekdays}
                      disablePast
                      onChange={(e) => setDate((new Date(e.$d)))}
                      sx={{
                        margin: '14px 30px 0px 8px',
                        border: '1px solid grey',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        '& .MuiPickersDay-root': {
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(147, 183, 125,0.5) !important' ,
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
                    pt: '15px'
                  }}
                >
                  
                  {buttons.map((button)=>(
                  <Button
                    key={button.value}
                    onClick={()=>handleTimeClick(button.value)}
                    disableRipple
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: button.value===chosenval ? '#C2D7BF': '#ffffff',
                      border: '2px solid rgb(147, 183, 125)',
                      boxShadow: '0px 2px 7px grey',
                      width: '470px',
                      height: '60px',
                      alignSelf: 'center',
                      margin: '15px 0px 0px 0px',
                      transition:'0.1s'
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
                  </Button>))}

                </Box>

                <MyButton
                  onClick={submitHandler}
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