import { Typography } from '@mui/material';

export default function SubSecHeading({ text }) {
  return (
    <Typography
      variant="h5"
      sx={{ fontWeight: 'bold', mb: '10px', color: '#000000' }}
    >
      {text}
    </Typography>
  );
}
