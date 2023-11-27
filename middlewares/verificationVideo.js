const multer = require("multer");
const path = require("path");

const verificationVideoPath = path.join(
  __dirname,
  "../",
  "verification",
  "video"
);

// console.log(verificationVideoPath);

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, verificationVideoPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const uploadVideo = multer({
  storage: multerConfig,
});

module.exports = uploadVideo;
