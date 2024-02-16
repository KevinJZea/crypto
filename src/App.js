import { useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Table } from './components/Table';
import { filterPricesByValue, isObjectEmpty } from './utils/helpers';
import './App.css';

function App() {
  const [prices, setPrices] = useState({});
  const [value, setValue] = useState('');

  const filteredPrices = isObjectEmpty(prices)
    ? {}
    : filterPricesByValue(prices, value);

  useEffect(() => {
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
  }, []);

  return isObjectEmpty(prices) ? (
    <p>Loading...</p>
  ) : (
    <main className="Main-container">
      <SearchBar
        value={value}
        setValue={setValue}
      />
      <Table prices={filteredPrices} />
    </main>
  );
}

export default App;
