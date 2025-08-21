'use client';

import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface ButtonComponentProps extends Omit<ButtonProps, 'variant' | 'size' | 'onClick'> {
  text: string | React.ReactNode;
  handleClick?: () => void;
  variant?: ButtonProps['variant'];
  type?: 'button' | 'submit' | 'reset';
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
  dataTestId?: string;
  size?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  style,
  handleClick,
  variant = 'contained',
  type = 'button',
  endIcon,
  startIcon,
  disabled = false,
  dataTestId = 'buttonid',
  size = 'small',
  ...props
}) => {
  return (
    <Button
      variant={variant}
      name="button-component"
      endIcon={endIcon}
      startIcon={startIcon}
      disabled={disabled}
      type={type}
      data-testid={dataTestId}
      style={{
        cursor: 'pointer',
        paddingInline: 30,
        textTransform: 'none',
        fontWeight: 'bold',
        ...style,
      }}
      onClick={handleClick}
      {...props}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
