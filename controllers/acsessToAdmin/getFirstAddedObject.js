const { Hotels } = require("../../models");

const getFirstAddedObject = async (req, res) => {
  const { country } = req.query;
  const result = await Hotels.find(
    {
      status: "added",
      "location.international": country,
    },
    { id: 1, type: 1, objectName: 1, photos: 1, address: 1, location: 1 }
  ).sort({
    createdAt: 1,
  });

  if (!result) {
    return res.json({
      code: 404,
      status: "error",
    });
  }

  res.json({
    code: 200,
    status: "success",
    result,
  });
};

module.exports = getFirstAddedObject;
