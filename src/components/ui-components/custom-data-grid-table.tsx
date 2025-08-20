import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// const columns: GridColDef<(typeof rows)[number]>[] = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
// ];

// const rows: any = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

type DataGridDemoProps = {
  rows: any;
  columns: GridColDef<any[number]>[];
};

export default function CustomDataGridTable({ rows, columns }: DataGridDemoProps) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        //   disableRowSelectionOnClick
        rowHeight={39}
        // headerHeight={42}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            // backgroundColor: `${theme?.palette?.primary?.light} +important!`,
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
        hideFooterPagination
        disableRowSelectionOnClick
        disableVirtualization
      />
    </Box>
  );
}
