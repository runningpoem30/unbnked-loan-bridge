
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoan } from '@/context/LoanContext';

const CreateLoanOffer = () => {
  const { createLoanOffer, isActionLoading } = useLoan();
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLoanOffer(amount, Number(interestRate), Number(duration)).then(() => {
      // Close dialog and reset form on success
      setOpen(false);
      setAmount('');
      setInterestRate('');
      setDuration('');
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-unbnked-blue hover:bg-unbnked-blue/90">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
          >
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
          Create Loan Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Loan Offer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="interest">Interest Rate (%)</Label>
            <Input
              id="interest"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (Days)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-unbnked-teal hover:bg-unbnked-teal/90" 
              disabled={isActionLoading}
            >
              {isActionLoading ? 'Creating...' : 'Create Offer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLoanOffer;
