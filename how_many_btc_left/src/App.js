import { useEffect, useState } from 'react';

function App() {
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin')
      .then((response) => response.json())
      .then((json) => {
        setCoin(json);
        setLoading(false);
        return json;
      })
      .then((coin) => console.log(coin));
  }, []);

  return (
    <div>
      <h1>{loading ? '' : `${coin.name}`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <div>Max Supply: {coin.max_supply}</div>
          <div>Total Supply:{coin.total_supply}</div>
          <div>Left: {coin.max_supply - coin.total_supply}</div>
        </>
      )}
    </div>
  );
}

export default App;
