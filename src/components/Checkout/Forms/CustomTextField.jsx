import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useFormContext;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ...field } }) => (
        <TextField
          {...field}
          label={label}
          required={required}
          fullWidth
        />
      )}
    />
  )
}

export default FormInput
