import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { usePrettifyEditors, useQueryEditor } from '@graphiql/react';
import { customRender } from '@/__test__/test-utils';
import PrettifyButton from '@/components/GraphiQLClient/PrettifyButton';
import { toast } from 'sonner';

vi.mock('@graphiql/react', () => ({
  useQueryEditor: vi.fn(),
  usePrettifyEditors: vi.fn(),
}));

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTranslations: vi.fn().mockImplementation(() => (key: string) => key),
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('PrettifyButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls prettifyEditors on click when editor is present', () => {
    const mockPrettifyEditors = vi.fn();
    const mockRefObject = { current: {} as HTMLDivElement };
    vi.mocked(usePrettifyEditors).mockReturnValue(mockPrettifyEditors);
    vi.mocked(useQueryEditor).mockReturnValue(mockRefObject);

    customRender(<PrettifyButton />);

    fireEvent.click(screen.getByText('Prettify query'));

    expect(mockPrettifyEditors).toHaveBeenCalled();
  });

  it('shows an error toast if prettifyEditors throws an error', () => {
    const mockPrettifyEditors = vi.fn().mockImplementation(() => {
      throw new Error('Prettify error');
    });
    const mockRefObject = { current: {} as HTMLDivElement };
    vi.mocked(usePrettifyEditors).mockReturnValue(mockPrettifyEditors);
    vi.mocked(useQueryEditor).mockReturnValue(mockRefObject);

    customRender(<PrettifyButton />);

    fireEvent.click(screen.getByText('Prettify query'));

    expect(vi.mocked(toast.error)).toHaveBeenCalledWith('general.prettifyError');
  });
});
