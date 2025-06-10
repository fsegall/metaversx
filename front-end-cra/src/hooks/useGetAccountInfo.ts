import { useState, useEffect } from 'react';
import { useDapp } from '../components/DappProvider';

export const useGetAccountInfo = () => {
  const { customNetworkConfig } = useDapp();
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        // Here you would implement the actual account info fetching logic
        // For now, we'll just return a mock response
        setAccountInfo({
          address: 'erd1...',
          balance: '0',
          nonce: 0,
        });
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch account info');
        setLoading(false);
      }
    };

    fetchAccountInfo();
  }, [customNetworkConfig]);

  return {
    account: accountInfo,
    loading,
    error,
  };
}; 