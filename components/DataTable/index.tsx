import { useMemo, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Box, Paper, Table, TableContainer, TablePagination, useMediaQuery, useTheme } from '@mui/material';
import DataTableToolbar from './DataTableToolbar';
import DataTableHead from './DataTableHead';
import { getComparator } from '@/utils/getComparator';
import DataTableBody from './DataTableBody';
import { generateUrl } from '@/utils/generateUrl';
import { setAllState } from '@/redux/features/restfulSlice';
import { useAppDispatch } from '@/redux/hooks';
import { resetResponse } from '@/redux/features/mainSlice';
import type { DataTableType, Order } from '@/types/dataTable.types';
import type { ApiRequest } from '@/types/api.types';
import { useTranslations } from 'next-intl';

type PropTypes = {
  requests: ApiRequest[];
  setStorageValue: (value: ApiRequest[]) => void;
};

export default function DataTable({ requests, setStorageValue }: PropTypes) {
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof DataTableType>('date');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const t = useTranslations('HistoryPage');

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
    setStorageValue(newRequests);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;

  const visibleRows = useMemo(
    () => [...requests].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, requests, orderBy, page, rowsPerPage],
  );

  return (
    <Box className="padding-x h-full w-full pb-1 pt-3">
      <Paper className="flex h-full w-full flex-col">
        <DataTableToolbar
          numSelected={selected.length}
          dense={dense}
          setDense={setDense}
          handleDelete={handleDelete}
          deleteLabel={t('delete')}
          denseLabel={t('dense')}
        />
        <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <DataTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              requestCount={requests.length}
              labels={{
                method: t('method'),
                url: t('url'),
                date: t('date'),
              }}
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
          labelRowsPerPage={isMobile ? t('rows') : t('rowsPerPage')}
          labelDisplayedRows={({ from, to, count }) =>
            isMobile ? `${from}-${to} ${t('of')} ${count}` : `${from}-${to} ${t('of')} ${count}`
          }
          slotProps={{
            select: {
              style: isMobile ? { marginRight: '8px' } : {},
            },
          }}
        />
      </Paper>
    </Box>
  );
}
