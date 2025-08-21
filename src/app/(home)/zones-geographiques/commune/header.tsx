'use client';

import { Add } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // <-- use this

// import { FormattedMessage } from 'react-intl';

import ButtonComponent from '@/components/ui-components/button-component';
import ListSearchComponent from '@/components/ui-components/list-search-component';

const Header = ({}) => {
  const theme = useTheme();
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      paddingY={{ xs: '0.3rem', sm: '0.9rem' }}
      justifyContent="space-between"
      gap="0.4rem"
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} gap="0.4rem">
        <ListSearchComponent
          style={{ height: '100%' }}
          // handleChange={handleFilter}
          // filter={loadData}
          // filterValue={filterValue}
          // handleClear={handleClear}
        />

        <ButtonComponent
          text={'Search'}
          // handleClick={() => loadData()}
          size="small"
          variant="outlined"
          disabled={false}
          sx={{
            '&:hover': {
              color: 'white',
              backgroundColor: theme.palette.primary.main,
              width: { xs: '100%', sm: 'auto' },
            },
          }}
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} gap="0.4rem">
        <ButtonComponent
          text={'Creer'}
          // handleClick={() => handleClickOpenCreateOrEditDialog()}
          startIcon={<Add />}
          variant="contained"
          disabled={false}
        />
      </Stack>
    </Stack>
  );
};

export default Header;
