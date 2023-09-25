import Chart from 'react-apexcharts';

export const StockChart = ({ chartData, ticker }) => {
  const { day, week, year } = chartData;

  const options = {
    title: ticker,
    align: "center",
    style: {
      fontSize: "24px"
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: "datetime",
    }
  }

  const series = [{
    name: ticker,
    data: day
  }]

  return <div>
    <Chart

    />
  </div>
}