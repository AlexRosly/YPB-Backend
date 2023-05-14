const { AcsessToAdmin } = require("../../models");

const addNewEmail = async (req, res) => {
  const { email, access } = req.body;
  console.log({ email });
  console.log({ access });

  const findEmail = await AcsessToAdmin.findOne({ email });
  console.log({ findEmail });

  if (findEmail) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "This email already exist in DB",
    });
  }

  const addEmail = await AcsessToAdmin.create({ email, access });
  console.log({ addEmail });

  res.status(201).json({
    status: "success",
    // isAdded: true,
    message: `email ${email} added to DB`,
    code: 201,
    // data: {
    //   uaPages,
    // },
  });
};

module.exports = addNewEmail;
