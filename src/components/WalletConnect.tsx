
import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Card, CardContent } from '@/components/ui/card';

const WalletConnect = () => {
  const { isConnected, account, balance, connectWallet, disconnectWallet, isLoading } = useWallet();

  // Format the account address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!isConnected) {
    return (
      <Card className="border-2 border-unbnked-teal/20 bg-gradient-to-b from-white to-unbnked-light">
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
          <div className="w-16 h-16 bg-unbnked-teal/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-unbnked-teal">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-unbnked-dark">Connect Wallet</h3>
            <p className="text-gray-500 mt-1">Connect your MetaMask wallet to start using Unbnked</p>
          </div>
          <Button 
            onClick={connectWallet} 
            className="bg-unbnked-orange hover:bg-unbnked-orange/80 text-white w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect MetaMask'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-unbnked-teal/20 bg-gradient-to-b from-white to-unbnked-light">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
        <div className="w-16 h-16 bg-unbnked-teal/10 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-unbnked-teal">
            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
            <line x1="2" x2="22" y1="10" y2="10"></line>
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-unbnked-dark">Wallet Connected</h3>
          <p className="text-unbnked-blue font-mono bg-unbnked-teal/10 px-3 py-1 rounded-full text-sm mt-1">
            {formatAddress(account || '')}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-gray-500">Balance:</span>
          <span className="font-bold text-unbnked-blue">{balance} ETH</span>
        </div>
        <Button 
          onClick={disconnectWallet} 
          variant="outline" 
          className="border-unbnked-orange text-unbnked-orange hover:bg-unbnked-orange/10 w-full"
        >
          Disconnect
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;
