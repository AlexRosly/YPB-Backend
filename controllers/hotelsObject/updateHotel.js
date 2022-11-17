const { Hotels } = require("../../models");
const { NotFound } = require("http-errors");
// const cloudinary = require("cloudinary");
const cloudinary = require("../../utils/cloudinary");

const updateHotel = async (req, res) => {
  const { id } = req.params;
  const files = req.files;

  const getHotelById = await Hotels.findById(id);
  const { photos } = getHotelById;
  let a;
  const urls = [];

  const removePhotoFromCloudinary = async (photos) => {
    let b;
    // const filess = ["1668719468636-Programmers-day.png"];
    for (const file of files) {
      for (const photo of photos) {
        if (photo.position === file) {
          b = cloudinary.remove(photo.id);
        }
      }
    }
    if (b) {
      return (a = true);
    }
  };

  removePhotoFromCloudinary(photos);

  const addNewLinkToDB = async (photos, urls) => {
    // const filess = ["1668719468636-Programmers-day.png"];
    const newArr = [];
    for (const file of files) {
      for (const photo of photos) {
        if (photo.position != file) {
          newArr.push(photo);
        }
      }
    }

    const hotel = await Hotels.findByIdAndUpdate(
      id,
      {
        ...req.body,
        photos: [...newArr, ...urls],
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
          const { path, filename } = file;
          const newPath = await uploader(path);
          const newPathWithPosition = { ...newPath, position: filename };
          urls.push(newPathWithPosition);
          fs.unlinkSync(path);
        }
      } else {
        res.status(405).json({
          err: `${req.method} method not allowed`,
        });
      }
    } catch (error) {}
    addNewLinkToDB(photos, urls);
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
