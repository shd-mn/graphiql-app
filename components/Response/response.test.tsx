import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ResponseSection from './index';
import { customRender } from '@/__test__/test-utils';

vi.mock('./EmptyState', () => ({
  default: () => <div>EmptyState</div>,
}));

vi.mock('./ErrorState', () => ({
  default: () => <div>ErrorState</div>,
}));

vi.mock('./ResponseHeader', () => ({
  default: () => <div>ResponseHeader</div>,
}));

vi.mock('./ResponseBody', () => ({
  default: () => <div>ResponseBody</div>,
}));

vi.mock('../UI/Ellipsis', () => ({
  default: () => <div>Ellipsis</div>,
}));

describe('ResponseSection component', () => {
  it('should show Ellipsis when loading', () => {
    const preloadedState = {
      main: {
        isLoading: true,
        response: {
          data: '',
          success: false,
          statusText: '',
          status: 0,
          responseTime: 0,
          parsedHeaders: {},
        },
      },
    };
    customRender(<ResponseSection />, { preloadedState });

    expect(screen.getByText('Ellipsis')).toBeInTheDocument();
  });

  it('should show EmptyState when there is no data and status is 0', () => {
    const preloadedState = {
      main: {
        isLoading: false,
        response: {
          data: '',
          success: false,
          statusText: '',
          status: 0,
          responseTime: 0,
          parsedHeaders: {},
        },
      },
    };
    customRender(<ResponseSection />, { preloadedState });

    expect(screen.getByText('EmptyState')).toBeInTheDocument();
  });

  it('should show ErrorState when response is not successful and status is 0', () => {
    const preloadedState = {
      main: {
        isLoading: false,
        response: {
          data: '',
          success: false,
          statusText: 'Error occurred',
          status: 0,
          responseTime: 0,
          parsedHeaders: {},
        },
      },
    };
    customRender(<ResponseSection />, { preloadedState });

    expect(screen.getByText('ErrorState')).toBeInTheDocument();
  });

  it('should render ResponseHeader and ResponseBody when there is a successful response', () => {
    const preloadedState = {
      main: {
        isLoading: false,
        response: {
          data: 'Response data',
          success: true,
          statusText: 'OK',
          status: 200,
          responseTime: 123,
          parsedHeaders: {},
        },
      },
    };
    customRender(<ResponseSection />, { preloadedState });

    expect(screen.getByText('ResponseHeader')).toBeInTheDocument();
    expect(screen.getByText('ResponseBody')).toBeInTheDocument();
  });
});
