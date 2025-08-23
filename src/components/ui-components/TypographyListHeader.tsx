import { Typography } from '@mui/material';

function TypographyListHeader({ text }: { text: string }) {
  return (
    <Typography variant="h3" fontWeight="bold">
      {text}
    </Typography>
  );
}

export default TypographyListHeader;
