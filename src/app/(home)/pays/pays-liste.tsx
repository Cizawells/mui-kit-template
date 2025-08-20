import CustomDataGridTable from '@/components/ui-components/custom-data-grid-table';

const PaysListe = () => {
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
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: false,
          },
        ]}
      />
    </div>
  );
};

export default PaysListe;
