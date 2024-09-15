import React from 'react';
import { FieldArrayWithId, UseFieldArrayRemove } from 'react-hook-form';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import InputTableRow from './InputTableRow';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface InputTableProps {
  fields: FieldArrayWithId[];
  inputName: 'params' | 'headers' | 'variables';
  remove: UseFieldArrayRemove;
}

const InputTable: React.FC<InputTableProps> = ({ fields, inputName, remove }: InputTableProps) => {
  return (
    <TableContainer className="h-full overflow-auto">
      <Table stickyHeader sx={{ minWidth: 450 }} className="pb-2" aria-label="request params table" size="small">
        <TableHead>
          <TableRow>
            <TableCell className="w-2 py-0">
              <CheckBoxIcon className="p-0" />
            </TableCell>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
            <TableCell className="w-4">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field, index) => (
            <InputTableRow
              key={field.id}
              index={index}
              inputName={inputName}
              remove={remove}
              isOnlyRow={fields.length === 1}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InputTable;
