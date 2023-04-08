/* eslint-disable camelcase */
import React, { useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../context/AuthContext';

const studentOptions = [
  { label: 'Cancel Appointment', value: 'Cancel Appointment' },
  { label: 'View Counselor Profile', value: 'View Counselor Profile' },
];

const counselorOptions = [
  { label: 'View Medical Report', value: 'View Medical Report' },
];

const ITEM_HEIGHT = 48;

function LongMenu({ handleMeetingCardMenu }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const {
    auth: {
      authDetails: { usertype },
    },
  } = useContext(AuthContext);

  const options = usertype === 'Student' ? studentOptions : counselorOptions;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '25ch',
          },
        }}
      >
        {options.map(({ label, value }) => (
          <MenuItem
            key={label}
            value={value}
            onClick={() => handleMeetingCardMenu(value)}
          >
            {value}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default LongMenu;
