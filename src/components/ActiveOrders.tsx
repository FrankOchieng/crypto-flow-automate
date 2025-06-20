
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, Shield, X } from 'lucide-react';

const ActiveOrders = () => {
  const orders = [
    {
      id: '1',
      type: 'Buy',
      pair: 'BTC/USDT',
      amount: 0.1,
      price: 40000,
      status: 'Scheduled',
      scheduled: '2024-06-21 09:00',
      stopLoss: 38000,
      target: 45000,
    },
    {
      id: '2',
      type: 'Sell',
      pair: 'ETH/USDT',
      amount: 2.5,
      price: 2800,
      status: 'Active',
      stopLoss: 2600,
      target: null,
    },
    {
      id: '3',
      type: 'Buy',
      pair: 'ADA/USDT',
      amount: 1000,
      price: 1.20,
      status: 'Pending',
      scheduled: null,
      stopLoss: null,
      target: 1.35,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Scheduled':
        return 'bg-blue-500';
      case 'Pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={`${order.type === 'Buy' ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}>
                    {order.type}
                  </Badge>
                  <span className="font-semibold">{order.pair}</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">{order.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Price</p>
                  <p className="font-medium">${order.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="font-medium">${(order.amount * order.price).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium">{order.status}</p>
                </div>
              </div>

              {(order.scheduled || order.stopLoss || order.target) && (
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  {order.scheduled && (
                    <div className="flex items-center space-x-1 text-sm text-blue-500">
                      <Calendar className="h-4 w-4" />
                      <span>{order.scheduled}</span>
                    </div>
                  )}
                  {order.stopLoss && (
                    <div className="flex items-center space-x-1 text-sm text-red-500">
                      <Shield className="h-4 w-4" />
                      <span>Stop: ${order.stopLoss}</span>
                    </div>
                  )}
                  {order.target && (
                    <div className="flex items-center space-x-1 text-sm text-green-500">
                      <Target className="h-4 w-4" />
                      <span>Target: ${order.target}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveOrders;
