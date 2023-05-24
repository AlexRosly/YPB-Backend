const { Admin } = require("../../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const logInAdmin = async (req, res) => {
  const { email, secretCode } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    //throw new Unauthorized();
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Email ${email} not found`,
    });
  }

  const date = new Date();

  if (secretCode !== admin.secretCode) {
    //throw new Unauthorized("Code is wrong");

    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Code is wrong",
    });
  }

  if (admin.validCode < date) {
    //throw new Unauthorized("Code is wrong");

    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Code is invalid",
    });
  }

  if (admin) {
    const { id } = admin;
    const isAuth = true;
    const payload = {
      id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await Admin.findByIdAndUpdate(id, { token, isAuth });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  }
};

module.exports = logInAdmin;
