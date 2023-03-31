import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Box, Typography, Divider, Icon } from '@mui/material';
import EditProfileIcon from '@mui/icons-material/ManageAccounts';
import LetterAvatar from '../components/LetterAvatar';
import Sidebar from '../components/Sidebar';
import { MyButton } from '../components/MyButton';

const drawerWidth = 270;

function StudentProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editProfileRoute = `${location.pathname
    .split('/')
    .slice(0, -1)
    .join('/')}/edit-profile`;

  const [studentDetails, setStudentDetails] = useState({
    name: '',
    roll_num: '',
    gender: '',
    dob: '',
    // med_filename: '',
  });

  const [userTypeAndName, setUserTypeAndName] = useState({
    usertype: '',
    username: '',
  });

  const getStudentData = useCallback(async () => {
    try {
      const result = await axios({
        method: 'get',
        withCredentials: true,
        url: `http://localhost:3003/api/user/student/${username}`,
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(result);
      console.log('hello i am in getdata');
      setStudentDetails(result.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [username]);

  const getUserTypeAndName = useCallback(async () => {
    try {
      const result = await axios({
        method: 'get',
        withCredentials: true,
        url: `http://localhost:3003/api/profile/currentuser`,
        headers: { 'Content-Type': 'application/json' },
      });
      if (result.data) {
        setUserTypeAndName(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getStudentData();
    getUserTypeAndName();
  }, [getStudentData, getUserTypeAndName]);

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
          <Box sx={{ marginTop: '30px' }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', mb: '10px', ml: '16px' }}
            >
              My Profile
            </Typography>

            <Divider
              variant="middle"
              sx={{ background: '#000', mt: '15px', mb: '15px' }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                padding: '8px',
                justifyContent: 'space-between',
              }}
            >
              <LetterAvatar
                fontSize="40px"
                width="60px"
                height="60px"
                username="Humaira"
              />
              <Typography
                variant="h3"
                sx={{
                  display: 'inline-flex',
                  fontWeight: 'bold',
                  padding: '13px',
                  margin: '0px 18px',
                }}
              >
                {studentDetails.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '20px 30px 20px 650px',
                }}
              >
                {userTypeAndName.usertype === 'Student' && (
                  <MyButton
                    width="187px"
                    paddinghorizontal="10px"
                    paddingvertical="10px"
                    variant="contained"
                    sx={{ mb: 2, justifyContent: '', variant: 'contained' }}
                    onClick={() => navigate(editProfileRoute)}
                  >
                    <Icon
                      component={EditProfileIcon}
                      sx={{ width: '50px', height: '32px' }}
                    />
                    Edit Profile
                  </MyButton>
                )}
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="65vh"
            >
              <Box
                sx={{
                  bgcolor: 'rgba(147, 183, 125,0.5)',
                  borderRadius: '15px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '16px',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'flex',
                      padding: '5px',
                      margin: '15px 182px 0px 50px',
                    }}
                  >
                    Full Name
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'flex',
                      padding: '5px',
                    }}
                  >
                    {studentDetails.name}
                  </Typography>
                </Box>

                <Divider
                  variant="middle"
                  sx={{ background: '#000', mt: '15px', mb: '15px' }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '16px',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'flex',
                      padding: '5px',
                      margin: '15px 182px 0px 50px',
                    }}
                  >
                    Roll Number/Username
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ display: 'flex', padding: '5px' }}
                  >
                    {studentDetails.roll_num}
                  </Typography>
                </Box>

                <Divider
                  variant="middle"
                  sx={{ background: '#000', mt: '15px', mb: '15px' }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '16px',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '0px 214px 0px 50px',
                    }}
                  >
                    Gender
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ display: 'inline-flex', padding: '5px' }}
                  >
                    {studentDetails.gender}
                  </Typography>
                </Box>

                <Divider
                  variant="middle"
                  sx={{ background: '#000', mt: '15px', mb: '15px' }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '16px',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '0px 155px 0px 50px',
                    }}
                  >
                    Date of Birth
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ display: 'inline-flex', padding: '5px' }}
                  >
                    {studentDetails.dob}
                  </Typography>
                </Box>

                <Divider
                  variant="middle"
                  sx={{ background: '#000', mt: '15px', mb: '15px' }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '16px',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '0px 128px 15px 50px',
                    }}
                  >
                    Medical Report
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '0px 64px 0px 0px',
                    }}
                  >
                    <a href="#random" target="_blank" rel="noreferrer">
                      Not-dynamic filename
                    </a>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default StudentProfile;
