'use client';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import DataTable from '../DataTable';
import type { ApiRequest } from '@/types/api.types';
import EmptyHistory from './EmptyHistory';
import { replaceVariables } from '@/utils/replaceVariables';

function HistoryContainer() {
  const { storedValue, setLocalStorageValue } = useLocalStorage<ApiRequest[]>('requests', []);

  const replacedVar = storedValue.map((request) => replaceVariables<ApiRequest>(request));

  return (
    <>
      {!storedValue.length ? (
        <EmptyHistory />
      ) : (
        <DataTable requests={replacedVar} setStorageValue={setLocalStorageValue} />
      )}
    </>
  );
}
export default HistoryContainer;
