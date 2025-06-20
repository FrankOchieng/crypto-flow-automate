
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar, Clock, Target, Shield } from 'lucide-react';

const TradingPanel = () => {
  const [orderType, setOrderType] = useState('market');
  const [isScheduled, setIsScheduled] = useState(false);
  const [hasStopLoss, setHasStopLoss] = useState(false);
  const [hasAutoTarget, setHasAutoTarget] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Buy</TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Sell</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="pair">Trading Pair</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pair" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btc-usdt">BTC/USDT</SelectItem>
                    <SelectItem value="eth-usdt">ETH/USDT</SelectItem>
                    <SelectItem value="ada-usdt">ADA/USDT</SelectItem>
                    <SelectItem value="sol-usdt">SOL/USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="order-type">Order Type</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="stop-limit">Stop-Limit Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {orderType !== 'market' && (
                <div>
                  <Label htmlFor="price">Price (USDT)</Label>
                  <Input id="price" placeholder="0.00" type="number" />
                </div>
              )}

              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" placeholder="0.00" type="number" />
              </div>

              {/* Scheduled Trading */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Schedule Trade</p>
                    <p className="text-sm text-muted-foreground">Execute at specific time</p>
                  </div>
                </div>
                <Switch checked={isScheduled} onCheckedChange={setIsScheduled} />
              </div>

              {isScheduled && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
              )}

              {/* Auto Cash-Out */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Auto Cash-Out</p>
                    <p className="text-sm text-muted-foreground">Sell at profit target</p>
                  </div>
                </div>
                <Switch checked={hasAutoTarget} onCheckedChange={setHasAutoTarget} />
              </div>

              {hasAutoTarget && (
                <div>
                  <Label htmlFor="target">Target Profit (%)</Label>
                  <Input id="target" placeholder="10" type="number" />
                </div>
              )}

              {/* Stop Loss */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">Stop Loss</p>
                    <p className="text-sm text-muted-foreground">Limit potential losses</p>
                  </div>
                </div>
                <Switch checked={hasStopLoss} onCheckedChange={setHasStopLoss} />
              </div>

              {hasStopLoss && (
                <div>
                  <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                  <Input id="stop-loss" placeholder="5" type="number" />
                </div>
              )}

              <Button className="w-full bg-green-500 hover:bg-green-600">
                {isScheduled ? 'Schedule Buy Order' : 'Place Buy Order'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="sell-pair">Trading Pair</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pair" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btc-usdt">BTC/USDT</SelectItem>
                    <SelectItem value="eth-usdt">ETH/USDT</SelectItem>
                    <SelectItem value="ada-usdt">ADA/USDT</SelectItem>
                    <SelectItem value="sol-usdt">SOL/USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sell-amount">Amount</Label>
                <Input id="sell-amount" placeholder="0.00" type="number" />
              </div>

              <Button className="w-full bg-red-500 hover:bg-red-600">
                Place Sell Order
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TradingPanel;
