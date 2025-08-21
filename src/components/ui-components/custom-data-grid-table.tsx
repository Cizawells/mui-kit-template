import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Pays } from '@/lib/apis/pays';

type ActionButtonFn = (params: Pays) => JSX.Element;

type DataGridDemoProps = {
  rows: any;
  columns: GridColDef<any[number]>[];
  actionButtons: ActionButtonFn;
};

export default function CustomDataGridTable({ rows, columns, actionButtons }: DataGridDemoProps) {
  const enhancedHeaders = useMemo(
    () =>
      columns.map((header) => ({
        ...header,
        flex: header.flex || 1,
        width: header.width || undefined,
      })),
    [columns]
  );
  const newHeaders = useMemo(
    () => [
      ...enhancedHeaders,
      {
        field: 'actions',
        headerName: 'actions',
        flex: 0.5,
        editable: false,
        renderCell: (params: Pays) => (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>{actionButtons(params)}</Box>
        ),
      },
    ],
    [enhancedHeaders, actionButtons]
  );
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={newHeaders}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        hideFooterPagination
        disableRowSelectionOnClick
        disableVirtualization
        //   disableRowSelectionOnClick
        rowHeight={39}
        // headerHeight={42}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: `#f3f3f3 +important!`,
            color: '#333 !important',
            minHeight: '40px !important',
            maxHeight: '40px !important',
            borderRight: '0.5px solid #fff !important',
          },

          '& .MuiDataGrid-columnSeparator': {
            visibility: 'visible',
            // color: theme?.palette?.divider,
            width: '1px',
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            fontSize: '14px',
            fontWeight: 'bold',
            ':focus': {
              outline: 'none',
            },
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontSize: '14px',
            fontWeight: 'bold',
            ':focus': {
              outline: 'none',
            },
          },
          '& .MuiTouchRipple-root': {
            color: '#279D85',
          },

          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: 'rgba(235, 235, 235, 0.2)',
            // backgroundColor: theme?.palette?.secondary.light
          },

          '& .MuiDataGrid-menuIconButton': {
            color: 'black',
          },
          '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
            color: 'black',
          },

          '&.MuiDataGrid-main': {
            flex: 1, // Ensure it grows to fit the content// Ensures grid height is adjusted correctly
          },

          '& .MuiDataGrid-cell': {
            fontSize: '14px',
            lineHeight: '1.4',
            padding: '4px 8px',
            borderRight: '1px solid #e0e0e0',
            ':focus': {
              outline: 'none ! important',
            },
          },
          '& .MuiDataGrid-row': {
            height: '40px ! important',
            minHeight: '30px',
            maxHeight: '30px',
            borderBottom: '1px solid #e0e0e0',
            ':hover': {
              // backgroundColor: theme?.palette?.secondary?.light,
              color: 'black',
            },
          },
          '& .css-7jjc08-MuiDataGrid-footerContainer': {
            display: 'none',
          },
          '& .MuiDataGrid-columnHeaders .css-z8fhq1-MuiDataGrid-columnHeaders': {
            maxHeight: '40px ! important',
          },
          '& .MuiDataGrid-virtualScrollerContent': {
            height: 'auto !important',
            overflow: 'hidden', // Prevents additional scrolling space
          },
          '& .MuiDataGrid-footerContainer': {
            display: 'none', // Hides any footer that might contribute to spacing
          },
          '& .MuiDataGrid-overlay': {
            display: 'none', // Hides any overlay that might appear
          },
        }}
      />
    </Box>
  );
}
