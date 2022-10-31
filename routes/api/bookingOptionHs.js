const { bookingOption: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, upload } = require("../../middlewares");
// const cloudinary = require("../../utils/cloudinary");
const { joiSchema } = require("../../models/bookingOptionHs");
const express = require("express");
const router = express.Router();

// const upload = require("../../middlewares/upload");
// const fs = require("fs");
// const bodyParser = require("body-parser");
// const app = express();
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
// app.use(bodyParser.json());

router.get("/", ctrlWrapper(ctrl.getBookingOptionHs));

router.post(
  "/",
  upload.array("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.addBookingOptionHs)
);

// router.post("/", upload.array("image"), async (req, res) => {
//   const uploader = async (path) =>
//     await cloudinary.uploads(path, "bookingOptionHostel");

//   if (req.method === "POST") {
//     const urls = [];
//     const files = req.files;
//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       fs.unlinkSync(path);
//     }

//     res.status(200).json({
//       message: "images uploaded successfully",
//       data: urls,
//     });
//   } else {
//     res.status(405).json({
//       err: `${req.method} method not allowed`,
//     });
//   }
// });

router.patch(
  "/:id",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateBookingOptionHs)
);

module.exports = router;
