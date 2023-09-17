const axios = require("axios");
const { EXCHANGE_RATE } = process.env;

const currency = async (baseCurrency) => {
  const url = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE}/latest/${baseCurrency}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log({ error });
    return "Exchange rate service is unavailable. You can try later";
  }
};

module.exports = currency;
