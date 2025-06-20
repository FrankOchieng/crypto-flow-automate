
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Brain, Target } from 'lucide-react';
import { usePriceHistory } from '@/hooks/usePriceHistory';

const PricePrediction = () => {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const { data: priceHistory, isLoading } = usePriceHistory(selectedCoin);

  const coins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
  ];

  // Simple prediction algorithm based on moving averages and trend analysis
  const prediction = useMemo(() => {
    if (!priceHistory || priceHistory.length < 10) return null;

    const prices = priceHistory.map(p => p.price);
    const recent = prices.slice(-10);
    const older = prices.slice(-20, -10);

    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
    
    const trend = recentAvg > olderAvg ? 'bullish' : 'bearish';
    const trendStrength = Math.abs((recentAvg - olderAvg) / olderAvg) * 100;
    
    // Simple price prediction (this is a basic example - real predictions need ML models)
    const currentPrice = prices[prices.length - 1];
    const volatility = Math.sqrt(recent.reduce((sum, price) => sum + Math.pow(price - recentAvg, 2), 0) / recent.length);
    
    const predictedChange = trend === 'bullish' ? 
      Math.min(trendStrength * 0.3, 15) : 
      Math.max(-trendStrength * 0.3, -15);
    
    const predicted24h = currentPrice * (1 + predictedChange / 100);
    const predicted7d = currentPrice * (1 + (predictedChange * 3) / 100);

    return {
      trend,
      trendStrength: trendStrength.toFixed(2),
      currentPrice,
      predicted24h,
      predicted7d,
      confidence: Math.max(30, 100 - volatility / currentPrice * 10000).toFixed(0),
      volatility: (volatility / currentPrice * 100).toFixed(2)
    };
  }, [priceHistory]);

  const chartData = useMemo(() => {
    if (!priceHistory) return [];
    
    return priceHistory.slice(-50).map(point => ({
      time: new Date(point.timestamp).toLocaleDateString(),
      price: point.price.toFixed(2),
    }));
  }, [priceHistory]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary" />
          <span>AI Price Prediction</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Select value={selectedCoin} onValueChange={setSelectedCoin}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {coins.map(coin => (
                <SelectItem key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Analyzing market data...</p>
          </div>
        ) : prediction ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-2xl font-bold">${prediction.currentPrice.toFixed(2)}</p>
                  </div>
                  <div className={`flex items-center space-x-1 ${prediction.trend === 'bullish' ? 'text-green-500' : 'text-red-500'}`}>
                    {prediction.trend === 'bullish' ? 
                      <TrendingUp className="h-5 w-5" /> : 
                      <TrendingDown className="h-5 w-5" />
                    }
                    <span className="font-medium">{prediction.trend}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Prediction Confidence</p>
                    <p className="text-2xl font-bold">{prediction.confidence}%</p>
                  </div>
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">Price Predictions</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">24h Prediction</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-bold">${prediction.predicted24h.toFixed(2)}</p>
                      <span className={`text-sm ${prediction.predicted24h > prediction.currentPrice ? 'text-green-500' : 'text-red-500'}`}>
                        ({((prediction.predicted24h - prediction.currentPrice) / prediction.currentPrice * 100).toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">7d Prediction</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-bold">${prediction.predicted7d.toFixed(2)}</p>
                      <span className={`text-sm ${prediction.predicted7d > prediction.currentPrice ? 'text-green-500' : 'text-red-500'}`}>
                        ({((prediction.predicted7d - prediction.currentPrice) / prediction.currentPrice * 100).toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">Technical Analysis</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Trend Strength</p>
                    <p className="font-medium">{prediction.trendStrength}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Volatility</p>
                    <p className="font-medium">{prediction.volatility}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64">
              <h4 className="font-semibold mb-3">Price Chart (7 Days)</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="text-xs text-muted-foreground text-center p-2 bg-muted/20 rounded">
              ⚠️ This is a simplified prediction model for demonstration. Real trading requires professional analysis and carries significant risk.
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Unable to generate prediction. Please try again later.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricePrediction;
