import React, { useState, useEffect, useContext } from 'react';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LongButton } from '../components/LongButton';
import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';
import { AuthContext } from '../context/AuthContext';
import { instance } from '../axios';
import { Navigate } from 'react-router-dom';

const drawerWidth = 270;

function EditCounselorProfile() {
  const {
    auth: {
      authDetails: { username },
    },
  } = useContext(AuthContext);
  const [dob, setdob] = useState(null);
  const [meridian, setMeridian] = useState('');
  const [counselorDetails, setCounselorDetails] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    qualification: '',
    gender: '',
    experience: '',
    bio: '',
    day: '',
    time: '',
  });
  const [expError, setExpError] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    instance
      .get(`/user/counselor/${username}`)
      .then((result) => {
        if (result.data.time) {
          const newtime = result.data.time.slice(0, -2);
          const newmeridian = result.data.time.slice(-2);
          // const newDate = `${newValue.$d.getDate()}/${
          //   newValue.$d.getMonth() + 1
          // }/${newValue.$d.getUTCFullYear()}`;
          setCounselorDetails({ ...result.data, time: newtime });
          setMeridian(newmeridian);
        } else {
          setCounselorDetails(result.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [username]);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;

    if (name === 'time') {
      value.slice();
    }
    setCounselorDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'meridian') {
      setMeridian(value);
    }

    if (name === 'experience') {
      {
        value < 0 || value > 50 ? setExpError(true) : setExpError(false);
      }
    }

    if (
      (name === 'fname' && value !== '' && counselorDetails.lname !== '') ||
      (name === 'lname' && value !== '' && counselorDetails.fname !== '')
    ) {
      setError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!counselorDetails.fname || !counselorDetails.lname) {
      setError(true);
    } else {
      if (!expError) {
        instance
          .post(
            '/user/counselor/edit-profile',
            JSON.stringify({
              newfirstname: counselorDetails.fname,
              newlastname: counselorDetails.lname,
              newdob: dob,
              newexperience: counselorDetails.experience,
              newqualification: counselorDetails.qualification
                ? counselorDetails.qualification
                : 0,
              newbio: counselorDetails.bio,
              newgender: counselorDetails.gender,
              newdaytype: counselorDetails.day,
              newtime: counselorDetails.time,
              newmeridian: meridian,
            })
          )
          .then(() => {
            console.log('changes to profile saved!');
            // send back to profile page
            // the return link is of form user/counselor/USERNAME
            window.location.href = `/user/counselor/${username}`;
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        console.log('Add appropriate number of experience years');
      }
    }
  };

  return (
    <Box>
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
                id="firstname-field"
                label="First Name"
                name="fname"
                value={counselorDetails.fname}
                variant="outlined"
                onChange={handleChange}
                sx={{ width: 400, m: 3 }}
                error={error}
                helperText={error ? 'Please fill in this field' : ''}
              />

              <TextField
                id="lastname-field"
                label="Last Name"
                name="lname"
                value={counselorDetails.lname}
                onChange={handleChange}
                variant="outlined"
                sx={{ width: 400, m: 3 }}
                error={error}
                helperText={error ? 'Please fill in this field' : ''}
              />
              <TextField
                disabled
                id="username-field"
                label="Username"
                name="username"
                value={counselorDetails.username}
                onChange={handleChange}
                variant="filled"
                sx={{ width: 400, m: 3 }}
              />

              <TextField
                disabled
                id="email-field"
                label="Email"
                name="email"
                value={counselorDetails.email}
                onChange={handleChange}
                variant="filled"
                sx={{ width: 400, m: 3 }}
              />

              <DatePicker
                label="Date of Birth"
                value={dob ? dob : null}
                onChange={(newValue) => {
                  setdob(newValue);
                }}
                sx={{ width: 400, m: 3 }}
              />

              <TextField
                id="exp-yrs"
                label="Years of Experience"
                name="experience"
                value={
                  counselorDetails.experience ? counselorDetails.experience : 0
                }
                type="number"
                InputProps={{ min: 0, max: 50 }}
                error={expError}
                helperText="Please enter a value between 0 and 50"
                FormHelperTextProps={{
                  style: {
                    lineHeight: 0.7,
                    paddingTop: 5,
                    marginRight: 0,
                  },
                }}
                onChange={handleChange}
                sx={{ width: 400, m: 3 }}
              />

              <TextField
                id="qualification-field"
                label="Qualification"
                name="qualification"
                value={
                  counselorDetails.qualification
                    ? counselorDetails.qualification
                    : ''
                }
                onChange={handleChange}
                sx={{ width: 400, m: 3 }}
              />

              <TextField
                id="bio-field"
                label="Write Something About Yourself"
                name="bio"
                value={counselorDetails.bio ? counselorDetails.bio : ''}
                onChange={handleChange}
                multiline
                rows={6}
                sx={{ width: 400, m: 3 }}
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
              <FormControl sx={{ m: 2, mb: 0 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{ fontWeight: 'bold' }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="gender-selection"
                  name="gender"
                  value={counselorDetails.gender ? counselorDetails.gender : ''}
                  onChange={handleChange}
                  sx={{ m: 1 }}
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

              <FormControl sx={{ m: 2, mb: 0 }}>
                <FormLabel
                  id="appointment-selection"
                  sx={{ fontWeight: 'bold' }}
                >
                  Choose Appointment Days
                </FormLabel>
                <RadioGroup
                  aria-labelledby="available-days-selection"
                  name="day"
                  value={counselorDetails.day ? counselorDetails.day : ''}
                  onChange={handleChange}
                  sx={{ m: 1 }}
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

              <FormControl sx={{ m: 2, mb: 0 }}>
                <FormLabel
                  id="available-time-selection"
                  sx={{ fontWeight: 'bold' }}
                >
                  Choose Appointment Hours
                </FormLabel>
                <RadioGroup
                  aria-labelledby="available-hours-selection"
                  name="time"
                  value={counselorDetails.time ? counselorDetails.time : ''}
                  onChange={handleChange}
                  sx={{ m: 1 }}
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

              <FormControl sx={{ m: 2 }}>
                <FormLabel id="meridian-selection" sx={{ fontWeight: 'bold' }}>
                  Choose Meridian
                </FormLabel>
                <RadioGroup
                  aria-labelledby="available-meridian-selection"
                  name="meridian"
                  value={meridian ? meridian : ''}
                  onChange={handleChange}
                  sx={{ m: 1 }}
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

              <LongButton type="submit" sx={{ ml: 2 }}>
                Save Changes
              </LongButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default EditCounselorProfile;
