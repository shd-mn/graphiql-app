import React from 'react';
import { alpha, FormControlLabel, IconButton, Switch, Toolbar, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslations } from 'next-intl';

interface DataTableToolbarProps {
  numSelected: number;
  dense: boolean;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  deleteLabel: string;
  denseLabel: string;
}

function DataTableToolbar({
  numSelected,
  dense,
  setDense,
  handleDelete,
  deleteLabel,
  denseLabel,
}: DataTableToolbarProps) {
  const t = useTranslations('HistoryPage');

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
          {numSelected} {t('selected')}
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {t('requestsHistory')}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title={deleteLabel}>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={denseLabel}>
          <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label={denseLabel} />
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default DataTableToolbar;
