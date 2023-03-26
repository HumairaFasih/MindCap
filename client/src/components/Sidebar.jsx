import React from 'react';
import {
  Avatar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EditIcon from '@mui/icons-material/Edit';
import MindCapLogo from '../assets/images/logo-no-bg.png';
import UpdatePass from '../assets/images/Key.svg';
import Logout from '../assets/images/logout.svg';

const keysvg = (
  <Icon sx={{ ml: 0.5, width: 28 }}>
    <img src={UpdatePass} alt="Update Pass logo" />
  </Icon>
);
const logout = (
  <Icon sx={{ ml: 0.5, width: 25 }}>
    <img src={Logout} alt="Logout" />
  </Icon>
);

function Sidebar(props) {
  // eslint-disable-next-line react/prop-types
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 270;

  const drawer = (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mr: '30px',
          ml: '30px',
          mt: '20px',
        }}
      >
        <img
          src={MindCapLogo}
          alt="Logo"
          border="0"
          width="45px"
          // eslint-disable-next-line react/no-unknown-property
          margin="22px"
        />
        <Typography sx={{ fontWeight: 'bold', fontSize: '30px', m: 1, mt: 2 }}>
          MindCap
        </Typography>
      </Box>
      <Divider
        variant="middle"
        sx={{ background: '#B0ADAD', mt: '15px', mb: '15px' }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '90vh',
        }}
      >
        <List>
          {[
            'Dashboard',
            'My Profile',
            'Search Counselors',
            'Lodge Complaint',
            'Notifications',
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ mt: 1 }}>
                <ListItemIcon>
                  {/* If statement to display the rightful icons */}
                  {index === 0 ? (
                    <DashboardIcon htmlColor="white" />
                  ) : index === 1 ? (
                    <InboxIcon htmlColor="white" />
                  ) : index === 2 ? (
                    <SearchIcon htmlColor="white" />
                  ) : index === 3 ? (
                    <EditIcon htmlColor="white" />
                  ) : (
                    <NotificationsActiveIcon htmlColor="white" />
                  )}
                </ListItemIcon>
                <Typography
                  variant="h8"
                  sx={{ fontWeight: '500', fontSize: '18px' }}
                >
                  {text}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List>
          {['Update Password', 'Sign Out'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ mt: 1 }}>
                <ListItemIcon>{index % 2 === 0 ? logout : keysvg}</ListItemIcon>
                <Typography
                  variant="h8"
                  sx={{ fontWeight: '500', fontSize: '18px' }}
                >
                  {text}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
          <Divider
            variant="middle"
            sx={{ background: '#B0ADAD', mt: '20px' }}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: '30px',
              ml: '30px',
            }}
          >
            <Avatar
              sx={{
                width: 45,
                height: 45,
                mt: '20px',
                mb: '20px',
                mr: '20px',
                backgroundColor: '#6B6766',
                fontSize: 30,
                fontWeight: 'bold',
              }}
            >
              S
            </Avatar>
            <Typography
              variant="h8"
              sx={{ fontWeight: '500', fontSize: '18px' }}
            >
              Summer Ijaz
            </Typography>
          </Box>
        </List>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div>
      <CssBaseline />
      <Box
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="#00000"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <br />
      </Box>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#242020',
              color: '#fff',
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#242020',
              color: '#fff',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
}

export default Sidebar;
