'use client';

import { forwardRef, ReactNode } from 'react';
import { Card, CardContent, CardHeader, SxProps, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

interface SubCardProps {
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: ReactNode;
  sx?: SxProps<Theme>;
  contentSX?: SxProps<Theme>;
  title?: ReactNode;
}

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = forwardRef<HTMLDivElement, SubCardProps>(
  (
    { children, content = true, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        sx={{
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? `#f3f3f3` : '#f3f3f3',
          boxShadow: '0 12px 24px 0 rgb(32 40 45 / 8%)',
          ':hover': {
            boxShadow:
              theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)',
          },
          ...sx,
        }}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={{ p: 1 }} title={<Typography variant="h5">{title}</Typography>} action={secondary} />
        )}
        {darkTitle && title && (
          <CardHeader sx={{ p: 1 }} title={<Typography variant="h4">{title}</Typography>} action={secondary} />
        )}

        {/* card content */}
        {content ? (
          <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
            {children}
          </CardContent>
        ) : (
          children
        )}
      </Card>
    );
  }
);

SubCard.displayName = 'SubCard';

export default SubCard;
