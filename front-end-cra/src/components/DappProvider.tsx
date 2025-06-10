import React, { createContext, useContext, useState } from 'react';

interface DappContextType {
  environment: string;
  customNetworkConfig: {
    name: string;
    apiTimeout: number;
    apiAddress: string;
    explorerAddress: string;
  };
}

const DappContext = createContext<DappContextType | undefined>(undefined);

interface DappProviderProps {
  children: React.ReactNode;
}

export const DappProvider: React.FC<DappProviderProps> = ({ children }) => {
  const [context] = useState<DappContextType>({
    environment: "devnet",
    customNetworkConfig: {
      name: "devnet",
      apiTimeout: 6000,
      apiAddress: "https://devnet-api.multiversx.com",
      explorerAddress: "https://devnet-explorer.multiversx.com"
    }
  });

  return (
    <DappContext.Provider value={context}>
      {children}
    </DappContext.Provider>
  );
};

export const useDapp = () => {
  const context = useContext(DappContext);
  if (!context) {
    throw new Error('useDapp must be used within a DappProvider');
  }
  return context;
}; 