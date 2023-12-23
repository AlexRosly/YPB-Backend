const { Verification } = require("../../models");
const path = require("path");
const fs = require("fs").promises;

const fileDir = path.join(__dirname, "../../", "verification");

const updateDocument = async (req, res) => {
  const { hotelsId } = req.body; // get hotels id
  const { video, documents, selfi } = req.files; // Destructuring files from uploader
  const files = [...video, ...documents, ...selfi]; //craete array of files
  const folderName = hotelsId; // will appoint name for new folder with hotels id
  let videos = []; //create array for video link
  let documentes = []; //create array for documents link
  let selfies = []; //create array for selfi link
  const date = Date.now(); // add date to files name

  //and push in appropriate array
  for (const file of files) {
    if (file.fieldname === "video") {
      try {
        const { path: verificationTempFilePath, originalname } = file;
        const resultUpload = path.join(
          fileDir,
          `${folderName}`,
          `${date}-${originalname}`
        );
        const videoUrl = path.join(
          // "verification",
          `${folderName}`,
          `${date}-${originalname}`
        );
        videos.push(videoUrl);
        await fs.rename(verificationTempFilePath, resultUpload);
      } catch (error) {
        await fs.unlink(verificationTempFilePath);
      }
    } else if (file.fieldname === "documents") {
      try {
        const { path: verificationTempFilePath, originalname } = file;
        const resultUpload = path.join(
          fileDir,
          `${folderName}`,
          `${date}-${originalname}`
        );
        const documentUrl = path.join(
          // "verification",
          `${folderName}`,
          `${date}-${originalname}`
        );
        documentes.push(documentUrl);
        await fs.rename(verificationTempFilePath, resultUpload);
      } catch (error) {
        await fs.unlink(verificationTempFilePath);
      }
    } else {
      try {
        const { path: verificationTempFilePath, originalname } = file;
        const resultUpload = path.join(
          fileDir,
          `${folderName}`,
          `${date}-${originalname}`
        );
        const selfiUrl = path.join(
          // "verification",
          `${folderName}`,
          `${date}-${originalname}`
        );
        selfies.push(selfiUrl);
        await fs.rename(verificationTempFilePath, resultUpload);
      } catch (error) {
        await fs.unlink(verificationTempFilePath);
        return res
          .json({
            code: 404,
            message: "Docments, video and selfie wasn't add to DB. Try again ",
          })
          .end();
      }
    }
  }
  //update in DB
  const result = await Verification.findOneAndUpdate(
    { hotels: hotelsId },
    {
      $push: {
        video: { $each: [...videos] },
        documents: { $each: [...documentes] },
        selfie: { $each: [...selfies] },
      },
    },
    {
      new: true,
    }
  );

  // if wasn't updated return response
  if (!result) {
    return res.json({
      code: 404,
      status: "error",
      message: "Document wasn't updated",
    });
  }

  res.json({
    code: 201,
    status: "success",
    result,
  });
};

module.exports = updateDocument;
