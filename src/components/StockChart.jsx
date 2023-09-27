import Chart from "react-apexcharts";
import { useState } from 'react';

export const StockChart = ({ chartData, ticker }) => {
  const { day, week, year } = chartData;
  const [dateFormat, setDateFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "7d":
        return week;
      case "1y":
        return year;
      case "24h":
      default:
        return day;
    }
  }

  const graphColor = () => {
    const format = determineTimeFormat();
    const oldest = format[0].y;
    const newest = format[format.length - 1].y;
    return newest - oldest > 0 ? "#26C281" : "#ED3419";
  }

  const options = {
    colors: [graphColor()],
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
      labels: {
        datetimeUTC: false,
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      }
    }
  }

  const renderButtonSelect = (button) => {
    const classes = "btn m-1 ";
    if (button === dateFormat) {
      return classes + "btn-primary";
    } else {
      return classes + "btn-outline-primary";
    }
  }

  const series = [{
    name: ticker,
    data: determineTimeFormat()
  }]

  return <div className='mt-5 p-4 shadow-sm bg-white'>
    Test note

    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
    />
    <div>
      <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>24h</button>
      <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>7d</button>
      <button className={renderButtonSelect("1y")} onClick={() => setDateFormat("1y")}>1y</button>
    </div>
  </div>
}