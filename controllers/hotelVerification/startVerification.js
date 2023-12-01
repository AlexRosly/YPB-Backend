const { error } = require("console");
const { Verification } = require("../../models");
const path = require("path");
const fs = require("fs").promises;

const fileDir = path.join(__dirname, "../../", "verification");
const tempFolder = path.join(__dirname, "../../", "verification", "temp");

const startVerification = async (req, res) => {
  const { _id } = req.hotelier; // get hoteliers id
  const { hotelsId } = req.body; // get hotels id
  const { video, documents, selfi } = req.files; // Destructuring files from uploader
  const files = [...video, ...documents, ...selfi]; //craete array of files
  const folderName = hotelsId; // will appoint name for new folder with hotels id
  let videos = []; //create array for video link
  let documentes = []; //create array for documents link
  let selfies = []; //create array for selfi link

  //create new folder with `${folderName}` in Verification folder
  try {
    await fs.mkdir(`./verification/${folderName}`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("\nDirectory created successfully asynchronously.");
      }
    });
  } catch (error) {
    //handle the error. If folder wosn't create delete files from temp folder
    const getAllFiles = await fs.readdir(tempFolder); // get all files from temp folder
    if (getAllFiles) {
      //remove all files from temp folder
      getAllFiles.forEach(async (value) => {
        await fs.unlink(
          path.join(__dirname, "../../", "verification", "temp", `${value}`)
        );
      });
    }
    //return response that files won't added
    return res
      .json({
        code: 404,
        message: `DB has document for hotel with id ${hotelsId}`,
      })
      .end();
  }
  const date = Date.now(); // add date to files name
  //remove files from temp folder to new folder with name `${folderName}`
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
  //add info to DB
  const result = await Verification.create({
    ...req.body,
    video: videos,
    documents: documentes,
    selfie: selfies,
    owner: _id,
    hotels: hotelsId,
  });
  //if DB don't create document, delete all files from server
  if (!result) {
    console.log("try to delete");
    await fs.rmdir(`./verification/${folderName}`, { recursive: true }, (e) => {
      console.log({ e });
    });
    console.log("Folder Deleted!");

    return res
      .json({
        code: 404,
        message: "Docments, video and selfie wasn't add to DB. Try again ",
      })
      .end();
  }
  //if all ok return response
  res
    .json({
      code: 201,
      status: "success",
      message: "documents was successfully uploaded",
      result,
    })
    .end();
};

module.exports = startVerification;
