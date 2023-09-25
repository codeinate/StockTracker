import Chart from "react-apexcharts";

export const StockChart = ({ chartData, ticker }) => {
  const { day, week, year } = chartData;

  const options = {
    title: {
      text: ticker,
      align: "center",
      style: {
        fontSize: "24px"
      }
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: "datetime",
    },
  }

  const series = [{
    name: ticker,
    data: day
  }]

  return <div className='mt-5 p-4 shadow-sm bg-white'>
    Test note
    
    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
    />
  </div>
}