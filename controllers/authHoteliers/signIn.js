const { Hotelier } = require("../../models");
const jwt = require("jsonwebtoken");
// const { addToCash } = require("../../middlewares/authCacheService");
const { SECRET_KEY } = process.env;

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;

  const hotelier = await Hotelier.findOne({ email });

  const date = new Date();
  const { id, firstName, lastName, language, role } = hotelier;

  if (!hotelier) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Email ${email} not found`,
    });
  }

  if (secretCode !== hotelier.secretCode) {
    return res.status(435).json({
      status: "error",
      code: 435,
      message: "Code is wrong",
    });
  }

  if (hotelier.validCode < date) {
    return res.status(436).json({
      status: "error",
      code: 436,
      message: "Code is invalid",
    });
  }

  // if (hotelier) {
  //   const sessionID = req.sessionID;
  //   await addToCash(`${sessionID}`, `${id}`);

  //   res.cookie("_sid", `${sessionID}`, {
  //     signed: true,
  //     SameSite: "None",
  //     Secure: true,
  //   }); //sessionID
  //   res.cookie("user", `${id}`, {
  //     signed: true,
  //     SameSite: "None",
  //     Secure: true,
  //   });
  // const sid = `_sid=${sessionID}; samesite=none; httpOnly=true; path=/; secure`;
  // const user = `user=${id}; samesite=none; httpOnly=true; path=/; secure`;
  // // const auth = "auth=true; samesite=none; httpOnly=true; path=/; secure";
  // res.cookie("auth", "true", {
  //   signed: true,
  //   SameSite: "None",
  //   Secure: true,
  // });
  // req.session.authenticated = true;
  // res.setHeader("auth", auth);
  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     hotelier: {
  //       id,
  //       firstName,
  //       lastName,
  //       language,
  //       email,
  //     },
  //   },
  // });
  // }

  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
  await Hotelier.findByIdAndUpdate(id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      hotelier: {
        id,
        role,
        firstName,
        lastName,
        language,
        email,
        token,
      },
    },
  });
};

module.exports = signIn;
