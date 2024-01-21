const { VerifierProfile } = require("../../models");

const getVerifierProfile = async (req, res) => {
  // get verifier id
  const _id = req.admin;
  const id = req.superAdmin;
  let verifierId;

  //get id for verifierId (admin or super admin)
  if (_id) {
    verifierId = _id._id;
  } else {
    verifierId = id._id;
  }

  const result = await VerifierProfile.find({ verifierId });

  if (!result) {
    return res
      .json({
        code: 404,
        status: "error",
        message: "verifier profile don't found",
      })
      .end();
  }

  res
    .status(200)
    .json({
      status: "success",
      code: 200,
      result,
    })
    .end();
};

module.exports = getVerifierProfile;
