import { createContext, useContext, useEffect, useState } from 'react';
  
const AppContext = createContext();

const AppProvider = (props) => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  useEffect(() => {
    localStorage.setItem("watchList", watchList)
  }, [watchList]);
  
  const addStock = stock => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock]);
    }
  }

  const deleteStock = stock => {
    setWatchList(watchlist.filter(item => {
      return item !== stock;
    }));
  }

  return <AppContext.Provider value={{ watchList, addStock }}>
    {props.children}
  </AppContext.Provider>
}

export { AppProvider, AppContext }