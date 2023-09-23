const { Currency } = require("../../models");
const { currency } = require("../../utils");

const getCurrency = async (req, res) => {
  const baseCurrency = "USD";
  //find currency from DB
  const getCurrency = await Currency.find();
  const currencies = getCurrency[0];

  // time now
  const date = new Date().getTime();
  const getTimeInSeconds = Math.floor(date / 1000);

  //function that delete all documents in DB

  const deleteCurrency = async () => {
    const result = await Currency.deleteMany({});
    return result;
  };

  //function that get new Exchange rate

  const getAviableCurrency = async (baseCurrency) => {
    const getNewCurrency = await currency(baseCurrency);
    return getNewCurrency;
  };

  //check in DB. If in DB wrong data. make new request in API and add data to DB

  if (!currencies.time_next_update_unix) {
    const deleteOldCurrency = await deleteCurrency();

    if (!deleteOldCurrency) {
      return res.status(404).json({
        message: "Oops something wrong. You can try later",
        code: 404,
      });
    }

    const getNewCurrency = await getAviableCurrency(baseCurrency);

    if (!getNewCurrency) {
      return res.status(404).json({
        message: "Exchange rate service is unavailable. You can try later",
        code: 404,
      });
    }

    await Currency.create({ ...getNewCurrency });
    const addCurrency = await Currency.find();
    return res.status(200).json(addCurrency[0]);
  }

  //check if date > date from DB, we have been make next steps:
  //remove present currency from DB
  //make new request to Api services
  //add new rate to DB

  if (getTimeInSeconds > currencies.time_next_update_unix) {
    const deleteOldCurrency = await deleteCurrency();

    if (!deleteOldCurrency) {
      return res.status(404).json({
        message: "Oops something wrong. You can try later",
        code: 404,
      });
    }

    const getNewCurrency = await getAviableCurrency(baseCurrency);

    if (!getNewCurrency) {
      return res.status(404).json({
        message: "Exchange rate service is unavailable. You can try later",
        code: 404,
      });
    }

    await Currency.create({ ...getNewCurrency });
    const addCurrency = await Currency.find();

    return res.status(200).json(addCurrency[0]);
  } else {
    return res.status(200).json(currencies);
  }
};

module.exports = getCurrency;
