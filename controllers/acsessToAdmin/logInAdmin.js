const { Admin } = require("../../models");

const logInAdmin = async (req, res) => {
  const { email, secretCode } = req.body;

  console.log({ email });
  console.log({ secretCode });

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Email ${email} not found`,
    });
  }

  const date = new Date();

  if (secretCode !== admin.secretCode) {
    return res.status(435).json({
      status: "error",
      code: 435,
      message: "Code is wrong",
    });
  }

  if (admin.validCode < date) {
    return res.status(436).json({
      status: "error",
      code: 436,
      message: "Code is invalid",
    });
  }

  if (admin) {
    // const sessionID = req.sessionID;
    const { id } = admin;
    const isAuth = true;

    await Admin.findByIdAndUpdate(id, { isAuth });
    // await addToCash(`${sessionID}`, `${id}`);

    // res.cookie("_sid", sessionID, { signed: true }); //sessionID
    // res.cookie("user", id, { signed: true });
    // res.cookie("auth", true, { signed: true });

    // req.session.authenticated = true;
  }

  res.json({
    status: "success",
    code: 200,
  });
};

module.exports = logInAdmin;
