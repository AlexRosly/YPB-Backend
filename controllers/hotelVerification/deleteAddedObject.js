const { Hotels } = require("../../models");
const { NotFound } = require("http-errors");

const deleteAddedObject = async (req, res) => {
  const { id } = req.query; // get hotels id

  const findHotel = await Hotels.findByIdAndRemove(id);
  if (!findHotel) {
    throw new NotFound("Not found");
  }
  //return response if all deleted
  return res
    .json({
      code: 200,
      status: "success",
    })
    .end();
};

module.exports = deleteAddedObject;
