import { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const ChartContainer = styled.div`
  height: 100%;
  background-color: black;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: white;
  align-items: center;

  h1 {
    font-size: 150px;
    color: #f3931b;
  }
`;

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
      });
  }, []);

  // setInterval(() => {
  //   fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin')
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setCoin(json);
  //       setLoading(false);
  //       return json;
  //     })
  //     .then((coin) => console.log(coin));
  // }, 100000);

  const data = {
    color: 'white',
    labels: ['how many mined', 'how many left'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#91B20B', '#29360F'],
        borderColor: '#333',
      },
    ],
  };

  if (!loading) {
    data.datasets[0].data.push(
      coin.total_supply,
      coin.max_supply - coin.total_supply
    );
  }

  return (
    <ChartContainer>
      <h1>{loading ? '' : `${coin.name}`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div className="chart-container">
          <div>Max Supply: {coin.max_supply}</div>
          <div>Total Supply:{coin.total_supply}</div>
          <div style={{ marginBottom: '50px' }}>
            Left: {coin.max_supply - coin.total_supply}
          </div>
          <Pie data={data} />
        </div>
      )}
    </ChartContainer>
  );
}

export default App;
