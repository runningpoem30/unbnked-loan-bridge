
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoan } from '@/context/LoanContext';
import { Textarea } from '@/components/ui/textarea';

const CreateLoanRequest = () => {
  const { createLoanRequest, isActionLoading } = useLoan();
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLoanRequest(amount, purpose).then(() => {
      // Close dialog and reset form on success
      setOpen(false);
      setAmount('');
      setPurpose('');
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-unbnked-orange text-unbnked-orange hover:bg-unbnked-orange/10">
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
          Request a Loan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request a Loan</DialogTitle>
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
            <Label htmlFor="purpose">Loan Purpose</Label>
            <Textarea
              id="purpose"
              placeholder="Briefly describe what you need the loan for"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
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
              className="bg-unbnked-orange hover:bg-unbnked-orange/90" 
              disabled={isActionLoading}
            >
              {isActionLoading ? 'Creating...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLoanRequest;
