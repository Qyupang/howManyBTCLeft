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
  font-weight: 600;

  h1 {
    font-size: 150px;
    color: #f3931b;
  }
`;

function App() {
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          // clearInterval(countdown);
          setMinutes(10);
          setSeconds(0);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin')
        .then((response) => response.json())
        .then((json) => {
          setCoin(json);
          setLoading(false);
          return json;
        })
        .then((coin) => console.log(coin));
    };
    fetchData();

    setInterval(fetchData, 600000);
  }, []);

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
          <h3>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h3>
          <Pie data={data} />
          <div>
            {coin.total_supply} / {coin.max_supply}(
            {Math.round(100 - (coin.total_supply / coin.max_supply) * 100)} %)
          </div>
        </div>
      )}
    </ChartContainer>
  );
}

export default App;
