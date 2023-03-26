/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Divider,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from '@mui/material';
import './EditCounselorProfilePage.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SignInButton } from '../components/SignInButton';
import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';

const drawerWidth = 270;

function EditCounselorProfilePage() {
  // connect backend and add functionality to submit

  // setting up useState hooks for each variable
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [dob, setdob] = useState(null);
  const [years, setyears] = useState('');
  const [qualification, setqualification] = useState('');
  const [bio, setbio] = useState('');
  const [gender, setgender] = useState('');
  const [day, setday] = useState('');
  const [time, settime] = useState('');
  const [meridian, setmeridian] = useState('');

  // on form submit, send data to backend using axios
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        method: 'post',
        url: 'http://localhost:3003/api/profile/updateprofile',
        withCredentials: true,
        data: JSON.stringify({
          newfirstname: fname,
          newlastname: lname,
          newdob: dob,
          newexperience: years,
          newqualification: qualification,
          newbio: bio,
          newgender: gender,
          newdaytype: day,
          newtime: time,
          newmeridian: meridian,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (result.status === 200) {
        console.log('Submit Successful, ...Redirect');
      } else {
        console.log('Submit Failed!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // on change of each field, use hook to set the name of the variable
  const changeHandlerFirstName = (e) => {
    setfname(e.target.value);
  };

  const changeHandlerLastName = (e) => {
    setlname(e.target.value);
  };

  const changeHandlerDOB = (e) => {
    setdob(new Date(e.$d));
  };

  const changeHandlerExperience = (e) => {
    setyears(e.target.value);
  };

  const changeHandlerQualification = (e) => {
    setqualification(e.target.value);
  };

  const changeHandlerBio = (e) => {
    setbio(e.target.value);
  };

  const changeHandlerGender = (e) => {
    setgender(e.target.value);
  };

  const changeHandlerDay = (e) => {
    setday(e.target.value);
  };

  const changeHandlerTime = (e) => {
    settime(e.target.value);
  };

  const changeHandlerMeridian = (e) => {
    setmeridian(e.target.value);
  };

  // design
  return (
    <div>
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
          <Box sx={{ mt: '30px' }}>
            <PageTitle text="Edit Profile" marginB="15px" marginL="20px" />

            <Divider
              variant="middle"
              sx={{ background: '#000', mt: '15px', mb: '15px' }}
            />
          </Box>

          <Box
            // make responsive for mobile
            className="ExternalBox"
          >
            <Box
              className="InternalBox"
              sx={{
                maxWidth: '100%',
                width: 500,
                minWidth: 280,
              }}
            >
              <TextField
                id="outlined-basic"
                label="First Name"
                onChange={changeHandlerFirstName}
                variant="outlined"
                sx={{ m: 2 }}
              />

              <TextField
                id="outlined-basic"
                label="Last Name"
                onChange={changeHandlerLastName}
                variant="outlined"
                sx={{ m: 2 }}
              />
              <TextField
                disabled
                id="outlined-basic"
                label="Username/User ID"
                variant="filled"
                defaultValue="0000000"
                sx={{ m: 2 }}
              />
              <TextField
                disabled
                id="outlined-basic"
                label="Email"
                variant="filled"
                defaultValue="example@gmail.com"
                sx={{ m: 2 }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={changeHandlerDOB}
                  sx={{ m: 2 }}
                  label="Date of Birth"
                />
              </LocalizationProvider>

              <TextField
                id="outlined-number"
                label="Years of Experience"
                onChange={changeHandlerExperience}
                type="number"
                sx={{ m: 2 }}
              />

              <TextField
                id="outlined-number"
                label="Highest Education"
                onChange={changeHandlerQualification}
                sx={{ m: 2 }}
              />

              <TextField
                id="outlined-multiline-static"
                label="Write Something About Yourself"
                onChange={changeHandlerBio}
                multiline
                rows={4}
                defaultValue="Default Value"
                sx={{ m: 2 }}
              />
            </Box>

            <Box
              className="InternalBox"
              sx={{
                maxWidth: '100%',
                width: 500,
                minWidth: 280,
                m: 1,
              }}
            >
              <FormControl sx={{ m: 3, mb: 0 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{ fontWeight: 'bold' }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Female"
                  name="radio-buttons-group"
                  onChange={changeHandlerGender}
                  sx={{ m: 1, ml: 2 }}
                >
                  <FormControlLabel
                    value="Female"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    value="Prefer not to say"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="Prefer not to say"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl sx={{ m: 3, mb: 0 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{ fontWeight: 'bold' }}
                >
                  Choose Appointment Days
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Weekdays"
                  name="radio-buttons-group"
                  onChange={changeHandlerDay}
                  sx={{ m: 1, ml: 2 }}
                >
                  <FormControlLabel
                    value="Weekdays"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="Weekdays"
                  />
                  <FormControlLabel
                    value="Weekends"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="Weekends"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl sx={{ m: 3, mb: 0 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{ fontWeight: 'bold' }}
                >
                  Choose Appointment Hours
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="12-3"
                  name="radio-buttons-group"
                  onChange={changeHandlerTime}
                  sx={{ m: 1, ml: 2 }}
                >
                  <FormControlLabel
                    value="12-3"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="12-3"
                  />
                  <FormControlLabel
                    value="3-6"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="3-6"
                  />
                  <FormControlLabel
                    value="6-9"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="6-9"
                  />
                  <FormControlLabel
                    value="9-12"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="9-12"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl sx={{ m: 3 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{ fontWeight: 'bold' }}
                >
                  Choose Meridian
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="12-3"
                  name="radio-buttons-group"
                  onChange={changeHandlerMeridian}
                  sx={{ m: 1, ml: 2 }}
                >
                  <FormControlLabel
                    value="AM"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="AM"
                  />
                  <FormControlLabel
                    value="PM"
                    control={
                      <Radio sx={{ '&.Mui-checked': { color: '#93B77D' } }} />
                    }
                    label="PM"
                  />
                </RadioGroup>
              </FormControl>

              <SignInButton
                onClick={onSubmitHandler}
                sx={{ ml: 3, width: 300 }}
              >
                Save Changes
              </SignInButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
export default EditCounselorProfilePage;
