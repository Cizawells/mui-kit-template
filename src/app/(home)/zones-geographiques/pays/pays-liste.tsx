'use client';

import { useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { fetchPays, Pays, PaysResponse } from '@/lib/apis/pays';
import CustomDataGridTable from '@/components/ui-components/custom-data-grid-table';
import { useActionButton } from '@/components/ui-components/table-actions';

const PaysListe = () => {
  const theme = useTheme();
  const { data, isLoading, isError } = useQuery<PaysResponse>({
    queryKey: ['pays'],
    queryFn: fetchPays,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading countries</div>;
  const handleClickOpenCreateOrEditDialog = (pays: Pays) => {};
  const handleClickOpenDeleteAlertDialog = (pays: Pays) => {};
  console.log('dataaa', data);
  return (
    <div>
      <CustomDataGridTable
        // actionButtons={useActionButton({
        //   theme,
        //   handleClickOpenCreateOrEditDialog,
        //   handleClickOpenDeleteAlertDialog,
        // })}
        rows={data?.data.contents}
        columns={[
          {
            field: 'code',
            headerName: 'Code',
            flex: 1,
            editable: false,
          },
          {
            field: 'libelle',
            headerName: 'Libelle',
            flex: 1,
            editable: false,
          },
          {
            field: 'nationalite',
            headerName: 'Nationalite',
            flex: 1,
            editable: false,
          },
          {
            field: 'continent',
            headerName: 'Continent',
            flex: 1,
            editable: false,
          },
        ]}
      />
    </div>
  );
};

export default PaysListe;
