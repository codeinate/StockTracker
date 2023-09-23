import axios from 'axios';

// don't look at this, shh
const token = "awerawfasdfasdfsdf45as56ewfv1we5fa6sertevbdv"

export default axios.create({
  baseURL: `https://finnhub.io/api/v1`,
  params: {
    token: token
  }
});

