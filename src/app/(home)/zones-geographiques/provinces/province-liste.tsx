'use client';

import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import type {ProvinceResponse, Province} from "@/lib/apis/province"
import  { fetchProvinces  } from '@/lib/apis/province';

import CustomDataGridTable from '@/components/ui-components/custom-data-grid-table';
import { renderActionButtons } from '@/components/ui-components/table-actions'; // <-- updated import

import DeleteDialog from './delete-dialog';
import { ProvinceDialog } from './dialog-province';
import { useQuery } from '@tanstack/react-query';

function ProvinceListe (): React.JSX.Element {

  const theme = useTheme();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPaysDialog, setOpenPaysDialog] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const {
    data: provinceData,
    isLoading,
    isError,
  } = useQuery<ProvinceResponse>({
    queryKey: ['province'],
    queryFn: fetchProvinces,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading countries</div>;

  const handleClickOpenCreateOrEditDialog = (province: Province) => {
    setOpenPaysDialog(true);
    setSelectedProvince(province);
  };

  const handleClickOpenDeleteAlertDialog = (province: Province) => {
    setSelectedProvince(province);
    setOpenDeleteDialog(true);
  };

  // Initialize actionButtons function
  const actionButtons = renderActionButtons({
    theme,
    handleClickOpenCreateOrEditDialog,
    handleClickOpenDeleteAlertDialog,
  });

  const handleDelete = () => {
    // deleteMutation.mutate();
  };

  if (!provinceData) {
    return <div>Failed to load Data</div>;
  }

  return (
    <div>
      <CustomDataGridTable
        rows={provinceData.data.contents}
        actionButtons={actionButtons} // <-- pass the function here
        columns={[
          { field: 'code', headerName: 'Code', flex: 1, editable: false },
          { field: 'libelle', headerName: 'Libelle', flex: 1, editable: false },
          { field: 'nationalite', headerName: 'Nationalite', flex: 1, editable: false },
          { field: 'continent', headerName: 'Continent', flex: 1, editable: false },
        ]}
      />
      <DeleteDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} handleDelete={handleDelete} />
      <ProvinceDialog
        open={openPaysDialog}
        onClose={() => { setOpenPaysDialog(false); }}
        selectedValue={selectedProvince}
      />
    </div>
  );
};

export default ProvinceListe;
