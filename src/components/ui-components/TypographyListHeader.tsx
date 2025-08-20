import { Typography } from '@mui/material';

const TypographyListHeader = ({ text }: { text: string }) => {
  return (
    <Typography variant="h3" fontWeight="bold">
      {text}
    </Typography>
  );
};

export default TypographyListHeader;
