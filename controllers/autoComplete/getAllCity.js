const { City } = require("../../models");
const district = require("./district");

const getAllCity = async ({ query: { language } }, res) => {
  //get all city by language code
  const cities = await City.find({
    langCode: language.toUpperCase(),
  }).populate({
    path: "state",
    populate: { path: "country" },
  });

  //if city not found return error
  if (!cities) {
    res
      .status(422)
      .json({
        status: "error",
        message: "doesn't get all cities",
      })
      .end();
  }

  const resultTemp = [];

  //create array of city
  for (const city of cities) {
    let tempObj = {};
    tempObj.id = city._id;
    tempObj.city = city.cityName;
    tempObj.state = city.state.stateName;
    tempObj.country = city.state.country?.country;
    resultTemp.push(tempObj);
  }

  //temporary decision for return 3 districts and city
  switch (language.toUpperCase()) {
    case "EN":
      res.status(200).json({
        status: "success",
        code: 200,
        result: [...resultTemp, ...district.EN],
      });
      res.end();
      break;
    case "RU":
      res.status(200).json({
        status: "success",
        code: 200,
        result: [...resultTemp, ...district.RU],
      });
      res.end();
      break;
    case "UA":
      res.status(200).json({
        status: "success",
        code: 200,
        result: [...resultTemp, ...district.UA],
      });
      res.end();
      break;
    case "PL":
      res.status(200).json({
        status: "success",
        code: 200,
        result: [...resultTemp, ...district.PL],
      });
      res.end();
      break;

    default:
      res
        .status(422)
        .json({
          status: "error",
          message: "doesn't get all cities and districts",
        })
        .end();
      break;
  }
  //when array is ready return response
  // res.status(200).json({
  //   status: "success",
  //   code: 200,
  //   result,
  // });
  // res.end();
};

module.exports = getAllCity;
