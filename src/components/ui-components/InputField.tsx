'use client';

import React from 'react';
import { HelpOutlineRounded } from '@mui/icons-material';
import { TextField, TextFieldProps, Tooltip } from '@mui/material';

interface InputFieldProps extends Omit<TextFieldProps, 'onChange' | 'name'> {
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  defaultValue?: string | number;
  style?: React.CSSProperties;
  inputSize?: 'small' | 'medium';
  labelStyles?: React.CSSProperties;
  value?: string | number;
  required?: boolean;
  textFieldStyles?: React.CSSProperties;
  hint?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  handleChange,
  name,
  defaultValue,
  style,
  inputSize = 'small',
  labelStyles,
  value,
  required,
  textFieldStyles = {},
  hint,
  ...props
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        marginTop: 3,
        marginBottom: 3,
        minWidth: '50px',
        ...style,
      }}
    >
      <label
        htmlFor={name}
        style={{
          marginRight: 5,
          fontWeight: 'bold',
          ...labelStyles,
        }}
      >
        {label} {required && <span style={{ color: 'red' }}>*</span>}{' '}
        {hint && (
          <Tooltip title={hint} placement="top" arrow>
            <span style={{ cursor: 'pointer' }}>
              <HelpOutlineRounded fontSize="small" sx={{ marginBottom: '-4px' }} />
            </span>
          </Tooltip>
        )}
      </label>
      <TextField
        id={name}
        fullWidth
        defaultValue={defaultValue}
        autoComplete="off"
        size={inputSize}
        onChange={handleChange}
        value={value}
        name={name}
        style={{ minWidth: 50, ...textFieldStyles }}
        {...props}
        FormHelperTextProps={{
          style: {
            padding: 0,
            margin: 0,
            marginTop: 4,
          },
        }}
      />
    </div>
  );
};

export default InputField;
