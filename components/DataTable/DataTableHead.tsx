import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import type { DataTableType, HeadCell, Order } from '@/types/dataTable.types';

interface DataTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataTableType) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  requestCount: number;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'method',
    numeric: false,
    disablePadding: true,
    label: 'Method',
  },
  {
    id: 'url',
    numeric: false,
    disablePadding: false,
    label: 'URL',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
];

function DataTableHead(props: DataTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, requestCount, onRequestSort } = props;
  const createSortHandler = (property: keyof DataTableType) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < requestCount}
            checked={requestCount > 0 && numSelected === requestCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all requests',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default DataTableHead;
