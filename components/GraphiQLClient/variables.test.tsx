import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { graphiqlSlice, setVariables } from '@/redux/features/graphiqlSlice';
import { useVariableEditor, useVariablesEditorState } from '@graphiql/react';
import VariablesSection from '@/components/GraphiQLClient/VariablesSection';

vi.mock('@graphiql/react', () => ({
  useVariableEditor: vi.fn(),
  useVariablesEditorState: vi.fn(),
  VariableEditor: () => <div>VariableEditor Component</div>,
}));

const store = configureStore({
  reducer: { graphiql: graphiqlSlice.reducer },
});

describe('VariablesSection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render VariableEditor component', () => {
    (useVariableEditor as MockedFunction<typeof useVariableEditor>).mockReturnValue({
      current: document.createElement('div'),
    });
    (useVariablesEditorState as MockedFunction<typeof useVariablesEditorState>).mockReturnValue([
      'mockVariable',
      vi.fn(),
    ]);

    render(
      <Provider store={store}>
        <VariablesSection />
      </Provider>,
    );

    expect(screen.getByText('VariableEditor Component')).toBeInTheDocument();
  });

  it('should dispatch setVariables action when state is updated', async () => {
    const mockDispatch = vi.fn();
    (useVariableEditor as MockedFunction<typeof useVariableEditor>).mockReturnValue({
      current: document.createElement('div'),
    });
    (useVariablesEditorState as MockedFunction<typeof useVariablesEditorState>).mockReturnValue([
      'mockVariable',
      vi.fn(),
    ]);

    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <VariablesSection />
      </Provider>,
    );

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setVariables('mockVariable'));
    });
  });

  it('should not dispatch setVariables if useVariableEditor or useVariablesEditorState are not available', () => {
    (useVariableEditor as MockedFunction<typeof useVariableEditor>).mockReturnValue({ current: null });
    (useVariablesEditorState as MockedFunction<typeof useVariablesEditorState>).mockReturnValue(['', vi.fn()]);

    const mockDispatch = vi.fn();
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <VariablesSection />
      </Provider>,
    );

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
