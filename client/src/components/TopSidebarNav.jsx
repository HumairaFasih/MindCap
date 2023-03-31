import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EditIcon from '@mui/icons-material/Edit';
import Person from '@mui/icons-material/Person';

const TopSidebarNav = (userDetails) => {
  const { usertype, username } = userDetails;
  const usertypeLower = usertype.toLowerCase();
  // const usernameLower = username.toLowerCase();
  return [
    {
      route: `/user/${usertypeLower}/dashboard`,
      icon: <DashboardIcon htmlColor="white" />,
      label: 'Dashboard',
    },
    {
      route: `/user/${usertypeLower}/${username}`,
      icon: <Person />,
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
};

export default TopSidebarNav;
