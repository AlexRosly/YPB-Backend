const { Currency } = require("../../models");
const { currency } = require("../../utils");

const getCurrency = async (req, res) => {
  const baseCurrency = "USD";
  //find currency from DB
  const getCurrency = await Currency.find();
  // time now
  const date = new Date().getTime();
  const getTimeInSeconds = Math.floor(date / 1000);

  //check if date > date from DB, we have been make next steps:
  //remove present currency from DB
  //make new request to Api services
  //add new rate to DB

  if (getTimeInSeconds > getCurrency[0].time_next_update_unix) {
    const deleteOldCurrency = await Currency.deleteOne({
      _id: getCurrency[0].id,
    });

    if (!deleteOldCurrency) {
      return res.status(404).json({
        message: "Exchange rate service is unavailable. You can try later",
        code: 404,
      });
    }

    const getNewCurrency = await currency(baseCurrency);

    if (!getNewCurrency) {
      return res.status(404).json({
        message: "Exchange rate service is unavailable. You can try later",
        code: 404,
      });
    }

    const addCurrency = await Currency.create({ ...getNewCurrency });

    return res.status(200).json(addCurrency[0]);
  } else {
    return res.status(200).json(getCurrency[0]);
  }
};

module.exports = getCurrency;
