import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Pass props to the styled component
export const MyButton = styled(Button)(
  ({ width, paddinghorizontal, paddingvertical, bradius }) => ({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    borderRadius: bradius ? bradius : 8,
    paddingHorizontal: { paddinghorizontal },
    paddingVertical: { paddingvertical },
    width: { width },
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
    ].join(','),
    '&:hover': {
      backgroundColor: '#93B77D',
    },
    '&:active': {
      backgroundColor: '#93B77D',
    },
  })
);
