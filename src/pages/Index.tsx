
import React from 'react';
import Header from '@/components/Header';
import PortfolioSummary from '@/components/PortfolioSummary';
import MarketOverview from '@/components/MarketOverview';
import TradingPanel from '@/components/TradingPanel';
import ActiveOrders from '@/components/ActiveOrders';
import PricePrediction from '@/components/PricePrediction';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Portfolio & Market */}
          <div className="xl:col-span-2 space-y-6">
            <PortfolioSummary />
            <MarketOverview />
            <PricePrediction />
          </div>
          
          {/* Right Column - Trading */}
          <div className="space-y-6">
            <TradingPanel />
            <ActiveOrders />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
