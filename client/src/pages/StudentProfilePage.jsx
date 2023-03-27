import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import './Student.css';
import EditProfileIcon from '@mui/icons-material/ManageAccounts';
import { SvgIcon } from '@mui/material';
import LetterAvatars from '../components/avatar';
import Sidebar from '../components/Sidebar';
import { MyButton } from '../components/MyButton';

const drawerWidth = 270;

function StudentProfilePage(props) {
  const navigate = useNavigate();
  const clickHandlerEP = () => {
    navigate('/edit-student-profile');
  };
  const buttonWidth = 187;
  const paddingLR = 10;
  const paddingTB = 10;
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Box sx={{ marginTop: '30px' }}>
            <Typography
              variant='h4'
              sx={{ fontWeight: 'bold', mb: '10px', ml: '16px' }}
            >
              My Profile
            </Typography>

            <Divider
              variant='middle'
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
              <LetterAvatars />
              <Typography
                variant='h3'
                sx={{
                  display: 'inline-flex',
                  fontWeight: 'bold',
                  padding: '13px',
                  margin: '0px 18px',
                }}
              >
                Summer Ijaz
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '20px 30px 20px 650px',
                }}
              >
                <MyButton
                  newWidth={buttonWidth}
                  paddingLR={paddingLR}
                  paddingTB={paddingTB}
                  variant='contained'
                  sx={{ mb: 2, justifyContent: '', variant: 'contained' }}
                  onClick={clickHandlerEP}
                >
                  <SvgIcon
                    component={EditProfileIcon}
                    alt='Icon'
                    sx={{ width: '50px', height: '32px' }}
                  />
                  Edit Profile
                </MyButton>
              </Box>
            </Box>

            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              minHeight='65vh'
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
                    variant='h5'
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '15px 182px 0px 50px',
                    }}
                  >
                    Full Name
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '15px 0px 0px 0px',
                    }}
                  >
                    Summer Ijaz
                  </Typography>
                </Box>

                <Divider
                  variant='middle'
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
                    variant='h5'
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '0px 155px 0px 50px',
                    }}
                  >
                    Roll Number
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{ display: 'inline-flex', padding: '5px' }}
                  >
                    24100002
                  </Typography>
                </Box>

                <Divider
                  variant='middle'
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
                    variant='h5'
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '0px 214px 0px 50px',
                    }}
                  >
                    Gender
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{ display: 'inline-flex', padding: '5px' }}
                  >
                    Male
                  </Typography>
                </Box>

                <Divider
                  variant='middle'
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
                    variant='h5'
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '0px 155px 0px 50px',
                    }}
                  >
                    Date of Birth
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{ display: 'inline-flex', padding: '5px' }}
                  >
                    31/02/1782
                  </Typography>
                </Box>

                <Divider
                  variant='middle'
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
                    variant='h5'
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '0px 128px 15px 50px',
                    }}
                  >
                    Medical Report
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '0px 64px 0px 0px',
                    }}
                  >
                    <a href='https://www.google.com'>
                      24100002-MedicalReport.pdf
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
export default StudentProfilePage;
