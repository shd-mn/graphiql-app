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
    <div className="flex flex-col">
      {JSON.stringify(headers)}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <TextField label="Header Key" variant="outlined" {...register(`headers.${index}.key`)} />
            <TextField label="Header Value" variant="outlined" {...register(`headers.${index}.value`)} />
            {fields.length > 1 ? (
              <IconButton aria-label="delete" onClick={() => removeField(index)}>
                <DeleteIcon />
              </IconButton>
            ) : null}
          </div>
        ))}
        <IconButton aria-label="add" onClick={addNewField}>
          <AddIcon />
        </IconButton>
        <Button type="submit" disabled={Object.keys(formState.dirtyFields).length === 0}>
          Set Headers
        </Button>
      </form>
    </div>
  );
};

export default GraphiqlHeader;
