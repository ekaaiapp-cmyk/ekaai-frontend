import { useState } from 'react';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface UseLoadingReturn {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  loadingState: LoadingState;
  setLoading: () => void;
  setSuccess: () => void;
  setError: () => void;
  setIdle: () => void;
  executeAsync: <T>(asyncFn: () => Promise<T>) => Promise<T | null>;
}

export const useLoading = (initialState: LoadingState = 'idle'): UseLoadingReturn => {
  const [loadingState, setLoadingState] = useState<LoadingState>(initialState);

  const isLoading = loadingState === 'loading';
  const isSuccess = loadingState === 'success';
  const isError = loadingState === 'error';

  const setLoading = () => setLoadingState('loading');
  const setSuccess = () => setLoadingState('success');
  const setError = () => setLoadingState('error');
  const setIdle = () => setLoadingState('idle');

  const executeAsync = async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading();
      const result = await asyncFn();
      setSuccess();
      return result;
    } catch (error) {
      setError();
      console.error('Async operation failed:', error);
      return null;
    }
  };

  return {
    isLoading,
    isSuccess,
    isError,
    loadingState,
    setLoading,
    setSuccess,
    setError,
    setIdle,
    executeAsync
  };
};
