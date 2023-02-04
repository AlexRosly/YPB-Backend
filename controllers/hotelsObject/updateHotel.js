const { Hotels } = require("../../models");
const { NotFound } = require("http-errors");
const path = require("path");
const fs = require("fs").promises;
const cloudinary = require("../../utils/cloudinary");

const updateHotel = async (req, res) => {
  const { id } = req.params;
  const files = req.files;

  const getHotelById = await Hotels.findById(id);
  const { photos, _id } = getHotelById;
  let a;
  let b;
  const urls = [];

  const removePhotoFromCloudinary = async (photos, files, b) => {
    for (const file of files) {
      for (const photo of photos) {
        if (photo.position === file.originalname) {
          b = cloudinary.remove(photo.id);
          // console.log("remove from cloudinary work");
        }
      }
    }
    if (b) {
      return (a = true);
    }
  };

  removePhotoFromCloudinary(photos, files, b);

  const addNewLinkToDB = async (photos, urls, _id) => {
    // const newArr = [];
    // for (const file of files) {
    //   for (const photo of photos) {
    //     if (photo.position !== file.originalname) {
    //       newArr.push(photo);
    //     }
    //   }
    // }
    const newArr = JSON.parse(JSON.stringify(photos));
    for (const file of files) {
      for (const newAr of newArr) {
        if (file.originalname === newAr.position) {
          const deleteFoto = await Hotels.updateOne(
            { _id: _id },
            { $pop: { photos: -1 } }
          );
          // console.log({ deleteFoto });
        }
      }
    }

    const hotel = await Hotels.findByIdAndUpdate(
      id,
      {
        ...req.body,
        photos: [...urls],
      },
      {
        new: true,
      }
    );
    if (!hotel) {
      throw new NotFound("hotel not found");
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        hotel,
      },
    });
  };

  const addNewPhotoToCloudinary = async (urls) => {
    try {
      const uploader = async (path) =>
        await cloudinary.uploads(path, "addObject");
      if (req.method === "PATCH") {
        const files = req.files;
        for (const file of files) {
          const { path, originalname } = file;
          const newPath = await uploader(path);
          const newPathWithPosition = { ...newPath, position: originalname };
          urls.push(newPathWithPosition);
          await fs.unlink(path);
        }
      } else {
        res.status(405).json({
          err: `${req.method} method not allowed`,
        });
      }
    } catch (error) {}
    addNewLinkToDB(photos, urls, _id);
    return urls;
  };

  if (a === true) {
    addNewPhotoToCloudinary(urls);
  }

  // setTimeout(() => {
  //   addNewLinkToDB(photos, urls);
  //   console.log("ARRAYurl", urls);
  // }, 2000);

  // if (urls.length > 0) {
  //   console.log("ulr.length >0");
  //   // console.log("ARRAYurl", urls);
  //   // addNewLinkToDB(photos, urls);
  // }

  ///////////////////////////

  // const hotel = await Hotels.findByIdAndUpdate(id, req.body, {
  //   new: true,
  // });
  // if (!hotel) {
  //   throw new NotFound("hotel not found");
  // }

  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     hotel,
  //   },
  // });
};

module.exports = updateHotel;
