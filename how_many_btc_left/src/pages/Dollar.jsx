import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Dollar = () => {
  const [dollar, setDollar] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://www.econdb.com/api/series/GDEBTUS/?format=json')
        .then((response) => response.json())
        .then((json) => {
          setDollar(json);
          setLoading(false);
          return json;
        })
        .then((dollar) => console.log(dollar));
    };
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'United States - Monetary base',
      },
    },
  };
  const labels = [];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Monetary base',
        data: [],
        borderColor: 'rgb(133, 187, 101)',
        backgroundColor: 'rgba(133, 187, 101, 0.5)',
      },
    ],
  };

  if (!loading) {
    labels.push(...dollar.data.dates);
    data.datasets[0].data.push(...dollar.data.values);
  }
  return (
    <div>
      <p data-text="Dollar" style={{ color: '#85BB65', textAlign: 'center' }}>
        Dollar
      </p>
      <h2 style={{ fontSize: '40px', color: 'white', textAlign: 'center' }}>
        Max Supply :{' '}
        <span style={{ fontSize: '60px', color: 'white', textAlign: 'center' }}>
          ∞
        </span>
      </h2>
      <Line options={options} data={data} />
    </div>
  );
};

export default Dollar;
