export function maxProfit(prices: number[]): number {
  let sellPrice = prices[prices.length - 1];
  let maxProfit = 0;

  for (let i = prices.length - 2; i >= 0; i--) {
    if (prices[i] >= sellPrice) {
      sellPrice = prices[i];
    } else {
      maxProfit = Math.max(maxProfit, sellPrice - prices[i]);
    }
  }

  return maxProfit;
}
