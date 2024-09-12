import React from 'react';
import { alpha, FormControlLabel, IconButton, Switch, Toolbar, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DataTableToolbarProps {
  numSelected: number;
  dense: boolean;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}
function DataTableToolbar({ numSelected, dense, setDense, handleDelete }: DataTableToolbarProps) {
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Requests History
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete Items">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Reduce List Dense">
          <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense" />
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default DataTableToolbar;
