import React, { useEffect, useState } from 'react';
import './dollar.scss';

const Dollar = () => {
  const [dollar, setDollar] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        'https://api.stlouisfed.org/fred/series?series_id=WM1NS&realtime_start=1975-01-06&realtime_end=2022-11-28&api_key=process.env.REACT_APP_FED_API_KEY&file_type=json'
      ).then((response) => {
        setDollar(response);
        setLoading(false);
      });
    };
    fetchData();
  }, []);
  return (
    <div>
      <p data-text="Dollar">Dollar</p>
    </div>
  );
};

export default Dollar;
