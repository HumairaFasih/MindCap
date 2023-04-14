import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import Person from '@mui/icons-material/Person';

const TopSidebarNav = (usertype, username) => {
  const user_type = usertype.toLowerCase();
  return [
    {
      route: '/',
      icon: <DashboardIcon htmlColor="white" />,
      label: 'Dashboard',
    },
    {
      route: `/user/${user_type}/${username}`,
      icon: <Person />,
      label: 'My Profile',
    },
    {
      route: '/search',
      icon: <SearchIcon htmlColor="white" />,
      label: 'Search Counselors',
    },
    {
      route: '/lodge-complaint',
      icon: <EditIcon htmlColor="white" />,
      label: 'Lodge Complaint',
    },
    {
      route: '/create-counselor',
      icon: <PersonAddIcon htmlColor="white" />,
      label: 'Create Account',
    },
    {
      route: '/search',
      icon: <ManageAccountsIcon htmlColor="white" />,
      label: 'Manage Accounts',
    },
    {
      route: '/notifications',
      icon: <NotificationsActiveIcon htmlColor="white" />,
      label: 'Notifications',
    },
  ];
};

export default TopSidebarNav;
