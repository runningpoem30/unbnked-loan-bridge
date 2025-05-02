
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { toast } from 'sonner';

interface WalletContextType {
  isConnected: boolean;
  account: string | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  balance: string;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    const checkEthereum = async () => {
      if (window.ethereum) {
        // Check if already connected
        try {
          const provider = new BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const balanceWei = await provider.getBalance(address);
            const balanceEth = Number(balanceWei) / 10**18;
            
            setProvider(provider);
            setSigner(signer);
            setAccount(address);
            setBalance(balanceEth.toFixed(4));
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking Ethereum connection:", error);
        }
      }
    };
    
    checkEthereum();
    
    // Setup event listeners
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet();
        } else {
          // Account changed, update state
          checkEthereum();
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        // Chain changed, refresh state
        window.location.reload();
      });
    }
    
    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  // Update balance when account changes
  useEffect(() => {
    const updateBalance = async () => {
      if (account && provider) {
        try {
          const balanceWei = await provider.getBalance(account);
          const balanceEth = Number(balanceWei) / 10**18;
          setBalance(balanceEth.toFixed(4));
        } catch (error) {
          console.error("Error updating balance:", error);
        }
      }
    };

    updateBalance();
  }, [account, provider]);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      if (!window.ethereum) {
        toast.error("MetaMask is not installed. Please install it to continue.");
        return;
      }
      
      const provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balanceWei = await provider.getBalance(address);
      const balanceEth = Number(balanceWei) / 10**18;
      
      setProvider(provider);
      setSigner(signer);
      setAccount(address);
      setBalance(balanceEth.toFixed(4));
      setIsConnected(true);
      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
    setSigner(null);
    setProvider(null);
    setBalance('0');
    toast.info("Wallet disconnected");
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      account,
      signer,
      provider,
      balance,
      isLoading,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
};

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
