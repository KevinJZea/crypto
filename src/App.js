import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const api = 'wss://wssx.gntapi.com:443';
    const ws = new WebSocket(api);

    const handleWsOpen = () => ws.send('prices');
    const handleWsMessage = (pricesData) => {
      const pricesJson = JSON.parse(pricesData.data);
      console.log({ prices: pricesJson.prices });
      setPrices(pricesJson.prices);
    };

    ws.addEventListener('open', handleWsOpen);
    ws.addEventListener('message', handleWsMessage);

    return () => {
      ws.removeEventListener('open', handleWsOpen);
      ws.removeEventListener('message', handleWsMessage);
      ws.close();
    };
  }, []);

  return Object.keys(prices).length === 0 ? (
    <p>Loading...</p>
  ) : (
    <div>
      {Object.entries(prices).map((crypto) => (
        <p key={crypto[0]}>
          <span>{`${crypto[0]} | bid: ${crypto[1].bid} - ask: ${crypto[1].ask}`}</span>
        </p>
      ))}
    </div>
  );
}

export default App;
