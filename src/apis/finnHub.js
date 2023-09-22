import axios from 'axios';

const TOKEN = 'ck6v8v9r01qmp9pd88l0ck6v8v9r01qmp9pd88lg';

export default axios.create({
  baseURL: `https://finnhub.io/api/v1`,
  params: {
    token: TOKEN
  }
});