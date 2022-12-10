const { BookingOptionHs } = require("../../models");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs").promises;

const addBookingOptionHs = async (req, res) => {
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, "bookingOptionHostel");
    if (req.method === "POST") {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        await fs.unlink(path);
      }

      const bookingOption = await BookingOptionHs.create({
        ...req.body,
        photos: urls,
      });

      if (!bookingOption) {
        throw new NotImplemented("booking option doesn`t create");
      }

      res.status(201).json({
        status: "success",
        message: "booking option created",
        code: 201,
        data: {
          bookingOption,
        },
      });
    } else {
      res.status(405).json({
        err: `${req.method} method not allowed`,
      });
    }
  } catch (error) {
    console.log(error);
  }

  // try {
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

  // console.log("req", req.file.path);
  //   const result = await cloudinary.uploader.upload(req.file.path, {
  //     upload_preset: "bookingOptionHostel",
  //   });
  //   console.log({ result });
  //   res.json(result);
  // } catch (error) {
  //   console.log(error);
  // }

  // const bookingOption = await BookingOptionHs.create({
  //   ...req.body,
  //   photos: urls,
  // });

  // if (!bookingOption) {
  //   throw new NotImplemented("booking option doesn`t create");
  // }

  // res.status(201).json({
  //   status: "success",
  //   message: "booking option created",
  //   code: 201,
  //   data: {
  //     bookingOption,
  //   },
  // });
};

module.exports = addBookingOptionHs;
