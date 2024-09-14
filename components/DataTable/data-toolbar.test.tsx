import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { customRender } from '@/__test__/test-utils';
import DataTableToolbar from '@/components/DataTable/DataTableToolbar';

vi.mock('next-intl', () => {
  return {
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useTranslations: vi.fn().mockImplementation(() => (key: string) => key),
  };
});

const handleDeleteMock = vi.fn();
const setDenseMock = vi.fn();

const props = {
  numSelected: 0,
  dense: false,
  setDense: setDenseMock,
  handleDelete: handleDeleteMock,
  deleteLabel: 'Delete',
  denseLabel: 'Dense',
};

describe('DataTableToolbar Component', () => {
  it('renders with default props', () => {
    customRender(<DataTableToolbar {...props} />);

    expect(screen.getByText('requestsHistory')).toBeInTheDocument();
  });

  it('renders toolbar with the correct title when no items are selected', () => {
    customRender(
      <DataTableToolbar
        numSelected={0}
        dense={false}
        setDense={vi.fn()}
        handleDelete={vi.fn()}
        deleteLabel="Delete selected"
        denseLabel="Dense"
      />,
    );

    expect(screen.getByText('requestsHistory')).toBeInTheDocument();
  });

  it('renders toolbar with the correct selected count when items are selected', () => {
    customRender(
      <DataTableToolbar
        numSelected={5}
        dense={false}
        setDense={vi.fn()}
        handleDelete={vi.fn()}
        deleteLabel="Delete selected"
        denseLabel="Dense"
      />,
    );

    expect(screen.getByText('5 selected')).toBeInTheDocument();
  });

  it('shows delete icon when items are selected', () => {
    const handleDelete = vi.fn();

    customRender(
      <DataTableToolbar
        numSelected={3}
        dense={false}
        setDense={vi.fn()}
        handleDelete={handleDelete}
        deleteLabel="Delete selected"
        denseLabel="Dense"
      />,
    );

    expect(screen.getByRole('button', { name: 'Delete selected' })).toBeInTheDocument();
  });

  it('calls setDense with true when the switch is toggled on', () => {
    customRender(<DataTableToolbar {...props} />);

    const switchInput = screen.getByRole('checkbox', { name: /Dense/i });

    fireEvent.click(switchInput);

    expect(setDenseMock).toHaveBeenCalledWith(true);
  });

  it('calls setDense with false when the switch is toggled off', () => {
    const updatedProps = { ...props, dense: true };
    customRender(<DataTableToolbar {...updatedProps} />);

    const switchInput = screen.getByRole('checkbox', { name: /Dense/i });

    fireEvent.click(switchInput);

    expect(setDenseMock).toHaveBeenCalledWith(false);
  });
});
