'use client';

import CustomDataGridTable from '@/components/ui-components/custom-data-grid-table';

function PaysListe() {
  return (
    <div>
      <CustomDataGridTable
        rows={[
          {
            id: 'test',
            designation: 'test',
          },
        ]}
        columns={[
          {
            field: 'code',
            headerName: 'Code',
            flex: 1,
            editable: false,
          },
          {
            field: 'designation',
            headerName: 'Designation',
            flex: 1,
            editable: false,
          },
        ]}
      />
    </div>
  );
}

export default PaysListe;
