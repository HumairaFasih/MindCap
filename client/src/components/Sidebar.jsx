import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MindCapLogo from '../assets/images/logo-no-bg.png';
import TopSidebarNav from './TopSidebarNav';
import BottomSidebarNav from './BottomSidebarNav';
import { AuthContext } from '../context/AuthContext';

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { usertype, username } = useContext(AuthContext);

  useEffect(() => {
    console.log(`Printing usertype in sidebar: ${usertype}`);
  }, [usertype]);

  const drawerWidth = 270;

  const drawer = (
    <Box>
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
          className="MindCapLogo"
          src={MindCapLogo}
          alt="Logo"
          border="0"
          width="45px"
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
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '90vh',
        }}
      >
        <List>
          {TopSidebarNav(usertype, username).map(({ route, icon, label }) =>
            usertype === 'Counselor' &&
            (label === 'Search Counselors' ||
              label === 'Lodge Complaint') ? null : (
              <ListItem key={label} disablePadding disableGutters>
                <Link
                  to={route}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    width: 'fullWidth',
                  }}
                >
                  <ListItemButton sx={{ py: 1 }}>
                    <Box sx={{ m: 1, pr: 1 }}>{icon}</Box>

                    <Typography
                      variant="h8"
                      sx={{ fontWeight: '600', fontSize: '18px', mb: 1 }}
                    >
                      {label}
                    </Typography>
                  </ListItemButton>
                </Link>
              </ListItem>
            )
          )}
        </List>

        <List>
          {BottomSidebarNav.map(({ route, icon, label }) => (
            <Link
              to={route}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                width: 'fullWidth',
              }}
            >
              <ListItem key={label} disablePadding>
                <ListItemButton sx={{ pt: 1 }}>
                  <Box sx={{ m: 1, pr: 1 }}>{icon}</Box>

                  <Typography
                    variant="h8"
                    sx={{ fontWeight: '600', fontSize: '18px', mb: 1 }}
                  >
                    {label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            </Link>
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
              {username && username.charAt(0)}
            </Avatar>
            <Typography
              variant="h8"
              sx={{ fontWeight: '500', fontSize: '18px' }}
            >
              {username}
            </Typography>
          </Box>
        </List>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box>
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
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
