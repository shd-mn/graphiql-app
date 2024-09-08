'use client';
import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
import DataTableToolbar from './DataTableToolbar';
import DataTableHead from './DataTableHead';
import { getComparator } from '@/utils/getComparator';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import DataTableBody from './DataTableBody';
import { routes } from '@/constants/routes';
import type { DataTableType, Order, RequestType } from '@/types';
import { useRouter } from 'next/navigation';
import { generateUrl } from '@/utils/generateUrl';
import { setAllState } from '@/redux/features/restfullClient/restfullSlice';
import { useAppDispatch } from '@/redux/hooks';
import { resetResponse } from '@/redux/features/mainSlice';

export default function DataTable() {
  const { storedValue: requests, setLocalStorageValue } = useLocalStorage<RequestType[]>('requests', []);
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof DataTableType>('date');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DataTableType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = requests.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRequest = (event: React.MouseEvent<unknown>, id: string) => {
    const request = requests.find((n) => n.id === id)!;
    const generate = generateUrl(request);
    dispatch(setAllState(request));
    dispatch(resetResponse());
    router.push(generate);
  };

  const handleSelect = (event: React.MouseEvent<unknown>, id: string) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleDelete = () => {
    const newRequests = requests.filter((request) => !selected.includes(request.id));
    setLocalStorageValue(newRequests);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;

  const visibleRows = useMemo(
    () => [...requests].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, requests, orderBy, page, rowsPerPage],
  );

  if (!requests.length) {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          You haven&apos;t executed any requests
        </Typography>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          It&apos;s empty here. Try:
          <Button href={routes.restfull} color="inherit" variant="outlined">
            REST Client
          </Button>
          <Button href={routes.graphql} color="inherit" variant="outlined">
            GraphiQL Client
          </Button>
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataTableToolbar handleDelete={handleDelete} numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <DataTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              requestCount={requests.length}
            />
            <DataTableBody
              visibleRows={visibleRows}
              emptyRows={emptyRows}
              dense={dense}
              selected={selected}
              handleRequest={handleRequest}
              handleSelect={handleSelect}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
    </Box>
  );
}
