import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import finnHub from '../apis/finnHub';
import { StockChart } from '../components/StockChart';

const SECONDSINDAY = 60 * 60 * 24;

const formatData = (data) => {
  return data.t.map((item, idx) => {
    return {
      x: item * 1000,
      y: data.c[idx].toFixed(2),
    }
  });
}

export const StockDetailPage = () => {
  const { ticker } = useParams();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay = currentTime - SECONDSINDAY;

      if (date.getDay() === 6) {
        oneDay = currentTime - (2 * SECONDSINDAY);
      } else if (date.getDay() === 0) {
        oneDay = currentTime - (3 * SECONDSINDAY);
      } else {
        oneDay = currentTime - SECONDSINDAY;
      }

      const oneWeek = currentTime - 7 * SECONDSINDAY;
      const oneYear = currentTime - 365 * SECONDSINDAY;

      let responses;
      try {
        responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol: ticker,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            }
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol: ticker,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            }
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol: ticker,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            }
          })
        ]);

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })
      }
      catch (e) {
        console.log(e);
      }

      console.log(responses);
    }

    fetchData();
  }, [ticker]);

  return <div>
    {chartData && (
    <div>
      <StockChart chartData={chartData} ticker={ticker} />
    </div>)}
  </div>
}