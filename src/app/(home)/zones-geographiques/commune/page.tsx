import React from "react"
import { Typography } from '@mui/material';

import PayDialog from './dialog';
import PaysListe from './pays-liste';

export default function Page(): React.JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" fontWeight="bold">
        Commune
      </Typography>
      <Typography variant="body1" gutterBottom>
        Gerer les communes
      </Typography>
      <PayDialog />

      <div>
        <PaysListe />
      </div>
    </div>
  );
}
