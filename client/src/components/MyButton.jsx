import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Pass props to the styled component
export const MyButton= styled(Button)(
  ({ width, paddinghorizontal, paddingvertical, backgroundColor}) => ({
    boxShadow: 'none',
    textTransform: 'none',
    color: 'white',
    fontSize: 18,
    borderRadius: 8,
    paddingHorizontal: { paddinghorizontal },
    paddingVertical: { paddingvertical },
    width: { width },
    lineHeight: 1.5,
    backgroundColor: backgroundColor || '#93B77D',
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
      backgroundColor: backgroundColor || '#93B77D',
    },
    '&:active': {
      backgroundColor: backgroundColor || '#93B77D',
    },
  })
);
