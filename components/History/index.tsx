'use client';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import DataTable from '../DataTable';
import type { ApiRequest } from '@/types/api.types';
import EmptyHistory from './EmptyHistory';

function HistoryContainer() {
  const { storedValue, setLocalStorageValue } = useLocalStorage<ApiRequest[]>('requests', []);

  return (
    <>
      {!storedValue.length ? (
        <EmptyHistory />
      ) : (
        <DataTable requests={storedValue} setStorageValue={setLocalStorageValue} />
      )}
    </>
  );
}
export default HistoryContainer;
