import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Pass props to the styled component
export const MyButton = styled(Button)(
  ({
    width,
    paddinghorizontal,
    paddingvertical,
    backgroundcolor,
    bradius,
  }) => ({
    boxShadow: '2px',
    textTransform: 'none',
    color: 'white',
    fontSize: 18,
    borderRadius: bradius ? bradius : 8,
    px: paddinghorizontal || '6px',
    py: paddingvertical || '12px',
    width: width || 400,
    lineHeight: 1.5,
    backgroundColor: backgroundcolor || '#93B77D',
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
      backgroundColor: backgroundcolor || '#93B77D',
    },
    '&:active': {
      backgroundColor: backgroundcolor || '#93B77D',
    },
  })
);
