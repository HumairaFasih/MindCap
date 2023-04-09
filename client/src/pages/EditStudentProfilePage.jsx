import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Card,
  TextField,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UploadImg from '../assets/images/upload-img.png';
import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';
import { MyButton } from '../components/MyButton';
import { LongButton } from '../components/LongButton';
import { AuthContext } from '../context/AuthContext';
import { instance } from '../axios';

const drawerWidth = 270;

function EditStudentProfile() {
  const [dob, setdob] = useState(null);
  const { username } = useContext(AuthContext);
  const [fileData, setFileData] = useState('');
  const [studentDetails, setStudentDetails] = useState({
    fname: '',
    lname: '',
    roll_num: '',
    gender: '',
    dob: null,
    email: '',
    // med_filename: '',
  });

  const navigate = useNavigate();
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFileData(e.target.files[0]);
    }
  };

  useEffect(() => {
    instance
      .get(`user/student/${username}`)
      .then((result) => {
        if (result.data) {
          setStudentDetails(result.data);
        } else {
          console.log('No data fetched from database for this student!');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileData != null) {
      const formData = new FormData();
      formData.append('pdf', fileData);
      formData.append('newfirstname', studentDetails.fname);
      formData.append('newlastname', studentDetails.lname);
      formData.append('newdob', dob);
      formData.append('newgender', studentDetails.gender);
      try {
        const result = await axios.post(
          `http://localhost:3003/api/user/student/edit-profile`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
          }
        );
        // Redirect to other screen when it is made
        if (result.status === 200) {
          console.log('Submit Successful, ...Redirect');
          navigate(`user/student/${username}`);
        } else {
          console.log('Submit Failed!');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({ ...studentDetails, [name]: value });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="form"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ mt: '30px' }}>
          <PageTitle text="Edit Profile" marginB="15px" marginL="20px" />
          <Divider
            variant="middle"
            sx={{ background: '#000', marginVertical: '15px' }}
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
              id="firstname-field"
              label="First Name"
              name="fname"
              value={studentDetails.fname}
              variant="outlined"
              onChange={handleChange}
              sx={{ width: 400, m: 3 }}
            />

            <DatePicker
              value={dob}
              onChange={(newdob) => setdob(newdob)}
              sx={{ width: 400, m: 3 }}
              label="Date of Birth"
            />

            <FormControl sx={{ m: 3 }}>
              <FormLabel
                id="medical report"
                sx={{ color: '#ADADAD', fontWeight: 'bold' }}
              >
                Upload Medical Reports
              </FormLabel>
            </FormControl>

            <Card
              sx={{
                borderStyle: 'dotted',
                display: 'flex',
                flexDirection: 'column',
                color: '#969696',
                borderRadius: 10,
                width: 400,
                height: 300,
                alignItems: 'center',
                p: 2,
                ml: 3,
              }}
            >
              <img height="80px" src={UploadImg} alt="upload-file-icon" />
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
                {fileData
                  ? `Selected File: ${fileData.name}`
                  : 'Supported file formats: PDF, .doc, .docx'}
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
              id="last-name-field"
              label="Last Name"
              name="lname"
              value={studentDetails.lname}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: 400, m: 3 }}
            />
            <TextField
              disabled
              id="username-field"
              label="Username/Roll Number"
              name="roll_num"
              value={studentDetails.roll_num}
              onChange={handleChange}
              variant="filled"
              sx={{ width: 400, m: 3 }}
            />
            <TextField
              disabled
              id="email-field"
              label="Email"
              name="email"
              value={studentDetails.email}
              onChange={handleChange}
              variant="filled"
              sx={{ width: 400, m: 3 }}
            />

            <FormControl sx={{ m: 3 }}>
              <FormLabel
                id="gender"
                sx={{ color: '#ADADAD', fontWeight: 'bold' }}
              >
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby="gender"
                name="gender"
                value={studentDetails.gender}
                onChange={handleChange}
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

            <LongButton type="submit" sx={{ ml: 3 }}>
              Save Changes
            </LongButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default EditStudentProfile;
