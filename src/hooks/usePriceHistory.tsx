
import { useQuery } from '@tanstack/react-query';

interface PriceData {
  timestamp: number;
  price: number;
}

const fetchPriceHistory = async (coinId: string): Promise<PriceData[]> => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch price history');
  }
  
  const data = await response.json();
  return data.prices.map(([timestamp, price]: [number, number]) => ({
    timestamp,
    price,
  }));
};

export const usePriceHistory = (coinId: string) => {
  return useQuery({
    queryKey: ['priceHistory', coinId],
    queryFn: () => fetchPriceHistory(coinId),
    enabled: !!coinId,
  });
};
