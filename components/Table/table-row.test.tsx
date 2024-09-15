import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import InputTableRow from './InputTableRow';
import { customRender } from '@/__test__/test-utils';
import { describe, it, expect, vi } from 'vitest';

const MockFormProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('TableRow component', () => {
  it('should render inputs and button correctly', () => {
    const removeMock = vi.fn();

    customRender(
      <MockFormProvider>
        <table>
          <tbody>
            <InputTableRow index={0} inputName="params" remove={removeMock} isOnlyRow={false} />
          </tbody>
        </table>
      </MockFormProvider>,
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Value')).toBeInTheDocument();

    expect(screen.getByLabelText('delete')).toBeInTheDocument();
  });

  it('should call remove function when delete button is clicked', () => {
    const removeMock = vi.fn();

    customRender(
      <MockFormProvider>
        <table>
          <tbody>
            <InputTableRow index={0} inputName="params" remove={removeMock} isOnlyRow={false} />
          </tbody>
        </table>
      </MockFormProvider>,
    );

    fireEvent.click(screen.getByLabelText('delete'));

    expect(removeMock).toHaveBeenCalledWith(0);
  });

  it('should disable delete button when isOnlyRow is true', () => {
    const removeMock = vi.fn();

    customRender(
      <MockFormProvider>
        <table>
          <tbody>
            <InputTableRow index={0} inputName="params" remove={removeMock} isOnlyRow={true} />
          </tbody>
        </table>
      </MockFormProvider>,
    );

    expect(screen.getByLabelText('delete')).toBeDisabled();
  });
});
