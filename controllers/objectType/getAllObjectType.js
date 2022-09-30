const { ObjectType } = require("../../models");

const getAllObjectType = async ({ query: { search } }, res) => {
  const object = await ObjectType.find({ langCode: search });

  res.json({
    status: "success",
    code: 200,
    data: {
      object,
    },
  });
};
module.exports = getAllObjectType;
