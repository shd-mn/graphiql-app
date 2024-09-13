import { screen } from '@testing-library/react';
import { customRender } from '@/__test__/test-utils';
import History from './page';
import * as useLocalStorageHook from '@/hooks/useLocalStorage';
import { mockRequests } from '@/__test__/mock/mockData';

vi.mock('@/hooks/useLocalStorage');

describe('History Page', () => {
  it('renders EmptyHistory when no requests are stored', () => {
    vi.spyOn(useLocalStorageHook, 'useLocalStorage').mockReturnValue({
      storedValue: [],
      setLocalStorageValue: vi.fn(),
    });

    customRender(<History />);
    expect(screen.getByText("You haven't executed any requests")).toBeInTheDocument();
    expect(screen.getByText("It's empty here. Try:")).toBeInTheDocument();
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
  });

  it('renders DataTable when requests are stored', () => {
    vi.spyOn(useLocalStorageHook, 'useLocalStorage').mockReturnValue({
      storedValue: mockRequests,
      setLocalStorageValue: vi.fn(),
    });

    customRender(<History />);
    expect(screen.queryByText("You haven't executed any requests")).not.toBeInTheDocument();
    expect(screen.queryByText("It's empty here. Try:")).not.toBeInTheDocument();
    expect(screen.queryByText('REST Client')).not.toBeInTheDocument();
    expect(screen.queryByText('GraphiQL Client')).not.toBeInTheDocument();
  });
});
