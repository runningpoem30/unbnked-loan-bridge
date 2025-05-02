
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from './WalletContext';
import { formatEther, parseEther } from 'ethers';
import { toast } from 'sonner';

export interface Loan {
  id: string;
  lender: string;
  borrower: string | null;
  amount: string;
  interestRate: number;
  duration: number;
  status: 'Open' | 'Active' | 'Completed' | 'Defaulted';
  timestamp: number;
}

export interface LoanRequest {
  id: string;
  borrower: string;
  amount: string;
  purpose: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
  timestamp: number;
}

interface LoanContextType {
  loans: Loan[];
  loanRequests: LoanRequest[];
  userLoans: Loan[];
  userLoanRequests: LoanRequest[];
  createLoanOffer: (amount: string, interestRate: number, duration: number) => Promise<void>;
  createLoanRequest: (amount: string, purpose: string) => Promise<void>;
  acceptLoanOffer: (loanId: string) => Promise<void>;
  fulfillLoanRequest: (requestId: string) => Promise<void>;
  repayLoan: (loanId: string) => Promise<void>;
  cancelLoanOffer: (loanId: string) => Promise<void>;
  cancelLoanRequest: (requestId: string) => Promise<void>;
  isActionLoading: boolean;
}

const LoanContext = createContext<LoanContextType | null>(null);

export const useLoan = (): LoanContextType => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};

interface LoanProviderProps {
  children: ReactNode;
}

