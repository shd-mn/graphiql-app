import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DataTable from '@/components/DataTable';
import { customRender, setupStore } from '@/__test__/test-utils';
import { ApiRequest } from '@/types/api.types';
import { setAllState } from '@/redux/features/restfulSlice';
import { resetResponse } from '@/redux/features/mainSlice';

const mockRequests: ApiRequest[] = [
  {
    id: '1',
    method: 'GET',
    url: '/api/resource',
    date: '2024-01-01',
    params: [],
    headers: [],
    body: '',
    variables: [],
  },
  {
    id: '2',
    method: 'POST',
    url: '/api/resource',
    date: '2024-01-02',
    params: [],
    headers: [],
    body: '',
    variables: [],
  },
];

const mockDispatch = vi.fn();
vi.mock('@/redux/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

const mockGenerateUrl = vi.fn();
const mockRouterPush = vi.fn();

vi.mock('@/utils/generateUrl', () => ({
  generateUrl: (request: ApiRequest) => mockGenerateUrl(request),
}));

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const setStorageValueMock = vi.fn();

describe('DataTable Component', () => {
  it('renders and displays data', () => {
    customRender(<DataTable requests={mockRequests} setStorageValue={vi.fn()} />, {
      store: setupStore(),
    });

    expect(screen.getByText('Method')).toBeInTheDocument();
    expect(screen.getByText('URL')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  it('handles sorting', () => {
    customRender(<DataTable requests={mockRequests} setStorageValue={vi.fn()} />, {
      store: setupStore(),
    });

    fireEvent.click(screen.getByText('Date'));
  });

  it('calls dispatch and router.push with correct arguments when handleRequest is invoked', () => {
    customRender(<DataTable requests={mockRequests} setStorageValue={setStorageValueMock} />);

    const requestId = '1';
    const request = mockRequests.find((n) => n.id === requestId)!;
    const generatedUrl = 'some-generated-url';
    mockGenerateUrl.mockReturnValue(generatedUrl);

    const requestButton = screen.getByText(/GET/i);
    fireEvent.click(requestButton);

    expect(mockDispatch).toHaveBeenCalledWith(setAllState(request));
    expect(mockDispatch).toHaveBeenCalledWith(resetResponse());
  });
});
