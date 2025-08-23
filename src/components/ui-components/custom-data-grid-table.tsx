import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { type Pays } from '@/lib/apis/pays';

type ActionButtonFn = (params: Pays) => React.JSX.Element;

interface DataGridDemoProps {
  rows: any;
  columns: GridColDef<Pays>[];
  actionButtons: ActionButtonFn;
}

export default function CustomDataGridTable({ rows, columns, actionButtons }: DataGridDemoProps): React.JSX.Element {
  const theme = useTheme();
  const enhancedHeaders = useMemo(
    () =>
      columns.map((header) => ({
        ...header,
        flex: header.flex || 1,
        width: header.width || undefined,
      })),
    [columns]
  );
  // const newHeaders = useMemo(
  //   () => [
  //     ...enhancedHeaders,
  //     {
  //       field: 'actions',
  //       headerName: 'actions',
  //       flex: 0.5,
  //       // headerAlign: 'center',
  //       editable: false,
  //       renderCell: (params: GridRenderCellParams<Pays>) => (
  //         <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>{actionButtons(params.row)}</Box>
  //       ),
  //     },
  //   ],
  //   [enhancedHeaders, actionButtons]
  // );
  return (
    <Box
      sx={{
        width: '100%',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        '& .MuiDataGrid-columnHeader': {
          backgroundColor: theme.palette.primary.light,
          color: '#333 !important',
          borderRight: '0.1px solid #fff',
          minHeight: '40px',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontSize: '14px',
          fontWeight: 'bold !important',
        },
        '& .MuiDataGrid-row': {
          minHeight: '40px',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: theme?.palette?.action?.hover,
          },
        },
        '& .MuiDataGrid-cell': {
          fontSize: '13px',
          padding: '4px 8px',
          borderRight: '0.1px solid #e0e0e0',
        },
        '& .MuiDataGrid-row:nth-of-type(even)': {
          backgroundColor: 'rgba(235, 235, 235, 0.2)',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        checkboxSelection={false}
        hideFooterPagination
        disableRowSelectionOnClick
        disableVirtualization
        //   disableRowSelectionOnClick
        rowHeight={39}
        // headerHeight={42}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.getContrastText(theme.palette.primary.light),
            fontWeight: 'bold',
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
