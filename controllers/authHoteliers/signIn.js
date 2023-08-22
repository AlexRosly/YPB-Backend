const { Hotelier } = require("../../models");
const { addToCash } = require("../../middlewares/authCacheService");

const signIn = async (req, res) => {
  const { email, secretCode } = req.body;
  // let user;
  // let auth;

  const hotelier = await Hotelier.findOne({ email });

  if (!hotelier) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: `Email ${email} not found`,
    });
  }

  const date = new Date();
  const { id, firstName, lastName, language } = hotelier;

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

  if (hotelier) {
    const sessionID = req.sessionID;
    // console.log({ sessionID });
    await addToCash(`${sessionID}`, `${id}`);

    // res.cookie("_sid", sessionID, {
    //   signed: true,
    //   SameSite: "None",
    //   Secure: true,
    // }); //sessionID
    // res.cookie("user", id, {
    //   signed: true,
    //   SameSite: "None",
    //   Secure: true,
    // });
    const sid = `_sid=${sessionID}; samesite=none; secure`;
    const user = `user=${id}; samesite=none; secure`;
    const auth = "auth=true; samesite=none; secure";
    // res.cookie("auth", true, {
    //   signed: true,
    //   SameSite: "None",
    //   Secure: true,
    // });
    // req.session.authenticated = true;
    // return user, auth;
    console.log({ sid });
    console.log({ user });
    console.log({ auth });

    res.setHeader("set-cookie", [sid, user, auth]);
    res.json({
      status: "success",
      code: 200,
      data: {
        hotelier: {
          id,
          firstName,
          lastName,
          language,
          email,
        },
      },
    });
  }

  // console.log({ user });
  // console.log({ auth });
  // res.setHeader("set-cookie", [user, auth]);
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
};

module.exports = signIn;
