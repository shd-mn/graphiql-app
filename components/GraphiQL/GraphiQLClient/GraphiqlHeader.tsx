import { IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const GraphiqlHeader = () => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <TextField label="Header Key" variant="outlined" />
        <TextField label="Header Value" variant="outlined" />
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default GraphiqlHeader;
