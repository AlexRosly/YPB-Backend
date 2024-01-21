const { VerifierProfile } = require("../../models");
const path = require("path");
const fs = require("fs").promises;

const fileDir = path.join(__dirname, "../../", "verifierProfiles");
const tempFolder = path.join(__dirname, "../../", "verifierProfiles", "temp");

const createVerifierProfile = async (req, res) => {
  // get verifier id
  const _id = req.admin;
  const id = req.superAdmin;

  const { email } = req.body;
  const files = req.files;

  let verifierId;

  //get id for verifierId (admin or super admin)
  if (_id) {
    verifierId = _id._id;
  } else {
    verifierId = id._id;
  }

  const folderName = verifierId; // will appoint name for new folder with hotels id
  let photos = []; //create array for documents link

  //create new folder with `${folderName}` in Verification folder
  try {
    await fs.mkdir(`./verifierProfiles/${folderName}`, (err) => {
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
          path.join(__dirname, "../../", "verifierProfiles", "temp", `${value}`)
        );
      });
    }
    //return response that files won't added
    return res
      .json({
        code: 404,
        message: `DB has document for verifier with id ${verifierId}`,
      })
      .end();
  }
  const date = Date.now(); // add date to files name
  //remove files from temp folder to new folder with name `${folderName}`
  //and push in appropriate array
  for (const file of files) {
    const { path: verifierTempFilePath, originalname } = file;
    try {
      const resultUpload = path.join(
        fileDir,
        `${folderName}`,
        `${date}-${originalname}`
      );
      const photoUrl = path.join(`${folderName}`, `${date}-${originalname}`);
      photos.push(photoUrl);
      await fs.rename(verifierTempFilePath, resultUpload);
    } catch (error) {
      await fs.unlink(verifierTempFilePath);
    }
  }
  //add info to DB
  const result = await VerifierProfile.create({ verifierId, email, photos });
  //if DB don't create document, delete all files from server
  if (!result) {
    await fs.rmdir(
      `./verifierProfiles/${folderName}`,
      { recursive: true },
      (e) => {
        console.log({ e });
      }
    );

    return res
      .json({
        status: "error",
        code: 404,
        message: "Docments, video and selfie wasn't add to DB. Try again ",
      })
      .end();
  }

  res
    .status(201)
    .json({
      status: "success",
      code: 201,
      result,
    })
    .end();
};

module.exports = createVerifierProfile;
