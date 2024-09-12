import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import InputTableRow from './InputTableRow';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function InputTable({ inputName }: { inputName: string }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="w-2 py-0 pt-1">
              <CheckBoxIcon className="p-0" />
            </TableCell>
            <TableCell className="py-2">Key</TableCell>
            <TableCell className="py-2">Value</TableCell>
            <TableCell className="py-2"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <InputTableRow inputName={inputName} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
