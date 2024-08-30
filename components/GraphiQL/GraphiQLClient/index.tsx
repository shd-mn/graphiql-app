import { TextField } from '@mui/material';

const GraphiQLClient = () => {
  return (
    <div>
      <div className="flex">
        <h5>Endpoint URL:</h5>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
      <div className="flex">
        <h5>SDL URL:</h5>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
    </div>
  );
};

export default GraphiQLClient;
