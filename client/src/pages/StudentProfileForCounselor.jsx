import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Sidebar from '../components/Sidebar';
import LetterAvatars from '../components/avatar';

const drawerWidth = 270;

function StudentProfileForCounselor(props) {
  return (
    <Box sx={{ padding: '30px' }}>
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
          <div>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', mb: '15px', ml: '20px' }}
            >
              Student Profile
            </Typography>

            <Divider
              variant="middle"
              sx={{ background: '#000', mt: '15px', mb: '15px' }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                margin: '20px 0px 30px 30px',
              }}
            >
              <LetterAvatars />
              <Typography
                variant="h3"
                sx={{ fontWeight: 'bold', padding: '14px 20px' }}
              >
                Summer Ijaz
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="70vh"
            >
              <Box
                sx={{
                  bgcolor: 'rgba(147, 183, 125,0.5)',
                  borderRadius: '15px',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'inline-flex',
                      padding: '5px',
                      margin: '15px 182px 0px 50px',
                    }}
                  >
                    Full Name
                  </Typography>
                  <Typography
                    variant="h5"
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
                    Roll Number
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ display: 'inline-flex', padding: '5px' }}
                  >
                    24100002
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
                    Male
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
                    31/02/1782
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
                    <a href="https://www.google.com">
                      24100002-MedicalReport.pdf
                    </a>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
export default StudentProfileForCounselor;
