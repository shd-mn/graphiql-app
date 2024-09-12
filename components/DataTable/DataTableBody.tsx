import type { DataTableType } from '@/types/dataTable.types';
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';

interface DataTableBodyProps {
  visibleRows: DataTableType[];
  emptyRows: number;
  selected: readonly string[];
  dense: boolean;
  handleRequest: (event: React.MouseEvent<unknown>, method: string) => void;
  handleSelect: (event: React.MouseEvent<unknown>, id: string) => void;
}

function DataTableBody(props: DataTableBodyProps) {
  const { visibleRows, emptyRows, selected, dense, handleRequest, handleSelect } = props;

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            sx={{ cursor: 'pointer' }}
            onClick={(event) => handleRequest(event, row.id)}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                onClick={(event) => handleSelect(event, row.id)}
                checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {row.method}
            </TableCell>
            <TableCell>{row.url}</TableCell>
            <TableCell>{row.date}</TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}
export default DataTableBody;
