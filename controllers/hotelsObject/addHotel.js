const { Hotels } = require("../../models");
const { NotImplemented } = require("http-errors");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs").promises;

const addHotel = async (req, res) => {
  const { _id } = req.hotelier;
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, "addObject");
    if (req.method === "POST") {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path, originalname } = file;
        const newPath = await uploader(path);
        const newPathWithPosition = { ...newPath, position: originalname };
        urls.push(newPathWithPosition);
        await fs.unlink(path);
      }
      const hotel = await Hotels.create({
        ...req.body,
        photos: urls,
        owner: _id,
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
