function maxProfit(prices: number[]): number {
  let maxProfit = 0;
  let buyPrice = prices[0];

  for (let i = 0; i < prices.length; i++) {
    if (prices[i + 1] === undefined || prices[i + 1] < prices[i]) {
      maxProfit += prices[i] - buyPrice;
      buyPrice = prices[i + 1];
    }
  }

  return maxProfit;
}