export const LoanProvider = ({ children }: LoanProviderProps) => {
  const { account, signer } = useWallet();
  
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  // For demonstration purposes, we're using localStorage
  // In a real app, this would interact with a smart contract
  useEffect(() => {
    const loadData = () => {
      const savedLoans = localStorage.getItem('unbnked_loans');
      const savedRequests = localStorage.getItem('unbnked_loan_requests');
      
      if (savedLoans) {
        setLoans(JSON.parse(savedLoans));
      }
      
      if (savedRequests) {
        setLoanRequests(JSON.parse(savedRequests));
      } else {
        // Add some demo data if none exists
        const demoRequests = [
          {
            id: 'req-001',
            borrower: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            amount: '0.5',
            purpose: 'Business expansion',
            status: 'Pending' as const,
            timestamp: Date.now() - 3600000
          },
          {
            id: 'req-002',
            borrower: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            amount: '1.2',
            purpose: 'Home renovation',
            status: 'Pending' as const,
            timestamp: Date.now() - 7200000
          }
        ];
        
        setLoanRequests(demoRequests);
        localStorage.setItem('unbnked_loan_requests', JSON.stringify(demoRequests));
        
        const demoLoans = [
          {
            id: 'loan-001',
            lender: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
            borrower: null,
            amount: '2.0',
            interestRate: 5,
            duration: 30,
            status: 'Open' as const,
            timestamp: Date.now() - 86400000
          },
          {
            id: 'loan-002',
            lender: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
            borrower: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            amount: '1.5',
            interestRate: 7,
            duration: 60,
            status: 'Active' as const,
            timestamp: Date.now() - 172800000
          }
        ];
        
        setLoans(demoLoans);
        localStorage.setItem('unbnked_loans', JSON.stringify(demoLoans));
      }
    };
    
    loadData();
  }, []);
  
  // Filter loans and requests for the current user
  const userLoans = loans.filter(loan => 
    loan.lender === account || loan.borrower === account
  );
  
  const userLoanRequests = loanRequests.filter(request => 
    request.borrower === account
  );
  
  // Create a new loan offer
  const createLoanOffer = async (amount: string, interestRate: number, duration: number) => {
    if (!account || !signer) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      setIsActionLoading(true);
      
      // In a real application, this would be a smart contract call
      // For this demo, we'll just add it to our state
      const newLoan: Loan = {
        id: `loan-${Date.now()}`,
        lender: account,
        borrower: null,
        amount,
        interestRate,
        duration,
        status: 'Open',
        timestamp: Date.now()
      };
      
      const updatedLoans = [...loans, newLoan];
      setLoans(updatedLoans);
      
      // Save to localStorage for persistence
      localStorage.setItem('unbnked_loans', JSON.stringify(updatedLoans));
      
      toast.success("Loan offer created successfully!");
    } catch (error) {
      console.error("Error creating loan offer:", error);
      toast.error("Failed to create loan offer");
    } finally {
      setIsActionLoading(false);
    }
  };
  
  // Create a new loan request
  const createLoanRequest = async (amount: string, purpose: string) => {
    if (!account || !signer) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      setIsActionLoading(true);
      
      const newRequest: LoanRequest = {
        id: `req-${Date.now()}`,
        borrower: account,
        amount,
        purpose,
        status: 'Pending',
        timestamp: Date.now()
      };
      
      const updatedRequests = [...loanRequests, newRequest];
      setLoanRequests(updatedRequests);
      
      // Save to localStorage for persistence
      localStorage.setItem('unbnked_loan_requests', JSON.stringify(updatedRequests));
      
      toast.success("Loan request created successfully!");
    } catch (error) {
      console.error("Error creating loan request:", error);
      toast.error("Failed to create loan request");
    } finally {
      setIsActionLoading(false);
    }
  };
  
  // Accept a loan offer (borrower)
  const acceptLoanOffer = async (loanId: string) => {
    if (!account || !signer) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      setIsActionLoading(true);
      
      // Find the loan
      const loanToAccept = loans.find(loan => loan.id === loanId);
      
      if (!loanToAccept) {
        toast.error("Loan not found");
        return;
      }
      
      if (loanToAccept.status !== 'Open') {
        toast.error("This loan is not available");
        return;
      }
      
      // In a real app, this would involve a transaction
      // For demo purposes, we'll just update the state
      const updatedLoans = loans.map(loan => {
        if (loan.id === loanId) {
          return {
            ...loan,
            borrower: account,
            status: 'Active'
          };
        }
        return loan;
      });
      
      setLoans(updatedLoans);
      localStorage.setItem('unbnked_loans', JSON.stringify(updatedLoans));
      
      toast.success("Loan accepted! You'll receive funds shortly.");
    } catch (error) {
      console.error("Error accepting loan:", error);
      toast.error("Failed to accept loan");
    } finally {
      setIsActionLoading(false);
    }
  };
  
  // Fulfill a loan request (lender)
  const fulfillLoanRequest = async (requestId: string) => {
    if (!account || !signer) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      setIsActionLoading(true);
      
      // Find the request
      const requestToFulfill = loanRequests.find(req => req.id === requestId);
      
      if (!requestToFulfill) {
        toast.error("Request not found");
        return;
      }
      
      if (requestToFulfill.status !== 'Pending') {
        toast.error("This request is not available");
        return;
      }
      
      // Update the request status
      const updatedRequests = loanRequests.map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status: 'Fulfilled'
          };
        }
        return req;
      });
      
      // Create a new active loan
      const newLoan: Loan = {
        id: `loan-${Date.now()}`,
        lender: account,
        borrower: requestToFulfill.borrower,
        amount: requestToFulfill.amount,
        interestRate: 5, // Default rate for demo
        duration: 30, // Default duration for demo
        status: 'Active',
        timestamp: Date.now()
      };
      
      const updatedLoans = [...loans, newLoan];
      
      // Update state and localStorage
      setLoanRequests(updatedRequests);
      setLoans(updatedLoans);
      
      localStorage.setItem('unbnked_loan_requests', JSON.stringify(updatedRequests));
      localStorage.setItem('unbnked_loans', JSON.stringify(updatedLoans));
      
      toast.success("Loan request fulfilled successfully!");
    } catch (error) {
      console.error("Error fulfilling loan request:", error);
      toast.error("Failed to fulfill loan request");
    } finally {
      setIsActionLoading(false);
    }
  };
  
  // Repay a loan (borrower)
  const repayLoan = async (loanId: string) => {
    if (!account || !signer) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      setIsActionLoading(true);
      
      // Find the loan
      const loanToRepay = loans.find(loan => loan.id === loanId);
      
      if (!loanToRepay) {
        toast.error("Loan not found");
        return;
      }
      
      if (loanToRepay.status !== 'Active') {
        toast.error("This loan cannot be repaid");
        return;
      }
      
      if (loanToRepay.borrower !== account) {
        toast.error("You can only repay your own loans");
        return;
      }
      
      // In a real app, this would involve a transaction
      // For demo purposes, we'll just update the state
      const updatedLoans = loans.map(loan => {
        if (loan.id === loanId) {
          return {
            ...loan,
            status: 'Completed'
          };
        }
        return loan;
      });
      
      setLoans(updatedLoans);
      localStorage.setItem('unbnked_loans', JSON.stringify(updatedLoans));
      
      toast.success("Loan repaid successfully!");
    } catch (error) {
      console.error("Error repaying loan:", error);
      toast.error("Failed to repay loan");
    } finally {
      setIsActionLoading(false);
    }
  };
  
  // Cancel a loan offer (lender)
  const cancelLoanOffer = async (loanId: string) => {
    if (!account || !signer) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      setIsActionLoading(true);
      
      // Find the loan
      const loanToCancel = loans.find(loan => loan.id === loanId);
      
      if (!loanToCancel) {
        toast.error("Loan not found");
        return;
      }
      
      if (loanToCancel.status !== 'Open') {
        toast.error("This loan cannot be cancelled");
        return;
      }
      
      if (loanToCancel.lender !== account) {
        toast.error("You can only cancel your own loan offers");
        return;
      }
      
      // Remove the loan from the list
      const updatedLoans = loans.filter(loan => loan.id !== loanId);
      setLoans(updatedLoans);
      localStorage.setItem('unbnked_loans', JSON.stringify(updatedLoans));
      
      toast.success("Loan offer cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling loan offer:", error);
      toast.error("Failed to cancel loan offer");
    } finally {
      setIsActionLoading(false);
    }
  };
  
  // Cancel a loan request (borrower)
  const cancelLoanRequest = async (requestId: string) => {
    if (!account || !signer) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      setIsActionLoading(true);
      
      // Find the request
      const requestToCancel = loanRequests.find(req => req.id === requestId);
      
      if (!requestToCancel) {
        toast.error("Request not found");
        return;
      }
      
      if (requestToCancel.status !== 'Pending') {
        toast.error("This request cannot be cancelled");
        return;
      }
      
      if (requestToCancel.borrower !== account) {
        toast.error("You can only cancel your own loan requests");
        return;
      }
      
      // Update the request status
      const updatedRequests = loanRequests.map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status: 'Cancelled'
          };
        }
        return req;
      });
      
      setLoanRequests(updatedRequests);
      localStorage.setItem('unbnked_loan_requests', JSON.stringify(updatedRequests));
      
      toast.success("Loan request cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling loan request:", error);
      toast.error("Failed to cancel loan request");
    } finally {
      setIsActionLoading(false);
    }
  };
  
  return (
    <LoanContext.Provider value={{
      loans,
      loanRequests,
      userLoans,
      userLoanRequests,
      createLoanOffer,
      createLoanRequest,
      acceptLoanOffer,
      fulfillLoanRequest,
      repayLoan,
      cancelLoanOffer,
      cancelLoanRequest,
      isActionLoading
    }}>
      {children}
    </LoanContext.Provider>
  );
};
