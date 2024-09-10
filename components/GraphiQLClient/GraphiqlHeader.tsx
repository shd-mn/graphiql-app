import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFieldArray, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { GQLHeader, selectHeaders, setHeaders } from '@/redux/features/graphiqlClient/graphiqlSlice';

const GraphiqlHeader = () => {
  const headers = useAppSelector(selectHeaders);
  const { register, handleSubmit, formState, reset, control } = useForm({
    defaultValues: {
      headers,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });
  const dispatch = useAppDispatch();

  const onFormSubmit = (headers: { headers: GQLHeader[] }) => {
    dispatch(setHeaders(headers.headers));
    reset({});
  };

  const removeField = (index: number | number[] | undefined) => {
    remove(index);
  };

  const addNewField = () => {
    append({ key: '', value: '' });
  };

  return (
    <div className="flex flex-col p-4">
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <TextField label="Header Key" variant="outlined" size="small" {...register(`headers.${index}.key`)} />
            <TextField label="Header Value" variant="outlined" size="small" {...register(`headers.${index}.value`)} />
            {fields.length > 1 ? (
              <IconButton aria-label="delete" onClick={() => removeField(index)}>
                <DeleteIcon />
              </IconButton>
            ) : null}
          </div>
        ))}
        <div className="flex">
          <IconButton aria-label="add" onClick={addNewField}>
            <AddIcon />
          </IconButton>
          <Button type="submit" disabled={Object.keys(formState.dirtyFields).length === 0}>
            Set Headers
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GraphiqlHeader;
