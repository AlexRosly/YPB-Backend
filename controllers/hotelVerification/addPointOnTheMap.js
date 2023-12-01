const { Verification } = require("../../models");

const addPointOnTheMap = async (req, res) => {
  const { id, pointOnTheMap } = req.body; // get id and point on the mpe from request
  //update verification  object
  const result = await Verification.findByIdAndUpdate(
    id,
    { pointOnTheMap },
    {
      new: true,
    }
  );
  //if error return response
  if (!result) {
    return res.json({
      code: 404,
      status: "error",
      message: "point on the map wasn't added, try again later",
    });
  }
  //return response
  res.json({
    code: 201,
    status: "success",
    result,
  });
};

module.exports = addPointOnTheMap;
