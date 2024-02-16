import { useEffect, useRef, useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Table } from './components/Table';
import { initialCryptoPrices } from './utils/api2';
import {
  filterPricesByValue,
  isObjectEmpty,
  updateCryptoPrices,
} from './utils/helpers';
import './App.css';

function App() {
  const [prices, setPrices] = useState({});
  const [value, setValue] = useState('');
  const [cryptoPrices, setCryptoPrices] = useState(initialCryptoPrices);
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      const updatedCryptoPrices = updateCryptoPrices(cryptoPrices);
      setCryptoPrices((prevState) => ({
        ...prevState,
        ...updatedCryptoPrices,
      }));
    }, 3000);

    return () => {
      clearInterval(interval.current);
    };
  }, [cryptoPrices]);

  const filteredPrices = isObjectEmpty(prices)
    ? {}
    : filterPricesByValue(prices, value);
  const filteredCryptoPrices = filterPricesByValue(cryptoPrices, value);

  /* useEffect(() => {
    const api = 'wss://wssx.gntapi.com:443';
    const ws = new WebSocket(api);

    const handleWsOpen = () => ws.send('prices');
    const handleWsMessage = ({ data }) => {
      const pricesData = JSON.parse(data);
      setPrices(pricesData.prices);
    };

    ws.addEventListener('open', handleWsOpen);
    ws.addEventListener('message', handleWsMessage);

    return () => {
      ws.removeEventListener('open', handleWsOpen);
      ws.removeEventListener('message', handleWsMessage);
      ws.close();
    };
  }, []); */

  return isObjectEmpty(cryptoPrices) ? (
    <p>Loading...</p>
  ) : (
    <main className="Main-container">
      <SearchBar
        value={value}
        setValue={setValue}
      />
      <Table prices={filteredCryptoPrices} />
    </main>
  );
}

export default App;
