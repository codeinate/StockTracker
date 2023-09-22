import { useState, useEffect } from 'react';
import finnHub from "../apis/finnHub";

export const StockList = () => {
  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);
  const [stock, setStock] = useState();

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      const responses = [];
      try {
        const responses = await Promise.all(
          watchList.map((stockName) => {
            return finnHub.get("/quote", { 
              param: {
                symbol: stockName
              }
            });
          }));

console.log("responses", responses)
        
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.param.symbol
          }
          
        });

        console.log(data);

        if (isMounted) {
          setStock(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
    
    return () => (isMounted = false);
  }, []);

  console.log("stock", stock);
  
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
          stock.map(stockData => {
            return (
              <tr className="table-row" key={stockData.symbol}>
                <th>{stockData.symbol}</th>
                <th>{stockData.data.c}</th>
                <th>{stockData.data.d}</th>
                <th>{stockData.data.dp}</th>
                <th>{stockData.data.h}</th>
                <th>{stockData.data.l}</th>
                <th>{stockData.data.o}</th>
                <th>{stockData.data.pc}</th>
              </tr>
            )
          })
        }
      </tbody>
    </table>  
  </div>
}