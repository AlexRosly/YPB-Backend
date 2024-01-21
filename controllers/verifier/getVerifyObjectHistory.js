const { VerifyObjectHistory } = require("../../models");

const getVerifyObjectHistory = async (req, res) => {
  const _id = req.admin; // get id of verify
  const id = req.superAdmin; // get id of verify
  let verifierId;
  //get id for profileId (admin or super admin)
  if (_id) {
    verifierId = _id._id;
  } else {
    verifierId = id._id;
  }
  //find history by verifier id
  const result = await VerifyObjectHistory.find({ verifierId });
  //if history wasn't found return response
  if (!result) {
    return res
      .json({
        code: 404,
        status: "error",
        message: `We don't found history by verifier with id ${verifierId}`,
      })
      .end();
  }
  //response
  res
    .json({
      code: 200,
      status: "success",
      result,
    })
    .end();
};

module.exports = getVerifyObjectHistory;
