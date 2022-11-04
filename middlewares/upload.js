const multer = require("multer");
const path = require("path");
//
// const multerConfig = multer.diskStorage({
//   fileFilter: (req, file, cb) => {
//     console.log({ file });
//     let ext = path.extname(file.originalname);
//     console.log({ ext });
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// module.exports = upload;

const tempDir = path.join(__dirname, "../", "temp");
// console.log(tempDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    //reject file
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
