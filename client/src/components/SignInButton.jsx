import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SignInButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  width: 400,
  lineHeight: 1.5,
  backgroundColor: '#93B77D',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#93B77D',
  },
  '&:active': {
    backgroundColor: '#93B77D',
  },
});
