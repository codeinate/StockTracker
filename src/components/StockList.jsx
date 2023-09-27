
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { AppProvider, AppContext } from '../context/AppContext';

export const StockList = () => {
  const { watchList, deleteStock } = useContext(AppContext);
  const [stock, setStock] = useState();
  const navigate = useNavigate();

  const valueColor = value => {
    return value > 0 ? "success" : "danger";
  }

  const renderIcon = (value) => {
    return value > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
  }

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {

      try {
        const responses = await Promise.all(watchList.map((stock) => {
          return finnHub.get("/quote", {
            params: {
              symbol: stock
            }
          })
        }))

        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol
          }

        })
        console.log(data)
        if (isMounted) {
          setStock(data)
        }

      } catch (err) {

      }
    }
    fetchData()
    return () => (isMounted = false);
  }, [watchList]);

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  }

  return <div>
    <table className="table hover mt-5">
      <thead className="tableHeadColor" >
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Last</th>
          <th scope="col">Chg</th>
          <th scope="col">Chg%</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
          <th scope="col">Open</th>
          <th scope="col">Pclose</th>
        </tr>
      </thead>
      <tbody>
        {
          stock?.map(stockData => {
            return (
              <tr className="table-row cursorPointer" key={stockData.symbol} onClick={() => handleStockSelect(stockData.symbol)}>
                <th>{stockData.symbol}</th>
                <td >{stockData.data.c.toFixed(2)}</td>
                <td className={`text-${valueColor(stockData.data.d)}`}>{stockData.data.d.toFixed(2)}{renderIcon(stockData.data.d)}</td>
                <td className={`text-${valueColor(stockData.data.dp)}`}>{stockData.data.dp.toFixed(2)}{renderIcon(stockData.data.td)}</td>
                <td>{stockData.data.h.toFixed(2)}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc.toFixed(2)} <button className="btn btn-danger btn-sm ml-3 d-inline-block delete-button" onClick={(e) => {
                  e.stopPropagation();
                  deleteStock(stockData.symbol)
                }}>Remove</button></td>
              </tr>
            )
          })}
      </tbody>
    </table>
  </div>
}