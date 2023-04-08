/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AuthContext } from '../context/AuthContext';

import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';
import { MyButton } from '../components/MyButton';

const drawerWidth = 270;

function LodgeComplaint() {
  const [counselorNames, setCounselorNames] = useState([]);
  const [chosenCounselor, setChosenCounselor] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [complaintDetails, setComplaintDetails] = useState('');
  const user = useContext(AuthContext);
  const { usertype, username } = user;

  const submitHandler = async () => {
    const result = await axios({
      method: 'post',
      url: 'http://localhost:3003/api/complaint/lodge',
      withCredentials: true,
      data: JSON.stringify({
        counselor: chosenCounselor,
        complaintType,
        complaintDetails,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(result);
  };

  const handleCounselorSelect = async (e) => {
    setChosenCounselor(e.target.value);
  };

  const handleComplaintTypeSelect = async (e) => {
    setComplaintType(e.target.value);
  };

  const handleComplaintDetailsChange = async (e) => {
    setComplaintDetails(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        'http://localhost:3003/api/appointment/get-all-counselors'
      );
      setCounselorNames(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(`Printing usertype received by sidebar: ${usertype}`);
      console.log(`Printing username received by sidebar: ${username}`);
    }
  }, [user, usertype, username]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="form"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box sx={{ mt: '30px' }}>
          <PageTitle text="Lodge Complaint" marginB="10px" marginL="20px" />
          <Typography sx={{ fontSize: '14px', ml: '20px', mb: '3px' }}>
            We are here to assist you!{' '}
          </Typography>
          <Typography sx={{ fontSize: '14px', ml: '20px', mb: '7px' }}>
            Please fill the form below to provide details of your complaint.
          </Typography>
          <Divider
            variant="middle"
            sx={{ background: '#000', marginVertical: '15px' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <FormControl
            required
            sx={{ m: 1, mt: 2, ml: '20px', minWidth: 200, maxWidth: 350 }}
          >
            <InputLabel>Counselor Name</InputLabel>
            <Select
              label="Counselor Name *"
              onChange={handleCounselorSelect}
              default
              color="success"
            >
              {counselorNames.length !== 0
                ? counselorNames.map((counselor) => (
                    <MenuItem value={counselor} sx={{ minWidth: 300 }}>
                      {counselor}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>

          <FormControl
            required
            sx={{ m: 1, ml: '20px', minWidth: 200, maxWidth: 350 }}
          >
            <InputLabel>Complaint Type</InputLabel>
            <Select
              label="Complaint Type *"
              onChange={handleComplaintTypeSelect}
              default
              color="success"
            >
              <MenuItem value="Ethical Violation">Ethical Violation</MenuItem>
              <MenuItem value="Sexual Harrasment">Sexual Harrasment</MenuItem>
              <MenuItem value="Professional Misconduct">
                Professional Misconduct
              </MenuItem>
              <MenuItem value="Negligence or malpractice">
                Negligence or malpractice
              </MenuItem>
              <MenuItem value="Unprofessional conduct">
                Unprofessional conduct
              </MenuItem>
              <MenuItem value="Violation of laws">Violation of laws</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h5" fontWeight="bold" sx={{ m: 1, ml: '20px' }}>
            Complaint Details *
          </Typography>
          <TextField
            placeholder="Please provide the details of the incident..."
            required
            multiline
            sx={{ ml: '20px', width: '90%' }}
            rows={6}
            maxRows={20}
            value={complaintDetails}
            onChange={handleComplaintDetailsChange}
          />

          <Box
            sx={{ mt: 2, display: 'flex', justifyContent: 'right', mr: '8%' }}
          >
            <MyButton
              onClick={submitHandler}
              type="submit"
              sx={{ color: 'white !important', width: '100px' }}
            >
              Submit
            </MyButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default LodgeComplaint;
