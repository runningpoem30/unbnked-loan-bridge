
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loan, useLoan } from '@/context/LoanContext';
import { useWallet } from '@/context/WalletContext';

interface LoanOfferCardProps {
  loan: Loan;
}

const LoanOfferCard: React.FC<LoanOfferCardProps> = ({ loan }) => {
  const { acceptLoanOffer, cancelLoanOffer, repayLoan, isActionLoading } = useLoan();
  const { account } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Determine if current user is the lender
  const isLender = loan.lender === account;
  
  // Determine if current user is the borrower
  const isBorrower = loan.borrower === account;

  // Determine badge color based on status
  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-purple-100 text-purple-800';
      case 'Defaulted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden border-2 hover:shadow-md transition-all duration-300">
      <div className="bg-gradient-to-r from-unbnked-blue to-unbnked-lightblue h-2" />
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <Badge className={getBadgeColor(loan.status)}>{loan.status}</Badge>
          </div>
          <span className="text-xs text-gray-500">{formatDate(loan.timestamp)}</span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-unbnked-dark">
          {loan.amount} ETH
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Interest Rate:</span>
            <span className="font-medium">{loan.interestRate}%</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Duration:</span>
            <span className="font-medium">{loan.duration} days</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Lender:</span>
            <span className="font-mono">{formatAddress(loan.lender)}</span>
          </div>
          
          {loan.borrower && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Borrower:</span>
              <span className="font-mono">{formatAddress(loan.borrower)}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 bg-gray-50 p-3">
        {loan.status === 'Open' && !isLender && (
          <Button 
            onClick={() => acceptLoanOffer(loan.id)}
            className="bg-unbnked-teal hover:bg-unbnked-teal/80" 
            disabled={isActionLoading}
          >
            Accept Loan
          </Button>
        )}
        
        {loan.status === 'Open' && isLender && (
          <Button 
            onClick={() => cancelLoanOffer(loan.id)}
            variant="outline" 
            className="border-red-500 text-red-500 hover:bg-red-50" 
            disabled={isActionLoading}
          >
            Cancel Offer
          </Button>
        )}
        
        {loan.status === 'Active' && isBorrower && (
          <Button 
            onClick={() => repayLoan(loan.id)}
            className="bg-unbnked-orange hover:bg-unbnked-orange/80" 
            disabled={isActionLoading}
          >
            Repay Loan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default LoanOfferCard;
