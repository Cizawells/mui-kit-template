import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface ActionButtonProps {
  theme: Theme;
  handleClickOpenCreateOrEditDialog: (row: any) => void;
  handleClickOpenDeleteAlertDialog: (row: any) => void;
}

// Plain function version, no hooks needed
export const renderActionButtons = ({
  theme,
  handleClickOpenCreateOrEditDialog,
  handleClickOpenDeleteAlertDialog,
}: ActionButtonProps) => {
  return (row: any) => (
    <Stack direction="row" justifyContent="right" alignItems="center" spacing={1} margin={-1}>
      <Tooltip title="edit" arrow placement="top">
        <IconButton
          size="small"
          onClick={() => handleClickOpenCreateOrEditDialog(row)}
          sx={{ padding: 0.5, ':hover': { color: theme.palette.primary.dark } }}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete" arrow placement="top">
        <IconButton
          size="small"
          onClick={() => handleClickOpenDeleteAlertDialog(row)}
          sx={{ padding: 0.5, ':hover': { color: theme.palette.error.main } }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
