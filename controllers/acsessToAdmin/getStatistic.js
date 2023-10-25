const getStatistic = async (req, res) => {
  const fundsOnHotelierAccounts = 0;
  const bonusFundsOnHoteliersAccounts = 0;
  const refundsOfUnspentMoneyToHoteliers = 0;
  const grossHotelRevens = 0;
  const hoteliersPaidWithBonuses = 0;
  const hoteliersHavePaid = 0;

  res
    .json({
      status: "success",
      code: 200,
      data: {
        fundsOnHotelierAccounts,
        bonusFundsOnHoteliersAccounts,
        refundsOfUnspentMoneyToHoteliers,
        grossHotelRevens,
        hoteliersPaidWithBonuses,
        hoteliersHavePaid,
      },
    })
    .end();
};

module.exports = getStatistic;
