import React, { useState } from 'react';
import { ExtensionLoginButton, WalletConnectLoginButton } from '@multiversx/sdk-dapp/UI';
import { useGetLoginInfo, useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { sendTransactions } from '@multiversx/sdk-dapp/services';

const MintForm: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useGetLoginInfo();
  const { address } = useGetAccountInfo();

  const contractAddress = 'erd1qqqqqqqqqqqqqpgqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv6k2sn';

  const handleMint = async () => {
    if (!isLoggedIn) {
      setStatus('❗ Por favor, conecte sua carteira antes de mintar.');
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      const tx = {
        value: '0',
        data: 'mintBadge',
        receiver: contractAddress,
        gasLimit: 50000000
      };

      const { sessionId } = await sendTransactions({
        transactions: [tx],
        transactionsDisplayInfo: {
          processingMessage: 'Mintando seu NFT...',
          errorMessage: 'Erro ao mintar NFT.',
          successMessage: '✅ NFT Skill Badge mintado com sucesso!'
        },
        redirectAfterSign: false
      });

      setStatus(`✅ Transação enviada! ID: ${sessionId}`);
    } catch (error) {
      console.error(error);
      setStatus('❌ Erro ao mintar NFT. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col items-center gap-2">
        <ExtensionLoginButton callbackRoute="/">
          Conectar com Extension
        </ExtensionLoginButton>
        <WalletConnectLoginButton callbackRoute="/">
          Conectar com WalletConnect
        </WalletConnectLoginButton>
      </div>
      <button
        onClick={handleMint}
        disabled={loading || !isLoggedIn}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Mintando...' : 'Mintar Skill Badge'}
      </button>
      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default MintForm;
