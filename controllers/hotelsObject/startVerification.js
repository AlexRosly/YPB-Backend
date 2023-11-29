const { Verification } = require("../../models");
const path = require("path");
const fs = require("fs").promises;
const { exists } = require("fs");

const startVerification = async (req, res) => {
  const { _id } = req.hotelier; // get hoteliers id
  const { hotelsId } = req.body; // get hotels id
  const { video, documents, selfi } = req.files; // Destructuring files from uploader
  const files = [...video, ...documents, ...selfi]; //craete array of files
  const folderName = hotelsId; // will appoint name for new folder with hotels id
  let videos = []; //create array for video link
  let documentes = []; //create array for documents link
  let selfies = []; //create array for selfi link
  let folderStatus; //

  //check folderName before create new folder in Verification folder
  exists(`./verification/${folderName}`, async (e) => {
    folderStatus = e ? (folderStatus = true) : (folderStatus = false);
    return folderStatus;
    console.log(e ? "it exists" : "no passwd!");
    // if (e) {
    //   return (folderStatus = true);
    // } else {
    //   return ;
    // }
  });
  console.log({ folderStatus });

  //create new folder with `${folderName}` in Verification folder
  await fs.mkdir(`./verification/${folderName}`, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("\nDirectory created successfully asynchronously.");
    }
  });

  //remove files from temp folder to new folder with name `${folderName}`
  //and push in appropriate array
  for (const file of files) {
    if (file.fieldname === "video") {
      try {
        const { path: verificationTempFilePath, originalname } = file;
        const resultUpload = path.join(
          __dirname,
          "../../",
          "verification",
          `${folderName}`,
          originalname
        );
        const videoUrl = path.join(
          // "verification",
          `${folderName}`,
          originalname
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
          __dirname,
          "../../",
          "verification",
          `${folderName}`,
          originalname
        );
        const documentUrl = path.join(
          // "verification",
          `${folderName}`,
          originalname
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
          __dirname,
          "../../",
          "verification",
          `${folderName}`,
          originalname
        );
        const selfiUrl = path.join(
          // "verification",
          `${folderName}`,
          originalname
        );

        selfies.push(selfiUrl);
        await fs.rename(verificationTempFilePath, resultUpload);
      } catch (error) {
        await fs.unlink(verificationTempFilePath);
      }
    }
  }

  const result = await Verification.create({
    ...req.body,
    video: videos,
    documents: documentes,
    selfi: selfies,
    owner: _id,
    hotels: hotelsId,
  });
  //remove files from temp folder to `${folderName}`
  // try {
  //   const resultUpload = path.join(
  //     __dirname,
  //     "../../",
  //     "verification",
  //     `${folderName}`,
  //     originalname
  //   );
  //   await fs.rename(verificationTempFilePath, resultUpload);
  // } catch (error) {
  //   await fs.unlink(verificationTempFilePath);
  // }
  // console.log("video array", videos);
  // console.log("document array", documentes);
  // console.log("selfi array", selfies);

  res.json({
    code: 200,
    mes: "ok",
    result,
  });
};

module.exports = startVerification;
