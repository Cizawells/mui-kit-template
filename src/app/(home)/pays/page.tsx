import TypographyListDescription from '@/components/ui-components/TypographyListDescription';
import TypographyListHeader from '@/components/ui-components/TypographyListHeader';

import PaysListe from './pays-liste';

export default function Page(): React.JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TypographyListHeader text="Pays" />
      <TypographyListDescription text="Gérer les pays" />
      <div>
        <PaysListe />
      </div>
    </div>
  );
}
