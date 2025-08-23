'use client';

import { forwardRef, type ReactNode } from 'react';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { type SxProps, type Theme, useTheme } from '@mui/material/styles';

const headerSX: SxProps<Theme> = {
  '& .MuiCardHeader-action': { mr: 0 },
};

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: SxProps<Theme>;
  darkTitle?: boolean;
  secondary?: ReactNode;
  shadow?: string;
  sx?: SxProps<Theme>;
  title?: ReactNode;
}

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = true,
      boxShadow = true,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : `#f3f3f3`,
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title ? <CardHeader sx={headerSX} title={title} action={secondary} /> : null}
        {darkTitle && title ? <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} /> : null}

        {/* content & header divider */}
        {title ? <Divider /> : null}

        {/* card content */}
        {content ? (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        ) : (
          children
        )}
      </Card>
    );
  }
);

MainCard.displayName = 'MainCard';

export default MainCard;
