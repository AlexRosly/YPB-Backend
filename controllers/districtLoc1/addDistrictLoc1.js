const { District, City, Region } = require("../../models");
const { NotImplemented } = require("http-errors");

const addDistrictLoc1 = async (req, res) => {
  const { cityId, cityInternational, districtInternational } = req.body;
  const distric = await District.create({ ...req.body, city: cityId });

  if (!distric) {
    throw new NotImplemented("district doesn`t create");
  }
  const city = await City.updateOne(
    { _id: cityId },
    { $push: { districts: distric._id } }
  );

  const makeCopyDistricts = async (cityInternational, cityId) => {
    const cities = await City.find({ cityInternational });

    for (const city of cities) {
      if (city._id != cityId) {
        const newDistrict = await District.create({
          ...req.body,
          dbLangCode: city.dbLangCode,
          cityId: city._id,
        });
        if (!newDistrict) {
          throw new NotImplemented("district don`t created");
        }
        addDistrictToCity(cityInternational);
      }
    }
  };

  makeCopyDistricts(cityInternational, cityId);

  const addDistrictToCity = async (cityInternational) => {
    const copyOfCities = await City.find({ cityInternational });
    const cities = JSON.parse(JSON.stringify(copyOfCities));

    const copyOfDistricts = await District.find({ districtInternational });
    const districts = JSON.parse(JSON.stringify(copyOfDistricts));
    for (const city of cities) {
      for (const district of districts) {
        if (city._id === district.cityId) {
          const addToCity = await City.updateOne(
            { _id: city._id },
            { $addToSet: { districts: district._id } }
          );
        }
      }
    }
  };

  res.status(201).json({
    status: "success",
    message: "district created and added to all languages",
    code: 201,
    data: {
      distric,
    },
  });
};

module.exports = addDistrictLoc1;
