
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

const PortfolioSummary = () => {
  const portfolioData = {
    totalValue: 45250.50,
    dailyChange: 1254.20,
    dailyChangePercent: 2.85,
    holdings: [
      { symbol: 'BTC', amount: 0.75, value: 32150.00, change: 5.2 },
      { symbol: 'ETH', amount: 12.5, value: 8750.00, change: -2.1 },
      { symbol: 'ADA', amount: 2500, value: 3150.00, change: 8.7 },
      { symbol: 'SOL', amount: 15, value: 1200.50, change: 12.3 },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="trading-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                <p className="text-3xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">24h Change</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-green-500">
                    +${portfolioData.dailyChange.toLocaleString()}
                  </p>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-sm text-green-500">+{portfolioData.dailyChangePercent}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assets</p>
                <p className="text-3xl font-bold">{portfolioData.holdings.length}</p>
              </div>
              <PieChart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioData.holdings.map((holding) => (
              <div key={holding.symbol} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="font-bold text-black">{holding.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{holding.symbol}</p>
                    <p className="text-sm text-muted-foreground">{holding.amount} coins</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${holding.value.toLocaleString()}</p>
                  <div className="flex items-center justify-end space-x-1">
                    {holding.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={holding.change > 0 ? 'text-green-500' : 'text-red-500'}>
                      {holding.change > 0 ? '+' : ''}{holding.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummary;
