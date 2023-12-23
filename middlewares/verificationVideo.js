const multer = require("multer");
const path = require("path");

const verificationTempFilePath = path.join(
  __dirname,
  "../",
  "verification",
  "temp"
);

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, verificationTempFilePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadVideo = multer({
  storage: multerConfig,
});

module.exports = uploadVideo;
