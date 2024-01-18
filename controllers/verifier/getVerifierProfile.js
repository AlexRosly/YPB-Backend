const { VerifierProfile } = require("../../models");

const getVerifierProfile = async (req, res) => {
  // get verifier id
  const _id = req.admin;
  const id = req.superAdmin;
  const profileId = _id || id;

  const result = await VerifierProfile.find({ profileId });

  if (!result) {
    return res.json({
      status: "error",
      message: "verifier profile don't found",
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = getVerifierProfile;
