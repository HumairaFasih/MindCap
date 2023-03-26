import { Typography } from '@mui/material';

export default function PageTitle({ text, marginB, marginL }) {
  return (
    <Typography
      variant="h4"
      sx={{ fontWeight: 'bold', mb: marginB, ml: marginL }}
    >
      {text}
    </Typography>
  );
}
