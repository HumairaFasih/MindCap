/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext } from 'react';
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
import { AuthContext } from '../context/AuthContext';

import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';
import { MyButton } from '../components/MyButton';
import { instance } from '../axios';

const drawerWidth = 270;

function LodgeComplaint() {
  const [counselorNames, setCounselorNames] = useState([]);
  const [chosenCounselor, setChosenCounselor] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [complaintDetails, setComplaintDetails] = useState('');

  useEffect(() => {
    instance
      .get('/appointment/get-all-counselors')
      .then((result) => {
        setCounselorNames(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handling submit for lodge complaint');
    instance
      .post(
        '/complaint/lodge',
        JSON.stringify({
          counselor: chosenCounselor,
          complaint_type: complaintType,
          complaint_details: complaintDetails,
        })
      )
      .then(() => {
        console.log('Succcessfully lodged complaint!');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
        onSubmit={handleSubmit}
      >
        <Box sx={{ mt: '30px' }}>
          <PageTitle text="Lodge Complaint" marginB="10px" marginL="20px" />
          <Typography sx={{ fontSize: '16px', ml: '20px', mb: '3px' }}>
            We are here to assist you!{' '}
          </Typography>
          <Typography sx={{ fontSize: '16px', ml: '20px', mb: '7px' }}>
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
              value={chosenCounselor}
              onChange={(e) => {
                setChosenCounselor(e.target.value);
              }}
              color="success"
              defaultValue=""
            >
              {counselorNames &&
                counselorNames.map((counselor) => (
                  <MenuItem value={counselor} sx={{ minWidth: 300 }}>
                    {counselor}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl
            required
            sx={{ m: 1, ml: '20px', minWidth: 200, maxWidth: 350 }}
          >
            <InputLabel>Complaint Type</InputLabel>
            <Select
              label="Complaint Type *"
              value={complaintType}
              onChange={(e) => {
                setComplaintType(e.target.value);
              }}
              color="success"
              defaultValue=""
            >
              <MenuItem value="" disabled>
                Select Complaint Type
              </MenuItem>
              <MenuItem value="Ethical Violation">Ethical Violation</MenuItem>
              <MenuItem value="Sexual Harrasment">Sexual Harrasment</MenuItem>
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
            value={complaintDetails}
            onChange={(e) => {
              setComplaintDetails(e.target.value);
            }}
          />

          <Box
            sx={{ mt: 2, display: 'flex', justifyContent: 'right', mr: '8%' }}
          >
            <MyButton
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
