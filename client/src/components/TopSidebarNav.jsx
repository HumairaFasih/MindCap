import React from 'react';
import { Icon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EditIcon from '@mui/icons-material/Edit';
import MyProfile from '../assets/images/my-profile.svg';

const MyProfileIcon = (
  <Icon sx={{ mb: 1.5, width: 25 }}>
    <img alt="logout" src={MyProfile} />
  </Icon>
);

const TopSidebarNav = [
  {
    route: '/idk',
    icon: <DashboardIcon htmlColor="white" />,
    label: 'Dashboard',
  },
  {
    route: '/users/:counselor',
    icon: MyProfileIcon,
    label: 'My Profile',
  },
  {
    route: '/search-counselors',
    icon: <SearchIcon htmlColor="white" />,
    label: 'Search Counselors',
  },
  {
    route: '/lodge-complaint',
    icon: <EditIcon htmlColor="white" />,
    label: 'Lodge Complaint',
  },
  {
    route: '/notifications',
    icon: <NotificationsActiveIcon htmlColor="white" />,
    label: 'Notifications',
  },
];

export default TopSidebarNav;
