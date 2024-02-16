import { useEffect, useRef, useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Table } from './components/Table';
import { initialCryptoPrices } from './utils/api2';
import { APIS } from './utils/constants';
import {
  filterPricesByValue,
  isObjectEmpty,
  updateCryptoPrices,
} from './utils/helpers';
import './App.css';

function App() {
  const [cryptoPrices, setCryptoPrices] = useState(initialCryptoPrices);
  const [prices, setPrices] = useState({});
  const [value, setValue] = useState('');
  const [currentApi, setCurrentApi] = useState(APIS.WS_API);
  const interval = useRef();

  const filteredPrices = isObjectEmpty(prices)
    ? {}
    : filterPricesByValue(
        currentApi === APIS.WS_API ? prices : cryptoPrices,
        value
      );

  const toggleApi = () =>
    setCurrentApi((prevApi) =>
      prevApi === APIS.WS_API ? APIS.CRYPTO_API : APIS.WS_API
    );

  useEffect(() => {
    if (currentApi !== APIS.CRYPTO_API) {
      clearInterval(interval.current);
      return;
    }

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
  }, [cryptoPrices, currentApi]);

  useEffect(() => {
    const api = 'wss://wssx.gntapi.com:443';
    const ws = new WebSocket(api);

    if (currentApi !== APIS.WS_API) {
      ws.close();
      return;
    }

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
  }, [currentApi]);

  return isObjectEmpty(prices) ? (
    <p>Loading...</p>
  ) : (
    <main className="Main-container">
      <SearchBar
        value={value}
        setValue={setValue}
      />
      <button
        className="ApiToggle"
        type="button"
        onClick={toggleApi}
      >
        Change to {currentApi === APIS.WS_API ? 'Crypto Local' : 'WebSocket'}{' '}
        API
      </button>
      <Table prices={filteredPrices} />
    </main>
  );
}

export default App;
