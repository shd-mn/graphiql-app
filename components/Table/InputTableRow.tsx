import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton, OutlinedInput, TableCell, TableRow } from '@mui/material';
import { useEffect } from 'react';

import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

function InputTableRow({ inputName }: { inputName: string }) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: inputName,
  });

  const lastKey = useWatch({
    name: `${inputName}.${fields.length - 1}.key`,
    control,
  });
  const lastValue = useWatch({
    name: `${inputName}.${fields.length - 1}.value`,
    control,
  });

  useEffect(() => {
    if (lastKey !== '' || lastValue !== '') {
      append({ isChecked: true, key: '', value: '' }, { shouldFocus: false });
    }
  }, [lastKey, lastValue, append]);

  return (
    <>
      {fields.map((row, index) => (
        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell className="">
            <Controller
              name={`${inputName}.${index}.isChecked`}
              control={control}
              render={({ field }) => <Checkbox checked={!!field.value} className="m-0 p-0" {...field} />}
            />
          </TableCell>

          <TableCell className="">
            <Controller
              render={({ field }) => <OutlinedInput {...field} fullWidth inputProps={{ className: 'py-1' }} />}
              name={`${inputName}.${index}.key`}
              control={control}
            />
          </TableCell>

          <TableCell className="">
            <Controller
              render={({ field }) => <OutlinedInput {...field} fullWidth inputProps={{ className: 'py-1' }} />}
              name={`${inputName}.${index}.value`}
              control={control}
            />
          </TableCell>

          <TableCell className="">
            <IconButton aria-label="delete" disabled={index === fields.length - 1} onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
export default InputTableRow;
