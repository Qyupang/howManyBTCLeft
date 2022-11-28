import { useEffect, useState } from 'react';
import Loading from './Loading';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import './bitcoin.scss';

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
    font-size: 100px;
    color: #f3931b;
    margin-top: 50px;
  }
  h2 {
    font-size: 20px;
    margin-bottom: 8px;
  }
  h3 {
    font-size: 20px;
  }
  div {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const BitCoin = () => {
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  const currentDate = new Date();
  const startDate = new Date(2009, 0, 3);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
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
          setTimeout(() => setLoading(false), 1500);
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
        backgroundColor: ['#008F11', '#003B00'],
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

  const formatter = new Intl.NumberFormat('en');
  const formatter_compact = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'long',
  });

  return (
    <ChartContainer>
      <h1 data-text="Bitcoin">{loading ? '' : `${coin.name}`}</h1>
      {loading ? (
        // <strong>Loading...</strong>
        <Loading />
      ) : (
        <div className="chart-container">
          <div style={{ color: '#DD280A', fontSize: '40px' }}>
            Left : {formatter.format(coin.max_supply - coin.total_supply)}
          </div>
          <div style={{ color: '#00FF41' }}>
            Max Supply : {formatter.format(coin.max_supply)}
          </div>
          <div style={{ color: '#008F11', marginBottom: '30px' }}>
            Total Supply :{formatter.format(coin.total_supply)}
          </div>
          <h3>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h3>
          <Pie data={data} />
          <div style={{ marginTop: '1.25rem' }}>
            {formatter_compact.format(coin.total_supply)} /{' '}
            {formatter_compact.format(coin.max_supply)}
            {/* ({Math.round(100 - (coin.total_supply / coin.max_supply) * 100)} %) */}
          </div>
          <h2 style={{ color: '#00FF41' }}>
            start date : {startDate.toLocaleDateString('ko')}{' '}
          </h2>
          <h2 style={{ color: '#008F11', marginBottom: '20px' }}>
            current date : {currentDate.toLocaleDateString('ko')}
          </h2>
        </div>
      )}
    </ChartContainer>
  );
};

export default BitCoin;
