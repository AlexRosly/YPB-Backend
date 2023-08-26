const {
  Hotels,
  Hotelier,
  User,
  Agent,
  BookingOption,
  BookingOptionHs,
} = require("../../models");

const statistic = async (req, res) => {
  //find amount of objects winth status "on verification"
  const getHotels = await Hotels.find({ status: "on verification" });
  const objectOnVerification = getHotels.length;

  //find amount of objects witn status
  const getActiveHotels = await Hotels.find({ status: "active" });
  const activeObject = getActiveHotels.length;

  //find amount of user winth status "active"
  const getUser = await User.find({ status: "active" });
  const users = getUser.length;

  //find amount of user winth status "active"
  const getHoteliers = await Hotelier.find({ status: "active" });
  const hoteliers = getHoteliers.length;

  //find amount of user winth status "active"
  const getAgent = await Agent.find({ status: "active" });
  const agents = getAgent.length;

  // bookineg options in active objects
  const getBookingOption = await BookingOption.find();
  const getBookingOptionHs = await BookingOptionHs.find();
  const amountOfBookingOption =
    getBookingOption.length + getBookingOptionHs.length;

  res.json({
    result: {
      objectOnVerification,
      amount: {
        users,
        hoteliers,
        agents,
      },
      activeObject,
      amountOfBookingOption,
    },
  });
};

module.exports = statistic;
