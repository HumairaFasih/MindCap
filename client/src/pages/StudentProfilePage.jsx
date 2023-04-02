import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Divider, Icon } from '@mui/material';
import EditProfileIcon from '@mui/icons-material/ManageAccounts';
import LetterAvatar from '../components/LetterAvatar';
import Sidebar from '../components/Sidebar';
import { MyButton } from '../components/MyButton';
import PageTitle from '../components/PageTitle';
import { AuthContext } from '../context/AuthContext';

const drawerWidth = 270;

function StudentProfile() {
  const { usertype, username } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const editProfileRoute = `${location.pathname
    .split('/')
    .slice(0, -1)
    .join('/')}/edit-profile`;

  const [studentDetails, setStudentDetails] = useState('');

  const getStudentData = useCallback(async () => {
    try {
      const result = await axios({
        method: 'get',
        withCredentials: true,
        url: `http://localhost:3003/api/user/student/${username}`,
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(result);
      console.log('hello i am in getdata of student profile page');
      setStudentDetails(result.data);
    } catch (err) {
      console.log(err);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      getStudentData();
    }
  }, [getStudentData, username]);

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
              sx={{ background: '#000', marginVertical: '15px' }}
            />
          </Box>

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
              {`${studentDetails.fname} ${studentDetails.lname}`}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '20px 30px 20px 650px',
              }}
            >
              {usertype === 'Student' && (
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
                  {`${studentDetails.fname} ${studentDetails.lname}`}
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
                    {studentDetails.med_filename}
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default StudentProfile;
