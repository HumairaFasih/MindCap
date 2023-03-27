import React from 'react';
import { Icon } from '@mui/material';
import UpdatePassword from '../assets/images/key.svg';
import SignOut from '../assets/images/logout.svg';

const UpdatePasswordIcon = (
  <Icon sx={{ ml: 0.5, width: 28 }}>
    <img alt="change password" src={UpdatePassword} />
  </Icon>
);
const SignOutIcon = (
  <Icon sx={{ ml: 0.5, width: 25 }}>
    <img alt="logout" src={SignOut} />
  </Icon>
);

const BottomSidebarNav = [
  {
    route: '/update-password',
    icon: UpdatePasswordIcon,
    label: 'Update Password',
  },
  {
    route: '/sign-out',
    icon: SignOutIcon,
    label: 'Sign Out',
  },
];

export default BottomSidebarNav;
