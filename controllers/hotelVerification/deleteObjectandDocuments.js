const { Hotels, Verification } = require("../../models");
const { NotFound } = require("http-errors");
const fs = require("fs").promises;

const deleteObjectAndDocuments = async (req, res) => {
  const { id } = req.query; // get hotels id
  const folderName = id; // will appoint name for new folder with hotels id
  console.log({ id });
  console.log({ folderName });

  try {
    console.log("findFolder");

    //delete folder with documents
    await fs.rmdir(`./verification/${folderName}`, { recursive: true }, (e) => {
      console.log({ e });
    });

    //delete info from DB
    console.log("findVerifiDocuments");
    const findVerifiDocuments = await Verification.deleteOne({ hotels: id });
    if (!findVerifiDocuments) {
      throw new NotFound("Not found");
    }
    //delete object from DB
    console.log("findHotel");

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
