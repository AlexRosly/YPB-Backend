const { VerifyObjectHistory, Hotels } = require("../../models");

const objectOnWork = async (req, res) => {
  const { hotels, objectName } = req.body;
  const _id = req.admin; // get id of verify
  const id = req.superAdmin; // get id of verify
  let verifierId;

  //get id for profileId (admin or super admin)
  if (_id) {
    verifierId = _id._id;
  } else {
    verifierId = id._id;
  }

  const getToVerify = new Date(); // get current date

  //if get mistake return error
  let history;
  let hotel;

  // create history
  try {
    history = await VerifyObjectHistory.create({
      hotels,
      objectName,
      verifierId,
      getToVerify,
    });

    hotel = await Hotels.findByIdAndUpdate(
      { _id: hotels },
      { status: "in working", verifierId },
      {
        new: true,
      }
    );
  } catch (error) {
    return res
      .json({
        code: 404,
        status: "error",
        message: "object not assigned for verifier",
      })
      .end();
  }

  res
    .json({
      code: 201,
      status: "success",
      message: `verifier with id ${verifierId} take object with id ${hotels}`,
    })
    .end();
};

module.exports = objectOnWork;
