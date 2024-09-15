import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputTable from './InputTable';

vi.mock('./InputTableRow', () => ({
  __esModule: true,
  default: ({ index, remove }: { index: number; remove: (index: number) => void }) => (
    <tr>
      <td>Mocked InputTableRow - {index}</td>
      <td>
        <button onClick={() => remove(index)}>Remove</button>
      </td>
    </tr>
  ),
}));

describe('InputTable component', () => {
  it('should render the correct number of rows based on fields prop', () => {
    const mockFields = [
      { id: '1', key: 'param1', value: 'value1' },
      { id: '2', key: 'param2', value: 'value2' },
    ];
    const mockRemove = vi.fn();

    render(<InputTable fields={mockFields} inputName="params" remove={mockRemove} />);

    expect(screen.getAllByRole('row')).toHaveLength(mockFields.length + 1);
  });

  it('should call remove function with correct index', () => {
    const mockFields = [{ id: '1', key: 'param1', value: 'value1' }];
    const mockRemove = vi.fn();

    render(<InputTable fields={mockFields} inputName="params" remove={mockRemove} />);

    fireEvent.click(screen.getByText('Remove'));

    expect(mockRemove).toHaveBeenCalledWith(0);
  });

  it('should render InputTableRow with isOnlyRow as true if there is only one field', () => {
    const mockFields = [{ id: '1', key: 'param1', value: 'value1' }];
    const mockRemove = vi.fn();

    render(<InputTable fields={mockFields} inputName="params" remove={mockRemove} />);

    expect(screen.getByText('Mocked InputTableRow - 0')).toBeInTheDocument();
  });

  it('should render InputTableRow with isOnlyRow as false if there are multiple fields', () => {
    const mockFields = [
      { id: '1', key: 'param1', value: 'value1' },
      { id: '2', key: 'param2', value: 'value2' },
    ];
    const mockRemove = vi.fn();

    render(<InputTable fields={mockFields} inputName="params" remove={mockRemove} />);

    expect(screen.getByText('Mocked InputTableRow - 0')).toBeInTheDocument();
    expect(screen.getByText('Mocked InputTableRow - 1')).toBeInTheDocument();
  });
});
