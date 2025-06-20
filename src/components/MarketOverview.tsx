
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useMarketData } from '@/hooks/useMarketData';

const MarketOverview = () => {
  const { data: marketData, isLoading, error, refetch } = useMarketData();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Market Overview
            <RefreshCw 
              className="h-5 w-5 cursor-pointer hover:text-primary" 
              onClick={() => refetch()}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500">
            Failed to load market data. Click refresh to try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Market Overview (Live Data)
          <RefreshCw 
            className={`h-5 w-5 cursor-pointer hover:text-primary ${isLoading ? 'animate-spin' : ''}`}
            onClick={() => refetch()}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div>
                    <div className="h-4 w-16 bg-muted rounded mb-1"></div>
                    <div className="h-3 w-20 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 w-20 bg-muted rounded mb-1"></div>
                  <div className="h-3 w-16 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {marketData?.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="font-bold text-black text-sm">{coin.symbol.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{coin.symbol.toUpperCase()}</p>
                    <p className="text-sm text-muted-foreground">{coin.name}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">${coin.current_price.toLocaleString()}</p>
                  <div className="flex items-center justify-end space-x-1">
                    {coin.price_change_percentage_24h > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
                
                <div className="text-right hidden md:block">
                  <p className="text-sm text-muted-foreground">Volume</p>
                  <p className="text-sm font-medium">${(coin.total_volume / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
