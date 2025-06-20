
import { useQuery } from '@tanstack/react-query';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

const fetchMarketData = async (): Promise<CoinData[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch market data');
  }
  
  return response.json();
};

export const useMarketData = () => {
  return useQuery({
    queryKey: ['marketData'],
    queryFn: fetchMarketData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
