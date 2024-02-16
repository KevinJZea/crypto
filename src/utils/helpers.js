export function filterPricesByValue(prices, value) {
  const filteredPrices = {};

  for (const key in prices) {
    if (prices.hasOwnProperty(key) && key.includes(value.toUpperCase()))
      filteredPrices[key] = prices[key];
  }

  return filteredPrices;
}

export const isObjectEmpty = (object) => Object.keys(object).length === 0;

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const updateCryptoPrices = (cryptoPrices) => {
  const cryptos = Object.keys(cryptoPrices);

  const selectedCryptos = [];

  while (selectedCryptos.length < 7) {
    const randomIndex = Math.floor(Math.random() * cryptos.length);
    const selectedCrypto = cryptos[randomIndex];

    if (!selectedCryptos.includes(selectedCrypto)) {
      selectedCryptos.push(selectedCrypto);
    }
  }

  const updatedCryptoPrices = { ...cryptoPrices };

  for (const crypto of selectedCryptos) {
    const { bid, ask } = cryptoPrices[crypto];

    const randomChange = parseFloat((getRandomInt(-5, 5) * 0.0001).toFixed(4));

    updatedCryptoPrices[crypto] = {
      bid: (parseFloat(bid) + randomChange).toFixed(4),
      ask: (parseFloat(ask) + randomChange).toFixed(4),
    };
  }

  return updatedCryptoPrices;
};
