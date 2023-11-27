// const { Hotels } = require("../../models");
// const path = require("path");
// const fs = require("fs").promises;
// const { exists } = require("fs").promises;

// // const { exists } = require("node:fs");

// const startVerification = async (req, res) => {
//   const { _id } = req.hotelier;
//   const { hotelsId } = req.body;
//   // console.log(req.files);
//   console.log("id hotelier", _id);
//   console.log({ hotelsId });

//   const folderName = hotelsId;

//   // await fs.mkdir(`./verification/video/${folderName}`, (err) => {
//   //   if (err) {
//   //     console.error(err);
//   //   } else {
//   //     console.log("\nDirectory created successfully asynchronously.");
//   //   }
//   // });
//   exists(`./verification/video/${folderName}`, (e) => {
//     console.log(e ? "it exists" : "no passwd!");
//   });

//   // try {
//   //   if (fs.exists(`./verification/video/${folderName}`)) {
//   //     console.log("work");
//   //   }
//   //   await fs.mkdir(`./verification/video/${folderName}`);
//   // } catch (error) {}
//   // const hotel = await Hotels.findById(id);
//   // console.log(req.file);

//   res.json({
//     code: 200,
//     mes: "ok",
//   });
// };

// module.exports = startVerification;
