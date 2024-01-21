const { Hotels, Verification, VerifyObjectHistory } = require("../../models");

const finishVerification = async (req, res) => {
  const {
    id,
    phone1 = "without",
    phone2 = "without",
    nextVerificationDate = "not required",
  } = req.body;

  const adminId = req.admin; // get id of verify
  const superAdminId = req.superAdmin; // get id of verify
  let verifierId;

  //get id for profileId (admin or super admin)
  if (adminId) {
    verifierId = adminId._id;
  } else {
    verifierId = superAdminId._id;
  }

  let result = []; //create array for response

  // update Verification documents
  const filter = { hotels: id };
  const update = { phone1, phone2, nextVerificationDate };
  const updateDocument = await Verification.findOneAndUpdate(filter, update, {
    new: true,
  });
  // if wasn't updated return response
  if (!updateDocument) {
    return res.json({
      code: 404,
      status: "error",
      message: "Document wasn't updated",
    });
  }

  //update status for hotel
  const changeStatus = await Hotels.findByIdAndUpdate(
    id,
    { status: "active" },
    {
      new: true,
    }
  );
  // if wasn't updated return response
  if (!changeStatus) {
    return res.json({
      code: 404,
      status: "error",
      message: "Status hasn't changed",
    });
  }
  //get updated document
  const getUpdatedDocument = await Verification.find(
    { hotels: id },
    { phone1: 1, phone2: 1, nextVerificationDate: 1, _id: 0 }
  );
  //if don't updated return response
  if (!getUpdatedDocument) {
    return res.json({
      code: 404,
      status: "error",
      message: "Try update later",
    });
  }

  //change statys on history
  const dateOfDecision = new Date();
  const filter1 = { hotels: id };
  const update1 = { decision: "verify", dateOfDecision };
  const objectHistory = await VerifyObjectHistory.findOneAndUpdate(
    filter1,
    update1,
    {
      new: true,
    }
  );
  console.log({ objectHistory });
  //get updated hotel
  const getUpdatedHotel = await Hotels.find({ _id: id }, { status: 1 });
  //if don't updated return response
  if (!getUpdatedHotel) {
    return res.json({
      code: 404,
      status: "error",
      message: "Try update later",
    });
  }

  result = [...getUpdatedHotel, ...getUpdatedDocument];
  res.json({
    code: 201,
    status: "success",
    result,
  });
};

module.exports = finishVerification;
