const { District, City } = require("../../models");

const insertMany = async (req, res) => {
  const { districtName, cityId, cityInternational } = req.body;
  const districtString = districtName;
  const districtArray = districtString.split("; ");

  const createObject = async (districtArray) => {
    for (let i = 0; i < districtArray.length; i++) {
      const district = await District.create({
        ...req.body,
        districtName: districtArray[i],
        districtInternational: districtArray[i],
        districtCode: districtArray[i].slice(0, 4).toUpperCase(),
        districtPhotoAlt: `${districtArray[i]}, New York (NYC), New York State, USA`,
      });
    }
  };

  createObject(districtArray);

  const makeCopyId = async () => {
    const getAllDistrictLoc1 = await District.find({
      cityId,
      cityInternational,
    });
    const districts = JSON.parse(JSON.stringify(getAllDistrictLoc1));

    const getCity = await City.find({ _id: cityId });
    const cities = JSON.parse(JSON.stringify(getCity));

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
  setTimeout(() => {
    makeCopyId();
  }, 30000);

  res.status(201).json({
    status: "success",
    message: "district created and added to all languages",
    code: 201,
    data: {},
  });
};
module.exports = insertMany;
