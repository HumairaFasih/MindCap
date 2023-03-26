import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SignInButton = styled(Button)({
  boxShadow: '2px',
  fontSize: 16,
  padding: '6px 12px',
  width: 500,
  marginTop: 2,
  color: '#FFFFFF',
  backgroundColor: '#93B77D',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  '&:hover': {
    backgroundColor: '#93B77D',
  },
  '&:active': {
    backgroundColor: '#93B77D',
  },
});
