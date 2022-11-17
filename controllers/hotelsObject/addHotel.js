const { Hotels } = require("../../models");
const { NotImplemented } = require("http-errors");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const addHotel = async (req, res) => {
  console.log("ADD-req.body", req.body);
  console.log("ADD-req.file", req.files);

  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, "addObject");
    if (req.method === "POST") {
      const urls = [];
      const files = req.files;
      console.log({ files });
      for (const file of files) {
        const { path, filename } = file;
        const newPath = await uploader(path);
        const newPathWithPosition = { ...newPath, position: filename };
        urls.push(newPathWithPosition);
        fs.unlinkSync(path);
      }
      console.log({ urls });
      const hotel = await Hotels.create({
        ...req.body,
        photos: urls,
      });

      if (!hotel) {
        throw new NotImplemented("hotels doesn`t create");
      }

      res.status(201).json({
        status: "success",
        message: "hotel created",
        code: 201,
        data: {
          hotel,
        },
      });
    } else {
      res.status(405).json({
        err: `${req.method} method not allowed`,
      });
    }
  } catch (error) {}

  // const hotel = await Hotels.create({ ...req.body });

  // if (!hotel) {
  //   throw new NotImplemented("hotels doesn`t create");
  // }

  // res.status(201).json({
  //   status: "success",
  //   message: "hotel created",
  //   code: 201,
  //   data: {
  //     hotel,
  //   },
  // });
};

module.exports = addHotel;
