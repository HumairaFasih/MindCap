import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Uploadimg from '../assets/images/Uploadimg.png';
import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';

const drawerWidth = 270;

function EditStudentProfilePage() {
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [dob, setdob] = useState(null);
  const [gender, setgender] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      /* axios presents some issues when it comes to setting cookies.
      If headers and credentials become an issue we should simply
      use fetch instead */
      const result = await axios({
        method: 'post',
        url: 'http://localhost:3003/api/profile/updateprofile',
        withCredentials: true,
        data: JSON.stringify({
          newfirstname: fname,
          newlastname: lname,
          newdob: dob,
          newgender: gender,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      // Redirect to other screen when it is made
      if (result.status === 200) {
        console.log('Submit Successful, ...Redirect');
      } else {
        console.log('Submit Failed!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandlerFirstName = (e) => {
    setfname(e.target.value);
  };

  const changeHandlerLastName = (e) => {
    setlname(e.target.value);
  };

  const changeHandlerDOB = (e) => {
    setdob(new Date(e.$d));
  };

  const changeHandlerGender = (e) => {
    setgender(e.target.value);
  };

  const Signinbutton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    padding: '6px 12px',
    width: 400,
    lineHeight: 2,
    fontWeight: 'bold',
    backgroundColor: '#93B77D',
    color: '#FFFFFF',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#93B77D',
    },
    '&:active': {
      backgroundColor: '#93B77D',
    },
  });

  const BrowseButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    padding: '1px 12px',
    width: 100,
    lineHeight: 2,
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: '#93B77D',
    color: '#FFFFFF',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#93B77D',
    },
    '&:active': {
      backgroundColor: '#93B77D',
    },
  });

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
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                height: '100%',
                m: 1,
              }}
            >
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                onChange={changeHandlerFirstName}
                sx={{ width: 400, m: 3 }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={changeHandlerDOB}
                  sx={{ width: 400, m: 3 }}
                  label="Date of Birth"
                />
              </LocalizationProvider>

              <FormControl sx={{ m: 3 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{ color: '#ADADAD', fontWeight: 'bold' }}
                >
                  Upload Medical Reports
                </FormLabel>
              </FormControl>

              <Card
                sx={{
                  borderStyle: 'dotted',
                  color: '#969696',
                  borderRadius: 30,
                  width: 400,
                  height: 300,
                  alignItems: 'center',
                  p: 2,
                  ml: 3,
                }}
              >
                <img height="80px" src={Uploadimg} alt="puls agai puls" />
                <Typography
                  variant="h7"
                  sx={{
                    color: '#000',
                    width: 250,
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    m: 2,
                  }}
                >
                  Drag & Drop files to Upload or
                </Typography>
                <BrowseButton variant="contained">Browse</BrowseButton>
                <Typography
                  variant="h10"
                  sx={{
                    color: '#6B6766',
                    width: 200,
                    textAlign: 'center',
                    fontSize: 14,
                    m: 2,
                  }}
                >
                  Supported file formats: PDF, .doc, .docx
                </Typography>
              </Card>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                height: '100%',
                m: 1,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Last Name"
                onChange={changeHandlerLastName}
                variant="outlined"
                sx={{ width: 400, m: 3 }}
              />
              <TextField
                disabled
                id="outlined-basic"
                label="Username/User ID"
                variant="filled"
                defaultValue="0000000"
                sx={{ width: 400, m: 3 }}
              />
              <TextField
                disabled
                id="outlined-basic"
                label="Email"
                variant="filled"
                defaultValue="example@gmail.com"
                sx={{ width: 400, m: 3 }}
              />

              <FormControl sx={{ m: 3 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{ color: '#ADADAD', fontWeight: 'bold' }}
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

              <Signinbutton onClick={onSubmitHandler} sx={{ ml: 3 }}>
                Save Changes
              </Signinbutton>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
export default EditStudentProfilePage;
