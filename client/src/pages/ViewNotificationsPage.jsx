import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Icon } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Sidebar from '../components/Sidebar';
import PageTitle from '../components/PageTitle';
import { instance } from '../axios';


const drawerWidth = 270;

function ViewNotifications() {
  const [notifications, setNotifications] = useState([])

  const newNotification = (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications])
  }

  useEffect(() => {
    const getNotifs = async () => {
        instance
          .get(`/notification/view`)
          .then((result) => {
            let notifArray = [];
            result.data.forEach((notif) => {
              console.log(notif.notification_details)
              notifArray.push(notif.notification_details);
            })
            setNotifications(notifArray);
          })

    };
    getNotifs();
  }, [])


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
            <PageTitle text="Notifications" marginB="15px" marginL="20px" />
            <Divider
              variant="middle"
              sx={{ background: '#000', marginVertical: '15px' }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              padding: '20px',
              justifyContent: 'space-between',
            }}
          >
            <Box display="flex" flexDirection="column">
              {notifications.map((notification) => (
                <>
                  <Box
                    display="flex"
                    flexDirection="row"
                    marginTop="1rem"
                    marginBottom="1.5rem"
                    marginRight="1rem"
                  >
                    <Box display="flex" alignSelf="center">
                      <FiberManualRecordIcon
                        fontSize="1rem"
                        sx={{
                          color: 'rgb(147, 183, 125)',
                          marginRight: '1rem',
                        }}
                      />
                    </Box>
                    <Typography sx={{ width: '76rem', wordWrap: 'break-word' }}>
                      {notification}
                    </Typography>
                  </Box>
                  <Divider
                    variant="middle"
                    sx={{
                      background: '#000',
                      width: '74rem',
                      marginLeft: '-4px',
                      marginTop: '0.8rem'
                    }}
                  />
                </>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default ViewNotifications;
