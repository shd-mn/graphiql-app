import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TableCell, TableRow, Checkbox, IconButton, OutlinedInput } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface InputTableRowProps {
  index: number;
  inputName: 'params' | 'headers' | 'variables';
  remove: (index: number) => void;
  isOnlyRow: boolean;
}

const InputTableRow: React.FC<InputTableRowProps> = ({ index, inputName, remove, isOnlyRow }) => {
  const { control, register } = useFormContext();

  return (
    <TableRow>
      <TableCell>
        <Controller
          name={`${inputName}.${index}.isChecked`}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} className="m-0 p-0" />}
        />
      </TableCell>
      <TableCell>
        <OutlinedInput
          {...register(`${inputName}.${index}.key`)}
          fullWidth
          size="small"
          inputProps={{ className: 'py-1' }}
          placeholder="Key"
        />
      </TableCell>
      <TableCell>
        <OutlinedInput
          {...register(`${inputName}.${index}.value`)}
          fullWidth
          size="small"
          inputProps={{ className: 'py-1' }}
          placeholder="Value"
        />
      </TableCell>
      <TableCell>
        <IconButton aria-label="delete" disabled={isOnlyRow} onClick={() => remove(index)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default InputTableRow;
