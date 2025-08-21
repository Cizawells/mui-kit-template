import { Typography } from '@mui/material';

import MainCard from '@/components/ui-components/main-card';
import SubCard from '@/components/ui-components/sub-card';

import PayDialog from './dialog-pays';
import PaysListe from './pays-liste';

export default function Page(): React.JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" fontWeight="bold">
        Pays
      </Typography>
      <Typography variant="body1" gutterBottom>
        Gerer les pays
      </Typography>
      <PayDialog />

      <div>
        <MainCard content={false}>
          <SubCard>
            <PaysListe />
          </SubCard>
        </MainCard>
      </div>
    </div>
  );
}
