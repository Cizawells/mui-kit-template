import Typography from '@mui/material/Typography';

function TypographyListDescription({ text }: { text: string }) {
  return (
    <Typography variant="body1" gutterBottom>
      {text}
    </Typography>
  );
}

export default TypographyListDescription;
