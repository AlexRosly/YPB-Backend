const { Hotels, Verification, VerifyObjectHistory } = require("../../models");
const { NotFound } = require("http-errors");
const fs = require("fs").promises;

const deleteObjectAndDocuments = async (req, res) => {
  const { id } = req.query; // get hotels id
  const folderName = id; // will appoint name for new folder with hotels id

  const adminId = req.admin; // get id of verify
  const superAdminId = req.superAdmin; // get id of verify
  let verifierId;

  //get id for profileId (admin or super admin)
  if (adminId) {
    verifierId = adminId._id;
  } else {
    verifierId = superAdminId._id;
  }

  try {
    //delete folder with documents
    await fs.rmdir(`./verification/${folderName}`, { recursive: true }, (e) => {
      console.log({ e });
    });

    //delete info from DB
    const findVerifiDocuments = await Verification.deleteOne({ hotels: id });
    if (!findVerifiDocuments) {
      throw new NotFound("Not found");
    }
    //change statys on history
    const dateOfDecision = new Date();
    const filter1 = { hotels: id };
    const update1 = { decision: "not verify", dateOfDecision };
    const objectHistory = await VerifyObjectHistory.findOneAndUpdate(
      filter1,
      update1,
      {
        new: true,
      }
    );
    console.log({ objectHistory });

    //delete object from DB

    const findHotel = await Hotels.findByIdAndRemove(id);
    if (!findHotel) {
      throw new NotFound("Not found");
    }
    //return response if all deleted
    return res
      .json({
        code: 200,
        status: "success",
        message: "Docments, video and selfie was deleted from DB",
      })
      .end();
  } catch (error) {
    return res
      .json({
        code: 404,
        status: "error",
        message:
          "Docments, video and selfie wasn't deleted from DB. Try again ",
      })
      .end();
  }
};

module.exports = deleteObjectAndDocuments;
