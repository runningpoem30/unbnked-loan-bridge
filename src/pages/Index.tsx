import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import WalletConnect from '@/components/WalletConnect';
import { useWallet } from '@/context/WalletContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Dashboard from '@/pages/Dashboard';

const Index = () => {
  const { isConnected } = useWallet();

  // If wallet is already connected, show dashboard
  if (isConnected) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Dashboard />
        </main>
        <Footer />
      </div>
    );
  }

  // Otherwise show landing page
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-unbnked-light py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-unbnked-blue leading-tight">
                  Decentralized Loans Powered by Blockchain
                </h1>
                <p className="text-lg text-gray-600">
                  Unbnked bridges the gap between lenders and borrowers, enabling secure and transparent loan transactions using Ethereum blockchain technology.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-unbnked-teal hover:bg-unbnked-teal/90">
                    <Link to="/dashboard">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="#how-it-works">Learn More</a>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-unbnked-blue to-unbnked-teal rounded-lg blur-md"></div>
                  <div className="relative bg-white p-6 rounded-lg shadow-xl">
                    <WalletConnect />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16" id="features">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-unbnked-dark mb-4">Key Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the future of lending with our blockchain-powered platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-unbnked-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-unbnked-teal"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 12h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                    <path d="M12 6v2"></path>
                    <path d="M12 16v2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct Peer-to-Peer Lending</h3>
                <p className="text-gray-600">
                  Connect directly with borrowers or lenders without intermediaries, reducing costs and increasing efficiency.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-unbnked-lightblue/10 rounded-lg flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-unbnked-lightblue"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="2" x2="22" y1="10" y2="10"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">MetaMask Integration</h3>
                <p className="text-gray-600">
                  Securely connect your MetaMask wallet to manage transactions with just a few clicks.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-unbnked-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-unbnked-orange"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                <p className="text-gray-600">
                  All loans are secured and recorded on the Ethereum blockchain, ensuring transparency and immutability.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-gradient-to-b from-white to-unbnked-light" id="how-it-works">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-unbnked-dark mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Getting started with Unbnked is simple and straightforward
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-unbnked-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
                <h3 className="text-lg font-semibold mb-2">Connect Wallet</h3>
                <p className="text-gray-600">
                  Link your MetaMask wallet to get started with Unbnked.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-unbnked-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
                <h3 className="text-lg font-semibold mb-2">Create Request or Offer</h3>
                <p className="text-gray-600">
                  Post your loan request as a borrower or create a loan offer as a lender.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-unbnked-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
                <h3 className="text-lg font-semibold mb-2">Connect & Transact</h3>
                <p className="text-gray-600">
                  Match with counterparties and execute loan transactions securely.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-unbnked-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">4</div>
                <h3 className="text-lg font-semibold mb-2">Manage Loans</h3>
                <p className="text-gray-600">
                  Track loan status and complete repayments through the dashboard.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-unbnked-teal hover:bg-unbnked-teal/90">
                <Link to="/dashboard">Start Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
