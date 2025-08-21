'use client';

import React from 'react';
import Close from '@mui/icons-material/Close';
import { IconButton, InputAdornment, OutlinedInput, SxProps, Theme } from '@mui/material';

// import } from '@tabler/icons';

interface ListSearchComponentProps {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
  sx?: SxProps<Theme>;
  style?: React.CSSProperties;
  filterValue?: string;
  filter?: () => void;
  placeholder?: string;
}

const ListSearchComponent: React.FC<ListSearchComponentProps> = ({
  handleChange,
  handleClear,
  sx,
  style,
  filterValue = '',
  filter,
  placeholder,
  ...props
}) => {
  // const intl = useIntl();

  return (
    <OutlinedInput
      id="input-search-list-style1"
      placeholder={'Search'}
      style={{ ...style }}
      data-testid="list-search"
      name="list-search"
      value={filterValue}
      sx={{ ...sx }}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          filter?.();
        }
      }}
      startAdornment={<InputAdornment position="start">{/* <IconSearch stroke={1.5} size="1rem" /> */}</InputAdornment>}
      endAdornment={
        filterValue ? (
          <InputAdornment position="end">
            <IconButton component="span" size="small" onClick={() => handleClear?.()} data-testid="close-list">
              <Close fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null
      }
      size="small"
      autoComplete="off"
      {...props}
    />
  );
};

export default ListSearchComponent;
