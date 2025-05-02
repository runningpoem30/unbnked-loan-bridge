
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoanRequest, useLoan } from '@/context/LoanContext';
import { useWallet } from '@/context/WalletContext';

interface LoanRequestCardProps {
  request: LoanRequest;
}

const LoanRequestCard: React.FC<LoanRequestCardProps> = ({ request }) => {
  const { fulfillLoanRequest, cancelLoanRequest, isActionLoading } = useLoan();
  const { account } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Determine if current user is the borrower
  const isBorrower = request.borrower === account;

  // Determine badge color based on status
  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Fulfilled':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden border-2 hover:shadow-md transition-all duration-300">
      <div className="bg-gradient-to-r from-unbnked-orange to-unbnked-orange/70 h-2" />
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-3">
          <Badge className={getBadgeColor(request.status)}>{request.status}</Badge>
          <span className="text-xs text-gray-500">{formatDate(request.timestamp)}</span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-unbnked-dark">
          {request.amount} ETH
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Purpose:</span>
            <span className="font-medium">{request.purpose}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Borrower:</span>
            <span className="font-mono">{formatAddress(request.borrower)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 bg-gray-50 p-3">
        {request.status === 'Pending' && !isBorrower && (
          <Button 
            onClick={() => fulfillLoanRequest(request.id)}
            className="bg-unbnked-teal hover:bg-unbnked-teal/80" 
            disabled={isActionLoading}
          >
            Fund Request
          </Button>
        )}
        
        {request.status === 'Pending' && isBorrower && (
          <Button 
            onClick={() => cancelLoanRequest(request.id)}
            variant="outline" 
            className="border-red-500 text-red-500 hover:bg-red-50" 
            disabled={isActionLoading}
          >
            Cancel Request
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default LoanRequestCard;
