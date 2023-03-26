import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Pass props to the styled component
export const MyButton = styled(Button)(({ newWidth, paddingLR, paddingTB }) => ({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    borderRadius: 8,
    paddingLeft: paddingLR,
    paddingRight: paddingLR,
    paddingTop: paddingTB,
    paddingBottom: paddingTB,
    width: newWidth,
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
    }
}));
