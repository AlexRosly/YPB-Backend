const { error } = require("console");
const { Verification, Hotels } = require("../../models");
const path = require("path");
const fs = require("fs").promises;

const fileDir = path.join(__dirname, "../../", "verification");
const tempFolder = path.join(__dirname, "../../", "verification", "temp");

const startVerification = async (req, res) => {
  const { _id } = req.hotelier; // get hoteliers id
  // const { hotelsId } = req.body; // get hotels id
  const { hotelsId } = req.query; // get hotels id
  const { video, documents, selfie } = req.files; // Destructuring files from uploader
  const files = [...video, ...documents, ...selfie]; //craete array of files
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
    //return response that files won't added//
    res
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
    const { path: verificationTempFilePath, originalname } = file;
    if (file.fieldname === "video") {
      try {
        const resultUpload = path.join(
          fileDir,
          `${folderName}`,
          `${date}-${originalname}`
        );
        await fs.rename(verificationTempFilePath, resultUpload);
        const videoUrl = path.join(`${folderName}`, `${date}-${originalname}`);
        videos.push(videoUrl);
      } catch (error) {
        await fs.unlink(verificationTempFilePath);
        throw error;
      }
    } else if (file.fieldname === "documents") {
      try {
        const resultUpload = path.join(
          fileDir,
          `${folderName}`,
          `${date}-${originalname}`
        );
        await fs.rename(verificationTempFilePath, resultUpload);
        const documentUrl = path.join(
          `${folderName}`,
          `${date}-${originalname}`
        );
        documentes.push(documentUrl);
      } catch (error) {
        await fs.unlink(verificationTempFilePath);
        throw error;
      }
    } else {
      try {
        const resultUpload = path.join(
          fileDir,
          `${folderName}`,
          `${date}-${originalname}`
        );
        await fs.rename(verificationTempFilePath, resultUpload);
        const selfiUrl = path.join(`${folderName}`, `${date}-${originalname}`);
        selfies.push(selfiUrl);
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
    await fs.rmdir(`./verification/${folderName}`, { recursive: true }, (e) => {
      console.log({ e });
    });

    return res
      .json({
        code: 404,
        message: "Docments, video and selfie wasn't add to DB. Try again ",
      })
      .end();
  }

  const updateStatus = await Hotels.findOneAndUpdate(
    { _id: hotelsId },
    { status: "on verification" },
    {
      new: true,
    }
  );
  //if all ok return response
  res
    .json({
      code: 201,
      status: "success",
      message: "documents was successfully uploaded",
      result,
      updatedStatus: updateStatus.status,
    })
    .end();
};

module.exports = startVerification;
