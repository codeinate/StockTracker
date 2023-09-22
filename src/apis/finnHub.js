import axios from 'axios';


//https://finnhub.io/api/v1/quote?symbol=AAPL&token=ck6v8v9r01qmp9pd88l0ck6v8v9r01qmp9pd88lg

export default axios.create({
  baseURL: `https://finnhub.io/api/v1`,

});