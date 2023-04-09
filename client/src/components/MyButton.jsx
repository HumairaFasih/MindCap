import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Pass props to the styled component
export const MyButton= styled(Button)(
  ({ width, paddingHorizontal, paddingVertical, backgroundColor}) => ({
    boxShadow: 'none',
    textTransform: 'none',
    color: 'white',
    fontSize: 18,
    borderRadius: 8,
    paddingHorizontal: paddingHorizontal || '6px',
    paddingVertical:  paddingVertical  || '12px',
    width: width || 400,
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
