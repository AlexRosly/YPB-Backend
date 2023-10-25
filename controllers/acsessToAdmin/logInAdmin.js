const { Admin } = require("../../models");
const { AcsessToAdmin } = require("../../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const logInAdmin = async (req, res) => {
  //get email and code from request
  const { email, secretCode } = req.body;

  //find super admin and admin in DB
  const admin = await Admin.findOne({ email });
  const users = await AcsessToAdmin.findOne({ email });

  //check email in DB, if not found return response 409
  if (!admin && !users) {
    //throw new Unauthorized();
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Email ${email} not found`,
    });
  }

  const date = new Date();

  //if login super admin
  if (admin) {
    //check secret code, if wrong response 409
    if (secretCode !== admin.secretCode) {
      //throw new Unauthorized("Code is wrong");

      return res
        .status(409)
        .json({
          status: "error",
          code: 409,
          message: "Code is wrong",
        })
        .end();
    }

    //check valid code, if invalid response 409
    if (admin.validCode < date) {
      //throw new Unauthorized("Code is wrong");

      return res
        .status(409)
        .json({
          status: "error",
          code: 409,
          message: "Code is invalid",
        })
        .end();
    }

    //if code valid and secret code true, return token, update in DB and return response
    const { id } = admin;
    const payload = {
      id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await Admin.findByIdAndUpdate(id, { token });
    const result = await Admin.findById(id, { _id: 1, role: 1, token: 1 });

    res
      .json({
        status: "success",
        code: 200,
        result,
      })
      .end();
  }

  //if login admin
  if (users) {
    //check secret code, if wrong response 409
    if (secretCode !== users.secretCode) {
      //throw new Unauthorized("Code is wrong");

      return res
        .status(409)
        .json({
          status: "error",
          code: 409,
          message: "Code is wrong",
        })
        .end();
    }

    //check valid code, if invalid response 409
    if (users.validCode < date) {
      //throw new Unauthorized("Code is wrong");

      return res
        .status(409)
        .json({
          status: "error",
          code: 409,
          message: "Code is invalid",
        })
        .end();
    }

    //if code valid and secret code true, return token, update in DB and return response
    const { id } = users;
    const payload = {
      id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await AcsessToAdmin.findByIdAndUpdate(id, { token });
    const user = await AcsessToAdmin.findById(id, {
      _id: 1,
      role: 1,
      access: 1,
      status: 1,
      token: 1,
    });

    res
      .json({
        status: "success",
        code: 200,
        user,
      })
      .end();
  }

  // if (secretCode !== admin.secretCode) {
  //   //throw new Unauthorized("Code is wrong");

  //   return res.status(409).json({
  //     status: "error",
  //     code: 409,
  //     message: "Code is wrong",
  //   });
  // }

  // console.log("work");
  // if (admin.validCode < date) {
  //   //throw new Unauthorized("Code is wrong");

  //   return res.status(409).json({
  //     status: "error",
  //     code: 409,
  //     message: "Code is invalid",
  //   });
  // }

  // if (admin) {
  //   const { id } = admin;
  //   const isAuth = true;
  //   const payload = {
  //     id,
  //   };
  //   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  //   await Admin.findByIdAndUpdate(id, { token, isAuth });

  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: {
  //       token,
  //     },
  //   });
  // }
};

module.exports = logInAdmin;
