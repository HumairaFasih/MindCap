import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Divider, Icon } from '@mui/material';
import EditProfileIcon from '@mui/icons-material/ManageAccounts';
import LetterAvatar from '../components/LetterAvatar';
import Sidebar from '../components/Sidebar';
import { MyButton } from '../components/MyButton';
import PageTitle from '../components/PageTitle';
import { AuthContext } from '../context/AuthContext';
import { instance } from '../axios';
import Loading from '../components/LoadingScreen';

const drawerWidth = 270;

function StudentProfile() {
  const {
    auth: {
      authDetails: { usertype, username },
    },
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const editProfileRoute = `${location.pathname
    .split('/')
    .slice(0, -1)
    .join('/')}/edit-profile`;

  const [studentDetails, setStudentDetails] = useState('');
  const [loaded, setLoaded] = useState(false);

  const viewMedicalRecord = async (e) => {
    e.preventDefault();
    const result = await axios({
      method: 'get',
      url: `/user/medical-record?name=${username}`,
      withCredentials: true,
      responseType: 'blob',
    });
    const blob = new Blob([result.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank').focus();
  };

  useEffect(() => {
    instance
      .get(`user/student/${username}`)
      .then((result) => {
        setStudentDetails(result.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  if (!loaded) {
    return <Loading />;
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
              padding: '2rem',
            }}
          >
            <Box sx={{ marginTop: '0.7rem', marginRight: '0.8rem' }}>
              <LetterAvatar
                fontSize="40px"
                width="60px"
                height="60px"
                username={username}
              />
            </Box>
            <Typography
              variant="h3"
              sx={{
                display: 'inline-flex',
                fontWeight: 'bold',
                padding: '13px',
              }}
            >
              {`${studentDetails.fname} ${studentDetails.lname}`}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // margin: '20px 30px 20px 650px',
                marginTop: '0.7rem',
                marginLeft: '45rem',
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
                  padding: '1.2rem',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    display: 'flex',
                    margin: '1.6rem 11.4rem 0rem 3rem',
                  }}
                >
                  Full Name
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    display: 'flex',
                    marginTop: '1.6rem',
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
                  padding: '1.2rem',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    display: 'flex',
                    margin: '0.6rem 9.9rem 0px 3rem',
                  }}
                >
                  Roll Number
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ display: 'flex', marginTop: '0.6rem' }}
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
                  padding: '1.2rem',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    display: 'inline-flex',
                    margin: '0.6rem 13.2rem 0px 3rem',
                  }}
                >
                  Gender
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ display: 'inline-flex', marginTop: '0.6rem' }}
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
                  padding: '1.2rem',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    display: 'inline-flex',
                    margin: '0.6rem 9.7rem 0px 3rem',
                  }}
                >
                  Date of Birth
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ display: 'inline-flex', marginTop: '0.6rem' }}
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
                  padding: '1.2rem',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    display: 'inline-flex',
                    margin: '0.6rem 8rem 15px 3rem',
                  }}
                >
                  Medical Report
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    display: 'inline-flex',
                    marginTop: '0.6rem',
                    marginRight: '3rem',
                  }}
                >
                  <a
                    href="#random"
                    target="_blank"
                    rel="noreferrer"
                    onClick={viewMedicalRecord}
                  >
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
