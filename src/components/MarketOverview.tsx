
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketOverview = () => {
  const marketData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 42860.50, change: 5.2, volume: '2.4B' },
    { symbol: 'ETH', name: 'Ethereum', price: 2750.25, change: -2.1, volume: '1.8B' },
    { symbol: 'ADA', name: 'Cardano', price: 1.26, change: 8.7, volume: '890M' },
    { symbol: 'SOL', name: 'Solana', price: 80.15, change: 12.3, volume: '650M' },
    { symbol: 'DOT', name: 'Polkadot', price: 22.80, change: -1.5, volume: '420M' },
    { symbol: 'AVAX', name: 'Avalanche', price: 35.60, change: 6.8, volume: '380M' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketData.map((coin) => (
            <div key={coin.symbol} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="font-bold text-black text-sm">{coin.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <p className="font-semibold">{coin.symbol}</p>
                  <p className="text-sm text-muted-foreground">{coin.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">${coin.price.toLocaleString()}</p>
                <div className="flex items-center justify-end space-x-1">
                  {coin.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm ${coin.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.change > 0 ? '+' : ''}{coin.change}%
                  </span>
                </div>
              </div>
              
              <div className="text-right hidden md:block">
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="text-sm font-medium">${coin.volume}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
