import { useRouter } from '@/i18n/routing';
import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFieldArray, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { GQLHeader, selectAll, setHeaders } from '@/redux/features/graphiqlSlice';
import { setBrowserUrl } from '@/utils/setBrowserUrl';

interface GraphiqlHeaderProps {
  headersinput: Record<string, string>;
}

const GraphiqlHeader = ({ headersinput }: GraphiqlHeaderProps) => {
  const { query, url, headers } = useAppSelector(selectAll);
  const router = useRouter();
  const { register, handleSubmit, formState, reset, control } = useForm({
    defaultValues: {
      headers: Object.entries(headersinput).map(([key, value]) => ({ key, value })) || headers,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });
  const dispatch = useAppDispatch();

  const onFormSubmit = (headers: { headers: GQLHeader[] }) => {
    dispatch(setHeaders(headers.headers));
    void router.push(setBrowserUrl(url, query, headers.headers));
    reset({ headers: headers.headers });
  };

  const removeField = (index: number | number[] | undefined) => {
    remove(index);
  };

  const addNewField = () => {
    append({ key: '', value: '' });
  };

  return (
    <div className="flex flex-grow flex-col overflow-auto p-4">
      <form className="flex flex-col gap-2">
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
          <Button
            type="button"
            disabled={Object.keys(formState.dirtyFields).length === 0}
            onClick={handleSubmit(onFormSubmit)}
          >
            Set Headers
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GraphiqlHeader;
