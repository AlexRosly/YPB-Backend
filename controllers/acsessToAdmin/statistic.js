const {
  Hotels,
  Hotelier,
  User,
  Agent,
  BookingOption,
  BookingOptionHs,
} = require("../../models");

const statistic = async (req, res) => {
  //find amount of objects
  const getHotels = await Hotels.find({});
  const amountOfObject = getHotels.length;

  //find amount of user
  const getUser = await User.find({});
  const users = getUser.length;

  //find amount of user
  const getHoteliers = await Hotelier.find({});
  const hoteliers = getHoteliers.length;

  //find amount of user winth status "active"
  const getAgent = await Agent.find({});
  const agents = getAgent.length;

  // bookineg options in active objects
  const getBookingOption = await BookingOption.find();
  const getBookingOptionHs = await BookingOptionHs.find();
  const amountOfBookingOption =
    getBookingOption.length + getBookingOptionHs.length;

  if (
    !amountOfObject &&
    !users &&
    !hoteliers &&
    !agents &&
    !amountOfBookingOption
  ) {
    return res.json({
      code: 404,
      message: "error",
    });
  }

  res.json({
    result: {
      amountOfObject,
      amount: {
        users,
        hoteliers,
        agents,
      },
      amountOfBookingOption,
    },
  });
};

module.exports = statistic;
