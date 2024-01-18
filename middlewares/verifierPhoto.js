const multer = require("multer");
const path = require("path");

const verifierTempFilePath = path.join(
  __dirname,
  "../",
  "verifierProfiles",
  "temp"
);

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, verifierTempFilePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadVerifierPhoto = multer({
  storage: multerConfig,
});

module.exports = uploadVerifierPhoto;
