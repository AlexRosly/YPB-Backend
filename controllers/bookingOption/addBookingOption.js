const { BookingOption } = require("../../models");
const cloudinary = require("../../utils/cloudinary");
const fs = require("fs");

const addBookingOption = async (req, res) => {
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, "bookingOptionHotel");
    if (req.method === "POST") {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }

      const bookingOption = await BookingOption.create({
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
  } catch (error) {}

  // const bookingOption = await BookingOption.create({ ...req.body });

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

module.exports = addBookingOption;
