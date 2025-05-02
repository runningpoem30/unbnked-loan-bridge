
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/context/WalletContext';
import { useLoan } from '@/context/LoanContext';
import WalletConnect from '@/components/WalletConnect';
import LoanOfferCard from '@/components/LoanOfferCard';
import LoanRequestCard from '@/components/LoanRequestCard';
import CreateLoanOffer from '@/components/CreateLoanOffer';
import CreateLoanRequest from '@/components/CreateLoanRequest';

const Dashboard = () => {
  const { isConnected } = useWallet();
  const { loans, loanRequests, userLoans, userLoanRequests } = useLoan();
  const [activeTab, setActiveTab] = useState("my-dashboard");
  
  // Filter loans by status for display
  const openLoans = loans.filter(loan => loan.status === 'Open');
  
  // Filter loan requests that are pending
  const pendingRequests = loanRequests.filter(request => request.status === 'Pending');
  
  // Filter user's active loans and requests
  const userActiveLoans = userLoans.filter(loan => loan.status === 'Active');
  const userOpenLoans = userLoans.filter(loan => loan.status === 'Open');
  const userPendingRequests = userLoanRequests.filter(request => request.status === 'Pending');
  
  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-unbnked-blue mb-4">Welcome to Unbnked</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The decentralized platform connecting lenders and borrowers through blockchain technology.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <WalletConnect />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-unbnked-blue">Unbnked Dashboard</h1>
          <p className="text-gray-600">Manage your loans and funding requests</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <CreateLoanRequest />
          <CreateLoanOffer />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="my-dashboard" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="my-dashboard">My Dashboard</TabsTrigger>
              <TabsTrigger value="loan-offers">Loan Offers</TabsTrigger>
              <TabsTrigger value="loan-requests">Loan Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-dashboard" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">My Active Loans</h2>
                {userActiveLoans.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userActiveLoans.map(loan => (
                      <LoanOfferCard key={loan.id} loan={loan} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-6 text-center text-gray-500">
                      You have no active loans
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">My Loan Offers</h2>
                {userOpenLoans.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userOpenLoans.map(loan => (
                      <LoanOfferCard key={loan.id} loan={loan} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-6 text-center text-gray-500">
                      You haven't created any loan offers
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">My Loan Requests</h2>
                {userPendingRequests.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userPendingRequests.map(request => (
                      <LoanRequestCard key={request.id} request={request} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-6 text-center text-gray-500">
                      You haven't created any loan requests
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="loan-offers">
              <h2 className="text-xl font-semibold mb-4">Available Loan Offers</h2>
              {openLoans.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {openLoans.map(loan => (
                    <LoanOfferCard key={loan.id} loan={loan} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-6 text-center text-gray-500">
                    No loan offers available at the moment
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="loan-requests">
              <h2 className="text-xl font-semibold mb-4">Pending Loan Requests</h2>
              {pendingRequests.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pendingRequests.map(request => (
                    <LoanRequestCard key={request.id} request={request} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-6 text-center text-gray-500">
                    No loan requests available at the moment
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <WalletConnect />
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Loan Stats</CardTitle>
              <CardDescription>Your lending activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Active Loans:</span>
                  <span className="font-semibold">{userActiveLoans.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Open Offers:</span>
                  <span className="font-semibold">{userOpenLoans.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pending Requests:</span>
                  <span className="font-semibold">{userPendingRequests.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Market Information</CardTitle>
              <CardDescription>Current loan market trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Available Loans:</span>
                  <span className="font-semibold">{openLoans.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Open Requests:</span>
                  <span className="font-semibold">{pendingRequests.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Avg. Interest Rate:</span>
                  <span className="font-semibold">
                    {openLoans.length > 0 
                      ? (openLoans.reduce((acc, loan) => acc + loan.interestRate, 0) / openLoans.length).toFixed(2) + '%'
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
