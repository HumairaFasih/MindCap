/* eslint-disable import/no-extraneous-dependencies */
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
import UploadImg from '../assets/images/upload-img.png';
import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';
import { MyButton } from '../components/MyButton';
import { SignInButton } from '../components/SignInButton';

const drawerWidth = 270;

function EditStudentProfile() {
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [dob, setdob] = useState(new Date().toLocaleDateString('en-US'));
  const [gender, setgender] = useState('');
  const [fileData, setFileData] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFileData(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (fileData != null) {
      const formData = new FormData();
      formData.append('pdf', fileData);
      formData.append('newfirstname', fname);
      formData.append('newlastname', lname);
      formData.append('newdob', dob);
      formData.append('newgender', gender);
      try {
        const result = await axios.post(
          'http://localhost:3003/api/user/student/edit-profile',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
          }
        );
        // Redirect to other screen when it is made
        if (result.status === 200) {
          console.log('Submit Successful, ...Redirect');
        } else {
          console.log('Submit Failed!');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const changeHandlerFirstName = (e) => {
    setfname(e.target.value);
  };

  const changeHandlerLastName = (e) => {
    setlname(e.target.value);
  };

  // const changeHandlerDOB = (e) => {
  //   setdob(new Date(e.$d));
  //   console.log(dob);
  // };

  // useEffect(() => {}, [third]);

  const changeHandlerGender = (e) => {
    setgender(e.target.value);
  };

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

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dob}
                  onChange={(e) => {
                    setdob(new Date(e.$d));
                    console.log(dob);
                  }}
                  sx={{ width: 400, m: 3 }}
                  label="Date of Birth"
                />
              </LocalizationProvider> */}

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
                <img height="80px" src={UploadImg} alt="puls agai puls" />
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
                <MyButton variant="contained" component="label">
                  Browse
                  <input
                    type="file"
                    name="pdf"
                    accept=".pdf, .docx, .doc|application/*"
                    onChange={handleFileChange}
                    hidden
                  />
                </MyButton>
                {fileData == null ? (
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
                ) : (
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
                    Selected File: {fileData.name}
                  </Typography>
                )}
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

              <SignInButton onClick={onSubmitHandler} sx={{ ml: 3 }}>
                Save Changes
              </SignInButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default EditStudentProfile;
