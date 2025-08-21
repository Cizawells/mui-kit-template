import { useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { Pays } from '@/lib/apis/pays';

// Props/functions passed in
interface ActionButtonProps {
  theme: Theme;
  handleClickOpenCreateOrEditDialog: (row: Pays) => void;
  handleClickOpenDeleteAlertDialog: (row: Pays) => void;
}

export const useActionButton = ({
  theme,
  handleClickOpenCreateOrEditDialog,
  handleClickOpenDeleteAlertDialog,
}: ActionButtonProps) =>
  useCallback(
    (params: Pays) => {
      return (
        <Stack direction="row" justifyContent="right" alignItems="center" spacing={2} margin={-1}>
          <Tooltip title={'edit'} arrow placement="right">
            <IconButton
              component="span"
              style={{ padding: 4, margin: 0 }}
              size="small"
              onClick={() => handleClickOpenCreateOrEditDialog(params)}
              sx={{ ':hover': { color: theme.palette.primary.dark } }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title={'delete'} arrow placement="left">
            <IconButton
              component="span"
              style={{ padding: 4, margin: 0 }}
              size="small"
              onClick={() => handleClickOpenDeleteAlertDialog(params)}
              sx={{ ':hover': { color: theme.palette.error.main } }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      );
    },
    [theme, handleClickOpenCreateOrEditDialog, handleClickOpenDeleteAlertDialog]
  );
