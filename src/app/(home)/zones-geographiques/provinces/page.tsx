import { Typography } from '@mui/material';

import MainCard from '@/components/ui-components/main-card';
import SubCard from '@/components/ui-components/sub-card';

import PayDialog from './dialog-province';
import ProvinceListe from './province-liste';

export default function Page(): React.JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" fontWeight="bold">
        Provinces
      </Typography>
      <Typography variant="body1" gutterBottom>
        Gerer les provinces
      </Typography>
      <PayDialog />

      <div>
        <MainCard content={false}>
          <SubCard>
            <ProvinceListe />
          </SubCard>
        </MainCard>
      </div>
    </div>
  );
}
