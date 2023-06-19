const { Hotels } = require("../../models");
const { NotFound } = require("http-errors");

const addPhoneAndDateVerification = async (req, res) => {
  const { id } = req.params;
  const { verification } = req.body;

  const findObject = await Hotels.findByIdAndUpdate(
    id,
    {
      verification: {
        phone1: verification.phone1,
        phone2: verification.phone2,
        nextVerificationDate: verification.nextVerificationDate,
      },
    },
    {
      new: true,
    }
  );

  if (!findObject) {
    throw new NotFound("Not found");
  }

  const result = await Hotels.findById(id);

  if (!result) {
    throw new NotFound("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = addPhoneAndDateVerification;
