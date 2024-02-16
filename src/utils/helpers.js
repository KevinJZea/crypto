export function filterPricesByValue(prices, value) {
  const filteredPrices = {};

  for (const key in prices) {
    if (prices.hasOwnProperty(key) && key.includes(value.toUpperCase()))
      filteredPrices[key] = prices[key];
  }

  return filteredPrices;
}

export const isObjectEmpty = (object) => Object.keys(object).length === 0;
