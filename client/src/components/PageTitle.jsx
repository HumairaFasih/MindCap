import { Typography } from '@mui/material';

export default function PageTitle({ text }) {
  return (
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: '15px', ml: '20px' }}>
      {text}
    </Typography>
  );
}