const { ObjectType } = require("../../models");
const { NotImplemented } = require("http-errors");

const addObjectType = async (req, res) => {
  const object = await ObjectType.create({ ...req.body });

  if (!object) {
    throw new NotImplemented("object doesn`t create");
  }

  res.status(201).json({
    status: "success",
    message: "object created",
    code: 201,
    data: {
      object,
    },
  });
};

module.exports = addObjectType;
